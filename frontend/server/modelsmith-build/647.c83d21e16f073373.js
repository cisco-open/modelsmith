"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[647],{9233:(b,u,n)=>{n.r(u),n.d(u,{ModelTrainingModule:()=>Y});var l,y=n(6814),M=n(4245),f=n(3328),v=n(1668),A=n(1543),c=n(4190),C=n(7582),a=n(6223),p=n(8791),N=n(3620),F=n(7398),S=n(3997),R=n(2181),G=n(39),O=n(9547),P=n(4378),s=n(7820),g=n(127),t=n(5879),h=n(9532),I=n(2296),Z=n(5195),J=n(5683),K=n(8525),U=n(3680);function B(i,e){if(1&i&&(t.TgZ(0,"mat-option",7),t._uU(1),t.qZA()),2&i){const o=e.$implicit;t.Q6J("value",o.key),t.xp6(1),t.hij(" ",o.value," ")}}let d=((l=class{get parentFormGroup(){return this.controlContainer.control}get algorithmTypeFormGroup(){return this.parentFormGroup.get(this.controlKey)}get algorithmTypeFormControl(){return this.algorithmTypeFormGroup.get(this.ALGORITHM_TYPE_CONTROL_NAME)}constructor(e,o){this.controlContainer=e,this.scriptFacadeService=o,this.controlKey="",this.algorithmTypesOptions=s.VN.filter(r=>r.key!==s.Bd.TRAIN),this.ALGORITHM_TYPE_CONTROL_NAME="algorithmType"}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.parentFormGroup.addControl(this.controlKey,new a.cw({[this.ALGORITHM_TYPE_CONTROL_NAME]:new a.NI(s.Bd.PRUNING,a.kI.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,p.t)(this)).subscribe(e=>{(0,g.A)(e)?this.algorithmTypeFormGroup.disable():this.algorithmTypeFormGroup.enable()})}trackByAlgorithmType(e,o){return o.key}}).\u0275fac=function(e){return new(e||l)(t.Y36(a.gN),t.Y36(h.OF))},l.\u0275cmp=t.Xpm({type:l,selectors:[["ms-panel-algorithm-type"]],inputs:{controlKey:"controlKey"},features:[t._Bn([],[{provide:a.gN,useFactory:()=>(0,t.f3M)(a.gN,{skipSelf:!0})}])],decls:8,vars:4,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],[3,"formGroupName"],[1,"form-field-container"],["appearance","outline","subscriptSizing","dynamic"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],[3,"value"]],template:function(e,o){1&e&&(t.TgZ(0,"mat-card",0)(1,"p",1),t._uU(2,"Algorithm Type"),t.qZA(),t.ynx(3,2),t.TgZ(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5),t.YNc(7,B,2,2,"mat-option",6),t.qZA()()(),t.BQk(),t.qZA()),2&e&&(t.xp6(3),t.Q6J("formGroupName",o.controlKey),t.xp6(3),t.Q6J("formControlName",o.ALGORITHM_TYPE_CONTROL_NAME),t.xp6(1),t.Q6J("ngForOf",o.algorithmTypesOptions)("ngForTrackBy",o.trackByAlgorithmType))},dependencies:[y.sg,Z.a8,J.KE,K.gD,U.ey,a.JJ,a.JL,a.u,a.x0]}),l);var m;d=(0,C.gn)([(0,p.c)()],d);const L=["panelParameters"];let T=((m=class{constructor(e,o,r){this.scriptFacadeService=e,this.router=o,this.snackbarService=r,this.form=new a.cw({}),this.isScriptActive=!1,this.selectedAlgorithmType=s.Bd.PRUNING,this.selectedAlgorithmKey=s.tp.PRUNING_TRAIN}ngOnInit(){this.listenToAlgorithmPanelChanges(),this.listenToScriptStateChanges()}listenToAlgorithmPanelChanges(){this.form.valueChanges.pipe((0,N.b)(50),(0,F.U)(()=>{const e=this.form.getRawValue();return e.algorithmTypeGroup&&e.algorithmTypeGroup.algorithmType}),(0,S.x)(),(0,R.h)(e=>!!e),(0,p.t)(this)).subscribe(e=>{this.selectedAlgorithmType=e,this.selectedAlgorithmKey=s.R0[e]})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,p.t)(this)).subscribe(e=>{this.isScriptActive=(0,g.A)(e),(0,g.A)(e)?this.form.disable():this.form.enable()})}submit(){if((0,P.kK)(this.selectedAlgorithmType))return void this.snackbarService.showError("Select an algorithm before running a script.");const{model:e}=this.form.getRawValue(),{model:o}=e,r={alg:this.selectedAlgorithmKey,params:{...this.panelParametersComponent.parametersFormatted,arch:o}};this.scriptFacadeService.dispatch(G.aj.callScript({configs:r}))}goToChartPage(){this.router.navigate([O.Z.RUNNING.ROOT])}}).\u0275fac=function(e){return new(e||m)(t.Y36(h.OF),t.Y36(c.F0),t.Y36(h.QD))},m.\u0275cmp=t.Xpm({type:m,selectors:[["ms-model-training"]],viewQuery:function(e,o){if(1&e&&t.Gf(L,5),2&e){let r;t.iGM(r=t.CRH())&&(o.panelParametersComponent=r.first)}},decls:15,vars:6,consts:[[1,"heading-primary-title","title"],[1,"page-wrapper"],[1,"left",3,"formGroup"],["controlKey","algorithmTypeGroup"],["controlKey","model",3,"algorithmType","areNotTrainedItemsSelectable","isInitialLoadForTrainTypeModels"],["controlKey","params",3,"algorithm"],["panelParameters",""],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","primary",1,"ml-2",3,"click"],[1,"right"]],template:function(e,o){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Model Training"),t.qZA(),t.TgZ(2,"div",1)(3,"div",2),t._UZ(4,"ms-panel-algorithm-type",3)(5,"ms-panel-model",4)(6,"ms-panel-parameters",5,6),t.TgZ(8,"div")(9,"button",7),t.NdJ("click",function(){return o.submit()}),t._uU(10," Run "),t.qZA(),t.TgZ(11,"button",8),t.NdJ("click",function(){return o.goToChartPage()}),t._uU(12,"View Chart"),t.qZA()()(),t.TgZ(13,"div",9),t._UZ(14,"ms-terminal"),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("formGroup",o.form),t.xp6(2),t.Q6J("algorithmType",o.selectedAlgorithmType)("areNotTrainedItemsSelectable",!0)("isInitialLoadForTrainTypeModels",!0),t.xp6(1),t.Q6J("algorithm",o.selectedAlgorithmKey),t.xp6(3),t.Q6J("disabled",o.isScriptActive||o.form.invalid))},dependencies:[I.lW,a.JL,a.sg,A.d,f.d,v.w,d],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),m);T=(0,C.gn)([(0,p.c)()],T);const E=[{path:"",component:T}];let Q=(()=>{var i;class e{}return(i=e).\u0275fac=function(r){return new(r||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[c.Bz.forChild(E),c.Bz]}),e})(),Y=(()=>{var i;class e{}return(i=e).\u0275fac=function(r){return new(r||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[y.ez,M.m,Q,A.d,f.d,v.w]}),e})()}}]);