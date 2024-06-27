"""
Utility functions to reproduce the results in the paper:
"Fast as CHITA: Neural Network Pruning with Combinatorial Optimization", ICML 2023.
These functions are taken from the following repository:
https://github.com/mazumder-lab/CHITA, which is the official repositorty of the paper.

This code only supports using CHITA and CHITA++ with Block-wise approximations.
To check how these functions are integrated in the main code, please refer to: ./pruners/pruners.py
"""
import time
import torch
import numpy as np
import numba as nb
from numba import prange
from tqdm import tqdm


@nb.njit
def mvm(A,b,index,transpose=False):
    n,p = A.shape
    if not transpose:
        res = np.zeros(n,dtype=b.dtype)
        for j,i in enumerate(index):
            res += A[:,i]*b[j]
    else:
        res = np.zeros(len(index),dtype=b.dtype)
        for j,i in enumerate(index):
            res[j] = A[:,i]@b
    return res


@nb.njit(parallel=True)
def pmvm(A,b,index,transpose=False):
    n,p = A.shape
    if not transpose:
        res = np.zeros(n,dtype=b.dtype)
        for j in prange(len(index)):
            res += A[:,index[j]]*b[j]
        return res
    else:
        res = np.zeros(len(index),dtype=b.dtype)
        for j in prange(len(index)):
            res[j] = A[:,index[j]]@b
        return res
    
@nb.njit(parallel=True)
def pmmm(A,index):
    n,p = A.shape
    res = np.zeros((n,n),dtype=A.dtype)
    for i in prange(n):
        res[i] = mvm(A,A[i][index],index,False)

    return res

def compute_inverse(y, X, alpha, lambda2, beta_tilde2,act_idx=None):
    n, p = X.shape
    k = p if act_idx is None else len(act_idx)
    if n < k:
        if act_idx is None:
            solve_b = X.T@y + 2*lambda2*beta_tilde2 - alpha
            beta = solve_b / (2*lambda2) - \
            X.T@np.linalg.solve(np.eye(n)+X@(X.T)/(2*lambda2),X@solve_b)/(4*lambda2**2)
        else:
            solve_b = pmvm(X,y,act_idx,True) + 2*lambda2*beta_tilde2[act_idx] - alpha[act_idx]
            mmX = pmmm(X,act_idx)
            mvmX =pmvm(X,solve_b,act_idx,False)
            solve_tmp = (np.linalg.solve(np.eye(n)+mmX/(2*lambda2),mvmX)/(4*lambda2**2)).astype(X.dtype)
            beta = solve_b / (2*lambda2) - \
                pmvm(X,solve_tmp,act_idx,True)
    else:
        if act_idx is None:
            solve_b = X.T@y + 2*lambda2*beta_tilde2 - alpha
            beta = np.linalg.solve(2*lambda2*np.eye(k)+(X.T)@X,solve_b)
        else:
            solve_b = pmvm(X,y,act_idx,True) + 2*lambda2*beta_tilde2[act_idx] - alpha[act_idx]
            X_act = X[:,act_idx]
            beta = np.linalg.solve(2*lambda2*np.eye(k)+(X_act.T)@X_act,solve_b)
    return beta.astype(X.dtype)

@nb.njit(cache=True)
def evaluate_obj(beta,r,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2):
    beta_sub1 = beta - beta_tilde1
    beta_sub2 = beta - beta_tilde2
    return 0.5*(r@r) + lambda2*(beta_sub2@beta_sub2) + lambda1*(np.sum(np.abs(beta_sub1))) + alpha@beta


