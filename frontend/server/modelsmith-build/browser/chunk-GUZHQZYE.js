import{a as ie,b as ae,c as le,e as fe,f as Me,g as y}from"./chunk-5ZTLSHJI.js";import{b as te}from"./chunk-6J5TQKLQ.js";import{a as pe,b as ce}from"./chunk-UFS6WKSN.js";import{a as ue}from"./chunk-XB6OUWF7.js";import{b as oe}from"./chunk-LRK34XDC.js";import{c as ne,d as re}from"./chunk-XX6ZYDLH.js";import{a as me,b as de}from"./chunk-BD3YS5GK.js";import{b as se}from"./chunk-J5DLGI5P.js";import{a as K,b as h}from"./chunk-5MD26IKL.js";import{h as Q,i as Y}from"./chunk-YJOFM5TF.js";import{$a as m,$c as A,Ab as I,Cb as G,D as F,Da as n,Ea as p,Eb as _,Fb as S,Pa as s,Pd as j,Q as b,Qd as k,Ra as c,Wb as V,Xa as l,Za as L,Zb as D,Zd as B,_a as x,_d as f,ab as r,ae as $,bb as M,be as z,ca as P,ce as q,ee as v,ga as O,he as U,je as W,kb as g,lc as w,le as X,na as N,oe as H,p as T,pe as J,tb as u,vb as R,ve as Z,w as C,we as ee,zb as E}from"./chunk-CQN7FGIC.js";var ge=(i,e)=>e.name,_e=i=>[i];function Se(i,e){i&1&&M(0,"ms-spining-indicator",10)}function ve(i,e){if(i&1&&s(0,Se,1,0,"ms-spining-indicator",10),i&2){let t=g(2);l(e===t.PageKey.MODEL_TRAINING?0:-1)}}function ye(i,e){if(i&1&&(m(0,"div",3)(1,"a",9),u(2,"Train models"),r(),s(3,ve,1,1),_(4,"async"),r()),i&2){let t,o=g();n(),c("routerLink",G(4,_e,"/"+o.RoutesList.MODEL_TRAINING.ROOT)),n(2),l((t=S(4,2,o.pageRunningScriptSpiningIndicatorService.currentRunningPage$))?3:-1,t)}}function Te(i,e){i&1&&M(0,"mat-icon",13)}function Fe(i,e){if(i&1&&(m(0,"mat-option",11),u(1),s(2,Te,1,0,"mat-icon",13),r()),i&2){let t=e.$implicit;c("value",t.name)("disabled",!t.isTrained),n(),R(" ",t.name," "),n(),l(t.isTrained?-1:2)}}function be(i,e){i&1&&(m(0,"mat-option",12),u(1,"No results found"),r())}function Pe(i,e){if(i&1&&(L(0,Fe,3,4,"mat-option",11,ge),s(2,be,2,0,"mat-option",12)),i&2){let t=e;x(t),n(2),l(t.length===0?2:-1)}}var a,he=(a=class{ngOnChanges(e){e.algorithmType&&e.algorithmType.currentValue&&this.configureModels(e.algorithmType.currentValue)}get parentFormGroup(){return this.controlContainer.control}get modelFormGroup(){return this.parentFormGroup.get(this.controlKey)}get modelControl(){return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME)}constructor(e,t,o,d){this.controlContainer=e,this.modelsFacadeService=t,this.scriptFacadeService=o,this.pageRunningScriptSpiningIndicatorService=d,this.controlKey="",this.isTrainModelsPageRouteVisible=!0,this.PageKey=ae,this.RoutesList=A,this.searchModel=new v,this.models=[],this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.listenToScriptStateChanges(),this.listenToSearchModelValueChanges(),this.configureModels(this.algorithmType)}configureModels(e){e&&(this.getModelsByTypeSubscription?.unsubscribe(),this.getModelsByTypeSubscription=this.subscribeToModelsListChanges(e),this.modelsFacadeService.dispatch(y.getModelsList({algorithmType:e})),this.modelsFacadeService.dispatch(y.getCurrentOrPreviousSelectedModel({algorithmType:e})))}listenToCurrentModelChanges(){this.modelsFacadeService.currentModel$.pipe(h(this)).subscribe(e=>{if(ne(e))return;let t=this.models.find(o=>o.name===e);t&&t.isTrained&&this.modelControl?.patchValue(e)})}subscribeToModelsListChanges(e){let t=!1;return this.modelsFacadeService.getModelsByType(e).pipe(F(o=>!re(o)),C(o=>[...o].sort((d,Ce)=>Number(Ce.isTrained)-Number(d.isTrained)))).subscribe(o=>{this.models=o,this.searchModel.setValue(""),t||(this.listenToCurrentModelChanges(),t=!0)})}initializeForm(){this.parentFormGroup.addControl(this.controlKey,new q({[this.MODEL_CONTROL_NAME]:new v("",B.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(h(this)).subscribe(e=>{oe(e)?this.modelFormGroup.disable():this.modelFormGroup.enable()})}listenToSearchModelValueChanges(){this.filteredModels=this.searchModel.valueChanges.pipe(h(this),b(""),C(e=>this.filterModels(e)))}filterModels(e){let t=e.toLowerCase();return this.models.filter(o=>o.name.toLowerCase().includes(t))}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},a.\u0275fac=function(t){return new(t||a)(p(f),p(ue),p(se),p(le))},a.\u0275cmp=O({type:a,selectors:[["ms-panel-model"]],inputs:{controlKey:"controlKey",algorithmType:"algorithmType",isTrainModelsPageRouteVisible:"isTrainModelsPageRouteVisible"},standalone:!0,features:[E([],[{provide:f,useFactory:()=>P(f,{skipSelf:!0})}]),N,I],decls:13,vars:6,consts:[[1,"ms-card","model-card"],[1,"panel-title-wrapper"],[1,"heading-sub-section-title"],[1,"train-models"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],[3,"formControl"],["label","Predefined Models"],[3,"routerLink"],[1,"ml-2"],[3,"value","disabled"],["disabled",""],["fontSet","ms","fontIcon","icon-X",1,"mat-error"]],template:function(t,o){if(t&1&&(m(0,"mat-card",0)(1,"div",1)(2,"div",2),u(3,"Model"),r(),s(4,ye,5,6,"div",3),r(),m(5,"div",4)(6,"mat-form-field",5)(7,"mat-select",6)(8,"mat-option"),M(9,"ngx-mat-select-search",7),r(),m(10,"mat-optgroup",8),s(11,Pe,3,1),_(12,"async"),r()()()()()),t&2){let d;n(4),l(o.isTrainModelsPageRouteVisible?4:-1),n(),c("formGroupName",o.controlKey),n(4),c("formControl",o.searchModel),n(2),l((d=S(12,4,o.filteredModels))?11:-1,d)}},dependencies:[D,V,H,$,z,J,U,X,W,de,me,Y,Q,ce,pe,k,j,ee,Z,Me,fe,w,te,ie],styles:[".panel-title-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:12px}.panel-title-wrapper[_ngcontent-%COMP%]   .train-models[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),a);he=T([K()],he);export{he as a};