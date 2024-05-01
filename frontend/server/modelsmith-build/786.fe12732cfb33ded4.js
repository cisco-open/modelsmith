"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[786],{8786:(Ne,x,s)=>{s.r(x),s.d(x,{AlgorithmComparisonModule:()=>we});var u=s(6814),h=s(5154),i=s(4221);const m=(0,i.R7)({source:"[Run Records -> Records]",events:{"Get Run Records Filenames":(0,i.Ky)(),"Get Run Records Filenames Success":(0,i.Ky)(),"Get Run Records Filenames Failure":(0,i.Ky)(),"Get Run Record Summarized Data":(0,i.Ky)(),"Get Run Record Summarized Data Success":(0,i.Ky)(),"Get Run Record Summarized Data Failure":(0,i.Ky)()}});var F=s(4664),Z=s(7398),w=s(6306),N=s(2096),Q=s(395),I=s(4992);class V extends I.eW{constructor(r){super(`run-records-filenames/${r}`,void 0,void 0,!1)}}class B extends I.eW{constructor(r,a){super(`run-records-summarized-data/${r}/${a}`,void 0,void 0,!1)}}var e=s(5879);let K=(()=>{var t;class r{constructor(n,o){this.apiClient=n,this.actions$=o,this.getRunRecordsFilenames$=(0,h.GW)(()=>this.actions$.pipe((0,h.l4)(m.getRunRecordsFilenames),(0,F.w)(c=>{const{algorithmType:d}=c;return this.apiClient.serviceCall(new V(d)).pipe((0,Z.U)(g=>m.getRunRecordsFilenamesSuccess({files:g})),(0,w.K)(g=>(0,N.of)(m.getRunRecordsFilenamesFailure({error:g}))))}))),this.getRunRecordSummarizedData$=(0,h.GW)(()=>this.actions$.pipe((0,h.l4)(m.getRunRecordSummarizedData),(0,F.w)(c=>{const{algorithmType:d,filename:g}=c;return this.apiClient.serviceCall(new B(d,g)).pipe((0,Z.U)(T=>m.getRunRecordSummarizedDataSuccess({record:T})),(0,w.K)(T=>(0,N.of)(m.getRunRecordSummarizedDataFailure({error:T}))))})))}}return(t=r).\u0275fac=function(n){return new(n||t)(e.LFG(Q.I),e.LFG(h.eX))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),r})();const W=(0,i.Lq)({filenames:[],summarizedRecord:{},error:""},(0,i.on)(m.getRunRecordsFilenamesSuccess,(t,{files:r})=>({...t,filenames:r,error:null})),(0,i.on)(m.getRunRecordsFilenamesFailure,(t,{error:r})=>({...t,error:r})),(0,i.on)(m.getRunRecordSummarizedDataSuccess,(t,{record:r})=>({...t,summarizedRecord:r,error:null})),(0,i.on)(m.getRunRecordSummarizedDataFailure,(t,{error:r})=>({...t,error:r}))),j=(0,i.ZF)("runRecords"),z=(0,i.P1)(j,t=>t.records),k=(0,i.P1)(z,t=>t.filenames),H=(0,i.P1)(z,t=>t.summarizedRecord),q={records:W};var ee=s(4245),p=s(9190),y=s(9421),L=s(2655),b=s(8180),v=function(t){return t.ADD="add",t.EDIT="edit",t.VIEW="view",t}(v||{}),O=s(7582),l=s(6223),A=s(8791),te=s(2181),M=s(836),re=s(4378),U=s(7820),P=s(301),Y=s(6455);let E=(()=>{var t;class r{constructor(n){this.store=n,this.filenames$=this.store.select(k),this.summarizedRecord$=this.store.select(H)}dispatch(n){this.store.dispatch(n)}}return(t=r).\u0275fac=function(n){return new(n||t)(e.LFG(i.yh))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),r})();var f,ae=s(8763),ne=s(6385),S=s(5195),se=s(2032),J=s(5683),oe=s(8525),ie=s(3680),ce=s(7754),me=s(5844),le=s(7602);function de(t,r){if(1&t&&(e.TgZ(0,"mat-option",8),e._uU(1),e.qZA()),2&t){const a=r.$implicit;e.Q6J("value",a),e.xp6(1),e.Oqu(a)}}function ue(t,r){if(1&t&&(e.ynx(0),e._uU(1),e.ALo(2,"readableDuration"),e.BQk()),2&t){const a=e.oxw().$implicit;e.xp6(1),e.Oqu(e.lcZ(2,1,a.value))}}function pe(t,r){if(1&t&&(e.ynx(0),e._uU(1),e.BQk()),2&t){const a=e.oxw().$implicit;e.xp6(1),e.Oqu(a.value)}}function ge(t,r){1&t&&(e.TgZ(0,"div",24),e._UZ(1,"mat-divider"),e.qZA())}function he(t,r){if(1&t&&(e.TgZ(0,"div",16)(1,"div",17)(2,"div",18),e._uU(3),e.ALo(4,"parametersLabel"),e.qZA(),e.TgZ(5,"div",19),e.ynx(6,20),e.YNc(7,ue,3,3,"ng-container",21),e.YNc(8,pe,2,1,"ng-container",22),e.BQk(),e.qZA()(),e.YNc(9,ge,2,0,"div",23),e.qZA()),2&t){const a=r.$implicit,n=r.last;e.xp6(3),e.hij("",e.lcZ(4,4,a.key),":"),e.xp6(3),e.Q6J("ngSwitch",a.key),e.xp6(1),e.Q6J("ngSwitchCase","duration_seconds"),e.xp6(2),e.Q6J("ngIf",!n)}}function fe(t,r){if(1&t&&(e.TgZ(0,"mat-card",13)(1,"p",14),e._uU(2,"Statistics"),e.qZA(),e.YNc(3,he,10,6,"div",15),e.qZA()),2&t){const a=r.$implicit;e.xp6(3),e.Q6J("ngForOf",a)}}function Re(t,r){1&t&&(e.TgZ(0,"div",24),e._UZ(1,"mat-divider"),e.qZA())}function ve(t,r){if(1&t&&(e.TgZ(0,"div",16)(1,"div",17)(2,"div",18),e._uU(3),e.ALo(4,"parametersLabel"),e.qZA(),e.TgZ(5,"div",19),e._uU(6),e.qZA()(),e.YNc(7,Re,2,0,"div",23),e.qZA()),2&t){const a=r.$implicit,n=r.last;e.xp6(3),e.hij("",e.lcZ(4,3,a.key),":"),e.xp6(3),e.hij(" ",a.value," "),e.xp6(1),e.Q6J("ngIf",!n)}}function Ae(t,r){if(1&t&&(e.TgZ(0,"mat-card",13)(1,"div",14),e._uU(2,"Parameters"),e.qZA(),e.YNc(3,ve,8,5,"div",15),e.qZA()),2&t){const a=r.$implicit;e.xp6(3),e.Q6J("ngForOf",a)}}function Ce(t,r){if(1&t&&(e.TgZ(0,"mat-card",25)(1,"p",26),e._uU(2,"Last Accuracy Test Runs"),e.qZA(),e._UZ(3,"ms-line-chart",27),e.qZA()),2&t){const a=e.oxw(2);e.xp6(3),e.Q6J("data",a.lastRunAccuracyTestingChartData)("settings",a.testingAccuracyChartDisplaySettings)}}function _e(t,r){if(1&t&&(e.ynx(0),e._UZ(1,"mat-divider"),e.TgZ(2,"div",9)(3,"mat-label"),e._uU(4,"Set run name"),e.qZA(),e.TgZ(5,"mat-form-field",3),e._UZ(6,"input",10),e.qZA()(),e.YNc(7,fe,4,1,"mat-card",11),e.ALo(8,"keyvalue"),e.YNc(9,Ae,4,1,"mat-card",11),e.ALo(10,"keyvalue"),e.YNc(11,Ce,4,2,"mat-card",12),e.BQk()),2&t){const a=e.oxw();e.xp6(7),e.Q6J("ngIf",e.lcZ(8,3,null==a.summarizedRecord?null:a.summarizedRecord.statistics)),e.xp6(2),e.Q6J("ngIf",e.lcZ(10,5,null==a.summarizedRecord?null:a.summarizedRecord.parameters)),e.xp6(2),e.Q6J("ngIf",!(null==a.summarizedRecord||!a.summarizedRecord.lastRunTestingAccuracyData))}}function ye(t,r){1&t&&e._UZ(0,"ms-empty-state",28)}let C=((f=class{get selectRunFormControl(){return this.form.get("selectRun")}get runNameFormControl(){return this.form.get("runName")}constructor(r,a,n,o){this.drawerRef=r,this.drawerConfig=a,this.fb=n,this.recordsFacadeService=o,this.form=new l.cw({}),this.files=[],this.testingAccuracyChartDisplaySettings={yAxisMinimumValue:0,yAxisTickInterval:20,chartDataStructure:Y.nR.SINGLE_PHASE_X_AXIS,xAxisDataPointsCount:100,yAxisMaximumValue:100,datasetColorSettingsKey:P.g.YELLOW,isXAxisVisible:!1,areTooltipsEnabled:!0,xAxisLabelPrefix:"Step:",datasetLabelPrefix:"Test:"},this.lastRunAccuracyTestingChartData=[]}ngOnInit(){switch(this.initForm(),this.drawerConfig.actionType){case v.ADD:this.loadData(),this.configureAddTypeActions();break;case v.VIEW:this.configureViewTypeActions()}}configureViewTypeActions(){this.form.disable();const{recordName:r,recordFilename:a,record:n}=this.drawerConfig.data;this.files=[a],this.selectRunFormControl.patchValue(a),this.runNameFormControl.patchValue(r),this.summarizedRecord=n,this.lastRunAccuracyTestingChartData=this.configureChartDataset(n),this.testingAccuracyChartDisplaySettings={...this.testingAccuracyChartDisplaySettings,hasCustomDatasetsLabels:!0,customDatasetsLabels:[r]}}configureAddTypeActions(){this.listenToSelectRunFormValueChanges(),this.listenToSummarizedRecordChanges()}listenToSelectRunFormValueChanges(){this.selectRunFormControl.valueChanges.pipe((0,A.t)(this),(0,te.h)(r=>!(0,re.Bm)(r))).subscribe(r=>{this.recordsFacadeService.dispatch(m.getRunRecordSummarizedData({algorithmType:U.Bd.PRUNING,filename:r}))})}listenToSummarizedRecordChanges(){this.recordsFacadeService.summarizedRecord$.pipe((0,A.t)(this),(0,M.T)(1)).subscribe(r=>{this.summarizedRecord=r,this.lastRunAccuracyTestingChartData=this.configureChartDataset(r)})}configureChartDataset(r){return[{datasetIndex:0,values:r.lastRunTestingAccuracyData||[]}]}loadData(){this.recordsFacadeService.dispatch(m.getRunRecordsFilenames({algorithmType:U.Bd.PRUNING})),this.recordsFacadeService.filenames$.pipe((0,M.T)(1),(0,b.q)(1)).subscribe(r=>this.files=r)}initForm(){this.form=this.fb.group({selectRun:[null,l.kI.required],runName:[null,l.kI.required]})}save(r){r===p.ni.SAVE&&this.drawerRef.close({result:{recordName:this.runNameFormControl.value,recordFilename:this.selectRunFormControl.value,record:this.summarizedRecord},status:r})}close(){this.drawerRef.close()}}).\u0275fac=function(r){return new(r||f)(e.Y36(p.Pf),e.Y36(p.ZI),e.Y36(l.qu),e.Y36(E))},f.\u0275cmp=e.Xpm({type:f,selectors:[["ms-run-drawer-actions"]],decls:11,vars:5,consts:[[3,"isSaveDisabled","actionEvent"],[3,"formGroup"],[1,"form-field-container"],["appearance","outline"],["formControlName","selectRun","placeholder","Select a run record"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf","ngIfElse"],["noData",""],[3,"value"],[1,"form-field-container","mt-4"],["matInput","","formControlName","runName","placeholder","Set run name"],["class","ms-card record-wrapper mb-4",4,"ngIf"],["class","ms-card record-wrapper",4,"ngIf"],[1,"ms-card","record-wrapper","mb-4"],[1,"paragraph-bold-p3-small-bold","mb-4"],["class","key-value-container single",4,"ngFor","ngForOf"],[1,"key-value-container","single"],[1,"key-value-pair","space-between"],[1,"key-value-key"],[1,"key-value-value"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],["class","pt-2",4,"ngIf"],[1,"pt-2"],[1,"ms-card","record-wrapper"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],["title","Awaiting Run Record Selection","message","Select a run record from the dropdown to view details and statistics."]],template:function(r,a){if(1&r&&(e.TgZ(0,"ms-drawer",0),e.NdJ("actionEvent",function(o){return a.save(o)}),e.TgZ(1,"form",1)(2,"div",2)(3,"mat-label"),e._uU(4,"Select run record"),e.qZA(),e.TgZ(5,"mat-form-field",3)(6,"mat-select",4),e.YNc(7,de,2,2,"mat-option",5),e.qZA()()(),e.YNc(8,_e,12,7,"ng-container",6),e.qZA()(),e.YNc(9,ye,1,0,"ng-template",null,7,e.W1O)),2&r){const n=e.MAs(10);e.Q6J("isSaveDisabled",a.form.invalid),e.xp6(1),e.Q6J("formGroup",a.form),e.xp6(6),e.Q6J("ngForOf",a.files),e.xp6(1),e.Q6J("ngIf",!!a.summarizedRecord)("ngIfElse",n)}},dependencies:[u.sg,u.O5,u.RF,u.n9,u.ED,ae.k,ne.d,S.a8,se.Nt,J.KE,J.hX,oe.gD,ie.ey,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,y.w,ce.u,u.Nd,me.n,le.N]}),f);C=(0,O.gn)([(0,A.c)()],C);var Se=s(5619);const De=[{recordName:"First run",recordFilename:"2024_04_16_09:44:06_IPG_ResNet18",record:{parameters:{lr:.1,epochs:2,pruning_times:3,pruning_ratio:.2,rewinding_epoch:1,best_acc:0,save_dir:"/home/ipop/modelsmith/examples_pruning/models_checkpoints",arch:"ResNet18"},statistics:{duration_seconds:268.2938714027405},lastRunTestingAccuracyData:[74,69,66.667,67.25,68.2,69.167,69.143,67.5,67.222,67.2,67.364,67.917,67.923,67.786,67.733,67.188,67.353,67.444,67.737,67.65,67.619,67.682,67.783,67.833,67.96,67.577,67.667,67.75,67.931,68.067,68.29,68.344,68.242,68.118,67.914,68.028,67.784,67.737,68.026,68,68.073,68.071,68.047,68.159,68.111,68.065,68.085,68.021,68.102,68.22,68.255,68.365,68.434,68.352,68.327,68.357,68.386,68.517,68.373,68.4,68.295,68.274,68.27,68.297,68.354,68.333,68.343,68.265,68.232,68.129,68.127,68.25,68.329,68.419,68.387,68.382,68.416,68.423,68.354,68.3,68.37,68.341,68.386,68.286,68.294,68.337,68.23,68.17,68.18,68.178,68.187,68.217,68.161,68.117,68.137,68.208,68.268,68.214,68.172,68.16]}},{recordName:"Record 2",recordFilename:"2024_04_16_10:12:57_IMP_ResNet18",record:{parameters:{lr:.1,epochs:1,pruning_times:1,pruning_ratio:.2,rewinding_epoch:1,best_acc:0,save_dir:"/home/ipop/modelsmith/examples_pruning/models_checkpoints",arch:"ResNet18"},statistics:{duration_seconds:46.21076583862305},lastRunTestingAccuracyData:[60,54.5,53,53,53.2,53.5,53.714,53.75,54,54.9,55.364,55,54.769,54.857,54.933,54.875,55.353,55.056,55.421,55.25,55.571,55.182,55.13,55.042,55,54.808,54.667,54.607,54.586,54.8,55.065,55.031,55.061,55.059,55.029,55.194,54.973,54.763,54.872,54.85,54.902,54.952,55.116,55.136,55.222,55.239,55.34,55.417,55.49,55.54,55.451,55.346,55.396,55.37,55.273,55.321,55.368,55.552,55.458,55.467,55.492,55.435,55.476,55.422,55.354,55.364,55.328,55.25,55.174,55.129,55.099,55.25,55.274,55.324,55.347,55.447,55.455,55.423,55.506,55.562,55.642,55.573,55.602,55.583,55.553,55.57,55.529,55.602,55.607,55.622,55.648,55.739,55.774,55.67,55.674,55.74,55.763,55.724,55.667,55.7]}},{recordName:"Another run",recordFilename:"2024_04_17_08:33:13_IMP_ResNet18",record:{parameters:{lr:.1,epochs:2,pruning_times:3,pruning_ratio:.2,rewinding_epoch:1,best_acc:0,save_dir:"/home/ipop/modelsmith/examples_pruning/models_checkpoints",arch:"ResNet18"},statistics:{duration_seconds:268.1203279495239},lastRunTestingAccuracyData:[74,71.5,68.333,69.75,70.2,70.667,69.714,68.625,68.667,69,69.636,70.25,70,69.5,69.733,69.5,69.588,69.556,69.579,69.4,69.19,69.273,69.435,69.417,69.28,69,68.889,69.179,69.31,69.233,69.29,69.281,69.333,69.206,69,69.139,68.946,68.921,69.103,69.15,69.146,69.143,69.302,69.409,69.356,69.152,69.234,69.354,69.449,69.42,69.294,69.269,69.472,69.389,69.327,69.268,69.246,69.345,69.271,69.25,69.115,69.129,69.143,69.203,69.138,69.136,69.134,69.088,69.029,68.971,69,69.056,69.164,69.203,69.187,69.263,69.195,69.141,69.114,69.1,69.111,69.134,69.157,69.119,69.129,69.174,69.103,69.08,69.056,69.056,69.132,69.163,69.118,69.074,69.126,69.208,69.309,69.235,69.212,69.25]}}];let _=(()=>{var t;class r{get records$(){return this._records.asObservable()}addRecord(n){const c=[...this._records.value,n];this._records.next(c)}removeRecord(n){const o=this._records.value;if(n>=0&&n<o.length){const c=o.filter((d,g)=>g!==n);this._records.next(c)}}constructor(){this._records=new Se.X(De)}}return(t=r).\u0275fac=function(n){return new(n||t)},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),r})();var $=s(2296),G=s(617);function Te(t,r){if(1&t){const a=e.EpF();e.TgZ(0,"mat-card",2)(1,"div",3)(2,"div"),e._uU(3),e.qZA(),e.TgZ(4,"div",4)(5,"button",5),e.NdJ("click",function(){const c=e.CHM(a).$implicit,d=e.oxw();return e.KtG(d.viewRecord(c))}),e.TgZ(6,"mat-icon",6),e._uU(7,"delete"),e.qZA()(),e.TgZ(8,"button",7),e.NdJ("click",function(){const c=e.CHM(a).index,d=e.oxw();return e.KtG(d.removeRecord(c))}),e.TgZ(9,"mat-icon",8),e._uU(10,"delete"),e.qZA()()()()()}if(2&t){const a=r.$implicit;e.xp6(3),e.AsE("",a.recordName," | ",a.record.parameters.arch,"")}}let xe=(()=>{var t;class r{constructor(n,o){this.recordsDataService=n,this.drawerService=o}removeRecord(n){this.recordsDataService.removeRecord(n)}viewRecord(n){this.drawerService.open(C,{title:"Add Run",saveButtonLabel:"Add",showSaveButton:!1,actionType:v.VIEW,data:n})}}return(t=r).\u0275fac=function(n){return new(n||t)(e.Y36(_),e.Y36(p.zv))},t.\u0275cmp=e.Xpm({type:t,selectors:[["ms-algorithm-comparison-list"]],decls:3,vars:3,consts:[[1,"items-wrapper"],["class","ms-card comparison-item",4,"ngFor","ngForOf"],[1,"ms-card","comparison-item"],[1,"item-wrapper"],[1,"record-summary-buttons-wrapper"],["mat-icon-button","","color","primary",3,"click"],["fontSet","ms","fontIcon","icon-Eye",1,"mat-primary"],["mat-icon-button","","color","error",3,"click"],[1,"mat-error"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.YNc(1,Te,11,2,"mat-card",1),e.ALo(2,"async"),e.qZA()),2&n&&(e.xp6(1),e.Q6J("ngForOf",e.lcZ(2,1,o.recordsDataService.records$)))},dependencies:[u.sg,$.RK,G.Hw,S.a8,u.Ov],styles:[".items-wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));grid-gap:20px;padding:20px 0}.items-wrapper[_ngcontent-%COMP%]   .ms-card[_ngcontent-%COMP%]:hover{box-shadow:0 8px 16px #0003}.items-wrapper[_ngcontent-%COMP%]   .comparison-item[_ngcontent-%COMP%]   .item-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.items-wrapper[_ngcontent-%COMP%]   .comparison-item[_ngcontent-%COMP%]   .item-wrapper[_ngcontent-%COMP%]   .record-summary-buttons-wrapper[_ngcontent-%COMP%]{display:flex}"]}),r})();var R;let D=((R=class{constructor(r){this.recordsDataService=r,this.testingAccuracyChartDisplaySettings={yAxisMinimumValue:0,yAxisTickInterval:20,chartDataStructure:Y.nR.SINGLE_PHASE_X_AXIS,xAxisDataPointsCount:100,yAxisMaximumValue:100,datasetColorSettingsKey:P.g.YELLOW,isXAxisVisible:!1,areTooltipsEnabled:!0,xAxisLabelPrefix:"Step:",hasCustomDatasetsLabels:!0},this.lastRunsAccuracyTestingChartData=[]}ngOnInit(){this.listenToRecordsChanges()}listenToRecordsChanges(){this.recordsDataService.records$.pipe((0,A.t)(this)).subscribe(r=>{this.lastRunsAccuracyTestingChartData=this.configureChartDatasets(r),this.testingAccuracyChartDisplaySettings={...this.testingAccuracyChartDisplaySettings,customDatasetsLabels:r.map(a=>a.recordName)}})}configureChartDatasets(r){const a=[];return r.forEach((n,o)=>{const{record:c}=n;a.push({datasetIndex:o,values:c.lastRunTestingAccuracyData||[]})}),a}}).\u0275fac=function(r){return new(r||R)(e.Y36(_))},R.\u0275cmp=e.Xpm({type:R,selectors:[["ms-algorithm-comparison-chart"]],decls:4,vars:2,consts:[[1,"ms-card","algorithm-comparisson-charts"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"]],template:function(r,a){1&r&&(e.TgZ(0,"mat-card",0)(1,"p",1),e._uU(2,"Last Accuracy Test Runs"),e.qZA(),e._UZ(3,"ms-line-chart",2),e.qZA()),2&r&&(e.xp6(3),e.Q6J("data",a.lastRunsAccuracyTestingChartData)("settings",a.testingAccuracyChartDisplaySettings))},dependencies:[S.a8,y.w]}),R);D=(0,O.gn)([(0,A.c)()],D);const Fe=[{path:"",component:(()=>{var t;class r{constructor(n,o){this.drawerService=n,this.recordsDataService=o}openAddRunDrawer(){this.drawerService.open(C,{title:"Add Run",saveButtonLabel:"Add",actionType:v.ADD}).afterClosed().pipe((0,b.q)(1)).subscribe(o=>{const{status:c}=o;if(c===p.ni.DISMISS)return;const{result:d}=o;this.recordsDataService.addRecord(d)})}}return(t=r).\u0275fac=function(n){return new(n||t)(e.Y36(p.zv),e.Y36(_))},t.\u0275cmp=e.Xpm({type:t,selectors:[["ms-algorithm-comparison"]],decls:7,vars:0,consts:[[1,"heading-primary-title","title"],["mat-fab","","extended","","color","warn",3,"click"],["fontSet","ms","fontIcon","icon-Plus"]],template:function(n,o){1&n&&(e.TgZ(0,"p",0),e._uU(1,"Algorithm Comparison"),e.qZA(),e.TgZ(2,"button",1),e.NdJ("click",function(){return o.openAddRunDrawer()}),e._UZ(3,"mat-icon",2),e._uU(4," Add run\n"),e.qZA(),e._UZ(5,"ms-algorithm-comparison-list")(6,"ms-algorithm-comparison-chart"))},dependencies:[$.cs,G.Hw,xe,D]}),r})()}];let Ze=(()=>{var t;class r{}return(t=r).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[L.Bz.forChild(Fe),L.Bz]}),r})(),we=(()=>{var t;class r{}return(t=r).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[p.zv,E,_],imports:[u.ez,Ze,p.kZ,ee.m,i.Aw.forFeature("runRecords",q),h.sQ.forFeature([K]),y.w]}),r})()}}]);