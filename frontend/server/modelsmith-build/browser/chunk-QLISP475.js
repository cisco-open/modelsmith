import{a as Je,b as Q}from"./chunk-HOFUFSNV.js";import{b as Ge}from"./chunk-LRK34XDC.js";import{i as Qe}from"./chunk-2CKK74GJ.js";import{a as ut,b as ht,c as dt}from"./chunk-VLO6NL53.js";import{a as Ye,b as We}from"./chunk-GWFXRHCV.js";import{b as le,c as Ke}from"./chunk-XX6ZYDLH.js";import{d as qe}from"./chunk-GYTTCMYG.js";import{a as $e,b as K}from"./chunk-3IJULEGV.js";import{a as M,b as p}from"./chunk-QJ55TOIV.js";import{b as ze,n as Xe,s as Le}from"./chunk-CYUWMGXJ.js";import{a as Be,d as Ne,h as Ue,i as Y,j as He,k as G}from"./chunk-HULQWYRR.js";import{$ as fe,$a as n,Ab as C,Ba as de,D as pe,Da as P,Ea as a,Eb as Me,Gb as Oe,I as R,J as V,Ra as F,Rb as Pe,Ub as we,Xd as _e,Z as j,Zb as E,a as k,ab as l,ae as Ee,ba as D,bb as c,be as Ie,ce as Ae,e as ie,ee as ke,f as re,fb as ve,ga as b,ia as ue,ib as m,ie as xe,j as ne,ja as he,lb as Se,le as Re,mb as Te,ne as Ve,oa as g,oe as je,p as T,pa as y,pb as be,pe as z,qb as ge,rb as ye,rc as De,sb as Fe,sc as se,se as X,tb as _,te as L,ua as B,ub as Ce,vc as x,ve as W,wa as N,wc as H,we as $,xa as f,yc as ae,zb as U}from"./chunk-DL2LTWBU.js";var et=ie(ut()),tt=ie(ht()),ot=ie(dt());var St=["terminal"],u,Ze=(u=class{constructor(e){this.terminalWebSocketService=e,this.fitAddon=new et.FitAddon,this.searchAddon=new tt.SearchAddon}ngOnInit(){this.initializeTerminal(),this.subscribeToWebSocketMessages()}ngAfterViewInit(){requestAnimationFrame(()=>{this.adjustTerminalContainer()})}initializeTerminal(){this.terminal=new ot.Terminal(k({cursorBlink:!0,theme:{background:"#D0D4D9",foreground:"#000000",cursor:"#000000",selectionBackground:"#FFDD00",selectionForeground:"#000000"},allowProposedApi:!0},this.options)),this.terminal.loadAddon(this.fitAddon),this.terminal.loadAddon(this.searchAddon),this.terminal.open(this.terminalDiv.nativeElement),this.setupResizeObserver(),this.terminal.onData(e=>{this.terminalWebSocketService.sendMessage(e)})}subscribeToWebSocketMessages(){this.terminalWebSocketService.messages$.pipe(p(this)).subscribe(e=>{this.terminal.write(e)})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=new ResizeObserver(()=>{this.adjustTerminalContainer()}),this.resizeObserver.observe(this.terminalDiv.nativeElement)}adjustTerminalContainer(){this.adjustHeightToParent(),this.fitAddon.fit()}adjustHeightToParent(){let e=this.terminalDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;if(e){this.terminalDiv.nativeElement.style.height="auto";let i=e.offsetHeight-100;this.terminalDiv.nativeElement.style.height=`${i}px`}}ngOnDestroy(){this.resizeObserver?.disconnect(),this.terminal.dispose()}search(e){this.searchAddon.findNext(e,{decorations:{matchBackground:"#FFFF00",matchBorder:"#FFFF00",matchOverviewRuler:"#FFFF00",activeMatchBackground:"#FFFF00",activeMatchBorder:"#FFFF00",activeMatchColorOverviewRuler:"#FFFF00"}})}clearSearch(){this.searchAddon.clearDecorations()}clearTerminal(){this.terminal.clear()}scrollToTop(){this.terminal.scrollToTop()}scrollToBottom(){this.terminal.scrollToBottom()}},u.\u0275fac=function(o){return new(o||u)(a(Q))},u.\u0275cmp=b({type:u,selectors:[["ms-terminal-xterm"]],viewQuery:function(o,t){if(o&1&&be(St,7),o&2){let i;ge(i=ye())&&(t.terminalDiv=i.first)}},inputs:{options:"options"},standalone:!0,features:[U([K,Je]),C],decls:2,vars:0,consts:[["terminal",""],[1,"terminal-wrapper"]],template:function(o,t){o&1&&c(0,"div",1,0)}}),u);Ze=T([M({})],Ze);var it="200px",rt="80px",ce="top";var nt={top:{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom",offsetY:-24,offsetX:-9},bottom:{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top",offsetY:4,offsetX:-7},left:{originX:"start",originY:"center",overlayX:"end",overlayY:"center",offsetX:-22,offsetY:-12},right:{originX:"end",originY:"center",overlayX:"start",overlayY:"center",offsetX:8,offsetY:-10}};var h=class{constructor(e){this.overlayRef=e,this.afterClosedSubject=new ne,this.dataSubject=new ne,this.data$=this.dataSubject.asObservable()}emitData(e){this.dataSubject.next(e)}backdropClick(){return this.overlayRef.backdropClick()}close(e){this.afterClosedSubject.next(e),this.afterClosedSubject.complete(),this.dataSubject.complete(),setTimeout(()=>{this.overlayRef.dispose()},150)}afterClosed(){return this.afterClosedSubject.asObservable()}updatePosition(){this.overlayRef.updatePosition()}};var I=new fe("POPOVER");var J=(()=>{let e=class e{constructor(t,i,s){this.overlay=t,this.injector=i,this.scrollDispatcher=s}open(t,i,s){let A=this.getPositionStrategy(i,s?.position??ce),me=this.overlay.create(k({positionStrategy:A},s||{})),oe=new h(me),pt=B.create({parent:this.injector,providers:[{provide:h,useValue:oe},{provide:I,useValue:k({position:ce,closePopoverOnBackdropClick:!1,closePopoverOnEscKeyUp:!0,width:s?.width||it,height:s?.height||rt},s)}]}),ft=new ze(t,null,pt);return me.attach(ft),this.scrollDispatcher.scrolled().subscribe(()=>{oe.updatePosition()}),oe}getPositionStrategy(t,i){let s=t instanceof N?t.nativeElement:t,A=nt[i];return this.overlay.position().flexibleConnectedTo(s).withFlexibleDimensions(!1).withPush(!1).withPositions([A]).withViewportMargin(0)}};e.\u0275fac=function(i){return new(i||e)(D(Le),D(B),D(Xe))},e.\u0275prov=j({token:e,factory:e.\u0275fac});let r=e;return r})();var st=(()=>{let e=class e{constructor(t){this.el=t}ngAfterViewInit(){setTimeout(()=>{this.el.nativeElement.focus()},0)}};e.\u0275fac=function(i){return new(i||e)(a(N))},e.\u0275dir=ue({type:e,selectors:[["","msAutofocus",""]],standalone:!0});let r=e;return r})();var Z=(()=>{let e=class e{constructor(t){this.dialogService=t}openFullScreenDialog(t){return re(this,null,function*(){if(t)return;let{MsTerminalFullscreenDialogComponent:i}=yield import("./chunk-EFWM55KW.js");document.body.classList.add("no-scroll"),this.dialogService.open(i,{showHeader:!1,showFooter:!1,showSaveButton:!1,width:"100vw",height:"100vh"}).afterClosed().pipe(R(1)).subscribe(()=>{document.body.classList.remove("no-scroll")})})}openMessagesHistoryDialog(){return re(this,null,function*(){let{MsTerminalMessagesHistoryDialogComponent:t}=yield import("./chunk-GU6QGHQ6.js");this.dialogService.open(t,{title:"Terminal history",showSaveButton:!1,width:"60vw",height:"75vh"})})}};e.\u0275fac=function(i){return new(i||e)(D(qe))},e.\u0275prov=j({token:e,factory:e.\u0275fac});let r=e;return r})();var O=function(r){return r.OPEN="open",r.DISMISS="dismiss",r.SAVE="save",r.CLOSE="close",r}(O||{});function lt(r,e){let o={};return r&&at(o,r,"width"),e&&at(o,e,"height"),o}function at(r,e,o){let t=Ft(e);t==="px"||t==="rem"||t==="em"?r[`${o}.${t}`]=parseFloat(e):r[o]=e}function Ft(r){let o=(typeof r=="string"?r:"").match(/(px|rem|em|vw|vh|%)$/);return o?o[0]:"px"}var ct=(()=>{let e=class e{transform(t,i){return lt(t,i)}};e.\u0275fac=function(i){return new(i||e)},e.\u0275pipe=he({name:"iconPanelSizeStyles",type:e,pure:!0,standalone:!0});let r=e;return r})();var Ot=["*"],d,ee=(d=class{constructor(e,o){this.popoverRef=e,this.data=o,this.actionEvent=new f,this.isClosing=!1,this.closeDrawerOnBackdropClick()}onClose(){this.actionEvent.emit(O.CLOSE),this.popoverRef.close({status:O.CLOSE}),this.isClosing=!0}onSave(){this.actionEvent.emit(O.SAVE),this.popoverRef.close({status:O.SAVE}),this.isClosing=!1}onDismiss(){this.actionEvent.emit(O.DISMISS),this.popoverRef.close({status:O.DISMISS}),this.isClosing=!1}closeDrawerOnBackdropClick(){this.data.closePopoverOnBackdropClick&&this.popoverRef.backdropClick().pipe(p(this)).subscribe(()=>{this.onDismiss()})}onEscKeyDown(){this.data.closePopoverOnEscKeyUp&&this.onDismiss()}},d.\u0275fac=function(o){return new(o||d)(a(h),a(I))},d.\u0275cmp=b({type:d,selectors:[["ms-popover"]],hostBindings:function(o,t){o&1&&m("keyup.esc",function(){return t.onEscKeyDown()},!1,de)},inputs:{contentTemplate:"contentTemplate"},outputs:{actionEvent:"actionEvent"},standalone:!0,features:[C],ngContentSelectors:Ot,decls:8,vars:6,consts:[[1,"tooltip-container",3,"ngClass","ngStyle"],[1,"tooltip-arrow"],[1,"popover-content"],[1,"close-button"],["mat-icon-button","",3,"click"],["fontSet","ms","fontIcon","icon-X",1,"mat-error","size-20"]],template:function(o,t){o&1&&(Se(),n(0,"div",0),Me(1,"iconPanelSizeStyles"),c(2,"div",1),n(3,"div",2),Te(4),l(),n(5,"div",3)(6,"button",4),m("click",function(){return t.onClose()}),c(7,"mat-icon",5),l()()()),o&2&&F("ngClass",t.data.position)("ngStyle",Oe(1,3,t.data.width,t.data.height))("@fadeInOut",t.isClosing)},dependencies:[E,Pe,we,$,W,L,X,ct],styles:[".tooltip-container[_ngcontent-%COMP%]{position:relative;background-color:var(--tooltip);color:var(--terminal-color);border-radius:6px;box-shadow:0 4px 8px #0000001a;padding:10px 8px}.tooltip-arrow[_ngcontent-%COMP%]{position:absolute;width:0;height:0;border-style:solid}.tooltip-content[_ngcontent-%COMP%]{padding:12px}.tooltip-container.top[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{bottom:-10px;left:50%;transform:translate(-50%);border-width:10px 10px 0 10px;border-color:var(--tooltip) transparent transparent transparent}.tooltip-container.bottom[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{top:-10px;left:50%;transform:translate(-50%);border-width:0 10px 10px 10px;border-color:transparent transparent var(--tooltip) transparent}.tooltip-container.left[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{right:-10px;top:50%;transform:translateY(-50%);border-width:10px 0 10px 10px;border-color:transparent transparent transparent var(--tooltip)}.tooltip-container.right[_ngcontent-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{left:-10px;top:50%;transform:translateY(-50%);border-width:10px 10px 10px 0;border-color:transparent var(--tooltip) transparent transparent}.close-button[_ngcontent-%COMP%]{position:absolute;right:0;top:0}"],data:{animation:[De("fadeInOut",[H("void",x({opacity:0})),H("true",x({opacity:0})),H("false",x({opacity:1})),ae(":enter",[se(`${150}ms ease-in`,x({opacity:1}))]),ae("false => true",[se(`${150}ms ease-out`)])])]}}),d);ee=T([M()],ee);var v,te=(v=class{get searchFormControl(){return this.searchForm.get("search")}constructor(e,o,t){this.popoverRef=e,this.iconPanelConfig=o,this.fb=t,this.searchForm=new Ae({})}ngOnInit(){this.initForm(),this.listenToSearchFormControlValueChanges()}initForm(){this.searchForm=this.fb.group({search:[""]})}listenToSearchFormControlValueChanges(){this.searchFormControl.valueChanges.pipe(p(this),V(200)).subscribe(e=>{this.popoverRef.emitData(e)})}},v.\u0275fac=function(o){return new(o||v)(a(h),a(I),a(Ve))},v.\u0275cmp=b({type:v,selectors:[["ms-terminal-toolbar-search-popover"]],standalone:!0,features:[C],decls:7,vars:1,consts:[[1,"form-field-container","dark",3,"formGroup"],["subscriptSizing","dynamic"],["msErrorDisplay","","matInput","","msAutofocus","","formControlName","search"],["fontSet","ms","fontIcon","icon-MagnifyingGlass","matSuffix",""]],template:function(o,t){o&1&&(n(0,"ms-popover")(1,"div",0)(2,"mat-label"),_(3," Search... "),l(),n(4,"mat-form-field",1),c(5,"input",2)(6,"mat-icon",3),l()()()),o&2&&(P(),F("formGroup",t.searchForm))},dependencies:[E,G,He,Ue,Be,Ne,Y,z,_e,Ee,Ie,xe,Re,ee,Qe,st]}),v);te=T([M({})],te);var S,mt=(S=class{constructor(e,o,t,i){this.scriptFacadeService=e,this.terminalWebSocketService=o,this.terminalDialogService=t,this.popoverService=i,this.isFullscreen=!1,this.isScriptActive=!1,this.clearTerminal=new f,this.scrollToTopTerminal=new f,this.scrollToBottomTerminal=new f,this.searchTerminal=new f,this.disposeSearch=new f,this.exitFullscreen=new f,this.searchFormControl=new ke("")}ngOnInit(){this.listenToScriptStateChanges(),this.listenToSearchFormControlChanges()}clearTerminalScreen(){this.terminalWebSocketService.clearScreen()}openPanel(e){le(this.searchPanelRef)&&(this.searchPanelRef=this.popoverService.open(te,e._elementRef,{position:this.isFullscreen?"bottom":"top",width:"200px",height:"60px"}),this.searchPanelRef.data$.pipe(p(this)).subscribe(o=>{this.searchTerminal.emit(o)}),this.searchPanelRef.afterClosed().pipe(R(1)).subscribe(()=>{this.searchPanelRef=void 0}))}listenToSearchFormControlChanges(){this.searchFormControl.valueChanges.pipe(p(this),V(300),pe(e=>!Ke(e))).subscribe(e=>{this.searchTerminal.emit(e)})}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(p(this)).subscribe(e=>{this.isScriptActive=Ge(e)})}ctaStopScript(){this.scriptFacadeService.dispatch($e.stopScript())}openTerminalMessagesHistoryDialog(){this.terminalDialogService.openMessagesHistoryDialog()}openFullScreenMode(){if(this.isFullscreen){this.exitFullscreen.emit();return}this.searchPanelRef?.close(),this.terminalDialogService.openFullScreenDialog(this.isFullscreen)}ngOnDestroy(){le(this.searchPanelRef)||this.searchPanelRef?.close()}},S.\u0275fac=function(o){return new(o||S)(a(K),a(Q),a(Z),a(J))},S.\u0275cmp=b({type:S,selectors:[["ms-terminal-toolbar"]],inputs:{isFullscreen:"isFullscreen",isScriptActive:"isScriptActive"},outputs:{clearTerminal:"clearTerminal",scrollToTopTerminal:"scrollToTopTerminal",scrollToBottomTerminal:"scrollToBottomTerminal",searchTerminal:"searchTerminal",disposeSearch:"disposeSearch",exitFullscreen:"exitFullscreen"},standalone:!0,features:[U([Z,J]),C],decls:19,vars:4,consts:[["searchTooltip",""],[1,"buttons-wrapper"],["mat-icon-button","","color","primary","matTooltip","Search terminal",3,"click"],["fontSet","ms","fontIcon","icon-MagnifyingGlass"],["mat-icon-button","","color","primary","matTooltip","Terminal history",3,"click"],["mat-icon-button","","color","primary","matTooltip","Scroll to top",3,"click"],["fontSet","ms","fontIcon","icon-ArrowUp"],["mat-icon-button","","color","primary","matTooltip","Scroll to bottom",3,"click"],["fontSet","ms","fontIcon","icon-ArrowDown"],["mat-icon-button","","color","primary","matTooltip","Clear terminal",3,"click","disabled"],["mat-icon-button","","color","primary",3,"click","matTooltip"],["mat-icon-button","","color","warn","matTooltip","Stop current process",3,"click","disabled"],["fontSet","ms","fontIcon","icon-X",1,"mat-error"]],template:function(o,t){if(o&1){let i=ve();n(0,"div",1)(1,"button",2,0),m("click",function(){g(i);let A=Fe(2);return y(t.openPanel(A))}),c(3,"mat-icon",3),l(),n(4,"button",4),m("click",function(){return g(i),y(t.openTerminalMessagesHistoryDialog())}),n(5,"mat-icon"),_(6,"history"),l()(),n(7,"button",5),m("click",function(){return g(i),y(t.scrollToTopTerminal.emit())}),c(8,"mat-icon",6),l(),n(9,"button",7),m("click",function(){return g(i),y(t.scrollToBottomTerminal.emit())}),c(10,"mat-icon",8),l(),n(11,"button",9),m("click",function(){return g(i),y(t.clearTerminalScreen())}),n(12,"mat-icon"),_(13," clear_all"),l()(),n(14,"button",10),m("click",function(){return g(i),y(t.openFullScreenMode())}),n(15,"mat-icon"),_(16),l()(),n(17,"button",11),m("click",function(){return g(i),y(t.ctaStopScript())}),c(18,"mat-icon",12),l()()}o&2&&(P(11),F("disabled",t.isScriptActive),P(3),F("matTooltip",t.isFullscreen?"Exit fullscreen":"Enter fullscreen"),P(2),Ce(t.isFullscreen?"fullscreen_exit":"fullscreen"),P(),F("disabled",!t.isScriptActive))},dependencies:[E,L,X,$,W,We,Ye,je,z,Y,G]}),S);mt=T([M({})],mt);export{Ze as a,mt as b};
