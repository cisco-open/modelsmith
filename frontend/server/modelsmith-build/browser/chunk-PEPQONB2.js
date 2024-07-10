import{a as ue}from"./chunk-MM4TEEVS.js";import{d as fe}from"./chunk-4KDFY6RG.js";import{j as de}from"./chunk-VMZY47C3.js";import{$a as N,$c as Z,$d as pe,Aa as C,Bc as q,Ea as f,G as M,Ha as _,Hc as z,Ic as J,Ma as T,Md as ie,Na as s,Oa as g,Pa as b,Qd as ae,Rd as oe,S,T as I,Ta as E,Ua as A,Wc as Q,Y as P,Yc as W,Zc as X,Zd as ne,_b as D,_c as Y,_d as me,ad as ee,ae as le,ec as K,fb as O,gb as G,he as se,ie as ce,ja as i,jc as $,ka as c,lc as u,m as y,nc as k,oc as L,pb as w,pc as R,qa as d,rd as te,s as x,sa as n,sd as F,vc as V,wa as m,wc as j,wd as re,xa as o,xc as U,ya as v,yc as B,za as h,zc as H}from"./chunk-XZNUB5IR.js";function _e(r,t){if(r&1&&(m(0,"div",10)(1,"mat-label"),s(2),o(),m(3,"mat-form-field",11),v(4,"input",12)(5,"mat-icon",13),o()()),r&2){let e=f(),a=e.$implicit,p=e.index;i(2),g(a.label),i(2),n("formControlName",p)("placeholder",a.placeholder)("type",a.inputType),i(),_("matTooltip",a.help)}}function ge(r,t){if(r&1&&(m(0,"mat-option",16),s(1),o()),r&2){let e=t.$implicit;n("value",e.value),i(),b(" ",e.viewValue," ")}}function he(r,t){if(r&1&&(m(0,"div",10)(1,"mat-label"),s(2),o(),m(3,"mat-form-field",11)(4,"mat-select",14),d(5,ge,2,2,"mat-option",15),o(),v(6,"mat-icon",13),o()()),r&2){let e=f(),a=e.$implicit,p=e.index;i(2),g(a.label),i(2),n("formControlName",p),i(),n("ngForOf",a.options),i(),_("matTooltip",a.help)}}function Ce(r,t){if(r&1&&(m(0,"div",17)(1,"mat-checkbox",14),s(2),o(),m(3,"div",18),v(4,"mat-icon",19),o()()),r&2){let e=f(),a=e.$implicit,p=e.index;i(),n("formControlName",p),i(),g(a.label),i(2),_("matTooltip",a.help)}}function Fe(r,t){if(r&1&&(h(0),d(1,_e,6,5,"div",8)(2,he,7,4,"div",8)(3,Ce,5,3,"div",9),C()),r&2){let e=t.$implicit;i(),n("ngIf",e.inputType==="text"||e.inputType==="number"),i(),n("ngIf",e.inputType==="select"),i(),n("ngIf",e.inputType==="checkbox")}}function ye(r,t){if(r&1&&(m(0,"div",4),h(1,5),m(2,"div",6),d(3,Fe,4,3,"ng-container",7),o(),C(),o()),r&2){let e=f();i(),n("formGroupName",e.controlKey),i(2),n("ngForOf",e.parameters)}}function xe(r,t){r&1&&(m(0,"p",20),s(1,"No parameters configured."),o())}var l,ve=(l=class{ngOnChanges(t){t.algorithm&&t.algorithm.currentValue&&(this.alg=t.algorithm.currentValue,this.loadParametersForAlgorithm(this.alg))}get parentFormGroup(){return this.controlContainer.control}get paramsFormGroup(){return this.parentFormGroup.get(this.controlKey)}get parametersFormArray(){return this.paramsFormGroup.get("parametersArray")}constructor(t,e,a,p){this.fb=t,this.controlContainer=e,this.parametersFacadeService=a,this.scriptFacadeService=p,this.controlKey="",this.RoutesList=D,this.alg=fe,this.isScriptActive=!1,this.parameters=[]}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.parentFormGroup.addControl(this.controlKey,new R({parametersArray:new B([])}))}loadParametersForAlgorithm(t){this.parametersFacadeService.dispatch(ue.loadParameters({arg:t})),this.parametersFacadeService.parameters$.pipe(x(e=>e[t]?.data||[]),M(1),F(this)).subscribe(e=>{this.buildFormArray(e)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(F(this)).subscribe(t=>{this.isScriptActive=re(t)})}buildFormArray(t){this.parametersFormArray.clear(),t.forEach(e=>{this.parametersFormArray.push(this.fb.control(e.defaultValue))}),this.isScriptActive?this.paramsFormGroup.disable():this.paramsFormGroup.enable(),this.parameters=t}get parametersFormatted(){let t={},e=this.parametersFormArray.getRawValue();return this.parameters.forEach((a,p)=>{t[a.argName]=e[p]}),t}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},l.\u0275fac=function(e){return new(e||l)(c(H),c(u),c(de),c(ie))},l.\u0275cmp=I({type:l,selectors:[["ms-panel-parameters"]],inputs:{controlKey:"controlKey",algorithm:"algorithm"},standalone:!0,features:[E([],[{provide:u,useFactory:()=>S(u,{skipSelf:!0})}]),P,A],decls:6,vars:2,consts:[["noParametersTemplate",""],[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],["class","parameters-wrapper",4,"ngIf","ngIfElse"],[1,"parameters-wrapper"],[3,"formGroupName"],["formArrayName","parametersArray"],[4,"ngFor","ngForOf"],["class","form-field-container",4,"ngIf"],["class","form-field-container inline-container mb-[22px]",4,"ngIf"],[1,"form-field-container"],["appearance","outline"],["matInput","",3,"formControlName","placeholder","type"],["fontSet","ms","fontIcon","icon-Info","matSuffix","",3,"matTooltip"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"form-field-container","inline-container","mb-[22px]"],[1,"ml-2"],["fontSet","ms","fontIcon","icon-Info",3,"matTooltip"],[1,"no-parameters-message"]],template:function(e,a){if(e&1&&(m(0,"mat-card",1)(1,"p",2),s(2,"Parameters"),o(),d(3,ye,4,2,"div",3)(4,xe,2,0,"ng-template",null,0,N),o()),e&2){let p=T(5);i(3),n("ngIf",a.parameters.length)("ngIfElse",p)}},dependencies:[w,O,G,ee,Z,X,Q,W,q,$,k,L,U,V,j,me,ne,Y,ce,se,K,oe,ae,le,pe,J,z],styles:[".parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]{max-height:400px;overflow:auto;padding-right:20px}.parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]   .parameter-divider[_ngcontent-%COMP%]{margin-bottom:20px}"]}),l);ve=y([te()],ve);export{ve as a};
