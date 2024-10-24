import{a as Oe,b as A}from"./chunk-HOFUFSNV.js";import{b as Pe}from"./chunk-LRK34XDC.js";import{a as Xe,b as Ye,c as We}from"./chunk-VLO6NL53.js";import{a as _e,b as Fe}from"./chunk-GWFXRHCV.js";import{c as De}from"./chunk-XX6ZYDLH.js";import{d as xe}from"./chunk-572IZ672.js";import{a as ke,b as I}from"./chunk-3IJULEGV.js";import{a as D,b as M}from"./chunk-QJ55TOIV.js";import{b as ye,s as Me}from"./chunk-CYUWMGXJ.js";import{a as Te,d as ge,h as be,i as Se,j as Ce,k as we}from"./chunk-HULQWYRR.js";import{$a as s,Ab as S,Ca as ee,D as q,Da as u,Ea as h,Hb as le,I as U,J as $,Ma as te,Pa as C,Ra as g,Rb as ae,Vb as ce,Xa as j,Xd as pe,Z as G,Zb as P,a as Q,ab as l,ae as de,ba as K,bb as m,e as H,eb as ie,ee as ue,f as z,fb as F,ga as b,he,ia as J,ib as a,kb as w,oa as p,oe as fe,p as _,pa as d,pb as oe,pe as ve,qb as ne,rb as re,rc as me,sb as X,sc as Y,se as x,tb as y,te as O,ub as se,vc as W,ve as B,wa as Z,wc as L,we as E,xa as c,yc as N,zb as k}from"./chunk-DL2LTWBU.js";var Ee=H(Xe()),Ie=H(Ye()),Ae=H(We());var Ne=["terminal"],v,Be=(v=class{constructor(e){this.terminalWebSocketService=e,this.fitAddon=new Ee.FitAddon,this.searchAddon=new Ie.SearchAddon}ngOnInit(){this.initializeTerminal(),this.subscribeToWebSocketMessages()}ngAfterViewInit(){requestAnimationFrame(()=>{this.adjustTerminalContainer()})}initializeTerminal(){this.terminal=new Ae.Terminal(Q({cursorBlink:!0,theme:{background:"#D0D4D9",foreground:"#000000",cursor:"#000000",selectionBackground:"#FFDD00",selectionForeground:"#000000"},allowProposedApi:!0},this.options)),this.terminal.loadAddon(this.fitAddon),this.terminal.loadAddon(this.searchAddon),this.terminal.open(this.terminalDiv.nativeElement),this.setupResizeObserver(),this.terminal.onData(e=>{this.terminalWebSocketService.sendMessage(e)})}subscribeToWebSocketMessages(){this.terminalWebSocketService.messages$.pipe(M(this)).subscribe(e=>{this.terminal.write(e)})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=new ResizeObserver(()=>{this.adjustTerminalContainer()}),this.resizeObserver.observe(this.terminalDiv.nativeElement)}adjustTerminalContainer(){this.adjustHeightToParent(),this.fitAddon.fit()}adjustHeightToParent(){let e=this.terminalDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;if(e){this.terminalDiv.nativeElement.style.height="auto";let i=e.offsetHeight-100;this.terminalDiv.nativeElement.style.height=`${i}px`}}ngOnDestroy(){this.resizeObserver?.disconnect(),this.terminal.dispose()}search(e){this.searchAddon.findNext(e,{decorations:{matchBackground:"#FFFF00",matchBorder:"#FFFF00",matchOverviewRuler:"#FFFF00",activeMatchBackground:"#FFFF00",activeMatchBorder:"#FFFF00",activeMatchColorOverviewRuler:"#FFFF00"}})}clearSearch(){this.searchAddon.clearDecorations()}clearTerminal(){this.terminal.clear()}scrollToTop(){this.terminal.scrollToTop()}scrollToBottom(){this.terminal.scrollToBottom()}},v.\u0275fac=function(n){return new(n||v)(h(A))},v.\u0275cmp=b({type:v,selectors:[["ms-terminal-xterm"]],viewQuery:function(n,t){if(n&1&&oe(Ne,7),n&2){let i;ne(i=re())&&(t.terminalDiv=i.first)}},inputs:{options:"options"},standalone:!0,features:[k([I,Oe]),S],decls:2,vars:0,consts:[["terminal",""],[1,"terminal-wrapper"]],template:function(n,t){n&1&&m(0,"div",1,0)}}),v);Be=_([D({})],Be);var Re=me("tooltipState",[L("hidden",W({opacity:0,transform:"scale(0.9)"})),L("visible",W({opacity:1,transform:"scale(1)"})),N("hidden => visible",Y("150ms ease-in")),N("visible => hidden",Y("150ms ease-out"))]);function Ue(o,e){o&1&&ie(0)}function $e(o,e){if(o&1&&(s(0,"div",3),C(1,Ue,1,0,"ng-container",5),l()),o&2){let n=w();u(),g("ngTemplateOutlet",n.contentTemplate)}}function Ge(o,e){if(o&1){let n=F();s(0,"div",4)(1,"button",6),a("click",function(){p(n);let i=w();return d(i.triggerClose())}),m(2,"mat-icon",7),l()()}}var Ve=(()=>{let e=class e{constructor(){this.position="bottom",this.showCloseButton=!1,this.state="hidden",this.close=new c}triggerClose(){this.state="hidden",setTimeout(()=>this.close.emit(),150)}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=b({type:e,selectors:[["ms-tooltip-panel"]],inputs:{contentTemplate:"contentTemplate",position:"position",showCloseButton:"showCloseButton",state:"state"},outputs:{close:"close"},standalone:!0,features:[S],decls:5,vars:4,consts:[[1,"tooltip-container",3,"ngClass"],[1,"tooltip-arrow"],[1,"tooltip-wrapper"],[1,"tooltip-content"],[1,"close-button"],[4,"ngTemplateOutlet"],["mat-icon-button","",3,"click"],["fontSet","ms","fontIcon","icon-X",1,"mat-error","size-20"]],template:function(i,r){i&1&&(s(0,"div",0),m(1,"div",1),s(2,"div",2),C(3,$e,2,1,"div",3)(4,Ge,3,0,"div",4),l()()),i&2&&(g("ngClass",r.position)("@tooltipState",r.state),u(3),j(r.contentTemplate?3:-1),u(),j(r.showCloseButton?4:-1))},dependencies:[P,ae,ce,E,B,O,x],styles:[".tooltip-container[_ngcontent-%COMP%]{position:relative;background-color:var(--tooltip);color:var(--terminal-color);border-radius:6px;box-shadow:0 4px 8px #0000001a}.tooltip-wrapper[_ngcontent-%COMP%]{display:flex;padding:2px 6px}.tooltip-arrow[_ngcontent-%COMP%]{position:absolute;width:0;height:0;border-style:solid}.tooltip-content[_ngcontent-%COMP%]{padding:12px}.tooltip-container.top[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{bottom:-10px;left:50%;transform:translate(-50%);border-width:10px 10px 0 10px;border-color:var(--tooltip) transparent transparent transparent}.tooltip-container.bottom[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{top:-10px;left:50%;transform:translate(-50%);border-width:0 10px 10px 10px;border-color:transparent transparent var(--tooltip) transparent}.tooltip-container.left[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{right:-10px;top:50%;transform:translateY(-50%);border-width:10px 0 10px 10px;border-color:transparent transparent transparent var(--tooltip)}.tooltip-container.right[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{left:-10px;top:50%;transform:translateY(-50%);border-width:10px 10px 10px 0;border-color:transparent var(--tooltip) transparent transparent}.close-button[_ngcontent-%COMP%]{right:0;top:-2;position:absolute}"],data:{animation:[Re]}});let o=e;return o})();var He=(()=>{let e=class e{constructor(t,i,r){this.overlay=t,this.viewContainerRef=i,this.elementRef=r,this.position="bottom",this.showCloseButton=!1,this.closeOnBackdropClick=!0,this.allowCloseOnEscPress=!0,this.freezePageScroll=!0,this.closed=new c,this.overlayRef=null}onClick(){this.overlayRef?this.closePanel():this.openPanel()}handleEscKey(t){this.allowCloseOnEscPress&&this.closePanel()}openPanel(){let t=this.getPositionStrategy();this.overlayRef=this.overlay.create({positionStrategy:t});let i=new ye(Ve,this.viewContainerRef),f=this.overlayRef.attach(i).instance;f.contentTemplate=this.contentTemplate,f.position=this.position,f.showCloseButton=this.showCloseButton,this.freezePageScroll&&document.body.classList.add("no-scroll"),setTimeout(()=>{f.state="visible"},0),f.close.subscribe(()=>{this.closePanel()}),this.closeOnBackdropClick&&(this.backdropClickSubscription=this.overlayRef.backdropClick().subscribe(()=>{this.closePanel()}))}closePanel(){if(this.overlayRef){let t=this.overlayRef.overlayElement.querySelector("ms-tooltip-panel");t&&(t.state="hidden",setTimeout(()=>{this.overlayRef?.detach(),this.overlayRef=null,this.closed.emit()},150)),this.freezePageScroll&&document.body.classList.remove("no-scroll"),this.backdropClickSubscription&&this.backdropClickSubscription.unsubscribe()}}getPositionStrategy(){let t={top:{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom"},bottom:{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top"},left:{originX:"start",originY:"center",overlayX:"end",overlayY:"center"},right:{originX:"end",originY:"center",overlayX:"start",overlayY:"center"}};return this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([t[this.position]])}ngOnDestroy(){this.overlayRef&&this.overlayRef.dispose(),this.backdropClickSubscription&&this.backdropClickSubscription.unsubscribe()}};e.\u0275fac=function(i){return new(i||e)(h(Me),h(te),h(Z))},e.\u0275dir=J({type:e,selectors:[["","msTooltipPanel",""]],hostBindings:function(i,r){i&1&&a("click",function(){return r.onClick()})("keydown.escape",function(je){return r.handleEscKey(je)},!1,ee)},inputs:{contentTemplate:[0,"msTooltipPanel","contentTemplate"],position:"position",showCloseButton:"showCloseButton",closeOnBackdropClick:"closeOnBackdropClick",allowCloseOnEscPress:"allowCloseOnEscPress",freezePageScroll:"freezePageScroll"},outputs:{closed:"closed"},exportAs:["msTooltipPanel"],standalone:!0});let o=e;return o})();var V=(()=>{let e=class e{constructor(t){this.dialogService=t}openFullScreenDialog(t){return z(this,null,function*(){if(t)return;let{MsTerminalFullscreenDialogComponent:i}=yield import("./chunk-4TBXUE4Q.js");document.body.classList.add("no-scroll"),this.dialogService.open(i,{showHeader:!1,showFooter:!1,showSaveButton:!1,width:"100vw",height:"100vh"}).afterClosed().pipe(U(1)).subscribe(()=>{document.body.classList.remove("no-scroll")})})}openMessagesHistoryDialog(){return z(this,null,function*(){let{MsTerminalMessagesHistoryDialogComponent:t}=yield import("./chunk-MEWVE3KA.js");this.dialogService.open(t,{title:"Terminal history",showSaveButton:!1,width:"60vw",height:"75vh"})})}};e.\u0275fac=function(i){return new(i||e)(K(xe))},e.\u0275prov=G({token:e,factory:e.\u0275fac});let o=e;return o})();function Je(o,e){if(o&1&&(s(0,"div",14)(1,"mat-label"),y(2," Search... "),l(),s(3,"mat-form-field",15),m(4,"input",16)(5,"mat-icon",17),l()()),o&2){let n=w();u(4),g("formControl",n.searchFormControl)}}var T,ze=(T=class{constructor(e,n,t){this.scriptFacadeService=e,this.terminalWebSocketService=n,this.terminalDialogService=t,this.isFullscreen=!1,this.isScriptActive=!1,this.clearTerminal=new c,this.scrollToTopTerminal=new c,this.scrollToBottomTerminal=new c,this.searchTerminal=new c,this.disposeSearch=new c,this.exitFullscreen=new c,this.searchFormControl=new ue("")}ngOnInit(){this.listenToScriptStateChanges(),this.listenToSearchFormControlChanges()}clearTerminalScreen(){this.terminalWebSocketService.clearScreen()}listenToSearchFormControlChanges(){this.searchFormControl.valueChanges.pipe(M(this),$(300),q(e=>!De(e))).subscribe(e=>{this.searchTerminal.emit(e)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(M(this)).subscribe(e=>{this.isScriptActive=Pe(e)})}ctaStopScript(){this.scriptFacadeService.dispatch(ke.stopScript())}openTerminalMessagesHistoryDialog(){this.terminalDialogService.openMessagesHistoryDialog()}openFullScreenMode(){if(this.isFullscreen){this.exitFullscreen.emit();return}this.terminalDialogService.openFullScreenDialog(this.isFullscreen)}},T.\u0275fac=function(n){return new(n||T)(h(I),h(A),h(V))},T.\u0275cmp=b({type:T,selectors:[["ms-terminal-toolbar"]],inputs:{isFullscreen:"isFullscreen",isScriptActive:"isScriptActive"},outputs:{clearTerminal:"clearTerminal",scrollToTopTerminal:"scrollToTopTerminal",scrollToBottomTerminal:"scrollToBottomTerminal",searchTerminal:"searchTerminal",disposeSearch:"disposeSearch",exitFullscreen:"exitFullscreen"},standalone:!0,features:[k([V]),S],decls:21,vars:6,consts:[["tooltipPanel","msTooltipPanel"],["searchTooltipContent",""],[1,"buttons-wrapper"],["mat-icon-button","","color","primary","matTooltip","Search terminal","position","top",3,"closed","msTooltipPanel","closeOnBackdropClick","showCloseButton"],["fontSet","ms","fontIcon","icon-MagnifyingGlass"],["mat-icon-button","","color","primary","matTooltip","Terminal history",3,"click"],["mat-icon-button","","color","primary","matTooltip","Scroll to top",3,"click"],["fontSet","ms","fontIcon","icon-ArrowUp"],["mat-icon-button","","color","primary","matTooltip","Scroll to bottom",3,"click"],["fontSet","ms","fontIcon","icon-ArrowDown"],["mat-icon-button","","color","primary","matTooltip","Clear terminal",3,"click","disabled"],["mat-icon-button","","color","primary","matTooltip","Toggle fullscreen",3,"click"],["mat-icon-button","","color","warn","matTooltip","Stop current process",3,"click","disabled"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"],[1,"form-field-container","dark"],["subscriptSizing","dynamic"],["msErrorDisplay","","matInput","",3,"formControl"],["fontSet","ms","fontIcon","icon-MagnifyingGlass","matSuffix",""]],template:function(n,t){if(n&1){let i=F();s(0,"div",2)(1,"button",3,0),a("closed",function(){return p(i),t.disposeSearch.emit(),d(t.searchFormControl.setValue(""))}),m(3,"mat-icon",4),l(),s(4,"button",5),a("click",function(){p(i);let f=X(2);return t.openTerminalMessagesHistoryDialog(),d(f.closePanel())}),s(5,"mat-icon"),y(6,"history"),l()(),s(7,"button",6),a("click",function(){return p(i),d(t.scrollToTopTerminal.emit())}),m(8,"mat-icon",7),l(),s(9,"button",8),a("click",function(){return p(i),d(t.scrollToBottomTerminal.emit())}),m(10,"mat-icon",9),l(),s(11,"button",10),a("click",function(){return p(i),d(t.clearTerminalScreen())}),s(12,"mat-icon"),y(13," clear_all"),l()(),s(14,"button",11),a("click",function(){return p(i),d(t.openFullScreenMode())}),s(15,"mat-icon"),y(16),l()(),s(17,"button",12),a("click",function(){return p(i),d(t.ctaStopScript())}),m(18,"mat-icon",13),l()(),C(19,Je,6,1,"ng-template",null,1,le)}if(n&2){let i=X(20);u(),g("msTooltipPanel",i)("closeOnBackdropClick",!1)("showCloseButton",!0),u(10),g("disabled",t.isScriptActive),u(5),se(t.isFullscreen?"fullscreen_exit":"fullscreen"),u(),g("disabled",!t.isScriptActive)}},dependencies:[P,O,x,E,B,Fe,_e,He,fe,pe,de,ve,he,Se,be,Te,ge,we,Ce]}),T);ze=_([D({})],ze);export{Be as a,ze as b};
