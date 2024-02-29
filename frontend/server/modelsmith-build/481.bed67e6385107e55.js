"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[481],{8481:(Pt,I,n)=>{n.r(I),n.d(I,{ModelCompressionModule:()=>yt});var d=n(6814),M=n(5154),c=n(4221),h=n(538);const V={models:(0,c.Lq)({models:[],error:void 0},(0,c.on)(h.l.loadModelsSuccess,(o,{models:e})=>({...o,models:[...e],error:void 0})),(0,c.on)(h.l.loadModelsFailure,(o,{error:e})=>({...o,error:e})))};var R=n(2096),K=n(2460),J=n(2181),U=n(4664),y=n(7398),H=n(6306),W=n(395),X=n(4992);class k extends X.eW{constructor(){super("model-files",void 0,void 0,!1)}}const w=(0,c.ZF)("model-compression"),E=(0,c.P1)(w,o=>o.models.models);var t=n(5879);let q=(()=>{var o;class e{constructor(s,r,m){this.apiClient=s,this.actions$=r,this.store=m,this.loadModels$=(0,M.GW)(()=>this.actions$.pipe((0,M.l4)(h.l.loadModels),(0,K.M)(this.store.select(E)),(0,J.h)(([u,F])=>!F||0===F.length),(0,U.w)(()=>this.apiClient.serviceCall(new k).pipe((0,y.U)(u=>h.l.loadModelsSuccess({models:u})),(0,H.K)(u=>(0,R.of)(h.l.loadModelsFailure({error:u})))))))}}return(o=e).\u0275fac=function(s){return new(s||o)(t.LFG(W.I),t.LFG(M.eX),t.LFG(c.yh))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac}),e})();var _=n(8524),S=n(1303),G=n(9547),P=n(7582),l=n(8791),tt=n(3620),et=n(3997),ot=n(9386),x=n(4279);const v="custommodel";var A=n(7820),C=n(5360),N=n(8471),a=n(6223),Y=n(999),nt=n(1146),st=n(8450),at=n(6349),lt=n(9534),rt=n(2296),ct=n(7921);let B=(()=>{var o;class e{constructor(s){this.store=s,this.models$=this.store.select(E)}dispatch(s){this.store.dispatch(s)}}return(o=e).\u0275fac=function(s){return new(s||o)(t.LFG(c.yh))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac}),e})();var p,mt=n(127),dt=n(6385),j=n(5195),z=n(5683),D=n(8525),T=n(3680),ht=n(3427);function pt(o,e){if(1&o&&(t.TgZ(0,"mat-option",10),t._uU(1),t.qZA()),2&o){const i=e.$implicit;t.Q6J("value",i),t.xp6(1),t.hij(" ",i," ")}}function gt(o,e){1&o&&(t.TgZ(0,"mat-option",13),t._uU(1,"No results found"),t.qZA())}function ft(o,e){if(1&o&&(t.ynx(0),t.YNc(1,pt,2,2,"mat-option",11),t.YNc(2,gt,2,0,"mat-option",12),t.BQk()),2&o){const i=e.ngIf,s=t.oxw();t.xp6(1),t.Q6J("ngForOf",i)("ngForTrackBy",s.trackByModel),t.xp6(1),t.Q6J("ngIf",0===i.length)}}function ut(o,e){1&o&&(t.ynx(0),t._UZ(1,"ms-file-upload",14),t.BQk())}let Z=((p=class{get modelControl(){return this.form.get(this.MODEL_CONTROL_NAME)}constructor(e,i,s,r,m){this.fb=e,this.controlContainer=i,this.fileService=s,this.modelsFacadeService=r,this.scriptFacadeService=m,this.isCustomModelSelected=!1,this.searchModel=new a.NI,this.models=[],this.customModel=v,this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.loadModelsAndListenToChanges(),this.listenToModelChanges(),this.listenToScriptStateChanges(),this.filteredModels=this.searchModel.valueChanges.pipe((0,ct.O)(""),(0,y.U)(e=>this.filterModels(e)))}loadModelsAndListenToChanges(){this.modelsFacadeService.dispatch(h.l.loadModels()),this.modelsFacadeService.models$.pipe((0,l.t)(this)).subscribe(e=>{e?.length&&(this.models=e,this.searchModel.setValue(""))})}initializeForm(){this.form=this.fb.group({[this.MODEL_CONTROL_NAME]:new a.NI("",a.kI.required)}),this.controlContainer?.control?.parent?.setControl(this.controlContainer.name,this.form)}listenToModelChanges(){this.modelControl?.valueChanges.pipe((0,l.t)(this)).subscribe(e=>{e===v?(this.fileService.file=null,this.isCustomModelSelected=!0):this.isCustomModelSelected=!1})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,l.t)(this)).subscribe(e=>{(0,C.A)(e)?this.form.disable():this.form.enable(),this.modelControl?.patchValue("resnet18")})}filterModels(e){const i=e.toLowerCase();return this.models.filter(s=>s.toLowerCase().includes(i))}trackByModel(e,i){return i}}).\u0275fac=function(e){return new(e||p)(t.Y36(a.qu),t.Y36(a.gN),t.Y36(Y.I),t.Y36(B),t.Y36(N.O))},p.\u0275cmp=t.Xpm({type:p,selectors:[["ms-panel-model"]],decls:17,vars:7,consts:[[1,"ms-card","model-card"],[1,"heading-sub-section-title"],[3,"formGroup"],[1,"form-field-container"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],["label","Predefined Models"],[3,"formControl"],[4,"ngIf"],["label","Custom"],[3,"value"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],["disabled","",4,"ngIf"],["disabled",""],[1,"mt-2"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-card",0)(1,"p",1),t._uU(2,"Model"),t.qZA(),t.ynx(3,2),t.TgZ(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5)(7,"mat-optgroup",6)(8,"mat-option"),t._UZ(9,"ngx-mat-select-search",7),t.qZA(),t.YNc(10,ft,3,3,"ng-container",8),t.ALo(11,"async"),t.qZA(),t._UZ(12,"mat-divider"),t.TgZ(13,"mat-optgroup",9)(14,"mat-option",10),t._uU(15,"Custom Model"),t.qZA()()()()(),t.BQk(),t.YNc(16,ut,2,0,"ng-container",8),t.qZA()),2&e&&(t.xp6(3),t.Q6J("formGroup",i.form),t.xp6(6),t.Q6J("formControl",i.searchModel),t.xp6(1),t.Q6J("ngIf",t.lcZ(11,5,i.filteredModels)),t.xp6(4),t.Q6J("value",i.customModel),t.xp6(2),t.Q6J("ngIf",i.isCustomModelSelected))},dependencies:[d.sg,d.O5,mt.J,dt.d,j.a8,z.KE,D.gD,T.ey,T.Nv,a.JJ,a.JL,a.oH,a.sg,a.u,ht.nu,d.Ov],changeDetection:0}),p);Z=(0,P.gn)([(0,l.c)()],Z);var g,$=n(8180),vt=n(4378),O=n(8279);function Ct(o,e){if(1&o&&(t.TgZ(0,"mat-option",9),t._uU(1),t.qZA()),2&o){const i=e.$implicit;t.Q6J("value",i.key),t.xp6(1),t.hij(" ",i.value," ")}}function Mt(o,e){if(1&o&&(t.TgZ(0,"mat-option",9),t._uU(1),t.qZA()),2&o){const i=e.$implicit;t.Q6J("value",i.key),t.xp6(1),t.hij(" ",i.value," ")}}let Q=((g=class{get algorithmFormControl(){return this.form.get(this.ALGORITHM_CONTROL_NAME)}constructor(e,i,s){this.fb=e,this.controlContainer=i,this.scriptFacadeService=s,this.pruningAlgorithmsList=O.dD,this.quantAlgorithmsList=O.A3,this.ALGORITHM_CONTROL_NAME="alg"}ngOnInit(){this.initForm(),this.listenToScriptStateChanges(),this.loadInitialData()}loadInitialData(){this.scriptFacadeService.scriptStatus$.pipe((0,U.w)(e=>(0,C.A)(e)?this.scriptFacadeService.scriptDetails$.pipe((0,$.q)(1)):(0,R.of)({algKey:O.k2})),(0,$.q)(1)).subscribe(e=>{if((0,vt.Q)(e))return;const i=e?.type;this.setInitialAlgorithmValue(i===A.Bd.PRUNING||i===A.Bd.QUANTIZATION?e.algKey:O.k2)})}setInitialAlgorithmValue(e){this.algorithmFormControl?.setValue(e,{emitEvent:!0})}initForm(){this.form=this.fb.group({[this.ALGORITHM_CONTROL_NAME]:["",a.kI.required]}),this.controlContainer?.control?.parent?.setControl(this.controlContainer.name,this.form)}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,l.t)(this)).subscribe(e=>{(0,C.A)(e)?this.form.disable():this.form.enable()})}trackByAlgorithmKey(e,i){return i.key}}).\u0275fac=function(e){return new(e||g)(t.Y36(a.qu),t.Y36(a.gN),t.Y36(N.O))},g.\u0275cmp=t.Xpm({type:g,selectors:[["ms-panel-algorithm"]],decls:11,vars:6,consts:[[1,"ms-card","algorithm-card"],[1,"heading-sub-section-title"],[3,"formGroup"],[1,"form-field-container"],["appearance","outline","subscriptSizing","dynamic"],[3,"formControlName"],["label","Pruning"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],["label","Quantization"],[3,"value"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-card",0)(1,"p",1),t._uU(2,"Algorithm"),t.qZA(),t.ynx(3,2),t.TgZ(4,"div",3)(5,"mat-form-field",4)(6,"mat-select",5)(7,"mat-optgroup",6),t.YNc(8,Ct,2,2,"mat-option",7),t.qZA(),t.TgZ(9,"mat-optgroup",8),t.YNc(10,Mt,2,2,"mat-option",7),t.qZA()()()(),t.BQk(),t.qZA()),2&e&&(t.xp6(3),t.Q6J("formGroup",i.form),t.xp6(3),t.Q6J("formControlName",i.ALGORITHM_CONTROL_NAME),t.xp6(2),t.Q6J("ngForOf",i.pruningAlgorithmsList)("ngForTrackBy",i.trackByAlgorithmKey),t.xp6(2),t.Q6J("ngForOf",i.quantAlgorithmsList)("ngForTrackBy",i.trackByAlgorithmKey))},dependencies:[d.sg,j.a8,z.KE,D.gD,T.ey,T.Nv,a.JJ,a.JL,a.sg,a.u]}),g);var f;Q=(0,P.gn)([(0,l.c)()],Q);const St=["panelParameters"],At=["algorithmPanel"];function Tt(o,e){1&o&&(t.ynx(0),t._UZ(1,"ms-panel-model",12),t.BQk())}let L=((f=class{constructor(e,i,s,r,m,u,F){this.scriptFacadeService=e,this.fb=i,this.fileService=s,this.fileFacadeService=r,this.snackbarService=m,this.router=u,this.route=F,this.isScriptActive=!1,this.isQuantAlgorithmSelected=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges(),this.listenToAlgorithmPanelChanges()}listenToAlgorithmPanelChanges(){this.form.valueChanges.pipe((0,tt.b)(50),(0,y.U)(e=>e.algorithm&&e.algorithm.alg),(0,et.x)(),(0,J.h)(e=>!!e),(0,l.t)(this)).subscribe(e=>{this.isQuantAlgorithmSelected=(0,A.t6)(e)===A.Bd.QUANTIZATION})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,l.t)(this)).subscribe(e=>{this.isScriptActive=(0,C.A)(e),(0,C.A)(e)?this.form.disable():this.form.enable()})}initForm(){this.form=this.fb.group({algorithm:[],model:[],params:[]})}submit(){this.isQuantAlgorithmSelected?this.handleQuantizationCase():this.handlePruningCase()}handleQuantizationCase(){const{algorithm:e,model:i}=this.form.getRawValue(),{model:s}=i;if(s===v&&!this.fileService.isFileLoaded)return void this.snackbarService.showError("Please select a predefined model or upload a custom file.");let r=s===v?function it(o){let e=o.replace(/[^a-zA-Z0-9_]/g,"_");return/^[0-9_]/.test(e)&&(e="file_"+e),/.py$/.test(e)||(e+=".py"),e}(this.fileService?.file.name):s;const m={...e,params:{...this.panelParametersComponent.parametersFormatted,arch:r}};s===v?this.fileFacadeService.dispatch(ot._.uploadFileAndCallScript({file:this.fileService.file,configs:m})):this.scriptFacadeService.dispatch(x.a.callScript({configs:m}))}handlePruningCase(){const{algorithm:e}=this.form.getRawValue(),i={...e,params:this.panelParametersComponent.parametersFormatted};this.scriptFacadeService.dispatch(x.a.callScript({configs:i}))}goToChartPage(){this.router.navigate([G.Z.MODEL_COMPRESSION.RUNNING.ROOT],{relativeTo:this.route.parent})}}).\u0275fac=function(e){return new(e||f)(t.Y36(N.O),t.Y36(a.qu),t.Y36(Y.I),t.Y36(nt.h),t.Y36(st.QD),t.Y36(S.F0),t.Y36(S.gz))},f.\u0275cmp=t.Xpm({type:f,selectors:[["ms-machine-unlearning"]],viewQuery:function(e,i){if(1&e&&(t.Gf(St,5),t.Gf(At,5)),2&e){let s;t.iGM(s=t.CRH())&&(i.panelParametersComponent=s.first),t.iGM(s=t.CRH())&&(i.algorithmParametersComponent=s.first)}},decls:17,vars:4,consts:[[1,"heading-primary-title","title"],[1,"project-settings-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["formGroupName","algorithm"],["panelAlgorithm",""],[4,"ngIf"],["formArrayName","params"],["panelParameters",""],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","primary",1,"ml-2",3,"click"],[1,"right"],["formGroupName","model"]],template:function(e,i){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Project Settings"),t.qZA(),t.TgZ(2,"div",1)(3,"div",2),t.ynx(4,3),t._UZ(5,"ms-panel-algorithm",4,5),t.YNc(7,Tt,2,0,"ng-container",6),t._UZ(8,"ms-panel-parameters",7,8),t.BQk(),t.TgZ(10,"div")(11,"button",9),t.NdJ("click",function(){return i.submit()}),t._uU(12," Run "),t.qZA(),t.TgZ(13,"button",10),t.NdJ("click",function(){return i.goToChartPage()}),t._uU(14,"View Chart"),t.qZA()()(),t.TgZ(15,"div",11),t._UZ(16,"ms-terminal"),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("formGroup",i.form),t.xp6(2),t.Q6J("formGroup",i.form),t.xp6(3),t.Q6J("ngIf",i.isQuantAlgorithmSelected),t.xp6(4),t.Q6J("disabled",i.isScriptActive||i.form.invalid))},dependencies:[d.O5,at.d,lt.w,rt.lW,a.JL,a.sg,a.x0,a.CE,Z,Q],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}.project-settings-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:20px;height:100%}.project-settings-wrapper[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:45%;gap:20px}.project-settings-wrapper[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{width:55%}"]}),f);L=(0,P.gn)([(0,l.c)()],L);const Ot=[{path:"",component:L},{path:G.Z.MODEL_COMPRESSION.RUNNING.ROOT,loadChildren:()=>n.e(466).then(n.bind(n,8466)).then(o=>o.RunningModule)}];let Ft=(()=>{var o;class e{}return(o=e).\u0275fac=function(s){return new(s||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[S.Bz.forChild(Ot),S.Bz]}),e})(),yt=(()=>{var o;class e{}return(o=e).\u0275fac=function(s){return new(s||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[B],imports:[d.ez,_.m,Ft,c.Aw.forFeature("model-compression",V),M.sQ.forFeature([q])]}),e})()}}]);