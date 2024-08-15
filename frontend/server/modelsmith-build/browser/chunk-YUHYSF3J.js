import{a as w,b as F}from"./chunk-F2XY3V4F.js";import{a as He}from"./chunk-LYLUD7NS.js";import{a as Ve,b as je}from"./chunk-UHAD5NWO.js";import{a as Me,b as ye}from"./chunk-N4RWJ5LF.js";import{a as E,c as f}from"./chunk-RMGWBHNQ.js";import{a as L,b as R}from"./chunk-LO4ECSBK.js";import{c as Le}from"./chunk-BSHAMTIR.js";import{a as Fe,b as Re}from"./chunk-2E46GXN3.js";import{o as we}from"./chunk-U4U6UPEW.js";import{h as Te}from"./chunk-D3S6HEU5.js";import{$ as te,Ab as pe,Bb as he,E as y,Ea as c,Eb as me,Fa as d,Fb as ue,Gb as de,Ib as G,J as A,K as q,Lb as ge,Q as J,Qa as b,R as X,Ra as ae,Rd as be,S as I,Sa as s,Sb as fe,T as h,Ub as _e,V as O,Xb as Se,Xd as Ie,Yd as Oe,Z as Y,_ as ee,_b as Ce,aa as ie,ab as g,bb as m,be as ve,ca as ne,cb as M,fe as xe,gb as T,ha as N,ia as oe,ie as Ee,j as K,ja as j,jb as P,k,lb as u,mb as se,nb as D,pa as S,pb as W,qa as C,qb as Q,qe as ke,rb as v,s as Z,sb as x,tb as $,te as Ae,ub as B,ue as Ne,vb as le,wb as ce,we as Pe,x as _,xa as H,xe as De,y as z,ya as re}from"./chunk-VYHIF4FK.js";var ct=(()=>{let n=class n{};n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=N({type:n,selectors:[["ms-spining-indicator"]],standalone:!0,features:[he],decls:1,vars:1,consts:[["matTooltip","Task in progress",3,"diameter"]],template:function(o,r){o&1&&M(0,"mat-spinner",0),o&2&&s("diameter",25)},dependencies:[F,w,R,L]});let i=n;return i})();var p=function(i){return i.MODEL_COMPRESSION="MODEL_COMPRESSION",i.MACHINE_UNLEARNING="MACHINE_UNLEARNING",i.MODEL_TRAINING="MODEL_TRAINING",i.AWQ="AWQ",i.MODEL_SPECIALIZATION="MODEL_SPECIALIZATION",i.NONE="NONE",i}(p||{});var Ct=(()=>{let n=class n{get currentRunningPage$(){return this._currentRunningPage.asObservable()}constructor(t){this.scriptFacadeService=t,this._currentRunningPage=new k(p.NONE)}trackCurrentRunningPage(){this.scriptFacadeService.scriptStatus$.pipe(y(t=>t===E.RUNNING||t===E.STOPPING),O(()=>this.scriptFacadeService.dispatch(Fe.getCurrentOrLastActiveScriptDetails())),I(()=>this.scriptFacadeService.scriptDetails$.pipe(J(1),A(1),y(t=>!Le(t?.algKey)))),_(t=>t.type)).subscribe(t=>{switch(t){case f.PRUNING:case f.QUANTIZATION:this._currentRunningPage.next(p.MODEL_COMPRESSION);break;case f.MACHINE_UNLEARNING:{this._currentRunningPage.next(p.MACHINE_UNLEARNING);break}case f.AWQ:{this._currentRunningPage.next(p.AWQ);break}case f.TRAIN:{this._currentRunningPage.next(p.MODEL_TRAINING);break}case f.MULTIFLOW:{this._currentRunningPage.next(p.MODEL_SPECIALIZATION);break}default:{this._currentRunningPage.next(p.NONE);break}}}),this.scriptFacadeService.scriptStatus$.subscribe(t=>{t!==E.RUNNING&&t!==E.STOPPING&&this._currentRunningPage.next(p.NONE)})}};n.\u0275fac=function(o){return new(o||n)(ne(Re))},n.\u0275prov=ee({token:n,factory:n.\u0275fac});let i=n;return i})();var Be=["searchSelectInput"],Ge=["innerSelectSearch"],Ue=[[["",8,"mat-select-search-custom-header-content"]],[["","ngxMatSelectSearchClear",""]],[["","ngxMatSelectNoEntriesFound",""]]],Ke=[".mat-select-search-custom-header-content","[ngxMatSelectSearchClear]","[ngxMatSelectNoEntriesFound]"],Ze=(i,n)=>({"mat-select-search-inner-multiple":i,"mat-select-search-inner-toggle-all":n});function ze(i,n){if(i&1){let e=T();g(0,"mat-checkbox",12),P("change",function(o){S(e);let r=u();return C(r._emitSelectAllBooleanToParent(o.checked))}),m()}if(i&2){let e=u();s("color",e.matFormField==null?null:e.matFormField.color)("checked",e.toggleAllCheckboxChecked)("indeterminate",e.toggleAllCheckboxIndeterminate)("matTooltip",e.toggleAllCheckboxTooltipMessage)("matTooltipPosition",e.toggleAllCheckboxTooltipPosition)}}function qe(i,n){i&1&&M(0,"mat-spinner",13)}function Je(i,n){i&1&&D(0,1,["*ngIf","clearIcon; else defaultIcon"])}function Xe(i,n){if(i&1&&(g(0,"mat-icon",16),B(1),m()),i&2){let e=u(2);s("svgIcon",e.closeSvgIcon),c(),ce(" ",e.closeSvgIcon?null:e.closeIcon," ")}}function Ye(i,n){if(i&1){let e=T();g(0,"button",14),P("click",function(){S(e);let o=u();return C(o._reset(!0))}),b(1,Je,1,0,"ng-content",15)(2,Xe,2,2,"ng-template",null,2,G),m()}if(i&2){let e=$(3),t=u();c(),s("ngIf",t.clearIcon)("ngIfElse",e)}}function et(i,n){i&1&&D(0,2,["*ngIf","noEntriesFound; else defaultNoEntriesFound"])}function tt(i,n){if(i&1&&B(0),i&2){let e=u(2);le(e.noEntriesFoundLabel)}}function it(i,n){if(i&1&&(g(0,"div",17),b(1,et,1,0,"ng-content",15)(2,tt,1,1,"ng-template",null,3,G),m()),i&2){let e=$(3),t=u();c(),s("ngIf",t.noEntriesFound)("ngIfElse",e)}}var nt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=j({type:i,selectors:[["","ngxMatSelectSearchClear",""]]}),i})(),ot=["ariaLabel","clearSearchInput","closeIcon","closeSvgIcon","disableInitialFocus","disableScrollToActiveOnOptionsChanged","enableClearOnEscapePressed","hideClearSearchButton","noEntriesFoundLabel","placeholderLabel","preventHomeEndKeyPropagation","searching"],rt=new ie("mat-selectsearch-default-options"),at=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=j({type:i,selectors:[["","ngxMatSelectNoEntriesFound",""]]}),i})(),ci=(()=>{class i{constructor(e,t,o,r=null,a=null,U){this.matSelect=e,this.changeDetectorRef=t,this._viewportRuler=o,this.matOption=r,this.matFormField=a,this.placeholderLabel="Suche",this.type="text",this.closeIcon="close",this.noEntriesFoundLabel="Keine Optionen gefunden",this.clearSearchInput=!0,this.searching=!1,this.disableInitialFocus=!1,this.enableClearOnEscapePressed=!1,this.preventHomeEndKeyPropagation=!1,this.disableScrollToActiveOnOptionsChanged=!1,this.ariaLabel="dropdown search",this.showToggleAllCheckbox=!1,this.toggleAllCheckboxChecked=!1,this.toggleAllCheckboxIndeterminate=!1,this.toggleAllCheckboxTooltipMessage="",this.toggleAllCheckboxTooltipPosition="below",this.hideClearSearchButton=!1,this.alwaysRestoreSelectedOptionsMulti=!1,this.toggleAll=new re,this.onTouched=l=>{},this._options$=new k(null),this.optionsList$=this._options$.pipe(I(l=>l?l.changes.pipe(_(V=>V.toArray()),X(l.toArray())):Z(null))),this.optionsLength$=this.optionsList$.pipe(_(l=>l?l.length:0)),this._formControl=new xe(""),this._showNoEntriesFound$=z([this._formControl.valueChanges,this.optionsLength$]).pipe(_(([l,V])=>this.noEntriesFoundLabel&&l&&V===this.getOptionsLengthOffset())),this._onDestroy=new K,this.applyDefaultOptions(U)}get value(){return this._formControl.value}set _options(e){this._options$.next(e)}get _options(){return this._options$.getValue()}applyDefaultOptions(e){if(e)for(let t of ot)e.hasOwnProperty(t)&&(this[t]=e[t])}ngOnInit(){this.matOption?(this.matOption.disabled=!0,this.matOption._getHostElement().classList.add("contains-mat-select-search"),this.matOption._getHostElement().setAttribute("aria-hidden","true")):console.error("<ngx-mat-select-search> must be placed inside a <mat-option> element"),this.matSelect.openedChange.pipe(q(1),h(this._onDestroy)).subscribe(e=>{e?(this.updateInputWidth(),this.disableInitialFocus||this._focus()):this.clearSearchInput&&this._reset()}),this.matSelect.openedChange.pipe(A(1),I(e=>{this._options=this.matSelect.options;let t=this._options.toArray()[this.getOptionsLengthOffset()];return this._options.changes.pipe(O(()=>{setTimeout(()=>{let o=this._options.toArray(),r=o[this.getOptionsLengthOffset()],a=this.matSelect._keyManager;a&&this.matSelect.panelOpen&&r&&((!t||!this.matSelect.compareWith(t.value,r.value)||!a.activeItem||!o.find(l=>this.matSelect.compareWith(l.value,a.activeItem.value)))&&a.setActiveItem(this.getOptionsLengthOffset()),setTimeout(()=>{this.updateInputWidth()})),t=r})}))})).pipe(h(this._onDestroy)).subscribe(),this._showNoEntriesFound$.pipe(h(this._onDestroy)).subscribe(e=>{this.matOption&&(e?this.matOption._getHostElement().classList.add("mat-select-search-no-entries-found"):this.matOption._getHostElement().classList.remove("mat-select-search-no-entries-found"))}),this._viewportRuler.change().pipe(h(this._onDestroy)).subscribe(()=>{this.matSelect.panelOpen&&this.updateInputWidth()}),this.initMultipleHandling(),this.optionsList$.pipe(h(this._onDestroy)).subscribe(()=>{this.changeDetectorRef.markForCheck()})}_emitSelectAllBooleanToParent(e){this.toggleAll.emit(e)}ngOnDestroy(){this._onDestroy.next(),this._onDestroy.complete()}_isToggleAllCheckboxVisible(){return this.matSelect.multiple&&this.showToggleAllCheckbox}_handleKeydown(e){(e.key&&e.key.length===1||e.keyCode>=65&&e.keyCode<=90||e.keyCode>=48&&e.keyCode<=57||e.keyCode===32||this.preventHomeEndKeyPropagation&&(e.keyCode===36||e.keyCode===35))&&e.stopPropagation(),this.matSelect.multiple&&e.key&&e.keyCode===13&&setTimeout(()=>this._focus()),this.enableClearOnEscapePressed===!0&&e.keyCode===27&&this.value&&(this._reset(!0),e.stopPropagation())}_handleKeyup(e){if(e.keyCode===38||e.keyCode===40){let t=this.matSelect._getAriaActiveDescendant(),o=this._options.toArray().findIndex(r=>r.id===t);o!==-1&&(this.unselectActiveDescendant(),this.activeDescendant=this._options.toArray()[o]._getHostElement(),this.activeDescendant.setAttribute("aria-selected","true"),this.searchSelectInput.nativeElement.setAttribute("aria-activedescendant",t))}}writeValue(e){this._lastExternalInputValue=e,this._formControl.setValue(e),this.changeDetectorRef.markForCheck()}onBlur(){this.unselectActiveDescendant(),this.onTouched()}registerOnChange(e){this._formControl.valueChanges.pipe(y(t=>t!==this._lastExternalInputValue),O(()=>this._lastExternalInputValue=void 0),h(this._onDestroy)).subscribe(e)}registerOnTouched(e){this.onTouched=e}_focus(){if(!this.searchSelectInput||!this.matSelect.panel)return;let e=this.matSelect.panel.nativeElement,t=e.scrollTop;this.searchSelectInput.nativeElement.focus(),e.scrollTop=t}_reset(e){this._formControl.setValue(""),e&&this._focus()}initMultipleHandling(){if(!this.matSelect.ngControl){this.matSelect.multiple&&console.error("the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true");return}this.previousSelectedValues=this.matSelect.ngControl.value,this.matSelect.ngControl.valueChanges.pipe(h(this._onDestroy)).subscribe(e=>{let t=!1;if(this.matSelect.multiple&&(this.alwaysRestoreSelectedOptionsMulti||this._formControl.value&&this._formControl.value.length)&&this.previousSelectedValues&&Array.isArray(this.previousSelectedValues)){(!e||!Array.isArray(e))&&(e=[]);let o=this.matSelect.options.map(r=>r.value);this.previousSelectedValues.forEach(r=>{!e.some(a=>this.matSelect.compareWith(a,r))&&!o.some(a=>this.matSelect.compareWith(a,r))&&(e.push(r),t=!0)})}this.previousSelectedValues=e,t&&this.matSelect._onChange(e)})}updateInputWidth(){if(!this.innerSelectSearch||!this.innerSelectSearch.nativeElement)return;let e=this.innerSelectSearch.nativeElement,t;for(;e=e.parentElement;)if(e.classList.contains("mat-select-panel")){t=e;break}t&&(this.innerSelectSearch.nativeElement.style.width=t.clientWidth+"px")}getOptionsLengthOffset(){return this.matOption?1:0}unselectActiveDescendant(){this.activeDescendant?.removeAttribute("aria-selected"),this.searchSelectInput.nativeElement.removeAttribute("aria-activedescendant")}}return i.\u0275fac=function(e){return new(e||i)(d(He),d(ge),d(we),d(be,8),d(Te,8),d(rt,8))},i.\u0275cmp=N({type:i,selectors:[["ngx-mat-select-search"]],contentQueries:function(e,t,o){if(e&1&&(W(o,nt,5),W(o,at,5)),e&2){let r;v(r=x())&&(t.clearIcon=r.first),v(r=x())&&(t.noEntriesFound=r.first)}},viewQuery:function(e,t){if(e&1&&(Q(Be,7,H),Q(Ge,7,H)),e&2){let o;v(o=x())&&(t.searchSelectInput=o.first),v(o=x())&&(t.innerSelectSearch=o.first)}},inputs:{placeholderLabel:"placeholderLabel",type:"type",closeIcon:"closeIcon",closeSvgIcon:"closeSvgIcon",noEntriesFoundLabel:"noEntriesFoundLabel",clearSearchInput:"clearSearchInput",searching:"searching",disableInitialFocus:"disableInitialFocus",enableClearOnEscapePressed:"enableClearOnEscapePressed",preventHomeEndKeyPropagation:"preventHomeEndKeyPropagation",disableScrollToActiveOnOptionsChanged:"disableScrollToActiveOnOptionsChanged",ariaLabel:"ariaLabel",showToggleAllCheckbox:"showToggleAllCheckbox",toggleAllCheckboxChecked:"toggleAllCheckboxChecked",toggleAllCheckboxIndeterminate:"toggleAllCheckboxIndeterminate",toggleAllCheckboxTooltipMessage:"toggleAllCheckboxTooltipMessage",toggleAllCheckboxTooltipPosition:"toggleAllCheckboxTooltipPosition",hideClearSearchButton:"hideClearSearchButton",alwaysRestoreSelectedOptionsMulti:"alwaysRestoreSelectedOptionsMulti"},outputs:{toggleAll:"toggleAll"},features:[pe([{provide:Ie,useExisting:Y(()=>i),multi:!0}])],ngContentSelectors:Ke,decls:13,vars:14,consts:[["innerSelectSearch",""],["searchSelectInput",""],["defaultIcon",""],["defaultNoEntriesFound",""],["matInput","",1,"mat-select-search-input","mat-select-search-hidden"],[1,"mat-select-search-inner","mat-typography","mat-datepicker-content","mat-tab-header",3,"ngClass"],[1,"mat-select-search-inner-row"],["class","mat-select-search-toggle-all-checkbox","matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",3,"color","checked","indeterminate","matTooltip","matTooltipPosition","change",4,"ngIf"],["autocomplete","off",1,"mat-select-search-input",3,"keydown","keyup","blur","type","formControl","placeholder"],["class","mat-select-search-spinner","diameter","16",4,"ngIf"],["mat-icon-button","","aria-label","Clear","class","mat-select-search-clear",3,"click",4,"ngIf"],["class","mat-select-search-no-entries-found",4,"ngIf"],["matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",1,"mat-select-search-toggle-all-checkbox",3,"change","color","checked","indeterminate","matTooltip","matTooltipPosition"],["diameter","16",1,"mat-select-search-spinner"],["mat-icon-button","","aria-label","Clear",1,"mat-select-search-clear",3,"click"],[4,"ngIf","ngIfElse"],[3,"svgIcon"],[1,"mat-select-search-no-entries-found"]],template:function(e,t){if(e&1){let o=T();se(Ue),M(0,"input",4),g(1,"div",5,0)(3,"div",6),b(4,ze,1,5,"mat-checkbox",7),g(5,"input",8,1),P("keydown",function(a){return S(o),C(t._handleKeydown(a))})("keyup",function(a){return S(o),C(t._handleKeyup(a))})("blur",function(){return S(o),C(t.onBlur())}),m(),b(7,qe,1,0,"mat-spinner",9)(8,Ye,4,2,"button",10),D(9),m(),M(10,"mat-divider"),m(),b(11,it,4,2,"div",11),ue(12,"async")}e&2&&(c(),s("ngClass",me(11,Ze,t.matSelect.multiple,t._isToggleAllCheckboxVisible())),c(3),s("ngIf",t._isToggleAllCheckboxVisible()),c(),s("type",t.type)("formControl",t._formControl)("placeholder",t.placeholderLabel),ae("aria-label",t.ariaLabel),c(2),s("ngIf",t.searching),c(),s("ngIf",!t.hideClearSearchButton&&t.value&&!t.searching),c(3),s("ngIf",de(12,9,t._showNoEntriesFound$)))},dependencies:[fe,_e,Oe,ve,Ee,Ae,Ve,Pe,w,L,Me,Se],styles:[".mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-select-panel-background-color)}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-inner-row[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-select-panel-background-color);padding:0 44px 0 16px;height:calc(3em - 1px);line-height:calc(3em - 1px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-left:5px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding-top:8px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:0}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:5px}"],changeDetection:0}),i})();var pi=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=oe({type:i}),i.\u0275inj=te({imports:[Ce,ke,Ne,je,De,F,R,ye]}),i})();export{ct as a,p as b,Ct as c,rt as d,ci as e,pi as f};
