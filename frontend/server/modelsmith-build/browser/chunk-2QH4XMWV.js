import{a as u}from"./chunk-GUZHQZYE.js";import{a as g}from"./chunk-OVV7P3NJ.js";import"./chunk-5ZTLSHJI.js";import"./chunk-6J5TQKLQ.js";import"./chunk-3JUE3TO2.js";import"./chunk-TWPDLFHB.js";import"./chunk-UFS6WKSN.js";import"./chunk-YC3BZGSA.js";import"./chunk-FOX57G4Q.js";import"./chunk-TQIVMKZC.js";import{a as h}from"./chunk-UFAXYUBR.js";import"./chunk-XB6OUWF7.js";import{b as N,c as z,g as U}from"./chunk-LRK34XDC.js";import"./chunk-5DHSU2JJ.js";import"./chunk-XX6ZYDLH.js";import"./chunk-4C4Y5ULG.js";import"./chunk-BD3YS5GK.js";import{a as x,b as J}from"./chunk-J5DLGI5P.js";import{a as k,b as D}from"./chunk-5MD26IKL.js";import"./chunk-I6FC4BFI.js";import"./chunk-YJOFM5TF.js";import{$a as s,$c as O,Da as m,Ea as f,Ra as a,Zb as V,_ as l,a as v,ab as p,b as M,bb as b,be as Q,cb as P,db as E,fb as I,ga as F,ha as c,ib as T,ie as B,kc as j,ne as L,oa as y,oc as A,oe as H,p as w,pa as S,pb as R,pe as K,qb as _,qe as q,rb as G,tb as d,te as $}from"./chunk-CQN7FGIC.js";var Z=["panelParameters"],o,C=(o=class{constructor(e,i,t){this.fb=e,this.scriptFacadeService=i,this.router=t,this.AlgorithmType=z,this.MachineUnlearningAlgorithmsEnum=U,this.isScriptActive=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(D(this)).subscribe(e=>{this.isScriptActive=N(e),N(e)?this.form.disable():this.form.enable()})}initForm(){this.form=this.fb.group({algorithm:this.fb.group({alg:[]})}),setTimeout(()=>{this.form.get("algorithm.alg")?.setValue(U.MU)},0)}submit(){if(this.isScriptActive)return;let{algorithm:e,model:i}=this.form.getRawValue(),{model:t}=i,r=M(v({},e),{params:M(v({},this.panelParametersComponent.parametersFormatted),{arch:t})});this.scriptFacadeService.dispatch(x.callScript({configs:r}))}goToChartPage(){this.router.navigate([O.RUNNING.ROOT])}},o.\u0275fac=function(i){return new(i||o)(f(L),f(J),f(j))},o.\u0275cmp=F({type:o,selectors:[["ms-machine-unlearning"]],viewQuery:function(i,t){if(i&1&&R(Z,5),i&2){let r;_(r=G())&&(t.panelParametersComponent=r.first)}},decls:15,vars:5,consts:[["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","model",3,"algorithmType"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],["mat-raised-button","","color","primary",1,"ml-2",3,"click"],[1,"right"]],template:function(i,t){if(i&1){let r=I();s(0,"p",1),d(1,"Machine Unlearning"),p(),s(2,"div",2)(3,"div",3),P(4,4),b(5,"ms-panel-model",5)(6,"ms-panel-parameters",6,0),E(),s(8,"div")(9,"button",7),T("click",function(){return y(r),S(t.submit())}),d(10," Run "),p(),s(11,"button",8),T("click",function(){return y(r),S(t.goToChartPage())}),d(12,"View Chart"),p()()(),s(13,"div",9),b(14,"ms-terminal"),p()()}i&2&&(m(2),a("formGroup",t.form),m(2),a("formGroup",t.form),m(),a("algorithmType",t.AlgorithmType.MACHINE_UNLEARNING),m(),a("algorithm",t.MachineUnlearningAlgorithmsEnum.MU),m(3),a("disabled",t.isScriptActive||t.form.invalid))},dependencies:[h,g,u,q,Q,B],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),o);C=w([k()],C);var ee=[{path:"",component:C}],X=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=c({type:e}),e.\u0275inj=l({imports:[A.forChild(ee),A]});let n=e;return n})();var Fe=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=c({type:e}),e.\u0275inj=l({imports:[V,X,h,g,u,$,H,K]});let n=e;return n})();export{Fe as MachineUnlearningModule};