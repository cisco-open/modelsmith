"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[298],{3328:(G,x,t)=>{t.d(x,{d:()=>Q});var u,y=t(7582),p=t(6814),e=t(5879),s=t(6223),f=t(5195),E=t(5683),M=t(617),T=t(5940),h=t(8525),O=t(2655),d=t(8791),C=t(3427),L=t(2181),v=t(7398),U=t(7921),D=t(3607),K=t(6799),B=t(9547),A=t(4378),F=t(127),g=t(6826),R=t(3705),N=t(8471),S=t(833),I=t(3680);function W(_,n){1&_&&(e.ynx(0),e._UZ(1,"ms-spining-indicator",12),e.BQk())}function Z(_,n){if(1&_&&(e.ynx(0),e.YNc(1,W,2,0,"ng-container",9),e.BQk()),2&_){const r=n.ngIf,m=e.oxw(2);e.xp6(1),e.Q6J("ngIf",r===m.PageKey.MODEL_TRAINING)}}const P=function(_){return[_]};function i(_,n){if(1&_&&(e.TgZ(0,"div",10)(1,"a",11),e._uU(2,"Train models"),e.qZA(),e.YNc(3,Z,2,1,"ng-container",9),e.ALo(4,"async"),e.qZA()),2&_){const r=e.oxw();e.xp6(1),e.Q6J("routerLink",e.VKq(4,P,"/"+r.RoutesList.MODEL_TRAINING.ROOT)),e.xp6(2),e.Q6J("ngIf",e.lcZ(4,2,r.pageRunningScriptSpiningIndicatorService.currentRunningPage$))}}function o(_,n){1&_&&e._UZ(0,"mat-icon",17)}function a(_,n){if(1&_&&(e.TgZ(0,"mat-option",15),e._uU(1),e.YNc(2,o,1,0,"mat-icon",16),e.qZA()),2&_){const r=n.$implicit,m=e.oxw(2);e.Q6J("value",r.name)("disabled",!m.areNotTrainedItemsSelectable&&!r.isTrained),e.xp6(1),e.hij(" ",r.name," "),e.xp6(1),e.Q6J("ngIf",!r.isTrained)}}function l(_,n){1&_&&(e.TgZ(0,"mat-option",18),e._uU(1,"No results found"),e.qZA())}function c(_,n){if(1&_&&(e.ynx(0),e.YNc(1,a,3,4,"mat-option",13),e.YNc(2,l,2,0,"mat-option",14),e.BQk()),2&_){const r=n.ngIf,m=e.oxw();e.xp6(1),e.Q6J("ngForOf",r)("ngForTrackBy",m.trackByModel),e.xp6(1),e.Q6J("ngIf",0===r.length)}}let Q=((u=class{ngOnChanges(n){n.algorithmType&&n.algorithmType.currentValue&&this.configureModels(n.algorithmType.currentValue)}get parentFormGroup(){return this.controlContainer.control}get modelFormGroup(){return this.parentFormGroup.get(this.controlKey)}get modelControl(){return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME)}constructor(n,r,m,J){this.controlContainer=n,this.modelsFacadeService=r,this.scriptFacadeService=m,this.pageRunningScriptSpiningIndicatorService=J,this.controlKey="",this.areNotTrainedItemsSelectable=!1,this.isInitialLoadForTrainTypeModels=!1,this.isTrainedModelsPageVisible=!0,this.PageKey=K.C,this.RoutesList=B.Z,this.searchModel=new s.NI,this.models=[],this.MODEL_CONTROL_NAME="model"}ngOnInit(){this.initializeForm(),this.listenToScriptStateChanges(),this.listenToSearchModelValueChanges()}configureModels(n){n&&(this.getModelsByTypeSubscription?.unsubscribe(),this.getModelsByTypeSubscription=this.subscribeToModelsListChanges(n),this.modelsFacadeService.dispatch(D.o.getModelsList({algorithmType:n})),this.modelsFacadeService.dispatch(D.o.getCurrentOrPreviousSelectedModel({algorithmType:n})))}listenToCurrentModelChanges(){this.modelsFacadeService.currentModel$.pipe((0,d.t)(this)).subscribe(n=>{if((0,A.Bm)(n))return;const r=this.models.find(m=>m.name===n);r&&r.isTrained&&this.modelControl?.patchValue(n)})}subscribeToModelsListChanges(n){let r=!1;return this.modelsFacadeService.getModelsByType(n).pipe((0,L.h)(m=>!(0,A.yD)(m)),(0,v.U)(m=>[...m].sort((J,Y)=>Number(Y.isTrained)-Number(J.isTrained)))).subscribe(m=>{this.models=m,this.searchModel.setValue(""),r||(this.listenToCurrentModelChanges(),r=!0)})}initializeForm(){this.parentFormGroup.addControl(this.controlKey,new s.cw({[this.MODEL_CONTROL_NAME]:new s.NI("",s.kI.required)}))}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,d.t)(this)).subscribe(n=>{(0,F.A)(n)?this.modelFormGroup.disable():this.modelFormGroup.enable()})}listenToSearchModelValueChanges(){this.filteredModels=this.searchModel.valueChanges.pipe((0,d.t)(this),(0,U.O)(""),(0,v.U)(n=>this.filterModels(n)))}filterModels(n){const r=n.toLowerCase();return this.models.filter(m=>m.name.toLowerCase().includes(r))}trackByModel(n,r){return r.name}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}}).\u0275fac=function(n){return new(n||u)(e.Y36(s.gN),e.Y36(R.V),e.Y36(N.O),e.Y36(S.T))},u.\u0275cmp=e.Xpm({type:u,selectors:[["ms-panel-model"]],inputs:{controlKey:"controlKey",algorithmType:"algorithmType",areNotTrainedItemsSelectable:"areNotTrainedItemsSelectable",isInitialLoadForTrainTypeModels:"isInitialLoadForTrainTypeModels",isTrainedModelsPageVisible:"isTrainedModelsPageVisible"},standalone:!0,features:[e._Bn([],[{provide:s.gN,useFactory:()=>(0,e.f3M)(s.gN,{skipSelf:!0})}]),e.TTD,e.jDz],decls:13,vars:6,consts:[[1,"ms-card","model-card"],[1,"panel-title-wrapper"],[1,"heading-sub-section-title"],["class","train-models",4,"ngIf"],[1,"form-field-container",3,"formGroupName"],["appearance","outline","subscriptSizing","dynamic"],["formControlName","model","placeholder","Select a model..."],["label","Predefined Models"],[3,"formControl"],[4,"ngIf"],[1,"train-models"],[3,"routerLink"],[1,"ml-2"],[3,"value","disabled",4,"ngFor","ngForOf","ngForTrackBy"],["disabled","",4,"ngIf"],[3,"value","disabled"],["class","mat-error","fontSet","ms","fontIcon","icon-X",4,"ngIf"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"],["disabled",""]],template:function(n,r){1&n&&(e.TgZ(0,"mat-card",0)(1,"div",1)(2,"div",2),e._uU(3,"Model"),e.qZA(),e.YNc(4,i,5,6,"div",3),e.qZA(),e.TgZ(5,"div",4)(6,"mat-form-field",5)(7,"mat-select",6)(8,"mat-optgroup",7)(9,"mat-option"),e._UZ(10,"ngx-mat-select-search",8),e.qZA(),e.YNc(11,c,3,3,"ng-container",9),e.ALo(12,"async"),e.qZA()()()()()),2&n&&(e.xp6(4),e.Q6J("ngIf",r.isTrainedModelsPageVisible),e.xp6(1),e.Q6J("formGroupName",r.controlKey),e.xp6(5),e.Q6J("formControl",r.searchModel),e.xp6(1),e.Q6J("ngIf",e.lcZ(12,4,r.filteredModels)))},dependencies:[s.UX,s.JJ,s.JL,s.oH,s.u,s.x0,f.QW,f.a8,E.lN,E.KE,h.LD,h.gD,I.ey,I.Nv,M.Ps,M.Hw,p.ez,p.sg,p.O5,p.Ov,C.Co,C.nu,O.rH,T.Cq,g.E],styles:[".panel-title-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:12px}.panel-title-wrapper[_ngcontent-%COMP%]   .train-models[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),u);Q=(0,y.gn)([(0,d.c)()],Q)},1668:(G,x,t)=>{t.d(x,{w:()=>P});var g,y=t(7582),p=t(6814),e=t(5879),s=t(6223),f=t(5195),E=t(5986),M=t(5683),T=t(2032),h=t(8525),O=t(2596),d=t(8791),C=t(7398),L=t(836),v=t(3946),U=t(9547),D=t(8279),K=t(127),B=t(3221),A=t(8471),F=t(3680);function R(i,o){if(1&i&&(e.TgZ(0,"div",10)(1,"mat-label"),e._uU(2),e.qZA(),e.TgZ(3,"mat-form-field",11),e._UZ(4,"input",12)(5,"mat-icon",13),e.qZA()()),2&i){const a=e.oxw(),l=a.$implicit,c=a.index;e.xp6(2),e.Oqu(l.label),e.xp6(2),e.Q6J("formControlName",c)("placeholder",l.placeholder)("type",l.inputType),e.xp6(1),e.s9C("matTooltip",l.help)}}function N(i,o){if(1&i&&(e.TgZ(0,"mat-option",16),e._uU(1),e.qZA()),2&i){const a=o.$implicit;e.Q6J("value",a.value),e.xp6(1),e.hij(" ",a.viewValue," ")}}function S(i,o){if(1&i&&(e.TgZ(0,"div",10)(1,"mat-label"),e._uU(2),e.qZA(),e.TgZ(3,"mat-form-field",11)(4,"mat-select",14),e.YNc(5,N,2,2,"mat-option",15),e.qZA(),e._UZ(6,"mat-icon",13),e.qZA()()),2&i){const a=e.oxw(),l=a.$implicit,c=a.index;e.xp6(2),e.Oqu(l.label),e.xp6(2),e.Q6J("formControlName",c),e.xp6(1),e.Q6J("ngForOf",l.options),e.xp6(1),e.s9C("matTooltip",l.help)}}function I(i,o){if(1&i&&(e.TgZ(0,"div",17)(1,"mat-checkbox",14),e._uU(2),e.qZA(),e.TgZ(3,"div",18),e._UZ(4,"mat-icon",19),e.qZA()()),2&i){const a=e.oxw(),l=a.index,c=a.$implicit;e.xp6(1),e.Q6J("formControlName",l),e.xp6(1),e.Oqu(c.label),e.xp6(2),e.s9C("matTooltip",c.help)}}function u(i,o){if(1&i&&(e.ynx(0),e.YNc(1,R,6,5,"div",8),e.YNc(2,S,7,4,"div",8),e.YNc(3,I,5,3,"div",9),e.BQk()),2&i){const a=o.$implicit;e.xp6(1),e.Q6J("ngIf","text"===a.inputType||"number"===a.inputType),e.xp6(1),e.Q6J("ngIf","select"===a.inputType),e.xp6(1),e.Q6J("ngIf","checkbox"===a.inputType)}}function W(i,o){if(1&i&&(e.TgZ(0,"div",4),e.ynx(1,5),e.TgZ(2,"div",6),e.YNc(3,u,4,3,"ng-container",7),e.qZA(),e.BQk(),e.qZA()),2&i){const a=e.oxw();e.xp6(1),e.Q6J("formGroupName",a.controlKey),e.xp6(2),e.Q6J("ngForOf",a.parameters)}}function Z(i,o){1&i&&(e.TgZ(0,"p",20),e._uU(1,"No parameters configured."),e.qZA())}let P=((g=class{ngOnChanges(o){o.algorithm&&o.algorithm.currentValue&&(this.alg=o.algorithm.currentValue,this.loadParametersForAlgorithm(this.alg))}get parentFormGroup(){return this.controlContainer.control}get paramsFormGroup(){return this.parentFormGroup.get(this.controlKey)}get parametersFormArray(){return this.paramsFormGroup.get("parametersArray")}constructor(o,a,l,c){this.fb=o,this.controlContainer=a,this.parametersFacadeService=l,this.scriptFacadeService=c,this.controlKey="",this.RoutesList=U.Z,this.alg=D.k2,this.isScriptActive=!1,this.parameters=[]}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.parentFormGroup.addControl(this.controlKey,new s.cw({parametersArray:new s.Oe([])}))}loadParametersForAlgorithm(o){this.parametersFacadeService.dispatch(v.j.loadParameters({arg:o})),this.parametersFacadeService.parameters$.pipe((0,C.U)(a=>a[o]?.data||[]),(0,L.T)(1),(0,d.t)(this)).subscribe(a=>{this.buildFormArray(a)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,d.t)(this)).subscribe(o=>{this.isScriptActive=(0,K.A)(o)})}buildFormArray(o){this.parametersFormArray.clear(),o.forEach(a=>{this.parametersFormArray.push(this.fb.control(a.defaultValue))}),this.isScriptActive?this.paramsFormGroup.disable():this.paramsFormGroup.enable(),this.parameters=o}get parametersFormatted(){const o={},a=this.parametersFormArray.getRawValue();return this.parameters.forEach((l,c)=>{o[l.argName]=a[c]}),o}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}}).\u0275fac=function(o){return new(o||g)(e.Y36(s.qu),e.Y36(s.gN),e.Y36(B.E),e.Y36(A.O))},g.\u0275cmp=e.Xpm({type:g,selectors:[["ms-panel-parameters"]],inputs:{controlKey:"controlKey",algorithm:"algorithm"},standalone:!0,features:[e._Bn([],[{provide:s.gN,useFactory:()=>(0,e.f3M)(s.gN,{skipSelf:!0})}]),e.TTD,e.jDz],decls:6,vars:2,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],["class","parameters-wrapper",4,"ngIf","ngIfElse"],["noParametersTemplate",""],[1,"parameters-wrapper"],[3,"formGroupName"],["formArrayName","parametersArray"],[4,"ngFor","ngForOf"],["class","form-field-container",4,"ngIf"],["class","form-field-container inline-container mb-[22px]",4,"ngIf"],[1,"form-field-container"],["appearance","outline"],["matInput","",3,"formControlName","placeholder","type"],["fontSet","ms","fontIcon","icon-Info","matSuffix","",3,"matTooltip"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"form-field-container","inline-container","mb-[22px]"],[1,"ml-2"],["fontSet","ms","fontIcon","icon-Info",3,"matTooltip"],[1,"no-parameters-message"]],template:function(o,a){if(1&o&&(e.TgZ(0,"mat-card",0)(1,"p",1),e._uU(2,"Parameters"),e.qZA(),e.YNc(3,W,4,2,"div",2),e.YNc(4,Z,2,0,"ng-template",null,3,e.W1O),e.qZA()),2&o){const l=e.MAs(5);e.xp6(3),e.Q6J("ngIf",a.parameters.length)("ngIfElse",l)}},dependencies:[p.ez,p.sg,p.O5,T.c,T.Nt,M.KE,M.hX,M.R9,s.UX,s.Fj,s.JJ,s.JL,s.u,s.x0,s.CE,f.QW,f.a8,M.lN,h.LD,h.gD,F.ey,O.AV,O.gM,E.p9,E.oG],styles:[".parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]{max-height:400px;overflow:auto;padding-right:20px}.parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]   .parameter-divider[_ngcontent-%COMP%]{margin-bottom:20px}"]}),g);P=(0,y.gn)([(0,d.c)()],P)}}]);