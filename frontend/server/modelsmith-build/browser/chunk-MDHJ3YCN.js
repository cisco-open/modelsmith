import{a as g}from"./chunk-LRK34XDC.js";import{a as r}from"./chunk-35M7GHVT.js";import{Ae as h,Be as m,Ce as L,G as l,S as o,Wc as p,Xc as w,Yc as n,Zc as D,_ as T,_c as u,a as c,b as s,ca as O,s as a,x as f}from"./chunk-64NP6AY6.js";var C=class extends h{constructor(){super("current-or-last-active-script-details",void 0,void 0,!1)}};var x=class extends h{constructor(){super("script-status",void 0,void 0,!1)}};var d=class extends m{constructor(e){super("execute-command",{command:e},!1)}};var v=class extends m{constructor(e){super("run-script",e,!1)}};var F=class extends m{constructor(){super("stop-script",{},!1)}};var Y=(()=>{let e=class e{constructor(A,$){this.apiClient=A,this.actions$=$,this.callScript$=n(()=>this.actions$.pipe(u(r.callScript),o(({configs:i})=>this.apiClient.serviceCall(new v(i)).pipe(o(()=>[r.callScriptSuccess(),r.fetchScriptStatus()]),l(S=>a(r.callScriptFailure({error:S}))))))),this.fetchScriptStatus$=n(()=>this.actions$.pipe(u(r.fetchScriptStatus),o(()=>this.apiClient.serviceCall(new x).pipe(f(i=>{let{status:S}=i;return r.fetchScriptStatusSuccess({status:S})}),l(i=>a(r.fetchScriptStatusFailure({error:i}))))))),this.getCurrentOrLastActiveScriptDetails$=n(()=>this.actions$.pipe(u(r.getCurrentOrLastActiveScriptDetails),o(()=>this.apiClient.serviceCall(new C).pipe(f(i=>r.getCurrentOrLastActiveScriptDetailsSuccess({scriptDetails:i})),l(i=>a(r.fetchScriptStatusFailure({error:i}))))))),this.stopScript$=n(()=>this.actions$.pipe(u(r.stopScript),o(()=>this.apiClient.serviceCall(new F).pipe(f(()=>r.stopScriptSuccess()),l(i=>a(r.stopScriptFailure({error:i}))))))),this.executeCommand$=n(()=>this.actions$.pipe(u(r.executeCommand),o(({command:i})=>this.apiClient.serviceCall(new d(i)).pipe(f(()=>r.executeCommandSuccess()),l(S=>a(r.executeCommandFailure({error:S})))))))}};e.\u0275fac=function($){return new($||e)(O(L),O(D))},e.\u0275prov=T({token:e,factory:e.\u0275fac});let t=e;return t})();var j={scriptStatus:g.NOT_RUNNING,scriptDetails:{},error:""},et=w(j,p(r.callScriptSuccess,t=>s(c({},t),{error:null})),p(r.callScriptFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.getCurrentOrLastActiveScriptDetailsSuccess,(t,{scriptDetails:e})=>s(c({},t),{scriptDetails:e,error:null})),p(r.getCurrentOrLastActiveScriptDetailsFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.fetchScriptStatusSuccess,(t,{status:e})=>s(c({},t),{scriptStatus:e,error:null})),p(r.fetchScriptStatusFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.updateScriptStatus,(t,{status:e})=>s(c({},t),{scriptStatus:e,error:null})),p(r.stopScript,t=>s(c({},t),{error:null})),p(r.stopScriptSuccess,t=>s(c({},t),{error:null})),p(r.stopScriptFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.executeCommandSuccess,t=>s(c({},t),{error:null})),p(r.executeCommandFailure,(t,{error:e})=>s(c({},t),{error:e})));export{Y as a,et as b};