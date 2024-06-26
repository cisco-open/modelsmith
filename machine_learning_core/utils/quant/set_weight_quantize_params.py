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

from .quant_layer import QuantModule
from .data_utils import save_inp_oup_data


def get_init(
    model,
    block,
    cali_data,
    wq,
    aq,
    batch_size,
    input_prob: bool = False,
    keep_gpu: bool = True,
):
    cached_inps, cached_outs = save_inp_oup_data(
        model,
        block,
        cali_data,
        wq,
        aq,
        batch_size,
        input_prob=input_prob,
        keep_gpu=keep_gpu,
    )
    return cached_inps, cached_outs


def set_weight_quantize_params(model, logger):
    logger.log(f"set_weight_quantize_params")
    for name, module in model.named_modules():
        if isinstance(module, QuantModule):
            module.weight_quantizer.set_inited(False)
            """caculate the step size and zero point for weight quantizer"""
            module.weight_quantizer(module.weight)
            module.weight_quantizer.set_inited(True)


def weight_get_quant_state(order, act_quant):
    if not act_quant:
        return True, False
    if order == "before":
        weight_quant, act_quant = True, True
    elif order == "after":
        weight_quant, act_quant = True, False
    elif order == "together":
        weight_quant, act_quant = True, True
    else:
        raise NotImplementedError
    return weight_quant, act_quant


def save_quantized_weight(model):
    for module in model.modules():
        if isinstance(module, QuantModule):
            module.weight.data = module.weight_quantizer(module.weight)
