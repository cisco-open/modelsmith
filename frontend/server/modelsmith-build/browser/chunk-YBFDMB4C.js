import{a as L}from"./chunk-RMGWBHNQ.js";import{a as r}from"./chunk-2E46GXN3.js";import{Ae as f,Be as m,Ce as w,G as l,S as o,Wc as p,Xc as D,Yc as n,Zc as T,_ as O,_c as u,a as c,b as s,ca as $,s as a,x as S}from"./chunk-VYHIF4FK.js";var h=class extends f{constructor(){super("current-or-last-active-script-details",void 0,void 0,!1)}};var C=class extends f{constructor(){super("script-status",void 0,void 0,!1)}};var d=class extends m{constructor(e){super("run-script",e,!1)}};var x=class extends m{constructor(){super("stop-script",{},!1)}};var Q=(()=>{let e=class e{constructor(A,v){this.apiClient=A,this.actions$=v,this.callScript$=n(()=>this.actions$.pipe(u(r.callScript),o(({configs:i})=>this.apiClient.serviceCall(new d(i)).pipe(o(()=>[r.callScriptSuccess(),r.fetchScriptStatus()]),l(F=>a(r.callScriptFailure({error:F}))))))),this.fetchScriptStatus$=n(()=>this.actions$.pipe(u(r.fetchScriptStatus),o(()=>this.apiClient.serviceCall(new C).pipe(S(i=>{let{status:F}=i;return r.fetchScriptStatusSuccess({status:F})}),l(i=>a(r.fetchScriptStatusFailure({error:i}))))))),this.getCurrentOrLastActiveScriptDetails$=n(()=>this.actions$.pipe(u(r.getCurrentOrLastActiveScriptDetails),o(()=>this.apiClient.serviceCall(new h).pipe(S(i=>r.getCurrentOrLastActiveScriptDetailsSuccess({scriptDetails:i})),l(i=>a(r.fetchScriptStatusFailure({error:i}))))))),this.stopScript$=n(()=>this.actions$.pipe(u(r.stopScript),o(()=>this.apiClient.serviceCall(new x).pipe(S(()=>r.stopScriptSuccess()),l(i=>a(r.stopScriptFailure({error:i})))))))}};e.\u0275fac=function(v){return new(v||e)($(w),$(T))},e.\u0275prov=O({token:e,factory:e.\u0275fac});let t=e;return t})();var g={scriptStatus:L.NOT_RUNNING,scriptDetails:{},error:""},Z=D(g,p(r.callScriptSuccess,t=>s(c({},t),{error:null})),p(r.callScriptFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.getCurrentOrLastActiveScriptDetailsSuccess,(t,{scriptDetails:e})=>s(c({},t),{scriptDetails:e,error:null})),p(r.getCurrentOrLastActiveScriptDetailsFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.fetchScriptStatusSuccess,(t,{status:e})=>s(c({},t),{scriptStatus:e,error:null})),p(r.fetchScriptStatusFailure,(t,{error:e})=>s(c({},t),{error:e})),p(r.updateScriptStatus,(t,{status:e})=>s(c({},t),{scriptStatus:e,error:null})),p(r.stopScript,t=>s(c({},t),{error:null})),p(r.stopScriptSuccess,t=>s(c({},t),{error:null})),p(r.stopScriptFailure,(t,{error:e})=>s(c({},t),{error:e})));export{Q as a,Z as b};
