import{$a as F,$d as Ee,A as B,B as W,Bc as _e,Ca as M,Da as x,Ea as m,Ec as Ce,Fa as J,Fc as Se,Ga as v,H as Q,Hc as be,I as O,Ia as T,Ic as ye,J as h,Ja as w,K as k,Ka as C,La as S,Ma as P,N as $,Na as D,Oa as X,Od as ve,P as K,Pa as Y,Pd as Ie,Q as z,Qd as Oe,Rd as ke,T as q,Ta as ee,U,V as E,Xa as te,Ya as ne,Z as g,Za as ie,Zc as Me,_ as f,ae as Ae,cb as oe,ea as A,eb as ae,ec as ce,fa as Z,fc as he,gb as le,gc as pe,h as V,he as Te,i as R,ic as me,ja as c,jc as de,ka as d,ld as xe,mb as re,nc as ue,o as N,pb as se,qa as _,qc as ge,ra as G,s as b,sa as s,t as j,tc as fe,w as H,wa as u,xa as p,ya as y}from"./chunk-XZNUB5IR.js";var we=["searchSelectInput"],Pe=["innerSelectSearch"],De=[[["",8,"mat-select-search-custom-header-content"]],[["","ngxMatSelectSearchClear",""]],[["","ngxMatSelectNoEntriesFound",""]]],Fe=[".mat-select-search-custom-header-content","[ngxMatSelectSearchClear]","[ngxMatSelectNoEntriesFound]"],Le=(n,a)=>({"mat-select-search-inner-multiple":n,"mat-select-search-inner-toggle-all":a});function Ve(n,a){if(n&1){let e=M();u(0,"mat-checkbox",12),x("change",function(i){g(e);let o=m();return f(o._emitSelectAllBooleanToParent(i.checked))}),p()}if(n&2){let e=m();s("color",e.matFormField==null?null:e.matFormField.color)("checked",e.toggleAllCheckboxChecked)("indeterminate",e.toggleAllCheckboxIndeterminate)("matTooltip",e.toggleAllCheckboxTooltipMessage)("matTooltipPosition",e.toggleAllCheckboxTooltipPosition)}}function Re(n,a){n&1&&y(0,"mat-spinner",13)}function Ne(n,a){n&1&&v(0,1,["*ngIf","clearIcon; else defaultIcon"])}function je(n,a){if(n&1&&(u(0,"mat-icon",16),D(1),p()),n&2){let e=m(2);s("svgIcon",e.closeSvgIcon),c(),Y(" ",e.closeSvgIcon?null:e.closeIcon," ")}}function He(n,a){if(n&1){let e=M();u(0,"button",14),x("click",function(){g(e);let i=m();return f(i._reset(!0))}),_(1,Ne,1,0,"ng-content",15)(2,je,2,2,"ng-template",null,2,F),p()}if(n&2){let e=P(3),t=m();c(),s("ngIf",t.clearIcon)("ngIfElse",e)}}function Be(n,a){n&1&&v(0,2,["*ngIf","noEntriesFound; else defaultNoEntriesFound"])}function We(n,a){if(n&1&&D(0),n&2){let e=m(2);X(e.noEntriesFoundLabel)}}function Qe(n,a){if(n&1&&(u(0,"div",17),_(1,Be,1,0,"ng-content",15)(2,We,1,1,"ng-template",null,3,F),p()),n&2){let e=P(3),t=m();c(),s("ngIf",t.noEntriesFound)("ngIfElse",e)}}var $e=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=E({type:n,selectors:[["","ngxMatSelectSearchClear",""]]}),n})(),Ke=["ariaLabel","clearSearchInput","closeIcon","closeSvgIcon","disableInitialFocus","disableScrollToActiveOnOptionsChanged","enableClearOnEscapePressed","hideClearSearchButton","noEntriesFoundLabel","placeholderLabel","preventHomeEndKeyPropagation","searching"],ze=new z("mat-selectsearch-default-options"),qe=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=E({type:n,selectors:[["","ngxMatSelectNoEntriesFound",""]]}),n})(),jt=(()=>{class n{constructor(e,t,i,o=null,l=null,L){this.matSelect=e,this.changeDetectorRef=t,this._viewportRuler=i,this.matOption=o,this.matFormField=l,this.placeholderLabel="Suche",this.type="text",this.closeIcon="close",this.noEntriesFoundLabel="Keine Optionen gefunden",this.clearSearchInput=!0,this.searching=!1,this.disableInitialFocus=!1,this.enableClearOnEscapePressed=!1,this.preventHomeEndKeyPropagation=!1,this.disableScrollToActiveOnOptionsChanged=!1,this.ariaLabel="dropdown search",this.showToggleAllCheckbox=!1,this.toggleAllCheckboxChecked=!1,this.toggleAllCheckboxIndeterminate=!1,this.toggleAllCheckboxTooltipMessage="",this.toggleAllCheckboxTooltipPosition="below",this.hideClearSearchButton=!1,this.alwaysRestoreSelectedOptionsMulti=!1,this.toggleAll=new Z,this.onTouched=r=>{},this._options$=new R(null),this.optionsList$=this._options$.pipe(O(r=>r?r.changes.pipe(b(I=>I.toArray()),Q(r.toArray())):N(null))),this.optionsLength$=this.optionsList$.pipe(b(r=>r?r.length:0)),this._formControl=new ge(""),this._showNoEntriesFound$=j([this._formControl.valueChanges,this.optionsLength$]).pipe(b(([r,I])=>this.noEntriesFoundLabel&&r&&I===this.getOptionsLengthOffset())),this._onDestroy=new V,this.applyDefaultOptions(L)}get value(){return this._formControl.value}set _options(e){this._options$.next(e)}get _options(){return this._options$.getValue()}applyDefaultOptions(e){if(e)for(let t of Ke)e.hasOwnProperty(t)&&(this[t]=e[t])}ngOnInit(){this.matOption?(this.matOption.disabled=!0,this.matOption._getHostElement().classList.add("contains-mat-select-search"),this.matOption._getHostElement().setAttribute("aria-hidden","true")):console.error("<ngx-mat-select-search> must be placed inside a <mat-option> element"),this.matSelect.openedChange.pipe(W(1),h(this._onDestroy)).subscribe(e=>{e?(this.updateInputWidth(),this.disableInitialFocus||this._focus()):this.clearSearchInput&&this._reset()}),this.matSelect.openedChange.pipe(B(1),O(e=>{this._options=this.matSelect.options;let t=this._options.toArray()[this.getOptionsLengthOffset()];return this._options.changes.pipe(k(()=>{setTimeout(()=>{let i=this._options.toArray(),o=i[this.getOptionsLengthOffset()],l=this.matSelect._keyManager;l&&this.matSelect.panelOpen&&o&&((!t||!this.matSelect.compareWith(t.value,o.value)||!l.activeItem||!i.find(r=>this.matSelect.compareWith(r.value,l.activeItem.value)))&&l.setActiveItem(this.getOptionsLengthOffset()),setTimeout(()=>{this.updateInputWidth()})),t=o})}))})).pipe(h(this._onDestroy)).subscribe(),this._showNoEntriesFound$.pipe(h(this._onDestroy)).subscribe(e=>{this.matOption&&(e?this.matOption._getHostElement().classList.add("mat-select-search-no-entries-found"):this.matOption._getHostElement().classList.remove("mat-select-search-no-entries-found"))}),this._viewportRuler.change().pipe(h(this._onDestroy)).subscribe(()=>{this.matSelect.panelOpen&&this.updateInputWidth()}),this.initMultipleHandling(),this.optionsList$.pipe(h(this._onDestroy)).subscribe(()=>{this.changeDetectorRef.markForCheck()})}_emitSelectAllBooleanToParent(e){this.toggleAll.emit(e)}ngOnDestroy(){this._onDestroy.next(),this._onDestroy.complete()}_isToggleAllCheckboxVisible(){return this.matSelect.multiple&&this.showToggleAllCheckbox}_handleKeydown(e){(e.key&&e.key.length===1||e.keyCode>=65&&e.keyCode<=90||e.keyCode>=48&&e.keyCode<=57||e.keyCode===32||this.preventHomeEndKeyPropagation&&(e.keyCode===36||e.keyCode===35))&&e.stopPropagation(),this.matSelect.multiple&&e.key&&e.keyCode===13&&setTimeout(()=>this._focus()),this.enableClearOnEscapePressed===!0&&e.keyCode===27&&this.value&&(this._reset(!0),e.stopPropagation())}_handleKeyup(e){if(e.keyCode===38||e.keyCode===40){let t=this.matSelect._getAriaActiveDescendant(),i=this._options.toArray().findIndex(o=>o.id===t);i!==-1&&(this.unselectActiveDescendant(),this.activeDescendant=this._options.toArray()[i]._getHostElement(),this.activeDescendant.setAttribute("aria-selected","true"),this.searchSelectInput.nativeElement.setAttribute("aria-activedescendant",t))}}writeValue(e){this._lastExternalInputValue=e,this._formControl.setValue(e),this.changeDetectorRef.markForCheck()}onBlur(){this.unselectActiveDescendant(),this.onTouched()}registerOnChange(e){this._formControl.valueChanges.pipe(H(t=>t!==this._lastExternalInputValue),k(()=>this._lastExternalInputValue=void 0),h(this._onDestroy)).subscribe(e)}registerOnTouched(e){this.onTouched=e}_focus(){if(!this.searchSelectInput||!this.matSelect.panel)return;let e=this.matSelect.panel.nativeElement,t=e.scrollTop;this.searchSelectInput.nativeElement.focus(),e.scrollTop=t}_reset(e){this._formControl.setValue(""),e&&this._focus()}initMultipleHandling(){if(!this.matSelect.ngControl){this.matSelect.multiple&&console.error("the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true");return}this.previousSelectedValues=this.matSelect.ngControl.value,this.matSelect.ngControl.valueChanges.pipe(h(this._onDestroy)).subscribe(e=>{let t=!1;if(this.matSelect.multiple&&(this.alwaysRestoreSelectedOptionsMulti||this._formControl.value&&this._formControl.value.length)&&this.previousSelectedValues&&Array.isArray(this.previousSelectedValues)){(!e||!Array.isArray(e))&&(e=[]);let i=this.matSelect.options.map(o=>o.value);this.previousSelectedValues.forEach(o=>{!e.some(l=>this.matSelect.compareWith(l,o))&&!i.some(l=>this.matSelect.compareWith(l,o))&&(e.push(o),t=!0)})}this.previousSelectedValues=e,t&&this.matSelect._onChange(e)})}updateInputWidth(){if(!this.innerSelectSearch||!this.innerSelectSearch.nativeElement)return;let e=this.innerSelectSearch.nativeElement,t;for(;e=e.parentElement;)if(e.classList.contains("mat-select-panel")){t=e;break}t&&(this.innerSelectSearch.nativeElement.style.width=t.clientWidth+"px")}getOptionsLengthOffset(){return this.matOption?1:0}unselectActiveDescendant(){this.activeDescendant?.removeAttribute("aria-selected"),this.searchSelectInput.nativeElement.removeAttribute("aria-activedescendant")}}return n.\u0275fac=function(e){return new(e||n)(d(Te),d(oe),d(xe),d(ce,8),d(Me,8),d(ze,8))},n.\u0275cmp=q({type:n,selectors:[["ngx-mat-select-search"]],contentQueries:function(e,t,i){if(e&1&&(T(i,$e,5),T(i,qe,5)),e&2){let o;C(o=S())&&(t.clearIcon=o.first),C(o=S())&&(t.noEntriesFound=o.first)}},viewQuery:function(e,t){if(e&1&&(w(we,7,A),w(Pe,7,A)),e&2){let i;C(i=S())&&(t.searchSelectInput=i.first),C(i=S())&&(t.innerSelectSearch=i.first)}},inputs:{placeholderLabel:"placeholderLabel",type:"type",closeIcon:"closeIcon",closeSvgIcon:"closeSvgIcon",noEntriesFoundLabel:"noEntriesFoundLabel",clearSearchInput:"clearSearchInput",searching:"searching",disableInitialFocus:"disableInitialFocus",enableClearOnEscapePressed:"enableClearOnEscapePressed",preventHomeEndKeyPropagation:"preventHomeEndKeyPropagation",disableScrollToActiveOnOptionsChanged:"disableScrollToActiveOnOptionsChanged",ariaLabel:"ariaLabel",showToggleAllCheckbox:"showToggleAllCheckbox",toggleAllCheckboxChecked:"toggleAllCheckboxChecked",toggleAllCheckboxIndeterminate:"toggleAllCheckboxIndeterminate",toggleAllCheckboxTooltipMessage:"toggleAllCheckboxTooltipMessage",toggleAllCheckboxTooltipPosition:"toggleAllCheckboxTooltipPosition",hideClearSearchButton:"hideClearSearchButton",alwaysRestoreSelectedOptionsMulti:"alwaysRestoreSelectedOptionsMulti"},outputs:{toggleAll:"toggleAll"},features:[ee([{provide:me,useExisting:$(()=>n),multi:!0}])],ngContentSelectors:Fe,decls:13,vars:14,consts:[["innerSelectSearch",""],["searchSelectInput",""],["defaultIcon",""],["defaultNoEntriesFound",""],["matInput","",1,"mat-select-search-input","mat-select-search-hidden"],[1,"mat-select-search-inner","mat-typography","mat-datepicker-content","mat-tab-header",3,"ngClass"],[1,"mat-select-search-inner-row"],["class","mat-select-search-toggle-all-checkbox","matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",3,"color","checked","indeterminate","matTooltip","matTooltipPosition","change",4,"ngIf"],["autocomplete","off",1,"mat-select-search-input",3,"keydown","keyup","blur","type","formControl","placeholder"],["class","mat-select-search-spinner","diameter","16",4,"ngIf"],["mat-icon-button","","aria-label","Clear","class","mat-select-search-clear",3,"click",4,"ngIf"],["class","mat-select-search-no-entries-found",4,"ngIf"],["matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",1,"mat-select-search-toggle-all-checkbox",3,"change","color","checked","indeterminate","matTooltip","matTooltipPosition"],["diameter","16",1,"mat-select-search-spinner"],["mat-icon-button","","aria-label","Clear",1,"mat-select-search-clear",3,"click"],[4,"ngIf","ngIfElse"],[3,"svgIcon"],[1,"mat-select-search-no-entries-found"]],template:function(e,t){if(e&1){let i=M();J(De),y(0,"input",4),u(1,"div",5,0)(3,"div",6),_(4,Ve,1,5,"mat-checkbox",7),u(5,"input",8,1),x("keydown",function(l){return g(i),f(t._handleKeydown(l))})("keyup",function(l){return g(i),f(t._handleKeyup(l))})("blur",function(){return g(i),f(t.onBlur())}),p(),_(7,Re,1,0,"mat-spinner",9)(8,He,4,2,"button",10),v(9),p(),y(10,"mat-divider"),p(),_(11,Qe,4,2,"div",11),ne(12,"async")}e&2&&(c(),s("ngClass",te(11,Le,t.matSelect.multiple,t._isToggleAllCheckboxVisible())),c(3),s("ngIf",t._isToggleAllCheckboxVisible()),c(),s("type",t.type)("formControl",t._formControl)("placeholder",t.placeholderLabel),G("aria-label",t.ariaLabel),c(2),s("ngIf",t.searching),c(),s("ngIf",!t.hideClearSearchButton&&t.value&&!t.searching),c(3),s("ngIf",ie(12,9,t._showNoEntriesFound$)))},dependencies:[ae,le,de,ue,fe,Ce,Ee,be,ve,Oe,he,re],styles:[".mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-select-panel-background-color)}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-inner-row[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-select-panel-background-color);padding:0 44px 0 16px;height:calc(3em - 1px);line-height:calc(3em - 1px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-left:5px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding-top:8px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:0}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:5px}"],changeDetection:0}),n})();var Ht=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=U({type:n}),n.\u0275inj=K({imports:[se,_e,Se,Ae,ye,Ie,ke,pe]}),n})();export{ze as a,jt as b,Ht as c};
