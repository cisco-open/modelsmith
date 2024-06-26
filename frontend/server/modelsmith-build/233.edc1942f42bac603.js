"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[233],{4233:(Si,Qt,C)=>{C.r(Qt),C.d(Qt,{RunningModule:()=>Xi});var T=C(6814),w=C(4245),$t=C(6792),Ft=C(9624),j=C(2655),tt=C(7582),ct=C(8791),Q=C(836),st=C(8180),F=C(2181),nt=C(4279),xt=C(4378),Nt=C(7820),Tt=function(o){return o.QUANTIZATION="quant",o.PRUNING="pruning",o}(Tt||{}),l=C(5879),ii=C(4885),ae=C(8471),It=C(2296),Vt=C(617),Gt=C(5195),Oe=C(7754),M=C(6634),wt=C(1159),ht=C(301),At=function(o){return o.SPARSITY_PRUNING="sparsityPruning",o.ACCURACY_PRUNING="accuracyPruning",o.ACCURACY_QUANTIZATION="accuracyQuantization",o.ACCURACY_MACHINE_UNLEARNING="accuracyMachineUnlearning",o.LOSS_QUANTIZATION="lossQuantization",o.LOSS_PRUNING="lossPruning",o.LOSS_MACHINE_UNLEARNING="lossMachineUnlearning",o.TESTING_ACCURACY_CHART="testing_accuracyChart",o.TESTING_LOSS_CHART="testing_lossChart",o}(At||{}),N=C(1466),ot=C(6455),rt=function(o){return o.ACCURACY="accuracy",o.LOSS="loss",o}(rt||{});const le=(o,n,s=!1)=>o.map(h=>({datasetIndex:h.datasetIndex,values:(s?h.testing:h.steps).map(u=>u[n])||[]})),Te=(o,n)=>[{datasetIndex:0,values:o.steps.map(s=>s[n]).filter(s=>null!=s)}],ni=(o,n)=>n===rt.LOSS?o.map((s,h)=>({datasetIndex:h,values:s.steps.map(u=>u?.loss).filter(u=>null!=u)})):[{datasetIndex:0,values:o.map(s=>s.accuracy).filter(s=>null!=s)}],oi=(o,n)=>o.epochs.map((s,h)=>({datasetIndex:h,values:s.steps.map(u=>u[n])})),Ie=(o,n)=>o.tests.map((s,h)=>({datasetIndex:h,values:s.steps.map(u=>u[n])}));var qt,Xt=C(1493);let Me=((qt=class{constructor(n){this.chartsFacadeService=n,this.RealtimeUpdateMetric=N.L,this.initialLossChartData=[],this.lossPruningChartSettings={},this.lossChartDisplaySettings={...wt.cS,yAxisMinimumValue:0,yAxisTickInterval:2,chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:wt.ZW,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:2,datasetColorSettingsKey:ht.g.RED,realtimeUpdateMetric:N.L.LOSS},this.initialLossTestingChartData=[],this.testingLossChartDisplaySettings={...wt.cS,yAxisMinimumValue:0,yAxisTickInterval:2,chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:wt.O1,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:2,datasetColorSettingsKey:ht.g.YELLOW,realtimeUpdateMetric:N.L.TESTING_LOSS},this.initialAccuracyChartData=[],this.accuracyPruningChartSettings={},this.accuracyChartDisplaySettings={...wt.cS,chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:wt.ZW,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.GREEN,realtimeUpdateMetric:N.L.ACCURACY},this.initialAccuracyTestingChartData=[],this.testingAccuracyChartDisplaySettings={...wt.cS,yAxisTickInterval:20,chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:wt.O1,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.YELLOW,realtimeUpdateMetric:N.L.TESTING_ACCURACY},this.initialSparsityChartData=[],this.sparsityPruningChartSettings={},this.sparsityChartDisplaySettings={...wt.cS,xAxisLabelPrefix:"Pruning",isDatasetLabelVisible:!1,yAxisTickInterval:100,chartDataStructure:ot.n.SINGLE_PHASE_X_AXIS_SKIP_ONE,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.BLUE,useSteppedLines:!0,realtimeUpdateMetric:N.L.SPARSITY}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.settings$.pipe((0,Q.T)(1),(0,st.q)(1)).subscribe(n=>{n&&(this.accuracyPruningChartSettings=n[At.ACCURACY_PRUNING]||{},this.accuracyChartDisplaySettings={...this.accuracyChartDisplaySettings,xAxisRepetitionCount:Number(this.accuracyPruningChartSettings.epochs)},this.testingAccuracyChartDisplaySettings={...this.testingAccuracyChartDisplaySettings,xAxisRepetitionCount:Number(this.accuracyPruningChartSettings.epochs)},this.lossPruningChartSettings={...n[At.LOSS_PRUNING]||{},testingSteps:wt.O1},this.lossChartDisplaySettings={...this.lossChartDisplaySettings,xAxisRepetitionCount:Number(this.lossPruningChartSettings.epochs)},this.testingLossChartDisplaySettings={...this.testingLossChartDisplaySettings,xAxisRepetitionCount:Number(this.lossPruningChartSettings.epochs)},this.sparsityPruningChartSettings={...n[At.SPARSITY_PRUNING]||{}},this.sparsityChartDisplaySettings={...this.sparsityChartDisplaySettings,xAxisDataPointsCount:this.sparsityPruningChartSettings.pruningTimes+1},this.chartsFacadeService.dispatch(M.LX.getCurrentPruningChartData()))}),this.chartsFacadeService.dispatch(M.LX.getChartConfigurationSettings({chartTypes:[At.ACCURACY_PRUNING,At.LOSS_PRUNING,At.SPARSITY_PRUNING]}))}loadLatestChartsData(){this.chartsFacadeService.pruningProgress.pipe((0,Q.T)(1),(0,F.h)(n=>!!n&&n.length>0),(0,st.q)(1)).subscribe(n=>{this.initialLossChartData=le(n,rt.LOSS),this.initialLossTestingChartData=le(n,rt.LOSS,!0),this.initialAccuracyChartData=le(n,rt.ACCURACY),this.initialAccuracyTestingChartData=le(n,rt.ACCURACY,!0),this.initialSparsityChartData=[{datasetIndex:0,values:[100,...n.flatMap(s=>s.sparsity).filter(s=>null!=s)]}]})}}).\u0275fac=function(n){return new(n||qt)(l.Y36(Xt.V))},qt.\u0275cmp=l.Xpm({type:qt,selectors:[["ms-running-pruning-charts"]],decls:23,vars:10,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"epochs"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"],[1,"ms-chart-display","sparsity-chart"]],template:function(n,s){1&n&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),l._uU(4,"Accuracy Training"),l.qZA(),l._UZ(5,"ms-line-chart",4),l.qZA(),l.TgZ(6,"div",5)(7,"p",3),l._uU(8,"Accuracy Test"),l.qZA(),l._UZ(9,"ms-line-chart",4),l.qZA()(),l.TgZ(10,"div",6)(11,"div",2)(12,"p",3),l._uU(13,"Loss Training"),l.qZA(),l._UZ(14,"ms-line-chart",4),l.qZA(),l.TgZ(15,"div",5)(16,"p",3),l._uU(17,"Loss Test"),l.qZA(),l._UZ(18,"ms-line-chart",4),l.qZA()(),l.TgZ(19,"div",7)(20,"p",3),l._uU(21,"Sparsity Training"),l.qZA(),l._UZ(22,"ms-line-chart",4),l.qZA()()),2&n&&(l.xp6(5),l.Q6J("data",s.initialAccuracyChartData)("settings",s.accuracyChartDisplaySettings),l.xp6(4),l.Q6J("data",s.initialAccuracyTestingChartData)("settings",s.testingAccuracyChartDisplaySettings),l.xp6(5),l.Q6J("data",s.initialLossChartData)("settings",s.lossChartDisplaySettings),l.xp6(4),l.Q6J("data",s.initialLossTestingChartData)("settings",s.testingLossChartDisplaySettings),l.xp6(4),l.Q6J("data",s.initialSparsityChartData)("settings",s.sparsityChartDisplaySettings))},dependencies:[$t.w],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.sparsity-chart[_ngcontent-%COMP%]{flex-direction:column}.charts[_ngcontent-%COMP%]   .ms-chart-display.sparsity-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.accuracy-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.loss-chart[_ngcontent-%COMP%]{background-color:var(--backgrounds-80);border-radius:20px;padding:10px;margin:10px 0}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .epochs[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{border-left:1px solid var(--foregrounds-300);padding-left:10px;flex:0 0 30%}"]}),qt);Me=(0,tt.gn)([(0,ct.c)()],Me);let Ai=(()=>{var o;class n{constructor(h){this.chartsFacadeService=h,this.RealtimeUpdateMetric=N.L,this.initialLossChartData=[],this.initialLossTestingChartData=[],this.initialAccuracyChartData=[],this.initialAccuracyTestingChartData=[],this.lossChartDisplaySettings={yAxisMinimumValue:0,xAxisDataPointsCount:40,datasetLabelPrefix:"Reconstruction:",xAxisLabelPrefix:"Step",chartDataStructure:ot.n.SINGLE_PHASE_X_AXIS,isXAxisVisible:!0,isXAxisDynamic:!0,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:50,datasetColorSettingsKey:ht.g.RED,realtimeUpdateMetric:N.L.LOSS},this.lossTestingChartDisplaySettings={yAxisMinimumValue:0,xAxisDataPointsCount:78,isDatasetLabelVisible:!1,xAxisLabelPrefix:"Step",chartDataStructure:ot.n.SINGLE_PHASE_X_AXIS,isXAxisVisible:!0,isXAxisDynamic:!0,isYAxisDynamic:!0,datasetColorSettingsKey:ht.g.YELLOW,dynamicYAxisGrowthRoundFactor:2,realtimeUpdateMetric:N.L.TESTING_LOSS},this.accuracyChartDisplaySettings={yAxisMaximumValue:100,yAxisMinimumValue:0,xAxisLabelPrefix:"Recon.",isDatasetLabelVisible:!1,isXAxisVisible:!0,xAxisInitialLabelValue:0,chartDataStructure:ot.n.SINGLE_PHASE_X_AXIS,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.GREEN,isXAxisDynamic:!0,realtimeUpdateMetric:N.L.ACCURACY},this.accuracyTestingChartDisplaySettings={yAxisMaximumValue:100,yAxisMinimumValue:0,xAxisDataPointsCount:78,isDatasetLabelVisible:!1,xAxisLabelPrefix:"Step",chartDataStructure:ot.n.SINGLE_PHASE_X_AXIS,isXAxisVisible:!0,isXAxisDynamic:!0,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.YELLOW,realtimeUpdateMetric:N.L.TESTING_ACCURACY}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.settings$.pipe((0,Q.T)(1),(0,st.q)(1)).subscribe(h=>{h&&(this.accuracyChartDisplaySettings={...this.accuracyChartDisplaySettings,xAxisDataPointsCount:h[At.ACCURACY_QUANTIZATION]?.reconstructions},this.chartsFacadeService.dispatch(M.LX.getCurrentQuantizationChartData()))}),this.chartsFacadeService.dispatch(M.LX.getChartConfigurationSettings({chartTypes:[At.ACCURACY_QUANTIZATION]}))}loadLatestChartsData(){this.chartsFacadeService.quantizationProgress$.pipe((0,Q.T)(1),(0,F.h)(h=>!!h),(0,st.q)(1)).subscribe(h=>this.processChartData(h))}processChartData(h){this.initialLossChartData=ni(h.reconstructions,rt.LOSS),this.initialAccuracyChartData=ni(h.reconstructions,rt.ACCURACY),this.initialLossTestingChartData=Te(h.testing,rt.LOSS),this.initialAccuracyTestingChartData=Te(h.testing,rt.ACCURACY)}}return(o=n).\u0275fac=function(h){return new(h||o)(l.Y36(Xt.V))},o.\u0275cmp=l.Xpm({type:o,selectors:[["ms-running-quantization-charts"]],decls:19,vars:8,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"reconstructions"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"]],template:function(h,u){1&h&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),l._uU(4,"Accuracy Training"),l.qZA(),l._UZ(5,"ms-line-chart",4),l.qZA(),l.TgZ(6,"div",5)(7,"p",3),l._uU(8,"Accuracy Test"),l.qZA(),l._UZ(9,"ms-line-chart",4),l.qZA()(),l.TgZ(10,"div",6)(11,"div",2)(12,"p",3),l._uU(13,"Loss Training"),l.qZA(),l._UZ(14,"ms-line-chart",4),l.qZA(),l.TgZ(15,"div",5)(16,"p",3),l._uU(17,"Loss Test"),l.qZA(),l._UZ(18,"ms-line-chart",4),l.qZA()()()),2&h&&(l.xp6(5),l.Q6J("data",u.initialAccuracyChartData)("settings",u.accuracyChartDisplaySettings),l.xp6(4),l.Q6J("data",u.initialAccuracyTestingChartData)("settings",u.accuracyTestingChartDisplaySettings),l.xp6(5),l.Q6J("data",u.initialLossChartData)("settings",u.lossChartDisplaySettings),l.xp6(4),l.Q6J("data",u.initialLossTestingChartData)("settings",u.lossTestingChartDisplaySettings))},dependencies:[$t.w],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.accuracy-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.loss-chart[_ngcontent-%COMP%]{background-color:var(--backgrounds-80);border-radius:20px;padding:10px;margin:10px 0}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .reconstructions[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{border-left:1px solid var(--foregrounds-300);padding-left:10px;margin-left:10px;flex:0 0 28.5%}"]}),n})(),si=(()=>{var o;class n{constructor(h){this.chartsFacadeService=h,this.RealtimeUpdateMetric=N.L,this.initialAccuracyChartData=[],this.accuracyChartDisplaySettings={chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisDynamic:!0,datasetLabelPrefix:"Epoch:",xAxisLabelPrefix:"Step",xAxisRepetitionCount:1,yAxisMinimumValue:0,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.GREEN,realtimeUpdateMetric:N.L.ACCURACY},this.initialAccuracyTestingChartData=[],this.testingAccuracyChartDisplaySettings={chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!0,isXAxisDynamic:!0,xAxisLabelPrefix:"Step",datasetLabelPrefix:"Test:",xAxisRepetitionCount:1,yAxisMinimumValue:0,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.YELLOW,realtimeUpdateMetric:N.L.TESTING_ACCURACY},this.initialLossChartData=[],this.lossChartDisplaySettings={chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!0,isXAxisDynamic:!0,xAxisLabelPrefix:"Step",datasetLabelPrefix:"Epoch:",xAxisRepetitionCount:1,yAxisMinimumValue:0,isYAxisDynamic:!0,datasetColorSettingsKey:ht.g.RED,realtimeUpdateMetric:N.L.LOSS},this.initialLossTestingChartData=[],this.testingLossChartDisplaySettings={chartDataStructure:ot.n.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!0,isXAxisDynamic:!0,xAxisLabelPrefix:"Step",datasetLabelPrefix:"Test:",xAxisRepetitionCount:1,yAxisMinimumValue:0,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:1,dynamicYAxisGrowthRoundFactor:2,datasetColorSettingsKey:ht.g.YELLOW,realtimeUpdateMetric:N.L.TESTING_LOSS}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.dispatch(M.LX.getCurrentMachineUnlearningChartData())}loadLatestChartsData(){this.chartsFacadeService.machineUnlearningProgress$.pipe((0,Q.T)(1),(0,F.h)(h=>!(0,xt.Qr)(h)),(0,st.q)(1)).subscribe(h=>{this.initialAccuracyChartData=oi(h,rt.ACCURACY),this.initialLossChartData=oi(h,rt.LOSS),this.initialAccuracyTestingChartData=Ie(h,rt.ACCURACY),this.initialLossTestingChartData=Ie(h,rt.LOSS)})}}return(o=n).\u0275fac=function(h){return new(h||o)(l.Y36(Xt.V))},o.\u0275cmp=l.Xpm({type:o,selectors:[["ms-running-machine-unlearning-charts"]],decls:19,vars:8,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"epochs"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"]],template:function(h,u){1&h&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),l._uU(4,"Accuracy Training"),l.qZA(),l._UZ(5,"ms-line-chart",4),l.qZA(),l.TgZ(6,"div",5)(7,"p",3),l._uU(8,"Accuracy Test"),l.qZA(),l._UZ(9,"ms-line-chart",4),l.qZA()(),l.TgZ(10,"div",6)(11,"div",2)(12,"p",3),l._uU(13,"Loss Training"),l.qZA(),l._UZ(14,"ms-line-chart",4),l.qZA(),l.TgZ(15,"div",5)(16,"p",3),l._uU(17,"Loss Test"),l.qZA(),l._UZ(18,"ms-line-chart",4),l.qZA()()()),2&h&&(l.xp6(5),l.Q6J("data",u.initialAccuracyChartData)("settings",u.accuracyChartDisplaySettings),l.xp6(4),l.Q6J("data",u.initialAccuracyTestingChartData)("settings",u.testingAccuracyChartDisplaySettings),l.xp6(5),l.Q6J("data",u.initialLossChartData)("settings",u.lossChartDisplaySettings),l.xp6(4),l.Q6J("data",u.initialLossTestingChartData)("settings",u.testingLossChartDisplaySettings))},dependencies:[$t.w],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.accuracy-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.loss-chart[_ngcontent-%COMP%]{background-color:var(--backgrounds-80);border-radius:20px;padding:10px;margin:10px 0}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .epochs[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{border-left:1px solid var(--foregrounds-300);padding-left:10px;margin-left:10px;flex:0 0 28.5%}"]}),n})();var $e,fe=C(5861),k=C(1180),mt=window,gt=mt.ShadowRoot&&(void 0===mt.ShadyCSS||mt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),ri=new WeakMap,ve=class{constructor(o,n,s){if(this._$cssResult$=!0,s!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=n}get styleSheet(){let o=this.o,n=this.t;if(gt&&void 0===o){let s=void 0!==n&&1===n.length;s&&(o=ri.get(n)),void 0===o&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),s&&ri.set(n,o))}return o}toString(){return this.cssText}},Bt=gt?o=>o:o=>o instanceof CSSStyleSheet?(n=>{let s="";for(let h of n.cssRules)s+=h.cssText;return(o=>new ve("string"==typeof o?o:o+"",void 0,ce))(s)})(o):o,ye=window,ai=ye.trustedTypes,li=ai?ai.emptyScript:"",ci=ye.reactiveElementPolyfillSupport,ke={toAttribute(o,n){switch(n){case Boolean:o=o?li:null;break;case Object:case Array:o=null==o?o:JSON.stringify(o)}return o},fromAttribute(o,n){let s=o;switch(n){case Boolean:s=null!==o;break;case Number:s=null===o?null:Number(o);break;case Object:case Array:try{s=JSON.parse(o)}catch{s=null}}return s}},hi=(o,n)=>n!==o&&(n==n||o==o),Ze={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:hi},Ue="finalized",ft=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(o){var n;this.finalize(),(null!==(n=this.h)&&void 0!==n?n:this.h=[]).push(o)}static get observedAttributes(){this.finalize();let o=[];return this.elementProperties.forEach((n,s)=>{let h=this._$Ep(s,n);void 0!==h&&(this._$Ev.set(h,s),o.push(h))}),o}static createProperty(o,n=Ze){if(n.state&&(n.attribute=!1),this.finalize(),this.elementProperties.set(o,n),!n.noAccessor&&!this.prototype.hasOwnProperty(o)){let s="symbol"==typeof o?Symbol():"__"+o,h=this.getPropertyDescriptor(o,s,n);void 0!==h&&Object.defineProperty(this.prototype,o,h)}}static getPropertyDescriptor(o,n,s){return{get(){return this[n]},set(h){let u=this[o];this[n]=h,this.requestUpdate(o,u,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(o){return this.elementProperties.get(o)||Ze}static finalize(){if(this.hasOwnProperty(Ue))return!1;this[Ue]=!0;let o=Object.getPrototypeOf(this);if(o.finalize(),void 0!==o.h&&(this.h=[...o.h]),this.elementProperties=new Map(o.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let n=this.properties,s=[...Object.getOwnPropertyNames(n),...Object.getOwnPropertySymbols(n)];for(let h of s)this.createProperty(h,n[h])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(o){let n=[];if(Array.isArray(o)){let s=new Set(o.flat(1/0).reverse());for(let h of s)n.unshift(Bt(h))}else void 0!==o&&n.push(Bt(o));return n}static _$Ep(o,n){let s=n.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof o?o.toLowerCase():void 0}_$Eu(){var o;this._$E_=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(o=this.constructor.h)||void 0===o||o.forEach(n=>n(this))}addController(o){var n,s;(null!==(n=this._$ES)&&void 0!==n?n:this._$ES=[]).push(o),void 0!==this.renderRoot&&this.isConnected&&(null===(s=o.hostConnected)||void 0===s||s.call(o))}removeController(o){var n;null===(n=this._$ES)||void 0===n||n.splice(this._$ES.indexOf(o)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((o,n)=>{this.hasOwnProperty(n)&&(this._$Ei.set(n,this[n]),delete this[n])})}createRenderRoot(){var o;let n=null!==(o=this.shadowRoot)&&void 0!==o?o:this.attachShadow(this.constructor.shadowRootOptions);return((o,n)=>{gt?o.adoptedStyleSheets=n.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet):n.forEach(s=>{let h=document.createElement("style"),u=mt.litNonce;void 0!==u&&h.setAttribute("nonce",u),h.textContent=s.cssText,o.appendChild(h)})})(n,this.constructor.elementStyles),n}connectedCallback(){var o;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(o=this._$ES)||void 0===o||o.forEach(n=>{var s;return null===(s=n.hostConnected)||void 0===s?void 0:s.call(n)})}enableUpdating(o){}disconnectedCallback(){var o;null===(o=this._$ES)||void 0===o||o.forEach(n=>{var s;return null===(s=n.hostDisconnected)||void 0===s?void 0:s.call(n)})}attributeChangedCallback(o,n,s){this._$AK(o,s)}_$EO(o,n,s=Ze){var h;let u=this.constructor._$Ep(o,s);if(void 0!==u&&!0===s.reflect){let b=(void 0!==(null===(h=s.converter)||void 0===h?void 0:h.toAttribute)?s.converter:ke).toAttribute(n,s.type);this._$El=o,null==b?this.removeAttribute(u):this.setAttribute(u,b),this._$El=null}}_$AK(o,n){var s;let h=this.constructor,u=h._$Ev.get(o);if(void 0!==u&&this._$El!==u){let b=h.getPropertyOptions(u),y="function"==typeof b.converter?{fromAttribute:b.converter}:void 0!==(null===(s=b.converter)||void 0===s?void 0:s.fromAttribute)?b.converter:ke;this._$El=u,this[u]=y.fromAttribute(n,b.type),this._$El=null}}requestUpdate(o,n,s){let h=!0;void 0!==o&&(((s=s||this.constructor.getPropertyOptions(o)).hasChanged||hi)(this[o],n)?(this._$AL.has(o)||this._$AL.set(o,n),!0===s.reflect&&this._$El!==o&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(o,s))):h=!1),!this.isUpdatePending&&h&&(this._$E_=this._$Ej())}_$Ej(){var o=this;return(0,fe.Z)(function*(){o.isUpdatePending=!0;try{yield o._$E_}catch(s){Promise.reject(s)}let n=o.scheduleUpdate();return null!=n&&(yield n),!o.isUpdatePending})()}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;this._$Ei&&(this._$Ei.forEach((h,u)=>this[u]=h),this._$Ei=void 0);let n=!1,s=this._$AL;try{n=this.shouldUpdate(s),n?(this.willUpdate(s),null===(o=this._$ES)||void 0===o||o.forEach(h=>{var u;return null===(u=h.hostUpdate)||void 0===u?void 0:u.call(h)}),this.update(s)):this._$Ek()}catch(h){throw n=!1,this._$Ek(),h}n&&this._$AE(s)}willUpdate(o){}_$AE(o){var n;null===(n=this._$ES)||void 0===n||n.forEach(s=>{var h;return null===(h=s.hostUpdated)||void 0===h?void 0:h.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(o)),this.updated(o)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(o){return!0}update(o){void 0!==this._$EC&&(this._$EC.forEach((n,s)=>this._$EO(s,this[s],n)),this._$EC=void 0),this._$Ek()}updated(o){}firstUpdated(o){}};ft[Ue]=!0,ft.elementProperties=new Map,ft.elementStyles=[],ft.shadowRootOptions={mode:"open"},ci?.({ReactiveElement:ft}),(null!==($e=ye.reactiveElementVersions)&&void 0!==$e?$e:ye.reactiveElementVersions=[]).push("1.6.3");var vt,yt=window,Wt=yt.trustedTypes,Kt=Wt?Wt.createPolicy("lit-html",{createHTML:o=>o}):void 0,he="$lit$",kt=`lit$${(Math.random()+"").slice(9)}$`,ui="?"+kt,Lt=`<${ui}>`,q=document,E=()=>q.createComment(""),H=o=>null===o||"object"!=typeof o&&"function"!=typeof o,di=Array.isArray,De="[ \t\n\f\r]",ue=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,_e=/>/g,Pt=RegExp(`>|${De}(?:([^\\s"'>=/]+)(${De}*=${De}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),pi=/'/g,mi=/"/g,be=/^(?:script|style|textarea|title)$/i,$=(1,(n,...s)=>({_$litType$:1,strings:n,values:s})),Rt=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),ze=new WeakMap,Ht=q.createTreeWalker(q,129,null,!1);function gi(o,n){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Kt?Kt.createHTML(n):n}var Yt=class yn{constructor({strings:n,_$litType$:s},h){let u;this.parts=[];let b=0,y=0,I=n.length-1,v=this.parts,[z,X]=((o,n)=>{let u,s=o.length-1,h=[],b=2===n?"<svg>":"",y=ue;for(let I=0;I<s;I++){let z,X,v=o[I],B=-1,U=0;for(;U<v.length&&(y.lastIndex=U,X=y.exec(v),null!==X);)U=y.lastIndex,y===ue?"!--"===X[1]?y=Ne:void 0!==X[1]?y=_e:void 0!==X[2]?(be.test(X[2])&&(u=RegExp("</"+X[2],"g")),y=Pt):void 0!==X[3]&&(y=Pt):y===Pt?">"===X[0]?(y=u??ue,B=-1):void 0===X[1]?B=-2:(B=y.lastIndex-X[2].length,z=X[1],y=void 0===X[3]?Pt:'"'===X[3]?mi:pi):y===mi||y===pi?y=Pt:y===Ne||y===_e?y=ue:(y=Pt,u=void 0);let Mt=y===Pt&&o[I+1].startsWith("/>")?" ":"";b+=y===ue?v+Lt:B>=0?(h.push(z),v.slice(0,B)+he+v.slice(B)+kt+Mt):v+kt+(-2===B?(h.push(void 0),I):Mt)}return[gi(o,b+(o[s]||"<?>")+(2===n?"</svg>":"")),h]})(n,s);if(this.el=yn.createElement(z,h),Ht.currentNode=this.el.content,2===s){let B=this.el.content,U=B.firstChild;U.remove(),B.append(...U.childNodes)}for(;null!==(u=Ht.nextNode())&&v.length<I;){if(1===u.nodeType){if(u.hasAttributes()){let B=[];for(let U of u.getAttributeNames())if(U.endsWith(he)||U.startsWith(kt)){let Mt=X[y++];if(B.push(U),void 0!==Mt){let Ci=u.getAttribute(Mt.toLowerCase()+he).split(kt),pe=/([.?@])?(.*)/.exec(Mt);v.push({type:1,index:b,name:pe[2],strings:Ci,ctor:"."===pe[1]?Ti:"?"===pe[1]?Mi:"@"===pe[1]?Ei:Ce})}else v.push({type:6,index:b})}for(let U of B)u.removeAttribute(U)}if(be.test(u.tagName)){let B=u.textContent.split(kt),U=B.length-1;if(U>0){u.textContent=Wt?Wt.emptyScript:"";for(let Mt=0;Mt<U;Mt++)u.append(B[Mt],E()),Ht.nextNode(),v.push({type:2,index:++b});u.append(B[U],E())}}}else if(8===u.nodeType)if(u.data===ui)v.push({type:2,index:b});else{let B=-1;for(;-1!==(B=u.data.indexOf(kt,B+1));)v.push({type:7,index:b}),B+=kt.length-1}b++}}static createElement(n,s){let h=q.createElement("template");return h.innerHTML=n,h}};function te(o,n,s=o,h){var u,b,y,I;if(n===Rt)return n;let v=void 0!==h?null===(u=s._$Co)||void 0===u?void 0:u[h]:s._$Cl,z=H(n)?void 0:n._$litDirective$;return v?.constructor!==z&&(null===(b=v?._$AO)||void 0===b||b.call(v,!1),void 0===z?v=void 0:(v=new z(o),v._$AT(o,s,h)),void 0!==h?(null!==(y=(I=s)._$Co)&&void 0!==y?y:I._$Co=[])[h]=v:s._$Cl=v),void 0!==v&&(n=te(o,v._$AS(o,n.values),v,h)),n}var je=class _n{constructor(n,s,h,u){var b;this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=n,this._$AB=s,this._$AM=h,this.options=u,this._$Cp=null===(b=u?.isConnected)||void 0===b||b}get _$AU(){var n,s;return null!==(s=null===(n=this._$AM)||void 0===n?void 0:n._$AU)&&void 0!==s?s:this._$Cp}get parentNode(){let n=this._$AA.parentNode,s=this._$AM;return void 0!==s&&11===n?.nodeType&&(n=s.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,s=this){n=te(this,n,s),H(n)?n===W||null==n||""===n?(this._$AH!==W&&this._$AR(),this._$AH=W):n!==this._$AH&&n!==Rt&&this._(n):void 0!==n._$litType$?this.g(n):void 0!==n.nodeType?this.$(n):(o=>di(o)||"function"==typeof o?.[Symbol.iterator])(n)?this.T(n):this._(n)}k(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}$(n){this._$AH!==n&&(this._$AR(),this._$AH=this.k(n))}_(n){this._$AH!==W&&H(this._$AH)?this._$AA.nextSibling.data=n:this.$(q.createTextNode(n)),this._$AH=n}g(n){var s;let{values:h,_$litType$:u}=n,b="number"==typeof u?this._$AC(n):(void 0===u.el&&(u.el=Yt.createElement(gi(u.h,u.h[0]),this.options)),u);if((null===(s=this._$AH)||void 0===s?void 0:s._$AD)===b)this._$AH.v(h);else{let y=new class{constructor(o,n){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){var n;let{el:{content:s},parts:h}=this._$AD,u=(null!==(n=o?.creationScope)&&void 0!==n?n:q).importNode(s,!0);Ht.currentNode=u;let b=Ht.nextNode(),y=0,I=0,v=h[0];for(;void 0!==v;){if(y===v.index){let z;2===v.type?z=new je(b,b.nextSibling,this,o):1===v.type?z=new v.ctor(b,v.name,v.strings,this,o):6===v.type&&(z=new fi(b,this,o)),this._$AV.push(z),v=h[++I]}y!==v?.index&&(b=Ht.nextNode(),y++)}return Ht.currentNode=q,u}v(o){let n=0;for(let s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(o,s,n),n+=s.strings.length-2):s._$AI(o[n])),n++}}(b,this),I=y.u(this.options);y.v(h),this.$(I),this._$AH=y}}_$AC(n){let s=ze.get(n.strings);return void 0===s&&ze.set(n.strings,s=new Yt(n)),s}T(n){di(this._$AH)||(this._$AH=[],this._$AR());let h,s=this._$AH,u=0;for(let b of n)u===s.length?s.push(h=new _n(this.k(E()),this.k(E()),this,this.options)):h=s[u],h._$AI(b),u++;u<s.length&&(this._$AR(h&&h._$AB.nextSibling,u),s.length=u)}_$AR(n=this._$AA.nextSibling,s){var h;for(null===(h=this._$AP)||void 0===h||h.call(this,!1,!0,s);n&&n!==this._$AB;){let u=n.nextSibling;n.remove(),n=u}}setConnected(n){var s;void 0===this._$AM&&(this._$Cp=n,null===(s=this._$AP)||void 0===s||s.call(this,n))}},Ce=class{constructor(o,n,s,h,u){this.type=1,this._$AH=W,this._$AN=void 0,this.element=o,this.name=n,this._$AM=h,this.options=u,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(o,n=this,s,h){let u=this.strings,b=!1;if(void 0===u)o=te(this,o,n,0),b=!H(o)||o!==this._$AH&&o!==Rt,b&&(this._$AH=o);else{let I,v,y=o;for(o=u[0],I=0;I<u.length-1;I++)v=te(this,y[s+I],n,I),v===Rt&&(v=this._$AH[I]),b||(b=!H(v)||v!==this._$AH[I]),v===W?o=W:o!==W&&(o+=(v??"")+u[I+1]),this._$AH[I]=v}b&&!h&&this.j(o)}j(o){o===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"")}},Ti=class extends Ce{constructor(){super(...arguments),this.type=3}j(o){this.element[this.name]=o===W?void 0:o}},Ii=Wt?Wt.emptyScript:"",Mi=class extends Ce{constructor(){super(...arguments),this.type=4}j(o){o&&o!==W?this.element.setAttribute(this.name,Ii):this.element.removeAttribute(this.name)}},Ei=class extends Ce{constructor(o,n,s,h,u){super(o,n,s,h,u),this.type=5}_$AI(o,n=this){var s;if((o=null!==(s=te(this,o,n,0))&&void 0!==s?s:W)===Rt)return;let h=this._$AH,u=o===W&&h!==W||o.capture!==h.capture||o.once!==h.once||o.passive!==h.passive,b=o!==W&&(h===W||u);u&&this.element.removeEventListener(this.name,this,h),b&&this.element.addEventListener(this.name,this,o),this._$AH=o}handleEvent(o){var n,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(n=this.options)||void 0===n?void 0:n.host)&&void 0!==s?s:this.element,o):this._$AH.handleEvent(o)}},fi=class{constructor(o,n,s){this.element=o,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(o){te(this,o)}},vi=yt.litHtmlPolyfillSupport;vi?.(Yt,je),(null!==(vt=yt.litHtmlVersions)&&void 0!==vt?vt:yt.litHtmlVersions=[]).push("2.8.0");var Fe,Ve,ee=class extends ft{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o,n;let s=super.createRenderRoot();return null!==(o=(n=this.renderOptions).renderBefore)&&void 0!==o||(n.renderBefore=s.firstChild),s}update(o){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=((o,n,s)=>{var h,u;let b=null!==(h=s?.renderBefore)&&void 0!==h?h:n,y=b._$litPart$;if(void 0===y){let I=null!==(u=s?.renderBefore)&&void 0!==u?u:null;b._$litPart$=y=new je(n.insertBefore(E(),I),I,void 0,s??{})}return y._$AI(o),y})(n,this.renderRoot,this.renderOptions)}connectedCallback(){var o;super.connectedCallback(),null===(o=this._$Do)||void 0===o||o.setConnected(!0)}disconnectedCallback(){var o;super.disconnectedCallback(),null===(o=this._$Do)||void 0===o||o.setConnected(!1)}render(){return Rt}};ee.finalized=!0,ee._$litElement$=!0,null===(Fe=globalThis.litElementHydrateSupport)||void 0===Fe||Fe.call(globalThis,{LitElement:ee});var zt=globalThis.litElementPolyfillSupport;zt?.({LitElement:ee}),(null!==(Ve=globalThis.litElementVersions)&&void 0!==Ve?Ve:globalThis.litElementVersions=[]).push("3.3.3");var $i=((o,...n)=>{let s=1===o.length?o[0]:n.reduce((h,u,b)=>h+(y=>{if(!0===y._$cssResult$)return y.cssText;if("number"==typeof y)return y;throw Error("Value passed to 'css' function must be a 'css' function result: "+y+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(u)+o[b+1],o[0]);return new ve(s,o,ce)})`
  @font-face {
    font-family: 'Karla';
    font-weight: regular;
    src: url('./fonts/Karla-regular.woff') format('woff');
  }

  * {
    box-sizing: border-box;
  }

  :host {
    --lottie-player-toolbar-height: 35px;
    --lottie-player-toolbar-background-color: transparent;
    --lottie-player-toolbar-hover-background-color: #f3f6f8;
    --lottie-player-toolbar-icon-color: #20272c;
    --lottie-player-toolbar-icon-hover-color: #f3f6f8;
    --lottie-player-toolbar-icon-active-color: #00ddb3;
    --lottie-player-seeker-track-color: #00ddb3;
    --lottie-player-seeker-accent-color: #00c1a2;
    --lottie-player-seeker-thumb-color: #00c1a2;
    --lottie-player-options-separator: #d9e0e6;

    display: block;
    width: 100%;
    height: 100%;

    font-family: 'Karla', sans-serif;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .active {
    color: var(--lottie-player-toolbar-icon-active-color) !important;
  }

  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .animation {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .animation.controls {
    height: calc(100% - var(--lottie-player-toolbar-height));
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-items: center;
    background-color: var(--lottie-player-toolbar-background-color);
    margin: 0 8px;
    height: var(--lottie-player-toolbar-height);
  }

  .btn-spacing-left {
    margin-right: 4px;
    margin-left: 8px;
  }

  .btn-spacing-center {
    margin-right: 4px;
    margin-left: 4px;
  }

  .btn-spacing-right {
    margin-right: 8px;
    margin-left: 4px;
  }

  .toolbar button {
    color: #20272c;
    cursor: pointer;
    fill: var(--lottie-player-toolbar-icon-color);
    display: flex;
    background: none;
    border: 0px;
    border-radius: 4px;
    padding: 4px;
    outline: none;
    width: 24px;
    height: 24px;
    align-items: center;
  }

  .toolbar button:hover {
    background-color: var(--lottie-player-toolbar-icon-hover-color);
    border-style: solid;
    border-radius: 2px;
  }

  .toolbar button.active {
    fill: var(--lottie-player-toolbar-icon-active-color);
  }

  .toolbar button.active:hover {
    fill: var(--lottie-player-toolbar-icon-hover-color);
    border-radius: 4px;
  }

  .toolbar button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .toolbar button svg {
    width: 16px;
    height: 16px;
  }

  .toolbar button.disabled svg {
    display: none;
  }

  .popover {
    position: absolute;
    bottom: 40px;
    left: calc(100% - 239px);
    width: 224px;
    min-height: 84px;
    max-height: 300px;
    background-color: #ffffff;
    box-shadow: 0px 8px 48px 0px rgba(243, 246, 248, 0.15), 0px 8px 16px 0px rgba(61, 72, 83, 0.16),
      0px 0px 1px 0px rgba(61, 72, 83, 0.36);
    border-radius: 8px;
    padding: 8px;
    z-index: 100;
    overflow-y: scroll;
    scrollbar-width: none;
  }
  .popover:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .popover::-webkit-scrollbar {
    width: 0px;
  }

  .popover-button {
    background: none;
    border: none;
    font-family: inherit;
    width: 100%;
    flex-direction: row;
    cursor: pointer;
    height: 32px;
    color: #20272c;
    justify-content: space-between;
    display: flex;
    padding: 4px 8px;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 4px;
  }

  .popover-button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .popover-button:hover {
    background-color: var(--lottie-player-toolbar-hover-background-color);
  }

  .popover-button-text {
    display: flex;
    color: #20272c;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    font-family: inherit;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.28px;
  }

  .reset-btn {
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
    background: none;
    border: none;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #63727e;
    padding: 0;
    width: 31px;
    height: 18px;
  }
  .reset-btn:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }
  .reset-btn:hover {
    color: #20272c;
  }

  .option-title-button {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 32px;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    cursor: pointer;
    color: var(--lottie-player-toolbar-icon-color);
    border: none;
    background: none;
    padding: 4px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.32px;
  }
  .option-title-button.themes {
    width: auto;
    padding: 0;
  }
  .option-title-button:hover {
    background-color: var(--lottie-player-toolbar-icon-hover-color);
  }

  .option-title-themes-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
  }
  .option-title-themes-row:hover {
    background-color: var(--lottie-player-toolbar-icon-hover-color);
  }

  .option-title-button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .option-title-text {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.32px;
  }

  .option-title-separator {
    margin: 8px -8px;
    border-bottom: 1px solid var(--lottie-player-options-separator);
  }

  .option-title-chevron {
    display: flex;
    padding: 4px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .option-row {
    display: flex;
    flex-direction: column;
  }
  .option-row > ul {
    padding: 0;
    margin: 0;
  }

  .option-button {
    width: 100%;
    background: none;
    border: none;
    font-family: inherit;
    display: flex;
    padding: 4px 8px;
    color: #20272c;
    overflow: hidden;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    cursor: pointer;
    height: 32px;
    font-family: inherit;
    font-size: 14px;
    border-radius: 4px;
  }
  .option-button:hover {
    background-color: var(--lottie-player-toolbar-hover-background-color);
  }
  .option-button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .option-tick {
    display: flex;
    width: 24px;
    height: 24px;
    align-items: flex-start;
    gap: 8px;
  }

  .seeker {
    height: 4px;
    width: 95%;
    outline: none;
    -webkit-appearance: none;
    -moz-apperance: none;
    border-radius: 9999px;
    cursor: pointer;
    background-image: linear-gradient(
      to right,
      rgb(0, 221, 179) calc(var(--seeker) * 1%),
      rgb(217, 224, 230) calc(var(--seeker) * 1%)
    );
  }
  .seeker.to-left {
    background-image: linear-gradient(
      to right,
      rgb(217, 224, 230) calc(var(--seeker) * 1%),
      rgb(0, 221, 179) calc(var(--seeker) * 1%)
    );
  }
  .seeker::-webkit-slider-runnable-track:focus-visible {
    color: #f07167;
    accent-color: #00ddb3;
  }

  .seeker::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
  }
  .seeker::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
    margin-top: -5px;
  }
  .seeker:focus-visible::-webkit-slider-thumb {
    background: var(--lottie-player-seeker-thumb-color);
    outline: 2px solid var(--lottie-player-seeker-track-color);
    border: 1.5px solid #ffffff;
  }
  .seeker::-webkit-slider-thumb:hover {
    background: #019d91;
  }
  .seeker::-moz-range-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
    margin-top: -5px;
    border-color: transparent;
  }
  .seeker:focus-visible::-moz-range-thumb {
    background: var(--lottie-player-seeker-thumb-color);
    outline: 2px solid var(--lottie-player-seeker-track-color);
    border: 1.5px solid #ffffff;
  }

  .error {
    display: flex;
    justify-content: center;
    margin: auto;
    height: 100%;
    align-items: center;
  }
