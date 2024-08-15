import{a as O}from"./chunk-GHKGBBCJ.js";import{a as I}from"./chunk-5UNC4D55.js";import"./chunk-CL4NP3ZD.js";import"./chunk-Y3MTSOK6.js";import"./chunk-LUNV5XO5.js";import"./chunk-42IERHVK.js";import{a as Ot,b as It}from"./chunk-MNE6DP2E.js";import"./chunk-FYI76WH6.js";import"./chunk-GYAAXGUQ.js";import"./chunk-HDPWJQCH.js";import{a as _,b as Et,c as Rt,d as H}from"./chunk-YRCSIXBW.js";import"./chunk-5W26LES3.js";import{b as g,d as z,e as Mt,g as h,j as Ft,o as Pt}from"./chunk-RENQI7JV.js";import"./chunk-CMCNYU7P.js";import{a as Nt,b as _t}from"./chunk-5JTKICYY.js";import{a as P,b as N,d as bt,k as Gt}from"./chunk-3UC4T722.js";import{a as T,b as f}from"./chunk-3XBILL7M.js";import"./chunk-IJM4QX5I.js";import"./chunk-I3MTJCFW.js";import{h as At,i as Tt}from"./chunk-NU3OOYKN.js";import{B as yt,w as st,y as vt}from"./chunk-3ESPD3TC.js";import{$d as ut,Bb as it,Cb as rt,Cc as Q,Db as ot,E as C,Fb as d,Fd as lt,Gd as pt,Hb as V,I as B,J as Z,Lb as nt,N as J,Na as n,Oa as c,Pd as ct,Qd as u,Sd as dt,Td as M,Ud as F,W,Wd as ht,_d as ft,a as R,b as L,bb as m,be as gt,ee as St,fa as v,fe as Ct,ja as X,jb as D,kb as k,kc as at,lb as a,mb as s,nb as U,oa as y,ob as Y,p as S,pa as A,pb as tt,rb as et,ub as K,x as q,xa as w,ya as j,yc as mt}from"./chunk-YQNKZLSG.js";var Lt=(r,t)=>t.key;function Ut(r,t){if(r&1&&(a(0,"mat-option",6),d(1),s()),r&2){let e=t.$implicit;m("value",e.key),n(),V(" ",e.value," ")}}function Kt(r,t){if(r&1&&(a(0,"mat-option",6),d(1),s()),r&2){let e=t.$implicit;m("value",e.key),n(),V(" ",e.value," ")}}var l,b=(l=class{get parentFormGroup(){return this.controlContainer.control}get algorithmFormGroup(){return this.parentFormGroup.get(this.controlKey)}get algorithmFormControl(){return this.algorithmFormGroup?.get(this.ALGORITHM_CONTROL_NAME)}constructor(t,e){this.controlContainer=t,this.scriptFacadeService=e,this.controlKey="",this.pruningAlgorithmsList=Et,this.quantAlgorithmsList=Rt,this.ALGORITHM_CONTROL_NAME="alg"}ngOnInit(){this.initForm(),this.listenToScriptStateChanges(),this.loadInitialData()}loadInitialData(){this.scriptFacadeService.scriptDetails$.pipe(W(1),Z(1),C(t=>!Mt(t?.algKey))).subscribe(t=>{let e=t.type,o=e===h.PRUNING||e===h.QUANTIZATION?t.algKey:H;this.algorithmFormControl?.setValue(o)}),this.scriptFacadeService.dispatch(P.getCurrentOrLastActiveScriptDetails())}initForm(){this.parentFormGroup.addControl(this.controlKey,new F({[this.ALGORITHM_CONTROL_NAME]:new ht(H,ct.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(f(this)).subscribe(t=>{g(t)?this.algorithmFormGroup.disable():this.algorithmFormGroup.enable()})}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},l.\u0275fac=function(e){return new(e||l)(c(u),c(N))},l.\u0275cmp=y({type:l,selectors:[["ms-panel-algorithm"]],inputs:{controlKey:"controlKey"},features:[nt([],[{provide:u,useFactory:()=>X(u,{skipSelf:!0})}])],decls:12,vars:2,consts:[[1,"ms-card","algorithm-card"],[1,"heading-sub-section-title"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],[3,"formControlName"],["label","Pruning"],[3,"value"],["label","Quantization"]],template:function(e,i){e&1&&(a(0,"mat-card",0)(1,"p",1),d(2,"Algorithm"),s(),a(3,"div",2)(4,"mat-form-field",3)(5,"mat-select",4)(6,"mat-optgroup",5),D(7,Ut,2,2,"mat-option",6,Lt),s(),a(9,"mat-optgroup",7),D(10,Kt,2,2,"mat-option",6,Lt),s()()()()()),e&2&&(n(3),m("formGroupName",i.controlKey),n(2),m("formControlName",i.ALGORITHM_CONTROL_NAME),n(2),k(i.pruningAlgorithmsList),n(3),k(i.quantAlgorithmsList))},dependencies:[Nt,At,Ot,pt,lt,dt,M,gt,ut]}),l);b=S([T()],b);var x="custommodel";function wt(r){let t=r.replace(/[^a-zA-Z0-9_]/g,"_");return/^[0-9_]/.test(t)&&(t="file_"+t),/.py$/.test(t)||(t+=".py"),t}var Qt=["panelParameters"],p,G=(p=class{constructor(t,e,i,o){this.scriptFacadeService=t,this.fileService=e,this.snackbarService=i,this.router=o,this.form=new F({}),this.AlgorithmType=h,this.isScriptActive=!1,this.isQuantAlgorithmSelected=!1,this.selectedAlgorithm=Ft.IMP,this.selectedAlgorithmType=h.PRUNING}ngOnInit(){this.listenToAlgorithmPanelChanges(),this.listenToScriptStateChanges()}listenToAlgorithmPanelChanges(){this.form.valueChanges.pipe(B(50),q(()=>{let t=this.form.getRawValue();return t.algorithm&&t.algorithm.alg}),J(),C(t=>!z(t)),f(this)).subscribe(t=>{this.selectedAlgorithm=t,this.selectedAlgorithmType=Pt(t)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(f(this)).subscribe(t=>{this.isScriptActive=g(t),g(t)?this.form.disable():this.form.enable()})}submit(){if(z(this.selectedAlgorithm)){this.snackbarService.showError("Select an algorithm before running a script.");return}let{algorithm:t,model:e}=this.form.getRawValue(),{model:i}=e;if(i===x&&!this.fileService.isFileLoaded){this.snackbarService.showError("Please select a predefined model or upload a custom file.");return}let o=i===x?wt(this.fileService?.file.name):i,E=L(R({},t),{params:L(R({},this.panelParametersComponent.parametersFormatted),{arch:o})});this.scriptFacadeService.dispatch(P.callScript({configs:E}))}goToChartPage(){this.router.navigate([st.RUNNING.ROOT])}},p.\u0275fac=function(e){return new(e||p)(c(N),c(Gt),c(bt),c(mt))},p.\u0275cmp=y({type:p,selectors:[["ms-machine-unlearning"]],viewQuery:function(e,i){if(e&1&&it(Qt,5),e&2){let o;rt(o=ot())&&(i.panelParametersComponent=o.first)}},decls:17,vars:5,consts:[["panelAlgorithm",""],["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","algorithm"],["controlKey","model",3,"algorithmType"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],["mat-raised-button","","color","primary",1,"ml-2",3,"click"],[1,"right"]],template:function(e,i){if(e&1){let o=et();a(0,"p",2),d(1,"Model Compression"),s(),a(2,"div",3)(3,"div",4),Y(4,5),U(5,"ms-panel-algorithm",6,0)(7,"ms-panel-model",7)(8,"ms-panel-parameters",8,1),tt(),a(10,"div")(11,"button",9),K("click",function(){return w(o),j(i.submit())}),d(12," Run "),s(),a(13,"button",10),K("click",function(){return w(o),j(i.goToChartPage())}),d(14,"View Chart"),s()()(),a(15,"div",11),U(16,"ms-terminal"),s()()}e&2&&(n(2),m("formGroup",i.form),n(2),m("formGroup",i.form),n(3),m("algorithmType",i.selectedAlgorithmType),n(),m("algorithm",i.selectedAlgorithm),n(3),m("disabled",i.isScriptActive||i.form.invalid))},dependencies:[_,O,I,M,ft,vt,b],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),p);G=S([T()],G);var zt=[{path:"",component:G}],jt=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=A({type:t}),t.\u0275inj=v({imports:[Q.forChild(zt),Q]});let r=t;return r})();var $e=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=A({type:t}),t.\u0275inj=v({imports:[at,jt,_,O,I,_t,Tt,It,St,Ct,yt]});let r=t;return r})();export{$e as ModelCompressionModule};