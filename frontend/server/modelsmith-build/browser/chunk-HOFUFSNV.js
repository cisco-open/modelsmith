import{c as n}from"./chunk-LRK34XDC.js";import{Ja as d,Rc as m,Sc as r,Z as c,ad as a,ba as i,k as l,l as h,ye as u}from"./chunk-DL2LTWBU.js";var f=o=>r(a,e=>{switch(o){case n.QUANTIZATION:return e.models.quantizationModels;case n.PRUNING:return e.models.pruningModels;case n.MACHINE_UNLEARNING:return e.models.machineUnlearningModels;case n.AWQ:return e.models.awqModels;default:return}}),g=r(a,o=>o.models.currentModel),S=r(a,o=>o.models.modelMetadata);var W=(()=>{let e=class e{constructor(t){this.store=t,this.currentModel$=this.store.select(g),this.modelMetadata$=this.store.select(S)}getModelsByType(t){return this.store.select(f(t))}dispatch(t){this.store.dispatch(t)}};e.\u0275fac=function(s){return new(s||e)(i(m))},e.\u0275prov=c({token:e,factory:e.\u0275fac});let o=e;return o})();var b=300,A=(()=>{let e=class e{constructor(t){this.ngZone=t,this.messageSubject=new h(b),this.connectionStatus=new l(!1),this.isConnecting=!1,this.messages$=this.messageSubject.asObservable(),this.connectionStatus$=this.connectionStatus.asObservable()}connect(){if(this.socket&&(this.socket.readyState===WebSocket.OPEN||this.socket.readyState===WebSocket.CONNECTING)){console.log("Terminal WebSocket is already connected or connecting.");return}if(this.isConnecting){console.log("Terminal WebSocket connection is already in progress.");return}this.isConnecting=!0;let t=u.terminalWebSocketUrl;this.socket=new WebSocket(t),this.socket.onmessage=s=>{let p=s.data;this.ngZone.run(()=>{this.messageSubject.next(p)})},this.socket.onopen=()=>{console.log("Terminal WebSocket connected!"),this.ngZone.run(()=>this.connectionStatus.next(!0)),this.isConnecting=!1,this.sendMessage("CLIENT_READY")},this.socket.onerror=s=>{console.error("Terminal WebSocket Error:",s),this.ngZone.run(()=>this.connectionStatus.next(!1)),this.isConnecting=!1},this.socket.onclose=()=>{console.log("Terminal WebSocket closed."),this.ngZone.run(()=>this.connectionStatus.next(!1)),this.isConnecting=!1}}sendMessage(t){this.socket&&this.socket.readyState===WebSocket.OPEN?this.socket.send(t):console.error("Terminal WebSocket is not open. Unable to send message:",t)}clearScreen(){this.sendMessage("clear\r")}closeConnection(){this.socket&&(this.socket.close(),console.log("Terminal WebSocket connection closed by client."))}reconnect(){this.closeConnection(),this.connect()}};e.\u0275fac=function(s){return new(s||e)(i(d))},e.\u0275prov=c({token:e,factory:e.\u0275fac});let o=e;return o})();export{W as a,A as b};