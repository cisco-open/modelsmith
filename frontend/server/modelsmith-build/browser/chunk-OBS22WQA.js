import{a as u}from"./chunk-UVFNUB6P.js";import"./chunk-3JUE3TO2.js";import"./chunk-3J2AG5NI.js";import"./chunk-UFS6WKSN.js";import"./chunk-YC3BZGSA.js";import"./chunk-FOX57G4Q.js";import{a as f}from"./chunk-GSQGPZC5.js";import"./chunk-DEPG26E4.js";import{b as S,c as x,e as y}from"./chunk-LRK34XDC.js";import"./chunk-5DHSU2JJ.js";import"./chunk-XX6ZYDLH.js";import"./chunk-4C4Y5ULG.js";import"./chunk-BD3YS5GK.js";import{a as q,b as K}from"./chunk-T2KNMZTW.js";import{a as G,b as L}from"./chunk-5MD26IKL.js";import"./chunk-I6FC4BFI.js";import"./chunk-YJOFM5TF.js";import{$a as a,Da as n,Ea as g,Ra as s,Zb as D,_ as p,a as h,ab as c,b as F,bb as v,be as U,cb as E,db as P,fb as I,ga as w,ha as l,ib as N,ie as V,ne as _,oa as A,oc as C,oe as Q,p as b,pa as T,pb as O,pe as k,qb as R,qe as B,rb as j,tb as M,te as W}from"./chunk-CQN7FGIC.js";var z=["panelParameters"],r,d=(r=class{constructor(t,i){this.fb=t,this.scriptFacadeService=i,this.AlgorithmType=x,this.MultiflowAlgorithmsEnum=y,this.isScriptActive=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.form=this.fb.group({algorithm:this.fb.group({alg:[]})}),setTimeout(()=>{this.form.get("algorithm.alg")?.setValue(y.MULTIFLOW_PRUNE)},0)}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(L(this)).subscribe(t=>{this.isScriptActive=S(t),S(t)?this.form.disable():this.form.enable()})}submit(){if(this.isScriptActive)return;let{algorithm:t}=this.form.getRawValue(),i=F(h({},t),{params:h({},this.panelParametersComponent.parametersFormatted)});this.scriptFacadeService.dispatch(q.callScript({configs:i}))}},r.\u0275fac=function(i){return new(i||r)(g(_),g(K))},r.\u0275cmp=w({type:r,selectors:[["ms-multi-modal"]],viewQuery:function(i,e){if(i&1&&O(z,5),i&2){let o;R(o=j())&&(e.panelParametersComponent=o.first)}},decls:12,vars:4,consts:[["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"right"]],template:function(i,e){if(i&1){let o=I();a(0,"p",1),M(1,"Multi-modal"),c(),a(2,"div",2)(3,"div",3),E(4,4),v(5,"ms-panel-parameters",5,0),P(),a(7,"div")(8,"button",6),N("click",function(){return A(o),T(e.submit())}),M(9," Run "),c()()(),a(10,"div",7),v(11,"ms-terminal"),c()()}i&2&&(n(2),s("formGroup",e.form),n(2),s("formGroup",e.form),n(),s("algorithm",e.MultiflowAlgorithmsEnum.MULTIFLOW_PRUNE),n(3),s("disabled",e.isScriptActive||e.form.invalid))},dependencies:[u,f,U,V,B],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),r);d=b([G()],d);var H=[{path:"",component:d}],$=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[C.forChild(H),C]});let m=t;return m})();var yt=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[D,u,f,$,Q,k,W]});let m=t;return m})();export{yt as MultiModalModule};