import{a as nt,b as at,c as mt}from"./chunk-B4WKTXOM.js";import{a as rt}from"./chunk-L2YAJ6EV.js";import{a as de}from"./chunk-UVFNUB6P.js";import{b as We,c as Xe,e as it,f as ot,g as O}from"./chunk-FBUQAZUP.js";import{b as Ze}from"./chunk-6J5TQKLQ.js";import"./chunk-3JUE3TO2.js";import"./chunk-3J2AG5NI.js";import{a as se,b as pe}from"./chunk-UFS6WKSN.js";import"./chunk-YC3BZGSA.js";import"./chunk-FOX57G4Q.js";import{a as Ve,b as je}from"./chunk-TQIVMKZC.js";import{a as ce}from"./chunk-GSQGPZC5.js";import{d as K}from"./chunk-DEPG26E4.js";import{b as E,c as p,i as g,j as Je}from"./chunk-LRK34XDC.js";import"./chunk-5DHSU2JJ.js";import{b as Ye,c as G,d as qe}from"./chunk-XX6ZYDLH.js";import"./chunk-4C4Y5ULG.js";import{a as U,b as le}from"./chunk-BD3YS5GK.js";import{a as me,b as D,c as et,k as tt}from"./chunk-T2KNMZTW.js";import{a as A,b as d}from"./chunk-5MD26IKL.js";import"./chunk-I6FC4BFI.js";import{h as oe,i as re}from"./chunk-YJOFM5TF.js";import{$a as m,$c as Ue,Ab as xe,D as P,Da as n,Ea as s,Eb as I,Fb as b,Gb as ke,H as ge,I as Ne,K as Ce,P as Q,Pa as C,Pd as Ke,Q as Fe,Qd as J,Ra as c,Wb as we,Xa as M,Xb as Le,Ya as Ae,Yb as De,Za as R,Zb as q,Zd as W,_ as z,_a as x,_d as h,a as Te,ab as r,ae as X,b as Se,bb as u,be as w,ca as H,cb as Pe,ce as L,db as be,ee as $,fb as Ee,ga as F,ha as Z,he as $e,ib as _e,ie as Be,je as ee,kb as k,le as te,na as Ie,oa as Me,oc as ve,oe as Qe,p as S,pa as ye,pb as Ge,pe as ie,qb as Oe,qe as ze,rb as Re,tb as l,te as He,vb as f,ve as ne,w as N,we as ae,zb as Y}from"./chunk-CQN7FGIC.js";var Ct=(i,e)=>e.name;function Mt(i,e){i&1&&u(0,"mat-icon",10)}function yt(i,e){if(i&1&&(m(0,"mat-option",8),l(1),C(2,Mt,1,0,"mat-icon",10),r()),i&2){let t=e.$implicit;c("value",t.name),n(),f(" ",t.name," "),n(),M(t.isTrained?-1:2)}}function _t(i,e){i&1&&(m(0,"mat-option",9),l(1,"No results found"),r())}function vt(i,e){if(i&1&&(R(0,yt,3,3,"mat-option",8,Ct),C(2,_t,2,0,"mat-option",9)),i&2){let t=e;x(t),n(2),M(t.length===0?2:-1)}}var y,V=(y=class{ngOnChanges(e){e.algorithmType&&e.algorithmType.currentValue&&this.configureModels(e.algorithmType.currentValue)}get parentFormGroup(){return this.controlContainer.control}get modelFormGroup(){return this.parentFormGroup.get(this.controlKey)}get modelControl(){return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME)}constructor(e,t,o,a){this.controlContainer=e,this.modelsFacadeService=t,this.scriptFacadeService=o,this.pageRunningScriptSpiningIndicatorService=a,this.controlKey="",this.PageKey=We,this.RoutesList=Ue,this.searchModel=new $,this.models=[],this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.listenToScriptStateChanges(),this.listenToSearchModelValueChanges(),this.configureModels(this.algorithmType)}configureModels(e){if(e)switch(this.getModelsByTypeSubscription?.unsubscribe(),this.getModelsByTypeSubscription=this.subscribeToModelsListChanges(e),this.modelsFacadeService.dispatch(O.getModelsList({algorithmType:e})),e){case p.PRUNING:{this.modelsFacadeService.dispatch(O.getCurrentOrPreviousSelectedModel({algorithmType:g.PRUNING_TRAIN}));break}case p.QUANTIZATION:{this.modelsFacadeService.dispatch(O.getCurrentOrPreviousSelectedModel({algorithmType:g.QUANTIZATION_TRAIN}));break}case p.MACHINE_UNLEARNING:{this.modelsFacadeService.dispatch(O.getCurrentOrPreviousSelectedModel({algorithmType:g.MACHINE_UNLEARNING_TRAIN}));break}}}listenToCurrentModelChanges(){this.modelsFacadeService.currentModel$.pipe(d(this)).subscribe(e=>{if(G(e))return;this.models.find(o=>o.name===e)&&this.modelControl?.patchValue(e)})}subscribeToModelsListChanges(e){let t=!1;return this.modelsFacadeService.getModelsByType(e).pipe(P(o=>!qe(o)),N(o=>[...o].sort((a,j)=>Number(j.isTrained)-Number(a.isTrained)))).subscribe(o=>{this.models=o,this.searchModel.setValue(""),t||(this.listenToCurrentModelChanges(),t=!0)})}initializeForm(){this.parentFormGroup.addControl(this.controlKey,new L({[this.MODEL_CONTROL_NAME]:new $("",W.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(d(this)).subscribe(e=>{E(e)?this.modelFormGroup.disable():this.modelFormGroup.enable()})}listenToSearchModelValueChanges(){this.filteredModels=this.searchModel.valueChanges.pipe(d(this),Fe(""),N(e=>this.filterModels(e)))}filterModels(e){let t=e.toLowerCase();return this.models.filter(o=>o.name.toLowerCase().includes(t))}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},y.\u0275fac=function(t){return new(t||y)(s(h),s(K),s(D),s(Xe))},y.\u0275cmp=F({type:y,selectors:[["ms-panel-model-training"]],inputs:{controlKey:"controlKey",algorithmType:"algorithmType"},standalone:!0,features:[Y([],[{provide:h,useFactory:()=>H(h,{skipSelf:!0})}]),Ie,xe],decls:12,vars:5,consts:[[1,"ms-card","model-card"],[1,"panel-title-wrapper"],[1,"heading-sub-section-title"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],[3,"formControl"],["label","Predefined Models"],[3,"value"],["disabled",""],["fontSet","ms","fontIcon","icon-X",1,"mat-error"]],template:function(t,o){if(t&1&&(m(0,"mat-card",0)(1,"div",1)(2,"div",2),l(3,"Model"),r()(),m(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5)(7,"mat-option"),u(8,"ngx-mat-select-search",6),r(),m(9,"mat-optgroup",7),C(10,vt,3,1),I(11,"async"),r()()()()()),t&2){let a;n(4),c("formGroupName",o.controlKey),n(4),c("formControl",o.searchModel),n(2),M((a=b(11,3,o.filteredModels))?10:-1,a)}},dependencies:[ie,X,w,$e,te,ee,le,U,re,oe,pe,se,J,Ke,ae,ne,q,we,ot,it,Ze],styles:[".panel-title-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:12px}.panel-title-wrapper[_ngcontent-%COMP%]   .train-models[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),y);V=S([A()],V);var Nt=(i,e)=>e.key;function Ft(i,e){if(i&1&&(m(0,"mat-option",6),l(1),r()),i&2){let t=e.$implicit;c("value",t.key),n(),f(" ",t.value," ")}}var _,ue=(_=class{get parentFormGroup(){return this.controlContainer.control}get algorithmTypeFormGroup(){return this.parentFormGroup.get(this.controlKey)}get algorithmTypeFormControl(){return this.algorithmTypeFormGroup.get(this.ALGORITHM_TYPE_CONTROL_NAME)}constructor(e,t){this.controlContainer=e,this.scriptFacadeService=t,this.controlKey="",this.algorithmTypesOptions=[{key:p.QUANTIZATION,value:"Quantization"},{key:p.PRUNING,value:"Pruning"},{key:p.MACHINE_UNLEARNING,value:"Machine Unlearning"}],this.ALGORITHM_TYPE_CONTROL_NAME="algorithmType"}ngOnInit(){this.initForm(),this.loadInitialData(),this.listenToScriptStateChanges()}loadInitialData(){this.scriptFacadeService.scriptDetails$.pipe(Q(1),Ne(1),P(e=>!G(e?.algKey)),N(e=>e.algKey)).subscribe(e=>{switch(e){case g.PRUNING_TRAIN:{this.algorithmTypeFormControl.patchValue(p.PRUNING);break}case g.MACHINE_UNLEARNING_TRAIN:{this.algorithmTypeFormControl.patchValue(p.MACHINE_UNLEARNING);break}case g.QUANTIZATION_TRAIN:{this.algorithmTypeFormControl.patchValue(p.QUANTIZATION);break}default:this.algorithmTypeFormControl.patchValue(p.PRUNING)}}),this.scriptFacadeService.dispatch(me.getCurrentOrLastActiveScriptDetails())}initForm(){this.parentFormGroup.addControl(this.controlKey,new L({[this.ALGORITHM_TYPE_CONTROL_NAME]:new $(p.PRUNING,W.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(d(this)).subscribe(e=>{E(e)?this.algorithmTypeFormGroup.disable():this.algorithmTypeFormGroup.enable()})}},_.\u0275fac=function(t){return new(t||_)(s(h),s(D))},_.\u0275cmp=F({type:_,selectors:[["ms-panel-algorithm-type-for-training"]],inputs:{controlKey:"controlKey"},features:[Y([],[{provide:h,useFactory:()=>H(h,{skipSelf:!0})}])],decls:9,vars:2,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],[3,"formGroupName"],[1,"form-field-container"],["appearance","outline","subscriptSizing","dynamic"],[3,"formControlName"],[3,"value"]],template:function(t,o){t&1&&(m(0,"mat-card",0)(1,"p",1),l(2,"Algorithm Type"),r(),Pe(3,2),m(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5),R(7,Ft,2,2,"mat-option",6,Nt),r()()(),be(),r()),t&2&&(n(3),c("formGroupName",o.controlKey),n(3),c("formControlName",o.ALGORITHM_TYPE_CONTROL_NAME),n(),x(o.algorithmTypesOptions))},dependencies:[U,oe,se,J,X,w,te,ee]}),_);ue=S([A()],ue);function At(i,e){if(i&1&&(l(0),I(1,"adaptiveFileSize")),i&2){let t=k().$implicit;f(" ",b(1,1,t.value)," ")}}function Pt(i,e){if(i&1&&(l(0),I(1,"date")),i&2){let t=k().$implicit;f(" ",ke(1,1,t.value,"medium")," ")}}function bt(i,e){if(i&1&&(l(0),I(1,"readableDuration")),i&2){let t=k().$implicit;f(" ",b(1,1,t.value)," ")}}function Et(i,e){if(i&1&&l(0),i&2){let t=k().$implicit;f(" ",t.value," ")}}function Gt(i,e){i&1&&(m(0,"div",8),u(1,"mat-divider"),r())}function Ot(i,e){if(i&1&&(m(0,"div")(1,"div",5)(2,"div",6),l(3),I(4,"parametersLabel"),r(),m(5,"div",7),C(6,At,2,3)(7,Pt,2,4)(8,bt,2,3)(9,Et,1,1),r()(),C(10,Gt,2,0,"div",8),r()),i&2){let t,o=e.$implicit,a=e.$index,j=e.$count;n(3),f("",b(4,3,o.key),":"),n(3),M((t=o.key)==="file_size_bytes"?6:t==="creation_date"?7:t==="training_duration_seconds"?8:9),n(4),M(a!==j-1?10:-1)}}function Rt(i,e){if(i&1&&(m(0,"div",3),R(1,Ot,11,5,"div",null,Ae),r()),i&2){let t=k();n(),x(t)}}function xt(i,e){i&1&&u(0,"ms-empty-state",4)}function kt(i,e){i&1&&(m(0,"div",2),C(1,Rt,3,0,"div",3)(2,xt,1,0,"ms-empty-state",4),r()),i&2&&(n(),M(e.length>0?1:2))}var v,fe=(v=class{constructor(e){this.modelsFacadeService=e,this.metadata={}}ngOnInit(){this.modelsFacadeService.modelMetadata$.pipe(Q(1),d(this)).subscribe(e=>{this.metadata=e})}},v.\u0275fac=function(t){return new(t||v)(s(K))},v.\u0275cmp=F({type:v,selectors:[["ms-panel-model-metadata"]],decls:5,vars:3,consts:[[1,"ms-card","metadata-card"],[1,"heading-sub-section-title"],[1,"metadata-wrapper"],[1,"key-value-container","single"],["title","No metadata available"],[1,"key-value-pair","space-between"],[1,"key-value-key"],[1,"key-value-value"],[1,"pt-2"]],template:function(t,o){if(t&1&&(m(0,"mat-card",0)(1,"p",1),l(2,"Model Training Information"),r(),C(3,kt,3,1,"div",2),I(4,"keyvalue"),r()),t&2){let a;n(3),M((a=b(4,1,o.metadata))?3:-1,a)}},dependencies:[rt,U,Ve,Le,De,nt,mt,at],styles:[".metadata-wrapper[_ngcontent-%COMP%]{max-height:300px;overflow:auto;padding-right:20px}"]}),v);fe=S([A()],fe);var Lt=["panelParameters"],T,he=(T=class{constructor(e,t,o,a){this.navigationService=e,this.scriptFacadeService=t,this.snackbarService=o,this.modelsFacadeService=a,this.form=new L({}),this.isScriptActive=!1,this.selectedAlgorithmType=p.PRUNING,this.selectedAlgorithmKey=g.PRUNING_TRAIN}ngOnInit(){this.listenToAlgorithmPanelChanges(),this.listenToScriptStateChanges(),this.listenToFormChangesToLoadModelMetadata()}listenToAlgorithmPanelChanges(){this.form.valueChanges.pipe(ge(50),N(()=>{let e=this.form.getRawValue();return e.algorithmTypeGroup&&e.algorithmTypeGroup.algorithmType}),Ce(),P(e=>!!e),d(this)).subscribe(e=>{this.selectedAlgorithmType=e,this.selectedAlgorithmKey=Je[e]})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(d(this)).subscribe(e=>{this.isScriptActive=E(e),E(e)?this.form.disable():this.form.enable()})}listenToFormChangesToLoadModelMetadata(){this.form.valueChanges.pipe(ge(50),N(e=>{let t=e.algorithmTypeGroup?.algorithmType,o=e.model?.model;return{algorithmType:t,model:o}}),Ce((e,t)=>JSON.stringify(e)===JSON.stringify(t)),P(({algorithmType:e,model:t})=>!G(e)&&!G(t)),d(this)).subscribe(({algorithmType:e,model:t})=>{this.modelsFacadeService.dispatch(O.getModelMetadata({algorithmType:e,modelName:t}))})}submit(){if(Ye(this.selectedAlgorithmType)){this.snackbarService.showError("Select an algorithm before running a script.");return}let{model:e}=this.form.getRawValue(),{model:t}=e,o={alg:this.selectedAlgorithmKey,params:Se(Te({},this.panelParametersComponent.parametersFormatted),{arch:t})};this.scriptFacadeService.dispatch(me.callScript({configs:o}))}},T.\u0275fac=function(t){return new(t||T)(s(tt),s(D),s(et),s(K))},T.\u0275cmp=F({type:T,selectors:[["ms-model-training"]],viewQuery:function(t,o){if(t&1&&Ge(Lt,5),t&2){let a;Oe(a=Re())&&(o.panelParametersComponent=a.first)}},decls:17,vars:4,consts:[["panelParameters",""],[1,"heading-primary-title","title"],[1,"page-wrapper"],[1,"left",3,"formGroup"],["controlKey","algorithmTypeGroup"],["controlKey","model",3,"algorithmType"],["controlKey","params",3,"algorithm"],["mat-raised-button","","color","primary",3,"click","disabled"],["mat-stroked-button","","color","primary",1,"ml-2",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],[1,"right"]],template:function(t,o){if(t&1){let a=Ee();m(0,"p",1),l(1,"Model Training"),r(),m(2,"div",2)(3,"div",3),u(4,"ms-panel-algorithm-type-for-training",4)(5,"ms-panel-model-training",5)(6,"ms-panel-model-metadata")(7,"ms-panel-parameters",6,0),m(9,"div")(10,"button",7),_e("click",function(){return Me(a),ye(o.submit())}),l(11," Run "),r(),m(12,"button",8),_e("click",function(){return Me(a),ye(o.navigationService.goToPreviousPage())}),u(13,"mat-icon",9),l(14," Go back "),r()()(),m(15,"div",10),u(16,"ms-terminal"),r()()}t&2&&(n(3),c("formGroup",o.form),n(2),c("algorithmType",o.selectedAlgorithmType),n(2),c("algorithm",o.selectedAlgorithmKey),n(3),c("disabled",o.isScriptActive||o.form.invalid))},dependencies:[ce,V,de,w,Be,ne,ze,ue,fe],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),T);he=S([A()],he);var Dt=[{path:"",component:he}],ct=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=Z({type:e}),e.\u0275inj=z({imports:[ve.forChild(Dt),ve]});let i=e;return i})();var yo=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=Z({type:e}),e.\u0275inj=z({imports:[q,ct,ce,V,de,le,je,pe,re,Qe,ie,ae,He]});let i=e;return i})();export{yo as ModelTrainingModule};
