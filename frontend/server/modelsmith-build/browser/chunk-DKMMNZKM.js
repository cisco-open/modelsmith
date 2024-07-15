import{a as te,b as re,c as se,e as ue,f as fe}from"./chunk-M3BJA4RX.js";import{b as ee}from"./chunk-DFEVON6A.js";import{a as de,b as pe}from"./chunk-A3HRP5BG.js";import{a as y,c as ce}from"./chunk-BY5EH3KZ.js";import{b as ie,e as oe,f as ne}from"./chunk-W4U3FJPJ.js";import{a as le,b as me}from"./chunk-I4357ONH.js";import{b as ae}from"./chunk-KE2JE72J.js";import{a as K,b as h}from"./chunk-COKZMNNS.js";import{h as J,i as Q}from"./chunk-RTK5DRKR.js";import{$a as x,$d as f,Ab as E,Bb as I,Db as G,E as F,Ea as n,Fa as p,Fb as _,Gb as S,Qa as s,Qd as j,R as b,Rd as k,Sa as c,Xb as V,Ya as l,_a as L,_b as D,_d as B,ab as d,ad as A,bb as r,be as $,cb as M,ce as z,da as P,de as q,fe as v,ha as O,ie as U,ke as W,lb as g,mc as w,me as X,oa as N,p as T,qe as H,ub as u,wb as R,we as Y,x as C,xe as Z}from"./chunk-I5FNXPEQ.js";var Ce=(i,e)=>e.name,ge=i=>[i];function _e(i,e){i&1&&M(0,"ms-spining-indicator",10)}function Se(i,e){if(i&1&&s(0,_e,1,0,"ms-spining-indicator",10),i&2){let t=g(2);l(e===t.PageKey.MODEL_TRAINING?0:-1)}}function ve(i,e){if(i&1&&(d(0,"div",3)(1,"a",9),u(2,"Train models"),r(),s(3,Se,1,1),_(4,"async"),r()),i&2){let t,o=g();n(),c("routerLink",G(4,ge,"/"+o.RoutesList.MODEL_TRAINING.ROOT)),n(2),l((t=S(4,2,o.pageRunningScriptSpiningIndicatorService.currentRunningPage$))?3:-1,t)}}function ye(i,e){i&1&&M(0,"mat-icon",13)}function Te(i,e){if(i&1&&(d(0,"mat-option",11),u(1),s(2,ye,1,0,"mat-icon",13),r()),i&2){let t=e.$implicit;c("value",t.name)("disabled",!t.isTrained),n(),R(" ",t.name," "),n(),l(t.isTrained?-1:2)}}function Fe(i,e){i&1&&(d(0,"mat-option",12),u(1,"No results found"),r())}function be(i,e){if(i&1&&(L(0,Te,3,4,"mat-option",11,Ce),s(2,Fe,2,0,"mat-option",12)),i&2){let t=e;x(t),n(2),l(t.length===0?2:-1)}}var a,Me=(a=class{ngOnChanges(e){e.algorithmType&&e.algorithmType.currentValue&&this.configureModels(e.algorithmType.currentValue)}get parentFormGroup(){return this.controlContainer.control}get modelFormGroup(){return this.parentFormGroup.get(this.controlKey)}get modelControl(){return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME)}constructor(e,t,o,m){this.controlContainer=e,this.modelsFacadeService=t,this.scriptFacadeService=o,this.pageRunningScriptSpiningIndicatorService=m,this.controlKey="",this.isTrainModelsPageRouteVisible=!0,this.PageKey=re,this.RoutesList=A,this.searchModel=new v,this.models=[],this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.listenToScriptStateChanges(),this.listenToSearchModelValueChanges(),this.configureModels(this.algorithmType)}configureModels(e){e&&(this.getModelsByTypeSubscription?.unsubscribe(),this.getModelsByTypeSubscription=this.subscribeToModelsListChanges(e),this.modelsFacadeService.dispatch(y.getModelsList({algorithmType:e})),this.modelsFacadeService.dispatch(y.getCurrentOrPreviousSelectedModel({algorithmType:e})))}listenToCurrentModelChanges(){this.modelsFacadeService.currentModel$.pipe(h(this)).subscribe(e=>{if(oe(e))return;let t=this.models.find(o=>o.name===e);t&&t.isTrained&&this.modelControl?.patchValue(e)})}subscribeToModelsListChanges(e){let t=!1;return this.modelsFacadeService.getModelsByType(e).pipe(F(o=>!ne(o)),C(o=>[...o].sort((m,he)=>Number(he.isTrained)-Number(m.isTrained)))).subscribe(o=>{this.models=o,this.searchModel.setValue(""),t||(this.listenToCurrentModelChanges(),t=!0)})}initializeForm(){this.parentFormGroup.addControl(this.controlKey,new q({[this.MODEL_CONTROL_NAME]:new v("",B.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(h(this)).subscribe(e=>{ie(e)?this.modelFormGroup.disable():this.modelFormGroup.enable()})}listenToSearchModelValueChanges(){this.filteredModels=this.searchModel.valueChanges.pipe(h(this),b(""),C(e=>this.filterModels(e)))}filterModels(e){let t=e.toLowerCase();return this.models.filter(o=>o.name.toLowerCase().includes(t))}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},a.\u0275fac=function(t){return new(t||a)(p(f),p(ce),p(ae),p(se))},a.\u0275cmp=O({type:a,selectors:[["ms-panel-model"]],inputs:{controlKey:"controlKey",algorithmType:"algorithmType",isTrainModelsPageRouteVisible:"isTrainModelsPageRouteVisible"},standalone:!0,features:[E([],[{provide:f,useFactory:()=>P(f,{skipSelf:!0})}]),N,I],decls:13,vars:6,consts:[[1,"ms-card","model-card"],[1,"panel-title-wrapper"],[1,"heading-sub-section-title"],[1,"train-models"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],["label","Predefined Models"],[3,"formControl"],[3,"routerLink"],[1,"ml-2"],[3,"value","disabled"],["disabled",""],["fontSet","ms","fontIcon","icon-X",1,"mat-error"]],template:function(t,o){if(t&1&&(d(0,"mat-card",0)(1,"div",1)(2,"div",2),u(3,"Model"),r(),s(4,ve,5,6,"div",3),r(),d(5,"div",4)(6,"mat-form-field",5)(7,"mat-select",6)(8,"mat-optgroup",7)(9,"mat-option"),M(10,"ngx-mat-select-search",8),r(),s(11,be,3,1),_(12,"async"),r()()()()()),t&2){let m;n(4),l(o.isTrainModelsPageRouteVisible?4:-1),n(),c("formGroupName",o.controlKey),n(5),c("formControl",o.searchModel),n(),l((m=S(12,4,o.filteredModels))?11:-1,m)}},dependencies:[H,$,z,U,X,W,me,le,Q,J,pe,de,k,j,Z,Y,D,V,fe,ue,w,ee,te],styles:[".panel-title-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:12px}.panel-title-wrapper[_ngcontent-%COMP%]   .train-models[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),a);Me=T([K()],Me);export{Me as a};
