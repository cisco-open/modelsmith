import{b as fe,c as ge}from"./chunk-JZLUCDH7.js";import{a as F,c as ue}from"./chunk-4KWEJN4U.js";import{Aa as g,Ad as oe,Bc as H,Bd as ne,Ea as M,H as I,Hc as J,Ic as Q,Md as re,Na as c,Nd as ae,Pa as x,Pd as se,S as O,Sd as le,T as P,Ta as E,Ua as L,Wa as R,Y as N,Ya as S,Yb as w,Za as y,Zc as Y,Zd as me,_b as A,_c as Z,_d as pe,dc as B,ec as k,fb as G,gb as V,he as ce,ie as de,ja as n,ka as p,kc as j,lc as d,m as T,mb as D,nc as $,oc as z,pb as K,pc as X,qa as l,qc as v,rd as ee,s as _,sa as r,sd as h,tc as q,td as te,vc as U,w as b,wa as m,wd as ie,xa as a,xc as W,ya as u,za as f}from"./chunk-AIAH5BT5.js";var Ce=o=>[o];function _e(o,e){o&1&&(f(0),u(1,"ms-spining-indicator",12),g())}function Se(o,e){if(o&1&&(f(0),l(1,_e,2,0,"ng-container",9),g()),o&2){let t=e.ngIf,i=M(2);n(),r("ngIf",t===i.PageKey.MODEL_TRAINING)}}function ye(o,e){if(o&1&&(m(0,"div",10)(1,"a",11),c(2,"Train models"),a(),l(3,Se,2,1,"ng-container",9),S(4,"async"),a()),o&2){let t=M();n(),r("routerLink",R(4,Ce,"/"+t.RoutesList.MODEL_TRAINING.ROOT)),n(2),r("ngIf",y(4,2,t.pageRunningScriptSpiningIndicatorService.currentRunningPage$))}}function ve(o,e){o&1&&u(0,"mat-icon",17)}function Fe(o,e){if(o&1&&(m(0,"mat-option",15),c(1),l(2,ve,1,0,"mat-icon",16),a()),o&2){let t=e.$implicit;r("value",t.name)("disabled",!t.isTrained),n(),x(" ",t.name," "),n(),r("ngIf",!t.isTrained)}}function Te(o,e){o&1&&(m(0,"mat-option",18),c(1,"No results found"),a())}function be(o,e){if(o&1&&(f(0),l(1,Fe,3,4,"mat-option",13)(2,Te,2,0,"mat-option",14),g()),o&2){let t=e.ngIf,i=M();n(),r("ngForOf",t)("ngForTrackBy",i.trackByModel),n(),r("ngIf",t.length===0)}}var s,Me=(s=class{ngOnChanges(e){e.algorithmType&&e.algorithmType.currentValue&&this.configureModels(e.algorithmType.currentValue)}get parentFormGroup(){return this.controlContainer.control}get modelFormGroup(){return this.parentFormGroup.get(this.controlKey)}get modelControl(){return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME)}constructor(e,t,i,C){this.controlContainer=e,this.modelsFacadeService=t,this.scriptFacadeService=i,this.pageRunningScriptSpiningIndicatorService=C,this.controlKey="",this.isTrainModelsPageRouteVisible=!0,this.PageKey=te,this.RoutesList=A,this.searchModel=new v,this.models=[],this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.listenToScriptStateChanges(),this.listenToSearchModelValueChanges(),this.configureModels(this.algorithmType)}configureModels(e){e&&(this.getModelsByTypeSubscription?.unsubscribe(),this.getModelsByTypeSubscription=this.subscribeToModelsListChanges(e),this.modelsFacadeService.dispatch(F.getModelsList({algorithmType:e})),this.modelsFacadeService.dispatch(F.getCurrentOrPreviousSelectedModel({algorithmType:e})))}listenToCurrentModelChanges(){this.modelsFacadeService.currentModel$.pipe(h(this)).subscribe(e=>{if(oe(e))return;let t=this.models.find(i=>i.name===e);t&&t.isTrained&&this.modelControl?.patchValue(e)})}subscribeToModelsListChanges(e){let t=!1;return this.modelsFacadeService.getModelsByType(e).pipe(b(i=>!ne(i)),_(i=>[...i].sort((C,he)=>Number(he.isTrained)-Number(C.isTrained)))).subscribe(i=>{this.models=i,this.searchModel.setValue(""),t||(this.listenToCurrentModelChanges(),t=!0)})}initializeForm(){this.parentFormGroup.addControl(this.controlKey,new X({[this.MODEL_CONTROL_NAME]:new v("",j.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(h(this)).subscribe(e=>{ie(e)?this.modelFormGroup.disable():this.modelFormGroup.enable()})}listenToSearchModelValueChanges(){this.filteredModels=this.searchModel.valueChanges.pipe(h(this),I(""),_(e=>this.filterModels(e)))}filterModels(e){let t=e.toLowerCase();return this.models.filter(i=>i.name.toLowerCase().includes(t))}trackByModel(e,t){return t.name}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},s.\u0275fac=function(t){return new(t||s)(p(d),p(ue),p(re),p(ae))},s.\u0275cmp=P({type:s,selectors:[["ms-panel-model"]],inputs:{controlKey:"controlKey",algorithmType:"algorithmType",isTrainModelsPageRouteVisible:"isTrainModelsPageRouteVisible"},standalone:!0,features:[E([],[{provide:d,useFactory:()=>O(d,{skipSelf:!0})}]),N,L],decls:13,vars:6,consts:[[1,"ms-card","model-card"],[1,"panel-title-wrapper"],[1,"heading-sub-section-title"],["class","train-models",4,"ngIf"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],["label","Predefined Models"],[3,"formControl"],[4,"ngIf"],[1,"train-models"],[3,"routerLink"],[1,"ml-2"],[3,"value","disabled",4,"ngFor","ngForOf","ngForTrackBy"],["disabled","",4,"ngIf"],[3,"value","disabled"],["class","mat-error","fontSet","ms","fontIcon","icon-X",4,"ngIf"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"],["disabled",""]],template:function(t,i){t&1&&(m(0,"mat-card",0)(1,"div",1)(2,"div",2),c(3,"Model"),a(),l(4,ye,5,6,"div",3),a(),m(5,"div",4)(6,"mat-form-field",5)(7,"mat-select",6)(8,"mat-optgroup",7)(9,"mat-option"),u(10,"ngx-mat-select-search",8),a(),l(11,be,3,3,"ng-container",9),S(12,"async"),a()()()()()),t&2&&(n(4),r("ngIf",i.isTrainModelsPageRouteVisible),n(),r("formGroupName",i.controlKey),n(5),r("formControl",i.searchModel),n(),r("ngIf",y(12,4,i.filteredModels)))},dependencies:[H,$,z,q,W,U,pe,me,Z,Y,de,ce,k,B,Q,J,K,G,V,D,ge,fe,w,se,le],styles:[".panel-title-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:12px}.panel-title-wrapper[_ngcontent-%COMP%]   .train-models[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),s);Me=T([ee()],Me);export{Me as a};