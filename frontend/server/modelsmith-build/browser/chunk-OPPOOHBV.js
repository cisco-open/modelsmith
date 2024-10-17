import{b as ft,c as Wt,d as Kt,e as gt,r as Xt,s as Zt}from"./chunk-I6FC4BFI.js";import{$ as st,$a as x,$c as Lt,Ab as H,B as bt,Be as J,D as vt,Da as I,Ea as b,F,Fa as wt,Gc as o,Hc as D,Ic as S,Ja as Dt,Kb as Mt,Na as Et,Pa as G,Pb as Bt,Qa as Pt,R as M,Rc as _,S as xt,Sc as d,Vc as f,Wc as Z,Xa as W,Xc as B,Yc as Y,Z as l,Zc as O,a as p,ab as v,ad as g,b as h,ba as s,bb as $,ca as kt,f as Ct,fb as Tt,ga as L,hb as jt,hc as Ot,hd as zt,ia as V,ib as K,j as A,jb as Rt,k as _t,kb as ot,kc as Ut,oa as yt,pa as At,pb as ct,qb as lt,qd as Gt,qe as Qt,rb as mt,rc as Nt,rd as $t,s as j,sc as ut,tb as w,ua as z,ub as Ft,vb as pt,vc as X,ve as qt,w as R,wa as It,wc as ht,we as Vt,yc as dt,ye as St,zd as Ht,ze as k}from"./chunk-CQN7FGIC.js";var Yt=D({source:"[Core -> Script]",events:{"Call Script":o(),"Call Script Success":S(),"Call Script Failure":o(),"Fetch Script Status":S(),"Update Script Status":o(),"Fetch Script Status Success":o(),"Fetch Script Status Failure":o(),"Stop Script":S(),"Stop Script Success":S(),"Stop Script Failure":o(),"Get Current or Last Active Script Details":S(),"Get Current or Last Active Script Details Success":o(),"Get Current or Last Active Script Details Failure":o(),"Execute Command":o(),"Execute Command Success":S(),"Execute Command Failure":o()}});var Jt=d(g,i=>i.script.scriptStatus),te=d(g,i=>i.script.scriptDetails);var ee=(()=>{let t=class t{constructor(e){this.store=e,this.scriptStatus$=this.store.select(Jt),this.scriptDetails$=this.store.select(te)}dispatch(e){this.store.dispatch(e)}};t.\u0275fac=function(n){return new(n||t)(s(_))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var E=function(i){return i.SUCCESS="success",i.ERROR="error",i.INFO="info",i.WARNING="warning",i}(E||{});function be(i,t){if(i&1){let P=Tt();x(0,"div",1)(1,"button",2),K("click",function(){yt(P);let n=ot();return At(n.action())}),w(2),v()()}if(i&2){let P=ot();I(2),pt(" ",P.data.action," ")}}var ve=["label"];function xe(i,t){}var ke=Math.pow(2,31)-1,U=class{constructor(t,P){this._overlayRef=P,this._afterDismissed=new A,this._afterOpened=new A,this._onAction=new A,this._dismissedByAction=!1,this.containerInstance=t,t._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(t){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(t,ke))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},tt=new st("MatSnackBarData"),N=class{constructor(){this.politeness="assertive",this.announcementMessage="",this.duration=0,this.data=null,this.horizontalPosition="center",this.verticalPosition="bottom"}},ye=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=V({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"],standalone:!0});let i=t;return i})(),Ae=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=V({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"],standalone:!0});let i=t;return i})(),Ie=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=V({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"],standalone:!0});let i=t;return i})(),we=(()=>{let t=class t{constructor(e,n){this.snackBarRef=e,this.data=n}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}};t.\u0275fac=function(n){return new(n||t)(b(U),b(tt))},t.\u0275cmp=L({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],standalone:!0,features:[H],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["mat-button","","matSnackBarAction","",3,"click"]],template:function(n,r){n&1&&(x(0,"div",0),w(1),v(),G(2,be,3,1,"div",1)),n&2&&(I(),pt(" ",r.data.message,`
`),I(),W(r.hasAction?2:-1))},dependencies:[Qt,ye,Ae,Ie],styles:[".mat-mdc-simple-snack-bar{display:flex}"],encapsulation:2,changeDetection:0});let i=t;return i})(),De={snackBarState:Nt("state",[ht("void, hidden",X({transform:"scale(0.8)",opacity:0})),ht("visible",X({transform:"scale(1)",opacity:1})),dt("* => visible",ut("150ms cubic-bezier(0, 0, 0.2, 1)")),dt("* => void, * => hidden",ut("75ms cubic-bezier(0.4, 0.0, 1, 1)",X({opacity:0})))])},Ee=0,Pe=(()=>{let t=class t extends Kt{constructor(e,n,r,a,c){super(),this._ngZone=e,this._elementRef=n,this._changeDetectorRef=r,this._platform=a,this.snackBarConfig=c,this._document=kt(Bt),this._trackedModals=new Set,this._announceDelay=150,this._destroyed=!1,this._onAnnounce=new A,this._onExit=new A,this._onEnter=new A,this._animationState="void",this._liveElementId=`mat-snack-bar-container-live-${Ee++}`,this.attachDomPortal=u=>{this._assertNotAttached();let T=this._portalOutlet.attachDomPortal(u);return this._afterPortalAttached(),T},c.politeness==="assertive"&&!c.announcementMessage?this._live="assertive":c.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let n=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),n}attachTemplatePortal(e){this._assertNotAttached();let n=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),n}onAnimationEnd(e){let{fromState:n,toState:r}=e;if((r==="void"&&n!=="void"||r==="hidden")&&this._completeExit(),r==="visible"){let a=this._onEnter;this._ngZone.run(()=>{a.next(),a.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId)}),this._onExit}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,n=this.snackBarConfig.panelClass;n&&(Array.isArray(n)?n.forEach(c=>e.classList.add(c)):e.classList.add(n)),this._exposeToModals();let r=this._label.nativeElement,a="mdc-snackbar__label";r.classList.toggle(a,!r.querySelector(`.${a}`))}_exposeToModals(){let e=this._liveElementId,n=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<n.length;r++){let a=n[r],c=a.getAttribute("aria-owns");this._trackedModals.add(a),c?c.indexOf(e)===-1&&a.setAttribute("aria-owns",c+" "+e):a.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let n=e.getAttribute("aria-owns");if(n){let r=n.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{let e=this._elementRef.nativeElement.querySelector("[aria-hidden]"),n=this._elementRef.nativeElement.querySelector("[aria-live]");if(e&&n){let r=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&e.contains(document.activeElement)&&(r=document.activeElement),e.removeAttribute("aria-hidden"),n.appendChild(e),r?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}};t.\u0275fac=function(n){return new(n||t)(b(Dt),b(It),b(Mt),b(zt),b(N))},t.\u0275cmp=L({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(n,r){if(n&1&&(ct(gt,7),ct(ve,7)),n&2){let a;lt(a=mt())&&(r._portalOutlet=a.first),lt(a=mt())&&(r._label=a.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:1,hostBindings:function(n,r){n&1&&Rt("@state.done",function(c){return r.onAnimationEnd(c)}),n&2&&jt("@state",r._animationState)},standalone:!0,features:[Et,H],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(n,r){n&1&&(x(0,"div",1)(1,"div",2,0)(3,"div",3),G(4,xe,0,0,"ng-template",4),v(),$(5,"div"),v()()),n&2&&(I(5),Pt("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[gt],styles:[".mat-mdc-snack-bar-container{display:flex;align-items:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);margin:8px}.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container{width:100vw}.mat-mdc-snackbar-surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;padding-left:0;padding-right:8px}[dir=rtl] .mat-mdc-snackbar-surface{padding-right:0;padding-left:8px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{min-width:344px;max-width:672px}.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface{width:100%;min-width:0}.cdk-high-contrast-active .mat-mdc-snackbar-surface{outline:solid 1px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{color:var(--mdc-snackbar-supporting-text-color);border-radius:var(--mdc-snackbar-container-shape);background-color:var(--mdc-snackbar-container-color)}.mdc-snackbar__label{width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding:14px 8px 14px 16px}[dir=rtl] .mdc-snackbar__label{padding-left:8px;padding-right:16px}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-family:var(--mdc-snackbar-supporting-text-font);font-size:var(--mdc-snackbar-supporting-text-size);font-weight:var(--mdc-snackbar-supporting-text-weight);line-height:var(--mdc-snackbar-supporting-text-line-height)}.mat-mdc-snack-bar-actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-snack-bar-button-color);--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}"],encapsulation:2,data:{animation:[De.snackBarState]}});let i=t;return i})();function Te(){return new N}var je=new st("mat-snack-bar-default-options",{providedIn:"root",factory:Te}),ie=(()=>{let t=class t{get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(e,n,r,a,c,u){this._overlay=e,this._live=n,this._injector=r,this._breakpointObserver=a,this._parentSnackBar=c,this._defaultConfig=u,this._snackBarRefAtThisLevel=null,this.simpleSnackBarComponent=we,this.snackBarContainerComponent=Pe,this.handsetCssClass="mat-mdc-snack-bar-handset"}openFromComponent(e,n){return this._attach(e,n)}openFromTemplate(e,n){return this._attach(e,n)}open(e,n="",r){let a=p(p({},this._defaultConfig),r);return a.data={message:e,action:n},a.announcementMessage===e&&(a.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,a)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,n){let r=n&&n.viewContainerRef&&n.viewContainerRef.injector,a=z.create({parent:r||this._injector,providers:[{provide:N,useValue:n}]}),c=new ft(this.snackBarContainerComponent,n.viewContainerRef,a),u=e.attach(c);return u.instance.snackBarConfig=n,u.instance}_attach(e,n){let r=p(p(p({},new N),this._defaultConfig),n),a=this._createOverlay(r),c=this._attachSnackBarContainer(a,r),u=new U(c,a);if(e instanceof wt){let T=new Wt(e,null,{$implicit:r.data,snackBarRef:u});u.instance=c.attachTemplatePortal(T)}else{let T=this._createInjector(r,u),Se=new ft(e,void 0,T),Ce=c.attachComponentPortal(Se);u.instance=Ce.instance}return this._breakpointObserver.observe($t.HandsetPortrait).pipe(xt(a.detachments())).subscribe(T=>{a.overlayElement.classList.toggle(this.handsetCssClass,T.matches)}),r.announcementMessage&&c._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(u,r),this._openedSnackBarRef=u,this._openedSnackBarRef}_animateSnackBar(e,n){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),n.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter(),n.duration&&n.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(n.duration))}_createOverlay(e){let n=new Xt;n.direction=e.direction;let r=this._overlay.position().global(),a=e.direction==="rtl",c=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!a||e.horizontalPosition==="end"&&a,u=!c&&e.horizontalPosition!=="center";return c?r.left("0"):u?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),n.positionStrategy=r,this._overlay.create(n)}_createInjector(e,n){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return z.create({parent:r||this._injector,providers:[{provide:U,useValue:n},{provide:tt,useValue:e.data}]})}};t.\u0275fac=function(n){return new(n||t)(s(Zt),s(Ht),s(z),s(Gt),s(t,12),s(je))},t.\u0275prov=l({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();function Re(i,t){i&1&&$(0,"mat-icon",3)}function Fe(i,t){i&1&&$(0,"mat-icon",4)}function Me(i,t){i&1&&(x(0,"mat-icon",5),w(1,"error_outline"),v())}function Be(i,t){i&1&&(x(0,"mat-icon",6),w(1,"warning"),v())}var re=(()=>{let t=class t{constructor(e,n){this.bannerRef=e,this.data=n,this.NotificationTypes=E}};t.\u0275fac=function(n){return new(n||t)(b(U),b(tt))},t.\u0275cmp=L({type:t,selectors:[["ms-banner"]],standalone:!0,features:[H],decls:13,vars:2,consts:[[1,"banner"],[1,"banner-left-container"],[1,"banner-content"],["fontSet","ms","fontIcon","icon-CheckCircle",1,"mat-success"],["fontSet","ms","fontIcon","icon-Info",1,"mat-primary"],[1,"mat-error"],[1,"mat-warn"],[1,"banner-middle-container"],[1,"banner-right-container"],[1,"mat-gray",3,"click"]],template:function(n,r){if(n&1&&(x(0,"div",0)(1,"div",1)(2,"div",2),G(3,Re,1,0,"mat-icon",3)(4,Fe,1,0,"mat-icon",4)(5,Me,2,0,"mat-icon",5)(6,Be,2,0,"mat-icon",6),v()(),x(7,"div",7)(8,"div"),w(9),v()(),x(10,"div",8)(11,"mat-icon",9),K("click",function(){return r.bannerRef.dismiss()}),w(12,"clear"),v()()()),n&2){let a;I(3),W((a=r.data.notificationType)===r.NotificationTypes.SUCCESS?3:a===r.NotificationTypes.INFO?4:a===r.NotificationTypes.ERROR?5:a===r.NotificationTypes.WARNING?6:-1),I(6),Ft(r.data.message)}},dependencies:[Vt,qt],styles:[".banner[_ngcontent-%COMP%]{display:flex;width:100%}.banner[_ngcontent-%COMP%]   .banner-left-container[_ngcontent-%COMP%]{flex:0 1 5%}.banner[_ngcontent-%COMP%]   .banner-middle-container[_ngcontent-%COMP%]{flex:0 1 90%;margin:2px 10px}.banner[_ngcontent-%COMP%]   .banner-right-container[_ngcontent-%COMP%]{flex:0 1 5%}.banner[_ngcontent-%COMP%]   .banner-right-container[_ngcontent-%COMP%]:hover{cursor:pointer}"]});let i=t;return i})();var Oe=5e3,ae=5e3,Ue=1e4,se=(()=>{let t=class t{constructor(e){this.snackbar=e}showSuccess(e){this.showBanner(e,E.SUCCESS,Oe,"notification-panel-success")}showInfo(e){this.showBanner(e,E.INFO,ae,"notification-panel-info")}showError(e){this.showBanner(e,E.ERROR,Ue,"notification-panel-error")}showWarning(e){this.showBanner(e,E.WARNING,ae,"notification-panel-warning")}showBanner(e,n,r,a){this.snackbar.openFromComponent(re,{duration:r,data:{message:e,notificationType:n},panelClass:a})}};t.\u0275fac=function(n){return new(n||t)(s(ie))},t.\u0275prov=l({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var m=D({source:"[Core -> Charts]",events:{"Get Current Pruning Chart Data":S(),"Get Current Pruning Chart Data Success":o(),"Get Current Pruning Chart Data Failure":o(),"Get Current Quantization Chart Data":S(),"Get Current Quantization Chart Data Success":o(),"Get Current Quantization Chart Data Failure":o(),"Get Current Machine Unlearning Chart Data":S(),"Get Current Machine Unlearning Chart Data Success":o(),"Get Current Machine Unlearning Chart Data Failure":o(),"Get Chart Configuration Settings":o(),"Get Chart Configuration Settings Success":o(),"Get Chart Configuration Settings Failure":o()}});var et=class extends k{constructor(t){let P=`type=${t.join(",")}`;super(`chart-configuration-settings?${P}`,void 0,void 0,!1)}};var it=class extends k{constructor(){super("current-machine-unlearning-chart-data",void 0,void 0,!1)}};var nt=class extends k{constructor(){super("current-pruning-chart-data",void 0,void 0,!1)}};var rt=class extends k{constructor(){super("current-quantization-chart-data",void 0,void 0,!1)}};var tn=(()=>{let t=class t{constructor(e,n){this.apiClient=e,this.actions$=n,this.getCurrentPruningChartData$=B(()=>this.actions$.pipe(O(m.getCurrentPruningChartData),M(()=>this.apiClient.serviceCall(new nt).pipe(R(r=>m.getCurrentPruningChartDataSuccess({pruningProgress:r})),F(r=>j(m.getCurrentPruningChartDataFailure({error:r}))))))),this.getCurrentQuantizationChartData$=B(()=>this.actions$.pipe(O(m.getCurrentQuantizationChartData),M(()=>this.apiClient.serviceCall(new rt).pipe(R(r=>m.getCurrentQuantizationChartDataSuccess({quantizationProgress:r})),F(r=>j(m.getCurrentQuantizationChartDataFailure({error:r}))))))),this.getCurrentMachineUnlearningChartData$=B(()=>this.actions$.pipe(O(m.getCurrentMachineUnlearningChartData),M(()=>this.apiClient.serviceCall(new it).pipe(R(r=>m.getCurrentMachineUnlearningChartDataSuccess({machineUnlearningProgress:r})),F(r=>j(m.getCurrentMachineUnlearningChartDataFailure({error:r}))))))),this.getChartConfigurationSettings$=B(()=>this.actions$.pipe(O(m.getChartConfigurationSettings),M(r=>this.apiClient.serviceCall(new et(r.chartTypes)).pipe(R(a=>m.getChartConfigurationSettingsSuccess({settings:a})),F(a=>j(m.getChartConfigurationSettingsFailure({error:a})))))))}};t.\u0275fac=function(n){return new(n||t)(s(J),s(Y))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var ze={pruningProgress:[],machineUnlearningProgress:void 0,quantizationProgress:void 0,settings:{},error:null},an=Z(ze,f(m.getCurrentPruningChartDataSuccess,(i,{pruningProgress:t})=>h(p({},i),{pruningProgress:t,machineUnlearningProgress:void 0,quantizationProgress:void 0,error:null})),f(m.getCurrentPruningChartDataFailure,(i,{error:t})=>h(p({},i),{pruningProgress:[],error:t})),f(m.getCurrentQuantizationChartDataSuccess,(i,{quantizationProgress:t})=>h(p({},i),{pruningProgress:[],quantizationProgress:t,machineUnlearningProgress:void 0,error:null})),f(m.getCurrentQuantizationChartDataFailure,(i,{error:t})=>h(p({},i),{quantizationProgress:void 0,error:t})),f(m.getCurrentMachineUnlearningChartDataSuccess,(i,{machineUnlearningProgress:t})=>h(p({},i),{pruningProgress:[],quantizationProgress:void 0,machineUnlearningProgress:t,error:null})),f(m.getCurrentQuantizationChartDataFailure,(i,{error:t})=>h(p({},i),{quantizationProgress:void 0,error:t})),f(m.getCurrentPruningChartDataFailure,(i,{error:t})=>h(p({},i),{pruningProgress:[],error:t})),f(m.getChartConfigurationSettingsSuccess,(i,{settings:t})=>h(p({},i),{settings:p(p({},i.settings),t),error:null})),f(m.getChartConfigurationSettingsFailure,(i,{error:t})=>h(p({},i),{error:t})));var oe=d(g,i=>i.charts.pruningProgress),ce=d(g,i=>i.charts.quantizationProgress),le=d(g,i=>i.charts.machineUnlearningProgress),me=d(g,i=>i.charts.settings);var Cn=(()=>{let t=class t{constructor(e){this.store=e,this.pruningProgress=this.store.select(oe),this.quantizationProgress$=this.store.select(ce),this.machineUnlearningProgress$=this.store.select(le),this.settings$=this.store.select(me)}dispatch(e){this.store.dispatch(e)}};t.\u0275fac=function(n){return new(n||t)(s(_))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var pe=D({source:"[Core -> File]",events:{"Upload File":o(),"Upload File Success":o(),"Upload File Failure":o(),"Upload File and Call Script":o()}});var ue=(()=>{let t=class t{constructor(e){this.store=e}dispatch(e){this.store.dispatch(e)}};t.\u0275fac=function(n){return new(n||t)(s(_))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var yn=(()=>{let t=class t{constructor(e,n){this.bannerService=e,this.fileFacadeService=n,this._fileSubject=new _t(null)}get isFileLoaded(){return!!this._fileSubject.value}get file$(){return this._fileSubject.asObservable()}set file(e){this._fileSubject.next(e)}get file(){return this._fileSubject.value}clearFile(){this._fileSubject.next(null)}uploadFile(){if(!this.file){this.bannerService.showError("No file to upload.");return}this.fileFacadeService.dispatch(pe.uploadFile({file:this.file}))}};t.\u0275fac=function(n){return new(n||t)(s(se),s(ue))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var Pn=(()=>{let t=class t{constructor(e){this.router=e,this.history=[]}trackNavigationHistory(){this.addInitialUrl(),this.router.events.pipe(vt(e=>e instanceof Ot)).subscribe(e=>{this.history.push(e.urlAfterRedirects)})}addInitialUrl(){let e=this.router.url;this.history.push(e)}goToPreviousPage(e=Lt.MODEL_COMPRESSION.ROOT){let n=this.getPreviousUrl();n==="/"?this.router.navigateByUrl(`/${e}`):this.router.navigateByUrl(n)}getPreviousUrl(){return this.history[this.history.length-2]||"/"}};t.\u0275fac=function(n){return new(n||t)(s(Ut))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var he=d(g,i=>i.parameters);var Bn=(()=>{let t=class t{constructor(e){this.store=e,this.parameters$=this.store.select(he)}dispatch(e){this.store.dispatch(e)}};t.\u0275fac=function(n){return new(n||t)(s(_))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var de=d(g,i=>i.statistics.statistics);var fe=(()=>{let t=class t{constructor(e){this.store=e,this.statistics$=this.store.select(de)}dispatch(e){this.store.dispatch(e)}};t.\u0275fac=function(n){return new(n||t)(s(_))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var y=D({source:"[Core -> Statistics]",events:{"Get Statistics":S(),"Get Statistics Success":o(),"Get Statistics Failure":o(),"Update Statistics":o()}});var at=class extends k{constructor(){super("statistics",void 0,void 0,!1)}};var Zn=(()=>{let t=class t{constructor(e,n){this.apiClient=e,this.actions$=n,this.getStatistics=B(()=>this.actions$.pipe(O(y.getStatistics),M(()=>this.apiClient.serviceCall(new at).pipe(R(r=>y.getStatisticsSuccess({statistics:r})),F(r=>j(y.getStatisticsFailure({error:r})))))))}};t.\u0275fac=function(n){return new(n||t)(s(J),s(Y))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var He={statistics:{},error:null},er=Z(He,f(y.getStatisticsSuccess,(i,{statistics:t})=>h(p({},i),{statistics:t,error:null})),f(y.getStatisticsFailure,(i,{error:t})=>h(p({},i),{error:t})),f(y.updateStatistics,(i,{statistics:t})=>h(p({},i),{statistics:t,error:null})));var ge=d(g,i=>i.terminal.terminalHistory);var dr=(()=>{let t=class t{constructor(e){this.store=e,this.terminalHistory=this.store.select(ge)}dispatch(e){this.store.dispatch(e)}};t.\u0275fac=function(n){return new(n||t)(s(_))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();var q=function(i){return i.SCRIPT_STATUS="script_status",i.STATISTICS="statistics",i.CHARTS_PREFIX="chart_",i}(q||{}),Qe=function(i){return i.UPDATE_TESTING="chart_updateTesting",i.UPDATE_LATEST_VALUE="chart_updateLatestValue",i.ENHANCE_SINGLE_PHASE_X_AXIS="chart_enhanceSinglePhaseXAxis",i}(Qe||{});var yr=(()=>{let t=class t{handleBeforeUnload(){this.close()}constructor(e,n){this.scriptFacadeService=e,this.statisticsFacadeService=n,this.chartsMessagesSubject=new A}connect(){this.close(),console.log("Connecting to WebSocket URL:",St.websocketUrl),this.socket=new WebSocket(St.websocketUrl),this.socket.onopen=()=>{console.log("WebSocket connected!")},this.socket.onmessage=e=>Ct(this,null,function*(){let n=JSON.parse(e.data),{topic:r="",data:a}=n;switch(r){case q.SCRIPT_STATUS:this.scriptFacadeService.dispatch(Yt.updateScriptStatus({status:a}));break;case q.STATISTICS:let{statistics:c}=a||{};this.statisticsFacadeService.dispatch(y.updateStatistics({statistics:c}));break;default:r.startsWith(q.CHARTS_PREFIX)?this.chartsMessagesSubject.next({topic:r,data:a}):console.warn("Unknown message type:",r)}}),this.socket.onerror=e=>{console.error("WebSocket Error:",e)},this.socket.onclose=e=>{e.wasClean?console.log(`Closed cleanly, code=${e.code}, reason=${e.reason}`):console.error("Connection died"),bt(5e3).subscribe(()=>this.connect())}}get chartsMessages$(){return this.chartsMessagesSubject.asObservable()}send(e){this.socket&&this.socket.readyState===this.socket.OPEN&&this.socket.send(e)}close(){this.socket&&this.socket.readyState!==this.socket.CLOSED&&this.socket.close()}};t.\u0275fac=function(n){return new(n||t)(s(ee),s(fe))},t.\u0275prov=l({token:t,factory:t.\u0275fac});let i=t;return i})();export{Yt as a,ee as b,se as c,m as d,tn as e,an as f,Cn as g,ue as h,pe as i,yn as j,Pn as k,Bn as l,fe as m,dr as n,y as o,Zn as p,er as q,Qe as r,yr as s};