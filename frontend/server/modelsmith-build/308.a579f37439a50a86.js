"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[308],{5308:(dt,I,n)=>{n.r(I),n.d(I,{ModelTrainingModule:()=>ct});var p,m=n(6814),L=n(4245),x=n(3328),Z=n(1668),O=n(1501),R=n(2655),y=n(7582),r=n(6223),c=n(8791),_=n(3620),M=n(7398),B=n(3997),A=n(2181),Y=n(3607),b=n(39),v=n(4378),l=n(7820),N=n(127),t=n(5879),f=n(9532),G=n(3705),E=n(2296),K=n(617),U=n(836),D=n(8180),Q=n(5195),$=n(5683),k=n(8525),w=n(3680);function z(a,e){if(1&a&&(t.TgZ(0,"mat-option",7),t._uU(1),t.qZA()),2&a){const i=e.$implicit;t.Q6J("value",i.key),t.xp6(1),t.hij(" ",i.value," ")}}let C=((p=class{get parentFormGroup(){return this.controlContainer.control}get algorithmTypeFormGroup(){return this.parentFormGroup.get(this.controlKey)}get algorithmTypeFormControl(){return this.algorithmTypeFormGroup.get(this.ALGORITHM_TYPE_CONTROL_NAME)}constructor(e,i){this.controlContainer=e,this.scriptFacadeService=i,this.controlKey="",this.algorithmTypesOptions=l.VN.filter(o=>o.key!==l.Bd.TRAIN),this.ALGORITHM_TYPE_CONTROL_NAME="algorithmType"}ngOnInit(){this.initForm(),this.loadInitialData(),this.listenToScriptStateChanges()}loadInitialData(){this.scriptFacadeService.scriptDetails$.pipe((0,U.T)(1),(0,D.q)(1),(0,A.h)(e=>!(0,v.Bm)(e?.algKey)),(0,M.U)(e=>e.algKey)).subscribe(e=>{switch(e){case l.tp.MACHINE_UNLEARNING_TRAIN:this.algorithmTypeFormControl.patchValue(l.Bd.MACHINE_UNLEARNING);break;case l.tp.PRUNING_TRAIN:this.algorithmTypeFormControl.patchValue(l.Bd.PRUNING);break;case l.tp.QUANTIZATION_TRAIN:this.algorithmTypeFormControl.patchValue(l.Bd.QUANTIZATION);break;default:{const i=(0,l.t6)(e);if((0,v.Bm)(i))break;this.algorithmTypeFormControl.patchValue(i)}}}),this.scriptFacadeService.dispatch(b.aj.getCurrentOrLastActiveScriptDetails())}initForm(){this.parentFormGroup.addControl(this.controlKey,new r.cw({[this.ALGORITHM_TYPE_CONTROL_NAME]:new r.NI(l.Bd.PRUNING,r.kI.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,c.t)(this)).subscribe(e=>{(0,N.A)(e)?this.algorithmTypeFormGroup.disable():this.algorithmTypeFormGroup.enable()})}trackByAlgorithmType(e,i){return i.key}}).\u0275fac=function(e){return new(e||p)(t.Y36(r.gN),t.Y36(f.OF))},p.\u0275cmp=t.Xpm({type:p,selectors:[["ms-panel-algorithm-type"]],inputs:{controlKey:"controlKey"},features:[t._Bn([],[{provide:r.gN,useFactory:()=>(0,t.f3M)(r.gN,{skipSelf:!0})}])],decls:8,vars:4,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],[3,"formGroupName"],[1,"form-field-container"],["appearance","outline","subscriptSizing","dynamic"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],[3,"value"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-card",0)(1,"p",1),t._uU(2,"Algorithm Type"),t.qZA(),t.ynx(3,2),t.TgZ(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5),t.YNc(7,z,2,2,"mat-option",6),t.qZA()()(),t.BQk(),t.qZA()),2&e&&(t.xp6(3),t.Q6J("formGroupName",i.controlKey),t.xp6(3),t.Q6J("formControlName",i.ALGORITHM_TYPE_CONTROL_NAME),t.xp6(1),t.Q6J("ngForOf",i.algorithmTypesOptions)("ngForTrackBy",i.trackByAlgorithmType))},dependencies:[m.sg,Q.a8,$.KE,k.gD,w.ey,r.JJ,r.JL,r.u,r.x0]}),p);C=(0,y.gn)([(0,c.c)()],C);var V=n(6385),j=n(7754);let H=(()=>{var a;class e{transform(o,s=2){const d=Number(o);if(isNaN(d)||0===d)return"0 Bytes";const P=s<0?0:s,J=Math.floor(Math.log(d)/Math.log(1024));return parseFloat((d/Math.pow(1024,J)).toFixed(P))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][J]}}return(a=e).\u0275fac=function(o){return new(o||a)},a.\u0275pipe=t.Yjl({name:"adaptiveFileSize",type:a,pure:!0,standalone:!0}),e})(),X=(()=>{var a;class e{transform(o){const s=Number(o);if(isNaN(s))return"Invalid duration";const d=Math.floor(s/3600),T=Math.floor(s%3600/60);let u="";return d>0&&(u+=`${d}h `),(T>0||d>0)&&(u+=`${T}m `),u+=`${Math.floor(s%60)}s`,u.trim()}}return(a=e).\u0275fac=function(o){return new(o||a)},a.\u0275pipe=t.Yjl({name:"readableDuration",type:a,pure:!0,standalone:!0}),e})();var g;function W(a,e){if(1&a&&(t.ynx(0),t._uU(1),t.ALo(2,"adaptiveFileSize"),t.BQk()),2&a){const i=t.oxw().$implicit;t.xp6(1),t.Oqu(t.lcZ(2,1,i.value))}}function q(a,e){if(1&a&&(t.ynx(0),t._uU(1),t.ALo(2,"date"),t.BQk()),2&a){const i=t.oxw().$implicit;t.xp6(1),t.Oqu(t.xi3(2,1,i.value,"medium"))}}function tt(a,e){if(1&a&&(t.ynx(0),t._uU(1),t.ALo(2,"readableDuration"),t.BQk()),2&a){const i=t.oxw().$implicit;t.xp6(1),t.Oqu(t.lcZ(2,1,i.value))}}function et(a,e){if(1&a&&(t.ynx(0),t._uU(1),t.BQk()),2&a){const i=t.oxw().$implicit;t.xp6(1),t.Oqu(i.value)}}function at(a,e){1&a&&t._UZ(0,"mat-divider")}function it(a,e){if(1&a&&(t.TgZ(0,"div")(1,"div",8)(2,"div",9),t._uU(3),t.qZA(),t.TgZ(4,"div",10),t.ynx(5,11),t.YNc(6,W,3,3,"ng-container",12),t.YNc(7,q,3,4,"ng-container",12),t.YNc(8,tt,3,3,"ng-container",12),t.YNc(9,et,2,1,"ng-container",13),t.BQk(),t.qZA()(),t.TgZ(10,"div",14),t.YNc(11,at,1,0,"mat-divider",15),t.qZA()()),2&a){const i=e.$implicit,o=e.last,s=t.oxw(3);t.xp6(3),t.hij("",s.getCustomLabel(i.key),":"),t.xp6(2),t.Q6J("ngSwitch",i.key),t.xp6(1),t.Q6J("ngSwitchCase","file_size_bytes"),t.xp6(1),t.Q6J("ngSwitchCase","creation_date"),t.xp6(1),t.Q6J("ngSwitchCase","training_duration_seconds"),t.xp6(3),t.Q6J("ngIf",!o)}}function nt(a,e){if(1&a&&(t.TgZ(0,"div",6),t.YNc(1,it,12,6,"div",7),t.qZA()),2&a){const i=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",i)}}function ot(a,e){if(1&a&&(t.TgZ(0,"div",4),t.YNc(1,nt,2,1,"div",5),t.qZA()),2&a){const i=e.$implicit;t.oxw();const o=t.MAs(6);t.xp6(1),t.Q6J("ngIf",i.length>0)("ngIfElse",o)}}function rt(a,e){1&a&&t._UZ(0,"ms-empty-state",16)}let F=((g=class{constructor(e){this.modelsFacadeService=e,this.metadata={}}ngOnInit(){this.modelsFacadeService.modelMetadata$.pipe((0,U.T)(1),(0,c.t)(this)).subscribe(e=>{this.metadata=e})}getCustomLabel(e){return{creation_date:"Creation Date",epochs:"Epochs",file_size_bytes:"File Size",learning_rate:"Learning Rate",model:"Model",training_duration_seconds:"Training Duration"}[e]||e}}).\u0275fac=function(e){return new(e||g)(t.Y36(G.V))},g.\u0275cmp=t.Xpm({type:g,selectors:[["ms-panel-model-metadata"]],decls:7,vars:3,consts:[[1,"ms-card","metadata-card"],[1,"heading-sub-section-title"],["class","metadata-wrapper",4,"ngIf"],["noMetadata",""],[1,"metadata-wrapper"],["class","key-value-container single",4,"ngIf","ngIfElse"],[1,"key-value-container","single"],[4,"ngFor","ngForOf"],[1,"key-value-pair","space-between"],[1,"key-value-key"],[1,"key-value-value"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],[1,"pt-2"],[4,"ngIf"],["title","No metadata available"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-card",0)(1,"p",1),t._uU(2,"Model Training Information"),t.qZA(),t.YNc(3,ot,2,2,"div",2),t.ALo(4,"keyvalue"),t.YNc(5,rt,1,0,"ng-template",null,3,t.W1O),t.qZA()),2&e&&(t.xp6(3),t.Q6J("ngIf",t.lcZ(4,1,i.metadata)))},dependencies:[m.sg,m.O5,m.RF,m.n9,m.ED,V.d,Q.a8,j.u,m.uU,m.Nd,H,X],styles:[".metadata-wrapper[_ngcontent-%COMP%]{max-height:300px;overflow:auto;padding-right:20px}"]}),g);var h;F=(0,y.gn)([(0,c.c)()],F);const lt=["panelParameters"];let S=((h=class{constructor(e,i,o,s){this.navigationService=e,this.scriptFacadeService=i,this.snackbarService=o,this.modelsFacadeService=s,this.form=new r.cw({}),this.isScriptActive=!1,this.selectedAlgorithmType=l.Bd.PRUNING,this.selectedAlgorithmKey=l.tp.PRUNING_TRAIN}ngOnInit(){this.listenToAlgorithmPanelChanges(),this.listenToScriptStateChanges(),this.listenToFormChangesToLoadModelMetadata()}listenToAlgorithmPanelChanges(){this.form.valueChanges.pipe((0,_.b)(50),(0,M.U)(()=>{const e=this.form.getRawValue();return e.algorithmTypeGroup&&e.algorithmTypeGroup.algorithmType}),(0,B.x)(),(0,A.h)(e=>!!e),(0,c.t)(this)).subscribe(e=>{this.selectedAlgorithmType=e,this.selectedAlgorithmKey=l.R0[e]})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,c.t)(this)).subscribe(e=>{this.isScriptActive=(0,N.A)(e),(0,N.A)(e)?this.form.disable():this.form.enable()})}listenToFormChangesToLoadModelMetadata(){this.form.valueChanges.pipe((0,_.b)(50),(0,M.U)(e=>{const i=e.algorithmTypeGroup?.algorithmType,o=e.model?.model;return{algorithmType:i,model:o}}),(0,B.x)((e,i)=>JSON.stringify(e)===JSON.stringify(i)),(0,A.h)(({algorithmType:e,model:i})=>!(0,v.Bm)(e)&&!(0,v.Bm)(i)),(0,c.t)(this)).subscribe(({algorithmType:e,model:i})=>{this.modelsFacadeService.dispatch(Y.o.getModelMetadata({algorithmType:e,modelName:i}))})}submit(){if((0,v.kK)(this.selectedAlgorithmType))return void this.snackbarService.showError("Select an algorithm before running a script.");const{model:e}=this.form.getRawValue(),{model:i}=e,o={alg:this.selectedAlgorithmKey,params:{...this.panelParametersComponent.parametersFormatted,arch:i}};this.scriptFacadeService.dispatch(b.aj.callScript({configs:o}))}}).\u0275fac=function(e){return new(e||h)(t.Y36(f.f5),t.Y36(f.OF),t.Y36(f.QD),t.Y36(G.V))},h.\u0275cmp=t.Xpm({type:h,selectors:[["ms-model-training"]],viewQuery:function(e,i){if(1&e&&t.Gf(lt,5),2&e){let o;t.iGM(o=t.CRH())&&(i.panelParametersComponent=o.first)}},decls:17,vars:7,consts:[[1,"heading-primary-title","title"],[1,"page-wrapper"],[1,"left",3,"formGroup"],["controlKey","algorithmTypeGroup"],["controlKey","model",3,"algorithmType","areNotTrainedItemsSelectable","isInitialLoadForTrainTypeModels","isTrainedModelsPageVisible"],["controlKey","params",3,"algorithm"],["panelParameters",""],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-stroked-button","","color","primary",1,"ml-2",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],[1,"right"]],template:function(e,i){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Model Training"),t.qZA(),t.TgZ(2,"div",1)(3,"div",2),t._UZ(4,"ms-panel-algorithm-type",3)(5,"ms-panel-model",4)(6,"ms-panel-model-metadata")(7,"ms-panel-parameters",5,6),t.TgZ(9,"div")(10,"button",7),t.NdJ("click",function(){return i.submit()}),t._uU(11," Run "),t.qZA(),t.TgZ(12,"button",8),t.NdJ("click",function(){return i.navigationService.goToPreviousPage()}),t._UZ(13,"mat-icon",9),t._uU(14," Go back "),t.qZA()()(),t.TgZ(15,"div",10),t._UZ(16,"ms-terminal"),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("formGroup",i.form),t.xp6(2),t.Q6J("algorithmType",i.selectedAlgorithmType)("areNotTrainedItemsSelectable",!0)("isInitialLoadForTrainTypeModels",!0)("isTrainedModelsPageVisible",!1),t.xp6(2),t.Q6J("algorithm",i.selectedAlgorithmKey),t.xp6(3),t.Q6J("disabled",i.isScriptActive||i.form.invalid))},dependencies:[E.lW,K.Hw,r.JL,r.sg,O.d,x.d,Z.w,C,F],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),h);S=(0,y.gn)([(0,c.c)()],S);const st=[{path:"",component:S}];let mt=(()=>{var a;class e{}return(a=e).\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[R.Bz.forChild(st),R.Bz]}),e})(),ct=(()=>{var a;class e{}return(a=e).\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[m.ez,L.m,mt,O.d,x.d,Z.w]}),e})()}}]);