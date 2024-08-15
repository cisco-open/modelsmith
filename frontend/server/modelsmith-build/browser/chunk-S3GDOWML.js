import{a as Q}from"./chunk-ZVHBBLTC.js";import{a as u}from"./chunk-WFSFFOPD.js";import{a as Y}from"./chunk-QQYONSIQ.js";import{a as q,b as X}from"./chunk-LZY4CHNS.js";import"./chunk-N4RWJ5LF.js";import{a as x}from"./chunk-J6PH3BGD.js";import{a as V,h as k,i as W}from"./chunk-D3S6HEU5.js";import{$ as d,Ea as c,Fa as m,Fe as K,Ja as _,Na as b,Sa as g,Yd as L,_b as N,_d as C,ab as o,ad as y,bb as r,be as A,cb as p,ce as F,ha as w,he as z,ia as h,ja as S,jb as E,je as R,me as D,oe as T,p as I,pc as O,pe as j,qe as H,re as G,ub as s,ue as U,we as B,xa as P,ye as J}from"./chunk-VYHIF4FK.js";var Z=(()=>{let t=class t{constructor(e,i,f){this.el=e,this.renderer=i,this.viewContainer=f,this.isHidden=!0}ngOnInit(){let e=this.el.nativeElement,i=this.createIcon();this.setupIconInContainer(e,i),i.location.nativeElement.addEventListener("click",()=>{this.toggleVisibility(e,i.instance)})}createIcon(){let e=this.viewContainer.createComponent(B);return e.instance.fontIcon=this.isHidden?"visibility_off":"visibility",e}setupIconInContainer(e,i){let f=this.renderer.createElement("div");this.renderer.addClass(f,t.CLASS_ICON_SUFFIX),this.renderer.setStyle(i.location.nativeElement,"padding","0"),this.renderer.setAttribute(e,"type",this.isHidden?"password":"text"),this.renderer.appendChild(f,i.location.nativeElement),this.renderer.appendChild(e?.parentElement?.parentElement,f)}toggleVisibility(e,i){this.isHidden=!this.isHidden,this.renderer.setAttribute(e,"type",this.isHidden?"password":"text"),i.fontIcon=this.isHidden?"visibility_off":"visibility"}};t.CLASS_ICON_SUFFIX="mat-mdc-form-field-icon-suffix",t.\u0275fac=function(i){return new(i||t)(m(P),m(_),m(b))},t.\u0275dir=S({type:t,selectors:[["","msPasswordToggle",""]],standalone:!0});let n=t;return n})();var a,M=(a=class{constructor(t,l){this.fb=t,this.authFacadeService=l,this.CONTROL_NAMES={EMAIL:"email",PASSWORD:"password"}}ngOnInit(){this.initForm()}initForm(){this.form=this.fb.group({[this.CONTROL_NAMES.EMAIL]:["alexander@cisco.com",[C.email,C.required]],[this.CONTROL_NAMES.PASSWORD]:["GUfCRHz7VD9R",[C.required]]})}get emailControl(){return this.form.get(this.CONTROL_NAMES.EMAIL)}get passwordControl(){return this.form.get(this.CONTROL_NAMES.PASSWORD)}login(){let t=this.form.getRawValue();this.authFacadeService.dispatch(J.login(t))}},a.\u0275fac=function(l){return new(l||a)(m(T),m(K))},a.\u0275cmp=w({type:a,selectors:[["ms-login"]],decls:24,vars:4,consts:[[1,"login-container"],[1,"logo-section"],["src","/assets/logo/login-logo.svg","alt","ModelSmith Logo"],[1,"login-title"],[1,"login-subtitle"],[1,"login-section"],[3,"submit","formGroup"],[1,"form-field-container","ms-white-form-field"],["matInput","","msErrorDisplay","","autocomplete","current-password",3,"formControlName"],["msPasswordToggle","","msErrorDisplay","","matInput","","autocomplete","current-password",3,"formControlName"],[1,"mt-[2px]"],["type","submit","mat-raised-button","","color","primary",1,"w-full",3,"disabled"],["styleMode","fullWidth"]],template:function(l,e){l&1&&(o(0,"ms-background-gradient")(1,"div",0)(2,"div",1),p(3,"img",2),o(4,"div",3),s(5,"ModelSmith"),r(),o(6,"div",4),s(7,"A super cool compression tool"),r()(),o(8,"div",5)(9,"form",6),E("submit",function(){return e.login()}),o(10,"div",7)(11,"mat-label"),s(12," Email "),r(),o(13,"mat-form-field"),p(14,"input",8),r()(),o(15,"div",7)(16,"mat-label"),s(17," Password "),r(),o(18,"mat-form-field"),p(19,"input",9),r()(),o(20,"div",10)(21,"button",11),s(22," Login "),r()()()()(),p(23,"ms-footer",12),r()),l&2&&(c(9),g("formGroup",e.form),c(5),g("formControlName",e.CONTROL_NAMES.EMAIL),c(5),g("formControlName",e.CONTROL_NAMES.PASSWORD),c(2),g("disabled",e.form.invalid))},dependencies:[z,L,A,F,R,D,k,V,q,Z,Q,u,G,Y],styles:["html[_ngcontent-%COMP%]{color:var(--foregrounds-800)}.text-hint[_ngcontent-%COMP%]{color:var(--foregrounds-700)}.heading-primary-title[_ngcontent-%COMP%]{font-family:Montserrat;font-weight:700;font-size:1.5rem;line-height:2.125rem}.heading-section-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.125rem;line-height:1.5em}.paragraph-bold-p4-small-bold[_ngcontent-%COMP%]{font-family:Inter;font-weight:700;font-size:.75rem;line-height:1.125em}.paragraph-monospace-p2-large[_ngcontent-%COMP%]{font-size:1rem;line-height:1.375rem;font-weight:400}.heading-sub-section-title[_ngcontent-%COMP%]{font-size:1rem;line-height:1.375rem;font-weight:700}.paragraph-regular-p3-small[_ngcontent-%COMP%]{font-family:Inter;font-weight:400;font-size:.875;line-height:1.25rem}.paragraph-bold-p3-small-bold[_ngcontent-%COMP%]{font-family:Inter;font-weight:700;font-size:.875rem;line-height:1.25rem}.paragraph-semibold-p2-large-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:1rem;line-height:1.375rem}.paragraph-semibold-p1-xlarge-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:1.125rem;line-height:1.5rem}.paragraph-regular-p3-default[_ngcontent-%COMP%]{font-family:Inter;font-weight:400;font-size:.875rem;line-height:1.25rem}.paragraph-semibold-p3-default-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:.875rem;line-height:1.25rem}.paragraph-regular-p4-small[_ngcontent-%COMP%]{font-family:Inter;font-weight:400;font-size:.75rem;line-height:1.125rem}.paragraph-semibold-p3-small-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:.875rem;line-height:1.25rem}.paragraph-semibold-p4-xSmall[_ngcontent-%COMP%]{font-family:Inter;font-size:.75rem;line-height:1.125rem;font-weight:400}.paragraph-semibold-p4-xSmall-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-size:.75rem;line-height:1.125rem;font-weight:600}.paragraph-regular-p4-xSmall[_ngcontent-%COMP%]{font-family:Inter;font-size:.75rem;line-height:1.125rem;font-weight:400;color:var(--foregrounds-750)}.paragraph-regular-p3-default[_ngcontent-%COMP%]{font-family:Inter;font-size:.875rem;line-height:1.25rem;font-weight:400}.paragraph-regular-p2-large[_ngcontent-%COMP%]{font-family:Inter;font-size:1rem;font-weight:400;line-height:1.375rem}.login-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:95%;background:linear-gradient(to left,transparent,var(--backgrounds-50),transparent);padding:60px 30px;text-align:center}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;margin-bottom:10px}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .login-title[_ngcontent-%COMP%]{font-size:2.5rem;line-height:3.359rem;font-weight:400;color:var(--login-title)}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .login-subtitle[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:.875rem;line-height:1.25rem;color:var(--foregrounds-550)}.login-container[_ngcontent-%COMP%]   .login-section[_ngcontent-%COMP%]{margin-top:20px;width:100%;max-width:400px}"]}),a);M=I([x()],M);var et=[{path:"",pathMatch:"full",redirectTo:y.AUTH.LOGIN},{path:y.AUTH.LOGIN,component:M}],$=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=h({type:t}),t.\u0275inj=d({imports:[O.forChild(et),O]});let n=t;return n})();var Rt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=h({type:t}),t.\u0275inj=d({imports:[N,j,H,W,X,$,u,U]});let n=t;return n})();export{Rt as AuthModule};
