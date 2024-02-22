import copy 
import torch
import torch.nn as nn
import torch.nn.utils.prune as prune
from torch.nn import Conv2d
from torch.autograd import grad

def pruning_model(model, px):

    print('start unstructured pruning')
    parameters_to_prune =[]
    for name,m in model.named_modules():
        if isinstance(m, nn.Conv2d):
            parameters_to_prune.append((m,'weight'))

    parameters_to_prune = tuple(parameters_to_prune)

    prune.global_unstructured(
        parameters_to_prune,
        pruning_method=prune.L1Unstructured,
        amount=px,
    )

def pruning_model_random(model, px):

    parameters_to_prune =[]
    for name,m in model.named_modules():
        if isinstance(m, nn.Conv2d):
            parameters_to_prune.append((m,'weight'))

    parameters_to_prune = tuple(parameters_to_prune)

    prune.global_unstructured(
        parameters_to_prune,
        pruning_method=prune.RandomUnstructured,
        amount=px,
    )

def prune_model_custom(model, mask_dict):

    print('start unstructured pruning with custom mask', flush=True)
    for name,m in model.named_modules():
        if isinstance(m, nn.Conv2d):
            prune.CustomFromMask.apply(m, 'weight', mask=mask_dict[name+'.weight_mask'])

def remove_prune(model):
    
    print('remove pruning', flush=True)
    for name,m in model.named_modules():
        if isinstance(m, nn.Conv2d):
            prune.remove(m,'weight')

def extract_mask(model_dict):

    new_dict = {}

    for key in model_dict.keys():
        if 'mask' in key:
            new_dict[key] = copy.deepcopy(model_dict[key])

    return new_dict

def check_sparsity(model):
    
    sum_list = 0
    zero_sum = 0

    for name,m in model.named_modules():
        if isinstance(m, nn.Conv2d):
            sum_list = sum_list+float(m.weight.nelement())
            zero_sum = zero_sum+float(torch.sum(m.weight == 0))  

    print('* remain weight = ', 100*(1-zero_sum/sum_list),'%', flush=True)
    
    return 100*(1-zero_sum/sum_list)

def check_sparsity_mask(mask_dict):

    sum_list = 0
    zero_sum = 0

    for key in mask_dict.keys():
        sum_list = sum_list+float(mask_dict[key].nelement())
        zero_sum = zero_sum+float(torch.sum(mask_dict[key] == 0))  

    print('* remain weight = ', 100*(1-zero_sum/sum_list),'%', flush=True)
    
    return 100*(1-zero_sum/sum_list)

def pruning_with_rewind(model, px, init, mode='l1'):

    if mode == 'l1':
        print('using L1 magnitude pruning', flush=True)
        pruning_model(model, px)
    elif mode == 'random':
        print('using random pruning', flush=True)
        pruning_model_random(model, px)
    else:
        raise ValueError('Unsupport pruning mode', flush=True)

    current_mask = extract_mask(model.state_dict())
    remove_prune(model)

    model.load_state_dict(init)
    prune_model_custom(model, current_mask)
    check_sparsity(model)

def fetch_data(dataloader, num_classes, samples_per_class):
    datas = [[] for _ in range(num_classes)]
    labels = [[] for _ in range(num_classes)]
    mark = dict()
    dataloader_iter = iter(dataloader)
    while True:
        inputs, targets = next(dataloader_iter)
        for idx in range(inputs.shape[0]):
            x, y = inputs[idx:idx+1], targets[idx:idx+1]
            category = y.item()
            if len(datas[category]) == samples_per_class:
                mark[category] = True
                continue
            datas[category].append(x)
            labels[category].append(y)
        if len(mark) == num_classes:
            break
    X, y = torch.cat([torch.cat(_, 0) for _ in datas]), torch.cat(
        [torch.cat(_) for _ in labels]).view(-1)
    return X, y