@nb.njit(cache=True)
def prune_ls(y,X,beta,r,k,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2,M=np.inf,sea_max_itr=5):

    _, p = X.shape
    argsort = np.argsort(-np.abs(beta))
    support = argsort[:k]
    support_inv = argsort[k:]
    
    XTr = X.T@r
    beta_sub2 = beta_tilde2 - beta
    grad = -XTr + alpha - 2*lambda2*beta_sub2
    grad = grad.astype(X.dtype)
    grad_supp = np.zeros(p,dtype=X.dtype)
    grad_supp[support] = grad[support]
    
    if p > 5*k:
        Xgrad = X[:,support]@grad[support]
    else:
        Xgrad = X@grad_supp
        
    opt_step = ((grad_supp@alpha) - (r@Xgrad) - 2*lambda2*(beta_sub2@grad_supp))/((Xgrad@Xgrad) +2*lambda2*(grad_supp@grad_supp))
        
    sup_max = np.max(np.abs(beta[support]-opt_step*grad[support]))
    supinv_max = np.max(np.abs(beta[support_inv]-opt_step*grad[support_inv]))
    
    if sup_max >= supinv_max - 1e-10:
        # opt_step is less change step
        # print("Use opt step", opt_step)
        beta_new = beta - opt_step*grad
        beta_new = beta_new.astype(X.dtype)
        beta_new[argsort[k:]] = 0 
        if p > 5*k:
            r = y - X[:,argsort[:k]]@beta_new[argsort[:k]]
        else:
            r = y - X@beta_new
    else:
        # print("Use line search step, opt step is",opt_step)
        L_step = opt_step/2
        sea_itr = 0
        while sea_itr < 100:
            sup_max = np.max(np.abs(beta[support]-L_step*grad[support]))
            supinv_max = np.max(np.abs(beta[support_inv]-L_step*grad[support_inv]))
            if sup_max >= supinv_max - 1e-10:
                break
            L_step /= 2
            sea_itr += 1
        
        beta_mp = np.zeros(p)
        beta_mp[support] = beta[support]
        beta_mp = beta_mp.astype(X.dtype)
        f_best = evaluate_obj(beta_mp,y-X@beta_mp,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2) 
        sea_itr = 0
        while sea_itr < sea_max_itr:
            
            beta_tmp = beta - L_step*grad
            beta_tmp = beta_tmp.astype(X.dtype)
            argsort = np.argsort(-np.abs(beta_tmp))
            beta_tmp[argsort[k:]] = 0
            if p > 5*k:
                r_tmp = y - X[:,argsort[:k]]@beta_tmp[argsort[:k]]
            else:
                r_tmp = y - X@beta_tmp
                
            f_new = evaluate_obj(beta_tmp,r_tmp,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2)
            # print("f_new is",f_new,"f_best is",f_best,"step is", L_step)
            if f_new < f_best:
                f_best = f_new
                beta_new = np.copy(beta_tmp)
                r = np.copy(r_tmp)
            else:
                break
            L_step *= 2
            sea_itr += 1
            
    return beta_new, r



def Heuristic_LS(y,X,beta,k,alpha,lambda1,lambda2, beta_tilde1, beta_tilde2, M=np.inf,
                use_prune = True):
    
    assert M == np.inf
    assert lambda1 == 0
    
    st = time.time()
    n, p = X.shape
    alpha = np.zeros(p) if alpha is None else alpha
    beta_tilde1 = np.zeros(p) if beta_tilde1 is None else beta_tilde1
    beta_tilde2 = np.zeros(p) if beta_tilde2 is None else beta_tilde2
    
    if X.dtype == 'float32':
        lambda2 = np.float32(lambda2)
        lambda1 = np.float32(lambda1)
    
    if np.linalg.norm(alpha) > 1e-8 and use_prune:
        beta, r = prune_ls(y,X,beta,y-X@beta,k,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2,M,10)
    
    active_set = np.argsort(-np.abs(beta))
    act_idx = active_set[:k]
    
    if p < 1e7:
        beta_act = beta[act_idx]
        X_act = X[:,act_idx]
        beta_act = compute_inverse(y, X_act, alpha[act_idx], lambda2, beta_tilde2[act_idx])
    else:
        beta_act = compute_inverse(y, X, alpha, lambda2, beta_tilde2,act_idx)
    
    beta = np.zeros(p,dtype=X.dtype)
    beta[act_idx] = beta_act
    r = y - X@beta
    f = evaluate_obj(beta,r,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2)    
    sol_time = time.time()-st
    
    return beta, f, r, sol_time