`,G=C(2222),K=(C(7207),C(1053)),ki=(o,n)=>"method"===n.kind&&n.descriptor&&!("value"in n.descriptor)?{...n,finisher(s){s.createProperty(n.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:n.key,initializer(){"function"==typeof n.initializer&&(this[n.key]=n.initializer.call(this))},finisher(s){s.createProperty(n.key,o)}};function et(o){return(n,s)=>void 0!==s?((o,n,s)=>{n.constructor.createProperty(s,o)})(o,n,s):ki(o,n)}window;var Ae="dotlottie-player",J=class extends ee{constructor(...n){super(...n),(0,k.Z)(this,"defaultTheme",""),(0,k.Z)(this,"container",void 0),(0,k.Z)(this,"playMode",G.g.Normal),(0,k.Z)(this,"autoplay",!1),(0,k.Z)(this,"background","transparent"),(0,k.Z)(this,"controls",!1),(0,k.Z)(this,"direction",1),(0,k.Z)(this,"hover",!1),(0,k.Z)(this,"loop",void 0),(0,k.Z)(this,"renderer","svg"),(0,k.Z)(this,"speed",1),(0,k.Z)(this,"src",void 0),(0,k.Z)(this,"intermission",0),(0,k.Z)(this,"activeAnimationId",null),(0,k.Z)(this,"light",!1),(0,k.Z)(this,"worker",!1),(0,k.Z)(this,"activeStateId",void 0),(0,k.Z)(this,"_seeker",0),(0,k.Z)(this,"_dotLottieCommonPlayer",void 0),(0,k.Z)(this,"_io",void 0),(0,k.Z)(this,"_loop",void 0),(0,k.Z)(this,"_renderer","svg"),(0,k.Z)(this,"_unsubscribeListeners",void 0),(0,k.Z)(this,"_hasMultipleAnimations",!1),(0,k.Z)(this,"_hasMultipleThemes",!1),(0,k.Z)(this,"_hasMultipleStates",!1),(0,k.Z)(this,"_popoverIsOpen",!1),(0,k.Z)(this,"_animationsTabIsOpen",!1),(0,k.Z)(this,"_statesTabIsOpen",!1),(0,k.Z)(this,"_styleTabIsOpen",!1),(0,k.Z)(this,"_themesForCurrentAnimation",[]),(0,k.Z)(this,"_statesForCurrentAnimation",[])}_parseLoop(n){let s=parseInt(n,10);return Number.isInteger(s)&&s>0?(this._loop=s,s):"string"==typeof n&&["true","false"].includes(n)?(this._loop="true"===n,this._loop):((0,G.c)("loop must be a positive integer or a boolean"),!1)}_handleSeekChange(n){let s=n.currentTarget;try{let h=parseInt(s.value,10);if(!this._dotLottieCommonPlayer)return;this.seek(h/100*this._dotLottieCommonPlayer.totalFrames)}catch{throw(0,G.a)("Error while seeking animation")}}_initListeners(){let n=this._dotLottieCommonPlayer;void 0!==n?(this._unsubscribeListeners=n.state.subscribe((s,h)=>{this._seeker=s.seeker,this.requestUpdate(),h.currentState!==s.currentState&&this.dispatchEvent(new CustomEvent(s.currentState)),this.dispatchEvent(new CustomEvent(G.e.Frame,{detail:{frame:s.frame,seeker:s.seeker}})),this.dispatchEvent(new CustomEvent(G.e.VisibilityChange,{detail:{visibilityPercentage:s.visibilityPercentage}}))}),n.addEventListener("complete",()=>{this.dispatchEvent(new CustomEvent(G.e.Complete))}),n.addEventListener("loopComplete",()=>{this.dispatchEvent(new CustomEvent(G.e.LoopComplete))}),n.addEventListener("DOMLoaded",()=>{let s=this.getManifest();s&&s.themes&&(this._themesForCurrentAnimation=s.themes.filter(h=>h.animations.includes(this.getCurrentAnimationId()||""))),s&&s.states&&(this._hasMultipleStates=s.states.length>0,this._statesForCurrentAnimation=[],s.states.forEach(h=>{this._statesForCurrentAnimation.push(h)})),this.dispatchEvent(new CustomEvent(G.e.Ready))}),n.addEventListener("data_ready",()=>{this.dispatchEvent(new CustomEvent(G.e.DataReady))}),n.addEventListener("data_failed",()=>{this.dispatchEvent(new CustomEvent(G.e.DataFail))}),window&&window.addEventListener("click",s=>this._clickOutListener(s))):(0,G.c)("player not initialized - cannot add event listeners","dotlottie-player-component")}load(n,s,h){var u=this;return(0,fe.Z)(function*(){if(!u.shadowRoot)return;u._dotLottieCommonPlayer&&u._dotLottieCommonPlayer.destroy(),u._dotLottieCommonPlayer=new G.j(n,u.container,{rendererSettings:s??{scaleMode:"noScale",clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0},hover:u.hasAttribute("hover")?u.hover:void 0,renderer:u.hasAttribute("renderer")?u._renderer:void 0,loop:u.hasAttribute("loop")?u._loop:void 0,direction:u.hasAttribute("direction")?1===u.direction?1:-1:void 0,speed:u.hasAttribute("speed")?u.speed:void 0,intermission:u.hasAttribute("intermission")?Number(u.intermission):void 0,playMode:u.hasAttribute("playMode")?u.playMode:void 0,autoplay:u.hasAttribute("autoplay")?u.autoplay:void 0,activeAnimationId:u.hasAttribute("activeAnimationId")?u.activeAnimationId:void 0,defaultTheme:u.hasAttribute("defaultTheme")?u.defaultTheme:void 0,light:u.light,worker:u.worker,activeStateId:u.hasAttribute("activeStateId")?u.activeStateId:void 0}),yield u._dotLottieCommonPlayer.load(h);let b=u.getManifest();u._hasMultipleAnimations=u.animationCount()>1,b&&(b.themes&&(u._themesForCurrentAnimation=b.themes.filter(y=>y.animations.includes(u.getCurrentAnimationId()||"")),u._hasMultipleThemes=b.themes.length>0),b.states&&(u._hasMultipleStates=b.states.length>0,u._statesForCurrentAnimation=[],b.states.forEach(y=>{u._statesForCurrentAnimation.push(y)}))),u._initListeners()})()}getCurrentAnimationId(){var n;return null==(n=this._dotLottieCommonPlayer)?void 0:n.currentAnimationId}animationCount(){var n;return this._dotLottieCommonPlayer&&(null==(n=this._dotLottieCommonPlayer.getManifest())?void 0:n.animations.length)||0}animations(){if(!this._dotLottieCommonPlayer)return[];let n=this._dotLottieCommonPlayer.getManifest();return n?.animations.map(s=>s.id)||[]}currentAnimation(){return this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.currentAnimationId?this._dotLottieCommonPlayer.currentAnimationId:""}getState(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.getState():G.i}getManifest(){var n;return null==(n=this._dotLottieCommonPlayer)?void 0:n.getManifest()}getLottie(){var n;return null==(n=this._dotLottieCommonPlayer)?void 0:n.getAnimationInstance()}getVersions(){return{lottieWebVersion:G.j.getLottieWebVersion(),dotLottiePlayerVersion:"2.7.8"}}previous(n){var s;null==(s=this._dotLottieCommonPlayer)||s.previous(n)}next(n){var s;null==(s=this._dotLottieCommonPlayer)||s.next(n)}reset(){var n;null==(n=this._dotLottieCommonPlayer)||n.reset()}play(n,s){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.play(n,s)}pause(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.pause()}stop(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stop()}playOnShow(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnShow(n)}stopPlayOnShow(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnShow()}playOnScroll(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnScroll(n)}stopPlayOnScroll(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnScroll()}seek(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.seek(n)}snapshot(n=!0){if(!this.shadowRoot)return"";let s=this.shadowRoot.querySelector(".animation svg"),h=(new XMLSerializer).serializeToString(s);if(n){let u=document.createElement("a");u.href=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(h)}`,u.download=`download_${this._seeker}.svg`,document.body.appendChild(u),u.click(),document.body.removeChild(u)}return h}setTheme(n){var s;null==(s=this._dotLottieCommonPlayer)||s.setDefaultTheme(n)}themes(){var n;if(!this._dotLottieCommonPlayer)return[];let s=this._dotLottieCommonPlayer.getManifest();return(null==(n=s?.themes)?void 0:n.map(h=>h.id))||[]}getDefaultTheme(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.defaultTheme:""}getActiveStateMachine(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.activeStateId:""}_freeze(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.freeze()}setSpeed(n=1){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setSpeed(n)}setDirection(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setDirection(n)}setLooping(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setLoop(n)}isLooping(){return!!this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.loop}togglePlay(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.togglePlay()}toggleLooping(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.toggleLoop()}setPlayMode(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setMode(n)}enterInteractiveMode(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.enterInteractiveMode(n)}exitInteractiveMode(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.exitInteractiveMode()}revertToManifestValues(n){var s;null==(s=this._dotLottieCommonPlayer)||s.revertToManifestValues(n)}static get styles(){return $i}firstUpdated(){var n=this;return(0,fe.Z)(function*(){var s;n.container=null==(s=n.shadowRoot)?void 0:s.querySelector("#animation"),"IntersectionObserver"in window&&(n._io=new IntersectionObserver(h=>{var u,b;void 0!==h[0]&&h[0].isIntersecting?(null==(u=n._dotLottieCommonPlayer)?void 0:u.currentState)===G.f.Frozen&&n.play():(null==(b=n._dotLottieCommonPlayer)?void 0:b.currentState)===G.f.Playing&&n._freeze()}),n._io.observe(n.container)),n.loop?n._parseLoop(n.loop):n.hasAttribute("loop")&&n._parseLoop("true"),"svg"===n.renderer?n._renderer="svg":"canvas"===n.renderer?n._renderer="canvas":"html"===n.renderer&&(n._renderer="html"),n.src&&(yield n.load(n.src))})()}disconnectedCallback(){var n,s;this._io&&(this._io.disconnect(),this._io=void 0),null==(n=this._dotLottieCommonPlayer)||n.destroy(),null==(s=this._unsubscribeListeners)||s.call(this),window&&window.removeEventListener("click",h=>this._clickOutListener(h))}_clickOutListener(n){!n.composedPath().some(s=>s instanceof HTMLElement&&(s.classList.contains("popover")||"lottie-animation-options"===s.id))&&this._popoverIsOpen&&(this._popoverIsOpen=!1,this.requestUpdate())}renderControls(){var n,s,h,u,b;let y=(null==(n=this._dotLottieCommonPlayer)?void 0:n.currentState)===G.f.Playing,I=(null==(s=this._dotLottieCommonPlayer)?void 0:s.currentState)===G.f.Paused;return $`
      <div id="lottie-controls" aria-label="lottie-animation-controls" class="toolbar">
        ${this._hasMultipleAnimations?$`
              <button @click=${()=>this.previous()} aria-label="Previous animation" class="btn-spacing-left">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.69214 13.5C1.69214 13.7761 1.916 14 2.19214 14C2.46828 14 2.69214 13.7761 2.69214 13.5L2.69214 2.5C2.69214 2.22386 2.46828 2 2.19214 2C1.916 2 1.69214 2.22386 1.69214 2.5V13.5ZM12.5192 13.7828C13.1859 14.174 14.0254 13.6933 14.0254 12.9204L14.0254 3.0799C14.0254 2.30692 13.1859 1.8262 12.5192 2.21747L4.13612 7.13769C3.47769 7.52414 3.47769 8.4761 4.13612 8.86255L12.5192 13.7828Z"
                    fill="#20272C"
                  />
                </svg>
              </button>
            `:$``}
        <button
          id="lottie-play-button"
          @click=${()=>{this.togglePlay()}}
          class=${y||I?"active "+(this._hasMultipleAnimations?"btn-spacing-center":"btn-spacing-right"):this._hasMultipleAnimations?"btn-spacing-center":"btn-spacing-right"}
          aria-label="play / pause animation"
        >
          ${y?$`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.99996 2C3.26358 2 2.66663 2.59695 2.66663 3.33333V12.6667C2.66663 13.403 3.26358 14 3.99996 14H5.33329C6.06967 14 6.66663 13.403 6.66663 12.6667V3.33333C6.66663 2.59695 6.06967 2 5.33329 2H3.99996Z"
                    fill="#20272C"
                  />
                  <path
                    d="M10.6666 2C9.93025 2 9.33329 2.59695 9.33329 3.33333V12.6667C9.33329 13.403 9.93025 14 10.6666 14H12C12.7363 14 13.3333 13.403 13.3333 12.6667V3.33333C13.3333 2.59695 12.7363 2 12 2H10.6666Z"
                    fill="#20272C"
                  />
                </svg>
              `:$`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.33337 3.46787C3.33337 2.52312 4.35948 1.93558 5.17426 2.41379L12.8961 6.94592C13.7009 7.41824 13.7009 8.58176 12.8961 9.05408L5.17426 13.5862C4.35948 14.0644 3.33337 13.4769 3.33337 12.5321V3.46787Z"
                    fill="#20272C"
                  />
                </svg>
              `}
        </button>
        ${this._hasMultipleAnimations?$`
              <button @click=${()=>this.next()} aria-label="Next animation" class="btn-spacing-right">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.3336 2.5C14.3336 2.22386 14.1097 2 13.8336 2C13.5574 2 13.3336 2.22386 13.3336 2.5V13.5C13.3336 13.7761 13.5574 14 13.8336 14C14.1097 14 14.3336 13.7761 14.3336 13.5V2.5ZM3.50618 2.21722C2.83954 1.82595 2 2.30667 2 3.07965V12.9201C2 13.6931 2.83954 14.1738 3.50618 13.7825L11.8893 8.86231C12.5477 8.47586 12.5477 7.52389 11.8893 7.13745L3.50618 2.21722Z"
                    fill="#20272C"
                  />
                </svg>
              </button>
            `:$``}
        <input
          id="lottie-seeker-input"
          class="seeker ${-1===(null==(h=this._dotLottieCommonPlayer)?void 0:h.direction)?"to-left":""}"
          type="range"
          min="0"
          step="1"
          max="100"
          .value=${this._seeker}
          @input=${v=>this._handleSeekChange(v)}
          @mousedown=${()=>{this._freeze()}}
          @mouseup=${()=>{var v;null==(v=this._dotLottieCommonPlayer)||v.unfreeze()}}
          aria-valuemin="1"
          aria-valuemax="100"
          role="slider"
          aria-valuenow=${this._seeker}
          aria-label="lottie-seek-input"
          style=${`--seeker: ${this._seeker}`}
        />
        <button
          id="lottie-loop-toggle"
          @click=${()=>this.toggleLooping()}
          class=${null!=(u=this._dotLottieCommonPlayer)&&u.loop?"active btn-spacing-left":"btn-spacing-left"}
          aria-label="loop-toggle"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8654 2.31319C11.0607 2.11793 11.3772 2.11793 11.5725 2.31319L13.4581 4.19881C13.6534 4.39407 13.6534 4.71066 13.4581 4.90592L11.5725 6.79154C11.3772 6.9868 11.0607 6.9868 10.8654 6.79154C10.6701 6.59628 10.6701 6.27969 10.8654 6.08443L11.6162 5.33362H4V6.66695C4 7.03514 3.70152 7.33362 3.33333 7.33362C2.96514 7.33362 2.66666 7.03514 2.66666 6.66695L2.66666 4.66695C2.66666 4.29876 2.96514 4.00028 3.33333 4.00028H11.8454L10.8654 3.0203C10.6701 2.82504 10.6701 2.50846 10.8654 2.31319Z"
              fill="currentColor"
            />
            <path
              d="M12.4375 11.9999C12.8057 11.9999 13.1042 11.7014 13.1042 11.3332V9.33321C13.1042 8.96502 12.8057 8.66655 12.4375 8.66655C12.0693 8.66655 11.7708 8.96502 11.7708 9.33321V10.6665H4.15462L4.90543 9.91573C5.10069 9.72047 5.10069 9.40389 4.90543 9.20862C4.71017 9.01336 4.39359 9.01336 4.19832 9.20862L2.31271 11.0942C2.11744 11.2895 2.11744 11.6061 2.31271 11.8013L4.19832 13.687C4.39359 13.8822 4.71017 13.8822 4.90543 13.687C5.10069 13.4917 5.10069 13.1751 4.90543 12.9799L3.92545 11.9999H12.4375Z"
              fill="currentColor"
            />
          </svg>
        </button>
        ${this._hasMultipleAnimations||this._hasMultipleThemes||this._hasMultipleStates?$`
              <button
                id="lottie-animation-options"
                @click=${()=>{this._popoverIsOpen=!this._popoverIsOpen,this.requestUpdate()}}
                aria-label="options"
                class="btn-spacing-right"
                style=${"background-color: "+(this._popoverIsOpen?"var(--lottie-player-toolbar-icon-hover-color)":"")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.33337 11.6666C7.78109 11.6666 7.33337 12.1143 7.33337 12.6666C7.33337 13.2189 7.78109 13.6666 8.33337 13.6666C8.88566 13.6666 9.33337 13.2189 9.33337 12.6666C9.33337 12.1143 8.88566 11.6666 8.33337 11.6666Z"
                    fill="#20272C"
                  />
                  <path
                    d="M7.33337 7.99992C7.33337 7.44763 7.78109 6.99992 8.33337 6.99992C8.88566 6.99992 9.33338 7.44763 9.33338 7.99992C9.33338 8.5522 8.88566 8.99992 8.33337 8.99992C7.78109 8.99992 7.33337 8.5522 7.33337 7.99992Z"
                    fill="#20272C"
                  />
                  <path
                    d="M7.33337 3.33325C7.33337 2.78097 7.78109 2.33325 8.33337 2.33325C8.88566 2.33325 9.33338 2.78097 9.33338 3.33325C9.33338 3.88554 8.88566 4.33325 8.33337 4.33325C7.78109 4.33325 7.33337 3.88554 7.33337 3.33325Z"
                    fill="#20272C"
                  />
                </svg>
              </button>
            `:$``}
      </div>
      ${this._popoverIsOpen?$`
            <div
              id="popover"
              class="popover"
              tabindex="0"
              aria-label="lottie animations themes popover"
              style="min-height: ${this.themes().length>0?"84px":"auto"}"
            >
              ${this._animationsTabIsOpen||this._styleTabIsOpen||this._statesTabIsOpen?$``:$`
                    <button
                      class="popover-button"
                      tabindex="0"
                      aria-label="animations"
                      @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate()}}
                      @keydown=${v=>{("Space"===v.code||"Enter"===v.code)&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate())}}
                    >
                      <div class="popover-button-text">Animations</div>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.4697 17.5303C10.1768 17.2374 10.1768 16.7626 10.4697 16.4697L14.9393 12L10.4697 7.53033C10.1768 7.23744 10.1768 6.76256 10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L11.5303 17.5303C11.2374 17.8232 10.7626 17.8232 10.4697 17.5303Z"
                            fill="#4C5863"
                          />
                        </svg>
                      </div>
                    </button>
                  `}
              ${!this._hasMultipleThemes||this._styleTabIsOpen||this._animationsTabIsOpen||this._statesTabIsOpen?"":$` <button
                    class="popover-button"
                    aria-label="Themes"
                    @click=${()=>{this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate()}}
                    @keydown=${v=>{("Space"===v.code||"Enter"===v.code)&&(this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate())}}
                  >
                    <div class="popover-button-text">Themes</div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.4697 17.5303C10.1768 17.2374 10.1768 16.7626 10.4697 16.4697L14.9393 12L10.4697 7.53033C10.1768 7.23744 10.1768 6.76256 10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L11.5303 17.5303C11.2374 17.8232 10.7626 17.8232 10.4697 17.5303Z"
                          fill="#4C5863"
                        />
                      </svg>
                    </div>
                  </button>`}
              ${!this._hasMultipleStates||this._styleTabIsOpen||this._animationsTabIsOpen||this._statesTabIsOpen?"":$` <button
                    class="popover-button"
                    aria-label="States"
                    @click=${()=>{this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate()}}
                    @keydown=${v=>{("Space"===v.code||"Enter"===v.code)&&(this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate())}}
                  >
                    <div class="popover-button-text">States</div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.4697 17.5303C10.1768 17.2374 10.1768 16.7626 10.4697 16.4697L14.9393 12L10.4697 7.53033C10.1768 7.23744 10.1768 6.76256 10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L11.5303 17.5303C11.2374 17.8232 10.7626 17.8232 10.4697 17.5303Z"
                          fill="#4C5863"
                        />
                      </svg>
                    </div>
                  </button>`}
              ${this._animationsTabIsOpen?$`<button
                      class="option-title-button"
                      aria-label="Back to main popover menu"
                      @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate()}}
                    >
                      <div class="option-title-chevron">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L9.06066 12L13.5303 16.4697C13.8232 16.7626 13.8232 17.2374 13.5303 17.5303C13.2374 17.8232 12.7626 17.8232 12.4697 17.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L12.4697 6.46967C12.7626 6.17678 13.2374 6.17678 13.5303 6.46967Z"
                            fill="#20272C"
                          />
                        </svg>
                      </div>
                      <div>Animations</div>
                    </button>
                    <div class="option-title-separator"></div>
                    <div class="option-row">
                      <ul>
                        ${this.animations().map(v=>$`
                            <li>
                              <button
                                class="option-button"
                                aria-label=${`${v}`}
                                @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(v),this.requestUpdate()}}
                                @keydown=${z=>{("Space"===z.code||"Enter"===z.code)&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(v),this.requestUpdate())}}
                              >
                                <div class="option-tick">
                                  ${this.currentAnimation()===v?$`
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5281 5.9372C20.821 6.23009 20.821 6.70497 20.5281 6.99786L9.46297 18.063C9.32168 18.2043 9.12985 18.2833 8.93004 18.2826C8.73023 18.2819 8.53895 18.2015 8.39864 18.0593L3.46795 13.0596C3.1771 12.7647 3.1804 12.2898 3.47532 11.999C3.77024 11.7081 4.2451 11.7114 4.53595 12.0063L8.93634 16.4683L19.4675 5.9372C19.7604 5.64431 20.2352 5.64431 20.5281 5.9372Z"
                                            fill="#20272C"
                                          />
                                        </svg>
                                      `:$`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${v}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div> `:$``}
              ${this._styleTabIsOpen?$`<div class="option-title-themes-row">
                      <button
                        class="option-title-button themes"
                        aria-label="Back to main popover menu"
                        @click=${()=>{this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate()}}
                      >
                        <div class="option-title-chevron">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L9.06066 12L13.5303 16.4697C13.8232 16.7626 13.8232 17.2374 13.5303 17.5303C13.2374 17.8232 12.7626 17.8232 12.4697 17.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L12.4697 6.46967C12.7626 6.17678 13.2374 6.17678 13.5303 6.46967Z"
                              fill="#20272C"
                            />
                          </svg>
                        </div>
                        <div class="option-title-text">Themes</div>
                        ${""===(null==(b=this._dotLottieCommonPlayer)?void 0:b.defaultTheme)?$``:$`
                              <button
                                class="reset-btn"
                                @click=${()=>{this.setTheme(""),this.requestUpdate()}}
                              >
                                Reset
                              </button>
                            `}
                      </button>
                    </div>
                    <div class="option-title-separator"></div>
                    <div class="option-row">
                      <ul>
                        ${this._themesForCurrentAnimation.map(v=>$`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${v.id}"
                                @click=${()=>{this.setTheme(v.id)}}
                                @keydown=${z=>{("Space"===z.code||"Enter"===z.code)&&this.setTheme(v.id)}}
                              >
                                <div class="option-tick">
                                  ${this.getDefaultTheme()===v.id?$`
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5281 5.9372C20.821 6.23009 20.821 6.70497 20.5281 6.99786L9.46297 18.063C9.32168 18.2043 9.12985 18.2833 8.93004 18.2826C8.73023 18.2819 8.53895 18.2015 8.39864 18.0593L3.46795 13.0596C3.1771 12.7647 3.1804 12.2898 3.47532 11.999C3.77024 11.7081 4.2451 11.7114 4.53595 12.0063L8.93634 16.4683L19.4675 5.9372C19.7604 5.64431 20.2352 5.64431 20.5281 5.9372Z"
                                            fill="#20272C"
                                          />
                                        </svg>
                                      `:$`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${v.id}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:$``}
              ${this._statesTabIsOpen?$`<div class="option-title-themes-row">
                      <button
                        class="option-title-button themes"
                        aria-label="Back to main popover menu"
                        @click=${()=>{this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate()}}
                      >
                        <div class="option-title-chevron">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L9.06066 12L13.5303 16.4697C13.8232 16.7626 13.8232 17.2374 13.5303 17.5303C13.2374 17.8232 12.7626 17.8232 12.4697 17.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L12.4697 6.46967C12.7626 6.17678 13.2374 6.17678 13.5303 6.46967Z"
                              fill="#20272C"
                            />
                          </svg>
                        </div>
                        <div class="option-title-text">States</div>
                        <button
                          class="reset-btn"
                          @click=${()=>{this.exitInteractiveMode(),this.requestUpdate()}}
                        >
                          Reset
                        </button>
                      </button>
                    </div>
                    <div class="option-title-separator"></div>
                    <div class="option-row">
                      <ul>
                        ${this._statesForCurrentAnimation.map(v=>$`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${v}"
                                @click=${()=>{this.enterInteractiveMode(v)}}
                                @keydown=${z=>{("Space"===z.code||"Enter"===z.code)&&this.enterInteractiveMode(v)}}
                              >
                                <div class="option-tick">
                                  ${this.getActiveStateMachine()===v?$`
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5281 5.9372C20.821 6.23009 20.821 6.70497 20.5281 6.99786L9.46297 18.063C9.32168 18.2043 9.12985 18.2833 8.93004 18.2826C8.73023 18.2819 8.53895 18.2015 8.39864 18.0593L3.46795 13.0596C3.1771 12.7647 3.1804 12.2898 3.47532 11.999C3.77024 11.7081 4.2451 11.7114 4.53595 12.0063L8.93634 16.4683L19.4675 5.9372C19.7604 5.64431 20.2352 5.64431 20.5281 5.9372Z"
                                            fill="#20272C"
                                          />
                                        </svg>
                                      `:$`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${v}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:$``}
            </div>
          `:$``}
    `}render(){var n;return $`
      <div id="animation-container" class=${this.controls?"main controls":"main"} lang="en" role="img" aria-label="lottie-animation-container">
        <div id="animation" class=${this.controls?"animation controls":"animation"} style="background:${this.background};">
          ${(null==(n=this._dotLottieCommonPlayer)?void 0:n.currentState)===G.f.Error?$` <div class="error">⚠️</div> `:void 0}
        </div>
        ${this.controls?this.renderControls():void 0}
      </div>
    `}};(0,K.a)([et({type:String})],J.prototype,"defaultTheme",2),(0,K.a)([function Ni(o,n){return(({finisher:o,descriptor:n})=>(s,h)=>{var u;if(void 0===h){let b=null!==(u=s.originalKey)&&void 0!==u?u:s.key,y=null!=n?{kind:"method",placement:"prototype",key:b,descriptor:n(s.key)}:{...s,key:b};return null!=o&&(y.finisher=function(I){o(I,b)}),y}{let b=s.constructor;void 0!==n&&Object.defineProperty(s,h,n(h)),o?.(b,h)}})({descriptor:s=>{let h={get(){var u,b;return null!==(b=null===(u=this.renderRoot)||void 0===u?void 0:u.querySelector(o))&&void 0!==b?b:null},enumerable:!0,configurable:!0};if(n){let u="symbol"==typeof s?Symbol():"__"+s;h.get=function(){var b,y;return void 0===this[u]&&(this[u]=null!==(y=null===(b=this.renderRoot)||void 0===b?void 0:b.querySelector(o))&&void 0!==y?y:null),this[u]}}return h}})}("#animation")],J.prototype,"container",2),(0,K.a)([et()],J.prototype,"playMode",2),(0,K.a)([et({type:Boolean})],J.prototype,"autoplay",2),(0,K.a)([et({type:String})],J.prototype,"background",2),(0,K.a)([et({type:Boolean})],J.prototype,"controls",2),(0,K.a)([et({type:Number})],J.prototype,"direction",2),(0,K.a)([et({type:Boolean})],J.prototype,"hover",2),(0,K.a)([et({type:String})],J.prototype,"loop",2),(0,K.a)([et({type:String})],J.prototype,"renderer",2),(0,K.a)([et({type:Number})],J.prototype,"speed",2),(0,K.a)([et({type:String})],J.prototype,"src",2),(0,K.a)([et()],J.prototype,"intermission",2),(0,K.a)([et({type:String})],J.prototype,"activeAnimationId",2),(0,K.a)([et({type:Boolean})],J.prototype,"light",2),(0,K.a)([et({type:Boolean})],J.prototype,"worker",2),(0,K.a)([et({type:String})],J.prototype,"activeStateId",2),(0,K.a)([function Ui(o){return et({...o,state:!0})}()],J.prototype,"_seeker",2),customElements.get(Ae)||customElements.define(Ae,J);var xe=C(127);const ie={[Tt.PRUNING]:{path:"../assets/animations/pruning.lottie",speed:.15,className:"pruning"},[Tt.QUANTIZATION]:{path:"../assets/animations/quantization.lottie",speed:.08,className:"quant"}};var jt;const Be=["lottiePlayer"];let ne=((jt=class{constructor(n,s,h){this.scriptFacadeService=n,this.el=s,this.renderer=h}ngAfterViewInit(){const n=ie[this.animationType];if(!n)throw new Error(`Unknown animation type: ${this.animationType}`);this.initializeAnimation(n)}initializeAnimation(n){setTimeout(()=>{this.lottiePlayer.nativeElement.load(n.path,{progresiveLoad:!0})},0),this.renderer.addClass(this.el.nativeElement,n.className)}listenToScriptStateChanges(){this.lottiePlayer.nativeElement.setSpeed(ie[this.animationType].speed),this.scriptFacadeService.scriptStatus$.pipe((0,ct.t)(this)).subscribe(s=>{(0,xe.A)(s)?this.playAnimation():this.stopAnimation()})}playAnimation(){this.lottiePlayer.nativeElement.play()}stopAnimation(){this.lottiePlayer.nativeElement.stop()}}).\u0275fac=function(n){return new(n||jt)(l.Y36(ae.O),l.Y36(l.SBq),l.Y36(l.Qsj))},jt.\u0275cmp=l.Xpm({type:jt,selectors:[["ms-running-animation"]],viewQuery:function(n,s){if(1&n&&l.Gf(Be,7),2&n){let h;l.iGM(h=l.CRH())&&(s.lottiePlayer=h.first)}},inputs:{animationType:"animationType"},decls:3,vars:1,consts:[[1,"parent-container"],["loop","","renderer","svg",3,"worker","ready"],["lottiePlayer",""]],template:function(n,s){1&n&&(l.TgZ(0,"div",0)(1,"dotlottie-player",1,2),l.NdJ("ready",function(){return s.listenToScriptStateChanges()}),l.qZA()()),2&n&&(l.xp6(1),l.Q6J("worker",!0))},styles:[".parent-container[_ngcontent-%COMP%]{overflow:hidden;height:300px;border-radius:10px;margin-bottom:10px;position:relative;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}dotlottie-player[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:cover;position:absolute;top:50%;left:0;transform:translateY(-50%)}.pruning[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{background-color:#b2ddff}@media (max-width: 1000px){.pruning[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{height:180px}}@media (min-width: 1200px){.pruning[_nghost-%COMP%]   dotlottie-player[_ngcontent-%COMP%]{width:900px;left:calc((100% - 900px)/2)}}.quant[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{background-color:#1649a8}@media (max-width: 1000px){.quant[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{height:180px}}@media (min-width: 1100px){.quant[_nghost-%COMP%]   dotlottie-player[_ngcontent-%COMP%]{width:900px;left:calc((100% - 900px)/2)}}"],changeDetection:0}),jt);(0,tt.gn)([function _i(o,n){const s=o.ngOnInit;o.ngOnInit=function(){if(null==this[n])throw new Error(`Required input '${n}' was not provided in ${o.constructor.name}.`);if(s)return s.apply(this)}}],ne.prototype,"animationType",void 0),ne=(0,tt.gn)([(0,ct.c)()],ne);var He=C(5676),we=C(9532);let zi=(()=>{var o;class n{constructor(){this.keyMap={forget_acc:"Forget Accuracy",retain_acc:"Retain Accuracy",test_acc:"Test Accuracy",val_acc:"Validation Accuracy"}}transform(h){if(!h)return h;const u=h.split("_");if(u.length<3)return h;const b=u.slice(0,-2).join("_"),y=u[u.length-1];return`${this.keyMap[b]||b.split("_").map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(" ")} (Test #${y})`}}return(o=n).\u0275fac=function(h){return new(h||o)},o.\u0275pipe=l.Yjl({name:"readableStatisticsLabel",type:o,pure:!0}),n})();function Ye(o,n){if(1&o&&(l.TgZ(0,"div",7)(1,"span",8),l._uU(2),l.ALo(3,"readableStatisticsLabel"),l.qZA(),l.TgZ(4,"span",9),l._uU(5),l.qZA()()),2&o){const s=n.$implicit;l.xp6(2),l.hij("",l.lcZ(3,2,s.key),":"),l.xp6(3),l.Oqu(s.value)}}function bi(o,n){if(1&o&&(l.ynx(0),l.TgZ(1,"div",5),l.YNc(2,Ye,6,4,"div",6),l.qZA(),l.BQk()),2&o){const s=l.oxw().ngIf;l.xp6(2),l.Q6J("ngForOf",s.stats)}}function Je(o,n){1&o&&l._UZ(0,"ms-empty-state",10)}function ji(o,n){if(1&o&&(l.ynx(0),l.YNc(1,bi,3,1,"ng-container",3),l.YNc(2,Je,1,0,"ng-template",null,4,l.W1O),l.BQk()),2&o){const s=n.ngIf,h=l.MAs(3);l.xp6(1),l.Q6J("ngIf",null==s.stats?null:s.stats.length)("ngIfElse",h)}}const Qe=function(o){return{stats:o}};let Fi=(()=>{var o;class n{constructor(h){this.statisticsFacadeService=h,this.statistics$=this.statisticsFacadeService.statistics$}ngOnInit(){this.statisticsFacadeService.dispatch(He.tK.getStatistics())}}return(o=n).\u0275fac=function(h){return new(h||o)(l.Y36(we.VC))},o.\u0275cmp=l.Xpm({type:o,selectors:[["ms-running-statistics"]],decls:6,vars:7,consts:[[1,"ms-card"],[1,"heading-section-title"],[4,"ngIf"],[4,"ngIf","ngIfElse"],["noStatistics",""],[1,"key-value-container","dense"],["class","key-value-pair",4,"ngFor","ngForOf"],[1,"key-value-pair"],[1,"key-value-key"],[1,"key-value-value"],["title","No statistics available."]],template:function(h,u){1&h&&(l.TgZ(0,"mat-card",0)(1,"p",1),l._uU(2,"Statistics"),l.qZA(),l.YNc(3,ji,4,2,"ng-container",2),l.ALo(4,"keyvalue"),l.ALo(5,"async"),l.qZA()),2&h&&(l.xp6(3),l.Q6J("ngIf",l.VKq(5,Qe,l.lcZ(4,1,l.lcZ(5,3,u.statistics$)))))},dependencies:[T.sg,T.O5,Gt.a8,Oe.u,T.Ov,T.Nd,zi]}),n})();var oe,Le=C(39),Vi=C(2596),Ge=C(2599);function Xe(o,n){if(1&o){const s=l.EpF();l.TgZ(0,"div",18)(1,"button",19),l.NdJ("click",function(){l.CHM(s);const u=l.oxw();return l.KtG(u.runStopScript())}),l._uU(2," Stop "),l.qZA()()}}function Bi(o,n){1&o&&(l.TgZ(0,"div",20)(1,"div",13),l._uU(2,"\u2014"),l.qZA(),l.TgZ(3,"div",14),l._uU(4,"Sparsity"),l.qZA()())}let de=((oe=class{constructor(n,s){this.scriptFacadeService=n,this.chartToolsGlobalSignalsService=s,this.isScriptActive=!1}ngOnInit(){this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.dispatch(Le.aj.getCurrentOrLastActiveScriptDetails()),this.scriptFacadeService.scriptDetails$.pipe((0,Q.T)(1),(0,st.q)(1),(0,F.h)(n=>!(0,xt.Bm)(n?.algKey))).subscribe(n=>{this.scriptDetails=n}),this.scriptFacadeService.scriptStatus$.pipe((0,ct.t)(this)).subscribe(n=>{this.isScriptActive=(0,xe.A)(n)})}toggleTooltip(n){this.chartToolsGlobalSignalsService.toggleTooltips=n.checked}toggleZoom(n){this.chartToolsGlobalSignalsService.toggleZoom=n.checked}get isSparsityVisible(){return this.scriptDetails?.type===Nt.Bd.PRUNING}runStopScript(){this.scriptFacadeService.dispatch(Le.aj.stopScript())}}).\u0275fac=function(n){return new(n||oe)(l.Y36(we.OF),l.Y36(Ft.d))},oe.\u0275cmp=l.Xpm({type:oe,selectors:[["ms-running-status-bar"]],decls:33,vars:5,consts:[[1,"training-status","mb-2"],[1,"status-bar"],[1,"runnning-title-container"],[1,"model-name","heading-sub-section-title"],["class","ml-2",4,"ngIf"],[1,"mt-2","flex"],["color","primary",3,"disabled","change"],[1,"flex"],["color","primary",1,"ml-2",3,"disabled","change"],[1,"ml-1"],["fontSet","ms","fontIcon","icon-Info","matTooltip","Use mouse wheel or touchpad pinch to zoom in/out. Drag to select an area for specific zoom, or use touchpad gestures to navigate."],[1,"metrics"],[1,"metric","accuracy"],[1,"metric-value"],[1,"metric-name","paragraph-semibold-p2-large-emphasis"],[1,"metric","loss"],["class","metric sparsity",4,"ngIf"],[1,"metric","testing"],[1,"ml-2"],["mat-raised-button","","color","warn","matTooltip","Stop current process.",3,"click"],[1,"metric","sparsity"]],template:function(n,s){1&n&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"div",2)(4,"div",3),l._uU(5),l.qZA(),l.YNc(6,Xe,3,0,"div",4),l.qZA(),l.TgZ(7,"div",5)(8,"div")(9,"mat-slide-toggle",6),l.NdJ("change",function(u){return s.toggleTooltip(u)}),l._uU(10," Enable tooltips "),l.qZA()(),l.TgZ(11,"div",7)(12,"mat-slide-toggle",8),l.NdJ("change",function(u){return s.toggleZoom(u)}),l._uU(13," Enable zoom "),l.qZA(),l.TgZ(14,"div",9),l._UZ(15,"mat-icon",10),l.qZA()()()()(),l.TgZ(16,"div",11)(17,"div",12)(18,"div",13),l._uU(19,"\u2014"),l.qZA(),l.TgZ(20,"div",14),l._uU(21,"Accuracy"),l.qZA()(),l.TgZ(22,"div",15)(23,"div",13),l._uU(24,"\u2014"),l.qZA(),l.TgZ(25,"div",14),l._uU(26,"Loss"),l.qZA()(),l.YNc(27,Bi,5,0,"div",16),l.TgZ(28,"div",17)(29,"div",13),l._uU(30,"\u2014"),l.qZA(),l.TgZ(31,"div",14),l._uU(32,"Test"),l.qZA()()()()),2&n&&(l.xp6(5),l.hij("Algorithm: ",(null==s.scriptDetails?null:s.scriptDetails.algKey)||"None",""),l.xp6(1),l.Q6J("ngIf",s.isScriptActive),l.xp6(3),l.Q6J("disabled",!(null!=s.scriptDetails&&s.scriptDetails.algKey)),l.xp6(3),l.Q6J("disabled",!(null!=s.scriptDetails&&s.scriptDetails.algKey)),l.xp6(15),l.Q6J("ngIf",s.isSparsityVisible))},dependencies:[T.O5,It.lW,Vt.Hw,Vi.gM,Ge.Rr],styles:[".training-status[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.training-status[_ngcontent-%COMP%]   .status-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.training-status[_ngcontent-%COMP%]   .runnning-title-container[_ngcontent-%COMP%]{display:flex;align-items:center}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%], .training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]{display:flex;gap:10px}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-size:1.25rem}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.sparsity[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-sparsity)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.accuracy[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-accuracy)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.loss[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-loss)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.testing[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-testing)}"]}),oe);var se;function qe(o,n){if(1&o&&l._UZ(0,"ms-running-animation",10),2&o){const s=l.oxw();l.Q6J("animationType",s.AnimationType.QUANTIZATION)}}function Hi(o,n){if(1&o&&l._UZ(0,"ms-running-animation",10),2&o){const s=l.oxw();l.Q6J("animationType",s.AnimationType.PRUNING)}}function We(o,n){if(1&o&&l._UZ(0,"ms-running-animation",10),2&o){const s=l.oxw();l.Q6J("animationType",s.AnimationType.PRUNING)}}function Yi(o,n){1&o&&l._UZ(0,"ms-running-quantization-charts")}function Ke(o,n){1&o&&l._UZ(0,"ms-running-pruning-charts")}function Z(o,n){1&o&&l._UZ(0,"ms-running-machine-unlearning-charts")}function Jt(o,n){if(1&o&&(l.ynx(0)(1,1),l.YNc(2,Yi,1,0,"ms-running-quantization-charts",11),l.YNc(3,Ke,1,0,"ms-running-pruning-charts",11),l.YNc(4,Z,1,0,"ms-running-machine-unlearning-charts",11),l.BQk()()),2&o){const s=l.oxw();l.xp6(1),l.Q6J("ngSwitch",null==s.scriptDetails?null:s.scriptDetails.type),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.QUANTIZATION),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.PRUNING),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.MACHINE_UNLEARNING)}}function V(o,n){1&o&&l._UZ(0,"ms-empty-state",12)}function Ji(o,n){1&o&&(l.ynx(0),l.TgZ(1,"div",13),l._UZ(2,"ms-running-statistics"),l.qZA(),l.BQk())}de=(0,tt.gn)([(0,ct.c)()],de);let re=((se=class{constructor(n,s){this.navigationService=n,this.scriptFacadeService=s,this.AlgorithmType=Nt.Bd,this.AnimationType=Tt}ngOnInit(){this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.dispatch(nt.a.getCurrentOrLastActiveScriptDetails()),this.scriptFacadeService.scriptDetails$.pipe((0,Q.T)(1),(0,st.q)(1),(0,F.h)(n=>!(0,xt.Bm)(n?.algKey))).subscribe(n=>{this.scriptDetails=n})}get isChartVisible(){return!(0,xt.Qr)(this.scriptDetails?.algKey)&&this.scriptDetails?.type!==Nt.Bd.TRAIN}}).\u0275fac=function(n){return new(n||se)(l.Y36(ii.f),l.Y36(ae.O))},se.\u0275cmp=l.Xpm({type:se,selectors:[["ms-running"]],decls:16,vars:7,consts:[[1,"heading-primary-title","title"],[3,"ngSwitch"],[3,"animationType",4,"ngSwitchCase"],[1,"ms-card","running-prunning"],[4,"ngIf","ngIfElse"],["noChartData",""],[4,"ngIf"],[1,"mt-4"],["mat-stroked-button","","color","primary",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],[3,"animationType"],[4,"ngSwitchCase"],["title","No Chart Data Available","message","Please run the appropriate script to generate chart data."],[1,"mt-2"]],template:function(n,s){if(1&n&&(l.TgZ(0,"p",0),l._uU(1,"Running"),l.qZA(),l.ynx(2,1),l.YNc(3,qe,1,1,"ms-running-animation",2),l.YNc(4,Hi,1,1,"ms-running-animation",2),l.YNc(5,We,1,1,"ms-running-animation",2),l.BQk(),l.TgZ(6,"mat-card",3),l._UZ(7,"ms-running-status-bar"),l.YNc(8,Jt,5,4,"ng-container",4),l.YNc(9,V,1,0,"ng-template",null,5,l.W1O),l.qZA(),l.YNc(11,Ji,3,0,"ng-container",6),l.TgZ(12,"div",7)(13,"button",8),l.NdJ("click",function(){return s.navigationService.goToPreviousPage()}),l._UZ(14,"mat-icon",9),l._uU(15," Go back "),l.qZA()()),2&n){const h=l.MAs(10);l.xp6(2),l.Q6J("ngSwitch",null==s.scriptDetails?null:s.scriptDetails.type),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.QUANTIZATION),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.PRUNING),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.MACHINE_UNLEARNING),l.xp6(3),l.Q6J("ngIf",s.isChartVisible)("ngIfElse",h),l.xp6(3),l.Q6J("ngIf",(null==s.scriptDetails?null:s.scriptDetails.type)===s.AlgorithmType.MACHINE_UNLEARNING)}},dependencies:[T.O5,T.RF,T.n9,It.lW,Vt.Hw,Gt.a8,Oe.u,Me,Ai,si,ne,Fi,de]}),se);re=(0,tt.gn)([(0,ct.c)()],re);const Qi=[{path:"",component:re}];let Gi=(()=>{var o;class n{}return(o=n).\u0275fac=function(h){return new(h||o)},o.\u0275mod=l.oAB({type:o}),o.\u0275inj=l.cJS({imports:[j.Bz.forChild(Qi),j.Bz]}),n})(),Xi=(()=>{var o;class n{}return(o=n).\u0275fac=function(h){return new(h||o)},o.\u0275mod=l.oAB({type:o}),o.\u0275inj=l.cJS({providers:[Ft.d],imports:[Gi,T.ez,w.m,$t.w]}),n})()},7207:(Si,Qt,C)=>{C.d(Qt,{a:()=>ct,b:()=>st});var T=Object.create,w=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,Ft=Object.getOwnPropertyNames,j=Object.getPrototypeOf,tt=Object.prototype.hasOwnProperty,ct=(F,nt)=>()=>(nt||F((nt={exports:{}}).exports,nt),nt.exports),st=(F,nt,xt)=>(xt=null!=F?T(j(F)):{},((F,nt,xt,Nt)=>{if(nt&&"object"==typeof nt||"function"==typeof nt)for(let Tt of Ft(nt))!tt.call(F,Tt)&&undefined!==Tt&&w(F,Tt,{get:()=>nt[Tt],enumerable:!(Nt=$t(nt,Tt))||Nt.enumerable});return F})(!nt&&F&&F.__esModule?xt:w(xt,"default",{value:F,enumerable:!0}),F))},2222:(Si,Qt,C)=>{C.d(Qt,{a:()=>Z,b:()=>Jt,c:()=>V,d:()=>Xi,e:()=>ln,f:()=>cn,g:()=>hn,h:()=>Ot,i:()=>un,j:()=>wn});var T=C(5861),w=C(1180),$t={},j=Uint8Array,tt=Uint16Array,ct=Int32Array,Q=new j([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),st=new j([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),F=new j([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),nt=function(i,t){for(var e=new tt(31),r=0;r<31;++r)e[r]=t+=1<<i[r-1];var a=new ct(e[30]);for(r=1;r<30;++r)for(var c=e[r];c<e[r+1];++c)a[c]=c-e[r]<<5|r;return{b:e,r:a}},xt=nt(Q,2),Nt=xt.b,Tt=xt.r;Nt[28]=258,Tt[258]=28;var ii=nt(st,0).b,ae=new tt(32768);for(M=0;M<32768;++M)ae[M]=((65280&(It=(61680&(It=(52428&(It=(43690&M)>>1|(21845&M)<<1))>>2|(13107&It)<<2))>>4|(3855&It)<<4))>>8|(255&It)<<8)>>1;var It,Vt=function(i,t,e){for(var r=i.length,a=0,c=new tt(t);a<r;++a)i[a]&&++c[i[a]-1];var p,d=new tt(t);for(a=1;a<t;++a)d[a]=d[a-1]+c[a-1]<<1;if(e){p=new tt(1<<t);var m=15-t;for(a=0;a<r;++a)if(i[a])for(var g=a<<4|i[a],_=t-i[a],f=d[i[a]-1]++<<_,S=f|(1<<_)-1;f<=S;++f)p[ae[f]>>m]=g}else for(p=new tt(r),a=0;a<r;++a)i[a]&&(p[a]=ae[d[i[a]-1]++]>>15-i[a]);return p},Gt=new j(288);for(M=0;M<144;++M)Gt[M]=8;for(M=144;M<256;++M)Gt[M]=9;for(M=256;M<280;++M)Gt[M]=7;for(M=280;M<288;++M)Gt[M]=8;var Oe=new j(32);for(M=0;M<32;++M)Oe[M]=5;var M,wt=Vt(Gt,9,1),ht=Vt(Oe,5,1),At=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},N=function(i,t,e){var r=t/8|0;return(i[r]|i[r+1]<<8)>>(7&t)&e},ot=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(7&t)},rt=function(i){return(i+7)/8|0},ge=function(i,t,e){return(null==t||t<0)&&(t=0),(null==e||e>i.length)&&(e=i.length),new j(i.subarray(t,e))},le=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],at=function(i,t,e){var r=new Error(t||le[i]);if(r.code=i,Error.captureStackTrace&&Error.captureStackTrace(r,at),!e)throw r;return r},Te=function(i,t,e,r){var a=i.length,c=r?r.length:0;if(!a||t.f&&!t.l)return e||new j(0);var d=!e,p=d||2!=t.i,m=t.i;d&&(e=new j(3*a));var g=function(gn){var fn=e.length;if(gn>fn){var vn=new j(Math.max(2*fn,gn));vn.set(e),e=vn}},_=t.f||0,f=t.p||0,S=t.b||0,A=t.l,L=t.d,x=t.m,O=t.n,P=8*a;do{if(!A){_=N(i,f,1);var R=N(i,f+1,3);if(f+=3,!R){var Ki=i[(St=rt(f)+4)-4]|i[St-3]<<8,tn=St+Ki;if(tn>a){m&&at(0);break}p&&g(S+Ki),e.set(i.subarray(St,tn),S),t.b=S+=Ki,t.p=f=8*tn,t.f=_;continue}if(1==R)A=wt,L=ht,x=9,O=5;else if(2==R){var D=N(i,f,31)+257,_t=N(i,f+10,15)+4,it=D+N(i,f+5,31)+1;f+=14;for(var bt=new j(it),ut=new j(19),Y=0;Y<_t;++Y)ut[F[Y]]=N(i,f+3*Y,7);f+=3*_t;var lt=At(ut),Zt=(1<<lt)-1,dt=Vt(ut,lt,1);for(Y=0;Y<it;){var St,Ct=dt[N(i,f,Zt)];if(f+=15&Ct,(St=Ct>>4)<16)bt[Y++]=St;else{var Et=0,pt=0;for(16==St?(pt=3+N(i,f,3),f+=2,Et=bt[Y-1]):17==St?(pt=3+N(i,f,7),f+=3):18==St&&(pt=11+N(i,f,127),f+=7);pt--;)bt[Y++]=Et}}var Ut=bt.subarray(0,D),Dt=bt.subarray(D);x=At(Ut),O=At(Dt),A=Vt(Ut,x,1),L=Vt(Dt,O,1)}else at(1);if(f>P){m&&at(0);break}}p&&g(S+131072);for(var Ln=(1<<x)-1,Pn=(1<<O)-1,en=f;;en=f){var Pe=(Et=A[ot(i,f)&Ln])>>4;if((f+=15&Et)>P){m&&at(0);break}if(Et||at(2),Pe<256)e[S++]=Pe;else{if(256==Pe){en=f,A=null;break}var dn=Pe-254;Pe>264&&(dn=N(i,f,(1<<(ei=Q[Y=Pe-257]))-1)+Nt[Y],f+=ei);var nn=L[ot(i,f)&Pn],on=nn>>4;if(nn||at(3),f+=15&nn,Dt=ii[on],on>3){var ei=st[on];Dt+=ot(i,f)&(1<<ei)-1,f+=ei}if(f>P){m&&at(0);break}p&&g(S+131072);var pn=S+dn;if(S<Dt){var mn=c-Dt,On=Math.min(Dt,pn);for(mn+S<0&&at(3);S<On;++S)e[S]=r[mn+S]}for(;S<pn;++S)e[S]=e[S-Dt]}}t.l=A,t.p=en,t.b=S,t.f=_,A&&(_=1,t.m=x,t.d=L,t.n=O)}while(!_);return S!=e.length&&d?ge(e,0,S):e.subarray(0,S)},ni=new j(0),Ie=function(i,t,e){for(var r=i(),a=i.toString(),c=a.slice(a.indexOf("[")+1,a.lastIndexOf("]")).replace(/\s+/g,"").split(","),d=0;d<r.length;++d){var p=r[d],m=c[d];if("function"==typeof p){t+=";"+m+"=";var g=p.toString();if(p.prototype)if(-1!=g.indexOf("[native code]")){var _=g.indexOf(" ",8)+1;t+=g.slice(_,g.indexOf("(",_))}else for(var f in t+=g,p.prototype)t+=";"+m+".prototype."+f+"="+p.prototype[f].toString();else t+=g}else e[m]=p}return t},Xt=[],Ai=function(){return[j,tt,ct,Q,st,F,Nt,ii,wt,ht,ae,le,Vt,At,N,ot,rt,ge,at,Te,ve,si,fe]},si=function(i){return postMessage(i,[i.buffer])},fe=function(i){return i&&{out:i.size&&new j(i.size),dictionary:i.dictionary}},k=function(i,t,e,r,a,c){var d=function(i,t,e,r){if(!Xt[e]){for(var a="",c={},d=i.length-1,p=0;p<d;++p)a=Ie(i[p],a,c);Xt[e]={c:Ie(i[d],a,c),e:c}}var m=function(i,t){var e={};for(var r in i)e[r]=i[r];for(var r in t)e[r]=t[r];return e}({},Xt[e].e);return function(i,t,e,r,a){var c=new Worker($t[t]||($t[t]=URL.createObjectURL(new Blob([i+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return c.onmessage=function(d){var p=d.data,m=p.$e$;if(m){var g=new Error(m[0]);g.code=m[1],g.stack=m[2],a(g,null)}else a(null,p)},c.postMessage(e,r),c}(Xt[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",e,m,function(i){var t=[];for(var e in i)i[e].buffer&&t.push((i[e]=new i[e].constructor(i[e])).buffer);return t}(m),r)}(e,r,a,function(p,m){d.terminate(),c(p,m)});return d.postMessage([i,t],t.consume?[i.buffer]:[]),function(){d.terminate()}},mt=function(i,t){return i[t]|i[t+1]<<8},gt=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},ce=function(i,t){return gt(i,t)+4294967296*gt(i,t+4)};function ve(i,t){return Te(i,{i:2},t&&t.out,t&&t.dictionary)}var Ee=typeof TextDecoder<"u"&&new TextDecoder;try{Ee.decode(ni,{stream:!0})}catch{}var wi=function(i){for(var t="",e=0;;){var r=i[e++],a=(r>127)+(r>223)+(r>239);if(e+a>i.length)return{s:t,r:ge(i,e-1)};a?3==a?(r=((15&r)<<18|(63&i[e++])<<12|(63&i[e++])<<6|63&i[e++])-65536,t+=String.fromCharCode(55296|r>>10,56320|1023&r)):t+=String.fromCharCode(1&a?(31&r)<<6|63&i[e++]:(15&r)<<12|(63&i[e++])<<6|63&i[e++]):t+=String.fromCharCode(r)}};function Bt(i,t){if(t){for(var e="",r=0;r<i.length;r+=16384)e+=String.fromCharCode.apply(null,i.subarray(r,r+16384));return e}if(Ee)return Ee.decode(i);var a=wi(i),c=a.s;return(e=a.r).length&&at(8),c}var $e=function(i,t){return t+30+mt(i,t+26)+mt(i,t+28)},ye=function(i,t,e){var r=mt(i,t+28),a=Bt(i.subarray(t+46,t+46+r),!(2048&mt(i,t+8))),c=t+46+r,d=gt(i,t+20),p=e&&4294967295==d?ai(i,c):[d,gt(i,t+24),gt(i,t+42)],m=p[0],g=p[1],_=p[2];return[mt(i,t+10),m,g,a,c+mt(i,t+30)+mt(i,t+32),_]},ai=function(i,t){for(;1!=mt(i,t);t+=4+mt(i,t+2));return[ce(i,t+12),ce(i,t+4),ce(i,t+20)]},li="function"==typeof queueMicrotask?queueMicrotask:"function"==typeof setTimeout?setTimeout:function(i){i()};function ke(i){return(Array.isArray(i)?i:i.issues).reduce((t,e)=>{if(e.path){let r=e.path.map(({key:a})=>a).join(".");t.nested[r]=[...t.nested[r]||[],e.message]}else t.root=[...t.root||[],e.message];return t},{nested:{}})}var hi=class extends Error{constructor(t){super(t[0].message),(0,w.Z)(this,"issues",void 0),this.name="ValiError",this.issues=t}};function Ze(i,t){return{reason:i?.reason,validation:t.validation,origin:i?.origin||"value",message:t.message,input:t.input,abortEarly:i?.abortEarly,abortPipeEarly:i?.abortPipeEarly}}function Ue(i,t){return{reason:t,origin:i?.origin,abortEarly:i?.abortEarly,abortPipeEarly:i?.abortPipeEarly}}function ft(i,t,e,r){if(!t||!t.length)return{output:i};let a,c,d=i;for(let p of t){let m=p(d);if(m.issue){a=a||Ue(e,r);let g=Ze(a,m.issue);if(c?c.push(g):c=[g],a.abortEarly||a.abortPipeEarly)break}else d=m.output}return c?{issues:c}:{output:d}}function vt(i,t){return i&&"string"!=typeof i?[void 0,i]:[i,t]}function yt(i,t,e,r,a,c){return{issues:[{reason:t,validation:e,origin:i?.origin||"value",message:r,input:a,issues:c,abortEarly:i?.abortEarly,abortPipeEarly:i?.abortPipeEarly}]}}function Kt(i,t,e){let[r,a]=vt(t,e);return{schema:"array",array:{item:i},async:!1,_parse(c,d){if(!Array.isArray(c))return yt(d,"type","array",r||"Invalid type",c);let p,m=[];for(let g=0;g<c.length;g++){let _=c[g],f=i._parse(_,d);if(f.issues){let S={schema:"array",input:c,key:g,value:_};for(let A of f.issues)A.path?A.path.unshift(S):A.path=[S],p?.push(A);if(p||(p=f.issues),null!=d&&d.abortEarly)break}else m.push(f.output)}return p?{issues:p}:ft(m,a,d,"array")}}}function he(i,t){let[e,r]=vt(i,t);return{schema:"boolean",async:!1,_parse:(a,c)=>"boolean"!=typeof a?yt(c,"type","boolean",e||"Invalid type",a):ft(a,r,c,"boolean")}}function kt(i,t){return{schema:"literal",literal:i,async:!1,_parse:(e,r)=>e!==i?yt(r,"type","literal",t||"Invalid type",e):{output:e}}}function Lt(i,t){let[e,r]=vt(i,t);return{schema:"number",async:!1,_parse:(a,c)=>"number"!=typeof a?yt(c,"type","number",e||"Invalid type",a):ft(a,r,c,"number")}}function q(i,t,e){let c,[r,a]=vt(t,e);return{schema:"object",object:i,async:!1,_parse(d,p){if(!d||"object"!=typeof d)return yt(p,"type","object",r||"Invalid type",d);c=c||Object.entries(i);let m,g={};for(let[_,f]of c){let S=d[_],A=f._parse(S,p);if(A.issues){let L={schema:"object",input:d,key:_,value:S};for(let x of A.issues)x.path?x.path.unshift(L):x.path=[L],m?.push(x);if(m||(m=A.issues),null!=p&&p.abortEarly)break}else g[_]=A.output}return m?{issues:m}:ft(g,a,p,"object")}}}function E(i){return{schema:"optional",wrapped:i,async:!1,_parse:(t,e)=>void 0===t?{output:t}:i._parse(t,e)}}function H(i,t){let[e,r]=vt(i,t);return{schema:"string",async:!1,_parse:(a,c)=>"string"!=typeof a?yt(c,"type","string",e||"Invalid type",a):ft(a,r,c,"string")}}var Li=["__proto__","prototype","constructor"];function Ne(i,t,e,r){let[a,c,d]=function ue(i,t,e){if("object"==typeof i&&!Array.isArray(i)){let[c,d]=vt(t,e);return[i,c,d]}let[r,a]=vt(i,t);return[void 0,r,a]}(t,e,r);return{schema:"tuple",tuple:{items:i,rest:a},async:!1,_parse(p,m){if(!Array.isArray(p)||!a&&i.length!==p.length||a&&i.length>p.length)return yt(m,"type","tuple",c||"Invalid type",p);let g,_=[];for(let f=0;f<i.length;f++){let S=p[f],A=i[f]._parse(S,m);if(A.issues){let L={schema:"tuple",input:p,key:f,value:S};for(let x of A.issues)x.path?x.path.unshift(L):x.path=[L],g?.push(x);if(g||(g=A.issues),null!=m&&m.abortEarly)break}else _[f]=A.output}if(a)for(let f=i.length;f<p.length;f++){let S=p[f],A=a._parse(S,m);if(A.issues){let L={schema:"tuple",input:p,key:f,value:S};for(let x of A.issues)x.path?x.path.unshift(L):x.path=[L],g?.push(x);if(g||(g=A.issues),null!=m&&m.abortEarly)break}else _[f]=A.output}return g?{issues:g}:ft(_,d,m,"tuple")}}}function _e(i,t){return{schema:"union",union:i,async:!1,_parse(e,r){let a,c;for(let d of i){let p=d._parse(e,r);if(!p.issues){c=[p.output];break}if(a)for(let m of p.issues)a.push(m);else a=p.issues}return c?{output:c[0]}:yt(r,"type","union",t||"Invalid type",e,a)}}}function Pt(i,t,e){let[r,a]=vt(t,e);return q(i.reduce((c,d)=>({...c,...d.object}),{}),r,a)}function be(i,t){return e=>e>i?{issue:{validation:"max_value",message:t||"Invalid value",input:e}}:{output:e}}function Re(i,t){return e=>e<i?{issue:{validation:"min_value",message:t||"Invalid value",input:e}}:{output:e}}var i,$=Object.create,Rt=Object.defineProperty,W=Object.getOwnPropertyDescriptor,ze=Object.getOwnPropertyNames,Ht=Object.getPrototypeOf,gi=Object.prototype.hasOwnProperty,Yt=(i,t)=>function(){return t||(0,i[ze(i)[0]])((t={exports:{}}).exports,t),t.exports},Ce=Yt({"../../node_modules/.pnpm/@rgba-image+copy@0.1.3/node_modules/@rgba-image/copy/dist/index.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.copy=void 0,i.copy=(e,r,a=0,c=0,d=e.width-a,p=e.height-c,m=0,g=0)=>{if(a|=0,c|=0,p|=0,m|=0,g|=0,(d|=0)<=0||p<=0)return;let _=new Uint32Array(e.data.buffer),f=new Uint32Array(r.data.buffer);for(let S=0;S<p;S++){let A=c+S;if(A<0||A>=e.height)continue;let L=g+S;if(!(L<0||L>=r.height))for(let x=0;x<d;x++){let O=a+x;if(O<0||O>=e.width)continue;let P=m+x;P<0||P>=r.width||(f[L*r.width+P]=_[A*e.width+O])}}}}}),Ti=Yt({"../../node_modules/.pnpm/@rgba-image+create-image@0.1.1/node_modules/@rgba-image/create-image/dist/index.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.CreateImageFactory=(t=[0,0,0,0],e=4)=>{if(e=Math.floor(e),isNaN(e)||e<1)throw TypeError("channels should be a positive non-zero number");if(!("length"in t)||t.length<e)throw TypeError(`fill should be iterable with at least ${e} members`);let r=(t=new Uint8ClampedArray(t).slice(0,e)).every(a=>0===a);return(a,c,d)=>{if(void 0===a||void 0===c)throw TypeError("Not enough arguments");if(a=Math.floor(a),c=Math.floor(c),isNaN(a)||a<1||isNaN(c)||c<1)throw TypeError("Index or size is negative or greater than the allowed amount");let p=a*c*e;if(void 0===d&&(d=new Uint8ClampedArray(p)),d instanceof Uint8ClampedArray){if(d.length!==p)throw TypeError("Index or size is negative or greater than the allowed amount");if(!r)for(let m=0;m<c;m++)for(let g=0;g<a;g++){let _=(m*a+g)*e;for(let f=0;f<e;f++)d[_+f]=t[f]}return{get width(){return a},get height(){return c},get data(){return d}}}throw TypeError("Expected data to be Uint8ClampedArray or undefined")}},i.createImage=i.CreateImageFactory()}}),Ii=Yt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/filters.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.filters=void 0;var e=(c,d)=>{if(c<=-d||c>=d||0==c)return 0;let p=c*Math.PI;return Math.sin(p)/p*Math.sin(p/d)/(p/d)},r=c=>Math.round(16383*c);i.filters=(c,d,p,m,g)=>{let _=g?2:3,f=1/p,S=Math.min(1,p),A=_/S,L=Math.floor(2*(A+1)),x=new Int16Array((L+2)*d),O=0;for(let P=0;P<d;P++){let R=(P+.5)*f+m,D=Math.max(0,Math.floor(R-A)),_t=Math.min(c-1,Math.ceil(R+A)),it=_t-D+1,bt=new Float32Array(it),ut=new Int16Array(it),Y=0,lt=0;for(let pt=D;pt<=_t;pt++){let Ut=e((pt+.5-R)*S,_);Y+=Ut,bt[lt]=Ut,lt++}let Zt=0;for(let pt=0;pt<bt.length;pt++){let Ut=bt[pt]/Y;Zt+=Ut,ut[pt]=r(Ut)}ut[d>>1]+=r(1-Zt);let dt=0;for(;dt<ut.length&&0===ut[dt];)dt++;let Ct=ut.length-1;for(;Ct>0&&0===ut[Ct];)Ct--;let Et=Ct-dt+1;x[O++]=D+dt,x[O++]=Et,x.set(ut.subarray(dt,Ct+1),O),O+=Et}return x}}}),Mi=Yt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/convolve.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.convolve=void 0,i.convolve=(r,a,c,d,p,m)=>{let g=0,_=0;for(let f=0;f<d;f++){let S=0;for(let A=0;A<p;A++){let x=g+4*m[S++]|0,O=0,P=0,R=0,D=0;for(let _t=m[S++];_t>0;_t--){let it=m[S++];O=O+it*r[x]|0,P=P+it*r[x+1]|0,R=R+it*r[x+2]|0,D=D+it*r[x+3]|0,x=x+4|0}a[_]=O+8192>>14,a[_+1]=P+8192>>14,a[_+2]=R+8192>>14,a[_+3]=D+8192>>14,_=_+4*d|0}_=4*(f+1)|0,g=(f+1)*c*4|0}}}}),Ei=Yt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/index.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.lanczos2=i.lanczos=void 0;var t=Ce(),e=Ti(),r=Ii(),a=Mi(),c=(m,g,_=!1)=>{let S=g.height/m.height,A=r.filters(m.width,g.width,g.width/m.width,0,_),L=r.filters(m.height,g.height,S,0,_),x=new Uint8ClampedArray(g.width*m.height*4);a.convolve(m.data,x,m.width,m.height,g.width,A),a.convolve(x,g.data,m.height,g.width,g.height,L)};i.lanczos=(m,g,_=0,f=0,S=m.width-_,A=m.height-f,L=0,x=0,O=g.width-L,P=g.height-x)=>{if(f|=0,A|=0,L|=0,x|=0,O|=0,P|=0,(S|=0)<=0||A<=0||O<=0||P<=0)return;if(0==(_|=0)&&0===f&&S===m.width&&A===m.height&&0===L&&0===x&&O===g.width&&P===g.height)return void c(m,g);let R=e.createImage(S,A),D=e.createImage(O,P);t.copy(m,R,_,f),c(R,D),t.copy(D,g,0,0,D.width,D.height,L,x)},i.lanczos2=(m,g,_=0,f=0,S=m.width-_,A=m.height-f,L=0,x=0,O=g.width-L,P=g.height-x)=>{if(f|=0,A|=0,L|=0,x|=0,O|=0,P|=0,(S|=0)<=0||A<=0||O<=0||P<=0)return;if(0==(_|=0)&&0===f&&S===m.width&&A===m.height&&0===L&&0===x&&O===g.width&&P===g.height)return void c(m,g,!0);let R=e.createImage(S,A),D=e.createImage(O,P);t.copy(m,R,_,f),c(R,D,!0),t.copy(D,g,0,0,D.width,D.height,L,x)}}}),fi=((i=fi||{}).Bounce="bounce",i.Normal="normal",i),vi=function ui(i,t){return{schema:"native_enum",nativeEnum:i,async:!1,_parse:(e,r)=>Object.values(i).includes(e)?{output:e}:yt(r,"type","native_enum",t||"Invalid type",e)}}(fi),yi=q({autoplay:E(he()),defaultTheme:E(H()),direction:E(_e([kt(1),kt(-1)])),hover:E(he()),id:H(),intermission:E(Lt()),loop:E(_e([he(),Lt()])),playMode:E(vi),speed:E(Lt()),themeColor:E(H())}),Fe=q({animations:Kt(H()),id:H()}),Ve=q({activeAnimationId:E(H()),animations:Kt(yi),author:E(H()),custom:E(function De(i,t,e,r){let[a,c,d,p]=function di(i,t,e,r){if("object"==typeof t&&!Array.isArray(t)){let[d,p]=vt(e,r);return[i,t,d,p]}let[a,c]=vt(t,e);return[H(),i,a,c]}(i,t,e,r);return{schema:"record",record:{key:a,value:c},async:!1,_parse(m,g){if(!m||"object"!=typeof m)return yt(g,"type","record",d||"Invalid type",m);let _,f={};for(let[S,A]of Object.entries(m))if(!Li.includes(S)){let L,x=a._parse(S,{origin:"key",abortEarly:g?.abortEarly,abortPipeEarly:g?.abortPipeEarly});if(x.issues){L={schema:"record",input:m,key:S,value:A};for(let P of x.issues)P.path=[L],_?.push(P);if(_||(_=x.issues),null!=g&&g.abortEarly)break}let O=c._parse(A,g);if(O.issues){L=L||{schema:"record",input:m,key:S,value:A};for(let P of O.issues)P.path?P.path.unshift(L):P.path=[L],_?.push(P);if(_||(_=O.issues),null!=g&&g.abortEarly)break}!x.issues&&!O.issues&&(f[x.output]=O.output)}return _?{issues:_}:ft(f,p,g,"record")}}}(H(),function Wt(i=[]){return{schema:"any",async:!1,_parse:(t,e)=>ft(t,i,e,"any")}}())),description:E(H()),generator:E(H()),keywords:E(H()),revision:E(Lt()),themes:E(Kt(Fe)),states:E(Kt(H())),version:E(H())}),ee=function pi(i,t,e,r){let[a,c]=vt(e,r);return q(Object.entries(i.object).reduce((d,[p,m])=>t.includes(p)?d:{...d,[p]:m},{}),a,c)}(yi,["id"]),zt=q({state:H()}),$i=zt,G=Pt([zt,q({ms:Lt()})]),sn=Pt([zt,q({count:Lt()})]),K=zt,ki=zt,Zi=zt,et=Pt([zt,q({threshold:E(Kt(Lt([Re(0),be(1)])))})]),Ui=q({onAfter:E(G),onClick:E($i),onComplete:E(Zi),onEnter:E(sn),onMouseEnter:E(K),onMouseLeave:E(ki),onShow:E(et)}),Di=Pt([ee,q({playOnScroll:E(Ne([Lt([Re(0),be(1)]),Lt([Re(0),be(1)])])),segments:E(_e([Ne([Lt(),Lt()]),H()]))})]);Pt([Ui,q({animationId:E(H()),playbackSettings:Di})]);var Ni={jpeg:"image/jpeg",png:"image/png",gif:"image/gif",bmp:"image/bmp",svg:"image/svg+xml",webp:"image/webp",mpeg:"audio/mpeg",mp3:"audio/mp3"},Se={jpeg:[255,216,255],png:[137,80,78,71,13,10,26,10],gif:[71,73,70],bmp:[66,77],webp:[82,73,70,70,87,69,66,80],svg:[60,63,120],mp3:[73,68,51,3,0,0,0,0],mpeg:[73,68,51,3,0,0,0,0]},Ri=i=>{let t=null,e=[];if(!i)return null;let r=i.substring(i.indexOf(",")+1);t=typeof window>"u"?Buffer.from(r,"base64").toString("binary"):atob(r);let a=new Uint8Array(t.length);for(let c=0;c<t.length;c+=1)a[c]=t.charCodeAt(c);e=Array.from(a.subarray(0,8));for(let c in Se){let d=Se[c];if(d&&e.every((p,m)=>p===d[m]))return Ni[c]}return null},Ae=class extends Error{constructor(i,t){super(i),((i,t,e)=>{((i,t,e)=>{t in i?Rt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e})(i,"symbol"!=typeof t?t+"":t,e)})(this,"code"),this.name="[dotlottie-js]",this.code=t}};function J(i){let t;if(typeof window>"u")t=Buffer.from(i).toString("base64");else{let e=Array.prototype.map.call(i,r=>String.fromCharCode(r)).join("");t=window.btoa(e)}return`data:${Ri(t)};base64,${t}`}function _i(i){return"w"in i&&"h"in i&&!("xt"in i)&&"p"in i}function xe(i){return!("h"in i)&&!("w"in i)&&"p"in i&&"e"in i&&"u"in i&&"id"in i}function ie(i){return jt.apply(this,arguments)}function jt(){return jt=(0,T.Z)(function*(i,t=(()=>!0)){if(!(i instanceof Uint8Array))throw new Ae("DotLottie not found","INVALID_DOTLOTTIE");return yield new Promise((e,r)=>{!function ci(i,t,e){e||(e=t,t={}),"function"!=typeof e&&at(7);var r=[],a=function(){for(var O=0;O<r.length;++O)r[O]()},c={},d=function(O,P){li(function(){e(O,P)})};li(function(){d=e});for(var p=i.length-22;101010256!=gt(i,p);--p)if(!p||i.length-p>65558)return d(at(13,0,1),null),a;var m=mt(i,p+8);if(m){var g=m,_=gt(i,p+16),f=4294967295==_||65535==g;if(f){var S=gt(i,p-12);(f=101075792==gt(i,S))&&(g=m=gt(i,S+32),_=gt(i,S+48))}for(var A=t&&t.filter,L=function(O){var P=ye(i,_,f),R=P[0],D=P[1],_t=P[2],it=P[3],bt=P[4],Y=$e(i,P[5]);_=bt;var lt=function(dt,Ct){dt?(a(),d(dt,null)):(Ct&&(c[it]=Ct),--m||d(null,c))};if(!A||A({name:it,size:D,originalSize:_t,compression:R}))if(R)if(8==R){var Zt=i.subarray(Y,Y+D);if(D<32e4)try{lt(null,ve(Zt,{out:new j(_t)}))}catch(dt){lt(dt,null)}else r.push(function ri(i,t,e){return e||(e=t,t={}),"function"!=typeof e&&at(7),k(i,t,[Ai],function(r){return si(ve(r.data[0],fe(r.data[1])))},1,e)}(Zt,{size:_t},lt))}else lt(at(14,"unknown compression type "+R,1),null);else lt(null,ge(i,Y,Y+D));else lt(null,null)},x=0;x<g;++x)L()}else d(null,{});return a}(i,{filter:t},(a,c)=>{a&&r(a),e(c)})})}),jt.apply(this,arguments)}function Be(i,t,e){return ne.apply(this,arguments)}function ne(){return ne=(0,T.Z)(function*(i,t,e){if(!(i instanceof Uint8Array))throw new Ae("DotLottie not found","INVALID_DOTLOTTIE");return(yield ie(i,r=>r.name===t&&(!e||e(r))))[t]}),ne.apply(this,arguments)}function He(i){return we.apply(this,arguments)}function we(){return we=(0,T.Z)(function*(i){let t="manifest.json",e=(yield ie(i,r=>r.name===t))[t];if(!(typeof e>"u"))return JSON.parse(Bt(e,!1))}),we.apply(this,arguments)}function Ye(){return Ye=(0,T.Z)(function*(i){if(!(i instanceof Uint8Array))return{success:!1,error:"DotLottie not found"};let t=yield He(i);if(typeof t>"u")return{success:!1,error:"Invalid .lottie file, manifest.json is missing"};let e=function mi(i,t,e){let r=i._parse(t,e);return r.issues?{success:!1,error:new hi(r.issues),issues:r.issues}:{success:!0,data:r.output,output:r.output}}(Ve,t);return e.success?{success:!0}:{success:!1,error:`Invalid .lottie file, manifest.json structure is invalid, ${JSON.stringify(ke(e.error).nested,null,2)}`}}),Ye.apply(this,arguments)}function bi(i){return Je.apply(this,arguments)}function Je(){return Je=(0,T.Z)(function*(i){let t=new Uint8Array(i),e=yield function zi(i){return Ye.apply(this,arguments)}(t);if(e.error)throw new Ae(e.error,"INVALID_DOTLOTTIE");return t}),Je.apply(this,arguments)}function Qe(){return Qe=(0,T.Z)(function*(i,t){let e=yield ie(i,a=>{let c=a.name.replace("audio/","");return a.name.startsWith("audio/")&&(!t||t({...a,name:c}))}),r={};for(let a in e){let c=e[a];c instanceof Uint8Array&&(r[a.replace("audio/","")]=J(c))}return r}),Qe.apply(this,arguments)}function Le(){return Le=(0,T.Z)(function*(i,t){var e;let r=new Map;for(let[c,d]of Object.entries(t))for(let p of d.assets||[])if(xe(p)){let m=p.p;r.has(m)||r.set(m,new Set),null==(e=r.get(m))||e.add(c)}let a=yield function ji(i,t){return Qe.apply(this,arguments)}(i,c=>r.has(c.name));for(let[c,d]of r){let p=a[c];if(p)for(let m of d){let g=t[m];for(let _ of g?.assets||[])xe(_)&&_.p===c&&(_.p=p,_.u="",_.e=1)}}}),Le.apply(this,arguments)}function Ge(){return Ge=(0,T.Z)(function*(i,t){let e=yield ie(i,a=>{let c=a.name.replace("images/","");return a.name.startsWith("images/")&&(!t||t({...a,name:c}))}),r={};for(let a in e){let c=e[a];c instanceof Uint8Array&&(r[a.replace("images/","")]=J(c))}return r}),Ge.apply(this,arguments)}function Xe(){return Xe=(0,T.Z)(function*(i,t){var e;let r=new Map;for(let[c,d]of Object.entries(t))for(let p of d.assets||[])if(_i(p)){let m=p.p;r.has(m)||r.set(m,new Set),null==(e=r.get(m))||e.add(c)}let a=yield function Vi(i,t){return Ge.apply(this,arguments)}(i,c=>r.has(c.name));for(let[c,d]of r){let p=a[c];if(p)for(let m of d){let g=t[m];for(let _ of g?.assets||[])_i(_)&&_.p===c&&(_.p=p,_.u="",_.e=1)}}}),Xe.apply(this,arguments)}function de(){return de=(0,T.Z)(function*(i,t,{inlineAssets:e}={},r){let a=`animations/${t}.json`,c=yield Be(i,a,r);if(typeof c>"u")return;let d=JSON.parse(Bt(c,!1));if(!e)return d;let p={[t]:d};return yield function oe(i,t){return Xe.apply(this,arguments)}(i,p),yield function Fi(i,t){return Le.apply(this,arguments)}(i,p),d}),de.apply(this,arguments)}function qe(){return qe=(0,T.Z)(function*(i,t,e){let r=`themes/${t}.lss`,a=yield Be(i,r,e);if(!(typeof a>"u"))return Bt(a,!1)}),qe.apply(this,arguments)}function We(){return We=(0,T.Z)(function*(i,t){let e={},r=yield ie(i,a=>{let c=a.name.replace("states/","").replace(".json","");return a.name.startsWith("states/")&&(!t||t({...a,name:c}))});for(let a in r){let c=r[a];c instanceof Uint8Array&&(e[a.replace("states/","").replace(".json","")]=Bt(c,!1))}return e}),We.apply(this,arguments)}function Ke(){return Ke=(0,T.Z)(function*(i,t,e){let r=`states/${t}.json`,a=yield Be(i,r,e);return typeof a>"u"?void 0:JSON.parse(Bt(a,!1))}),Ke.apply(this,arguments)}function Z(i,t="dotLottie-common"){return new Error(`[${t}]: ${i}`)}function Jt(i,t="dotLottie-common",...e){console.error(`[${t}]:`,i,...e)}function V(i,t="dotLottie-common",...e){console.warn(`[${t}]:`,i,...e)}function re(i){return["v","ip","op","layers","fr","w","h"].every(t=>Object.prototype.hasOwnProperty.call(i,t))}function Xi(i,t){let e=Object.keys(i).find(r=>i[r]===t);if(void 0===e)throw new Error("Value not found in the object.");return e}function o(i){return JSON.parse(JSON.stringify(i))}function h(){return h=(0,T.Z)(function*(i,t){let[{relottie:e},{default:r}]=yield Promise.all([C.e(884).then(C.bind(C,1884)),C.e(923).then(C.bind(C,8923))]),a=yield e().use(r,{lss:t}).process(JSON.stringify(i));return JSON.parse(a.value)}),h.apply(this,arguments)}function u(){throw new Error("Cycle detected")}function b(){if(v>1)v--;else{for(var i,t=!1;void 0!==I;){var e=I;for(I=void 0,z++;void 0!==e;){var r=e.o;if(e.o=void 0,e.f&=-3,!(8&e.f)&&Ci(e))try{e.c()}catch(a){t||(i=a,t=!0)}e=r}}if(z=0,v--,t)throw i}}((i,t,e)=>{e=null!=i?$(Ht(i)):{},((i,t,e,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let a of ze(t))!gi.call(i,a)&&undefined!==a&&Rt(i,a,{get:()=>t[a],enumerable:!(r=W(t,a))||r.enumerable})})(i&&i.__esModule?e:Rt(e,"default",{value:i,enumerable:!0}),i)})(Ei());var y=void 0,I=void 0,v=0,z=0,X=0;function B(i){if(void 0!==y){var t=i.n;if(void 0===t||t.t!==y)return t={i:0,S:i,p:y.s,n:void 0,t:y,e:void 0,x:void 0,r:t},void 0!==y.s&&(y.s.n=t),y.s=t,i.n=t,32&y.f&&i.S(t),t;if(-1===t.i)return t.i=0,void 0!==t.n&&(t.n.p=t.p,void 0!==t.p&&(t.p.n=t.n),t.p=y.s,t.n=void 0,y.s.n=t,y.s=t),t}}function U(i){this.v=i,this.i=0,this.n=void 0,this.t=void 0}function Ci(i){for(var t=i.s;void 0!==t;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function pe(i){for(var t=i.s;void 0!==t;t=t.n){var e=t.S.n;if(void 0!==e&&(t.r=e),t.S.n=t,t.i=-1,void 0===t.n){i.s=t;break}}}function rn(i){for(var t=i.s,e=void 0;void 0!==t;){var r=t.p;-1===t.i?(t.S.U(t),void 0!==r&&(r.n=t.n),void 0!==t.n&&(t.n.p=r)):e=t,t.S.n=t.r,void 0!==t.r&&(t.r=void 0),t=r}i.s=e}function me(i){U.call(this,void 0),this.x=i,this.s=void 0,this.g=X-1,this.f=4}function an(i){var t=i.u;if(i.u=void 0,"function"==typeof t){v++;var e=y;y=void 0;try{t()}catch(r){throw i.f&=-2,i.f|=8,qi(i),r}finally{y=e,b()}}}function qi(i){for(var t=i.s;void 0!==t;t=t.n)t.S.U(t);i.x=void 0,i.s=void 0,an(i)}function bn(i){if(y!==this)throw new Error("Out-of-order effect");rn(this),y=i,this.f&=-2,8&this.f&&qi(this),b()}function ti(i){this.x=i,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}function Wi(){return Wi=(0,T.Z)(function*(i,t){let[{DotLottieStateMachineManager:e}]=yield Promise.all([C.e(562).then(C.bind(C,3233))]);if(!i.length)throw Z("No state machines available inside this .lottie!");return new e(i,t)}),Wi.apply(this,arguments)}U.prototype.h=function(){return!0},U.prototype.S=function(i){this.t!==i&&void 0===i.e&&(i.x=this.t,void 0!==this.t&&(this.t.e=i),this.t=i)},U.prototype.U=function(i){if(void 0!==this.t){var t=i.e,e=i.x;void 0!==t&&(t.x=e,i.e=void 0),void 0!==e&&(e.e=t,i.x=void 0),i===this.t&&(this.t=e)}},U.prototype.subscribe=function(i){var t=this;return function Cn(i){var t=new ti(i);try{t.c()}catch(e){throw t.d(),e}return t.d.bind(t)}(function(){var e=t.value,r=32&this.f;this.f&=-33;try{i(e)}finally{this.f|=r}})},U.prototype.valueOf=function(){return this.value},U.prototype.toString=function(){return this.value+""},U.prototype.toJSON=function(){return this.value},U.prototype.peek=function(){return this.v},Object.defineProperty(U.prototype,"value",{get:function(){var i=B(this);return void 0!==i&&(i.i=this.i),this.v},set:function(i){if(y instanceof me&&function(){throw new Error("Computed cannot have side-effects")}(),i!==this.v){z>100&&u(),this.v=i,this.i++,X++,v++;try{for(var t=this.t;void 0!==t;t=t.x)t.t.N()}finally{b()}}}}),(me.prototype=new U).h=function(){if(this.f&=-3,1&this.f)return!1;if(32==(36&this.f)||(this.f&=-5,this.g===X))return!0;if(this.g=X,this.f|=1,this.i>0&&!Ci(this))return this.f&=-2,!0;var i=y;try{pe(this),y=this;var t=this.x();(16&this.f||this.v!==t||0===this.i)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return y=i,rn(this),this.f&=-2,!0},me.prototype.S=function(i){if(void 0===this.t){this.f|=36;for(var t=this.s;void 0!==t;t=t.n)t.S.S(t)}U.prototype.S.call(this,i)},me.prototype.U=function(i){if(void 0!==this.t&&(U.prototype.U.call(this,i),void 0===this.t)){this.f&=-33;for(var t=this.s;void 0!==t;t=t.n)t.S.U(t)}},me.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var i=this.t;void 0!==i;i=i.x)i.t.N()}},me.prototype.peek=function(){if(this.h()||u(),16&this.f)throw this.v;return this.v},Object.defineProperty(me.prototype,"value",{get:function(){1&this.f&&u();var i=B(this);if(this.h(),void 0!==i&&(i.i=this.i),16&this.f)throw this.v;return this.v}}),ti.prototype.c=function(){var i=this.S();try{if(8&this.f||void 0===this.x)return;var t=this.x();"function"==typeof t&&(this.u=t)}finally{i()}},ti.prototype.S=function(){1&this.f&&u(),this.f|=1,this.f&=-9,an(this),pe(this),v++;var i=y;return y=this,bn.bind(this,i)},ti.prototype.N=function(){2&this.f||(this.f|=2,this.o=I,I=this)},ti.prototype.d=function(){this.f|=8,1&this.f||qi(this)};var xn_dependencies_lottie_web="^5.12.2",ln=(i=>(i.Complete="complete",i.DataFail="data_fail",i.DataReady="data_ready",i.Error="error",i.Frame="frame",i.Freeze="freeze",i.LoopComplete="loopComplete",i.Pause="pause",i.Play="play",i.Ready="ready",i.Stop="stop",i.VisibilityChange="visibilityChange",i))(ln||{}),cn=(i=>(i.Completed="completed",i.Error="error",i.Fetching="fetching",i.Frozen="frozen",i.Initial="initial",i.Loading="loading",i.Paused="paused",i.Playing="playing",i.Ready="ready",i.Stopped="stopped",i))(cn||{}),hn=(i=>(i.Bounce="bounce",i.Normal="normal",i))(hn||{}),Ot={autoplay:!1,direction:1,hover:!1,intermission:0,loop:!1,playMode:"normal",speed:1,defaultTheme:""},un={activeStateId:"",autoplay:!1,currentState:"initial",frame:0,seeker:0,direction:1,hover:!1,loop:!1,playMode:"normal",speed:1,background:"transparent",intermission:0,currentAnimationId:void 0,visibilityPercentage:0},wn=class{constructor(t,e,r){(0,w.Z)(this,"_lottie",void 0),(0,w.Z)(this,"_src",void 0),(0,w.Z)(this,"_animationConfig",void 0),(0,w.Z)(this,"_prevUserPlaybackOptions",{}),(0,w.Z)(this,"_userPlaybackOptions",void 0),(0,w.Z)(this,"_hover",!1),(0,w.Z)(this,"_loop",!1),(0,w.Z)(this,"_counter",0),(0,w.Z)(this,"_intermission",0),(0,w.Z)(this,"_counterInterval",null),(0,w.Z)(this,"_container",null),(0,w.Z)(this,"_name",void 0),(0,w.Z)(this,"_mode","normal"),(0,w.Z)(this,"_background","transparent"),(0,w.Z)(this,"_animation",void 0),(0,w.Z)(this,"_defaultTheme",void 0),(0,w.Z)(this,"_activeAnimationId",void 0),(0,w.Z)(this,"_currentAnimationId",void 0),(0,w.Z)(this,"_testId",void 0),(0,w.Z)(this,"_listeners",new Map),(0,w.Z)(this,"_currentState","initial"),(0,w.Z)(this,"_stateBeforeFreeze","initial"),(0,w.Z)(this,"state",new class{constructor(t){(0,w.Z)(this,"_state",void 0),(0,w.Z)(this,"_prevState",void 0),this._prevState=t,this._state=function Mt(i){return new U(i)}(t)}setState(t){this._prevState=this._state.value,this._state.value=t}subscribe(t){return this._state.subscribe(e=>t(e,this._prevState))}}(un)),(0,w.Z)(this,"_light",!1),(0,w.Z)(this,"_worker",!1),(0,w.Z)(this,"_dotLottieLoader",new class{constructor(){(0,w.Z)(this,"_dotLottie",void 0),(0,w.Z)(this,"_animationsMap",new Map),(0,w.Z)(this,"_themeMap",new Map),(0,w.Z)(this,"_stateMachinesMap",new Map),(0,w.Z)(this,"_manifest",void 0)}get dotLottie(){return this._dotLottie}get animationsMap(){return this._animationsMap}get themeMap(){return this._themeMap}get stateMachinesMap(){return this._stateMachinesMap}get manifest(){return this._manifest}loadFromUrl(t){var e=this;return(0,T.Z)(function*(){let r=yield fetch(t,{method:"GET",mode:"cors"});if(!r.ok)throw new Error(`Failed to load dotLottie from ${t} with status ${r.status}`);let a=r.headers.get("content-type");if(null!=a&&a.includes("application/json")){let c=yield r.json();if(!re(c))throw new Error(`Invalid lottie JSON at ${t}`);let d=function Ji(i=""){let t=i.trim(),e=t.lastIndexOf("/"),r=t.substring(e+1),a=r.indexOf(".");return-1!==a?r.substring(0,a):r}(t);e._animationsMap.set(d,c),e._manifest={activeAnimationId:d,animations:[{id:d}]}}else{e._dotLottie=yield bi(yield r.arrayBuffer());let c=yield He(e._dotLottie);if(!c)throw new Error("Manifest not found");e._manifest=c}})()}loadFromLottieJSON(t){if(!re(t))throw new Error("Invalid lottie JSON");let e="my-animation";this._animationsMap.set(e,t),this._manifest={activeAnimationId:e,animations:[{id:e}]}}loadFromArrayBuffer(t){var e=this;return(0,T.Z)(function*(){e._dotLottie=yield bi(t);let r=yield He(e._dotLottie);if(!r)throw new Error("Manifest not found");e._manifest=r})()}getAnimation(t){var e=this;return(0,T.Z)(function*(){if(e._animationsMap.get(t))return e._animationsMap.get(t);if(!e._dotLottie)return;let r=yield function Bi(i,t){return de.apply(this,arguments)}(e._dotLottie,t,{inlineAssets:!0});return r&&e._animationsMap.set(t,r),r})()}getTheme(t){var e=this;return(0,T.Z)(function*(){if(e._themeMap.get(t))return e._themeMap.get(t);if(!e._dotLottie)return;let r=yield function se(i,t,e){return qe.apply(this,arguments)}(e._dotLottie,t);return r&&e._themeMap.set(t,r),r})()}getStateMachines(){var t=this;return(0,T.Z)(function*(){if(!t._dotLottie)return;let e=yield function Hi(i,t){return We.apply(this,arguments)}(t._dotLottie);for(let r in e)if(r){let a=e[r];if(a){let c=JSON.parse(a);if(c){let d=c.descriptor.id;t._stateMachinesMap.get(d)||t._stateMachinesMap.set(d,c)}}}return Array.from(t._stateMachinesMap.values())})()}getStateMachine(t){var e=this;return(0,T.Z)(function*(){if(e._stateMachinesMap.get(t))return e._stateMachinesMap.get(t);if(!e._dotLottie)return;let r=yield function Yi(i,t,e){return Ke.apply(this,arguments)}(e._dotLottie,t);return r&&e._stateMachinesMap.set(r.descriptor.id,r),r})()}}),(0,w.Z)(this,"_activeStateId",void 0),(0,w.Z)(this,"_inInteractiveMode",!1),(0,w.Z)(this,"_scrollTicking",!1),(0,w.Z)(this,"_scrollCallback",void 0),(0,w.Z)(this,"_onShowIntersectionObserver",void 0),(0,w.Z)(this,"_visibilityPercentage",0),(0,w.Z)(this,"_audios",[]),(0,w.Z)(this,"_stateMachineManager",void 0),this._src="string"==typeof t?t:o(t),null!=r&&r.testId&&(this._testId=r.testId),this._defaultTheme=r?.defaultTheme||"",this._userPlaybackOptions=this._validatePlaybackOptions(r||{}),"string"==typeof r?.activeAnimationId&&(this._activeAnimationId=r.activeAnimationId),this._container=e||null,"string"==typeof r?.background&&this.setBackground(r.background),typeof r?.activeStateId<"u"&&(this._activeStateId=r.activeStateId);let{rendererSettings:a,...c}=r||{};this._animationConfig={loop:!1,autoplay:!1,renderer:"svg",rendererSettings:{clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0,filterSize:{width:"200%",height:"200%",x:"-50%",y:"-50%"},...a},...c},null!=r&&r.light&&(this._light=r.light),null!=r&&r.worker&&(this._worker=r.worker),this._listenToHover(),this._listenToVisibilityChange()}_listenToHover(){var t,e,r,a;let c=()=>{this._hover&&"playing"!==this.currentState&&this.play()},d=()=>{this._hover&&"playing"===this.currentState&&this.stop()};null==(t=this._container)||t.removeEventListener("mouseenter",c),null==(e=this._container)||e.removeEventListener("mouseleave",d),null==(r=this._container)||r.addEventListener("mouseleave",d),null==(a=this._container)||a.addEventListener("mouseenter",c)}_onVisibilityChange(){!this._lottie||typeof document>"u"||(document.hidden&&"playing"===this.currentState?this.freeze():"frozen"===this.currentState&&this.unfreeze())}_listenToVisibilityChange(){typeof document<"u"&&typeof document.hidden<"u"&&document.addEventListener("visibilitychange",()=>this._onVisibilityChange())}_getOption(t){var e;if(typeof this._userPlaybackOptions[t]<"u")return this._userPlaybackOptions[t];let r=null==(e=this._dotLottieLoader.manifest)?void 0:e.animations.find(a=>a.id===this._currentAnimationId);return r&&typeof r[t]<"u"?r[t]:Ot[t]}_getPlaybackOptions(){let t={};for(let e in Ot)typeof Ot[e]<"u"&&(t[e]=this._getOption(e));return t}_setPlayerState(t){var e,r,a;let c=t(this._getPlaybackOptions());try{ee._parse(c)}catch{return void V(`Invalid PlaybackOptions, ${JSON.stringify(c,null,2)}`)}typeof c.defaultTheme<"u"&&(this._defaultTheme=c.defaultTheme),typeof c.playMode<"u"&&(this._mode=c.playMode),typeof c.intermission<"u"&&(this._intermission=c.intermission),typeof c.hover<"u"&&(this._hover=c.hover),typeof c.loop<"u"&&(this.clearCountTimer(),this._loop=c.loop,this._counter=0,null==(e=this._lottie)||e.setLoop("number"==typeof c.loop||c.loop)),typeof c.speed<"u"&&(null==(r=this._lottie)||r.setSpeed(c.speed)),typeof c.autoplay<"u"&&this._lottie&&(this._lottie.autoplay=c.autoplay),typeof c.direction<"u"&&(null==(a=this._lottie)||a.setDirection(c.direction))}_getOptionsFromAnimation(t){let{id:e,...r}=t;return{...Ot,...r}}_updateTestData(){!this._testId||!this._lottie||(window.dotLottiePlayer||(window.dotLottiePlayer={[this._testId]:{}}),window.dotLottiePlayer[this._testId]={direction:this._lottie.playDirection,currentState:this._currentState,loop:this.loop,mode:this._mode,speed:this._lottie.playSpeed})}setContainer(t){t!==this._container&&(this._container=t,this.setBackground(this._background),this._listenToHover())}get currentState(){return this._currentState}clearCountTimer(){this._counterInterval&&clearInterval(this._counterInterval)}setCurrentState(t){this._currentState=t,this._notify(),this._updateTestData()}static isPathJSON(t){var e;return"json"===(null==(e=t.split(".").pop())?void 0:e.toLowerCase())}get src(){return this._src}updateSrc(t){this._src!==t&&(this._src="string"==typeof t?t:o(t),this._activeAnimationId=void 0,this._currentAnimationId=void 0,this.load())}get intermission(){return this._intermission}get hover(){return this._hover}setHover(t){"boolean"==typeof t&&(this._hover=t,this._userPlaybackOptions.hover=t,this._notify())}setIntermission(t){this._intermission=t,this._userPlaybackOptions.intermission=t,this._notify()}get mode(){return this._mode}get animations(){return this._dotLottieLoader.animationsMap}get themes(){return this._dotLottieLoader.themeMap}setMode(t){"string"==typeof t&&(this._mode=t,this._userPlaybackOptions.playMode=t,this._setPlayerState(()=>({playMode:t})),this._notify(),this._updateTestData())}get container(){if(this._container)return this._container}goToAndPlay(t,e,r){this._lottie&&!["loading"].includes(this._currentState)?(this._lottie.goToAndPlay(t,e,r),this.setCurrentState("playing")):V("goToAndPlay() Can't use whilst loading.")}goToAndStop(t,e,r){this._lottie&&!["loading"].includes(this._currentState)?(this._lottie.goToAndStop(t,e,r),this.setCurrentState("stopped")):V("goToAndStop() Can't use whilst loading.")}seek(t){if(!this._lottie||["loading"].includes(this._currentState))return void V("seek() Can't use whilst loading.");let e=t;"number"==typeof e&&(e=Math.round(e));let r=/^(\d+)(%?)$/u.exec(e.toString());if(!r)return;let a="%"===r[2]?this.totalFrames*Number(r[1])/100:r[1];void 0!==a&&(this._lottie.goToAndPlay(a,!0),"playing"===this.currentState?this.play():"frozen"===this.currentState?this.freeze():this.pause())}_areNumbersInRange(t,e){return t>=0&&t<=1&&e>=0&&e<=1}_updatePosition(t,e,r){let[a,c]=t??[0,this.totalFrames-1],[d,p]=e??[0,1];if(this._areNumbersInRange(d,p)){if(this.container){let{height:m,top:g}=this.container.getBoundingClientRect(),S=(window.innerHeight-g)/(window.innerHeight+m),A=a+Math.round((S-d)/(p-d)*(c-a));r&&r(S),this.goToAndStop(A,!0),(A>=c||S>=p)&&this._handleAnimationComplete()}this._scrollTicking=!1}else Jt("threshold values must be between 0 and 1")}_requestTick(t,e,r){this._scrollTicking||(requestAnimationFrame(()=>this._updatePosition(t,e,r)),this._scrollTicking=!0)}playOnScroll(t){this.stop(),this._scrollCallback&&this.stopPlayOnScroll(),this._scrollCallback=()=>this._requestTick(t?.segments,t?.threshold,t?.positionCallback),window.addEventListener("scroll",this._scrollCallback)}stopPlayOnScroll(){this._scrollCallback&&(window.removeEventListener("scroll",this._scrollCallback),this._scrollCallback=void 0)}stopPlayOnShow(){this._onShowIntersectionObserver&&(this._onShowIntersectionObserver.disconnect(),this._onShowIntersectionObserver=void 0)}addIntersectionObserver(t){if(!this.container)throw Z("Can't play on show, player container element not available.");this._onShowIntersectionObserver=new IntersectionObserver(a=>{a.forEach(c=>{var d,p;this._visibilityPercentage=100*c.intersectionRatio,c.isIntersecting?(null!=t&&t.callbackOnIntersect&&t.callbackOnIntersect(this._visibilityPercentage),null==(d=this._container)||d.dispatchEvent(new Event("visibilityChange"))):null!=t&&t.callbackOnIntersect&&(t.callbackOnIntersect(0),null==(p=this._container)||p.dispatchEvent(new Event("visibilityChange")))})},{root:null,rootMargin:"0px",threshold:null!=t&&t.threshold?t.threshold:[0,1]}),this._onShowIntersectionObserver.observe(this.container)}playOnShow(t){var e;if(this.stop(),!this.container)throw Z("Can't play on show, player container element not available.");this._onShowIntersectionObserver&&this.stopPlayOnShow(),this.addIntersectionObserver({threshold:null!=(e=t?.threshold)?e:[],callbackOnIntersect:r=>{0===r?this.pause():this.play()}})}_validatePlaybackOptions(t){if(!t)return{};let e={};for(let[r,a]of Object.entries(t))switch(r){case"autoplay":"boolean"==typeof a&&(e.autoplay=a);break;case"direction":"number"==typeof a&&[1,-1].includes(a)&&(e.direction=a);break;case"loop":("boolean"==typeof a||"number"==typeof a)&&(e.loop=a);break;case"playMode":"string"==typeof a&&["normal","bounce"].includes(a)&&(e.playMode=a);break;case"speed":"number"==typeof a&&(e.speed=a);break;case"themeColor":"string"==typeof a&&(e.themeColor=a);break;case"hover":"boolean"==typeof a&&(e.hover=a);break;case"intermission":"number"==typeof a&&(e.intermission=a);break;case"defaultTheme":"string"==typeof a&&(e.defaultTheme=a)}return this._requireValidPlaybackOptions(e),e}_requireAnimationsInTheManifest(){var t;if(null==(t=this._dotLottieLoader.manifest)||!t.animations.length)throw Z("No animations found in manifest.")}_requireAnimationsToBeLoaded(){if(0===this._dotLottieLoader.animationsMap.size)throw Z("No animations have been loaded.")}play(t,e){var r=this;return(0,T.Z)(function*(){var a,c;if(["initial","loading"].includes(r._currentState))V("Player unable to play whilst loading.");else{if(r._requireAnimationsInTheManifest(),r._requireAnimationsToBeLoaded(),r._lottie&&!t)return-1===r._lottie.playDirection&&0===r._lottie.currentFrame?r._lottie.goToAndPlay(r._lottie.totalFrames,!0):r._lottie.play(),void r.setCurrentState("playing");if("number"==typeof t){let d=null==(a=r._dotLottieLoader.manifest)?void 0:a.animations[t];if(!d)throw Z("animation not found.");"function"==typeof e?yield r.render({id:d.id,...e(r._getPlaybackOptions(),r._getOptionsFromAnimation(d))}):yield r.render({id:d.id})}if("string"==typeof t){let d=null==(c=r._dotLottieLoader.manifest)?void 0:c.animations.find(p=>p.id===t);if(!d)throw Z("animation not found.");"function"==typeof e?yield r.render({id:d.id,...e(r._getPlaybackOptions(),r._getOptionsFromAnimation(d))}):yield r.render({id:d.id})}}})()}playSegments(t,e){this._lottie&&!["loading"].includes(this._currentState)?(this._lottie.playSegments(t,e),this.setCurrentState("playing")):V("playSegments() Can't use whilst loading.")}resetSegments(t){this._lottie&&!["loading"].includes(this._currentState)?this._lottie.resetSegments(t):V("resetSegments() Can't use whilst loading.")}togglePlay(){"playing"===this.currentState?this.pause():this.play()}_getAnimationByIdOrIndex(t){var e,r;if(this._requireAnimationsInTheManifest(),this._requireAnimationsToBeLoaded(),"number"==typeof t){let a=null==(e=this._dotLottieLoader.manifest)?void 0:e.animations[t];if(!a)throw Z("animation not found.");return a}if("string"==typeof t){let a=null==(r=this._dotLottieLoader.manifest)?void 0:r.animations.find(c=>c.id===t);if(!a)throw Z("animation not found.");return a}throw Z("first param must be a number or string")}get activeAnimationId(){return this._getActiveAnimationId()}get currentAnimationId(){return this._currentAnimationId}get activeStateId(){return this._activeStateId}_startInteractivity(t){var e=this;return(0,T.Z)(function*(){if(e._inInteractiveMode){if(0===e._dotLottieLoader.stateMachinesMap.size&&(yield e._dotLottieLoader.getStateMachines()),0===e._dotLottieLoader.stateMachinesMap.size)throw Z("No interactivity states are available.");if("undefined"===t)throw Z("stateId is not specified.");e._stateMachineManager||(e._stateMachineManager=yield function An(i,t){return Wi.apply(this,arguments)}(Array.from(e._dotLottieLoader.stateMachinesMap.values()),e)),e._stateMachineManager.start(t)}else Jt("Can't start interactivity. Not in interactive mode. Call enterInteractiveMode(stateId: string) to start.")})()}enterInteractiveMode(t){var e;if(!t)throw Z("stateId must be a non-empty string.");this._inInteractiveMode||(this._prevUserPlaybackOptions={...this._userPlaybackOptions}),this._inInteractiveMode&&(null==(e=this._stateMachineManager)||e.stop()),this._activeStateId=t,this._inInteractiveMode=!0,this._startInteractivity(t)}exitInteractiveMode(){var t;this._inInteractiveMode&&(this._inInteractiveMode=!1,this._activeStateId="",null==(t=this._stateMachineManager)||t.stop(),this._userPlaybackOptions={},this._userPlaybackOptions={...this._prevUserPlaybackOptions},this._prevUserPlaybackOptions={},this.reset())}reset(){var t;let e=this._getActiveAnimationId(),r=null==(t=this._dotLottieLoader.manifest)?void 0:t.animations.find(a=>a.id===e);if(this._inInteractiveMode&&this.exitInteractiveMode(),!r)throw Z("animation not found.");this.play(e)}previous(t){if(!this._dotLottieLoader.manifest||!this._dotLottieLoader.manifest.animations.length)throw Z("manifest not found.");if(this._inInteractiveMode)return void V("previous() is not supported in interactive mode.");let e=this._dotLottieLoader.manifest.animations.findIndex(a=>a.id===this._currentAnimationId);if(-1===e)throw Z("animation not found.");let r=this._dotLottieLoader.manifest.animations[(e-1+this._dotLottieLoader.manifest.animations.length)%this._dotLottieLoader.manifest.animations.length];if(!r||!r.id)throw Z("animation not found.");this.render("function"==typeof t?{id:r.id,...t(this._getPlaybackOptions(),this._getOptionsFromAnimation(r))}:{id:r.id})}next(t){if(!this._dotLottieLoader.manifest||!this._dotLottieLoader.manifest.animations.length)throw Z("manifest not found.");if(this._inInteractiveMode)return void V("next() is not supported in interactive mode.");let e=this._dotLottieLoader.manifest.animations.findIndex(a=>a.id===this._currentAnimationId);if(-1===e)throw Z("animation not found.");let r=this._dotLottieLoader.manifest.animations[(e+1)%this._dotLottieLoader.manifest.animations.length];if(!r||!r.id)throw Z("animation not found.");this.render("function"==typeof t?{id:r.id,...t(this._getPlaybackOptions(),this._getOptionsFromAnimation(r))}:{id:r.id})}getManifest(){return this._dotLottieLoader.manifest}resize(){this._lottie&&!["loading"].includes(this._currentState)?this._lottie.resize():V("resize() Can't use whilst loading.")}stop(){this._lottie&&!["loading"].includes(this._currentState)?(this.clearCountTimer(),this._counter=0,this._setPlayerState(()=>({direction:this._getOption("direction")})),this._lottie.stop(),this.setCurrentState("stopped")):V("stop() Can't use whilst loading.")}pause(){this._lottie&&!["loading"].includes(this._currentState)?(this.clearCountTimer(),this._lottie.pause(),this.setCurrentState("paused")):V("pause() Can't use whilst loading.")}freeze(){this._lottie&&!["loading"].includes(this._currentState)?("frozen"!==this.currentState&&(this._stateBeforeFreeze=this.currentState),this._lottie.pause(),this.setCurrentState("frozen")):V("freeze() Can't use whilst loading.")}unfreeze(){this._lottie&&!["loading"].includes(this._currentState)?"playing"===this._stateBeforeFreeze?this.play():this.pause():V("unfreeze() Can't use whilst loading.")}destroy(){var t,e;null!=(t=this._container)&&t.__lottie&&(this._container.__lottie.destroy(),this._container.__lottie=null),this._audios.length&&(this._audios.forEach(r=>{r.unload()}),this._audios=[]),this.clearCountTimer(),typeof document<"u"&&document.removeEventListener("visibilitychange",()=>this._onVisibilityChange()),this._counter=0,null==(e=this._lottie)||e.destroy(),this._lottie=void 0}getAnimationInstance(){return this._lottie}static getLottieWebVersion(){return`${xn_dependencies_lottie_web}`}addEventListener(t,e){var r,a,c;this._listeners.has(t)||this._listeners.set(t,new Set),null==(r=this._listeners.get(t))||r.add(e);try{"complete"===t?null==(a=this._container)||a.addEventListener(t,e):null==(c=this._lottie)||c.addEventListener(t,e)}catch(d){Jt(`addEventListener ${d}`)}}getState(){var t,e,r,a,c,d,p;return{autoplay:null!=(e=null==(t=this._lottie)?void 0:t.autoplay)&&e,currentState:this._currentState,frame:this._frame,visibilityPercentage:this._visibilityPercentage,seeker:this._seeker,direction:null!=(a=null==(r=this._lottie)?void 0:r.playDirection)?a:1,hover:this._hover,loop:this._loop||!1,playMode:this._mode,speed:null!=(d=null==(c=this._lottie)?void 0:c.playSpeed)?d:1,background:this._background,intermission:this._intermission,defaultTheme:this._defaultTheme,currentAnimationId:this._currentAnimationId,activeStateId:null!=(p=this._activeStateId)?p:""}}_notify(){this.state.setState(this.getState())}get totalFrames(){var t;return(null==(t=this._lottie)?void 0:t.totalFrames)||0}get direction(){return this._lottie?this._lottie.playDirection:1}setDirection(t){this._requireValidDirection(t),this._setPlayerState(()=>({direction:t})),this._userPlaybackOptions.direction=t}get speed(){var t;return(null==(t=this._lottie)?void 0:t.playSpeed)||1}setSpeed(t){this._requireValidSpeed(t),this._setPlayerState(()=>({speed:t})),this._userPlaybackOptions.speed=t}get autoplay(){var t,e;return null!=(e=null==(t=this._lottie)?void 0:t.autoplay)&&e}setAutoplay(t){this._requireValidAutoplay(t),this._lottie&&!["loading"].includes(this._currentState)?(this._setPlayerState(()=>({autoplay:t})),this._userPlaybackOptions.autoplay=t):V("setAutoplay() Can't use whilst loading.")}toggleAutoplay(){this._lottie&&!["loading"].includes(this._currentState)?this.setAutoplay(!this._lottie.autoplay):V("toggleAutoplay() Can't use whilst loading.")}get defaultTheme(){return this._defaultTheme}setDefaultTheme(t){this._setPlayerState(()=>({defaultTheme:t})),this._userPlaybackOptions.defaultTheme=t,this._animation&&this.render()}get loop(){return this._loop}setLoop(t){this._requireValidLoop(t),this._setPlayerState(()=>({loop:t})),this._userPlaybackOptions.loop=t}toggleLoop(){this._lottie&&!["loading"].includes(this._currentState)?this.setLoop(!this._loop):V("toggleLoop() Can't use whilst loading.")}get background(){return this._background}setBackground(t){this._requireValidBackground(t),this._background=t,this._container&&(this._container.style.backgroundColor=t)}get _frame(){return this._lottie?"completed"===this.currentState?-1===this.direction?0:this._lottie.totalFrames:this._lottie.currentFrame:0}get _seeker(){return this._lottie?this._frame/this._lottie.totalFrames*100:0}revertToManifestValues(t){var e=this;return(0,T.Z)(function*(){var r;let a;a=Array.isArray(t)&&0!==t.length?t:["autoplay","defaultTheme","direction","hover","intermission","loop","playMode","speed","activeAnimationId"];let c=!1;if(a.includes("activeAnimationId")){let d=null==(r=e._dotLottieLoader.manifest)?void 0:r.activeAnimationId,p=e._getAnimationByIdOrIndex(d||0);e._activeAnimationId=d,yield e._setCurrentAnimation(p.id),c=!0}a.forEach(d=>{switch(d){case"autoplay":delete e._userPlaybackOptions.autoplay,e.setAutoplay(e._getOption("autoplay"));break;case"defaultTheme":delete e._userPlaybackOptions.defaultTheme,e.setDefaultTheme(e._getOption("defaultTheme"));break;case"direction":delete e._userPlaybackOptions.direction,e.setDirection(e._getOption("direction"));break;case"hover":delete e._userPlaybackOptions.hover,e.setHover(e._getOption("hover"));break;case"intermission":delete e._userPlaybackOptions.intermission,e.setIntermission(e._getOption("intermission"));break;case"loop":delete e._userPlaybackOptions.loop,e.setLoop(e._getOption("loop"));break;case"playMode":delete e._userPlaybackOptions.playMode,e.setMode(e._getOption("playMode")),e.setDirection(e._getOption("direction"));break;case"speed":delete e._userPlaybackOptions.speed,e.setSpeed(e._getOption("speed"))}}),c&&e.render()})()}removeEventListener(t,e){var r,a,c;try{"complete"===t?null==(r=this._container)||r.removeEventListener(t,e):null==(a=this._lottie)||a.removeEventListener(t,e),null==(c=this._listeners.get(t))||c.delete(e)}catch(d){Jt("removeEventListener",d)}}_handleAnimationComplete(){var t;"number"==typeof this._loop&&this.stop(),this.goToAndStop(-1===this.direction?0:this.totalFrames,!0),this._counter=0,this.clearCountTimer(),this.setCurrentState("completed"),null==(t=this._container)||t.dispatchEvent(new Event("complete"))}addEventListeners(){var t;if(this._lottie&&!["loading"].includes(this._currentState)){this._lottie.addEventListener("enterFrame",()=>{var e;this._lottie?(0===Math.floor(this._lottie.currentFrame)&&-1===this.direction&&(null==(e=this._container)||e.dispatchEvent(new Event("complete")),this.loop||this.setCurrentState("completed")),this._notify()):V("enterFrame event : Lottie is undefined.")}),this._lottie.addEventListener("loopComplete",()=>{var e;if(!this._lottie)return void V("loopComplete event : Lottie is undefined.");null==(e=this._container)||e.dispatchEvent(new Event("loopComplete")),this.intermission>0&&this.pause();let r=this._lottie.playDirection;if("number"==typeof this._loop&&this._loop>0&&(this._counter+="bounce"===this._mode?.5:1,this._counter>=this._loop))return void this._handleAnimationComplete();"bounce"===this._mode&&"number"==typeof r&&(r=-1*Number(r));let a=-1===r?this._lottie.totalFrames-1:0;this.intermission?(this.goToAndPlay(a,!0),this.pause(),this._counterInterval=window.setTimeout(()=>{this._lottie&&(this._setPlayerState(()=>({direction:r})),this.goToAndPlay(a,!0))},this._intermission)):(this._setPlayerState(()=>({direction:r})),this.goToAndPlay(-1===r?this.totalFrames-1:0,!0))}),this._lottie.addEventListener("complete",()=>{if(this._lottie&&!1===this._loop&&"bounce"===this._mode){if(this._counter+=.5,this._counter>=1)return void this._handleAnimationComplete();this._counterInterval=window.setTimeout(()=>{if(!this._lottie)return;let e=this._lottie.playDirection;"bounce"===this._mode&&"number"==typeof e&&(e=-1*Number(e));let r=-1===e?this.totalFrames-1:0;this._setPlayerState(()=>({direction:e})),this.goToAndPlay(r,!0)},this._intermission)}else this._handleAnimationComplete()});for(let[e,r]of this._listeners)if("complete"===e)for(let a of r)null==(t=this._container)||t.addEventListener(e,a);else for(let a of r)this._lottie.addEventListener(e,a)}else V("addEventListeners() Can't use whilst loading.")}_setCurrentAnimation(t){var e=this;return(0,T.Z)(function*(){e._currentState="loading";let r=yield e._dotLottieLoader.getAnimation(t);e._currentAnimationId=t,e._animation=r,e._currentState="ready"})()}_getAudioFactory(){var t=this;return(0,T.Z)(function*(){if(t._animation&&function Qi(i){let t=i.assets;return!!t&&t.some(e=>xe(e))}(t._animation)){let{DotLottieAudio:e}=yield C.e(588).then(C.bind(C,6588));return r=>{let a=new e({src:[r]});return t._audios.push(a),a}}return null})()}render(t){var e=this;return(0,T.Z)(function*(){var r,a,c,d,p,m,g,_,f,S,A,L,x,O,P,R,D,_t;if(null!=t&&t.id)yield e._setCurrentAnimation(t.id);else if(!e._animation)throw Z("no animation selected");let it=null!=(r=Ot.loop)&&r,bt=null!=(a=Ot.autoplay)&&a,ut=null!=(c=Ot.playMode)?c:"normal",Y=null!=(d=Ot.intermission)?d:0,lt=null!=(p=Ot.hover)&&p,Zt=null!=(m=Ot.direction)?m:1,dt=null!=(g=Ot.speed)?g:1,Ct=null!=(_=Ot.defaultTheme)?_:"";it=null!=(f=t?.loop)?f:e._getOption("loop"),bt=null!=(S=t?.autoplay)?S:e._getOption("autoplay"),ut=null!=(A=t?.playMode)?A:e._getOption("playMode"),Y=null!=(L=t?.intermission)?L:e._getOption("intermission"),lt=null!=(x=t?.hover)?x:e._getOption("hover"),Zt=null!=(O=t?.direction)?O:e._getOption("direction"),dt=null!=(P=t?.speed)?P:e._getOption("speed"),Ct=null!=(R=t?.defaultTheme)?R:e._getOption("defaultTheme");let St={...e._animationConfig,autoplay:!lt&&bt,loop:"number"==typeof it||it,renderer:e._worker?"svg":null!=(D=e._animationConfig.renderer)?D:"svg"},[Et,pt,Ut]=yield Promise.all([e._dotLottieLoader.getTheme(Ct),e._getLottiePlayerInstance(),e._getAudioFactory()]);e._animation=Et&&e._animation?yield function s(i,t){return h.apply(this,arguments)}(e._animation,Et):yield e._dotLottieLoader.getAnimation(null!=(_t=e._currentAnimationId)?_t:""),!e._activeStateId||e._inInteractiveMode?(e.destroy(),e._setPlayerState(()=>({defaultTheme:Ct,playMode:ut,intermission:Y,hover:lt,loop:it})),e._lottie=pt.loadAnimation(Ut?{...St,container:e._container,animationData:e._animation,audioFactory:Ut}:{...St,container:e._container,animationData:e._animation}),typeof e._lottie.resetSegments>"u"&&(e._lottie.resetSegments=()=>{var Dt;null==(Dt=e._lottie)||Dt.playSegments([0,e._lottie.totalFrames],!0)}),e.addEventListeners(),e._container&&(e._container.__lottie=e._lottie),e._setPlayerState(()=>({direction:Zt,speed:dt})),bt&&!lt&&(!1===it&&-1===Zt?e.play():e.setCurrentState("playing")),e._updateTestData()):e.enterInteractiveMode(e._activeStateId)})()}_getLottiePlayerInstance(){var t=this;return(0,T.Z)(function*(){var e;let a,r=null!=(e=t._animationConfig.renderer)?e:"svg";if(t._worker)return"svg"!==r&&V("Worker is only supported with svg renderer. Change or remove renderer prop to get rid of this warning."),a=yield C.e(144).then(C.bind(C,2144)),a.default;switch(r){case"svg":a=t._light?yield C.e(952).then(C.bind(C,952)):yield C.e(791).then(C.bind(C,7791));break;case"canvas":a=t._light?yield C.e(209).then(C.bind(C,2209)):yield C.e(65).then(C.bind(C,65));break;case"html":a=t._light?yield C.e(91).then(C.bind(C,5091)):yield C.e(516).then(C.bind(C,4516));break;default:throw new Error(`Invalid renderer: ${r}`)}return a.default})()}_getActiveAnimationId(){var t,e,r,a;let c=this._dotLottieLoader.manifest;return null!=(a=null!=(r=null!=(t=this._activeAnimationId)?t:c?.activeAnimationId)?r:null==(e=c?.animations[0])?void 0:e.id)?a:void 0}load(t){var e=this;return(0,T.Z)(function*(){if("loading"!==e._currentState)try{if(e.setCurrentState("loading"),"string"==typeof e._src)if(function Gi(i){try{return re(JSON.parse(i))}catch{return!1}}(e._src)){let a=JSON.parse(e._src);e._dotLottieLoader.loadFromLottieJSON(a)}else{let a=new URL(e._src,window.location.href);yield e._dotLottieLoader.loadFromUrl(a.toString())}else{if("object"!=typeof e._src||!re(e._src))throw Z("Invalid src provided");e._dotLottieLoader.loadFromLottieJSON(e._src)}if(!e._dotLottieLoader.manifest)throw Z("No manifest found");let r=e._getActiveAnimationId();if(!r)throw Z("No active animation found");yield e._setCurrentAnimation(r),yield e.render(t)}catch(r){e.setCurrentState("error"),r instanceof Error&&Jt(`Error loading animation: ${r.message}`)}else V("Loading in progress..")})()}setErrorState(t){this.setCurrentState("error"),Jt(t)}_requireValidDirection(t){if(-1!==t&&1!==t)throw Z("Direction can only be -1 (backwards) or 1 (forwards)")}_requireValidIntermission(t){if(t<0||!Number.isInteger(t))throw Z("intermission must be a positive number")}_requireValidLoop(t){if("number"==typeof t&&(!Number.isInteger(t)||t<0))throw Z("loop must be a positive number or boolean")}_requireValidSpeed(t){if("number"!=typeof t)throw Z("speed must be a number")}_requireValidBackground(t){if("string"!=typeof t)throw Z("background must be a string")}_requireValidAutoplay(t){if("boolean"!=typeof t)throw Z("autoplay must be a boolean")}_requireValidPlaybackOptions(t){t.direction&&this._requireValidDirection(t.direction),t.intermission&&this._requireValidIntermission(t.intermission),t.loop&&this._requireValidLoop(t.loop),t.speed&&this._requireValidSpeed(t.speed)}}},1053:(Si,Qt,C)=>{C.d(Qt,{a:()=>$t});var T=Object.defineProperty,w=Object.getOwnPropertyDescriptor,$t=(Ft,j,tt,ct)=>{for(var F,Q=ct>1?void 0:ct?w(j,tt):j,st=Ft.length-1;st>=0;st--)(F=Ft[st])&&(Q=(ct?F(j,tt,Q):F(Q))||Q);return ct&&Q&&T(j,tt,Q),Q}}}]);