import{c as h}from"./chunk-LRK34XDC.js";import{Ae as F,Be as L,F as d,Gc as m,Hc as I,Ic as u,Ja as N,R as S,Rc as v,Sc as M,Vc as p,Wc as w,Xc as y,Yc as G,Z as l,Zc as C,a as c,ad as b,b as a,ba as n,j as T,k as j,s as f,w as g,ye as W,ze as k}from"./chunk-CQN7FGIC.js";var o=I({source:"[Core -> Terminal]",events:{"Get Latest Messages":u(),"Get Latest Messages Success":m(),"Get Latest Messages Failure":m(),"Get All Messages":u(),"Get All Messages Success":m(),"Get All Messages Failure":m(),"Post Clear History":u(),"Post Clear History Success":u(),"Post Clear History Failure":m()}});var x=class extends k{constructor(){super("all-messages",void 0,void 0,!1)}};var A=class extends k{constructor(){super("latest-messages",void 0,void 0,!1)}};var H=class extends F{constructor(){super("clear-history",{},!1)}};var oe=(()=>{let e=class e{constructor(s,i){this.apiClient=s,this.actions$=i,this.getLatestMessages$=y(()=>this.actions$.pipe(C(o.getLatestMessages),S(()=>this.apiClient.serviceCall(new A).pipe(g(r=>o.getLatestMessagesSuccess({messages:r})),d(r=>f(o.getLatestMessagesFailure({error:r}))))))),this.getAllMessages$=y(()=>this.actions$.pipe(C(o.getAllMessages),S(()=>this.apiClient.serviceCall(new x).pipe(g(r=>o.getAllMessagesSuccess({allMessages:r})),d(r=>f(o.getAllMessagesFailure({error:r}))))))),this.postClearHistory$=y(()=>this.actions$.pipe(C(o.postClearHistory),S(()=>this.apiClient.serviceCall(new H).pipe(g(()=>o.postClearHistorySuccess()),d(r=>f(o.postClearHistoryFailure({error:r})))))))}};e.\u0275fac=function(i){return new(i||e)(n(L),n(G))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let t=e;return t})();var U={messages:[],allMessages:[],error:null},ce=w(U,p(o.getLatestMessagesSuccess,(t,{messages:e})=>a(c({},t),{messages:e,error:null})),p(o.getLatestMessagesFailure,(t,{error:e})=>a(c({},t),{error:e})),p(o.getAllMessagesSuccess,(t,{allMessages:e})=>a(c({},t),{allMessages:e,error:null})),p(o.getAllMessagesFailure,(t,{error:e})=>a(c({},t),{error:e})),p(o.postClearHistoryFailure,(t,{error:e})=>a(c({},t),{error:e})));var E=t=>M(b,e=>{switch(t){case h.QUANTIZATION:return e.models.quantizationModels;case h.PRUNING:return e.models.pruningModels;case h.MACHINE_UNLEARNING:return e.models.machineUnlearningModels;case h.AWQ:return e.models.awqModels;default:return}}),P=M(b,t=>t.models.currentModel),O=M(b,t=>t.models.modelMetadata);var ke=(()=>{let e=class e{constructor(s){this.store=s,this.currentModel$=this.store.select(P),this.modelMetadata$=this.store.select(O)}getModelsByType(s){return this.store.select(E(s))}dispatch(s){this.store.dispatch(s)}};e.\u0275fac=function(i){return new(i||e)(n(v))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let t=e;return t})();var Te=(()=>{let e=class e{constructor(s){this.ngZone=s,this.messageSubject=new T,this.connectionStatus=new j(!1),this.isConnecting=!1,this.messagesHistory=[],this.maxHistory=1e3,this.messages$=this.messageSubject.asObservable(),this.connectionStatus$=this.connectionStatus.asObservable()}connect(){if(this.socket&&(this.socket.readyState===WebSocket.OPEN||this.socket.readyState===WebSocket.CONNECTING)){console.log("WebSocket is already connected or connecting.");return}if(this.isConnecting){console.log("WebSocket connection is already in progress.");return}this.isConnecting=!0;let s=W.terminalWebSocketUrl;this.socket=new WebSocket(s),this.socket.onopen=()=>{console.log("Terminal WebSocket connected!"),this.ngZone.run(()=>this.connectionStatus.next(!0)),this.isConnecting=!1},this.socket.onerror=i=>{console.error("Terminal WebSocket Error:",i),this.ngZone.run(()=>this.connectionStatus.next(!1)),this.isConnecting=!1},this.socket.onmessage=i=>{let r=i.data;this.ngZone.run(()=>{this.messagesHistory.push(r),this.messagesHistory.length>this.maxHistory&&this.messagesHistory.shift(),this.messageSubject.next(r)})},this.socket.onclose=()=>{console.log("Terminal WebSocket closed."),this.ngZone.run(()=>this.connectionStatus.next(!1)),this.isConnecting=!1}}sendMessage(s){this.socket&&this.socket.readyState===WebSocket.OPEN?this.socket.send(s):console.error("WebSocket is not open. Unable to send message:",s)}clearScreen(){this.sendMessage("clear\r")}closeConnection(){this.socket&&(this.socket.close(),console.log("WebSocket connection closed by client."))}reconnect(){this.closeConnection(),this.connect()}getHistory(){return[...this.messagesHistory]}};e.\u0275fac=function(i){return new(i||e)(n(N))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let t=e;return t})();export{o as a,oe as b,ce as c,ke as d,Te as e};