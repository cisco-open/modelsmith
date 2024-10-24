import{a as J,b as Q}from"./chunk-QJ55TOIV.js";import{b as nt,s as it}from"./chunk-CYUWMGXJ.js";import{$ as B,$a as r,Ab as K,Ba as R,Da as a,Ea as y,Eb as N,Gb as W,Hb as E,Pa as m,Ra as g,Ub as $,Vb as X,Xa as u,Z as j,Zb as q,a as w,ab as l,ba as S,bb as F,eb as M,fb as h,ga as L,ib as _,j as P,ja as H,kb as s,lb as z,mb as G,oa as f,p as A,pa as C,qe as Y,sb as O,se as Z,tb as D,te as tt,ua as x,ub as U,vb as k,ve as et,we as ot,xa as V}from"./chunk-DL2LTWBU.js";var b=new B("DIALOG_DATA");var p=class{constructor(e){this.overlayRef=e,this.afterClosedSubject=new P}backdropClick(){return this.overlayRef.backdropClick()}close(e){this.overlayRef.dispose(),this.afterClosedSubject.next(e),this.afterClosedSubject.complete()}afterClosed(){return this.afterClosedSubject.asObservable()}};function v(t,e){let o={};return t&&at(o,t,"width"),e&&at(o,e,"height"),o}function at(t,e,o){let n=_t(e);n==="px"||n==="rem"||n==="em"?t[`${o}.${n}`]=parseFloat(e):t[o]=e}function _t(t){let o=(typeof t=="string"?t:"").match(/(px|rem|em|vw|vh|%)$/);return o?o[0]:"px"}var d=function(t){return t.OPEN="open",t.DISMISS="dismiss",t.SAVE="save",t.CLOSE="close",t}(d||{});var lt=(()=>{let e=class e{transform(n,i){return v(n,i)}};e.\u0275fac=function(i){return new(i||e)},e.\u0275pipe=H({name:"dialogSizeStyles",type:e,pure:!0,standalone:!0});let t=e;return t})();var ft=["*"];function Ct(t,e){t&1&&M(0)}function xt(t,e){if(t&1){let o=h();r(0,"div",7)(1,"div",8),D(2),l(),r(3,"div",9)(4,"button",10),_("click",function(){f(o);let i=s(2);return C(i.onDismiss())}),F(5,"mat-icon",11),l()()()}if(t&2){let o=s(2);a(2),U(o.data.title)}}function ht(t,e){if(t&1&&(r(0,"div",3),m(1,Ct,1,0,"ng-container",6)(2,xt,6,1,"ng-template",null,0,E),l()),t&2){let o=O(3),n=s();a(),g("ngTemplateOutlet",n.headerTemplate||o)}}function Dt(t,e){t&1&&M(0)}function bt(t,e){if(t&1){let o=h();r(0,"button",15),_("click",function(){f(o);let i=s(3);return C(i.onClose())}),D(1),l()}if(t&2){let o=s(3);g("disabled",o.isDismissDisabled),a(),k(" ",o.data.closeButtonLabel," ")}}function vt(t,e){if(t&1){let o=h();r(0,"button",16),_("click",function(){f(o);let i=s(3);return C(i.onSave())}),D(1),l()}if(t&2){let o=s(3);g("disabled",o.isSaveDisabled),a(),k(" ",o.data.saveButtonLabel," ")}}function wt(t,e){if(t&1&&(r(0,"div",12),m(1,bt,2,2,"button",13)(2,vt,2,2,"button",14),l()),t&2){let o=s(2);a(),u(o.data.showCloseButton?1:-1),a(),u(o.data.showSaveButton?2:-1)}}function St(t,e){if(t&1&&(r(0,"div",5),m(1,Dt,1,0,"ng-container",6)(2,wt,3,2,"ng-template",null,1,E),l()),t&2){let o=O(3),n=s();a(),g("ngTemplateOutlet",n.actionsTemplate||o)}}var c,st=(c=class{constructor(e,o){this.dialogRef=e,this.data=o,this.isSaveDisabled=!1,this.isDismissDisabled=!1,this.actionEvent=new V,this.closeDrawerOnBackdropClick()}get dialogSizeStyles(){return v(this.data.width,this.data.height)}onClose(){this.actionEvent.emit(d.CLOSE),this.dialogRef.close({status:d.CLOSE})}onSave(){this.actionEvent.emit(d.SAVE)}onDismiss(){this.actionEvent.emit(d.DISMISS),this.dialogRef.close({status:d.DISMISS})}closeDrawerOnBackdropClick(){this.data.closeDialogOnBackdropClick&&this.dialogRef.backdropClick().pipe(Q(this)).subscribe(()=>{this.onDismiss()})}onEscKeyDown(){this.data.closeDialogOnEscKeyUp&&this.onDismiss()}},c.\u0275fac=function(o){return new(o||c)(y(p),y(b))},c.\u0275cmp=L({type:c,selectors:[["ms-dialog"]],hostBindings:function(o,n){o&1&&_("keyup.esc",function(){return n.onEscKeyDown()},!1,R)},inputs:{headerTemplate:"headerTemplate",actionsTemplate:"actionsTemplate",isSaveDisabled:"isSaveDisabled",isDismissDisabled:"isDismissDisabled"},outputs:{actionEvent:"actionEvent"},standalone:!0,features:[K],ngContentSelectors:ft,decls:6,vars:6,consts:[["defaultDialogHeader",""],["defaultDialogActions",""],[1,"dialog-wrapper",3,"ngStyle"],[1,"dialog-header"],[1,"dialog-content"],[1,"dialog-actions"],[4,"ngTemplateOutlet"],[1,"dialog-header-wrapper"],[1,"heading-section-title"],[1,"close-icon"],["mat-icon-button","",3,"click"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"],[1,"actions-wrapper"],["mat-stroked-button","",3,"disabled"],["mat-flat-button","","color","primary",3,"disabled"],["mat-stroked-button","",3,"click","disabled"],["mat-flat-button","","color","primary",3,"click","disabled"]],template:function(o,n){o&1&&(z(),r(0,"div",2),N(1,"dialogSizeStyles"),m(2,ht,4,1,"div",3),r(3,"div",4),G(4),l(),m(5,St,4,1,"div",5),l()),o&2&&(g("ngStyle",W(1,3,n.data.width,n.data.height)),a(2),u(n.data.showHeader?2:-1),a(3),u(n.data.showFooter?5:-1))},dependencies:[q,X,$,tt,Y,Z,ot,et,lt],styles:[".dialog-wrapper[_ngcontent-%COMP%]{width:inherit;box-shadow:0 0 4px 0 var(--backgrounds-700);display:flex;flex-direction:column}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]{min-height:60px;background-color:var(--backgrounds-200);box-sizing:border-box;border-bottom:1px solid var(--backgrounds-500)}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-header-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:24px 32px}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-header-wrapper[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   .icon-cancel[_ngcontent-%COMP%]{color:var(--foregrounds-100)!important}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-header-wrapper[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   .icon-cancel[_ngcontent-%COMP%]:hover{color:var(--foregrounds-300)!important}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]{overflow-y:auto;background-color:var(--backgrounds-100);flex-grow:1;padding:16px 32px}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]{background-color:var(--backgrounds-200);padding:16px 32px;box-sizing:border-box;border-top:1px solid var(--backgrounds-500)}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .actions-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end}.dialog-wrapper[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .actions-wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:20px}"]}),c);st=A([J()],st);var ct="1024px",pt="400px";var ae=(()=>{let e=class e{constructor(n,i){this.overlay=n,this.injector=i}open(n,i){let dt=this.overlay.position().global().centerHorizontally().centerVertically(),T=this.overlay.create(w({positionStrategy:dt,hasBackdrop:!0,backdropClass:"dialog-backdrop"},i)),I=new p(T),mt=x.create({parent:this.injector,providers:[{provide:p,useValue:I},{provide:b,useValue:w({saveButtonLabel:"Save",closeButtonLabel:"Close",showSaveButton:!0,showCloseButton:!0,showHeader:!0,showFooter:!0,closeDialogOnBackdropClick:!0,closeDialogOnEscKeyUp:!0,width:i?.width||ct,height:i?.height||pt},i)}]}),gt=new nt(n,null,mt);return T.attach(gt),I}};e.\u0275fac=function(i){return new(i||e)(S(it),S(x))},e.\u0275prov=j({token:e,factory:e.\u0275fac});let t=e;return t})();export{b as a,p as b,st as c,ae as d};