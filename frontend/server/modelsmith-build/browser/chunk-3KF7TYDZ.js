import{a as d}from"./chunk-56ZIA5LY.js";import{a as u}from"./chunk-7WJ3X3XV.js";import"./chunk-DSSER6OZ.js";import"./chunk-OWJBZ7BL.js";import"./chunk-BTI2I76F.js";import"./chunk-SLUK3QXN.js";import"./chunk-GACPU6QS.js";import"./chunk-2CKK74GJ.js";import"./chunk-6JSLXF7X.js";import"./chunk-NAEQPCWM.js";import{a as f}from"./chunk-DVROOOU6.js";import"./chunk-PGXHYGLR.js";import"./chunk-H5KPAO55.js";import"./chunk-XCVN6GNY.js";import{b as A,c as K,h as T}from"./chunk-LRK34XDC.js";import"./chunk-VLO6NL53.js";import"./chunk-GWFXRHCV.js";import"./chunk-XX6ZYDLH.js";import"./chunk-QXM4YYRP.js";import{a as q,b as Z}from"./chunk-3IJULEGV.js";import{a as G,b as W}from"./chunk-QJ55TOIV.js";import"./chunk-CYUWMGXJ.js";import"./chunk-HULQWYRR.js";import{$a as s,Da as m,Ea as y,Ra as a,Zb as j,_ as p,a as g,ab as c,b as v,bb as C,be as z,cb as w,db as I,fb as N,ga as Q,ha as l,ib as E,ie as D,ne as O,oa as F,oc as M,oe as _,p as b,pa as P,pb as V,pe as U,qb as L,qe as k,rb as R,tb as S,te as B}from"./chunk-DL2LTWBU.js";var H=["panelParameters"],r,h=(r=class{constructor(t,i){this.fb=t,this.scriptFacadeService=i,this.AlgorithmType=K,this.AWQAlgorithmsEnum=T,this.isScriptActive=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(W(this)).subscribe(t=>{this.isScriptActive=A(t),A(t)?this.form.disable():this.form.enable()})}initForm(){this.form=this.fb.group({algorithm:this.fb.group({alg:[]})}),setTimeout(()=>{this.form.get("algorithm.alg")?.setValue(T.AWQ_QUANTIZATION)},0)}submit(){if(this.isScriptActive)return;let{algorithm:t,model:i}=this.form.getRawValue(),{model:e}=i,o=v(g({},t),{params:v(g({},this.panelParametersComponent.parametersFormatted),{model:e})});this.scriptFacadeService.dispatch(q.callScript({configs:o}))}},r.\u0275fac=function(i){return new(i||r)(y(O),y(Z))},r.\u0275cmp=Q({type:r,selectors:[["ms-llm-quantization"]],viewQuery:function(i,e){if(i&1&&V(H,5),i&2){let o;L(o=R())&&(e.panelParametersComponent=o.first)}},decls:13,vars:6,consts:[["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","model",3,"algorithmType","isTrainModelsPageRouteVisible"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"right"]],template:function(i,e){if(i&1){let o=N();s(0,"p",1),S(1,"LLM Quantization"),c(),s(2,"div",2)(3,"div",3),w(4,4),C(5,"ms-panel-model",5)(6,"ms-panel-parameters",6,0),I(),s(8,"div")(9,"button",7),E("click",function(){return F(o),P(e.submit())}),S(10," Run "),c()()(),s(11,"div",8),C(12,"ms-terminal"),c()()}i&2&&(m(2),a("formGroup",e.form),m(2),a("formGroup",e.form),m(),a("algorithmType",e.AlgorithmType.AWQ)("isTrainModelsPageRouteVisible",!1),m(),a("algorithm",e.AWQAlgorithmsEnum.AWQ_QUANTIZATION),m(3),a("disabled",e.isScriptActive||e.form.invalid))},dependencies:[d,u,f,z,D,k],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),r);h=b([G()],h);var J=[{path:"",component:h}],x=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[M.forChild(J),M]});let n=t;return n})();var bt=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[j,x,d,u,f,U,_,B]});let n=t;return n})();export{bt as LlmQuantizationModule};
