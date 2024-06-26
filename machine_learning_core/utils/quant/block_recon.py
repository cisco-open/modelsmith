#    Copyright 2024 Cisco Systems, Inc. and its affiliates

#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at

#        http://www.apache.org/licenses/LICENSE-2.0

#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

#   SPDX-License-Identifier: Apache-2.0

import numpy as np
import torch
from .quant_layer import QuantModule, lp_loss
from .quant_model import QuantModel
from .quant_block import BaseQuantBlock
from .adaptive_rounding import AdaRoundQuantizer
from .set_weight_quantize_params import get_init, weight_get_quant_state
from .set_act_quantize_params import set_act_quantize_params
from utils.utils import progress_bar


def block_reconstruction(model: QuantModel, block: BaseQuantBlock, cali_data: torch.Tensor,
                         batch_size: int = 32, iters: int = 20000, weight: float = 0.01, opt_mode: str = 'mse',
                         act_quant: bool = False, b_range: tuple = (20, 2),
                         warmup: float = 0.0, p: float = 2.0, lr: float = 4e-5, wwq: bool = True, waq: bool = True,
                         order: str = 'together', input_prob: float = 1.0, keep_gpu: bool = True, logger=None):
    """
    Block reconstruction to optimize the output from each block.

    :param model: QuantModel
    :param block: BaseQuantBlock that needs to be optimized
    :param cali_data: data for calibration, typically 1024 training images, as described in AdaRound
    :param batch_size: mini-batch size for reconstruction
    :param iters: optimization iterations for reconstruction,
    :param weight: the weight of rounding regularization term
    :param opt_mode: optimization mode
    :param asym: asymmetric optimization designed in AdaRound, use quant input to reconstruct fp output
    :param include_act_func: optimize the output after activation function
    :param b_range: temperature range
    :param warmup: proportion of iterations that no scheduling for temperature
    :param act_quant: use activation quantization or not.
    :param lr: learning rate for act delta learning
    :param p: L_p norm minimization
    """

    '''get input and set scale'''
    cached_inps, cached_outs = get_init(model, block, cali_data, wq=wwq, aq=waq, batch_size=batch_size, input_prob=True, keep_gpu=keep_gpu)
    if act_quant and order == 'together':
        set_act_quantize_params(block, cali_data=cached_inps[0][:min(256, cached_inps[0].size(0))], awq=True, order=order)

    '''set state'''
    cur_weight, cur_act = weight_get_quant_state(order, act_quant)
    block.set_quant_state(cur_weight, cur_act)

    '''set quantizer'''
    round_mode = 'learned_hard_sigmoid'
    # Replace weight quantizer to AdaRoundQuantizer
    w_para, a_para = [], []
    w_opt, a_opt = None, None
    scheduler, a_scheduler = None, None

    for module in block.modules():
        '''weight'''
        if isinstance(module, QuantModule):
            module.weight_quantizer = AdaRoundQuantizer(uaq=module.weight_quantizer, round_mode=round_mode,
                                                        weight_tensor=module.org_weight.data)
            module.weight_quantizer.soft_targets = True
            w_para += [module.weight_quantizer.alpha]
        '''activation'''
        if isinstance(module, (QuantModule, BaseQuantBlock)):
            if act_quant and order == 'together' and module.act_quantizer.delta is not None:
                module.act_quantizer.delta = torch.nn.Parameter(torch.tensor(module.act_quantizer.delta))
                a_para += [module.act_quantizer.delta]
            '''set up drop'''
            module.act_quantizer.is_training = True

    if len(w_para) != 0:
        w_opt = torch.optim.Adam(w_para)
    if len(a_para) != 0:
        a_opt = torch.optim.Adam(a_para, lr=lr)
        a_scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(a_opt, T_max=iters, eta_min=0.)

    loss_mode = 'relaxation'
    rec_loss = opt_mode
    loss_func = LossFunction(block, round_loss=loss_mode, weight=weight, max_count=iters, rec_loss=rec_loss,
                             b_range=b_range, decay_start=0, warmup=warmup, p=p)
    device = 'cuda'
    sz = cached_inps[0].size(0)
    for i in range(iters):
        idx = torch.randint(0, sz, (batch_size,))
        cur_inp, cur_sym = cached_inps[0][idx].to(device), cached_inps[1][idx].to(device)
        if input_prob < 1.0:
            cur_inp = torch.where(torch.rand_like(cur_inp) < input_prob, cur_inp, cur_sym)
        cur_out = cached_outs[idx].to(device)
        w_opt.zero_grad()
        if a_opt:
            a_opt.zero_grad()
        out_quant = block(cur_inp)

        err = loss_func(out_quant, cur_out)

        err.backward(retain_graph=True)

        w_opt.step()
        if a_opt:
            a_opt.step()
        if scheduler:
            scheduler.step()
        if a_scheduler:
            a_scheduler.step()

        # Display
        if i % 500 == 0:
            step = i // 500 
            msg = 'Loss: {:.3f}'.format(err.item())
            progress_bar(step, iters // 500, msg, logger)

    # # test(0, device, qnn, test_loader, criterion, best_acc))
    # acc = test()
    # print (acc)

    torch.cuda.empty_cache()

    for module in block.modules():
        if isinstance(module, QuantModule):
            '''weight '''
            module.weight_quantizer.soft_targets = False
        '''activation'''
        if isinstance(module, (QuantModule, BaseQuantBlock)):
            module.act_quantizer.is_training = False
    '''Case 3'''
    if act_quant and order == 'after' and waq:
        set_act_quantize_params(block, cached_inps[0], awq=True, order=order)


class LossFunction:
    def __init__(self,
                 block: BaseQuantBlock,
                 round_loss: str = 'relaxation',
                 weight: float = 1.,
                 rec_loss: str = 'mse',
                 max_count: int = 2000,
                 b_range: tuple = (10, 2),
                 decay_start: float = 0.0,
                 warmup: float = 0.0,
                 p: float = 2.):

        self.block = block
        self.round_loss = round_loss
        self.weight = weight
        self.rec_loss = rec_loss
        self.max_count = max_count 
        self.loss_start = max_count * warmup
        self.p = p

        self.temp_decay = LinearTempDecay(max_count, rel_start_decay=warmup + (1 - warmup) * decay_start,
                                          start_b=b_range[0], end_b=b_range[1])
        self.count = 0

    def __call__(self, pred, tgt, grad=None):
        """
        Compute the total loss for adaptive rounding:
        rec_loss is the quadratic output reconstruction loss, round_loss is
        a regularization term to optimize the rounding policy

        :param pred: output from quantized model
        :param tgt: output from FP model
        :param grad: gradients to compute fisher information
        :return: total loss function
        """
        self.count += 1
        if self.rec_loss == 'mse':
            rec_loss = lp_loss(pred, tgt, p=self.p)
        elif self.rec_loss == 'fisher_diag':
            rec_loss = ((pred - tgt).pow(2) * grad.pow(2)).sum(1).mean()
        elif self.rec_loss == 'fisher_full':
            a = (pred - tgt).abs()
            grad = grad.abs()
            batch_dotprod = torch.sum(a * grad, (1, 2, 3)).view(-1, 1, 1, 1)
            rec_loss = (batch_dotprod * a * grad).mean() / 100
        else:
            raise ValueError('Not supported reconstruction loss function: {}'.format(self.rec_loss))

        b = self.temp_decay(self.count)
        if self.count < self.loss_start or self.round_loss == 'none':
            b = round_loss = 0
        elif self.round_loss == 'relaxation':
            round_loss = 0
            for name, module in self.block.named_modules():
                if isinstance(module, QuantModule):
                    round_vals = module.weight_quantizer.get_soft_targets()
                    round_loss += self.weight * (1 - ((round_vals - .5).abs() * 2).pow(b)).sum()
        else:
            raise NotImplementedError

        self.last_rec_loss = rec_loss
        self.last_round_loss = round_loss
        self.last_b = self.temp_decay(self.count)

        total_loss = rec_loss + round_loss
        return total_loss

    def get_last_rec_loss(self):
        return self.last_rec_loss

    def get_last_round_loss(self):
        return self.last_round_loss

    def get_last_b(self):
        return self.last_b


class LinearTempDecay:
    def __init__(self, t_max: int, rel_start_decay: float = 0.2, start_b: int = 10, end_b: int = 2):
        self.t_max = t_max
        self.start_decay = rel_start_decay * t_max
        self.start_b = start_b
        self.end_b = end_b

    def __call__(self, t):
        """
        Cosine annealing scheduler for temperature b.
        :param t: the current time step
        :return: scheduled temperature
        """
        if t < self.start_decay:
            return self.start_b
        else:
            rel_t = (t - self.start_decay) / (self.t_max - self.start_decay)
            # return self.end_b + 0.5 * (self.start_b - self.end_b) * (1 + np.cos(rel_t * np.pi))
            return self.end_b + (self.start_b - self.end_b) * max(0.0, (1 - rel_t))