def grasp_importance_score(
    model,
    dataloader,
    num_class,
    samples_per_class,
    loss_func=torch.nn.CrossEntropyLoss()
):

    score_dict = {}
    model.zero_grad()
    device = next(model.parameters()).device
    x, y = fetch_data(dataloader, num_class, samples_per_class)
    x, y = x.to(device), y.to(device)
    loss = loss_func(model(x)/200, y)
    gs = grad(loss, model.parameters(), create_graph=True)
    model.zero_grad()
    t = sum([(g*g.data).sum() for g in gs])
    t.backward()

    for m in model.modules():
        if isinstance(m, (Conv2d,)):
            score_dict[(m, 'weight')] = -m.weight.data * m.weight.grad.data
    model.zero_grad()
    return score_dict

def grasp_pruning(model, ratio, dataloader=None, num_class=10, sample_per_classes=25):
    print('start grasp pruning', flush=True)
    score_dict = grasp_importance_score(model, dataloader, num_class, sample_per_classes)
    prune.global_unstructured(
        parameters=score_dict.keys(),
        pruning_method=prune.L1Unstructured,
        amount=ratio,
        importance_scores=score_dict,
    )
    torch.cuda.empty_cache()

def snip_importance_score(
    model,
    dataloader, 
    num_class,
    samples_per_class,
    loss_func = torch.nn.CrossEntropyLoss()
    ):

    score_dict = {}
    model.zero_grad()
    device = next(model.parameters()).device
    x, y = fetch_data(dataloader, num_class, samples_per_class)
    x, y = x.to(device), y.to(device)
    loss = loss_func(model(x), y)
    loss.backward()
    for m in model.modules():
        if isinstance(m, (Conv2d,)):
            score_dict[(m, 'weight')] = m.weight.grad.clone().detach().abs()
    model.zero_grad()
    return score_dict

def snip_pruning(model, ratio, dataloader=None, num_class=10, sample_per_classes=25):
    print('start SNIP pruning', flush=True)
    score_dict = snip_importance_score(model, dataloader, num_class, sample_per_classes)
    prune.global_unstructured(
        parameters=score_dict.keys(),
        pruning_method=prune.L1Unstructured,
        amount=ratio,
        importance_scores=score_dict,
    )
    torch.cuda.empty_cache()

def synflow_importance_score(
    model,
    dataloader,
    ):
    @torch.no_grad()
    def linearize(model):
        signs = {}
        for name, param in model.state_dict().items():
            signs[name] = torch.sign(param)
            param.abs_()
        return signs

    @torch.no_grad()
    def nonlinearize(model, signs):
        # model.float()
        for name, param in model.state_dict().items():
            param.mul_(signs[name])

    model.eval() # Crucial! BatchNorm will break the conservation laws for synaptic saliency
    model.zero_grad()
    score_dict = {}
    signs = linearize(model)

    (data, _) = next(iter(dataloader))
    input_dim = list(data[0,:].shape)
    input = torch.ones([1] + input_dim).to(next(model.parameters()).device)
    output = model(input)
    torch.sum(output).backward()

    for m in model.modules():
        if isinstance(m, (Conv2d,)):
            if hasattr(m, "weight_orig"):
                score_dict[(m, 'weight')] = (m.weight_orig.grad.clone().detach() * m.weight.clone().detach()).abs()
            else:
                score_dict[(m, 'weight')] = (m.weight.grad.clone().detach() * m.weight.clone().detach()).abs()
    model.zero_grad()
    nonlinearize(model, signs)
    return score_dict

def synflow_pruning(model, ratio, dataloader=None):
    print('start synflow pruning', flush=True)
    iteration_number = 100 # In SynFlow Paper, an iteration number of 100 performs well
    each_ratio = 1 - (1-ratio)**(1/iteration_number)
    for _ in range(iteration_number):
        score_dict = synflow_importance_score(model, dataloader)
        prune.global_unstructured(
            parameters=score_dict.keys(),
            pruning_method=prune.L1Unstructured,
            amount=each_ratio,
            importance_scores=score_dict,
        )
    torch.cuda.empty_cache()