import{a as _}from"./chunk-AK2HCVXD.js";import{a as G,e as I,f as ee}from"./chunk-VN6ZKIV6.js";import"./chunk-4KWEJN4U.js";import"./chunk-NO2PD4LU.js";import{b as J}from"./chunk-MPLQ54VQ.js";import{Cc as v,Da as c,Ed as z,Gd as N,Hc as C,Md as K,Na as r,O as F,P as j,R as H,T as h,U as q,Va as y,Vb as S,Wb as Y,Xb as g,Zb as x,_b as O,be as E,ce as P,ja as d,ka as p,m as Q,pb as W,rd as V,sa as u,sd as Z,ud as $,wa as i,wd as X,xa as o,ya as f}from"./chunk-AIAH5BT5.js";var s={PRETRAINED_MODEL:"pretrained-model",PRUNING_TIME:"pruning-time",PTQ_TIME:"ptq-time",SIMILAR_ACCURACY:"similar-accuracy",HIGHER_ACCURACY:"higher-accuracy",RECOMMENDED_BASIC_PTQ:"recommended-basic-ptq",RECOMMENDED_BRECQ:"recommended-brecq",RECOMMENDED_GRASP:"recommended-grasp",RECOMMENDED_ITERATIVE:"recommended-iterative",RECOMMENDED_ITERATIVE_ONE_SHOT:"recommended-iterative-one-shot",RECOMMENDED_MINMAX:"recommended-minmax"};var he=()=>["Yes","No"],te=(()=>{let e=class e{constructor(a,n){this.router=a,this.route=n,this.selectedOption=""}trackSelection(a){this.selectedOption=a}handleSelection(){this.selectedOption==="Yes"?this.router.navigate([s.RECOMMENDED_BASIC_PTQ],{relativeTo:this.route.parent}):this.selectedOption==="No"&&this.router.navigate([s.RECOMMENDED_BRECQ],{relativeTo:this.route.parent})}goToPreviousPage(){this.router.navigate([s.PTQ_TIME],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S))},e.\u0275cmp=h({type:e,selectors:[["ms-step-higher-accuracy"]],decls:14,vars:3,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Do you need relatively higher accuracy?"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Post-training quantization "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(6," Short PTQ time "),o()(),i(7,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(8,"div",4)(9,"button",5),c("click",function(){return t.goToPreviousPage()}),f(10,"mat-icon",6),r(11," Previous "),o(),i(12,"button",7),c("click",function(){return t.handleSelection()}),r(13,"Next"),o()()),n&2&&(d(7),u("options",y(2,he)),d(5),u("disabled",!t.selectedOption))},dependencies:[v,C,E,P,_]});let l=e;return l})();var _e=()=>["Yes","No"],ie=(()=>{let e=class e{constructor(a,n){this.router=a,this.route=n,this.selectedOption=""}trackSelection(a){this.selectedOption=a}handleSelection(){this.selectedOption==="Yes"?this.router.navigate([s.PTQ_TIME],{relativeTo:this.route.parent}):this.selectedOption==="No"&&this.router.navigate([s.PRUNING_TIME],{relativeTo:this.route.parent})}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S))},e.\u0275cmp=h({type:e,selectors:[["ms-step-pretrained-model"]],decls:6,vars:3,consts:[[1,"heading-primary-title"],[3,"selectedOption","options"],[1,"mt-4"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Do you have a pre-trained model?"),o(),i(2,"ms-card-selector",1),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(3,"div",2)(4,"button",3),c("click",function(){return t.handleSelection()}),r(5,"Next"),o()()),n&2&&(d(2),u("options",y(2,_e)),d(2),u("disabled",!t.selectedOption))},dependencies:[v,_]});let l=e;return l})();var fe=()=>["Yes","No"],oe=(()=>{let e=class e{constructor(a,n){this.router=a,this.route=n,this.wizardSteps=s,this.selectedOption=""}trackSelection(a){this.selectedOption=a}handleSelection(){this.selectedOption==="Yes"?this.router.navigate([s.RECOMMENDED_ITERATIVE],{relativeTo:this.route.parent}):this.selectedOption==="No"&&this.router.navigate([s.SIMILAR_ACCURACY],{relativeTo:this.route.parent})}goToPreviousPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S))},e.\u0275cmp=h({type:e,selectors:[["ms-step-pruning-time"]],decls:14,vars:3,consts:[[1,"heading-primary-title"],[1,"paragraph-regular-p3-default","text-hint"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Do you tolerate long pruning time?"),o(),i(2,"p",1),r(3,` The model pruning phase may require a similar or even longer duration compared to the model training period.
`),o(),i(4,"mat-chip-set",2)(5,"mat-chip",3),c("click",function(){return t.goToPreviousPage()}),r(6," Pruning "),o()(),i(7,"ms-card-selector",4),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(8,"div",5)(9,"button",6),c("click",function(){return t.goToPreviousPage()}),f(10,"mat-icon",7),r(11," Previous "),o(),i(12,"button",8),c("click",function(){return t.handleSelection()}),r(13,"Next"),o()()),n&2&&(d(7),u("options",y(2,fe)),d(5),u("disabled",!t.selectedOption))},dependencies:[v,C,E,P,_]});let l=e;return l})();var Se=()=>["Yes","No"],ne=(()=>{let e=class e{constructor(a,n){this.router=a,this.route=n,this.selectedOption=""}trackSelection(a){this.selectedOption=a}handleSelection(){this.selectedOption==="Yes"?this.router.navigate([s.RECOMMENDED_MINMAX],{relativeTo:this.route.parent}):this.selectedOption==="No"&&this.router.navigate([s.HIGHER_ACCURACY],{relativeTo:this.route.parent})}goToPreviousPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S))},e.\u0275cmp=h({type:e,selectors:[["ms-step-ptq-time"]],decls:14,vars:3,consts:[[1,"heading-primary-title"],[1,"paragraph-regular-p3-default","text-hint"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Do you tolerate long PTQ time?"),o(),i(2,"p",1),r(3,` Our system supports processing times ranging from minutes (short) to several hours (long), ensuring consistent efficiency and reliability for tasks of any duration.
`),o(),i(4,"mat-chip-set",2)(5,"mat-chip",3),c("click",function(){return t.goToPreviousPage()}),r(6," Post-training quantization "),o()(),i(7,"ms-card-selector",4),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(8,"div",5)(9,"button",6),c("click",function(){return t.goToPreviousPage()}),f(10,"mat-icon",7),r(11," Previous "),o(),i(12,"button",8),c("click",function(){return t.handleSelection()}),r(13,"Next"),o()()),n&2&&(d(7),u("options",y(2,Se)),d(5),u("disabled",!t.selectedOption))},dependencies:[v,C,E,P,_]});let l=e;return l})();var D,R=(D=class{constructor(e){this.scriptFacadeService=e,this.isScriptActive=!1,this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe(Z(this)).subscribe(e=>{this.isScriptActive=X(e)})}ctaCallScript(e){if(!e)return;let L=ee(e);L&&this.scriptFacadeService.dispatch($.callScript({configs:{alg:L}}))}},D.\u0275fac=function(L){return new(L||D)(H(K))},D.\u0275prov=F({token:D,factory:D.\u0275fac}),D);R=Q([V()],R);var re=(()=>{let e=class e{constructor(a,n,t){this.router=a,this.route=n,this.wizardUtilsService=t,this.selectedOption="",this.algorithms=[],this.algorithms=I([z.BPTQ])}trackSelection(a){this.selectedOption=a}handleSelection(){this.wizardUtilsService.ctaCallScript(this.selectedOption)}goToPreviousPage(){this.router.navigate([s.HIGHER_ACCURACY],{relativeTo:this.route.parent})}goToPTQPage(){this.router.navigate([s.PTQ_TIME],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}goToChartPage(){this.router.navigate([`${O.RUNNING.ROOT}`])}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S),p(R))},e.\u0275cmp=h({type:e,selectors:[["ms-step-recommend-basic-ptq"]],decls:18,vars:2,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",1,"mr-3",3,"click","disabled"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Recommended Algorithm:"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Post-training quantization "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPTQPage()}),r(6," Short PTQ time "),o(),i(7,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(8," High Accuracy "),o()(),i(9,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(10,"div",4)(11,"button",5),c("click",function(){return t.goToPreviousPage()}),f(12,"mat-icon",6),r(13," Previous "),o(),i(14,"button",7),c("click",function(){return t.handleSelection()}),r(15," Run "),o(),i(16,"button",8),c("click",function(){return t.goToChartPage()}),r(17,"View Chart"),o()()),n&2&&(d(9),u("options",t.algorithms),d(5),u("disabled",!t.selectedOption||t.wizardUtilsService.isScriptActive))},dependencies:[v,C,E,P,_]});let l=e;return l})();var ce=(()=>{let e=class e{constructor(a,n,t){this.router=a,this.route=n,this.wizardUtilsService=t,this.selectedOption="",this.algorithms=[],this.algorithms=I([z.BRECQ])}trackSelection(a){this.selectedOption=a}handleSelection(){this.wizardUtilsService.ctaCallScript(this.selectedOption)}goToPreviousPage(){this.router.navigate([s.HIGHER_ACCURACY],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}goToPTQPage(){this.router.navigate([s.PTQ_TIME],{relativeTo:this.route.parent})}goToChartPage(){this.router.navigate([`${O.RUNNING.ROOT}`])}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S),p(R))},e.\u0275cmp=h({type:e,selectors:[["ms-step-recommend-brecq"]],decls:18,vars:2,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",1,"mr-3",3,"click","disabled"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Recommended Algorithm:"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Post-training quantization "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPTQPage()}),r(6," Short PTQ time "),o(),i(7,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(8," Low Accuracy "),o()(),i(9,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(10,"div",4)(11,"button",5),c("click",function(){return t.goToPreviousPage()}),f(12,"mat-icon",6),r(13," Previous "),o(),i(14,"button",7),c("click",function(){return t.handleSelection()}),r(15," Run "),o(),i(16,"button",8),c("click",function(){return t.goToChartPage()}),r(17,"View Chart"),o()()),n&2&&(d(9),u("options",t.algorithms),d(5),u("disabled",!t.selectedOption||t.wizardUtilsService.isScriptActive))},dependencies:[v,C,E,P,_]});let l=e;return l})();var ae=(()=>{let e=class e{constructor(a,n,t){this.router=a,this.route=n,this.wizardUtilsService=t,this.selectedOption="",this.algorithms=[],this.algorithms=I([N.IPG,N.IPR,N.IPM])}trackSelection(a){this.selectedOption=a}handleSelection(){this.wizardUtilsService.ctaCallScript(this.selectedOption)}goToPreviousPage(){this.router.navigate([s.SIMILAR_ACCURACY],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}goToPruningTimePage(){this.router.navigate([s.PRUNING_TIME],{relativeTo:this.route.parent})}goToChartPage(){this.router.navigate([`${O.RUNNING.ROOT}`])}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S),p(R))},e.\u0275cmp=h({type:e,selectors:[["ms-step-recommend-grasp"]],decls:18,vars:2,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",1,"mr-3",3,"click","disabled"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Recommended Algorithm:"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Pruning "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPruningTimePage()}),r(6," Short pruning time "),o(),i(7,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(8," Init pruning "),o()(),i(9,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(10,"div",4)(11,"button",5),c("click",function(){return t.goToPreviousPage()}),f(12,"mat-icon",6),r(13," Previous "),o(),i(14,"button",7),c("click",function(){return t.handleSelection()}),r(15," Run "),o(),i(16,"button",8),c("click",function(){return t.goToChartPage()}),r(17,"View Chart"),o()()),n&2&&(d(9),u("options",t.algorithms),d(5),u("disabled",!t.selectedOption||t.wizardUtilsService.isScriptActive))},dependencies:[v,C,E,P,_]});let l=e;return l})();var me=(()=>{let e=class e{constructor(a,n,t){this.router=a,this.route=n,this.wizardUtilsService=t,this.selectedOption="",this.algorithms=[],this.algorithms=I([N.IMP,N.OMP])}trackSelection(a){this.selectedOption=a}handleSelection(){this.wizardUtilsService.ctaCallScript(this.selectedOption)}goToPreviousPage(){this.router.navigate([s.SIMILAR_ACCURACY],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}goToPruningTimePage(){this.router.navigate([s.PRUNING_TIME],{relativeTo:this.route.parent})}goToChartPage(){this.router.navigate([`${O.RUNNING.ROOT}`])}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S),p(R))},e.\u0275cmp=h({type:e,selectors:[["ms-step-recommend-iterative-one-shot"]],decls:18,vars:2,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",1,"mr-3",3,"click","disabled"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Recommended Algorithm:"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Pruning "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPruningTimePage()}),r(6," Long pruning time "),o(),i(7,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(8," Higher accuracy "),o()(),i(9,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(10,"div",4)(11,"button",5),c("click",function(){return t.goToPreviousPage()}),f(12,"mat-icon",6),r(13," Previous "),o(),i(14,"button",7),c("click",function(){return t.handleSelection()}),r(15," Run "),o(),i(16,"button",8),c("click",function(){return t.goToChartPage()}),r(17,"View Chart"),o()()),n&2&&(d(9),u("options",t.algorithms),d(5),u("disabled",!t.selectedOption||t.wizardUtilsService.isScriptActive))},dependencies:[v,C,E,P,_]});let l=e;return l})();var se=(()=>{let e=class e{constructor(a,n,t){this.router=a,this.route=n,this.wizardUtilsService=t,this.selectedOption="",this.algorithms=[],this.algorithms=I([N.IMP])}trackSelection(a){this.selectedOption=a}handleSelection(){this.wizardUtilsService.ctaCallScript(this.selectedOption)}goToPreviousPage(){this.router.navigate([s.PRUNING_TIME],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}goToChartPage(){this.router.navigate([`${O.RUNNING.ROOT}`])}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S),p(R))},e.\u0275cmp=h({type:e,selectors:[["ms-step-recommend-iterative"]],decls:16,vars:2,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",1,"mr-3",3,"click","disabled"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Recommended Algorithm:"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Pruning "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(6," Long pruning time "),o()(),i(7,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(8,"div",4)(9,"button",5),c("click",function(){return t.goToPreviousPage()}),f(10,"mat-icon",6),r(11," Previous "),o(),i(12,"button",7),c("click",function(){return t.handleSelection()}),r(13," Run "),o(),i(14,"button",8),c("click",function(){return t.goToChartPage()}),r(15,"View Chart"),o()()),n&2&&(d(7),u("options",t.algorithms),d(5),u("disabled",!t.selectedOption||t.wizardUtilsService.isScriptActive))},dependencies:[v,C,E,P,_]});let l=e;return l})();var le=(()=>{let e=class e{constructor(a,n,t){this.router=a,this.route=n,this.wizardUtilsService=t,this.selectedOption="",this.algorithms=[],this.algorithms=I([z.MINMAXPTQ])}trackSelection(a){this.selectedOption=a}handleSelection(){this.wizardUtilsService.ctaCallScript(this.selectedOption)}goToPreviousPage(){this.router.navigate([s.PTQ_TIME],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}goToChartPage(){this.router.navigate([`${O.RUNNING.ROOT}`])}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S),p(R))},e.\u0275cmp=h({type:e,selectors:[["ms-step-recommend-minmax"]],decls:16,vars:2,consts:[[1,"heading-primary-title"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",1,"mr-3",3,"click","disabled"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Recommended Algorithm:"),o(),i(2,"mat-chip-set",1)(3,"mat-chip",2),c("click",function(){return t.goToPretrainedPage()}),r(4," Post-training quantization "),o(),i(5,"mat-chip",2),c("click",function(){return t.goToPreviousPage()}),r(6," Long PTQ time "),o()(),i(7,"ms-card-selector",3),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(8,"div",4)(9,"button",5),c("click",function(){return t.goToPreviousPage()}),f(10,"mat-icon",6),r(11," Previous "),o(),i(12,"button",7),c("click",function(){return t.handleSelection()}),r(13," Run "),o(),i(14,"button",8),c("click",function(){return t.goToChartPage()}),r(15,"View Chart"),o()()),n&2&&(d(7),u("options",t.algorithms),d(5),u("disabled",!t.selectedOption||t.wizardUtilsService.isScriptActive))},dependencies:[v,C,E,P,_]});let l=e;return l})();var ge=()=>["Yes","No"],pe=(()=>{let e=class e{constructor(a,n){this.router=a,this.route=n,this.selectedOption=""}trackSelection(a){this.selectedOption=a}handleSelection(){this.selectedOption==="Yes"?this.router.navigate([s.RECOMMENDED_ITERATIVE_ONE_SHOT],{relativeTo:this.route.parent}):this.selectedOption==="No"&&this.router.navigate([s.RECOMMENDED_GRASP],{relativeTo:this.route.parent})}goToPreviousPage(){this.router.navigate([s.PRUNING_TIME],{relativeTo:this.route.parent})}goToPretrainedPage(){this.router.navigate([s.PRETRAINED_MODEL],{relativeTo:this.route.parent})}};e.\u0275fac=function(n){return new(n||e)(p(g),p(S))},e.\u0275cmp=h({type:e,selectors:[["ms-step-similar-accuracy"]],decls:16,vars:3,consts:[[1,"heading-primary-title"],[1,"paragraph-regular-p3-default","text-hint"],[1,"mt-2","mb-2"],["color","accent",1,"ms-chip",3,"click"],[3,"selectedOption","options"],[1,"mt-4"],["mat-button","",1,"mr-3",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(n,t){n&1&&(i(0,"p",0),r(1,"Do you want to have a similar or higher accuracy?\xA0"),o(),i(2,"p",1),r(3,` Expectations for compressed model performance: Anticipate achieving comparable or enhanced accuracy relative to the original model.
`),o(),i(4,"mat-chip-set",2)(5,"mat-chip",3),c("click",function(){return t.goToPretrainedPage()}),r(6," Pruning "),o(),i(7,"mat-chip",3),c("click",function(){return t.goToPreviousPage()}),r(8," Short pruning time "),o()(),i(9,"ms-card-selector",4),c("selectedOption",function(T){return t.trackSelection(T)}),o(),i(10,"div",5)(11,"button",6),c("click",function(){return t.goToPreviousPage()}),f(12,"mat-icon",7),r(13," Previous "),o(),i(14,"button",8),c("click",function(){return t.handleSelection()}),r(15,"Next"),o()()),n&2&&(d(9),u("options",y(2,ge)),d(5),u("disabled",!t.selectedOption))},dependencies:[v,C,E,P,_]});let l=e;return l})();var de=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["ms-wizard"]],decls:5,vars:0,consts:[[1,"wizard-layout"],[1,"left"],[1,"right"]],template:function(n,t){n&1&&(i(0,"div",0)(1,"div",1),f(2,"router-outlet"),o(),i(3,"div",2),f(4,"ms-terminal"),o()())},dependencies:[Y,G],styles:[".wizard-layout[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:20px;height:100%}.wizard-layout[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]{width:45%;gap:20px}.wizard-layout[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{width:55%}"]});let l=e;return l})();var ve=[{path:"",component:de,children:[{path:"",redirectTo:s.PRETRAINED_MODEL,pathMatch:"full"},{path:s.PRETRAINED_MODEL,component:ie},{path:s.PRUNING_TIME,component:oe},{path:s.PTQ_TIME,component:ne},{path:s.SIMILAR_ACCURACY,component:pe},{path:s.HIGHER_ACCURACY,component:te},{path:s.RECOMMENDED_BASIC_PTQ,component:re},{path:s.RECOMMENDED_BRECQ,component:ce},{path:s.RECOMMENDED_GRASP,component:ae},{path:s.RECOMMENDED_ITERATIVE,component:se},{path:s.RECOMMENDED_MINMAX,component:le},{path:s.RECOMMENDED_ITERATIVE_ONE_SHOT,component:me}]}],ue=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=q({type:e}),e.\u0275inj=j({imports:[x.forChild(ve),x]});let l=e;return l})();var ci=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=q({type:e}),e.\u0275inj=j({providers:[R],imports:[W,J,ue,G,_]});let l=e;return l})();export{ci as WizardModule};