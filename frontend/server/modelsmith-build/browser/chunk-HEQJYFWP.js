import{a as lt,b as st,c as pt}from"./chunk-WROZFHBO.js";import{a as mt}from"./chunk-7TE64OY5.js";import{a as le}from"./chunk-PEPQONB2.js";import{b as nt,c as at}from"./chunk-7XUVQUZC.js";import"./chunk-MM4TEEVS.js";import{a as me}from"./chunk-4KDFY6RG.js";import{a as w,c as V}from"./chunk-U7NPFWER.js";import{a as ot,i as rt}from"./chunk-VMZY47C3.js";import{b as it}from"./chunk-ZPFJPO4G.js";import{$a as Oe,A as _e,Aa as u,Ad as G,Bc as Be,Bd as Ze,C as ge,Ca as Fe,Cc as $e,Cd as c,Da as ve,Dd as qe,Ea as C,G as Q,H as Te,Hc as oe,Ic as Qe,Ja as Ne,Jd as y,Ka as Ie,Kd as Je,La as Ae,Ma as Pe,Md as D,Na as l,Nd as We,Oa as j,P as z,Pa as x,Pd as Xe,S as H,T as I,Ta as Z,U as Y,Ua as be,Y as Se,Ya as A,Z as he,Za as E,Zb as ye,Zc as re,Zd as K,_ as ue,_a as Ee,_b as De,_c as ze,_d as et,a as Ce,b as Me,dc as Ke,ec as W,fb as R,fc as Ve,gb as q,hb as Ge,he as ae,ib as we,ie as tt,ja as r,jb as xe,ka as p,kc as X,lc as v,m as F,mb as Re,nb as ke,nc as ee,ob as Le,oc as k,pb as J,pc as L,qa as d,qc as B,rd as P,s as N,sa as n,sd as f,tc as Ue,td as He,uc as je,ud as ne,vc as te,w as b,wa as m,wd as O,xa as a,xc as ie,ya as g,z as fe,za as h,zd as Ye}from"./chunk-XZNUB5IR.js";function Mt(o,e){o&1&&g(0,"mat-icon",13)}function _t(o,e){if(o&1&&(m(0,"mat-option",11),l(1),d(2,Mt,1,0,"mat-icon",12),a()),o&2){let t=e.$implicit;n("value",t.name),r(),x(" ",t.name," "),r(),n("ngIf",!t.isTrained)}}function Tt(o,e){o&1&&(m(0,"mat-option",14),l(1,"No results found"),a())}function St(o,e){if(o&1&&(h(0),d(1,_t,3,3,"mat-option",9)(2,Tt,2,0,"mat-option",10),u()),o&2){let t=e.ngIf,i=C();r(),n("ngForOf",t)("ngForTrackBy",i.trackByModel),r(),n("ngIf",t.length===0)}}var M,U=(M=class{ngOnChanges(e){e.algorithmType&&e.algorithmType.currentValue&&this.configureModels(e.algorithmType.currentValue)}get parentFormGroup(){return this.controlContainer.control}get modelFormGroup(){return this.parentFormGroup.get(this.controlKey)}get modelControl(){return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME)}constructor(e,t,i,s){this.controlContainer=e,this.modelsFacadeService=t,this.scriptFacadeService=i,this.pageRunningScriptSpiningIndicatorService=s,this.controlKey="",this.PageKey=He,this.RoutesList=De,this.searchModel=new B,this.models=[],this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.listenToScriptStateChanges(),this.listenToSearchModelValueChanges(),this.configureModels(this.algorithmType)}configureModels(e){if(e)switch(this.getModelsByTypeSubscription?.unsubscribe(),this.getModelsByTypeSubscription=this.subscribeToModelsListChanges(e),this.modelsFacadeService.dispatch(w.getModelsList({algorithmType:e})),e){case c.PRUNING:{this.modelsFacadeService.dispatch(w.getCurrentOrPreviousSelectedModel({algorithmType:y.PRUNING_TRAIN}));break}case c.QUANTIZATION:{this.modelsFacadeService.dispatch(w.getCurrentOrPreviousSelectedModel({algorithmType:y.QUANTIZATION_TRAIN}));break}case c.MACHINE_UNLEARNING:{this.modelsFacadeService.dispatch(w.getCurrentOrPreviousSelectedModel({algorithmType:y.MACHINE_UNLEARNING_TRAIN}));break}}}listenToCurrentModelChanges(){this.modelsFacadeService.currentModel$.pipe(f(this)).subscribe(e=>{if(G(e))return;this.models.find(i=>i.name===e)&&this.modelControl?.patchValue(e)})}subscribeToModelsListChanges(e){let t=!1;return this.modelsFacadeService.getModelsByType(e).pipe(b(i=>!Ze(i)),N(i=>[...i].sort((s,de)=>Number(de.isTrained)-Number(s.isTrained)))).subscribe(i=>{this.models=i,this.searchModel.setValue(""),t||(this.listenToCurrentModelChanges(),t=!0)})}initializeForm(){this.parentFormGroup.addControl(this.controlKey,new L({[this.MODEL_CONTROL_NAME]:new B("",X.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(f(this)).subscribe(e=>{O(e)?this.modelFormGroup.disable():this.modelFormGroup.enable()})}listenToSearchModelValueChanges(){this.filteredModels=this.searchModel.valueChanges.pipe(f(this),Te(""),N(e=>this.filterModels(e)))}filterModels(e){let t=e.toLowerCase();return this.models.filter(i=>i.name.toLowerCase().includes(t))}trackByModel(e,t){return t.name}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},M.\u0275fac=function(t){return new(t||M)(p(v),p(V),p(D),p(We))},M.\u0275cmp=I({type:M,selectors:[["ms-panel-model-training"]],inputs:{controlKey:"controlKey",algorithmType:"algorithmType"},standalone:!0,features:[Z([],[{provide:v,useFactory:()=>H(v,{skipSelf:!0})}]),Se,be],decls:12,vars:5,consts:[[1,"ms-card","model-card"],[1,"panel-title-wrapper"],[1,"heading-sub-section-title"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],["label","Predefined Models"],[3,"formControl"],[4,"ngIf"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],["disabled","",4,"ngIf"],[3,"value"],["class","mat-error","fontSet","ms","fontIcon","icon-X",4,"ngIf"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"],["disabled",""]],template:function(t,i){t&1&&(m(0,"mat-card",0)(1,"div",1)(2,"div",2),l(3,"Model"),a()(),m(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5)(7,"mat-optgroup",6)(8,"mat-option"),g(9,"ngx-mat-select-search",7),a(),d(10,St,3,3,"ng-container",8),A(11,"async"),a()()()()()),t&2&&(r(4),n("formGroupName",i.controlKey),r(5),n("formControl",i.searchModel),r(),n("ngIf",E(11,3,i.filteredModels)))},dependencies:[Be,ee,k,Ue,ie,te,et,K,ze,re,tt,ae,W,Ke,Qe,oe,J,R,q,Re,at,nt,Xe],styles:[".panel-title-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:12px}.panel-title-wrapper[_ngcontent-%COMP%]   .train-models[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),M);U=F([P()],U);function It(o,e){if(o&1&&(m(0,"mat-option",7),l(1),a()),o&2){let t=e.$implicit;n("value",t.key),r(),x(" ",t.value," ")}}var _,se=(_=class{get parentFormGroup(){return this.controlContainer.control}get algorithmTypeFormGroup(){return this.parentFormGroup.get(this.controlKey)}get algorithmTypeFormControl(){return this.algorithmTypeFormGroup.get(this.ALGORITHM_TYPE_CONTROL_NAME)}constructor(e,t){this.controlContainer=e,this.scriptFacadeService=t,this.controlKey="",this.algorithmTypesOptions=qe.filter(i=>i.key!==c.TRAIN&&i.key!==c.AWQ),this.ALGORITHM_TYPE_CONTROL_NAME="algorithmType"}ngOnInit(){this.initForm(),this.loadInitialData(),this.listenToScriptStateChanges()}loadInitialData(){this.scriptFacadeService.scriptDetails$.pipe(Q(1),_e(1),b(e=>!G(e?.algKey)),N(e=>e.algKey)).subscribe(e=>{switch(e){case y.PRUNING_TRAIN:{this.algorithmTypeFormControl.patchValue(c.PRUNING);break}case y.MACHINE_UNLEARNING_TRAIN:{this.algorithmTypeFormControl.patchValue(c.MACHINE_UNLEARNING);break}case y.QUANTIZATION_TRAIN:{this.algorithmTypeFormControl.patchValue(c.QUANTIZATION);break}default:this.algorithmTypeFormControl.patchValue(c.PRUNING)}}),this.scriptFacadeService.dispatch(ne.getCurrentOrLastActiveScriptDetails())}initForm(){this.parentFormGroup.addControl(this.controlKey,new L({[this.ALGORITHM_TYPE_CONTROL_NAME]:new B(c.PRUNING,X.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(f(this)).subscribe(e=>{O(e)?this.algorithmTypeFormGroup.disable():this.algorithmTypeFormGroup.enable()})}trackByAlgorithmType(e,t){return t.key}},_.\u0275fac=function(t){return new(t||_)(p(v),p(D))},_.\u0275cmp=I({type:_,selectors:[["ms-panel-algorithm-type-for-training"]],inputs:{controlKey:"controlKey"},features:[Z([],[{provide:v,useFactory:()=>H(v,{skipSelf:!0})}])],decls:8,vars:4,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],[3,"formGroupName"],[1,"form-field-container"],["appearance","outline","subscriptSizing","dynamic"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],[3,"value"]],template:function(t,i){t&1&&(m(0,"mat-card",0)(1,"p",1),l(2,"Algorithm Type"),a(),h(3,2),m(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5),d(7,It,2,2,"mat-option",6),a()()(),u(),a()),t&2&&(r(3),n("formGroupName",i.controlKey),r(3),n("formControlName",i.ALGORITHM_TYPE_CONTROL_NAME),r(),n("ngForOf",i.algorithmTypesOptions)("ngForTrackBy",i.trackByAlgorithmType))},dependencies:[R,K,re,ae,W,ee,k,ie,te]}),_);se=F([P()],se);function Pt(o,e){if(o&1&&(h(0),l(1),A(2,"adaptiveFileSize"),u()),o&2){let t=C().$implicit;r(),j(E(2,1,t.value))}}function bt(o,e){if(o&1&&(h(0),l(1),A(2,"date"),u()),o&2){let t=C().$implicit;r(),j(Ee(2,1,t.value,"medium"))}}function Et(o,e){if(o&1&&(h(0),l(1),A(2,"readableDuration"),u()),o&2){let t=C().$implicit;r(),j(E(2,1,t.value))}}function Ot(o,e){if(o&1&&(h(0),l(1),u()),o&2){let t=C().$implicit;r(),j(t.value)}}function Gt(o,e){o&1&&(m(0,"div",15),g(1,"mat-divider"),a())}function wt(o,e){if(o&1&&(m(0,"div")(1,"div",8)(2,"div",9),l(3),A(4,"parametersLabel"),a(),m(5,"div",10),h(6,11),d(7,Pt,3,3,"ng-container",12)(8,bt,3,4,"ng-container",12)(9,Et,3,3,"ng-container",12)(10,Ot,2,1,"ng-container",13),u(),a()(),d(11,Gt,2,0,"div",14),a()),o&2){let t=e.$implicit,i=e.last;r(3),x("",E(4,6,t.key),":"),r(3),n("ngSwitch",t.key),r(),n("ngSwitchCase","file_size_bytes"),r(),n("ngSwitchCase","creation_date"),r(),n("ngSwitchCase","training_duration_seconds"),r(2),n("ngIf",!i)}}function xt(o,e){if(o&1&&(m(0,"div",6),d(1,wt,12,8,"div",7),a()),o&2){let t=C().$implicit;r(),n("ngForOf",t)}}function Rt(o,e){if(o&1&&(m(0,"div",4),d(1,xt,2,1,"div",5),a()),o&2){let t=e.$implicit;C();let i=Pe(6);r(),n("ngIf",t.length>0)("ngIfElse",i)}}function kt(o,e){o&1&&g(0,"ms-empty-state",16)}var T,pe=(T=class{constructor(e){this.modelsFacadeService=e,this.metadata={}}ngOnInit(){this.modelsFacadeService.modelMetadata$.pipe(Q(1),f(this)).subscribe(e=>{this.metadata=e})}},T.\u0275fac=function(t){return new(t||T)(p(V))},T.\u0275cmp=I({type:T,selectors:[["ms-panel-model-metadata"]],decls:7,vars:3,consts:[["noMetadata",""],[1,"ms-card","metadata-card"],[1,"heading-sub-section-title"],["class","metadata-wrapper",4,"ngIf"],[1,"metadata-wrapper"],["class","key-value-container single",4,"ngIf","ngIfElse"],[1,"key-value-container","single"],[4,"ngFor","ngForOf"],[1,"key-value-pair","space-between"],[1,"key-value-key"],[1,"key-value-value"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],["class","pt-2",4,"ngIf"],[1,"pt-2"],["title","No metadata available"]],template:function(t,i){t&1&&(m(0,"mat-card",1)(1,"p",2),l(2,"Model Training Information"),a(),d(3,Rt,2,2,"div",3),A(4,"keyvalue"),d(5,kt,1,0,"ng-template",null,0,Oe),a()),t&2&&(r(3),n("ngIf",E(4,1,i.metadata)))},dependencies:[R,q,Ge,we,xe,Ve,K,mt,ke,Le,lt,pt,st],styles:[".metadata-wrapper[_ngcontent-%COMP%]{max-height:300px;overflow:auto;padding-right:20px}"]}),T);pe=F([P()],pe);var Dt=["panelParameters"],S,ce=(S=class{constructor(e,t,i,s){this.navigationService=e,this.scriptFacadeService=t,this.snackbarService=i,this.modelsFacadeService=s,this.form=new L({}),this.isScriptActive=!1,this.selectedAlgorithmType=c.PRUNING,this.selectedAlgorithmKey=y.PRUNING_TRAIN}ngOnInit(){this.listenToAlgorithmPanelChanges(),this.listenToScriptStateChanges(),this.listenToFormChangesToLoadModelMetadata()}listenToAlgorithmPanelChanges(){this.form.valueChanges.pipe(fe(50),N(()=>{let e=this.form.getRawValue();return e.algorithmTypeGroup&&e.algorithmTypeGroup.algorithmType}),ge(),b(e=>!!e),f(this)).subscribe(e=>{this.selectedAlgorithmType=e,this.selectedAlgorithmKey=Je[e]})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(f(this)).subscribe(e=>{this.isScriptActive=O(e),O(e)?this.form.disable():this.form.enable()})}listenToFormChangesToLoadModelMetadata(){this.form.valueChanges.pipe(fe(50),N(e=>{let t=e.algorithmTypeGroup?.algorithmType,i=e.model?.model;return{algorithmType:t,model:i}}),ge((e,t)=>JSON.stringify(e)===JSON.stringify(t)),b(({algorithmType:e,model:t})=>!G(e)&&!G(t)),f(this)).subscribe(({algorithmType:e,model:t})=>{this.modelsFacadeService.dispatch(w.getModelMetadata({algorithmType:e,modelName:t}))})}submit(){if(Ye(this.selectedAlgorithmType)){this.snackbarService.showError("Select an algorithm before running a script.");return}let{model:e}=this.form.getRawValue(),{model:t}=e,i={alg:this.selectedAlgorithmKey,params:Me(Ce({},this.panelParametersComponent.parametersFormatted),{arch:t})};this.scriptFacadeService.dispatch(ne.callScript({configs:i}))}},S.\u0275fac=function(t){return new(t||S)(p(rt),p(D),p(ot),p(V))},S.\u0275cmp=I({type:S,selectors:[["ms-model-training"]],viewQuery:function(t,i){if(t&1&&Ne(Dt,5),t&2){let s;Ie(s=Ae())&&(i.panelParametersComponent=s.first)}},decls:17,vars:4,consts:[["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper"],[1,"left",3,"formGroup"],["controlKey","algorithmTypeGroup"],["controlKey","model",3,"algorithmType"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],["mat-stroked-button","","color","primary",1,"ml-2",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],[1,"right"]],template:function(t,i){if(t&1){let s=Fe();m(0,"p",1),l(1,"Model Training"),a(),m(2,"div",2)(3,"div",3),g(4,"ms-panel-algorithm-type-for-training",4)(5,"ms-panel-model-training",5)(6,"ms-panel-model-metadata")(7,"ms-panel-parameters",6,0),m(9,"div")(10,"button",7),ve("click",function(){return he(s),ue(i.submit())}),l(11," Run "),a(),m(12,"button",8),ve("click",function(){return he(s),ue(i.navigationService.goToPreviousPage())}),g(13,"mat-icon",9),l(14," Go back "),a()()(),m(15,"div",10),g(16,"ms-terminal"),a()()}t&2&&(r(3),n("formGroup",i.form),r(2),n("algorithmType",i.selectedAlgorithmType),r(2),n("algorithm",i.selectedAlgorithmKey),r(3),n("disabled",i.isScriptActive||i.form.invalid))},dependencies:[$e,oe,k,je,me,U,le,se,pe],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),S);ce=F([P()],ce);var Kt=[{path:"",component:ce}],ht=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=Y({type:e}),e.\u0275inj=z({imports:[ye.forChild(Kt),ye]});let o=e;return o})();var go=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=Y({type:e}),e.\u0275inj=z({imports:[J,it,ht,me,U,le]});let o=e;return o})();export{go as ModelTrainingModule};