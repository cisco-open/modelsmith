import{a as f}from"./chunk-4D57GNKS.js";import{a as x,b}from"./chunk-NN3OSYEA.js";import{a as G}from"./chunk-36WEF36I.js";import{a as u}from"./chunk-3VO3XHQY.js";import"./chunk-JKR4QCWT.js";import{a as V,b as B}from"./chunk-FOX57G4Q.js";import"./chunk-TQIVMKZC.js";import{a as I}from"./chunk-I6FC4BFI.js";import"./chunk-YJOFM5TF.js";import{$a as r,$c as C,Da as y,Ea as l,Eb as F,Ee as j,Fb as P,Wb as T,Zb as D,_ as d,ab as m,bb as a,fb as S,ga as w,ha as p,ib as g,kc as R,oa as M,oc as v,pa as h,pb as k,qb as E,qe as A,rb as O,tb as c,te as N,vb as _}from"./chunk-CQN7FGIC.js";var U=["configureDefaultMode"],H=(()=>{let e=class e{constructor(i,t,s){this.authFacadeService=i,this.configsFacadeService=t,this.router=s}setModeAndNavigate(i){let t=this.defaultModeCheckbox.checked?i:void 0;this.configsFacadeService.dispatch(x.setDefaultMode({mode:t})),this.configsFacadeService.dispatch(x.setCurrentMode({mode:t}))}goToExpertMode(){this.setModeAndNavigate(b.EXPERT),this.router.navigate([C.MODEL_COMPRESSION.ROOT])}goToGuidedMode(){this.setModeAndNavigate(b.GUIDED),this.router.navigate([C.WIZARD.ROOT])}};e.\u0275fac=function(t){return new(t||e)(l(j),l(I),l(R))},e.\u0275cmp=w({type:e,selectors:[["ms-mode-select"]],viewQuery:function(t,s){if(t&1&&k(U,5),t&2){let n;E(n=O())&&(s.defaultModeCheckbox=n.first)}},decls:24,vars:3,consts:[["configureDefaultMode",""],[1,"mode-select-wrapper"],[1,"mode-select-warpper-content"],[1,"text"],[1,"paragraph-semibold-p1-xlarge-emphasis","block","text-white"],[1,"mode-select-buttons","mt-20"],[1,"nav-type-button"],["mat-stroked-button","",1,"ms-white-stroked-button",3,"click"],[1,"nav-type-button","mt-10"],[1,"mt-3","ml-[-8px]"],["color","primary","checked","",1,"ms-checkbox-white"],["styleMode","fullWidth"]],template:function(t,s){if(t&1){let n=S();r(0,"ms-background-gradient"),a(1,"ms-header"),r(2,"div",1),a(3,"div"),r(4,"div",2)(5,"div",3)(6,"span",4),c(7),F(8,"async"),m(),r(9,"span",4),c(10,"Welcome to ModelSmith. Please select a mode to start:"),m(),r(11,"div",5)(12,"div",6)(13,"button",7),g("click",function(){return M(n),h(s.goToExpertMode())}),c(14,"Expert Mode"),m()(),r(15,"div",8)(16,"button",7),g("click",function(){return M(n),h(s.goToGuidedMode())}),c(17,"Guided Mode"),m()(),r(18,"div",9)(19,"mat-checkbox",10,0),c(21,"Remember my choice for the future "),m()()()()(),a(22,"div"),m(),a(23,"ms-footer",11),m()}if(t&2){let n;y(7),_("Hello ",(n=P(8,1,s.authFacadeService.user$))==null?null:n.name,"")}},dependencies:[G,u,f,V,A,T],styles:[".mode-select-wrapper[_ngcontent-%COMP%]{margin-left:80px}.mode-select-wrapper[_ngcontent-%COMP%]   .mode-select-warpper-content[_ngcontent-%COMP%]{margin-top:80px}.mode-select-wrapper[_ngcontent-%COMP%]   .mode-select-warpper-content[_ngcontent-%COMP%]   .mode-select-buttons[_ngcontent-%COMP%]   .nav-type-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:400px}"]});let o=e;return o})();var q=[{path:"",component:H}],L=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p({type:e}),e.\u0275inj=d({imports:[v.forChild(q),v]});let o=e;return o})();var Ce=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p({type:e}),e.\u0275inj=d({imports:[L,D,u,f,B,N]});let o=e;return o})();export{Ce as ModeSelectModule};