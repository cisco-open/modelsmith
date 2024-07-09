"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[700],{4700:(U,E,a)=>{a.r(E),a.d(E,{ModelSpecializationModule:()=>F});var d,C=a(6814),h=a(4245),t=a(1668),m=a(1501),v=a(2655),T=a(7582),u=a(8791),A=a(39),f=a(7820),M=a(127),e=a(5879),g=a(6223),O=a(9532),x=a(2296);const y=["panelParameters"];let P=((d=class{constructor(n,l){this.fb=n,this.scriptFacadeService=l,this.AlgorithmType=f.Bd,this.MultiflowAlgorithmsEnum=f.u1,this.isScriptActive=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.form=this.fb.group({algorithm:this.fb.group({alg:[]})}),setTimeout(()=>{this.form.get("algorithm.alg")?.setValue(f.u1.MULTIFLOW_PRUNE)},0)}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,u.t)(this)).subscribe(n=>{this.isScriptActive=(0,M.A)(n),(0,M.A)(n)?this.form.disable():this.form.enable()})}submit(){if(this.isScriptActive)return;const{algorithm:n}=this.form.getRawValue(),l={...n,params:{...this.panelParametersComponent.parametersFormatted}};this.scriptFacadeService.dispatch(A.aj.callScript({configs:l}))}}).\u0275fac=function(n){return new(n||d)(e.Y36(g.qu),e.Y36(O.OF))},d.\u0275cmp=e.Xpm({type:d,selectors:[["ms-model-specialization"]],viewQuery:function(n,l){if(1&n&&e.Gf(y,5),2&n){let _;e.iGM(_=e.CRH())&&(l.panelParametersComponent=_.first)}},decls:12,vars:4,consts:[[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","params",3,"algorithm"],["panelParameters",""],["mat-raised-button","","color","primary",3,"disabled","click"],[1,"right"]],template:function(n,l){1&n&&(e.TgZ(0,"p",0),e._uU(1,"Model Specialization"),e.qZA(),e.TgZ(2,"div",1)(3,"div",2),e.ynx(4,3),e._UZ(5,"ms-panel-parameters",4,5),e.BQk(),e.TgZ(7,"div")(8,"button",6),e.NdJ("click",function(){return l.submit()}),e._uU(9," Run "),e.qZA()()(),e.TgZ(10,"div",7),e._UZ(11,"ms-terminal"),e.qZA()()),2&n&&(e.xp6(2),e.Q6J("formGroup",l.form),e.xp6(2),e.Q6J("formGroup",l.form),e.xp6(1),e.Q6J("algorithm",l.MultiflowAlgorithmsEnum.MULTIFLOW_PRUNE),e.xp6(3),e.Q6J("disabled",l.isScriptActive||l.form.invalid))},dependencies:[x.lW,g.JL,g.sg,t.w,m.d],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),d);P=(0,T.gn)([(0,u.c)()],P);const D=[{path:"",component:P}];let S=(()=>{var s;class n{}return(s=n).\u0275fac=function(_){return new(_||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[v.Bz.forChild(D),v.Bz]}),n})(),F=(()=>{var s;class n{}return(s=n).\u0275fac=function(_){return new(_||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[C.ez,h.m,t.w,m.d,S]}),n})()},1668:(U,E,a)=>{a.d(E,{w:()=>I});var n,C=a(7582),h=a(6814),t=a(5879),m=a(6223),v=a(5195),T=a(5986),u=a(5683),A=a(617),f=a(2032),M=a(8525),e=a(2596),g=a(8791),O=a(7398),x=a(836),d=a(3946),y=a(9547),P=a(8279),D=a(127),S=a(3221),F=a(8471),s=a(3680);function l(i,o){if(1&i&&(t.TgZ(0,"div",10)(1,"mat-label"),t._uU(2),t.qZA(),t.TgZ(3,"mat-form-field",11),t._UZ(4,"input",12)(5,"mat-icon",13),t.qZA()()),2&i){const r=t.oxw(),p=r.$implicit,c=r.index;t.xp6(2),t.Oqu(p.label),t.xp6(2),t.Q6J("formControlName",c)("placeholder",p.placeholder)("type",p.inputType),t.xp6(1),t.s9C("matTooltip",p.help)}}function _(i,o){if(1&i&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&i){const r=o.$implicit;t.Q6J("value",r.value),t.xp6(1),t.hij(" ",r.viewValue," ")}}function Z(i,o){if(1&i&&(t.TgZ(0,"div",10)(1,"mat-label"),t._uU(2),t.qZA(),t.TgZ(3,"mat-form-field",11)(4,"mat-select",14),t.YNc(5,_,2,2,"mat-option",15),t.qZA(),t._UZ(6,"mat-icon",13),t.qZA()()),2&i){const r=t.oxw(),p=r.$implicit,c=r.index;t.xp6(2),t.Oqu(p.label),t.xp6(2),t.Q6J("formControlName",c),t.xp6(1),t.Q6J("ngForOf",p.options),t.xp6(1),t.s9C("matTooltip",p.help)}}function R(i,o){if(1&i&&(t.TgZ(0,"div",17)(1,"mat-checkbox",14),t._uU(2),t.qZA(),t.TgZ(3,"div",18),t._UZ(4,"mat-icon",19),t.qZA()()),2&i){const r=t.oxw(),p=r.index,c=r.$implicit;t.xp6(1),t.Q6J("formControlName",p),t.xp6(1),t.Oqu(c.label),t.xp6(2),t.s9C("matTooltip",c.help)}}function L(i,o){if(1&i&&(t.ynx(0),t.YNc(1,l,6,5,"div",8),t.YNc(2,Z,7,4,"div",8),t.YNc(3,R,5,3,"div",9),t.BQk()),2&i){const r=o.$implicit;t.xp6(1),t.Q6J("ngIf","text"===r.inputType||"number"===r.inputType),t.xp6(1),t.Q6J("ngIf","select"===r.inputType),t.xp6(1),t.Q6J("ngIf","checkbox"===r.inputType)}}function B(i,o){if(1&i&&(t.TgZ(0,"div",4),t.ynx(1,5),t.TgZ(2,"div",6),t.YNc(3,L,4,3,"ng-container",7),t.qZA(),t.BQk(),t.qZA()),2&i){const r=t.oxw();t.xp6(1),t.Q6J("formGroupName",r.controlKey),t.xp6(2),t.Q6J("ngForOf",r.parameters)}}function K(i,o){1&i&&(t.TgZ(0,"p",20),t._uU(1,"No parameters configured."),t.qZA())}let I=((n=class{ngOnChanges(o){o.algorithm&&o.algorithm.currentValue&&(this.alg=o.algorithm.currentValue,this.loadParametersForAlgorithm(this.alg))}get parentFormGroup(){return this.controlContainer.control}get paramsFormGroup(){return this.parentFormGroup.get(this.controlKey)}get parametersFormArray(){return this.paramsFormGroup.get("parametersArray")}constructor(o,r,p,c){this.fb=o,this.controlContainer=r,this.parametersFacadeService=p,this.scriptFacadeService=c,this.controlKey="",this.RoutesList=y.Z,this.alg=P.k2,this.isScriptActive=!1,this.parameters=[]}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.parentFormGroup.addControl(this.controlKey,new m.cw({parametersArray:new m.Oe([])}))}loadParametersForAlgorithm(o){this.parametersFacadeService.dispatch(d.j.loadParameters({arg:o})),this.parametersFacadeService.parameters$.pipe((0,O.U)(r=>r[o]?.data||[]),(0,x.T)(1),(0,g.t)(this)).subscribe(r=>{this.buildFormArray(r)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,g.t)(this)).subscribe(o=>{this.isScriptActive=(0,D.A)(o)})}buildFormArray(o){this.parametersFormArray.clear(),o.forEach(r=>{this.parametersFormArray.push(this.fb.control(r.defaultValue))}),this.isScriptActive?this.paramsFormGroup.disable():this.paramsFormGroup.enable(),this.parameters=o}get parametersFormatted(){const o={},r=this.parametersFormArray.getRawValue();return this.parameters.forEach((p,c)=>{o[p.argName]=r[c]}),o}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}}).\u0275fac=function(o){return new(o||n)(t.Y36(m.qu),t.Y36(m.gN),t.Y36(S.E),t.Y36(F.O))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ms-panel-parameters"]],inputs:{controlKey:"controlKey",algorithm:"algorithm"},standalone:!0,features:[t._Bn([],[{provide:m.gN,useFactory:()=>(0,t.f3M)(m.gN,{skipSelf:!0})}]),t.TTD,t.jDz],decls:6,vars:2,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],["class","parameters-wrapper",4,"ngIf","ngIfElse"],["noParametersTemplate",""],[1,"parameters-wrapper"],[3,"formGroupName"],["formArrayName","parametersArray"],[4,"ngFor","ngForOf"],["class","form-field-container",4,"ngIf"],["class","form-field-container inline-container mb-[22px]",4,"ngIf"],[1,"form-field-container"],["appearance","outline"],["matInput","",3,"formControlName","placeholder","type"],["fontSet","ms","fontIcon","icon-Info","matSuffix","",3,"matTooltip"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"form-field-container","inline-container","mb-[22px]"],[1,"ml-2"],["fontSet","ms","fontIcon","icon-Info",3,"matTooltip"],[1,"no-parameters-message"]],template:function(o,r){if(1&o&&(t.TgZ(0,"mat-card",0)(1,"p",1),t._uU(2,"Parameters"),t.qZA(),t.YNc(3,B,4,2,"div",2),t.YNc(4,K,2,0,"ng-template",null,3,t.W1O),t.qZA()),2&o){const p=t.MAs(5);t.xp6(3),t.Q6J("ngIf",r.parameters.length)("ngIfElse",p)}},dependencies:[h.ez,h.sg,h.O5,f.c,f.Nt,u.KE,u.hX,u.R9,m.UX,m.Fj,m.JJ,m.JL,m.u,m.x0,m.CE,v.QW,v.a8,u.lN,M.LD,M.gD,s.ey,e.AV,e.gM,T.p9,T.oG,A.Ps,A.Hw],styles:[".parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]{max-height:400px;overflow:auto;padding-right:20px}.parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]   .parameter-divider[_ngcontent-%COMP%]{margin-bottom:20px}"]}),n);I=(0,C.gn)([(0,g.c)()],I)}}]);