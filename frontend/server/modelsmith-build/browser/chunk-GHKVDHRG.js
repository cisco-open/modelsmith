import{a as Ie}from"./chunk-AQXO3PTH.js";import{a as ye,b as Fe}from"./chunk-TAQAVLZV.js";import{a as he,b as _e}from"./chunk-36MMDLJ6.js";import{d as ge}from"./chunk-5WVTRWNO.js";import{a as ve,b as Ce}from"./chunk-OCTHNKRP.js";import{b as ae}from"./chunk-C4NPICWQ.js";import{a as ne,b as me,c as pe,d as se,e as le,f as ce,g as de,h as ue,i as fe}from"./chunk-ZTF7MLCF.js";import{a as re,b as ie}from"./chunk-TGB2NBUR.js";import{b as oe,l as xe}from"./chunk-K6MLUSZ7.js";import{a as Y,d as z,h as J,i as Q,j as ee,k as te}from"./chunk-3DEWYFT2.js";import{$a as N,$c as L,Aa as c,Ec as S,La as F,N as A,Na as d,Qd as O,Ta as u,Ua as x,Va as g,Wa as I,Xa as m,Xd as G,Ya as n,Za as _,Zd as p,_ as T,_a as D,_d as h,ae as $,be as w,ca as b,ce as j,gb as f,ja as E,jb as v,ke as K,le as q,me as B,ne as U,oe as H,pb as l,qb as C,qe as X,rb as k,sa as P,v as M,wb as R,we as W,xb as V,xe as Z,za as o}from"./chunk-ED6LLMLR.js";var Se=r=>{let t=[];if(r.validators)for(let[i,e]of Object.entries(r.validators))switch(i){case"required":e&&t.push(p.required);break;case"min":t.push(p.min(e));break;case"max":t.push(p.max(e));break;case"minLength":t.push(p.minLength(e));break;case"maxLength":t.push(p.maxLength(e));break;case"pattern":t.push(p.pattern(e));break;case"requiredTrue":e&&t.push(p.requiredTrue);break;case"email":e&&t.push(p.email);break;case le:t.push(ce(e));break;case de:t.push(ue());break;case ne:t.push(me());break;case pe:Array.isArray(e)&&e.length===2&&t.push(se(e));break}return t};function Ae(r,t){if(r&1&&(m(0,"div",6)(1,"mat-label"),l(2),n(),m(3,"mat-form-field",8),_(4,"input",9)(5,"mat-icon",10),n()()),r&2){let i=f(),e=i.$implicit,a=i.$index;o(2),C(e.label),o(2),d("formControlName",a)("placeholder",e.placeholder)("type",e.inputType)("step",e.inputArrowsStepRate||1),o(),v("matTooltip",e.help)}}function Te(r,t){if(r&1&&(m(0,"mat-option",12),l(1),n()),r&2){let i=t.$implicit;d("value",i.value),o(),k(" ",i.viewValue," ")}}function be(r,t){if(r&1&&(m(0,"div",6)(1,"mat-label"),l(2),n(),m(3,"mat-form-field",8)(4,"mat-select",11),g(5,Te,2,2,"mat-option",12,x),n(),_(7,"mat-icon",10),n()()),r&2){let i=f(),e=i.$implicit,a=i.$index;o(2),C(e.label),o(2),d("formControlName",a),o(),I(e.options),o(2),v("matTooltip",e.help)}}function Ee(r,t){if(r&1&&(m(0,"div",7)(1,"mat-checkbox",13),l(2),n(),m(3,"div",14),_(4,"mat-icon",15),n()()),r&2){let i=f(),e=i.$implicit,a=i.$index;o(),d("formControlName",a),o(),C(e.label),o(2),v("matTooltip",e.help)}}function Pe(r,t){if(r&1&&F(0,Ae,6,6,"div",6)(1,be,8,3,"div",6)(2,Ee,5,3,"div",7),r&2){let i=t.$implicit;u(i.inputType==="text"||i.inputType==="number"?0:-1),o(),u(i.inputType==="select"?1:-1),o(),u(i.inputType==="checkbox"?2:-1)}}function De(r,t){if(r&1&&(m(0,"div",2),D(1,4),m(2,"div",5),g(3,Pe,3,3,null,null,x),n(),N(),n()),r&2){let i=f();o(),d("formGroupName",i.controlKey),o(2),I(i.parameters)}}function Ne(r,t){r&1&&(m(0,"p",3),l(1,"No parameters configured."),n())}var _t=(()=>{let t=class t{ngOnChanges(e){e.algorithm&&e.algorithm.currentValue&&(this.alg=e.algorithm.currentValue,this.loadParametersForAlgorithm(this.alg))}get parentFormGroup(){return this.controlContainer.control}get paramsFormGroup(){return this.parentFormGroup.get(this.controlKey)}get parametersFormArray(){return this.paramsFormGroup.get("parametersArray")}constructor(e,a,s,y,Me){this.destroyRef=e,this.fb=a,this.controlContainer=s,this.parametersFacadeService=y,this.scriptFacadeService=Me,this.controlKey="",this.RoutesList=L,this.alg=ge,this.isScriptActive=!1,this.parameters=[]}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.parentFormGroup.addControl(this.controlKey,new j({parametersArray:new U([])}))}loadParametersForAlgorithm(e){this.parametersFacadeService.dispatch(Ie.loadParameters({arg:e})),this.parametersFacadeService.parameters$.pipe(M(a=>a[e]?.data||[]),A(1),S(this.destroyRef)).subscribe(a=>{this.buildFormArray(a)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(S(this.destroyRef)).subscribe(e=>{this.isScriptActive=ae(e)})}buildFormArray(e){this.parametersFormArray.clear(),e.forEach(a=>{let s=this.fb.control(a.defaultValue,Se(a));this.parametersFormArray.push(s)}),this.isScriptActive?this.paramsFormGroup.disable():this.paramsFormGroup.enable(),this.parameters=e}get parametersFormatted(){let e={},a=this.parametersFormArray.getRawValue();return this.parameters.forEach((s,y)=>{e[s.argName]=a[y]}),e}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}};t.\u0275fac=function(a){return new(a||t)(c(P),c(H),c(h),c(xe),c(oe))},t.\u0275cmp=b({type:t,selectors:[["ms-panel-parameters"]],inputs:{controlKey:"controlKey",algorithm:"algorithm"},standalone:!0,features:[R([],[{provide:h,useFactory:()=>T(h,{skipSelf:!0})}]),E,V],decls:5,vars:1,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],[1,"parameters-wrapper"],[1,"no-parameters-message"],[3,"formGroupName"],["formArrayName","parametersArray"],[1,"form-field-container"],[1,"form-field-container","inline-container","mb-[22px]"],["appearance","outline"],["matInput","","msErrorDisplay","",3,"formControlName","placeholder","type","step"],["fontSet","ms","fontIcon","icon-Info","matSuffix","",3,"matTooltip"],["msErrorDisplay","",3,"formControlName"],[3,"value"],[3,"formControlName"],[1,"ml-2"],["fontSet","ms","fontIcon","icon-Info",3,"matTooltip"]],template:function(a,s){a&1&&(m(0,"mat-card",0)(1,"p",1),l(2,"Parameters"),n(),F(3,De,5,1,"div",2)(4,Ne,2,0,"p",3),n()),a&2&&(o(3),u(s.parameters.length?3:4))},dependencies:[te,ee,J,Y,z,X,G,$,w,B,K,q,Ce,ve,Q,Fe,ye,O,ie,re,_e,he,Z,W,fe],styles:[".parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]{max-height:400px;overflow:auto;padding-right:20px}.parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]   .parameter-divider[_ngcontent-%COMP%]{margin-bottom:20px}"]});let r=t;return r})();export{_t as a};