def Heuristic_LSBlock(w_bar, X, beta, k, 
                      alpha=None, lambda1=0., lambda2=0., 
                      beta_tilde1=None, beta_tilde2=None, M=np.inf,
                      use_prune = True, per_idx=None, num_block=1, 
                      block_list=None, split_type=0, verbose=False):
    
    assert M == np.inf
    assert lambda1 == 0
    
    st = time.time()
    n, p = X.shape
    alpha = np.zeros(p) if alpha is None else alpha
    beta_tilde1 = np.zeros(p) if beta_tilde1 is None else beta_tilde1
    beta_tilde2 = np.zeros(p) if beta_tilde2 is None else beta_tilde2
    per_idx = np.arange(p) if per_idx is None else per_idx
    if block_list is None:
        block_list = list(range(0,p+1,int(p/num_block))) 
        block_list[-1] = p

    if X.dtype == 'float32':
        lambda2 = np.float32(lambda2)
        lambda1 = np.float32(lambda1)
    
    y = X@w_bar
    X_per = X
    w_barper = w_bar
    beta_per = beta
    alpha_per = alpha
    beta_tilde1per = beta_tilde1
    beta_tilde2per = beta_tilde2
    
    beta_new = np.zeros(p,dtype=X.dtype)
    ksum = 0
    if split_type == 0:
        
        if verbose:
            iterable = tqdm(range(len(block_list)-1))
        else:
            iterable = range(len(block_list)-1)
        
        for ib in iterable:
            idx_cur = np.arange(block_list[ib],block_list[ib+1])
            kcur = int(np.floor((block_list[ib+1]-block_list[ib])*k/p))
            ksum += kcur
            beta_new[per_idx[idx_cur]], _, _, _ = Heuristic_LS(X_per[:,idx_cur]@w_barper[idx_cur],X_per[:,idx_cur],beta_per[idx_cur],kcur,alpha_per[idx_cur],
                lambda1,lambda2,beta_tilde1per[idx_cur],beta_tilde2per[idx_cur],M,use_prune)
    else:
        
        if np.linalg.norm(alpha) > 1e-8 and use_prune:
            beta, r = prune_ls(y, X, beta, y-X@beta, k, alpha, lambda1, lambda2, beta_tilde1, beta_tilde2, M, 10)
            beta_per = beta[per_idx]
    
        active_set = np.argsort(-np.abs(beta))
        thres = np.abs(beta[active_set[k]])

        if verbose:
            iterable = tqdm(range(len(block_list)-1))
        else:
            iterable = range(len(block_list)-1)
        
        for ib in iterable:
            idx_cur = np.arange(block_list[ib], block_list[ib+1])
            
            kcur = np.sum(np.abs(beta_per[idx_cur]) > thres)
            if kcur == 0: continue
            
            ksum += kcur
            beta_new[per_idx[idx_cur]], _, _, _ = Heuristic_LS(
                X_per[:,idx_cur]@w_barper[idx_cur],
                X_per[:,idx_cur],
                beta_per[idx_cur],
                kcur,
                alpha_per[idx_cur],
                lambda1,
                lambda2,
                beta_tilde1per[idx_cur],
                beta_tilde2per[idx_cur],
                M,
                use_prune
            )
    
    sol_time = time.time() - st
    r = y-X@beta_new
    f = evaluate_obj(beta_new,r,alpha,lambda1,lambda2,beta_tilde1,beta_tilde2)    
    return beta_new, f, r, sol_time, ksum


@torch.no_grad()
def get_blocklist(model,params,block_size):
    i_w = 0
    block_list = [0]
    state_dict = model.state_dict()
    for p in params:
        param_size = np.prod(state_dict[p].shape)
        if param_size <block_size:
            block_list.append(i_w+param_size)
        else:
            num_block = int(param_size/block_size)
            block_subdiag = list(range(i_w,i_w+param_size+1,int(param_size/num_block))) 
            block_subdiag[-1] = i_w+param_size
            block_list += block_subdiag   
        i_w += param_size
    return block_list


@torch.no_grad()
def get_blocklist_custom(named_masked_parameters: list, block_size: int):
    i_w = 0
    block_list = [0]

    # start partitioning the weights into blocks
    for _, _, param in named_masked_parameters:
        param_size = np.prod(param.data.shape)

        # if the weight is smaller than the block size, let it be a block
        if param_size < block_size:
            block_list.append(i_w+param_size)

        # otherwise, partition it into blocks capped by the block size
        else:
            num_block = int(param_size/block_size)
            block_subdiag = list(range(i_w,i_w+param_size+1,int(param_size/num_block))) 
            block_subdiag[-1] = i_w+param_size
            block_list += block_subdiag   
        i_w += param_size
    return block_list
