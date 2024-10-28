import{a as Ze,b as ee}from"./chunk-HOFUFSNV.js";import{b as Ke}from"./chunk-LRK34XDC.js";import{i as qe}from"./chunk-2CKK74GJ.js";import{a as Tt,b as gt,c as bt}from"./chunk-VLO6NL53.js";import{a as We,b as Ge}from"./chunk-GWFXRHCV.js";import{b as J,c as Qe}from"./chunk-XX6ZYDLH.js";import{d as Je}from"./chunk-XLEDMSNZ.js";import{a as $e,b as Z}from"./chunk-3IJULEGV.js";import{a as M,b as f}from"./chunk-QJ55TOIV.js";import{b as Xe,n as Le,s as Ye}from"./chunk-CYUWMGXJ.js";import{a as Ne,d as Ue,h as He,i as $,j as ze,k as q}from"./chunk-HULQWYRR.js";import{$ as he,$a as s,Ab as C,Ba as ve,D as fe,Da as I,Ea as a,Eb as Me,Gb as Oe,I as N,J as U,Ra as P,Rb as we,Ub as De,Xd as Ee,Z as E,Zb as A,a as R,ab as l,ae as _e,ba as D,bb as c,be as Ae,ce as xe,e as ne,ee as ke,f as se,fb as Se,ga as b,ia as de,ib as m,ie as Re,j as ae,ja as ue,lb as Te,le as je,mb as ge,ne as Ve,oa as y,oe as Be,p as g,pa as F,pb as be,pe as Y,qb as ye,rb as Fe,rc as Ie,sb as Pe,sc as le,se as W,tb as _,te as G,ua as H,ub as Ce,vc as j,ve as K,wa as z,wc as L,we as Q,xa as h,yc as ce,zb as X}from"./chunk-DL2LTWBU.js";var O=function(i){return i.OPEN="open",i.DISMISS="dismiss",i.SAVE="save",i.CLOSE="close",i}(O||{});var x=function(i){return i.TOP="top",i.LEFT="left",i.RIGHT="right",i.BOTTOM="bottom",i}(x||{});var et="200px",tt="80px",me=x.TOP,V=150,ot={top:{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom",offsetY:-24,offsetX:-9},bottom:{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top",offsetY:4,offsetX:-7},left:{originX:"start",originY:"center",overlayX:"end",overlayY:"center",offsetX:-22,offsetY:-12},right:{originX:"end",originY:"center",overlayX:"start",overlayY:"center",offsetX:8,offsetY:-10}};var d=class{constructor(e){this.overlayRef=e,this.isClosing=!1,this.afterClosedSubject=new ae,this.dataSubject=new ae,this.data$=this.dataSubject.asObservable()}emitData(e){this.dataSubject.next(e)}backdropClick(){return this.overlayRef.backdropClick()}close(e,o=!0){this.isClosing=!0,this.afterClosedSubject.next(e),this.afterClosedSubject.complete(),this.dataSubject.complete(),setTimeout(()=>{this.overlayRef.dispose()},o?V:0)}afterClosed(){return this.afterClosedSubject.asObservable()}updatePosition(){this.overlayRef.updatePosition()}};var k=new he("POPOVER");var it=(()=>{let e=class e{constructor(){this.activePopovers=new Map}registerPopover(t,r){this.activePopovers.set(t,r)}deregisterPopover(t){this.activePopovers.delete(t)}closePopoverById(t,r,n=!0){let p=this.activePopovers.get(t);p&&(p.close(r,n),this.activePopovers.delete(t))}closeAllPopovers(){this.activePopovers.forEach(t=>t.close()),this.activePopovers.clear()}hasActivePopover(t){return this.activePopovers.has(t)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=E({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var nt=ne(Tt()),st=ne(gt()),at=ne(bt());var Mt=["terminal"],u,rt=(u=class{constructor(e){this.terminalWebSocketService=e,this.fitAddon=new nt.FitAddon,this.searchAddon=new st.SearchAddon}ngOnInit(){this.initializeTerminal(),this.subscribeToWebSocketMessages()}ngAfterViewInit(){requestAnimationFrame(()=>{this.adjustTerminalContainer()})}initializeTerminal(){this.terminal=new at.Terminal(R({cursorBlink:!0,theme:{background:"#D0D4D9",foreground:"#000000",cursor:"#000000",selectionBackground:"#FFDD00",selectionForeground:"#000000"},allowProposedApi:!0,scrollback:1e3},this.options)),this.terminal.loadAddon(this.fitAddon),this.terminal.loadAddon(this.searchAddon),this.terminal.open(this.terminalDiv.nativeElement),this.setupResizeObserver(),this.terminal.onData(e=>{this.terminalWebSocketService.sendMessage(e)})}subscribeToWebSocketMessages(){this.terminalWebSocketService.messages$.pipe(f(this)).subscribe(e=>{this.terminal.write(e)})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=new ResizeObserver(()=>{this.adjustTerminalContainer()}),this.resizeObserver.observe(this.terminalDiv.nativeElement)}adjustTerminalContainer(){this.adjustHeightToParent(),this.fitAddon.fit()}adjustHeightToParent(){let e=this.terminalDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;if(e){this.terminalDiv.nativeElement.style.height="auto";let r=e.offsetHeight-100;this.terminalDiv.nativeElement.style.height=`${r}px`}}ngOnDestroy(){this.resizeObserver?.disconnect(),this.terminal.dispose()}search(e){this.searchAddon.findNext(e,{decorations:{matchBackground:"#FFFF00",matchBorder:"#FFFF00",matchOverviewRuler:"#FFFF00",activeMatchBackground:"#FFFF00",activeMatchBorder:"#FFFF00",activeMatchColorOverviewRuler:"#FFFF00"}})}clearSearch(){this.searchAddon.clearDecorations(),this.searchAddon.findNext("")}clearTerminal(){this.terminal.clear()}scrollToTop(){this.terminal.scrollToTop()}scrollToBottom(){this.terminal.scrollToBottom()}},u.\u0275fac=function(o){return new(o||u)(a(ee))},u.\u0275cmp=b({type:u,selectors:[["ms-terminal-xterm"]],viewQuery:function(o,t){if(o&1&&be(Mt,7),o&2){let r;ye(r=Fe())&&(t.terminalDiv=r.first)}},inputs:{options:"options"},standalone:!0,features:[X([Z,Ze]),C],decls:2,vars:0,consts:[["terminal",""],[1,"terminal-wrapper"]],template:function(o,t){o&1&&c(0,"div",1,0)}}),u);rt=g([M({})],rt);var ct=(i,e)=>{let o={};return i&&lt(o,i,"width"),e&&lt(o,e,"height"),o},lt=(i,e,o)=>{let t=Ot(e);t==="px"||t==="rem"||t==="em"?i[`${o}.${t}`]=parseFloat(e):i[o]=e},Ot=i=>{let o=(typeof i=="string"?i:"").match(/(px|rem|em|vw|vh|%)$/);return o?o[0]:"px"},mt=()=>"popover-"+Math.random().toString(36).slice(2,11);var te=(()=>{let e=class e{constructor(t,r,n,p){this.overlay=t,this.injector=r,this.scrollDispatcher=n,this.popoverManager=p}open(t,r,n,p){let dt=this.getPositionStrategy(r,n?.position??me),pe=this.overlay.create(R({positionStrategy:dt},n||{})),B=new d(pe),ut=H.create({parent:this.injector,providers:[{provide:d,useValue:B},{provide:k,useValue:R({position:me,closePopoverOnBackdropClick:!1,closePopoverOnEscKeyUp:!0,width:n?.width||et,height:n?.height||tt},n)}]}),vt=new Xe(t,null,ut);pe.attach(vt);let St=p??mt();return this.popoverManager.registerPopover(St,B),this.scrollDispatcher.scrolled().subscribe(()=>{B.updatePosition()}),B}getPositionStrategy(t,r){let n=t instanceof z?t.nativeElement:t,p=ot[r];return this.overlay.position().flexibleConnectedTo(n).withFlexibleDimensions(!1).withPush(!1).withPositions([p]).withViewportMargin(0)}};e.\u0275fac=function(r){return new(r||e)(D(Ye),D(H),D(Le),D(it))},e.\u0275prov=E({token:e,factory:e.\u0275fac});let i=e;return i})();var pt=(()=>{let e=class e{constructor(t){this.el=t}ngAfterViewInit(){setTimeout(()=>{this.el.nativeElement.focus()},0)}};e.\u0275fac=function(r){return new(r||e)(a(z))},e.\u0275dir=de({type:e,selectors:[["","msAutofocus",""]],standalone:!0});let i=e;return i})();var oe=(()=>{let e=class e{constructor(t){this.dialogService=t}openFullScreenDialog(t){return se(this,null,function*(){if(t)return;let{MsTerminalFullscreenDialogComponent:r}=yield import("./chunk-J5KT46WB.js");document.body.classList.add("no-scroll"),this.dialogService.open(r,{showHeader:!1,showFooter:!1,showSaveButton:!1,width:"100vw",height:"100vh"}).afterClosed().pipe(N(1)).subscribe(()=>{document.body.classList.remove("no-scroll")})})}openMessagesHistoryDialog(){return se(this,null,function*(){let{MsTerminalMessagesHistoryDialogComponent:t}=yield import("./chunk-U6KQ3SSJ.js");this.dialogService.open(t,{title:"Terminal history",showSaveButton:!1,width:"60vw",height:"75vh"})})}};e.\u0275fac=function(r){return new(r||e)(D(Je))},e.\u0275prov=E({token:e,factory:e.\u0275fac});let i=e;return i})();var ft=(()=>{let e=class e{transform(t,r){return ct(t,r)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275pipe=ue({name:"iconPanelSizeStyles",type:e,pure:!0,standalone:!0});let i=e;return i})();var _t=["*"],v,ie=(v=class{constructor(e,o){this.popoverRef=e,this.data=o,this.actionEvent=new h,this.closeDrawerOnBackdropClick()}onClose(){this.actionEvent.emit(O.CLOSE),this.popoverRef.close({status:O.CLOSE})}onSave(){this.actionEvent.emit(O.SAVE),this.popoverRef.close({status:O.SAVE})}onDismiss(){this.actionEvent.emit(O.DISMISS),this.popoverRef.close({status:O.DISMISS})}closeDrawerOnBackdropClick(){this.data.closePopoverOnBackdropClick&&this.popoverRef.backdropClick().pipe(f(this)).subscribe(()=>{this.onDismiss()})}onEscKeyDown(){this.data.closePopoverOnEscKeyUp&&this.onDismiss()}},v.\u0275fac=function(o){return new(o||v)(a(d),a(k))},v.\u0275cmp=b({type:v,selectors:[["ms-popover"]],hostBindings:function(o,t){o&1&&m("keyup.esc",function(){return t.onEscKeyDown()},!1,ve)},inputs:{contentTemplate:"contentTemplate"},outputs:{actionEvent:"actionEvent"},standalone:!0,features:[C],ngContentSelectors:_t,decls:8,vars:6,consts:[[1,"tooltip-container","popover-element",3,"ngClass","ngStyle"],[1,"tooltip-arrow"],[1,"popover-content"],[1,"close-button"],["mat-icon-button","",3,"click"],["fontSet","ms","fontIcon","icon-X",1,"mat-error","size-20"]],template:function(o,t){o&1&&(Te(),s(0,"div",0),Me(1,"iconPanelSizeStyles"),c(2,"div",1),s(3,"div",2),ge(4),l(),s(5,"div",3)(6,"button",4),m("click",function(){return t.onClose()}),c(7,"mat-icon",5),l()()()),o&2&&P("ngClass",t.data.position)("ngStyle",Oe(1,3,t.data.width,t.data.height))("@fadeInOut",t.popoverRef.isClosing)},dependencies:[A,we,De,Q,K,G,W,ft],styles:[".tooltip-container[_ngcontent-%COMP%]{position:relative;background-color:var(--tooltip);color:var(--terminal-color);border-radius:6px;box-shadow:0 4px 8px #0000001a;padding:10px 8px}.tooltip-arrow[_ngcontent-%COMP%]{position:absolute;width:0;height:0;border-style:solid}.tooltip-content[_ngcontent-%COMP%]{padding:12px}.tooltip-container.top[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{bottom:-10px;left:50%;transform:translate(-50%);border-width:10px 10px 0 10px;border-color:var(--tooltip) transparent transparent transparent}.tooltip-container.bottom[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{top:-10px;left:50%;transform:translate(-50%);border-width:0 10px 10px 10px;border-color:transparent transparent var(--tooltip) transparent}.tooltip-container.left[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{right:-10px;top:50%;transform:translateY(-50%);border-width:10px 0 10px 10px;border-color:transparent transparent transparent var(--tooltip)}.tooltip-container.right[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{left:-10px;top:50%;transform:translateY(-50%);border-width:10px 10px 10px 0;border-color:transparent var(--tooltip) transparent transparent}.close-button[_ngcontent-%COMP%]{position:absolute;right:0;top:0}"],data:{animation:[Ie("fadeInOut",[L("void",j({opacity:0})),L("true",j({opacity:0})),L("false",j({opacity:1})),ce(":enter",[le(`${V}ms ease-in`,j({opacity:1}))]),ce("false => true",[le(`${V}ms ease-out`)])])]}}),v);ie=g([M()],ie);var S,re=(S=class{get searchFormControl(){return this.searchForm.get("search")}constructor(e,o,t){this.popoverRef=e,this.iconPanelConfig=o,this.fb=t,this.searchForm=new xe({})}ngOnInit(){this.initForm(),this.listenToSearchFormControlValueChanges()}initForm(){this.searchForm=this.fb.group({search:[""]})}listenToSearchFormControlValueChanges(){this.searchFormControl.valueChanges.pipe(f(this),U(200)).subscribe(e=>{this.popoverRef.emitData(e)})}},S.\u0275fac=function(o){return new(o||S)(a(d),a(k),a(Ve))},S.\u0275cmp=b({type:S,selectors:[["ms-terminal-toolbar-search-popover"]],standalone:!0,features:[C],decls:7,vars:1,consts:[[1,"form-field-container","dark",3,"formGroup"],["subscriptSizing","dynamic"],["msErrorDisplay","","matInput","","msAutofocus","","formControlName","search"],["fontSet","ms","fontIcon","icon-MagnifyingGlass","matSuffix",""]],template:function(o,t){o&1&&(s(0,"ms-popover")(1,"div",0)(2,"mat-label"),_(3," Search... "),l(),s(4,"mat-form-field",1),c(5,"input",2)(6,"mat-icon",3),l()()()),o&2&&(I(),P("formGroup",t.searchForm))},dependencies:[A,q,ze,He,Ne,Ue,$,Y,Ee,_e,Ae,Re,je,ie,qe,pt]}),S);re=g([M({})],re);var T,ht=(T=class{constructor(e,o,t,r){this.scriptFacadeService=e,this.terminalWebSocketService=o,this.terminalDialogService=t,this.popoverService=r,this.isFullscreen=!1,this.isScriptActive=!1,this.popoverId="",this.clearTerminal=new h,this.scrollToTopTerminal=new h,this.scrollToBottomTerminal=new h,this.searchTerminal=new h,this.disposeSearch=new h,this.exitFullscreen=new h,this.searchFormControl=new ke("")}ngOnInit(){this.listenToScriptStateChanges(),this.listenToSearchFormControlChanges()}clearTerminalScreen(){this.terminalWebSocketService.clearScreen()}openPanel(e){J(this.searchPanelRef)&&(this.searchPanelRef=this.popoverService.open(re,e._elementRef,{position:this.isFullscreen?x.BOTTOM:x.TOP,width:"200px",height:"60px"},this.popoverId??""),this.searchPanelRef.data$.pipe(f(this)).subscribe(o=>{this.searchTerminal.emit(o)}),this.searchPanelRef.afterClosed().pipe(N(1)).subscribe(()=>{this.searchPanelRef=void 0,this.disposeSearch.emit()}))}listenToSearchFormControlChanges(){this.searchFormControl.valueChanges.pipe(f(this),U(300),fe(e=>!Qe(e))).subscribe(e=>{this.searchTerminal.emit(e)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(f(this)).subscribe(e=>{this.isScriptActive=Ke(e)})}ctaStopScript(){this.scriptFacadeService.dispatch($e.stopScript())}openTerminalMessagesHistoryDialog(){J(this.searchPanelRef)||this.searchPanelRef?.close(),this.terminalDialogService.openMessagesHistoryDialog()}openFullScreenMode(){if(this.isFullscreen){this.exitFullscreen.emit();return}this.searchPanelRef?.close(),this.terminalDialogService.openFullScreenDialog(this.isFullscreen)}ngOnDestroy(){J(this.searchPanelRef)||this.searchPanelRef?.close()}},T.\u0275fac=function(o){return new(o||T)(a(Z),a(ee),a(oe),a(te))},T.\u0275cmp=b({type:T,selectors:[["ms-terminal-toolbar"]],inputs:{isFullscreen:"isFullscreen",isScriptActive:"isScriptActive",popoverId:"popoverId"},outputs:{clearTerminal:"clearTerminal",scrollToTopTerminal:"scrollToTopTerminal",scrollToBottomTerminal:"scrollToBottomTerminal",searchTerminal:"searchTerminal",disposeSearch:"disposeSearch",exitFullscreen:"exitFullscreen"},standalone:!0,features:[X([oe,te]),C],decls:19,vars:4,consts:[["searchTooltip",""],[1,"buttons-wrapper"],["mat-icon-button","","color","primary","matTooltip","Search terminal",3,"click"],["fontSet","ms","fontIcon","icon-MagnifyingGlass"],["mat-icon-button","","color","primary","matTooltip","Terminal history",3,"click"],["mat-icon-button","","color","primary","matTooltip","Scroll to top",3,"click"],["fontSet","ms","fontIcon","icon-ArrowUp"],["mat-icon-button","","color","primary","matTooltip","Scroll to bottom",3,"click"],["fontSet","ms","fontIcon","icon-ArrowDown"],["mat-icon-button","","color","primary","matTooltip","Clear terminal",3,"click","disabled"],["mat-icon-button","","color","primary",3,"click","matTooltip"],["mat-icon-button","","color","warn","matTooltip","Stop current process",3,"click","disabled"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"]],template:function(o,t){if(o&1){let r=Se();s(0,"div",1)(1,"button",2,0),m("click",function(){y(r);let p=Pe(2);return F(t.openPanel(p))}),c(3,"mat-icon",3),l(),s(4,"button",4),m("click",function(){return y(r),F(t.openTerminalMessagesHistoryDialog())}),s(5,"mat-icon"),_(6,"history"),l()(),s(7,"button",5),m("click",function(){return y(r),F(t.scrollToTopTerminal.emit())}),c(8,"mat-icon",6),l(),s(9,"button",7),m("click",function(){return y(r),F(t.scrollToBottomTerminal.emit())}),c(10,"mat-icon",8),l(),s(11,"button",9),m("click",function(){return y(r),F(t.clearTerminalScreen())}),s(12,"mat-icon"),_(13," clear_all"),l()(),s(14,"button",10),m("click",function(){return y(r),F(t.openFullScreenMode())}),s(15,"mat-icon"),_(16),l()(),s(17,"button",11),m("click",function(){return y(r),F(t.ctaStopScript())}),c(18,"mat-icon",12),l()()}o&2&&(I(11),P("disabled",t.isScriptActive),I(3),P("matTooltip",t.isFullscreen?"Exit fullscreen":"Enter fullscreen"),I(2),Ce(t.isFullscreen?"fullscreen_exit":"fullscreen"),I(),P("disabled",!t.isScriptActive))},dependencies:[A,G,W,Q,K,Ge,We,Be,Y,$,q]}),T);ht=g([M({})],ht);export{O as a,it as b,rt as c,ht as d};
