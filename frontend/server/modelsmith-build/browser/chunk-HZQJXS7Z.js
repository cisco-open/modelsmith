import{b as T}from"./chunk-7IF2CO5G.js";import{Bb as g,Ea as f,Fa as a,Na as p,Qa as I,T as c,Ya as D,ab as E,ae as R,bb as h,ha as u,j as m,ja as d,jb as v,lb as A,ub as _,wb as x}from"./chunk-64NP6AY6.js";function N(t,e){if(t&1&&(E(0,"mat-error",0),_(1),h()),t&2){let o=A();f(),x(" ",o.text,`
`)}}var V=(()=>{let e=class e{constructor(){}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=u({type:e,selectors:[["ms-error-message"]],inputs:{text:"text"},standalone:!0,features:[g],decls:1,vars:1,consts:[[1,"error-message"]],template:function(r,n){r&1&&I(0,N,2,1,"mat-error",0),r&2&&D(n.text?0:-1)},dependencies:[T],styles:[".error-message[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fade-in-translate .3s}@keyframes _ngcontent-%COMP%_fade-in-translate{0%{opacity:0;transform:translateY(-100%)}to{opacity:1;transform:translateY(0)}}"]});let t=e;return t})();var s="commaSeparatedValues";function S(){return t=>{let{value:e}=t;return e&&/^(\d+)(,\d+)*$/.test(e)===!1?{[s]:{actual:e}}:null}}var y="interval";function j(t){return e=>{let o=e.value;if(o==null)return null;let[i,r]=t;return o<i||o>r?{interval:{min:i,max:r,actual:o}}:null}}var M="maxDate";var C="maxDecimals";function P(t){return e=>{if(!e.value||isNaN(e.value))return null;let i=e.value.toString().split(".")[1];return i&&i.length>t?{maxDecimals:{requiredDecimals:t,actualDecimals:i.length}}:null}}var O="minDate";var l="onlyDigits";function X(){return t=>{let{value:e}=t;return e&&/^\d+(\.\d+)?$/.test(e)===!1?{[l]:{actual:e}}:null}}function b(t){if(!t)return;let[[e,o]]=Object.entries(t),r={required:"Field is required",email:"Invalid email format",min:n=>`Minimum allowed value is ${n.min}`,max:n=>`Maximum allowed value is ${n.max}`,minLength:n=>`Minimum length is ${n.requiredLength} characters`,maxLength:n=>`Maximum length is ${n.requiredLength} characters`,pattern:"Invalid format",nullValidator:"Field must not be null",requiredTrue:"Field must be true (checked)",url:"Invalid URL format",unique:"Value must be unique",whitespace:"Field cannot be empty or contain only whitespace",ip:"Invalid IP address format",uuid:"Invalid UUID format",[M]:n=>`Date must be before ${n.maxDate}`,[O]:n=>`Date must be after ${n.minDate}`,[l]:"Only digits are allowed",[C]:n=>`Maximum ${n.maxDecimals} decimal places allowed`,[s]:"Values must be a comma-separated list of numbers",[y]:n=>`Value must be between ${n.min} and ${n.max}.`}[e];return typeof r=="function"?r(o):r||`Unknown validation error: ${e}`}var ie=(()=>{let e=class e{constructor(i,r){this.control=i,this.vcr=r,this._destroyed$=new m}onBlur(){this.control.invalid&&!this.control.disabled&&this.insertErrorComponent()}ngOnInit(){this.control.touched&&this.control.invalid&&!this.control.disabled&&this.insertErrorComponent(),this.control?.statusChanges?.pipe(c(this._destroyed$)).subscribe(()=>{this.control.touched&&this.control.invalid&&!this.control.disabled&&this.insertErrorComponent(),(this.control.valid||this.control.disabled)&&this.destroyErrorComponent()})}insertErrorComponent(){if(!this.componentRef){this.componentRef=this.vcr.createComponent(V);let i=this.componentRef.location.nativeElement;i.parentElement?.parentElement?.parentElement?.parentElement?.getElementsByClassName("mat-mdc-form-field-subscript-wrapper")[0]?.getElementsByClassName("mat-mdc-form-field-hint-wrapper")[0]?.getElementsByClassName("mat-mdc-form-field-hint-spacer")[0].appendChild(i)}this.componentRef.instance&&(this.componentRef.instance.text=b(this.control.errors))}destroyErrorComponent(){this.componentRef&&(this.vcr.remove(),this.componentRef.destroy(),this.componentRef=void 0)}ngOnDestroy(){this.destroyErrorComponent(),this._destroyed$.next(),this._destroyed$.complete()}};e.\u0275fac=function(r){return new(r||e)(a(R),a(p))},e.\u0275dir=d({type:e,selectors:[["","msErrorDisplay",""]],hostBindings:function(r,n){r&1&&v("blur",function(){return n.onBlur()})},standalone:!0});let t=e;return t})();export{s as a,S as b,y as c,j as d,C as e,P as f,l as g,X as h,ie as i};
