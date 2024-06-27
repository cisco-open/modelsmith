"""Evaluation functions with a shared signature for VQA, used in vqa.py"""
import os
import random
import json
import torch
import lightning as L
from functools import partial
from utils.misc import mprint as print

def vqa_fake_result(ques_id, answer_list):
    return {"question_id": ques_id, "answer": random.choice(answer_list)}

@torch.no_grad()
def blip_evaluation(output_dir, model, data_loader, tokenizer, fabric, config, split="val", debug_mode=False) :
    # test
    model.eval()
    device = fabric.device
    rank = fabric.global_rank
    
    result = []
    computed = 0

    if debug_mode:
        vqa_fake_result_partial = partial(vqa_fake_result, answer_list=data_loader.dataset.answer_list)
    
    if config['inference'] == 'rank':   
        answer_list = data_loader.dataset.answer_list
        answer_candidates = model.tokenizer(answer_list, padding='longest', return_tensors='pt').to(device)    
        answer_candidates.input_ids[:, 0] = model.tokenizer.bos_token_id
        
    for batch_idx, (image, question, question_id) in enumerate(data_loader):       
        if batch_idx % config['print_freq'] == 0:
            print(f"[Evaluation]\tBatch {batch_idx}/{len(data_loader)}") 
        
        if debug_mode and computed > 100:
            result_for_this_batch = [vqa_fake_result_partial(ques_id.item()) for ques_id in question_id]
            result += result_for_this_batch

        # NOTE: the code for answer generation is not tested, 
        # in the main paper VQA was performed using rank-based inference
        elif config['inference'] == 'generate':
            question_input = tokenizer(question, padding='longest', return_tensors="pt").to(device)  
            answers = model(image, question_input, train=False, inference='generate') 
            for answer, ques_id in zip(answers, question_id):
                ques_id = int(ques_id.item())       
                result.append({"question_id":ques_id, "answer":answer})     
            computed += 1        
            
        elif config['inference'] == 'rank':
            question_input = tokenizer(question, padding='longest', return_tensors="pt").to(device)  
            answer_ids = model(image, question_input, answer_candidates, train=False, inference='rank', k_test=config['k_test'])
            for ques_id, answer_id in zip(question_id, answer_ids):
                result.append({"question_id":int(ques_id.item()), "answer": answer_list[answer_id]})   
            computed += 1


    outpath = os.path.join(output_dir, f"vqa_{split}_{rank}.json")
    print(f"Dumping eval file at {outpath}")
    with open(outpath, "w") as f:
        json.dump(result, f)
    
    return result



@torch.no_grad()
def xvlm_evaluation(output_dir, model, data_loader, tokenizer, fabric: L.Fabric, config, split="val", debug_mode=False):
    
    assert split in ("val", "test")
    model.eval()
    device = fabric.device
    rank = fabric.global_rank
    
    answer_list = [answer+config['eos'] for answer in data_loader.dataset.answer_list]
    answer_input = tokenizer(answer_list, padding='longest', return_tensors='pt').to(device)

    result = []
    computed = 0
    if debug_mode:
        vqa_fake_result_partial = partial(vqa_fake_result, answer_list=data_loader.dataset.answer_list)
    
    for batch_idx, (image, question, question_id) in enumerate(data_loader):    
        if batch_idx % config['print_freq'] == 0:
            print(f"[Evaluation]\tBatch {batch_idx}/{len(data_loader)}")
        
        if debug_mode and computed > 100:
            result_for_this_batch = [vqa_fake_result_partial(ques_id.item()) for ques_id in question_id]
            result += result_for_this_batch
        else:
            question_input = tokenizer(question, padding='longest', return_tensors="pt").to(device)  
            topk_ids, topk_probs = model(image, question_input, answer_input, train=False, k=config['k_test'])      
            
            for ques_id, topk_id, topk_prob in zip(question_id, topk_ids, topk_probs):
                ques_id = int(ques_id.item())          
                _, pred = topk_prob.max(dim=0)
                ans = data_loader.dataset.answer_list[topk_id[pred]]
                result.append({"question_id": ques_id, "answer": ans})
                
            computed += 1

    outpath = os.path.join(output_dir, f"vqa_{split}_{rank}.json")
    print(f"Dumping eval file at {outpath}")
    with open(outpath, "w") as f:
        json.dump(result, f)

    return result