import{b as I}from"./chunk-7IF2CO5G.js";import{Bb as C,Ea as m,Fa as i,Na as d,Qa as f,T as a,Ya as p,ab as u,ae as x,bb as h,ha as c,j as s,ja as l,jb as y,lb as g,ub as E,wb as v}from"./chunk-64NP6AY6.js";function R(e,t){if(e&1&&(u(0,"mat-error",0),E(1),h()),e&2){let O=g();m(),v(" ",O.text,`
`)}}var _=(()=>{let t=class t{constructor(){}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=c({type:t,selectors:[["ms-error-message"]],inputs:{text:"text"},standalone:!0,features:[C],decls:1,vars:1,consts:[[1,"error-message"]],template:function(r,o){r&1&&f(0,R,2,1,"mat-error",0),r&2&&p(o.text?0:-1)},dependencies:[I],styles:[".error-message[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fade-in-translate .3s}@keyframes _ngcontent-%COMP%_fade-in-translate{0%{opacity:0;transform:translateY(-100%)}to{opacity:1;transform:translateY(0)}}"]});let e=t;return e})();var D="onlyDigits";function b(e){if(!e)return;let t=Object.keys(e)[0];switch(t){case"required":return"Field required";case"email":return"Email required";case D:return"Only numeric characters allowed";default:return t}}var S=(()=>{let t=class t{constructor(n,r){this.control=n,this.vcr=r,this._destroyed$=new s}onBlur(){this.control.invalid&&!this.control.disabled&&this.insertErrorComponent()}ngOnInit(){this.control.touched&&this.control.invalid&&!this.control.disabled&&this.insertErrorComponent(),this.control?.statusChanges?.pipe(a(this._destroyed$)).subscribe(()=>{this.control.touched&&this.control.invalid&&!this.control.disabled&&this.insertErrorComponent(),(this.control.valid||this.control.disabled)&&this.destroyErrorComponent()})}insertErrorComponent(){if(!this.componentRef){this.componentRef=this.vcr.createComponent(_);let n=this.componentRef.location.nativeElement;n.parentElement?.parentElement?.parentElement?.parentElement?.getElementsByClassName("mat-mdc-form-field-subscript-wrapper")[0]?.getElementsByClassName("mat-mdc-form-field-hint-wrapper")[0]?.getElementsByClassName("mat-mdc-form-field-hint-spacer")[0].appendChild(n)}this.componentRef.instance&&(this.componentRef.instance.text=b(this.control.errors))}destroyErrorComponent(){this.componentRef&&(this.vcr.remove(),this.componentRef.destroy(),this.componentRef=void 0)}ngOnDestroy(){this.destroyErrorComponent(),this._destroyed$.next(),this._destroyed$.complete()}};t.\u0275fac=function(r){return new(r||t)(i(x),i(d))},t.\u0275dir=l({type:t,selectors:[["","msErrorDisplay",""]],hostBindings:function(r,o){r&1&&y("blur",function(){return o.onBlur()})},standalone:!0});let e=t;return e})();export{S as a};
