import{a as c,c as a}from"./chunk-C4NPICWQ.js";import{c as S}from"./chunk-XX6ZYDLH.js";import{a as A,b as f}from"./chunk-K6MLUSZ7.js";import{B as I,G as s,N as p,P as O,S as o,W as E,Z as u,k as n}from"./chunk-ED6LLMLR.js";var r=function(e){return e.MODEL_COMPRESSION="MODEL_COMPRESSION",e.MACHINE_UNLEARNING="MACHINE_UNLEARNING",e.MODEL_TRAINING="MODEL_TRAINING",e.AWQ="AWQ",e.MODEL_SPECIALIZATION="MODEL_SPECIALIZATION",e.DIFFUSION_MODEL="DIFFUSION_MODEL",e.NONE="NONE",e}(r||{});var h=(()=>{let N=class N{get currentRunningPageInfo$(){return this._currentRunningPageInfo.asObservable()}constructor(t){this.scriptFacadeService=t,this._currentRunningPageInfo=new n({page:r.NONE,algKey:"",type:null})}trackCurrentRunningPage(){this.scriptFacadeService.scriptStatus$.pipe(I(t=>t===c.RUNNING||t===c.STOPPING),o(()=>this.scriptFacadeService.dispatch(A.getCurrentOrLastActiveScriptDetails())),O(()=>this.scriptFacadeService.scriptDetails$.pipe(p(1),s(1),I(t=>!S(t?.algKey))))).subscribe(t=>{let i;switch(t.type){case a.PRUNING:case a.QUANTIZATION:i=r.MODEL_COMPRESSION;break;case a.MACHINE_UNLEARNING:i=r.MACHINE_UNLEARNING;break;case a.AWQ:i=r.AWQ;break;case a.TRAIN:i=r.MODEL_TRAINING;break;case a.MULTIFLOW:i=r.MODEL_SPECIALIZATION;break;case a.DIFFUSION_MODEL:i=r.DIFFUSION_MODEL;break;default:i=r.NONE;break}this._currentRunningPageInfo.next({page:i,algKey:t.algKey??"",type:t.type??null})}),this.scriptFacadeService.scriptStatus$.subscribe(t=>{t!==c.RUNNING&&t!==c.STOPPING&&this._currentRunningPageInfo.next({page:r.NONE,algKey:"",type:null})})}};N.\u0275fac=function(i){return new(i||N)(u(f))},N.\u0275prov=E({token:N,factory:N.\u0275fac});let e=N;return e})();export{r as a,h as b};
