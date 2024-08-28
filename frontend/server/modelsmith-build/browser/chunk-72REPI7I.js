import{a as Me}from"./chunk-VLJTKNYA.js";import{a as ye,b as Fe}from"./chunk-PFRJUVJF.js";import{a as ne,b as me,c as pe,d as se,e as le,f as ce,g as de,h as ue,i as fe}from"./chunk-HZQJXS7Z.js";import{a as he,b as _e}from"./chunk-JMFIGVCB.js";import{a as ee,b as te}from"./chunk-SKF36LYU.js";import{d as ge}from"./chunk-ZNWO7R4M.js";import{b as ae}from"./chunk-LRK34XDC.js";import{a as re,b as ie}from"./chunk-QVMVB2QY.js";import{a as Ce,b as ve}from"./chunk-YPMBMI5J.js";import{b as oe,l as xe}from"./chunk-QTJZRTNN.js";import{a as L,b as M}from"./chunk-6VRVKV6C.js";import{a as Y,d as z,h as J,i as Q}from"./chunk-7IF2CO5G.js";import{$a as g,$d as h,Ab as k,Bb as V,Ea as a,Fa as d,Q as A,Qa as y,Rd as R,Sa as c,Ya as u,Yd as G,Za as F,_a as x,_d as p,ab as n,ad as O,bb as o,be as $,cb as _,ce as w,da as T,db as P,de as K,eb as D,ha as b,ke as j,lb as f,le as q,me as B,ne as U,oa as E,ob as C,oe as H,p as S,qe as X,ub as l,vb as v,wb as N,we as W,x as I,xe as Z}from"./chunk-64NP6AY6.js";var Se=i=>{let e=[];if(i.validators)for(let[t,r]of Object.entries(i.validators))switch(t){case"required":r&&e.push(p.required);break;case"min":e.push(p.min(r));break;case"max":e.push(p.max(r));break;case"minLength":e.push(p.minLength(r));break;case"maxLength":e.push(p.maxLength(r));break;case"pattern":e.push(p.pattern(r));break;case"requiredTrue":r&&e.push(p.requiredTrue);break;case"email":r&&e.push(p.email);break;case le:e.push(ce(r));break;case de:e.push(ue());break;case ne:e.push(me());break;case pe:Array.isArray(r)&&r.length===2&&e.push(se(r));break}return e};function Ae(i,e){if(i&1&&(n(0,"div",6)(1,"mat-label"),l(2),o(),n(3,"mat-form-field",8),_(4,"input",9)(5,"mat-icon",10),o()()),i&2){let t=f(),r=t.$implicit,m=t.$index;a(2),v(r.label),a(2),c("formControlName",m)("placeholder",r.placeholder)("type",r.inputType)("step",r.inputArrowsStepRate||1),a(),C("matTooltip",r.help)}}function Te(i,e){if(i&1&&(n(0,"mat-option",12),l(1),o()),i&2){let t=e.$implicit;c("value",t.value),a(),N(" ",t.viewValue," ")}}function be(i,e){if(i&1&&(n(0,"div",6)(1,"mat-label"),l(2),o(),n(3,"mat-form-field",8)(4,"mat-select",11),x(5,Te,2,2,"mat-option",12,F),o(),_(7,"mat-icon",10),o()()),i&2){let t=f(),r=t.$implicit,m=t.$index;a(2),v(r.label),a(2),c("formControlName",m),a(),g(r.options),a(2),C("matTooltip",r.help)}}function Ee(i,e){if(i&1&&(n(0,"div",7)(1,"mat-checkbox",13),l(2),o(),n(3,"div",14),_(4,"mat-icon",15),o()()),i&2){let t=f(),r=t.$implicit,m=t.$index;a(),c("formControlName",m),a(),v(r.label),a(2),C("matTooltip",r.help)}}function Pe(i,e){if(i&1&&y(0,Ae,6,6,"div",6)(1,be,8,3,"div",6)(2,Ee,5,3,"div",7),i&2){let t=e.$implicit;u(t.inputType==="text"||t.inputType==="number"?0:-1),a(),u(t.inputType==="select"?1:-1),a(),u(t.inputType==="checkbox"?2:-1)}}function De(i,e){if(i&1&&(n(0,"div",2),P(1,4),n(2,"div",5),x(3,Pe,3,3,null,null,F),o(),D(),o()),i&2){let t=f();a(),c("formGroupName",t.controlKey),a(2),g(t.parameters)}}function Ne(i,e){i&1&&(n(0,"p",3),l(1,"No parameters configured."),o())}var s,Ie=(s=class{ngOnChanges(e){e.algorithm&&e.algorithm.currentValue&&(this.alg=e.algorithm.currentValue,this.loadParametersForAlgorithm(this.alg))}get parentFormGroup(){return this.controlContainer.control}get paramsFormGroup(){return this.parentFormGroup.get(this.controlKey)}get parametersFormArray(){return this.paramsFormGroup.get("parametersArray")}constructor(e,t,r,m){this.fb=e,this.controlContainer=t,this.parametersFacadeService=r,this.scriptFacadeService=m,this.controlKey="",this.RoutesList=O,this.alg=ge,this.isScriptActive=!1,this.parameters=[]}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}initForm(){this.parentFormGroup.addControl(this.controlKey,new K({parametersArray:new U([])}))}loadParametersForAlgorithm(e){this.parametersFacadeService.dispatch(Me.loadParameters({arg:e})),this.parametersFacadeService.parameters$.pipe(I(t=>t[e]?.data||[]),A(1),M(this)).subscribe(t=>{this.buildFormArray(t)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(M(this)).subscribe(e=>{this.isScriptActive=ae(e)})}buildFormArray(e){this.parametersFormArray.clear(),e.forEach(t=>{let r=this.fb.control(t.defaultValue,Se(t));this.parametersFormArray.push(r)}),this.isScriptActive?this.paramsFormGroup.disable():this.paramsFormGroup.enable(),this.parameters=e}get parametersFormatted(){let e={},t=this.parametersFormArray.getRawValue();return this.parameters.forEach((r,m)=>{e[r.argName]=t[m]}),e}ngOnDestroy(){this.parentFormGroup.removeControl(this.controlKey)}},s.\u0275fac=function(t){return new(t||s)(d(H),d(h),d(xe),d(oe))},s.\u0275cmp=b({type:s,selectors:[["ms-panel-parameters"]],inputs:{controlKey:"controlKey",algorithm:"algorithm"},standalone:!0,features:[k([],[{provide:h,useFactory:()=>T(h,{skipSelf:!0})}]),E,V],decls:5,vars:1,consts:[[1,"ms-card","parameters-card"],[1,"heading-sub-section-title"],[1,"parameters-wrapper"],[1,"no-parameters-message"],[3,"formGroupName"],["formArrayName","parametersArray"],[1,"form-field-container"],[1,"form-field-container","inline-container","mb-[22px]"],["appearance","outline"],["matInput","","msErrorDisplay","",3,"formControlName","placeholder","type","step"],["fontSet","ms","fontIcon","icon-Info","matSuffix","",3,"matTooltip"],["msErrorDisplay","",3,"formControlName"],[3,"value"],[3,"formControlName"],[1,"ml-2"],["fontSet","ms","fontIcon","icon-Info",3,"matTooltip"]],template:function(t,r){t&1&&(n(0,"mat-card",0)(1,"p",1),l(2,"Parameters"),o(),y(3,De,5,1,"div",2)(4,Ne,2,0,"p",3),o()),t&2&&(a(3),u(r.parameters.length?3:4))},dependencies:[te,ee,J,Y,z,X,G,$,w,B,j,q,ve,Ce,Q,Fe,ye,R,ie,re,_e,he,Z,W,fe],styles:[".parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]{max-height:400px;overflow:auto;padding-right:20px}.parameters-card[_ngcontent-%COMP%]   .parameters-wrapper[_ngcontent-%COMP%]   .parameter-divider[_ngcontent-%COMP%]{margin-bottom:20px}"]}),s);Ie=S([L()],Ie);export{Ie as a};
