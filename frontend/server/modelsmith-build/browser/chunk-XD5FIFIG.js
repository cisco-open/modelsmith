import{a as d}from"./chunk-LYB3KK5U.js";import{a as u}from"./chunk-OAO25QRD.js";import"./chunk-DV62OWLC.js";import"./chunk-OWLYOD4I.js";import"./chunk-VLJTKNYA.js";import"./chunk-MK5CNTNK.js";import"./chunk-PFRJUVJF.js";import"./chunk-JMFIGVCB.js";import"./chunk-SKF36LYU.js";import"./chunk-OA3ZLQZZ.js";import{a as f}from"./chunk-ZNWO7R4M.js";import"./chunk-VCXNN3TV.js";import{b as A,c as K,h as T}from"./chunk-LRK34XDC.js";import"./chunk-QVMVB2QY.js";import"./chunk-XX6ZYDLH.js";import"./chunk-HYU5IWX7.js";import"./chunk-YPMBMI5J.js";import{a as q,b as Z}from"./chunk-QTJZRTNN.js";import{a as G,b as W}from"./chunk-6VRVKV6C.js";import"./chunk-W4S57J6B.js";import"./chunk-7IF2CO5G.js";import{$ as p,Ea as m,Fa as y,Sa as a,_b as j,a as g,ab as s,b as v,bb as c,cb as C,ce as z,db as w,eb as I,gb as N,ha as Q,ia as l,jb as E,je as D,oe as O,p as b,pa as F,pc as M,pe as _,qa as P,qb as V,qe as U,rb as L,re as k,sb as R,ub as S,ue as B}from"./chunk-64NP6AY6.js";var H=["panelParameters"],r,h=(r=class{constructor(t,i){this.fb=t,this.scriptFacadeService=i,this.AlgorithmType=K,this.AWQAlgorithmsEnum=T,this.isScriptActive=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(W(this)).subscribe(t=>{this.isScriptActive=A(t),A(t)?this.form.disable():this.form.enable()})}initForm(){this.form=this.fb.group({algorithm:this.fb.group({alg:[]})}),setTimeout(()=>{this.form.get("algorithm.alg")?.setValue(T.AWQ_QUANTIZATION)},0)}submit(){if(this.isScriptActive)return;let{algorithm:t,model:i}=this.form.getRawValue(),{model:e}=i,o=v(g({},t),{params:v(g({},this.panelParametersComponent.parametersFormatted),{model:e})});this.scriptFacadeService.dispatch(q.callScript({configs:o}))}},r.\u0275fac=function(i){return new(i||r)(y(O),y(Z))},r.\u0275cmp=Q({type:r,selectors:[["ms-llm-quantization"]],viewQuery:function(i,e){if(i&1&&V(H,5),i&2){let o;L(o=R())&&(e.panelParametersComponent=o.first)}},decls:13,vars:6,consts:[["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","model",3,"algorithmType","isTrainModelsPageRouteVisible"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"right"]],template:function(i,e){if(i&1){let o=N();s(0,"p",1),S(1,"LLM Quantization"),c(),s(2,"div",2)(3,"div",3),w(4,4),C(5,"ms-panel-model",5)(6,"ms-panel-parameters",6,0),I(),s(8,"div")(9,"button",7),E("click",function(){return F(o),P(e.submit())}),S(10," Run "),c()()(),s(11,"div",8),C(12,"ms-terminal"),c()()}i&2&&(m(2),a("formGroup",e.form),m(2),a("formGroup",e.form),m(),a("algorithmType",e.AlgorithmType.AWQ)("isTrainModelsPageRouteVisible",!1),m(),a("algorithm",e.AWQAlgorithmsEnum.AWQ_QUANTIZATION),m(3),a("disabled",e.isScriptActive||e.form.invalid))},dependencies:[d,u,f,z,D,k],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),r);h=b([G()],h);var J=[{path:"",component:h}],x=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[M.forChild(J),M]});let n=t;return n})();var bt=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[j,x,d,u,f,U,_,B]});let n=t;return n})();export{bt as LlmQuantizationModule};
