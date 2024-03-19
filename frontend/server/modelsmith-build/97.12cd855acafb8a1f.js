"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[97],{9097:(E,h,e)=>{e.r(h),e.d(h,{AuthModule:()=>z});var p=e(6814),u=e(4245),f=e(1303),c=e(9547),C=e(7582),a=e(6223),O=e(8791),M=e(4889),t=e(5879),v=e(9082),y=e(8110),P=e(2296),I=e(2032),d=e(5683),A=e(5949),S=e(617);let w=(()=>{var n;class o{constructor(i,l,g){this.el=i,this.renderer=l,this.viewContainer=g,this.isHidden=!0}ngOnInit(){const i=this.el.nativeElement,l=this.createIcon();this.setupIconInContainer(i,l),l.location.nativeElement.addEventListener("click",()=>{this.toggleVisibility(i,l.instance)})}createIcon(){const i=this.viewContainer.createComponent(S.Hw);return i.instance.fontIcon=this.isHidden?"visibility_off":"visibility",i}setupIconInContainer(i,l){const g=this.renderer.createElement("div");this.renderer.addClass(g,o.CLASS_ICON_SUFFIX),this.renderer.setStyle(l.location.nativeElement,"padding","0"),this.renderer.setAttribute(i,"type",this.isHidden?"password":"text"),this.renderer.appendChild(g,l.location.nativeElement),this.renderer.appendChild(i?.parentElement?.parentElement,g)}toggleVisibility(i,l){this.isHidden=!this.isHidden,this.renderer.setAttribute(i,"type",this.isHidden?"password":"text"),l.fontIcon=this.isHidden?"visibility_off":"visibility"}}return(n=o).CLASS_ICON_SUFFIX="mat-mdc-form-field-icon-suffix",n.\u0275fac=function(i){return new(i||n)(t.Y36(t.SBq),t.Y36(t.Qsj),t.Y36(t.s_b))},n.\u0275dir=t.lG2({type:n,selectors:[["","msPasswordToggle",""]],standalone:!0}),o})();var s,T=e(7794);let m=((s=class{constructor(o,r){this.fb=o,this.authFacadeService=r,this.CONTROL_NAMES={EMAIL:"email",PASSWORD:"password"}}ngOnInit(){this.initForm()}initForm(){this.form=this.fb.group({[this.CONTROL_NAMES.EMAIL]:["alexander@cisco.com",[a.kI.email,a.kI.required]],[this.CONTROL_NAMES.PASSWORD]:["GUfCRHz7VD9R",[a.kI.required]]})}get emailControl(){return this.form.get(this.CONTROL_NAMES.EMAIL)}get passwordControl(){return this.form.get(this.CONTROL_NAMES.PASSWORD)}login(){const o=this.form.getRawValue();this.authFacadeService.dispatch(M.uQ.login(o))}}).\u0275fac=function(o){return new(o||s)(t.Y36(a.qu),t.Y36(v.N))},s.\u0275cmp=t.Xpm({type:s,selectors:[["ms-login"]],decls:24,vars:4,consts:[[1,"login-container"],[1,"logo-section"],["src","/assets/logo/login-logo.svg","alt","ModelSmith Logo"],[1,"login-title"],[1,"login-subtitle"],[1,"login-section"],[3,"formGroup","submit"],[1,"form-field-container","ms-white-form-field"],["matInput","","msErrorDisplay","","autocomplete","current-password",3,"formControlName"],["msPasswordToggle","","msErrorDisplay","","matInput","","autocomplete","current-password",3,"formControlName"],[1,"mt-[2px]"],["type","submit","mat-raised-button","","color","primary",1,"w-full",3,"disabled"],["styleMode","fullWidth"]],template:function(o,r){1&o&&(t.TgZ(0,"ms-background-gradient")(1,"div",0)(2,"div",1),t._UZ(3,"img",2),t.TgZ(4,"div",3),t._uU(5,"ModelSmith"),t.qZA(),t.TgZ(6,"div",4),t._uU(7,"A super cool compression tool"),t.qZA()(),t.TgZ(8,"div",5)(9,"form",6),t.NdJ("submit",function(){return r.login()}),t.TgZ(10,"div",7)(11,"mat-label"),t._uU(12," Email "),t.qZA(),t.TgZ(13,"mat-form-field"),t._UZ(14,"input",8),t.qZA()(),t.TgZ(15,"div",7)(16,"mat-label"),t._uU(17," Password "),t.qZA(),t.TgZ(18,"mat-form-field"),t._UZ(19,"input",9),t.qZA()(),t.TgZ(20,"div",10)(21,"button",11),t._uU(22," Login "),t.qZA()()()()(),t._UZ(23,"ms-footer",12),t.qZA()),2&o&&(t.xp6(9),t.Q6J("formGroup",r.form),t.xp6(5),t.Q6J("formControlName",r.CONTROL_NAMES.EMAIL),t.xp6(5),t.Q6J("formControlName",r.CONTROL_NAMES.PASSWORD),t.xp6(2),t.Q6J("disabled",r.form.invalid))},dependencies:[y.g,P.lW,I.Nt,d.KE,d.hX,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,A.o,w,T.N],styles:["html[_ngcontent-%COMP%]{color:var(--foregrounds-800)}.text-hint[_ngcontent-%COMP%]{color:var(--foregrounds-700)}.heading-primary-title[_ngcontent-%COMP%]{font-family:Montserrat;font-weight:700;font-size:1.5rem;line-height:2.125rem}.heading-section-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.125rem;line-height:1.5em}.paragraph-bold-p4-small-bold[_ngcontent-%COMP%]{font-family:Inter;font-weight:700;font-size:.75rem;line-height:1.125em}.paragraph-monospace-p2-large[_ngcontent-%COMP%]{font-size:1rem;line-height:1.375rem;font-weight:400}.heading-sub-section-title[_ngcontent-%COMP%]{font-size:1rem;line-height:1.375rem;font-weight:700}.paragraph-regular-p3-small[_ngcontent-%COMP%]{font-family:Inter;font-weight:400;font-size:.875;line-height:1.25rem}.paragraph-bold-p3-small-bold[_ngcontent-%COMP%]{font-family:Inter;font-weight:700;font-size:.875rem;line-height:1.25rem}.paragraph-semibold-p2-large-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:1rem;line-height:1.375rem}.paragraph-semibold-p1-xlarge-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:1.125rem;line-height:1.5rem}.paragraph-regular-p3-default[_ngcontent-%COMP%]{font-family:Inter;font-weight:400;font-size:.875rem;line-height:1.25rem}.paragraph-semibold-p3-default-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:.875rem;line-height:1.25rem}.paragraph-regular-p4-small[_ngcontent-%COMP%]{font-family:Inter;font-weight:400;font-size:.75rem;line-height:1.125rem}.paragraph-semibold-p3-small-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:.875rem;line-height:1.25rem}.paragraph-semibold-p4-xSmall[_ngcontent-%COMP%]{font-family:Inter;font-size:.75rem;line-height:1.125rem;font-weight:400}.paragraph-semibold-p4-xSmall-emphasis[_ngcontent-%COMP%]{font-family:Inter;font-size:.75rem;line-height:1.125rem;font-weight:600}.paragraph-regular-p4-xSmall[_ngcontent-%COMP%]{font-family:Inter;font-size:.75rem;line-height:1.125rem;font-weight:400;color:var(--foregrounds-750)}.paragraph-regular-p3-default[_ngcontent-%COMP%]{font-family:Inter;font-size:.875rem;line-height:1.25rem;font-weight:400}.paragraph-regular-p2-large[_ngcontent-%COMP%]{font-family:Inter;font-size:1rem;font-weight:400;line-height:1.375rem}.login-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:95%;background:linear-gradient(to left,transparent,var(--backgrounds-50),transparent);padding:60px 30px;text-align:center}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;margin-bottom:10px}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .login-title[_ngcontent-%COMP%]{font-size:2.5rem;line-height:3.359rem;font-weight:400;color:var(--login-title)}.login-container[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .login-subtitle[_ngcontent-%COMP%]{font-family:Inter;font-weight:600;font-size:.875rem;line-height:1.25rem;color:var(--foregrounds-550)}.login-container[_ngcontent-%COMP%]   .login-section[_ngcontent-%COMP%]{margin-top:20px;width:100%;max-width:400px}"]}),s);m=(0,C.gn)([(0,O.c)()],m);const N=[{path:"",pathMatch:"full",redirectTo:c.Z.AUTH.LOGIN},{path:c.Z.AUTH.LOGIN,component:m}];let b=(()=>{var n;class o{}return(n=o).\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[f.Bz.forChild(N),f.Bz]}),o})(),z=(()=>{var n;class o{}return(n=o).\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[p.ez,b,u.m]}),o})()}}]);