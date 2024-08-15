import{l as tt}from"./chunk-U4U6UPEW.js";import{$ as G,Ab as W,Bb as q,Bd as $,Dd as Y,Ea as b,Fa as s,Hd as w,Lb as C,Ld as Z,Md as J,Nb as d,Nd as K,Pa as k,Qa as N,Ra as h,Sa as g,Ua as y,Xd as X,Ya as T,Z as B,aa as v,ab as x,bb as L,cb as p,gb as j,ha as R,ia as A,ja as E,jb as m,lb as S,mb as P,nb as U,pa as D,pb as z,qa as F,qb as Q,rb as I,sb as M,tb as H,ua as O,xa as V,ya as u}from"./chunk-VYHIF4FK.js";var it=["button"],lt=["*"];function rt(i,a){if(i&1&&p(0,"mat-pseudo-checkbox",3),i&2){let c=S();g("disabled",c.disabled)}}function st(i,a){if(i&1&&p(0,"mat-pseudo-checkbox",3),i&2){let c=S();g("disabled",c.disabled)}}var et=new v("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:dt});function dt(){return{hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1}}var ot=new v("MatButtonToggleGroup"),ct={provide:X,useExisting:B(()=>gt),multi:!0},at=0,f=class{constructor(a,c){this.source=a,this.value=c}},gt=(()=>{let a=class a{get name(){return this._name}set name(t){this._name=t,this._markButtonsForCheck()}get value(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map(o=>o.value):t[0]?t[0].value:void 0}set value(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}get selected(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._markButtonsForCheck()}get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(t){this._hideMultipleSelectionIndicator=t,this._markButtonsForCheck()}constructor(t,o,e){this._changeDetector=t,this._dir=e,this._multiple=!1,this._disabled=!1,this._controlValueAccessorChangeFn=()=>{},this._onTouched=()=>{},this._name=`mat-button-toggle-group-${at++}`,this.valueChange=new u,this.change=new u,this.appearance=o&&o.appearance?o.appearance:"standard",this.hideSingleSelectionIndicator=o?.hideSingleSelectionIndicator??!1,this.hideMultipleSelectionIndicator=o?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new tt(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(t=>t.checked)),this.multiple||this._initializeTabIndex()}writeValue(t){this.value=t,this._changeDetector.markForCheck()}registerOnChange(t){this._controlValueAccessorChangeFn=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t}_keydown(t){if(this.multiple||this.disabled)return;let e=t.target.id,n=this._buttonToggles.toArray().findIndex(r=>r.buttonId===e),l=null;switch(t.keyCode){case 32:case 13:l=this._buttonToggles.get(n)||null;break;case 38:l=this._getNextButton(n,-1);break;case 37:l=this._getNextButton(n,this.dir==="ltr"?-1:1);break;case 40:l=this._getNextButton(n,1);break;case 39:l=this._getNextButton(n,this.dir==="ltr"?1:-1);break;default:return}l&&(t.preventDefault(),l._onButtonClick(),l.focus())}_emitChangeEvent(t){let o=new f(t,this.value);this._rawValue=o.value,this._controlValueAccessorChangeFn(o.value),this.change.emit(o)}_syncButtonToggle(t,o,e=!1,n=!1){!this.multiple&&this.selected&&!t.checked&&(this.selected.checked=!1),this._selectionModel?o?this._selectionModel.select(t):this._selectionModel.deselect(t):n=!0,n?Promise.resolve().then(()=>this._updateModelValue(t,e)):this._updateModelValue(t,e)}_isSelected(t){return this._selectionModel&&this._selectionModel.isSelected(t)}_isPrechecked(t){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(o=>t.value!=null&&o===t.value):t.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(t=>{t.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let t=0;t<this._buttonToggles.length;t++){let o=this._buttonToggles.get(t);if(!o.disabled){o.tabIndex=0;break}}this._markButtonsForCheck()}_getNextButton(t,o){let e=this._buttonToggles;for(let n=1;n<=e.length;n++){let l=(t+o*n+e.length)%e.length,r=e.get(l);if(r&&!r.disabled)return r}return null}_setSelectionByValue(t){this._rawValue=t,this._buttonToggles&&(this.multiple&&t?(Array.isArray(t),this._clearSelection(),t.forEach(o=>this._selectValue(o))):(this._clearSelection(),this._selectValue(t)))}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(t=>{t.checked=!1,this.multiple||(t.tabIndex=-1)})}_selectValue(t){let o=this._buttonToggles.find(e=>e.value!=null&&e.value===t);o&&(o.checked=!0,this._selectionModel.select(o),this.multiple||(o.tabIndex=0))}_updateModelValue(t,o){o&&this._emitChangeEvent(t),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(t=>t._markForCheck())}};a.\u0275fac=function(o){return new(o||a)(s(C),s(et,8),s(Y,8))},a.\u0275dir=E({type:a,selectors:[["mat-button-toggle-group"]],contentQueries:function(o,e,n){if(o&1&&z(n,nt,5),o&2){let l;I(l=M())&&(e._buttonToggles=l)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(o,e){o&1&&m("keydown",function(l){return e._keydown(l)}),o&2&&(h("role",e.multiple?"group":"radiogroup")("aria-disabled",e.disabled),y("mat-button-toggle-vertical",e.vertical)("mat-button-toggle-group-appearance-standard",e.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",d],value:"value",multiple:[2,"multiple","multiple",d],disabled:[2,"disabled","disabled",d],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",d],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",d]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],standalone:!0,features:[W([ct,{provide:ot,useExisting:a}]),k]});let i=a;return i})(),nt=(()=>{let a=class a{get buttonId(){return`${this.id}-button`}get tabIndex(){return this._tabIndex}set tabIndex(t){this._tabIndex=t,this._markForCheck()}get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}constructor(t,o,e,n,l,r){this._changeDetectorRef=o,this._elementRef=e,this._focusMonitor=n,this._checked=!1,this.ariaLabelledby=null,this._disabled=!1,this.change=new u;let _=Number(l);this.tabIndex=_||_===0?_:null,this.buttonToggleGroup=t,this.appearance=r&&r.appearance?r.appearance:"standard"}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||`mat-button-toggle-${at++}`,t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){let t=this.isSingleSelector()?!0:!this._checked;if(t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let o=this.buttonToggleGroup._buttonToggles.find(e=>e.tabIndex===0);o&&(o.tabIndex=-1),this.tabIndex=0}this.change.emit(new f(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}};a.\u0275fac=function(o){return new(o||a)(s(ot,8),s(C),s(V),s($),O("tabindex"),s(et,8))},a.\u0275cmp=R({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(o,e){if(o&1&&Q(it,5),o&2){let n;I(n=M())&&(e._buttonElement=n.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:12,hostBindings:function(o,e){o&1&&m("focus",function(){return e.focus()}),o&2&&(h("aria-label",null)("aria-labelledby",null)("id",e.id)("name",null),y("mat-button-toggle-standalone",!e.buttonToggleGroup)("mat-button-toggle-checked",e.checked)("mat-button-toggle-disabled",e.disabled)("mat-button-toggle-appearance-standard",e.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",d],appearance:"appearance",checked:[2,"checked","checked",d],disabled:[2,"disabled","disabled",d]},outputs:{change:"change"},exportAs:["matButtonToggle"],standalone:!0,features:[k,q],ngContentSelectors:lt,decls:8,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-label-content"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"]],template:function(o,e){if(o&1){let n=j();P(),x(0,"button",1,0),m("click",function(){return D(n),F(e._onButtonClick())}),x(2,"span",2),N(3,rt,1,1,"mat-pseudo-checkbox",3)(4,st,1,1,"mat-pseudo-checkbox",3),U(5),L()(),p(6,"span",4)(7,"span",5)}if(o&2){let n=H(1);g("id",e.buttonId)("disabled",e.disabled||null),h("role",e.isSingleSelector()?"radio":"button")("tabindex",e.disabled?-1:e.tabIndex)("aria-pressed",e.isSingleSelector()?null:e.checked)("aria-checked",e.isSingleSelector()?e.checked:null)("name",e._getButtonName())("aria-label",e.ariaLabel)("aria-labelledby",e.ariaLabelledby),b(3),T(e.buttonToggleGroup&&e.checked&&!e.buttonToggleGroup.multiple&&!e.buttonToggleGroup.hideSingleSelectionIndicator?3:-1),b(),T(e.buttonToggleGroup&&e.checked&&e.buttonToggleGroup.multiple&&!e.buttonToggleGroup.hideMultipleSelectionIndicator?4:-1),b(3),g("matRippleTrigger",n)("matRippleDisabled",e.disableRipple||e.disabled)}},dependencies:[Z,K],styles:[".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape);border:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-selected-checkmark-color: var( --mat-standard-button-toggle-selected-state-text-color )}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-label-text-font);font-size:var(--mat-legacy-button-toggle-label-text-size);line-height:var(--mat-legacy-button-toggle-label-text-line-height);font-weight:var(--mat-legacy-button-toggle-label-text-weight);letter-spacing:var(--mat-legacy-button-toggle-label-text-tracking);--mat-minimal-pseudo-checkbox-selected-checkmark-color: var( --mat-legacy-button-toggle-selected-state-text-color )}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle .mat-pseudo-checkbox{margin-right:12px}[dir=rtl] .mat-button-toggle .mat-pseudo-checkbox{margin-right:0;margin-left:12px}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color);--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var( --mat-legacy-button-toggle-disabled-state-text-color )}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color);background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-label-text-font);font-size:var(--mat-standard-button-toggle-label-text-size);line-height:var(--mat-standard-button-toggle-label-text-line-height);font-weight:var(--mat-standard-button-toggle-label-text-weight);letter-spacing:var(--mat-standard-button-toggle-label-text-tracking)}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color)}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color);background-color:var(--mat-standard-button-toggle-selected-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var( --mat-standard-button-toggle-disabled-selected-state-text-color )}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color)}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity)}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity)}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard{--mat-focus-indicator-border-radius:var(--mat-standard-button-toggle-shape)}.mat-button-toggle-group-appearance-standard .mat-button-toggle:last-of-type .mat-button-toggle-button::before{border-top-right-radius:var(--mat-standard-button-toggle-shape);border-bottom-right-radius:var(--mat-standard-button-toggle-shape)}.mat-button-toggle-group-appearance-standard .mat-button-toggle:first-of-type .mat-button-toggle-button::before{border-top-left-radius:var(--mat-standard-button-toggle-shape);border-bottom-left-radius:var(--mat-standard-button-toggle-shape)}"],encapsulation:2,changeDetection:0});let i=a;return i})(),Vt=(()=>{let a=class a{};a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=A({type:a}),a.\u0275inj=G({imports:[w,J,nt,w]});let i=a;return i})();export{gt as a,nt as b,Vt as c};
