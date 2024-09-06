import{c as Be,p as Ne,r as He,s as P,v as Ye}from"./chunk-W4S57J6B.js";import{$ as _e,Ab as Pe,Bb as ae,Bd as le,D as S,Dd as Fe,E as g,Ea as $,Fa as r,Ga as J,Hd as ce,J as W,K as G,Ka as ee,Lb as k,Ld as je,Ma as Me,Md as Le,Na as ye,Nb as R,Pa as te,Qa as ie,Qb as Ee,R as x,Ra as y,S as K,Sa as ne,T as A,Ua as Ie,Wa as Ce,Ya as we,_b as De,a as E,aa as v,ab as I,b as pe,bb as L,cb as se,da as O,g as D,gb as ke,ha as Z,ia as fe,j as T,ja as ge,jb as B,kd as Te,lb as c,m as Q,mb as oe,nb as N,pa as b,pb as H,pd as Se,qa as M,qb as Re,ra as ve,rb as C,s as X,sb as w,sc as re,tc as Y,va as q,wc as u,xa as F,xc as me,xd as xe,ya as j,yd as Ae,za as be,zc as V,zd as Oe}from"./chunk-64NP6AY6.js";var qe=["mat-menu-item",""],$e=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],Je=["mat-icon, [matMenuItemIcon]","*"];function et(a,o){a&1&&(ve(),I(0,"svg",2),se(1,"polygon",3),L())}var tt=["*"];function it(a,o){if(a&1){let m=ke();I(0,"div",0),B("keydown",function(t){b(m);let i=c();return M(i._handleKeydown(t))})("click",function(){b(m);let t=c();return M(t.closed.emit("click"))})("@transformMenu.start",function(t){b(m);let i=c();return M(i._onAnimationStart(t))})("@transformMenu.done",function(t){b(m);let i=c();return M(i._onAnimationDone(t))}),I(1,"div",1),N(2),L()()}if(a&2){let m=c();Ce(m._classList),ne("id",m.panelId)("@transformMenu",m._panelAnimationState),y("aria-label",m.ariaLabel||null)("aria-labelledby",m.ariaLabelledby||null)("aria-describedby",m.ariaDescribedby||null)}}var de=new v("MAT_MENU_PANEL"),ue=(()=>{let o=class o{constructor(e,t,i,n,s){this._elementRef=e,this._document=t,this._focusMonitor=i,this._parentMenu=n,this._changeDetectorRef=s,this.role="menuitem",this.disabled=!1,this.disableRipple=!1,this._hovered=new T,this._focused=new T,this._highlighted=!1,this._triggersSubmenu=!1,n?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef?.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef?.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}};o.\u0275fac=function(t){return new(t||o)(r(F),r(Ee),r(le),r(de,8),r(k))},o.\u0275cmp=Z({type:o,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-mdc-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&B("click",function(s){return i._checkDisabled(s)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(y("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),Ie("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",R],disableRipple:[2,"disableRipple","disableRipple",R]},exportAs:["matMenuItem"],standalone:!0,features:[te,ae],attrs:qe,ngContentSelectors:Je,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(oe($e),N(0),I(1,"span",0),N(2,1),L(),se(3,"div",1),ie(4,et,2,0,":svg:svg",2)),t&2&&($(3),ne("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),$(),we(i._triggersSubmenu?4:-1))},dependencies:[je],encapsulation:2,changeDetection:0});let a=o;return a})();var nt=new v("MatMenuContent");var U={transformMenu:re("transformMenu",[me("void",u({opacity:0,transform:"scale(0.8)"})),V("void => enter",Y("120ms cubic-bezier(0, 0, 0.2, 1)",u({opacity:1,transform:"scale(1)"}))),V("* => void",Y("100ms 25ms linear",u({opacity:0})))]),fadeInItems:re("fadeInItems",[me("showing",u({opacity:1})),V("void => *",[u({opacity:0}),Y("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])},Yt=U.fadeInItems,Vt=U.transformMenu,st=0,ot=new v("mat-menu-default-options",{providedIn:"root",factory:at});function at(){return{overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"}}var z=(()=>{let o=class o{get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}set panelClass(e){let t=this._previousPanelClass,i=E({},this._classList);t&&t.length&&t.split(" ").forEach(n=>{i[n]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(n=>{i[n]=!0}),this._elementRef.nativeElement.className=""),this._classList=i}get classList(){return this.panelClass}set classList(e){this.panelClass=e}constructor(e,t,i,n){this._elementRef=e,this._changeDetectorRef=n,this._elevationPrefix="mat-elevation-z",this._baseElevation=null,this._directDescendantItems=new be,this._classList={},this._panelAnimationState="void",this._animationDone=new T,this.closed=new j,this.close=this.closed,this.panelId=`mat-menu-panel-${st++}`,this._injector=O(q),this.overlayPanelClass=i.overlayPanelClass||"",this._xPosition=i.xPosition,this._yPosition=i.yPosition,this.backdropClass=i.backdropClass,this.overlapTrigger=i.overlapTrigger,this.hasBackdrop=i.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new xe(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(x(this._directDescendantItems),K(e=>S(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),n=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[n]&&!i[n].disabled?t.setActiveItem(n):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy()}_hovered(){return this._directDescendantItems.changes.pipe(x(this._directDescendantItems),K(t=>S(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:Se(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}e.stopPropagation()}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Me(()=>{let t=null;if(this._directDescendantItems.length&&(t=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){if(this._baseElevation===null){let l=(typeof getComputedStyle=="function"?getComputedStyle(this._elementRef.nativeElement):null)?.getPropertyValue("--mat-menu-base-elevation-level")||"8";this._baseElevation=parseInt(l)}let t=Math.min(this._baseElevation+e,24),i=`${this._elevationPrefix}${t}`,n=Object.keys(this._classList).find(s=>s.startsWith(this._elevationPrefix));if(!n||n===this._previousElevation){let s=E({},this._classList);this._previousElevation&&(s[this._previousElevation]=!1),s[i]=!0,this._previousElevation=i,this._classList=s}}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=pe(E({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef?.markForCheck()}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(e){this._animationDone.next(e),this._isAnimating=!1}_onAnimationStart(e){this._isAnimating=!0,e.toState==="enter"&&this._keyManager.activeItemIndex===0&&(e.element.scrollTop=0)}_updateDirectDescendants(){this._allItems.changes.pipe(x(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}};o.\u0275fac=function(t){return new(t||o)(r(F),r(ee),r(ot),r(k))},o.\u0275cmp=Z({type:o,selectors:[["mat-menu"]],contentQueries:function(t,i,n){if(t&1&&(H(n,nt,5),H(n,ue,5),H(n,ue,4)),t&2){let s;C(s=w())&&(i.lazyContent=s.first),C(s=w())&&(i._allItems=s),C(s=w())&&(i.items=s)}},viewQuery:function(t,i){if(t&1&&Re(J,5),t&2){let n;C(n=w())&&(i.templateRef=n.first)}},hostVars:3,hostBindings:function(t,i){t&2&&y("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",R],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:R(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],standalone:!0,features:[Pe([{provide:de,useExisting:o}]),te,ae],ngContentSelectors:tt,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel","mat-mdc-elevation-specific",3,"keydown","click","id"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(oe(),ie(0,it,3,7,"ng-template"))},styles:['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;outline:0}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font);line-height:var(--mat-menu-item-label-text-line-height);font-size:var(--mat-menu-item-label-text-size);letter-spacing:var(--mat-menu-item-label-text-tracking);font-weight:var(--mat-menu-item-label-text-weight)}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;outline:0;border-radius:var(--mat-menu-container-shape);background-color:var(--mat-menu-container-color);will-change:transform,opacity}.mat-mdc-menu-panel.ng-animating{pointer-events:none}.mat-mdc-menu-panel.ng-animating:has(.mat-mdc-menu-content:empty){display:none}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-mdc-menu-panel .mat-divider{color:var(--mat-menu-divider-color);margin-bottom:var(--mat-menu-divider-bottom-spacing);margin-top:var(--mat-menu-divider-top-spacing)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mat-menu-item-leading-spacing);padding-right:var(--mat-menu-item-trailing-spacing);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;min-height:48px}[dir=rtl] .mat-mdc-menu-item{padding-right:var(--mat-menu-item-leading-spacing);padding-left:var(--mat-menu-item-trailing-spacing)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing);padding-right:var(--mat-menu-item-with-icon-trailing-spacing)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-right:var(--mat-menu-item-with-icon-leading-spacing);padding-left:var(--mat-menu-item-with-icon-trailing-spacing)}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color)}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color)}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item:focus{outline:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing);height:var(--mat-menu-item-icon-size);width:var(--mat-menu-item-icon-size)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color)}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color)}.cdk-high-contrast-active .mat-mdc-menu-item{margin-top:1px}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1)}.cdk-high-contrast-active .mat-mdc-menu-submenu-icon{fill:CanvasText}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}'],encapsulation:2,data:{animation:[U.transformMenu,U.fadeInItems]},changeDetection:0});let a=o;return a})(),Qe=new v("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let a=O(P);return()=>a.scrollStrategies.reposition()}});function rt(a){return()=>a.scrollStrategies.reposition()}var mt={provide:Qe,deps:[P],useFactory:rt},Ve=Te({passive:!0});var zt=(()=>{let o=class o{get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){e!==this._menu&&(this._menu=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this.triggersSubmenu()))}constructor(e,t,i,n,s,l,d,h,p){this._overlay=e,this._element=t,this._viewContainerRef=i,this._menuItemInstance=l,this._dir=d,this._focusMonitor=h,this._ngZone=p,this._overlayRef=null,this._menuOpen=!1,this._closingActionsSubscription=D.EMPTY,this._hoverSubscription=D.EMPTY,this._menuCloseSubscription=D.EMPTY,this._changeDetectorRef=O(k),this._handleTouchStart=_=>{Oe(_)||(this._openedBy="touch")},this._openedBy=void 0,this.restoreFocus=!0,this.menuOpened=new j,this.onMenuOpen=this.menuOpened,this.menuClosed=new j,this.onMenuClose=this.menuClosed,this._scrollStrategy=n,this._parentMaterialMenu=s instanceof z?s:void 0,t.nativeElement.addEventListener("touchstart",this._handleTouchStart,Ve)}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._element.nativeElement.removeEventListener("touchstart",this._handleTouchStart,Ve),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._hoverSubscription.unsubscribe()}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this.menu)}toggleMenu(){return this._menuOpen?this.closeMenu():this.openMenu()}openMenu(){let e=this.menu;if(this._menuOpen||!e)return;let t=this._createOverlay(e),i=t.getConfig(),n=i.positionStrategy;this._setPosition(e,n),i.hasBackdrop=e.hasBackdrop==null?!this.triggersSubmenu():e.hasBackdrop,t.attach(this._getPortal(e)),e.lazyContent&&e.lazyContent.attach(this.menuData),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this.closeMenu()),this._initMenu(e),e instanceof z&&(e._startAnimation(),e._directDescendantItems.changes.pipe(A(e.close)).subscribe(()=>{n.withLockedPosition(!1).reapplyLastPosition(),n.withLockedPosition(!0)}))}closeMenu(){this.menu?.close.emit()}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}updatePosition(){this._overlayRef?.updatePosition()}_destroyMenu(e){if(!this._overlayRef||!this.menuOpen)return;let t=this.menu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this.triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,t instanceof z?(t._resetAnimation(),t.lazyContent?t._animationDone.pipe(g(i=>i.toState==="void"),W(1),A(t.lazyContent._attached)).subscribe({next:()=>t.lazyContent.detach(),complete:()=>this._setIsMenuOpen(!1)}):this._setIsMenuOpen(!1)):(this._setIsMenuOpen(!1),t?.lazyContent?.detach())}_initMenu(e){e.parentMenu=this.triggersSubmenu()?this._parentMaterialMenu:void 0,e.direction=this.dir,this._setMenuElevation(e),e.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0)}_setMenuElevation(e){if(e.setElevation){let t=0,i=e.parentMenu;for(;i;)t++,i=i.parentMenu;e.setElevation(t)}}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this.triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=this._overlay.create(t),this._overlayRef.keydownEvents().subscribe()}return this._overlayRef}_getOverlayConfig(e){return new He({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{let n=i.connectionPair.overlayX==="start"?"after":"before",s=i.connectionPair.overlayY==="top"?"below":"above";this._ngZone?this._ngZone.run(()=>e.setPositionClasses(n,s)):e.setPositionClasses(n,s)})}_setPosition(e,t){let[i,n]=e.xPosition==="before"?["end","start"]:["start","end"],[s,l]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[d,h]=[s,l],[p,_]=[i,n],f=0;if(this.triggersSubmenu()){if(_=i=e.xPosition==="before"?"start":"end",n=p=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let he=this._parentMaterialMenu.items.first;this._parentInnerPadding=he?he._getHostElement().offsetTop:0}f=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(d=s==="top"?"bottom":"top",h=l==="top"?"bottom":"top");t.withPositions([{originX:i,originY:d,overlayX:p,overlayY:s,offsetY:f},{originX:n,originY:d,overlayX:_,overlayY:s,offsetY:f},{originX:i,originY:h,overlayX:p,overlayY:l,offsetY:-f},{originX:n,originY:h,overlayX:_,overlayY:l,offsetY:-f}])}_menuClosingActions(){let e=this._overlayRef.backdropClick(),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:X(),n=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(g(s=>s!==this._menuItemInstance),g(()=>this._menuOpen)):X();return S(e,i,n,t)}_handleMousedown(e){Ae(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){!this.triggersSubmenu()||!this._parentMaterialMenu||(this._hoverSubscription=this._parentMaterialMenu._hovered().pipe(g(e=>e===this._menuItemInstance&&!e.disabled),G(0,Q)).subscribe(()=>{this._openedBy="mouse",this.menu instanceof z&&this.menu._isAnimating?this.menu._animationDone.pipe(W(1),G(0,Q),A(this._parentMaterialMenu._hovered())).subscribe(()=>this.openMenu()):this.openMenu()}))}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new Be(e.templateRef,this._viewContainerRef)),this._portal}};o.\u0275fac=function(t){return new(t||o)(r(P),r(F),r(ye),r(Qe),r(de,8),r(ue,10),r(Fe,8),r(le),r(ee))},o.\u0275dir=ge({type:o,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&B("click",function(s){return i._handleClick(s)})("mousedown",function(s){return i._handleMousedown(s)})("keydown",function(s){return i._handleKeydown(s)}),t&2&&y("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],standalone:!0});let a=o;return a})(),Ut=(()=>{let o=class o{};o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=fe({type:o}),o.\u0275inj=_e({providers:[mt],imports:[De,Le,ce,Ye,Ne,ce]});let a=o;return a})();export{ue as a,z as b,zt as c,Ut as d};
