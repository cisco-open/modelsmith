"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[226],{3226:(x,i,o)=>{o.r(i),o.d(i,{ModeSelectModule:()=>A});var r=o(6814),p=o(8524),l=o(1303),m=o(8986),u=o(7731),M=o(9547),e=o(5879),v=o(9082),g=o(3682),h=o(8110),f=o(2848),S=o(4966),C=o(2296),Z=o(5986);const T=["configureDefaultMode"],O=[{path:"",component:(()=>{var t;class s{constructor(n,c,d){this.authFacadeService=n,this.configFacadeService=c,this.router=d}setModeAndNavigate(n){const c=this.defaultModeCheckbox.checked?n:void 0;this.configFacadeService.dispatch(m.o.setDefaultMode({mode:c})),this.configFacadeService.dispatch(m.o.setCurrentMode({mode:c}))}goToExpertMode(){this.setModeAndNavigate(u.n.EXPERT),this.router.navigate([M.Z.MODEL_COMPRESSION.ROOT])}goToGuidedMode(){this.setModeAndNavigate(u.n.GUIDED),this.router.navigate([M.Z.WIZARD.ROOT])}}return(t=s).\u0275fac=function(n){return new(n||t)(e.Y36(v.N),e.Y36(g.$),e.Y36(l.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["ms-mode-select"]],viewQuery:function(n,c){if(1&n&&e.Gf(T,5),2&n){let d;e.iGM(d=e.CRH())&&(c.defaultModeCheckbox=d.first)}},decls:24,vars:3,consts:[[1,"mode-select-wrapper"],[1,"mode-select-warpper-content"],[1,"text"],[1,"paragraph-semibold-p1-xlarge-emphasis","block","text-white"],[1,"mode-select-buttons","mt-20"],[1,"nav-type-button"],["mat-stroked-button","",1,"ms-white-stroked-button",3,"click"],[1,"nav-type-button","mt-10"],[1,"mt-3","ml-[-8px]"],["color","primary","checked","",1,"ms-checkbox-white"],["configureDefaultMode",""],["styleMode","fullWidth"]],template:function(n,c){if(1&n&&(e.TgZ(0,"ms-background-gradient"),e._UZ(1,"ms-header"),e.TgZ(2,"div",0),e._UZ(3,"div"),e.TgZ(4,"div",1)(5,"div",2)(6,"span",3),e._uU(7),e.ALo(8,"async"),e.qZA(),e.TgZ(9,"span",3),e._uU(10,"Welcome to ModelSmith. Please select a mode to start:"),e.qZA(),e.TgZ(11,"div",4)(12,"div",5)(13,"button",6),e.NdJ("click",function(){return c.goToExpertMode()}),e._uU(14,"Expert Mode"),e.qZA()(),e.TgZ(15,"div",7)(16,"button",6),e.NdJ("click",function(){return c.goToGuidedMode()}),e._uU(17,"Guided Mode"),e.qZA()(),e.TgZ(18,"div",8)(19,"mat-checkbox",9,10),e._uU(21,"Remember my choice for the future "),e.qZA()()()()(),e._UZ(22,"div"),e.qZA(),e._UZ(23,"ms-footer",11),e.qZA()),2&n){let d;e.xp6(7),e.hij("Hello ",null==(d=e.lcZ(8,1,c.authFacadeService.user$))?null:d.name,"")}},dependencies:[h.g,f.N,S.N,C.lW,Z.oG,r.Ov],styles:[".mode-select-wrapper[_ngcontent-%COMP%]{margin-left:80px}.mode-select-wrapper[_ngcontent-%COMP%]   .mode-select-warpper-content[_ngcontent-%COMP%]{margin-top:80px}.mode-select-wrapper[_ngcontent-%COMP%]   .mode-select-warpper-content[_ngcontent-%COMP%]   .mode-select-buttons[_ngcontent-%COMP%]   .nav-type-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:400px}"]}),s})()}];let y=(()=>{var t;class s{}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.Bz.forChild(O),l.Bz]}),s})(),A=(()=>{var t;class s{}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[y,p.m,r.ez]}),s})()}}]);