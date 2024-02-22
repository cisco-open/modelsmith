"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[466],{8466:(Xe,zt,_)=>{_.r(zt),_.d(zt,{RunningModule:()=>Gi});var M=_(6814),x=_(8524),xt=_(1303),mt=_(7582),N=_(8791),B=_(836),K=_(8180),Q=_(2181),lt=_(4279),D=_(9547),z=_(7820),Lt=_(5360),Et=function(o){return o.QUANTIZATION="quant",o.PRUNING="pruning",o}(Et||{}),l=_(5879),wi=_(4885),Le=_(8471),pe=_(9643),Mt=_(9901),Yt=_(2296),ne=_(617),Pe=_(5195),U=_(2596),qe=_(2599),Gt=_(6634),ht=_(3973),J=function(o){return o.SPARSITY_PRUNING="sparsityPruning",o.ACCURACY_PRUNING="accuracyPruning",o.ACCURACY_QUANTIZATION="accuracyQuantization",o.ACCURACY_MACHINE_UNLEARNING="accuracyMachineUnlearning",o.LOSS_QUANTIZATION="lossQuantization",o.LOSS_PRUNING="lossPruning",o.LOSS_MACHINE_UNLEARNING="lossMachineUnlearning",o.TESTING_ACCURACY_CHART="testing_accuracyChart",o.TESTING_LOSS_CHART="testing_lossChart",o}(J||{}),Jt=_(6210),F=_(4323),ot=function(o){return o.ACCURACY="accuracy",o.LOSS="loss",o}(ot||{});const et=(o,n,s=!1)=>o.map(u=>({datasetIndex:u.datasetIndex,values:(s?u.testing:u.steps).map(c=>c[n])||[]})),ti=(o,n)=>[{datasetIndex:0,values:o.steps.map(s=>s[n]).filter(s=>null!=s)}],ei=(o,n)=>n===ot.LOSS?o.map((s,u)=>({datasetIndex:u,values:s.steps.map(c=>c?.loss).filter(c=>null!=c)})):[{datasetIndex:0,values:o.map(s=>s.accuracy).filter(s=>null!=s)}],Oe=(o,n)=>o.epochs.map((s,u)=>({datasetIndex:u,values:s.steps.map(c=>c[n])})),oe=(o,n)=>o.tests.map((s,u)=>({datasetIndex:u,values:s.steps.map(c=>c[n])}));var Qt,Me=_(1493),Ie=_(2704);let me=((Qt=class{constructor(n){this.chartsFacadeService=n,this.RealtimeUpdateMetric=Jt.L,this.initialLossChartData=[],this.lossPruningChartSettings={},this.lossChartDisplaySettings={},this.initialLossTestingChartData=[],this.testingLossChartDisplaySettings={},this.initialAccuracyChartData=[],this.accuracyPruningChartSettings={},this.accuracyChartDisplaySettings={},this.initialAccuracyTestingChartData=[],this.testingAccuracyChartDisplaySettings={},this.initialSparsityChartData=[],this.sparsityPruningChartSettings={},this.sparsityChartDisplaySettings={}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.settings$.pipe((0,B.T)(1),(0,K.q)(1)).subscribe(n=>{n&&(this.accuracyPruningChartSettings=n[J.ACCURACY_PRUNING]||{},this.accuracyChartDisplaySettings={...F.cS,chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:F.ZW,xAxisRepetitionCount:Number(this.accuracyPruningChartSettings.epochs),yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.GREEN},this.testingAccuracyChartDisplaySettings={...F.cS,yAxisTickInterval:20,chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:F.O1,xAxisRepetitionCount:Number(this.accuracyPruningChartSettings.epochs),yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.YELLOW},this.lossPruningChartSettings={...n[J.LOSS_PRUNING]||{},testingSteps:F.O1},this.lossChartDisplaySettings={...F.cS,yAxisMinimumValue:0,yAxisTickInterval:2,chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:F.ZW,xAxisRepetitionCount:Number(this.lossPruningChartSettings.epochs),isYAxisDynamic:!0,dynamicYAxisGrowthOffset:2,datasetColorSettingsKey:ht.g.RED},this.testingLossChartDisplaySettings={...F.cS,yAxisMinimumValue:0,yAxisTickInterval:2,chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:F.O1,xAxisRepetitionCount:Number(this.lossPruningChartSettings.epochs),isYAxisDynamic:!0,dynamicYAxisGrowthOffset:2,datasetColorSettingsKey:ht.g.YELLOW},this.sparsityPruningChartSettings={...n[J.SPARSITY_PRUNING]||{}},this.sparsityChartDisplaySettings={...F.cS,xAxisLabelPrefix:"Pruning",isDatasetLabelVisible:!1,yAxisTickInterval:100,chartDataStructure:F.nR.SINGLE_PHASE_X_AXIS_SKIP_ONE,xAxisDataPointsCount:this.sparsityPruningChartSettings.pruningTimes+1,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.BLUE})}),this.chartsFacadeService.dispatch(Gt.LX.getChartConfigurationSettings({chartTypes:[J.ACCURACY_PRUNING,J.LOSS_PRUNING,J.SPARSITY_PRUNING]}))}loadLatestChartsData(){this.chartsFacadeService.pruningProgress.pipe((0,B.T)(1),(0,Q.h)(n=>!!n&&n.length>0),(0,K.q)(1)).subscribe(n=>{this.initialLossChartData=et(n,ot.LOSS),this.initialLossTestingChartData=et(n,ot.LOSS,!0),this.initialAccuracyChartData=et(n,ot.ACCURACY),this.initialAccuracyTestingChartData=et(n,ot.ACCURACY,!0),this.initialSparsityChartData=[{datasetIndex:0,values:[100,...n.flatMap(s=>s.sparsity).filter(s=>null!=s)]}]}),this.chartsFacadeService.dispatch(Gt.LX.getCurrentPruningChartData())}}).\u0275fac=function(n){return new(n||Qt)(l.Y36(Me.V))},Qt.\u0275cmp=l.Xpm({type:Qt,selectors:[["ms-running-pruning-charts"]],decls:13,vars:15,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"epochs"],[3,"data","realtimeUpdateMetric","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"],[1,"ms-chart-display","sparsity-chart"]],template:function(n,s){1&n&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div",2),l._UZ(3,"ms-line-chart",3),l.qZA(),l.TgZ(4,"div",4),l._UZ(5,"ms-line-chart",3),l.qZA()(),l.TgZ(6,"div",5)(7,"div",2),l._UZ(8,"ms-line-chart",3),l.qZA(),l.TgZ(9,"div",4),l._UZ(10,"ms-line-chart",3),l.qZA()(),l.TgZ(11,"div",6),l._UZ(12,"ms-line-chart",3),l.qZA()()),2&n&&(l.xp6(3),l.Q6J("data",s.initialAccuracyChartData)("realtimeUpdateMetric",s.RealtimeUpdateMetric.ACCURACY)("settings",s.accuracyChartDisplaySettings),l.xp6(2),l.Q6J("data",s.initialAccuracyTestingChartData)("realtimeUpdateMetric",s.RealtimeUpdateMetric.TESTING_ACCURACY)("settings",s.testingAccuracyChartDisplaySettings),l.xp6(3),l.Q6J("data",s.initialLossChartData)("realtimeUpdateMetric",s.RealtimeUpdateMetric.LOSS)("settings",s.lossChartDisplaySettings),l.xp6(2),l.Q6J("data",s.initialLossTestingChartData)("realtimeUpdateMetric",s.RealtimeUpdateMetric.TESTING_LOSS)("settings",s.testingLossChartDisplaySettings),l.xp6(2),l.Q6J("data",s.initialSparsityChartData)("realtimeUpdateMetric",s.RealtimeUpdateMetric.SPARSITY)("settings",s.sparsityChartDisplaySettings))},dependencies:[Ie.w],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.sparsity-chart[_ngcontent-%COMP%]{flex-direction:column}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .epochs[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{flex:0 0 30%}"]}),Qt);me=(0,mt.gn)([(0,N.c)()],me);let ii=(()=>{var o;class n{constructor(u){this.chartsFacadeService=u,this.RealtimeUpdateMetric=Jt.L,this.initialLossChartData=[],this.initialLossTestingChartData=[],this.initialAccuracyChartData=[],this.initialAccuracyTestingChartData=[],this.lossChartDisplaySettings={yAxisMinimumValue:0,xAxisDataPointsCount:40,datasetLabelPrefix:"Reconstruction:",xAxisLabelPrefix:"Step",chartDataStructure:F.nR.SINGLE_PHASE_X_AXIS,isXAxisVisible:!1,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:50,datasetColorSettingsKey:ht.g.RED},this.lossTestingChartDisplaySettings={yAxisMinimumValue:0,xAxisDataPointsCount:79,isDatasetLabelVisible:!1,xAxisLabelPrefix:"Step",chartDataStructure:F.nR.SINGLE_PHASE_X_AXIS,isXAxisVisible:!1,isYAxisDynamic:!0,datasetColorSettingsKey:ht.g.YELLOW,dynamicYAxisGrowthRoundFactor:2},this.accuracyChartDisplaySettings={yAxisMaximumValue:100,yAxisMinimumValue:0,xAxisDataPointsCount:10,datasetLabelPrefix:"Reconstruction:",xAxisLabelPrefix:"Recon.",isDatasetLabelVisible:!1,isXAxisVisible:!0,xAxisInitialLabelValue:0,chartDataStructure:F.nR.SINGLE_PHASE_X_AXIS,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.GREEN},this.accuracyTestingChartDisplaySettings={yAxisMaximumValue:100,yAxisMinimumValue:0,xAxisDataPointsCount:79,isDatasetLabelVisible:!1,xAxisLabelPrefix:"Step",chartDataStructure:F.nR.SINGLE_PHASE_X_AXIS,isXAxisVisible:!1,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.YELLOW}}ngOnInit(){this.loadLatestChartsData()}loadLatestChartsData(){this.chartsFacadeService.quantizationProgress$.pipe((0,B.T)(1),(0,Q.h)(u=>!!u),(0,K.q)(1)).subscribe(u=>this.processChartData(u)),this.chartsFacadeService.dispatch(Gt.LX.getCurrentQuantizationChartData())}processChartData(u){this.initialLossChartData=ei(u.reconstructions,ot.LOSS),this.initialAccuracyChartData=ei(u.reconstructions,ot.ACCURACY),this.initialLossTestingChartData=ti(u.testing,ot.LOSS),this.initialAccuracyTestingChartData=ti(u.testing,ot.ACCURACY)}}return(o=n).\u0275fac=function(u){return new(u||o)(l.Y36(Me.V))},o.\u0275cmp=l.Xpm({type:o,selectors:[["ms-running-quantization-charts"]],decls:11,vars:12,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"reconstructions"],[3,"data","realtimeUpdateMetric","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"],[3,"data","settings","realtimeUpdateMetric"]],template:function(u,c){1&u&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div",2),l._UZ(3,"ms-line-chart",3),l.qZA(),l.TgZ(4,"div",4),l._UZ(5,"ms-line-chart",3),l.qZA()(),l.TgZ(6,"div",5)(7,"div",2),l._UZ(8,"ms-line-chart",3),l.qZA(),l.TgZ(9,"div",4),l._UZ(10,"ms-line-chart",6),l.qZA()()()),2&u&&(l.xp6(3),l.Q6J("data",c.initialAccuracyChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.ACCURACY)("settings",c.accuracyChartDisplaySettings),l.xp6(2),l.Q6J("data",c.initialAccuracyTestingChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.TESTING_ACCURACY)("settings",c.accuracyTestingChartDisplaySettings),l.xp6(3),l.Q6J("data",c.initialLossChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.LOSS)("settings",c.lossChartDisplaySettings),l.xp6(2),l.Q6J("data",c.initialLossTestingChartData)("settings",c.lossTestingChartDisplaySettings)("realtimeUpdateMetric",c.RealtimeUpdateMetric.TESTING_LOSS))},dependencies:[Ie.w],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .reconstructions[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{flex:0 0 30%}"]}),n})();var xi=_(4378);let It=(()=>{var o;class n{constructor(u){this.chartsFacadeService=u,this.RealtimeUpdateMetric=Jt.L,this.initialAccuracyChartData=[],this.accuracyMachineUnlearningChartSettings={},this.accuracyChartDisplaySettings={},this.initialAccuracyTestingChartData=[],this.testingAccuracyChartDisplaySettings={},this.initialLossChartData=[],this.lossMachineUnlearningChartSettings={},this.lossChartDisplaySettings={},this.initialLossTestingChartData=[],this.testingLossChartDisplaySettings={}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.settings$.pipe((0,B.T)(1),(0,K.q)(1)).subscribe(u=>{u&&(this.accuracyMachineUnlearningChartSettings=u[J.ACCURACY_MACHINE_UNLEARNING]||{},this.accuracyChartDisplaySettings={chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!1,datasetLabelPrefix:"Epoch:",xAxisRepetitionCount:1,yAxisMinimumValue:0,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.GREEN},this.testingAccuracyChartDisplaySettings={chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!1,datasetLabelPrefix:"Test:",xAxisRepetitionCount:1,yAxisMinimumValue:0,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:ht.g.YELLOW},this.lossMachineUnlearningChartSettings=u[J.LOSS_MACHINE_UNLEARNING]||{},this.lossChartDisplaySettings={chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!1,datasetLabelPrefix:"Epoch:",xAxisRepetitionCount:1,yAxisMinimumValue:0,isYAxisDynamic:!0,datasetColorSettingsKey:ht.g.RED},this.testingLossChartDisplaySettings={chartDataStructure:F.nR.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!1,datasetLabelPrefix:"Test:",xAxisRepetitionCount:1,yAxisMinimumValue:0,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:1,dynamicYAxisGrowthRoundFactor:2,datasetColorSettingsKey:ht.g.YELLOW})}),this.chartsFacadeService.dispatch(Gt.LX.getChartConfigurationSettings({chartTypes:[J.ACCURACY_MACHINE_UNLEARNING,J.LOSS_MACHINE_UNLEARNING]}))}loadLatestChartsData(){this.chartsFacadeService.machineUnlearningProgress$.pipe((0,B.T)(1),(0,Q.h)(u=>!(0,xi.Q)(u)),(0,K.q)(1)).subscribe(u=>{this.initialAccuracyChartData=Oe(u,ot.ACCURACY),this.initialLossChartData=Oe(u,ot.LOSS),this.initialAccuracyTestingChartData=oe(u,ot.ACCURACY),this.initialLossTestingChartData=oe(u,ot.LOSS)}),this.chartsFacadeService.dispatch(Gt.LX.getCurrentMachineUnlearningChartData())}}return(o=n).\u0275fac=function(u){return new(u||o)(l.Y36(Me.V))},o.\u0275cmp=l.Xpm({type:o,selectors:[["ms-running-machine-unlearning-charts"]],decls:11,vars:12,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"epochs"],[3,"data","realtimeUpdateMetric","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"]],template:function(u,c){1&u&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div",2),l._UZ(3,"ms-line-chart",3),l.qZA(),l.TgZ(4,"div",4),l._UZ(5,"ms-line-chart",3),l.qZA()(),l.TgZ(6,"div",5)(7,"div",2),l._UZ(8,"ms-line-chart",3),l.qZA(),l.TgZ(9,"div",4),l._UZ(10,"ms-line-chart",3),l.qZA()()()),2&u&&(l.xp6(3),l.Q6J("data",c.initialAccuracyChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.ACCURACY)("settings",c.accuracyChartDisplaySettings),l.xp6(2),l.Q6J("data",c.initialAccuracyTestingChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.TESTING_ACCURACY)("settings",c.testingAccuracyChartDisplaySettings),l.xp6(3),l.Q6J("data",c.initialLossChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.LOSS)("settings",c.lossChartDisplaySettings),l.xp6(2),l.Q6J("data",c.initialLossTestingChartData)("realtimeUpdateMetric",c.RealtimeUpdateMetric.TESTING_LOSS)("settings",c.testingLossChartDisplaySettings))},dependencies:[Ie.w],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.sparsity-chart[_ngcontent-%COMP%]{flex-direction:column}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .epochs[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{flex:0 0 30%}"]}),n})();var fe,gt=_(5861),E=_(1180),ge=window,se=ge.ShadowRoot&&(void 0===ge.ShadyCSS||ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol(),ni=new WeakMap,oi=class{constructor(o,n,s){if(this._$cssResult$=!0,s!==re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=n}get styleSheet(){let o=this.o,n=this.t;if(se&&void 0===o){let s=void 0!==n&&1===n.length;s&&(o=ni.get(n)),void 0===o&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),s&&ni.set(n,o))}return o}toString(){return this.cssText}},si=se?o=>o:o=>o instanceof CSSStyleSheet?(n=>{let s="";for(let u of n.cssRules)s+=u.cssText;return(o=>new oi("string"==typeof o?o:o+"",void 0,re))(s)})(o):o,ve=window,ri=ve.trustedTypes,Oi=ri?ri.emptyScript:"",ai=ve.reactiveElementPolyfillSupport,Te={toAttribute(o,n){switch(n){case Boolean:o=o?Oi:null;break;case Object:case Array:o=null==o?o:JSON.stringify(o)}return o},fromAttribute(o,n){let s=o;switch(n){case Boolean:s=null!==o;break;case Number:s=null===o?null:Number(o);break;case Object:case Array:try{s=JSON.parse(o)}catch{s=null}}return s}},$t=(o,n)=>n!==o&&(n==n||o==o),ft={attribute:!0,type:String,converter:Te,reflect:!1,hasChanged:$t},St="finalized",qt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(o){var n;this.finalize(),(null!==(n=this.h)&&void 0!==n?n:this.h=[]).push(o)}static get observedAttributes(){this.finalize();let o=[];return this.elementProperties.forEach((n,s)=>{let u=this._$Ep(s,n);void 0!==u&&(this._$Ev.set(u,s),o.push(u))}),o}static createProperty(o,n=ft){if(n.state&&(n.attribute=!1),this.finalize(),this.elementProperties.set(o,n),!n.noAccessor&&!this.prototype.hasOwnProperty(o)){let s="symbol"==typeof o?Symbol():"__"+o,u=this.getPropertyDescriptor(o,s,n);void 0!==u&&Object.defineProperty(this.prototype,o,u)}}static getPropertyDescriptor(o,n,s){return{get(){return this[n]},set(u){let c=this[o];this[n]=u,this.requestUpdate(o,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(o){return this.elementProperties.get(o)||ft}static finalize(){if(this.hasOwnProperty(St))return!1;this[St]=!0;let o=Object.getPrototypeOf(this);if(o.finalize(),void 0!==o.h&&(this.h=[...o.h]),this.elementProperties=new Map(o.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let n=this.properties,s=[...Object.getOwnPropertyNames(n),...Object.getOwnPropertySymbols(n)];for(let u of s)this.createProperty(u,n[u])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(o){let n=[];if(Array.isArray(o)){let s=new Set(o.flat(1/0).reverse());for(let u of s)n.unshift(si(u))}else void 0!==o&&n.push(si(o));return n}static _$Ep(o,n){let s=n.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof o?o.toLowerCase():void 0}_$Eu(){var o;this._$E_=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(o=this.constructor.h)||void 0===o||o.forEach(n=>n(this))}addController(o){var n,s;(null!==(n=this._$ES)&&void 0!==n?n:this._$ES=[]).push(o),void 0!==this.renderRoot&&this.isConnected&&(null===(s=o.hostConnected)||void 0===s||s.call(o))}removeController(o){var n;null===(n=this._$ES)||void 0===n||n.splice(this._$ES.indexOf(o)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((o,n)=>{this.hasOwnProperty(n)&&(this._$Ei.set(n,this[n]),delete this[n])})}createRenderRoot(){var o;let n=null!==(o=this.shadowRoot)&&void 0!==o?o:this.attachShadow(this.constructor.shadowRootOptions);return((o,n)=>{se?o.adoptedStyleSheets=n.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet):n.forEach(s=>{let u=document.createElement("style"),c=ge.litNonce;void 0!==c&&u.setAttribute("nonce",c),u.textContent=s.cssText,o.appendChild(u)})})(n,this.constructor.elementStyles),n}connectedCallback(){var o;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(o=this._$ES)||void 0===o||o.forEach(n=>{var s;return null===(s=n.hostConnected)||void 0===s?void 0:s.call(n)})}enableUpdating(o){}disconnectedCallback(){var o;null===(o=this._$ES)||void 0===o||o.forEach(n=>{var s;return null===(s=n.hostDisconnected)||void 0===s?void 0:s.call(n)})}attributeChangedCallback(o,n,s){this._$AK(o,s)}_$EO(o,n,s=ft){var u;let c=this.constructor._$Ep(o,s);if(void 0!==c&&!0===s.reflect){let b=(void 0!==(null===(u=s.converter)||void 0===u?void 0:u.toAttribute)?s.converter:Te).toAttribute(n,s.type);this._$El=o,null==b?this.removeAttribute(c):this.setAttribute(c,b),this._$El=null}}_$AK(o,n){var s;let u=this.constructor,c=u._$Ev.get(o);if(void 0!==c&&this._$El!==c){let b=u.getPropertyOptions(c),S="function"==typeof b.converter?{fromAttribute:b.converter}:void 0!==(null===(s=b.converter)||void 0===s?void 0:s.fromAttribute)?b.converter:Te;this._$El=c,this[c]=S.fromAttribute(n,b.type),this._$El=null}}requestUpdate(o,n,s){let u=!0;void 0!==o&&(((s=s||this.constructor.getPropertyOptions(o)).hasChanged||$t)(this[o],n)?(this._$AL.has(o)||this._$AL.set(o,n),!0===s.reflect&&this._$El!==o&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(o,s))):u=!1),!this.isUpdatePending&&u&&(this._$E_=this._$Ej())}_$Ej(){var o=this;return(0,gt.Z)(function*(){o.isUpdatePending=!0;try{yield o._$E_}catch(s){Promise.reject(s)}let n=o.scheduleUpdate();return null!=n&&(yield n),!o.isUpdatePending})()}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;this._$Ei&&(this._$Ei.forEach((u,c)=>this[c]=u),this._$Ei=void 0);let n=!1,s=this._$AL;try{n=this.shouldUpdate(s),n?(this.willUpdate(s),null===(o=this._$ES)||void 0===o||o.forEach(u=>{var c;return null===(c=u.hostUpdate)||void 0===c?void 0:c.call(u)}),this.update(s)):this._$Ek()}catch(u){throw n=!1,this._$Ek(),u}n&&this._$AE(s)}willUpdate(o){}_$AE(o){var n;null===(n=this._$ES)||void 0===n||n.forEach(s=>{var u;return null===(u=s.hostUpdated)||void 0===u?void 0:u.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(o)),this.updated(o)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(o){return!0}update(o){void 0!==this._$EC&&(this._$EC.forEach((n,s)=>this._$EO(s,this[s],n)),this._$EC=void 0),this._$Ek()}updated(o){}firstUpdated(o){}};qt[St]=!0,qt.elementProperties=new Map,qt.elementStyles=[],qt.shadowRootOptions={mode:"open"},ai?.({ReactiveElement:qt}),(null!==(fe=ve.reactiveElementVersions)&&void 0!==fe?fe:ve.reactiveElementVersions=[]).push("1.6.3");var Vt,Kt=window,Ft=Kt.trustedTypes,li=Ft?Ft.createPolicy("lit-html",{createHTML:o=>o}):void 0,vt="$lit$",W=`lit$${(Math.random()+"").slice(9)}$`,Z="?"+W,st=`<${Z}>`,Ht=document,ae=()=>Ht.createComment(""),le=o=>null===o||"object"!=typeof o&&"function"!=typeof o,hi=Array.isArray,he="[ \t\n\f\r]",kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ui=/-->/g,di=/>/g,Ut=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,pi=/"/g,_e=/^(?:script|style|textarea|title)$/i,T=(1,(n,...s)=>({_$litType$:1,strings:n,values:s})),Wt=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),mi=new WeakMap,Pt=Ht.createTreeWalker(Ht,129,null,!1);function gi(o,n){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==li?li.createHTML(n):n}var Ee=class vn{constructor({strings:n,_$litType$:s},u){let c;this.parts=[];let b=0,S=0,k=n.length-1,y=this.parts,[H,I]=((o,n)=>{let c,s=o.length-1,u=[],b=2===n?"<svg>":"",S=kt;for(let k=0;k<s;k++){let H,I,y=o[k],j=-1,X=0;for(;X<y.length&&(S.lastIndex=X,I=S.exec(y),null!==I);)X=S.lastIndex,S===kt?"!--"===I[1]?S=ui:void 0!==I[1]?S=di:void 0!==I[2]?(_e.test(I[2])&&(c=RegExp("</"+I[2],"g")),S=Ut):void 0!==I[3]&&(S=Ut):S===Ut?">"===I[0]?(S=c??kt,j=-1):void 0===I[1]?j=-2:(j=S.lastIndex-I[2].length,H=I[1],S=void 0===I[3]?Ut:'"'===I[3]?pi:ye):S===pi||S===ye?S=Ut:S===ui||S===di?S=kt:(S=Ut,c=void 0);let At=S===Ut&&o[k+1].startsWith("/>")?" ":"";b+=S===kt?y+st:j>=0?(u.push(H),y.slice(0,j)+vt+y.slice(j)+W+At):y+W+(-2===j?(u.push(void 0),k):At)}return[gi(o,b+(o[s]||"<?>")+(2===n?"</svg>":"")),u]})(n,s);if(this.el=vn.createElement(H,u),Pt.currentNode=this.el.content,2===s){let j=this.el.content,X=j.firstChild;X.remove(),j.append(...X.childNodes)}for(;null!==(c=Pt.nextNode())&&y.length<k;){if(1===c.nodeType){if(c.hasAttributes()){let j=[];for(let X of c.getAttributeNames())if(X.endsWith(vt)||X.startsWith(W)){let At=I[S++];if(j.push(X),void 0!==At){let we=c.getAttribute(At.toLowerCase()+vt).split(W),ue=/([.?@])?(.*)/.exec(At);y.push({type:1,index:b,name:ue[2],strings:we,ctor:"."===ue[1]?Ei:"?"===ue[1]?$i:"@"===ue[1]?vi:be})}else y.push({type:6,index:b})}for(let X of j)c.removeAttribute(X)}if(_e.test(c.tagName)){let j=c.textContent.split(W),X=j.length-1;if(X>0){c.textContent=Ft?Ft.emptyScript:"";for(let At=0;At<X;At++)c.append(j[At],ae()),Pt.nextNode(),y.push({type:2,index:++b});c.append(j[X],ae())}}}else if(8===c.nodeType)if(c.data===Z)y.push({type:2,index:b});else{let j=-1;for(;-1!==(j=c.data.indexOf(W,j+1));)y.push({type:7,index:b}),j+=W.length-1}b++}}static createElement(n,s){let u=Ht.createElement("template");return u.innerHTML=n,u}};function te(o,n,s=o,u){var c,b,S,k;if(n===Wt)return n;let y=void 0!==u?null===(c=s._$Co)||void 0===c?void 0:c[u]:s._$Cl,H=le(n)?void 0:n._$litDirective$;return y?.constructor!==H&&(null===(b=y?._$AO)||void 0===b||b.call(y,!1),void 0===H?y=void 0:(y=new H(o),y._$AT(o,s,u)),void 0!==u?(null!==(S=(k=s)._$Co)&&void 0!==S?S:k._$Co=[])[u]=y:s._$Cl=y),void 0!==y&&(n=te(o,y._$AS(o,n.values),y,u)),n}var $e=class yn{constructor(n,s,u,c){var b;this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=n,this._$AB=s,this._$AM=u,this.options=c,this._$Cp=null===(b=c?.isConnected)||void 0===b||b}get _$AU(){var n,s;return null!==(s=null===(n=this._$AM)||void 0===n?void 0:n._$AU)&&void 0!==s?s:this._$Cp}get parentNode(){let n=this._$AA.parentNode,s=this._$AM;return void 0!==s&&11===n?.nodeType&&(n=s.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,s=this){n=te(this,n,s),le(n)?n===it||null==n||""===n?(this._$AH!==it&&this._$AR(),this._$AH=it):n!==this._$AH&&n!==Wt&&this._(n):void 0!==n._$litType$?this.g(n):void 0!==n.nodeType?this.$(n):(o=>hi(o)||"function"==typeof o?.[Symbol.iterator])(n)?this.T(n):this._(n)}k(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}$(n){this._$AH!==n&&(this._$AR(),this._$AH=this.k(n))}_(n){this._$AH!==it&&le(this._$AH)?this._$AA.nextSibling.data=n:this.$(Ht.createTextNode(n)),this._$AH=n}g(n){var s;let{values:u,_$litType$:c}=n,b="number"==typeof c?this._$AC(n):(void 0===c.el&&(c.el=Ee.createElement(gi(c.h,c.h[0]),this.options)),c);if((null===(s=this._$AH)||void 0===s?void 0:s._$AD)===b)this._$AH.v(u);else{let S=new class{constructor(o,n){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){var n;let{el:{content:s},parts:u}=this._$AD,c=(null!==(n=o?.creationScope)&&void 0!==n?n:Ht).importNode(s,!0);Pt.currentNode=c;let b=Pt.nextNode(),S=0,k=0,y=u[0];for(;void 0!==y;){if(S===y.index){let H;2===y.type?H=new $e(b,b.nextSibling,this,o):1===y.type?H=new y.ctor(b,y.name,y.strings,this,o):6===y.type&&(H=new ki(b,this,o)),this._$AV.push(H),y=u[++k]}S!==y?.index&&(b=Pt.nextNode(),S++)}return Pt.currentNode=Ht,c}v(o){let n=0;for(let s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(o,s,n),n+=s.strings.length-2):s._$AI(o[n])),n++}}(b,this),k=S.u(this.options);S.v(u),this.$(k),this._$AH=S}}_$AC(n){let s=mi.get(n.strings);return void 0===s&&mi.set(n.strings,s=new Ee(n)),s}T(n){hi(this._$AH)||(this._$AH=[],this._$AR());let u,s=this._$AH,c=0;for(let b of n)c===s.length?s.push(u=new yn(this.k(ae()),this.k(ae()),this,this.options)):u=s[c],u._$AI(b),c++;c<s.length&&(this._$AR(u&&u._$AB.nextSibling,c),s.length=c)}_$AR(n=this._$AA.nextSibling,s){var u;for(null===(u=this._$AP)||void 0===u||u.call(this,!1,!0,s);n&&n!==this._$AB;){let c=n.nextSibling;n.remove(),n=c}}setConnected(n){var s;void 0===this._$AM&&(this._$Cp=n,null===(s=this._$AP)||void 0===s||s.call(this,n))}},be=class{constructor(o,n,s,u,c){this.type=1,this._$AH=it,this._$AN=void 0,this.element=o,this.name=n,this._$AM=u,this.options=c,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=it}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(o,n=this,s,u){let c=this.strings,b=!1;if(void 0===c)o=te(this,o,n,0),b=!le(o)||o!==this._$AH&&o!==Wt,b&&(this._$AH=o);else{let k,y,S=o;for(o=c[0],k=0;k<c.length-1;k++)y=te(this,S[s+k],n,k),y===Wt&&(y=this._$AH[k]),b||(b=!le(y)||y!==this._$AH[k]),y===it?o=it:o!==it&&(o+=(y??"")+c[k+1]),this._$AH[k]=y}b&&!u&&this.j(o)}j(o){o===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"")}},Ei=class extends be{constructor(){super(...arguments),this.type=3}j(o){this.element[this.name]=o===it?void 0:o}},fi=Ft?Ft.emptyScript:"",$i=class extends be{constructor(){super(...arguments),this.type=4}j(o){o&&o!==it?this.element.setAttribute(this.name,fi):this.element.removeAttribute(this.name)}},vi=class extends be{constructor(o,n,s,u,c){super(o,n,s,u,c),this.type=5}_$AI(o,n=this){var s;if((o=null!==(s=te(this,o,n,0))&&void 0!==s?s:it)===Wt)return;let u=this._$AH,c=o===it&&u!==it||o.capture!==u.capture||o.once!==u.once||o.passive!==u.passive,b=o!==it&&(u===it||c);c&&this.element.removeEventListener(this.name,this,u),b&&this.element.addEventListener(this.name,this,o),this._$AH=o}handleEvent(o){var n,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(n=this.options)||void 0===n?void 0:n.host)&&void 0!==s?s:this.element,o):this._$AH.handleEvent(o)}},ki=class{constructor(o,n,s){this.element=o,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(o){te(this,o)}},yi=Kt.litHtmlPolyfillSupport;yi?.(Ee,$e),(null!==(Vt=Kt.litHtmlVersions)&&void 0!==Vt?Vt:Kt.litHtmlVersions=[]).push("2.8.0");var Zt,ke,ce=class extends qt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o,n;let s=super.createRenderRoot();return null!==(o=(n=this.renderOptions).renderBefore)&&void 0!==o||(n.renderBefore=s.firstChild),s}update(o){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=((o,n,s)=>{var u,c;let b=null!==(u=s?.renderBefore)&&void 0!==u?u:n,S=b._$litPart$;if(void 0===S){let k=null!==(c=s?.renderBefore)&&void 0!==c?c:null;b._$litPart$=S=new $e(n.insertBefore(ae(),k),k,void 0,s??{})}return S._$AI(o),S})(n,this.renderRoot,this.renderOptions)}connectedCallback(){var o;super.connectedCallback(),null===(o=this._$Do)||void 0===o||o.setConnected(!0)}disconnectedCallback(){var o;super.disconnectedCallback(),null===(o=this._$Do)||void 0===o||o.setConnected(!1)}render(){return Wt}};ce.finalized=!0,ce._$litElement$=!0,null===(Zt=globalThis.litElementHydrateSupport)||void 0===Zt||Zt.call(globalThis,{LitElement:ce});var bi=globalThis.litElementPolyfillSupport;bi?.({LitElement:ce}),(null!==(ke=globalThis.litElementVersions)&&void 0!==ke?ke:globalThis.litElementVersions=[]).push("3.3.3");var Ui=((o,...n)=>{let s=1===o.length?o[0]:n.reduce((u,c,b)=>u+(S=>{if(!0===S._$cssResult$)return S.cssText;if("number"==typeof S)return S;throw Error("Value passed to 'css' function must be a 'css' function result: "+S+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(c)+o[b+1],o[0]);return new oi(s,o,re)})`
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
`,tt=_(2222),nt=(_(7207),_(1053)),Zi=(o,n)=>"method"===n.kind&&n.descriptor&&!("value"in n.descriptor)?{...n,finisher(s){s.createProperty(n.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:n.key,initializer(){"function"==typeof n.initializer&&(this[n.key]=n.initializer.call(this))},finisher(s){s.createProperty(n.key,o)}};function rt(o){return(n,s)=>void 0!==s?((o,n,s)=>{n.constructor.createProperty(s,o)})(o,n,s):Zi(o,n)}window;var Se="dotlottie-player",Y=class extends ce{constructor(...n){super(...n),(0,E.Z)(this,"defaultTheme",""),(0,E.Z)(this,"container",void 0),(0,E.Z)(this,"playMode",tt.g.Normal),(0,E.Z)(this,"autoplay",!1),(0,E.Z)(this,"background","transparent"),(0,E.Z)(this,"controls",!1),(0,E.Z)(this,"direction",1),(0,E.Z)(this,"hover",!1),(0,E.Z)(this,"loop",void 0),(0,E.Z)(this,"renderer","svg"),(0,E.Z)(this,"speed",1),(0,E.Z)(this,"src",void 0),(0,E.Z)(this,"intermission",0),(0,E.Z)(this,"activeAnimationId",null),(0,E.Z)(this,"light",!1),(0,E.Z)(this,"worker",!1),(0,E.Z)(this,"activeStateId",void 0),(0,E.Z)(this,"_seeker",0),(0,E.Z)(this,"_dotLottieCommonPlayer",void 0),(0,E.Z)(this,"_io",void 0),(0,E.Z)(this,"_loop",void 0),(0,E.Z)(this,"_renderer","svg"),(0,E.Z)(this,"_unsubscribeListeners",void 0),(0,E.Z)(this,"_hasMultipleAnimations",!1),(0,E.Z)(this,"_hasMultipleThemes",!1),(0,E.Z)(this,"_hasMultipleStates",!1),(0,E.Z)(this,"_popoverIsOpen",!1),(0,E.Z)(this,"_animationsTabIsOpen",!1),(0,E.Z)(this,"_statesTabIsOpen",!1),(0,E.Z)(this,"_styleTabIsOpen",!1),(0,E.Z)(this,"_themesForCurrentAnimation",[]),(0,E.Z)(this,"_statesForCurrentAnimation",[])}_parseLoop(n){let s=parseInt(n,10);return Number.isInteger(s)&&s>0?(this._loop=s,s):"string"==typeof n&&["true","false"].includes(n)?(this._loop="true"===n,this._loop):((0,tt.c)("loop must be a positive integer or a boolean"),!1)}_handleSeekChange(n){let s=n.currentTarget;try{let u=parseInt(s.value,10);if(!this._dotLottieCommonPlayer)return;this.seek(u/100*this._dotLottieCommonPlayer.totalFrames)}catch{throw(0,tt.a)("Error while seeking animation")}}_initListeners(){let n=this._dotLottieCommonPlayer;void 0!==n?(this._unsubscribeListeners=n.state.subscribe((s,u)=>{this._seeker=s.seeker,this.requestUpdate(),u.currentState!==s.currentState&&this.dispatchEvent(new CustomEvent(s.currentState)),this.dispatchEvent(new CustomEvent(tt.e.Frame,{detail:{frame:s.frame,seeker:s.seeker}})),this.dispatchEvent(new CustomEvent(tt.e.VisibilityChange,{detail:{visibilityPercentage:s.visibilityPercentage}}))}),n.addEventListener("complete",()=>{this.dispatchEvent(new CustomEvent(tt.e.Complete))}),n.addEventListener("loopComplete",()=>{this.dispatchEvent(new CustomEvent(tt.e.LoopComplete))}),n.addEventListener("DOMLoaded",()=>{let s=this.getManifest();s&&s.themes&&(this._themesForCurrentAnimation=s.themes.filter(u=>u.animations.includes(this.getCurrentAnimationId()||""))),s&&s.states&&(this._hasMultipleStates=s.states.length>0,this._statesForCurrentAnimation=[],s.states.forEach(u=>{this._statesForCurrentAnimation.push(u)})),this.dispatchEvent(new CustomEvent(tt.e.Ready))}),n.addEventListener("data_ready",()=>{this.dispatchEvent(new CustomEvent(tt.e.DataReady))}),n.addEventListener("data_failed",()=>{this.dispatchEvent(new CustomEvent(tt.e.DataFail))}),window&&window.addEventListener("click",s=>this._clickOutListener(s))):(0,tt.c)("player not initialized - cannot add event listeners","dotlottie-player-component")}load(n,s,u){var c=this;return(0,gt.Z)(function*(){if(!c.shadowRoot)return;c._dotLottieCommonPlayer&&c._dotLottieCommonPlayer.destroy(),c._dotLottieCommonPlayer=new tt.j(n,c.container,{rendererSettings:s??{scaleMode:"noScale",clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0},hover:c.hasAttribute("hover")?c.hover:void 0,renderer:c.hasAttribute("renderer")?c._renderer:void 0,loop:c.hasAttribute("loop")?c._loop:void 0,direction:c.hasAttribute("direction")?1===c.direction?1:-1:void 0,speed:c.hasAttribute("speed")?c.speed:void 0,intermission:c.hasAttribute("intermission")?Number(c.intermission):void 0,playMode:c.hasAttribute("playMode")?c.playMode:void 0,autoplay:c.hasAttribute("autoplay")?c.autoplay:void 0,activeAnimationId:c.hasAttribute("activeAnimationId")?c.activeAnimationId:void 0,defaultTheme:c.hasAttribute("defaultTheme")?c.defaultTheme:void 0,light:c.light,worker:c.worker,activeStateId:c.hasAttribute("activeStateId")?c.activeStateId:void 0}),yield c._dotLottieCommonPlayer.load(u);let b=c.getManifest();c._hasMultipleAnimations=c.animationCount()>1,b&&(b.themes&&(c._themesForCurrentAnimation=b.themes.filter(S=>S.animations.includes(c.getCurrentAnimationId()||"")),c._hasMultipleThemes=b.themes.length>0),b.states&&(c._hasMultipleStates=b.states.length>0,c._statesForCurrentAnimation=[],b.states.forEach(S=>{c._statesForCurrentAnimation.push(S)}))),c._initListeners()})()}getCurrentAnimationId(){var n;return null==(n=this._dotLottieCommonPlayer)?void 0:n.currentAnimationId}animationCount(){var n;return this._dotLottieCommonPlayer&&(null==(n=this._dotLottieCommonPlayer.getManifest())?void 0:n.animations.length)||0}animations(){if(!this._dotLottieCommonPlayer)return[];let n=this._dotLottieCommonPlayer.getManifest();return n?.animations.map(s=>s.id)||[]}currentAnimation(){return this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.currentAnimationId?this._dotLottieCommonPlayer.currentAnimationId:""}getState(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.getState():tt.i}getManifest(){var n;return null==(n=this._dotLottieCommonPlayer)?void 0:n.getManifest()}getLottie(){var n;return null==(n=this._dotLottieCommonPlayer)?void 0:n.getAnimationInstance()}getVersions(){return{lottieWebVersion:tt.j.getLottieWebVersion(),dotLottiePlayerVersion:"2.7.8"}}previous(n){var s;null==(s=this._dotLottieCommonPlayer)||s.previous(n)}next(n){var s;null==(s=this._dotLottieCommonPlayer)||s.next(n)}reset(){var n;null==(n=this._dotLottieCommonPlayer)||n.reset()}play(n,s){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.play(n,s)}pause(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.pause()}stop(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stop()}playOnShow(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnShow(n)}stopPlayOnShow(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnShow()}playOnScroll(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnScroll(n)}stopPlayOnScroll(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnScroll()}seek(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.seek(n)}snapshot(n=!0){if(!this.shadowRoot)return"";let s=this.shadowRoot.querySelector(".animation svg"),u=(new XMLSerializer).serializeToString(s);if(n){let c=document.createElement("a");c.href=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(u)}`,c.download=`download_${this._seeker}.svg`,document.body.appendChild(c),c.click(),document.body.removeChild(c)}return u}setTheme(n){var s;null==(s=this._dotLottieCommonPlayer)||s.setDefaultTheme(n)}themes(){var n;if(!this._dotLottieCommonPlayer)return[];let s=this._dotLottieCommonPlayer.getManifest();return(null==(n=s?.themes)?void 0:n.map(u=>u.id))||[]}getDefaultTheme(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.defaultTheme:""}getActiveStateMachine(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.activeStateId:""}_freeze(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.freeze()}setSpeed(n=1){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setSpeed(n)}setDirection(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setDirection(n)}setLooping(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setLoop(n)}isLooping(){return!!this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.loop}togglePlay(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.togglePlay()}toggleLooping(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.toggleLoop()}setPlayMode(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setMode(n)}enterInteractiveMode(n){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.enterInteractiveMode(n)}exitInteractiveMode(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.exitInteractiveMode()}revertToManifestValues(n){var s;null==(s=this._dotLottieCommonPlayer)||s.revertToManifestValues(n)}static get styles(){return Ui}firstUpdated(){var n=this;return(0,gt.Z)(function*(){var s;n.container=null==(s=n.shadowRoot)?void 0:s.querySelector("#animation"),"IntersectionObserver"in window&&(n._io=new IntersectionObserver(u=>{var c,b;void 0!==u[0]&&u[0].isIntersecting?(null==(c=n._dotLottieCommonPlayer)?void 0:c.currentState)===tt.f.Frozen&&n.play():(null==(b=n._dotLottieCommonPlayer)?void 0:b.currentState)===tt.f.Playing&&n._freeze()}),n._io.observe(n.container)),n.loop?n._parseLoop(n.loop):n.hasAttribute("loop")&&n._parseLoop("true"),"svg"===n.renderer?n._renderer="svg":"canvas"===n.renderer?n._renderer="canvas":"html"===n.renderer&&(n._renderer="html"),n.src&&(yield n.load(n.src))})()}disconnectedCallback(){var n,s;this._io&&(this._io.disconnect(),this._io=void 0),null==(n=this._dotLottieCommonPlayer)||n.destroy(),null==(s=this._unsubscribeListeners)||s.call(this),window&&window.removeEventListener("click",u=>this._clickOutListener(u))}_clickOutListener(n){!n.composedPath().some(s=>s instanceof HTMLElement&&(s.classList.contains("popover")||"lottie-animation-options"===s.id))&&this._popoverIsOpen&&(this._popoverIsOpen=!1,this.requestUpdate())}renderControls(){var n,s,u,c,b;let S=(null==(n=this._dotLottieCommonPlayer)?void 0:n.currentState)===tt.f.Playing,k=(null==(s=this._dotLottieCommonPlayer)?void 0:s.currentState)===tt.f.Paused;return T`
      <div id="lottie-controls" aria-label="lottie-animation-controls" class="toolbar">
        ${this._hasMultipleAnimations?T`
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
            `:T``}
        <button
          id="lottie-play-button"
          @click=${()=>{this.togglePlay()}}
          class=${S||k?"active "+(this._hasMultipleAnimations?"btn-spacing-center":"btn-spacing-right"):this._hasMultipleAnimations?"btn-spacing-center":"btn-spacing-right"}
          aria-label="play / pause animation"
        >
          ${S?T`
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
              `:T`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.33337 3.46787C3.33337 2.52312 4.35948 1.93558 5.17426 2.41379L12.8961 6.94592C13.7009 7.41824 13.7009 8.58176 12.8961 9.05408L5.17426 13.5862C4.35948 14.0644 3.33337 13.4769 3.33337 12.5321V3.46787Z"
                    fill="#20272C"
                  />
                </svg>
              `}
        </button>
        ${this._hasMultipleAnimations?T`
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
            `:T``}
        <input
          id="lottie-seeker-input"
          class="seeker ${-1===(null==(u=this._dotLottieCommonPlayer)?void 0:u.direction)?"to-left":""}"
          type="range"
          min="0"
          step="1"
          max="100"
          .value=${this._seeker}
          @input=${y=>this._handleSeekChange(y)}
          @mousedown=${()=>{this._freeze()}}
          @mouseup=${()=>{var y;null==(y=this._dotLottieCommonPlayer)||y.unfreeze()}}
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
          class=${null!=(c=this._dotLottieCommonPlayer)&&c.loop?"active btn-spacing-left":"btn-spacing-left"}
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
        ${this._hasMultipleAnimations||this._hasMultipleThemes||this._hasMultipleStates?T`
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
            `:T``}
      </div>
      ${this._popoverIsOpen?T`
            <div
              id="popover"
              class="popover"
              tabindex="0"
              aria-label="lottie animations themes popover"
              style="min-height: ${this.themes().length>0?"84px":"auto"}"
            >
              ${this._animationsTabIsOpen||this._styleTabIsOpen||this._statesTabIsOpen?T``:T`
                    <button
                      class="popover-button"
                      tabindex="0"
                      aria-label="animations"
                      @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate()}}
                      @keydown=${y=>{("Space"===y.code||"Enter"===y.code)&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate())}}
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
              ${!this._hasMultipleThemes||this._styleTabIsOpen||this._animationsTabIsOpen||this._statesTabIsOpen?"":T` <button
                    class="popover-button"
                    aria-label="Themes"
                    @click=${()=>{this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate()}}
                    @keydown=${y=>{("Space"===y.code||"Enter"===y.code)&&(this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate())}}
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
              ${!this._hasMultipleStates||this._styleTabIsOpen||this._animationsTabIsOpen||this._statesTabIsOpen?"":T` <button
                    class="popover-button"
                    aria-label="States"
                    @click=${()=>{this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate()}}
                    @keydown=${y=>{("Space"===y.code||"Enter"===y.code)&&(this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate())}}
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
              ${this._animationsTabIsOpen?T`<button
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
                        ${this.animations().map(y=>T`
                            <li>
                              <button
                                class="option-button"
                                aria-label=${`${y}`}
                                @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(y),this.requestUpdate()}}
                                @keydown=${H=>{("Space"===H.code||"Enter"===H.code)&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(y),this.requestUpdate())}}
                              >
                                <div class="option-tick">
                                  ${this.currentAnimation()===y?T`
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
                                      `:T`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${y}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div> `:T``}
              ${this._styleTabIsOpen?T`<div class="option-title-themes-row">
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
                        ${""===(null==(b=this._dotLottieCommonPlayer)?void 0:b.defaultTheme)?T``:T`
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
                        ${this._themesForCurrentAnimation.map(y=>T`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${y.id}"
                                @click=${()=>{this.setTheme(y.id)}}
                                @keydown=${H=>{("Space"===H.code||"Enter"===H.code)&&this.setTheme(y.id)}}
                              >
                                <div class="option-tick">
                                  ${this.getDefaultTheme()===y.id?T`
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
                                      `:T`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${y.id}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:T``}
              ${this._statesTabIsOpen?T`<div class="option-title-themes-row">
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
                        ${this._statesForCurrentAnimation.map(y=>T`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${y}"
                                @click=${()=>{this.enterInteractiveMode(y)}}
                                @keydown=${H=>{("Space"===H.code||"Enter"===H.code)&&this.enterInteractiveMode(y)}}
                              >
                                <div class="option-tick">
                                  ${this.getActiveStateMachine()===y?T`
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
                                      `:T`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${y}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:T``}
            </div>
          `:T``}
    `}render(){var n;return T`
      <div id="animation-container" class=${this.controls?"main controls":"main"} lang="en" role="img" aria-label="lottie-animation-container">
        <div id="animation" class=${this.controls?"animation controls":"animation"} style="background:${this.background};">
          ${(null==(n=this._dotLottieCommonPlayer)?void 0:n.currentState)===tt.f.Error?T` <div class="error">⚠️</div> `:void 0}
        </div>
        ${this.controls?this.renderControls():void 0}
      </div>
    `}};(0,nt.a)([rt({type:String})],Y.prototype,"defaultTheme",2),(0,nt.a)([function Ue(o,n){return(({finisher:o,descriptor:n})=>(s,u)=>{var c;if(void 0===u){let b=null!==(c=s.originalKey)&&void 0!==c?c:s.key,S=null!=n?{kind:"method",placement:"prototype",key:b,descriptor:n(s.key)}:{...s,key:b};return null!=o&&(S.finisher=function(k){o(k,b)}),S}{let b=s.constructor;void 0!==n&&Object.defineProperty(s,u,n(u)),o?.(b,u)}})({descriptor:s=>{let u={get(){var c,b;return null!==(b=null===(c=this.renderRoot)||void 0===c?void 0:c.querySelector(o))&&void 0!==b?b:null},enumerable:!0,configurable:!0};if(n){let c="symbol"==typeof s?Symbol():"__"+s;u.get=function(){var b,S;return void 0===this[c]&&(this[c]=null!==(S=null===(b=this.renderRoot)||void 0===b?void 0:b.querySelector(o))&&void 0!==S?S:null),this[c]}}return u}})}("#animation")],Y.prototype,"container",2),(0,nt.a)([rt()],Y.prototype,"playMode",2),(0,nt.a)([rt({type:Boolean})],Y.prototype,"autoplay",2),(0,nt.a)([rt({type:String})],Y.prototype,"background",2),(0,nt.a)([rt({type:Boolean})],Y.prototype,"controls",2),(0,nt.a)([rt({type:Number})],Y.prototype,"direction",2),(0,nt.a)([rt({type:Boolean})],Y.prototype,"hover",2),(0,nt.a)([rt({type:String})],Y.prototype,"loop",2),(0,nt.a)([rt({type:String})],Y.prototype,"renderer",2),(0,nt.a)([rt({type:Number})],Y.prototype,"speed",2),(0,nt.a)([rt({type:String})],Y.prototype,"src",2),(0,nt.a)([rt()],Y.prototype,"intermission",2),(0,nt.a)([rt({type:String})],Y.prototype,"activeAnimationId",2),(0,nt.a)([rt({type:Boolean})],Y.prototype,"light",2),(0,nt.a)([rt({type:Boolean})],Y.prototype,"worker",2),(0,nt.a)([rt({type:String})],Y.prototype,"activeStateId",2),(0,nt.a)([function Ci(o){return rt({...o,state:!0})}()],Y.prototype,"_seeker",2),customElements.get(Se)||customElements.define(Se,Y);const Ae={[Et.PRUNING]:{path:"../assets/animations/pruning.lottie",speed:.15,className:"pruning"},[Et.QUANTIZATION]:{path:"../assets/animations/quantization.lottie",speed:.08,className:"quant"}};var jt;const Ne=["lottiePlayer"];let ee=((jt=class{constructor(n,s,u){this.scriptFacadeService=n,this.el=s,this.renderer=u}ngAfterViewInit(){const n=Ae[this.animationType];if(!n)throw new Error(`Unknown animation type: ${this.animationType}`);this.initializeAnimation(n)}initializeAnimation(n){setTimeout(()=>{this.lottiePlayer.nativeElement.load(n.path,{progresiveLoad:!0})},0),this.renderer.addClass(this.el.nativeElement,n.className)}listenToScriptStateChanges(){this.lottiePlayer.nativeElement.setSpeed(Ae[this.animationType].speed),this.scriptFacadeService.scriptStatus$.pipe((0,N.t)(this)).subscribe(s=>{(0,Lt.A)(s)?this.playAnimation():this.stopAnimation()})}playAnimation(){this.lottiePlayer.nativeElement.play()}stopAnimation(){this.lottiePlayer.nativeElement.stop()}}).\u0275fac=function(n){return new(n||jt)(l.Y36(Le.O),l.Y36(l.SBq),l.Y36(l.Qsj))},jt.\u0275cmp=l.Xpm({type:jt,selectors:[["ms-running-animation"]],viewQuery:function(n,s){if(1&n&&l.Gf(Ne,7),2&n){let u;l.iGM(u=l.CRH())&&(s.lottiePlayer=u.first)}},inputs:{animationType:"animationType"},decls:3,vars:1,consts:[[1,"parent-container"],["loop","","renderer","svg",3,"worker","ready"],["lottiePlayer",""]],template:function(n,s){1&n&&(l.TgZ(0,"div",0)(1,"dotlottie-player",1,2),l.NdJ("ready",function(){return s.listenToScriptStateChanges()}),l.qZA()()),2&n&&(l.xp6(1),l.Q6J("worker",!0))},styles:[".parent-container[_ngcontent-%COMP%]{overflow:hidden;height:300px;border-radius:10px;margin-bottom:10px;position:relative;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}dotlottie-player[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:cover;position:absolute;top:50%;left:0;transform:translateY(-50%)}.pruning[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{background-color:#b2ddff}@media (max-width: 1000px){.pruning[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{height:180px}}@media (min-width: 1200px){.pruning[_nghost-%COMP%]   dotlottie-player[_ngcontent-%COMP%]{width:900px;left:calc((100% - 900px)/2)}}.quant[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{background-color:#1649a8}@media (max-width: 1000px){.quant[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{height:180px}}@media (min-width: 1100px){.quant[_nghost-%COMP%]   dotlottie-player[_ngcontent-%COMP%]{width:900px;left:calc((100% - 900px)/2)}}"],changeDetection:0}),jt);(0,mt.gn)([function Ze(o,n){const s=o.ngOnInit;o.ngOnInit=function(){if(null==this[n])throw new Error(`Required input '${n}' was not provided in ${o.constructor.name}.`);if(s)return s.apply(this)}}],ee.prototype,"animationType",void 0),ee=(0,mt.gn)([(0,N.c)()],ee);var Di=_(5676),Re=_(9532);function Ai(o,n){if(1&o&&(l.TgZ(0,"div",7)(1,"span",8),l._uU(2),l.qZA(),l.TgZ(3,"span",9),l._uU(4),l.qZA()()),2&o){const s=n.$implicit;l.xp6(2),l.Oqu(s.key),l.xp6(2),l.Oqu(s.value)}}function De(o,n){if(1&o&&(l.ynx(0),l.TgZ(1,"div",5),l.YNc(2,Ai,5,2,"div",6),l.qZA(),l.BQk()),2&o){const s=l.oxw().ngIf;l.xp6(2),l.Q6J("ngForOf",s.stats)}}function zi(o,n){1&o&&l._UZ(0,"ms-empty-state",10)}function ze(o,n){if(1&o&&(l.ynx(0),l.YNc(1,De,3,1,"ng-container",3),l.YNc(2,zi,1,0,"ng-template",null,4,l.W1O),l.BQk()),2&o){const s=n.ngIf,u=l.MAs(3);l.xp6(1),l.Q6J("ngIf",null==s.stats?null:s.stats.length)("ngIfElse",u)}}const ji=function(o){return{stats:o}};let je=(()=>{var o;class n{constructor(u){this.statisticsFacadeService=u,this.statistics$=this.statisticsFacadeService.statistics$}ngOnInit(){this.statisticsFacadeService.dispatch(Di.tK.getStatistics())}}return(o=n).\u0275fac=function(u){return new(u||o)(l.Y36(Re.VC))},o.\u0275cmp=l.Xpm({type:o,selectors:[["ms-running-statistics"]],decls:6,vars:7,consts:[[1,"ms-card"],[1,"heading-section-title"],[4,"ngIf"],[4,"ngIf","ngIfElse"],["noStatistics",""],[1,"key-value-container"],["class","key-value-pair",4,"ngFor","ngForOf"],[1,"key-value-pair"],[1,"key-value-key"],[1,"key-value-value"],["title","No statistics available."]],template:function(u,c){1&u&&(l.TgZ(0,"mat-card",0)(1,"p",1),l._uU(2,"Statistics"),l.qZA(),l.YNc(3,ze,4,2,"ng-container",2),l.ALo(4,"keyvalue"),l.ALo(5,"async"),l.qZA()),2&u&&(l.xp6(3),l.Q6J("ngIf",l.VKq(5,ji,l.lcZ(4,1,l.lcZ(5,3,c.statistics$)))))},dependencies:[M.sg,M.O5,Mt.u,Pe.a8,M.Ov,M.Nd]}),n})();var ie;function Ve(o,n){if(1&o&&l._UZ(0,"ms-running-animation",28),2&o){const s=l.oxw();l.Q6J("animationType",s.AnimationType.QUANTIZATION)}}function Vi(o,n){if(1&o&&l._UZ(0,"ms-running-animation",28),2&o){const s=l.oxw();l.Q6J("animationType",s.AnimationType.PRUNING)}}function Fe(o,n){if(1&o&&l._UZ(0,"ms-running-animation",28),2&o){const s=l.oxw();l.Q6J("animationType",s.AnimationType.PRUNING)}}function Fi(o,n){if(1&o){const s=l.EpF();l.TgZ(0,"div",29)(1,"button",30),l.NdJ("click",function(){l.CHM(s);const c=l.oxw();return l.KtG(c.runStopScript())}),l._uU(2," Stop "),l.qZA()()}}function He(o,n){1&o&&(l.TgZ(0,"div",31)(1,"div",17),l._uU(2,"\u2014"),l.qZA(),l.TgZ(3,"div",18),l._uU(4,"Sparsity"),l.qZA()())}function Hi(o,n){1&o&&l._UZ(0,"ms-running-quantization-charts")}function Be(o,n){1&o&&l._UZ(0,"ms-running-pruning-charts")}function Bi(o,n){1&o&&l._UZ(0,"ms-running-machine-unlearning-charts")}function Ye(o,n){if(1&o&&(l.ynx(0)(1,1),l.YNc(2,Hi,1,0,"ms-running-quantization-charts",32),l.YNc(3,Be,1,0,"ms-running-pruning-charts",32),l.YNc(4,Bi,1,0,"ms-running-machine-unlearning-charts",32),l.BQk()()),2&o){const s=l.oxw();l.xp6(1),l.Q6J("ngSwitch",null==s.scriptDetails?null:s.scriptDetails.type),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.QUANTIZATION),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.PRUNING),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.MACHINE_UNLEARNING)}}function Yi(o,n){1&o&&l._UZ(0,"ms-empty-state",33)}function Ge(o,n){1&o&&(l.ynx(0),l.TgZ(1,"div",34),l._UZ(2,"ms-running-statistics"),l.qZA(),l.BQk())}let $=((ie=class{constructor(n,s,u){this.navigationService=n,this.scriptFacadeService=s,this.chartToolsGlobalSignalsService=u,this.isScriptActive=!1,this.AlgorithmType=z.Bd,this.AnimationType=Et}ngOnInit(){this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.dispatch(lt.a.getCurrentOrLastActiveScriptDetails()),this.scriptFacadeService.scriptDetails$.pipe((0,B.T)(1),(0,K.q)(1),(0,Q.h)(n=>!!n?.algKey)).subscribe(n=>{this.scriptDetails=n}),this.scriptFacadeService.scriptStatus$.pipe((0,N.t)(this)).subscribe(n=>{this.isScriptActive=(0,Lt.A)(n)})}runStopScript(){this.scriptFacadeService.dispatch(lt.a.stopScript())}get isSparsityVisible(){return this.scriptDetails?.type===z.Bd.PRUNING}toggleTooltip(n){this.chartToolsGlobalSignalsService.toggleTooltips=n.checked}toggleZoom(n){this.chartToolsGlobalSignalsService.toggleZoom=n.checked}get isChartVisible(){return!!this.scriptDetails?.algKey}goToPreviousPage(){this.navigationService.goToPreviousPage(this.scriptDetails?.algKey===z.rj.MU?D.Z.MACHINE_UNLEARNING.ROOT:D.Z.MODEL_COMPRESSION.ROOT)}}).\u0275fac=function(n){return new(n||ie)(l.Y36(wi.f),l.Y36(Le.O),l.Y36(pe.d))},ie.\u0275cmp=l.Xpm({type:ie,selectors:[["ms-running"]],decls:48,vars:12,consts:[[1,"heading-primary-title","title"],[3,"ngSwitch"],[3,"animationType",4,"ngSwitchCase"],[1,"ms-card","running-prunning"],[1,"training-status","mb-2"],[1,"status-bar"],[1,"runnning-title-container"],[1,"model-name","heading-sub-section-title"],["class","ml-2",4,"ngIf"],[1,"mt-2","flex"],["color","primary",3,"disabled","change"],[1,"flex"],["color","primary",1,"ml-2",3,"disabled","change"],[1,"ml-1"],["fontSet","ms","fontIcon","icon-Info","matTooltip","Use mouse wheel to zoom in/out. Select an area with the mouse to zoom into a specific region."],[1,"metrics"],[1,"metric","accuracy"],[1,"metric-value"],[1,"metric-name","paragraph-semibold-p2-large-emphasis"],[1,"metric","loss"],["class","metric sparsity",4,"ngIf"],[1,"metric","testing"],[4,"ngIf","ngIfElse"],["noChartData",""],[4,"ngIf"],[1,"mt-4"],["mat-raised-button","","color","primary",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],[3,"animationType"],[1,"ml-2"],["mat-raised-button","","color","warn","matTooltip","Stop current process.",3,"click"],[1,"metric","sparsity"],[4,"ngSwitchCase"],["title","No Chart Data Available","message","Please run the appropriate script to generate chart data."],[1,"mt-2"]],template:function(n,s){if(1&n&&(l.TgZ(0,"p",0),l._uU(1,"Running"),l.qZA(),l.ynx(2,1),l.YNc(3,Ve,1,1,"ms-running-animation",2),l.YNc(4,Vi,1,1,"ms-running-animation",2),l.YNc(5,Fe,1,1,"ms-running-animation",2),l.BQk(),l.TgZ(6,"mat-card",3)(7,"div",4)(8,"div",5)(9,"div")(10,"div",6)(11,"div",7),l._uU(12),l.qZA(),l.YNc(13,Fi,3,0,"div",8),l.qZA(),l.TgZ(14,"div",9)(15,"div")(16,"mat-slide-toggle",10),l.NdJ("change",function(c){return s.toggleTooltip(c)}),l._uU(17," Enable tooltips "),l.qZA()(),l.TgZ(18,"div",11)(19,"mat-slide-toggle",12),l.NdJ("change",function(c){return s.toggleZoom(c)}),l._uU(20," Enable zoom "),l.qZA(),l.TgZ(21,"div",13),l._UZ(22,"mat-icon",14),l.qZA()()()()(),l.TgZ(23,"div",15)(24,"div",16)(25,"div",17),l._uU(26,"\u2014"),l.qZA(),l.TgZ(27,"div",18),l._uU(28,"Accuracy"),l.qZA()(),l.TgZ(29,"div",19)(30,"div",17),l._uU(31,"\u2014"),l.qZA(),l.TgZ(32,"div",18),l._uU(33,"Loss"),l.qZA()(),l.YNc(34,He,5,0,"div",20),l.TgZ(35,"div",21)(36,"div",17),l._uU(37,"\u2014"),l.qZA(),l.TgZ(38,"div",18),l._uU(39,"Test"),l.qZA()()()(),l.YNc(40,Ye,5,4,"ng-container",22),l.YNc(41,Yi,1,0,"ng-template",null,23,l.W1O),l.qZA(),l.YNc(43,Ge,3,0,"ng-container",24),l.TgZ(44,"div",25)(45,"button",26),l.NdJ("click",function(){return s.goToPreviousPage()}),l._UZ(46,"mat-icon",27),l._uU(47," Go back "),l.qZA()()),2&n){const u=l.MAs(42);l.xp6(2),l.Q6J("ngSwitch",null==s.scriptDetails?null:s.scriptDetails.type),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.QUANTIZATION),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.PRUNING),l.xp6(1),l.Q6J("ngSwitchCase",s.AlgorithmType.MACHINE_UNLEARNING),l.xp6(7),l.hij("Algorithm: ",(null==s.scriptDetails?null:s.scriptDetails.algKey)||"None",""),l.xp6(1),l.Q6J("ngIf",s.isScriptActive),l.xp6(3),l.Q6J("disabled",!(null!=s.scriptDetails&&s.scriptDetails.algKey)),l.xp6(3),l.Q6J("disabled",!(null!=s.scriptDetails&&s.scriptDetails.algKey)),l.xp6(15),l.Q6J("ngIf",s.isSparsityVisible),l.xp6(6),l.Q6J("ngIf",s.isChartVisible)("ngIfElse",u),l.xp6(3),l.Q6J("ngIf",(null==s.scriptDetails?null:s.scriptDetails.type)===s.AlgorithmType.MACHINE_UNLEARNING)}},dependencies:[M.O5,M.RF,M.n9,Mt.u,Yt.lW,ne.Hw,Pe.a8,U.gM,qe.Rr,me,ii,It,ee,je],styles:[".training-status[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.training-status[_ngcontent-%COMP%]   .status-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.training-status[_ngcontent-%COMP%]   .runnning-title-container[_ngcontent-%COMP%]{display:flex;align-items:center}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%], .training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]{display:flex;gap:10px}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-size:1.25rem}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.sparsity[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-sparsity)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.accuracy[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-accuracy)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.loss[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-loss)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.testing[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-testing)}"]}),ie);$=(0,mt.gn)([(0,N.c)()],$);const Bt=[{path:"",component:$}];let G=(()=>{var o;class n{}return(o=n).\u0275fac=function(u){return new(u||o)},o.\u0275mod=l.oAB({type:o}),o.\u0275inj=l.cJS({imports:[xt.Bz.forChild(Bt),xt.Bz]}),n})(),Gi=(()=>{var o;class n{}return(o=n).\u0275fac=function(u){return new(u||o)},o.\u0275mod=l.oAB({type:o}),o.\u0275inj=l.cJS({imports:[G,M.ez,x.m]}),n})()},7207:(Xe,zt,_)=>{_.d(zt,{a:()=>K,b:()=>lt});var M=Object.create,x=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,mt=Object.getOwnPropertyNames,N=Object.getPrototypeOf,B=Object.prototype.hasOwnProperty,K=(D,z)=>()=>(z||D((z={exports:{}}).exports,z),z.exports),lt=(D,z,Lt)=>(Lt=null!=D?M(N(D)):{},((D,z,Lt,Et)=>{if(z&&"object"==typeof z||"function"==typeof z)for(let l of mt(z))!B.call(D,l)&&undefined!==l&&x(D,l,{get:()=>z[l],enumerable:!(Et=xt(z,l))||Et.enumerable});return D})(!z&&D&&D.__esModule?Lt:x(Lt,"default",{value:D,enumerable:!0}),D))},2222:(Xe,zt,_)=>{_.d(zt,{a:()=>$,b:()=>Bt,c:()=>G,d:()=>u,e:()=>an,f:()=>ln,g:()=>hn,h:()=>Ot,i:()=>cn,j:()=>xn});var M=_(5861),x=_(1180),xt={},N=Uint8Array,B=Uint16Array,K=Int32Array,Q=new N([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),lt=new N([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),D=new N([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),z=function(i,t){for(var e=new B(31),r=0;r<31;++r)e[r]=t+=1<<i[r-1];var a=new K(e[30]);for(r=1;r<30;++r)for(var h=e[r];h<e[r+1];++h)a[h]=h-e[r]<<5|r;return{b:e,r:a}},Lt=z(Q,2),Et=Lt.b,l=Lt.r;Et[28]=258,l[258]=28;var Le=z(lt,0).b,pe=new B(32768);for(U=0;U<32768;++U)pe[U]=((65280&(Mt=(61680&(Mt=(52428&(Mt=(43690&U)>>1|(21845&U)<<1))>>2|(13107&Mt)<<2))>>4|(3855&Mt)<<4))>>8|(255&Mt)<<8)>>1;var Mt,Yt=function(i,t,e){for(var r=i.length,a=0,h=new B(t);a<r;++a)i[a]&&++h[i[a]-1];var p,d=new B(t);for(a=1;a<t;++a)d[a]=d[a-1]+h[a-1]<<1;if(e){p=new B(1<<t);var m=15-t;for(a=0;a<r;++a)if(i[a])for(var g=a<<4|i[a],v=t-i[a],f=d[i[a]-1]++<<v,C=f|(1<<v)-1;f<=C;++f)p[pe[f]>>m]=g}else for(p=new B(r),a=0;a<r;++a)i[a]&&(p[a]=pe[d[i[a]-1]++]>>15-i[a]);return p},ne=new N(288);for(U=0;U<144;++U)ne[U]=8;for(U=144;U<256;++U)ne[U]=9;for(U=256;U<280;++U)ne[U]=7;for(U=280;U<288;++U)ne[U]=8;var Pe=new N(32);for(U=0;U<32;++U)Pe[U]=5;var U,qe=Yt(ne,9,1),Gt=Yt(Pe,5,1),ht=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},J=function(i,t,e){var r=t/8|0;return(i[r]|i[r+1]<<8)>>(7&t)&e},Jt=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(7&t)},F=function(i){return(i+7)/8|0},ot=function(i,t,e){return(null==t||t<0)&&(t=0),(null==e||e>i.length)&&(e=i.length),new N(i.subarray(t,e))},Ke=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],et=function(i,t,e){var r=new Error(t||Ke[i]);if(r.code=i,Error.captureStackTrace&&Error.captureStackTrace(r,et),!e)throw r;return r},We=function(i,t,e,r){var a=i.length,h=r?r.length:0;if(!a||t.f&&!t.l)return e||new N(0);var d=!e,p=d||2!=t.i,m=t.i;d&&(e=new N(3*a));var g=function(mn){var gn=e.length;if(mn>gn){var fn=new N(Math.max(2*gn,mn));fn.set(e),e=fn}},v=t.f||0,f=t.p||0,C=t.b||0,A=t.l,L=t.d,w=t.m,O=t.n,P=8*a;do{if(!A){v=J(i,f,1);var V=J(i,f+1,3);if(f+=3,!V){var Xi=i[(Ct=F(f)+4)-4]|i[Ct-3]<<8,qi=Ct+Xi;if(qi>a){m&&et(0);break}p&&g(C+Xi),e.set(i.subarray(Ct,qi),C),t.b=C+=Xi,t.p=f=8*qi,t.f=v;continue}if(1==V)A=qe,L=Gt,w=9,O=5;else if(2==V){var R=J(i,f,31)+257,yt=J(i,f+10,15)+4,at=R+J(i,f+5,31)+1;f+=14;for(var _t=new N(at),ut=new N(19),q=0;q<yt;++q)ut[D[q]]=J(i,f+3*q,7);f+=3*yt;var ct=ht(ut),Nt=(1<<ct)-1,dt=Yt(ut,ct,1);for(q=0;q<at;){var Ct,bt=dt[J(i,f,Nt)];if(f+=15&bt,(Ct=bt>>4)<16)_t[q++]=Ct;else{var Tt=0,pt=0;for(16==Ct?(pt=3+J(i,f,3),f+=2,Tt=_t[q-1]):17==Ct?(pt=3+J(i,f,7),f+=3):18==Ct&&(pt=11+J(i,f,127),f+=7);pt--;)_t[q++]=Tt}}var Rt=_t.subarray(0,R),Dt=_t.subarray(R);w=ht(Rt),O=ht(Dt),A=Yt(Rt,w,1),L=Yt(Dt,O,1)}else et(1);if(f>P){m&&et(0);break}}p&&g(C+131072);for(var Ln=(1<<w)-1,Pn=(1<<O)-1,Ki=f;;Ki=f){var xe=(Tt=A[Jt(i,f)&Ln])>>4;if((f+=15&Tt)>P){m&&et(0);break}if(Tt||et(2),xe<256)e[C++]=xe;else{if(256==xe){Ki=f,A=null;break}var un=xe-254;xe>264&&(un=J(i,f,(1<<(Qe=Q[q=xe-257]))-1)+Et[q],f+=Qe);var Wi=L[Jt(i,f)&Pn],tn=Wi>>4;if(Wi||et(3),f+=15&Wi,Dt=Le[tn],tn>3){var Qe=lt[tn];Dt+=Jt(i,f)&(1<<Qe)-1,f+=Qe}if(f>P){m&&et(0);break}p&&g(C+131072);var dn=C+un;if(C<Dt){var pn=h-Dt,On=Math.min(Dt,dn);for(pn+C<0&&et(3);C<On;++C)e[C]=r[pn+C]}for(;C<dn;++C)e[C]=e[C-Dt]}}t.l=A,t.p=Ki,t.b=C,t.f=v,A&&(v=1,t.m=w,t.d=L,t.n=O)}while(!v);return C!=e.length&&d?ot(e,0,C):e.subarray(0,C)},ti=new N(0),Oe=function(i,t,e){for(var r=i(),a=i.toString(),h=a.slice(a.indexOf("[")+1,a.lastIndexOf("]")).replace(/\s+/g,"").split(","),d=0;d<r.length;++d){var p=r[d],m=h[d];if("function"==typeof p){t+=";"+m+"=";var g=p.toString();if(p.prototype)if(-1!=g.indexOf("[native code]")){var v=g.indexOf(" ",8)+1;t+=g.slice(v,g.indexOf("(",v))}else for(var f in t+=g,p.prototype)t+=";"+m+".prototype."+f+"="+p.prototype[f].toString();else t+=g}else e[m]=p}return t},oe=[],Qt=function(){return[N,B,K,Q,lt,D,Et,Le,qe,Gt,pe,Ke,Yt,ht,J,Jt,F,ot,et,We,se,me,ii]},me=function(i){return postMessage(i,[i.buffer])},ii=function(i){return i&&{out:i.size&&new N(i.size),dictionary:i.dictionary}},xi=function(i,t,e,r,a,h){var d=function(i,t,e,r){if(!oe[e]){for(var a="",h={},d=i.length-1,p=0;p<d;++p)a=Oe(i[p],a,h);oe[e]={c:Oe(i[d],a,h),e:h}}var m=function(i,t){var e={};for(var r in i)e[r]=i[r];for(var r in t)e[r]=t[r];return e}({},oe[e].e);return function(i,t,e,r,a){var h=new Worker(xt[t]||(xt[t]=URL.createObjectURL(new Blob([i+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return h.onmessage=function(d){var p=d.data,m=p.$e$;if(m){var g=new Error(m[0]);g.code=m[1],g.stack=m[2],a(g,null)}else a(null,p)},h.postMessage(e,r),h}(oe[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",e,m,function(i){var t=[];for(var e in i)i[e].buffer&&t.push((i[e]=new i[e].constructor(i[e])).buffer);return t}(m),r)}(e,r,a,function(p,m){d.terminate(),h(p,m)});return d.postMessage([i,t],t.consume?[i.buffer]:[]),function(){d.terminate()}},It=function(i,t){return i[t]|i[t+1]<<8},gt=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},E=function(i,t){return gt(i,t)+4294967296*gt(i,t+4)};function se(i,t){return We(i,{i:2},t&&t.out,t&&t.dictionary)}var re=typeof TextDecoder<"u"&&new TextDecoder;try{re.decode(ti,{stream:!0})}catch{}var oi=function(i){for(var t="",e=0;;){var r=i[e++],a=(r>127)+(r>223)+(r>239);if(e+a>i.length)return{s:t,r:ot(i,e-1)};a?3==a?(r=((15&r)<<18|(63&i[e++])<<12|(63&i[e++])<<6|63&i[e++])-65536,t+=String.fromCharCode(55296|r>>10,56320|1023&r)):t+=String.fromCharCode(1&a?(31&r)<<6|63&i[e++]:(15&r)<<12|(63&i[e++])<<6|63&i[e++]):t+=String.fromCharCode(r)}};function Xt(i,t){if(t){for(var e="",r=0;r<i.length;r+=16384)e+=String.fromCharCode.apply(null,i.subarray(r,r+16384));return e}if(re)return re.decode(i);var a=oi(i),h=a.s;return(e=a.r).length&&et(8),h}var Li=function(i,t){return t+30+It(i,t+26)+It(i,t+28)},Pi=function(i,t,e){var r=It(i,t+28),a=Xt(i.subarray(t+46,t+46+r),!(2048&It(i,t+8))),h=t+46+r,d=gt(i,t+20),p=e&&4294967295==d?si(i,h):[d,gt(i,t+24),gt(i,t+42)],m=p[0],g=p[1],v=p[2];return[It(i,t+10),m,g,a,h+It(i,t+30)+It(i,t+32),v]},si=function(i,t){for(;1!=It(i,t);t+=4+It(i,t+2));return[E(i,t+12),E(i,t+4),E(i,t+20)]},fe="function"==typeof queueMicrotask?queueMicrotask:"function"==typeof setTimeout?setTimeout:function(i){i()};function ri(i){return(Array.isArray(i)?i:i.issues).reduce((t,e)=>{if(e.path){let r=e.path.map(({key:a})=>a).join(".");t.nested[r]=[...t.nested[r]||[],e.message]}else t.root=[...t.root||[],e.message];return t},{nested:{}})}var Oi=class extends Error{constructor(t){super(t[0].message),(0,x.Z)(this,"issues",void 0),this.name="ValiError",this.issues=t}};function ai(i,t){return{reason:i?.reason,validation:t.validation,origin:i?.origin||"value",message:t.message,input:t.input,abortEarly:i?.abortEarly,abortPipeEarly:i?.abortPipeEarly}}function Te(i,t){return{reason:t,origin:i?.origin,abortEarly:i?.abortEarly,abortPipeEarly:i?.abortPipeEarly}}function $t(i,t,e,r){if(!t||!t.length)return{output:i};let a,h,d=i;for(let p of t){let m=p(d);if(m.issue){a=a||Te(e,r);let g=ai(a,m.issue);if(h?h.push(g):h=[g],a.abortEarly||a.abortPipeEarly)break}else d=m.output}return h?{issues:h}:{output:d}}function ft(i,t){return i&&"string"!=typeof i?[void 0,i]:[i,t]}function St(i,t,e,r,a,h){return{issues:[{reason:t,validation:e,origin:i?.origin||"value",message:r,input:a,issues:h,abortEarly:i?.abortEarly,abortPipeEarly:i?.abortPipeEarly}]}}function Vt(i,t,e){let[r,a]=ft(t,e);return{schema:"array",array:{item:i},async:!1,_parse(h,d){if(!Array.isArray(h))return St(d,"type","array",r||"Invalid type",h);let p,m=[];for(let g=0;g<h.length;g++){let v=h[g],f=i._parse(v,d);if(f.issues){let C={schema:"array",input:h,key:g,value:v};for(let A of f.issues)A.path?A.path.unshift(C):A.path=[C],p?.push(A);if(p||(p=f.issues),null!=d&&d.abortEarly)break}else m.push(f.output)}return p?{issues:p}:$t(m,a,d,"array")}}}function Kt(i,t){let[e,r]=ft(i,t);return{schema:"boolean",async:!1,_parse:(a,h)=>"boolean"!=typeof a?St(h,"type","boolean",e||"Invalid type",a):$t(a,r,h,"boolean")}}function Ft(i,t){return{schema:"literal",literal:i,async:!1,_parse:(e,r)=>e!==i?St(r,"type","literal",t||"Invalid type",e):{output:e}}}function vt(i,t){let[e,r]=ft(i,t);return{schema:"number",async:!1,_parse:(a,h)=>"number"!=typeof a?St(h,"type","number",e||"Invalid type",a):$t(a,r,h,"number")}}function W(i,t,e){let h,[r,a]=ft(t,e);return{schema:"object",object:i,async:!1,_parse(d,p){if(!d||"object"!=typeof d)return St(p,"type","object",r||"Invalid type",d);h=h||Object.entries(i);let m,g={};for(let[v,f]of h){let C=d[v],A=f._parse(C,p);if(A.issues){let L={schema:"object",input:d,key:v,value:C};for(let w of A.issues)w.path?w.path.unshift(L):w.path=[L],m?.push(w);if(m||(m=A.issues),null!=p&&p.abortEarly)break}else g[v]=A.output}return m?{issues:m}:$t(g,a,p,"object")}}}function Z(i){return{schema:"optional",wrapped:i,async:!1,_parse:(t,e)=>void 0===t?{output:t}:i._parse(t,e)}}function st(i,t){let[e,r]=ft(i,t);return{schema:"string",async:!1,_parse:(a,h)=>"string"!=typeof a?St(h,"type","string",e||"Invalid type",a):$t(a,r,h,"string")}}var ae=["__proto__","prototype","constructor"];function ci(i,t,e,r){let[a,h,d]=function hi(i,t,e){if("object"==typeof i&&!Array.isArray(i)){let[h,d]=ft(t,e);return[i,h,d]}let[r,a]=ft(i,t);return[void 0,r,a]}(t,e,r);return{schema:"tuple",tuple:{items:i,rest:a},async:!1,_parse(p,m){if(!Array.isArray(p)||!a&&i.length!==p.length||a&&i.length>p.length)return St(m,"type","tuple",h||"Invalid type",p);let g,v=[];for(let f=0;f<i.length;f++){let C=p[f],A=i[f]._parse(C,m);if(A.issues){let L={schema:"tuple",input:p,key:f,value:C};for(let w of A.issues)w.path?w.path.unshift(L):w.path=[L],g?.push(w);if(g||(g=A.issues),null!=m&&m.abortEarly)break}else v[f]=A.output}if(a)for(let f=i.length;f<p.length;f++){let C=p[f],A=a._parse(C,m);if(A.issues){let L={schema:"tuple",input:p,key:f,value:C};for(let w of A.issues)w.path?w.path.unshift(L):w.path=[L],g?.push(w);if(g||(g=A.issues),null!=m&&m.abortEarly)break}else v[f]=A.output}return g?{issues:g}:$t(v,d,m,"tuple")}}}function he(i,t){return{schema:"union",union:i,async:!1,_parse(e,r){let a,h;for(let d of i){let p=d._parse(e,r);if(!p.issues){h=[p.output];break}if(a)for(let m of p.issues)a.push(m);else a=p.issues}return h?{output:h[0]}:St(r,"type","union",t||"Invalid type",e,a)}}}function kt(i,t,e){let[r,a]=ft(t,e);return W(i.reduce((h,d)=>({...h,...d.object}),{}),r,a)}function Ut(i,t){return e=>e>i?{issue:{validation:"max_value",message:t||"Invalid value",input:e}}:{output:e}}function ye(i,t){return e=>e<i?{issue:{validation:"min_value",message:t||"Invalid value",input:e}}:{output:e}}var i,pi=Object.create,_e=Object.defineProperty,Mi=Object.getOwnPropertyDescriptor,T=Object.getOwnPropertyNames,Wt=Object.getPrototypeOf,it=Object.prototype.hasOwnProperty,Pt=(i,t)=>function(){return t||(0,i[T(i)[0]])((t={exports:{}}).exports,t),t.exports},te=Pt({"../../node_modules/.pnpm/@rgba-image+copy@0.1.3/node_modules/@rgba-image/copy/dist/index.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.copy=void 0,i.copy=(e,r,a=0,h=0,d=e.width-a,p=e.height-h,m=0,g=0)=>{if(a|=0,h|=0,p|=0,m|=0,g|=0,(d|=0)<=0||p<=0)return;let v=new Uint32Array(e.data.buffer),f=new Uint32Array(r.data.buffer);for(let C=0;C<p;C++){let A=h+C;if(A<0||A>=e.height)continue;let L=g+C;if(!(L<0||L>=r.height))for(let w=0;w<d;w++){let O=a+w;if(O<0||O>=e.width)continue;let P=m+w;P<0||P>=r.width||(f[L*r.width+P]=v[A*e.width+O])}}}}}),Ti=Pt({"../../node_modules/.pnpm/@rgba-image+create-image@0.1.1/node_modules/@rgba-image/create-image/dist/index.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.CreateImageFactory=(t=[0,0,0,0],e=4)=>{if(e=Math.floor(e),isNaN(e)||e<1)throw TypeError("channels should be a positive non-zero number");if(!("length"in t)||t.length<e)throw TypeError(`fill should be iterable with at least ${e} members`);let r=(t=new Uint8ClampedArray(t).slice(0,e)).every(a=>0===a);return(a,h,d)=>{if(void 0===a||void 0===h)throw TypeError("Not enough arguments");if(a=Math.floor(a),h=Math.floor(h),isNaN(a)||a<1||isNaN(h)||h<1)throw TypeError("Index or size is negative or greater than the allowed amount");let p=a*h*e;if(void 0===d&&(d=new Uint8ClampedArray(p)),d instanceof Uint8ClampedArray){if(d.length!==p)throw TypeError("Index or size is negative or greater than the allowed amount");if(!r)for(let m=0;m<h;m++)for(let g=0;g<a;g++){let v=(m*a+g)*e;for(let f=0;f<e;f++)d[v+f]=t[f]}return{get width(){return a},get height(){return h},get data(){return d}}}throw TypeError("Expected data to be Uint8ClampedArray or undefined")}},i.createImage=i.CreateImageFactory()}}),$e=Pt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/filters.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.filters=void 0;var e=(h,d)=>{if(h<=-d||h>=d||0==h)return 0;let p=h*Math.PI;return Math.sin(p)/p*Math.sin(p/d)/(p/d)},r=h=>Math.round(16383*h);i.filters=(h,d,p,m,g)=>{let v=g?2:3,f=1/p,C=Math.min(1,p),A=v/C,L=Math.floor(2*(A+1)),w=new Int16Array((L+2)*d),O=0;for(let P=0;P<d;P++){let V=(P+.5)*f+m,R=Math.max(0,Math.floor(V-A)),yt=Math.min(h-1,Math.ceil(V+A)),at=yt-R+1,_t=new Float32Array(at),ut=new Int16Array(at),q=0,ct=0;for(let pt=R;pt<=yt;pt++){let Rt=e((pt+.5-V)*C,v);q+=Rt,_t[ct]=Rt,ct++}let Nt=0;for(let pt=0;pt<_t.length;pt++){let Rt=_t[pt]/q;Nt+=Rt,ut[pt]=r(Rt)}ut[d>>1]+=r(1-Nt);let dt=0;for(;dt<ut.length&&0===ut[dt];)dt++;let bt=ut.length-1;for(;bt>0&&0===ut[bt];)bt--;let Tt=bt-dt+1;w[O++]=R+dt,w[O++]=Tt,w.set(ut.subarray(dt,bt+1),O),O+=Tt}return w}}}),be=Pt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/convolve.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.convolve=void 0,i.convolve=(r,a,h,d,p,m)=>{let g=0,v=0;for(let f=0;f<d;f++){let C=0;for(let A=0;A<p;A++){let w=g+4*m[C++]|0,O=0,P=0,V=0,R=0;for(let yt=m[C++];yt>0;yt--){let at=m[C++];O=O+at*r[w]|0,P=P+at*r[w+1]|0,V=V+at*r[w+2]|0,R=R+at*r[w+3]|0,w=w+4|0}a[v]=O+8192>>14,a[v+1]=P+8192>>14,a[v+2]=V+8192>>14,a[v+3]=R+8192>>14,v=v+4*d|0}v=4*(f+1)|0,g=(f+1)*h*4|0}}}}),Ei=Pt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/index.js"(i){Object.defineProperty(i,"__esModule",{value:!0}),i.lanczos2=i.lanczos=void 0;var t=te(),e=Ti(),r=$e(),a=be(),h=(m,g,v=!1)=>{let C=g.height/m.height,A=r.filters(m.width,g.width,g.width/m.width,0,v),L=r.filters(m.height,g.height,C,0,v),w=new Uint8ClampedArray(g.width*m.height*4);a.convolve(m.data,w,m.width,m.height,g.width,A),a.convolve(w,g.data,m.height,g.width,g.height,L)};i.lanczos=(m,g,v=0,f=0,C=m.width-v,A=m.height-f,L=0,w=0,O=g.width-L,P=g.height-w)=>{if(f|=0,A|=0,L|=0,w|=0,O|=0,P|=0,(C|=0)<=0||A<=0||O<=0||P<=0)return;if(0==(v|=0)&&0===f&&C===m.width&&A===m.height&&0===L&&0===w&&O===g.width&&P===g.height)return void h(m,g);let V=e.createImage(C,A),R=e.createImage(O,P);t.copy(m,V,v,f),h(V,R),t.copy(R,g,0,0,R.width,R.height,L,w)},i.lanczos2=(m,g,v=0,f=0,C=m.width-v,A=m.height-f,L=0,w=0,O=g.width-L,P=g.height-w)=>{if(f|=0,A|=0,L|=0,w|=0,O|=0,P|=0,(C|=0)<=0||A<=0||O<=0||P<=0)return;if(0==(v|=0)&&0===f&&C===m.width&&A===m.height&&0===L&&0===w&&O===g.width&&P===g.height)return void h(m,g,!0);let V=e.createImage(C,A),R=e.createImage(O,P);t.copy(m,V,v,f),h(V,R,!0),t.copy(R,g,0,0,R.width,R.height,L,w)}}}),fi=((i=fi||{}).Bounce="bounce",i.Normal="normal",i),$i=function li(i,t){return{schema:"native_enum",nativeEnum:i,async:!1,_parse:(e,r)=>Object.values(i).includes(e)?{output:e}:St(r,"type","native_enum",t||"Invalid type",e)}}(fi),vi=W({autoplay:Z(Kt()),defaultTheme:Z(st()),direction:Z(he([Ft(1),Ft(-1)])),hover:Z(Kt()),id:st(),intermission:Z(vt()),loop:Z(he([Kt(),vt()])),playMode:Z($i),speed:Z(vt()),themeColor:Z(st())}),ki=W({animations:Vt(st()),id:st()}),yi=W({activeAnimationId:Z(st()),animations:Vt(vi),author:Z(st()),custom:Z(function le(i,t,e,r){let[a,h,d,p]=function Ht(i,t,e,r){if("object"==typeof t&&!Array.isArray(t)){let[d,p]=ft(e,r);return[i,t,d,p]}let[a,h]=ft(t,e);return[st(),i,a,h]}(i,t,e,r);return{schema:"record",record:{key:a,value:h},async:!1,_parse(m,g){if(!m||"object"!=typeof m)return St(g,"type","record",d||"Invalid type",m);let v,f={};for(let[C,A]of Object.entries(m))if(!ae.includes(C)){let L,w=a._parse(C,{origin:"key",abortEarly:g?.abortEarly,abortPipeEarly:g?.abortPipeEarly});if(w.issues){L={schema:"record",input:m,key:C,value:A};for(let P of w.issues)P.path=[L],v?.push(P);if(v||(v=w.issues),null!=g&&g.abortEarly)break}let O=h._parse(A,g);if(O.issues){L=L||{schema:"record",input:m,key:C,value:A};for(let P of O.issues)P.path?P.path.unshift(L):P.path=[L],v?.push(P);if(v||(v=O.issues),null!=g&&g.abortEarly)break}!w.issues&&!O.issues&&(f[w.output]=O.output)}return v?{issues:v}:$t(f,p,g,"record")}}}(st(),function qt(i=[]){return{schema:"any",async:!1,_parse:(t,e)=>$t(t,i,e,"any")}}())),description:Z(st()),generator:Z(st()),keywords:Z(st()),revision:Z(vt()),themes:Z(Vt(ki)),states:Z(Vt(st())),version:Z(st())}),_i=function ui(i,t,e,r){let[a,h]=ft(e,r);return W(Object.entries(i.object).reduce((d,[p,m])=>t.includes(p)?d:{...d,[p]:m},{}),a,h)}(vi,["id"]),Zt=W({state:st()}),ke=Zt,ce=kt([Zt,W({ms:vt()})]),bi=kt([Zt,W({count:vt()})]),Ui=Zt,tt=Zt,en=Zt,nt=kt([Zt,W({threshold:Z(Vt(vt([ye(0),Ut(1)])))})]),Zi=W({onAfter:Z(ce),onClick:Z(ke),onComplete:Z(en),onEnter:Z(bi),onMouseEnter:Z(Ui),onMouseLeave:Z(tt),onShow:Z(nt)}),Ni=kt([_i,W({playOnScroll:Z(ci([vt([ye(0),Ut(1)]),vt([ye(0),Ut(1)])])),segments:Z(he([ci([vt(),vt()]),st()]))})]);kt([Zi,W({animationId:Z(st()),playbackSettings:Ni})]);var rt={jpeg:"image/jpeg",png:"image/png",gif:"image/gif",bmp:"image/bmp",svg:"image/svg+xml",webp:"image/webp",mpeg:"audio/mpeg",mp3:"audio/mp3"},Ci={jpeg:[255,216,255],png:[137,80,78,71,13,10,26,10],gif:[71,73,70],bmp:[66,77],webp:[82,73,70,70,87,69,66,80],svg:[60,63,120],mp3:[73,68,51,3,0,0,0,0],mpeg:[73,68,51,3,0,0,0,0]},Ri=i=>{let t=null,e=[];if(!i)return null;let r=i.substring(i.indexOf(",")+1);t=typeof window>"u"?Buffer.from(r,"base64").toString("binary"):atob(r);let a=new Uint8Array(t.length);for(let h=0;h<t.length;h+=1)a[h]=t.charCodeAt(h);e=Array.from(a.subarray(0,8));for(let h in Ci){let d=Ci[h];if(d&&e.every((p,m)=>p===d[m]))return rt[h]}return null},Ue=class extends Error{constructor(i,t){super(i),((i,t,e)=>{((i,t,e)=>{t in i?_e(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e})(i,"symbol"!=typeof t?t+"":t,e)})(this,"code"),this.name="[dotlottie-js]",this.code=t}};function Ce(i){let t;if(typeof window>"u")t=Buffer.from(i).toString("base64");else{let e=Array.prototype.map.call(i,r=>String.fromCharCode(r)).join("");t=window.btoa(e)}return`data:${Ri(t)};base64,${t}`}function Si(i){return"w"in i&&"h"in i&&!("xt"in i)&&"p"in i}function Se(i){return!("h"in i)&&!("w"in i)&&"p"in i&&"e"in i&&"u"in i&&"id"in i}function Y(i){return Ze.apply(this,arguments)}function Ze(){return Ze=(0,M.Z)(function*(i,t=(()=>!0)){if(!(i instanceof Uint8Array))throw new Ue("DotLottie not found","INVALID_DOTLOTTIE");return yield new Promise((e,r)=>{!function ve(i,t,e){e||(e=t,t={}),"function"!=typeof e&&et(7);var r=[],a=function(){for(var O=0;O<r.length;++O)r[O]()},h={},d=function(O,P){fe(function(){e(O,P)})};fe(function(){d=e});for(var p=i.length-22;101010256!=gt(i,p);--p)if(!p||i.length-p>65558)return d(et(13,0,1),null),a;var m=It(i,p+8);if(m){var g=m,v=gt(i,p+16),f=4294967295==v||65535==g;if(f){var C=gt(i,p-12);(f=101075792==gt(i,C))&&(g=m=gt(i,C+32),v=gt(i,C+48))}for(var A=t&&t.filter,L=function(O){var P=Pi(i,v,f),V=P[0],R=P[1],yt=P[2],at=P[3],_t=P[4],q=Li(i,P[5]);v=_t;var ct=function(dt,bt){dt?(a(),d(dt,null)):(bt&&(h[at]=bt),--m||d(null,h))};if(!A||A({name:at,size:R,originalSize:yt,compression:V}))if(V)if(8==V){var Nt=i.subarray(q,q+R);if(R<32e4)try{ct(null,se(Nt,{out:new N(yt)}))}catch(dt){ct(dt,null)}else r.push(function ge(i,t,e){return e||(e=t,t={}),"function"!=typeof e&&et(7),xi(i,t,[Qt],function(r){return me(se(r.data[0],ii(r.data[1])))},1,e)}(Nt,{size:yt},ct))}else ct(et(14,"unknown compression type "+V,1),null);else ct(null,ot(i,q,q+R));else ct(null,null)},w=0;w<g;++w)L()}else d(null,{});return a}(i,{filter:t},(a,h)=>{a&&r(a),e(h)})})}),Ze.apply(this,arguments)}function Ae(i,t,e){return jt.apply(this,arguments)}function jt(){return jt=(0,M.Z)(function*(i,t,e){if(!(i instanceof Uint8Array))throw new Ue("DotLottie not found","INVALID_DOTLOTTIE");return(yield Y(i,r=>r.name===t&&(!e||e(r))))[t]}),jt.apply(this,arguments)}function Ne(i){return ee.apply(this,arguments)}function ee(){return ee=(0,M.Z)(function*(i){let t="manifest.json",e=(yield Y(i,r=>r.name===t))[t];if(!(typeof e>"u"))return JSON.parse(Xt(e,!1))}),ee.apply(this,arguments)}function Re(){return Re=(0,M.Z)(function*(i){if(!(i instanceof Uint8Array))return{success:!1,error:"DotLottie not found"};let t=yield Ne(i);if(typeof t>"u")return{success:!1,error:"Invalid .lottie file, manifest.json is missing"};let e=function di(i,t,e){let r=i._parse(t,e);return r.issues?{success:!1,error:new Oi(r.issues),issues:r.issues}:{success:!0,data:r.output,output:r.output}}(yi,t);return e.success?{success:!0}:{success:!1,error:`Invalid .lottie file, manifest.json structure is invalid, ${JSON.stringify(ri(e.error).nested,null,2)}`}}),Re.apply(this,arguments)}function Ai(i){return De.apply(this,arguments)}function De(){return De=(0,M.Z)(function*(i){let t=new Uint8Array(i),e=yield function Di(i){return Re.apply(this,arguments)}(t);if(e.error)throw new Ue(e.error,"INVALID_DOTLOTTIE");return t}),De.apply(this,arguments)}function ze(){return ze=(0,M.Z)(function*(i,t){let e=yield Y(i,a=>{let h=a.name.replace("audio/","");return a.name.startsWith("audio/")&&(!t||t({...a,name:h}))}),r={};for(let a in e){let h=e[a];h instanceof Uint8Array&&(r[a.replace("audio/","")]=Ce(h))}return r}),ze.apply(this,arguments)}function je(){return je=(0,M.Z)(function*(i,t){var e;let r=new Map;for(let[h,d]of Object.entries(t))for(let p of d.assets||[])if(Se(p)){let m=p.p;r.has(m)||r.set(m,new Set),null==(e=r.get(m))||e.add(h)}let a=yield function zi(i,t){return ze.apply(this,arguments)}(i,h=>r.has(h.name));for(let[h,d]of r){let p=a[h];if(p)for(let m of d){let g=t[m];for(let v of g?.assets||[])Se(v)&&v.p===h&&(v.p=p,v.u="",v.e=1)}}}),je.apply(this,arguments)}function Ve(){return Ve=(0,M.Z)(function*(i,t){let e=yield Y(i,a=>{let h=a.name.replace("images/","");return a.name.startsWith("images/")&&(!t||t({...a,name:h}))}),r={};for(let a in e){let h=e[a];h instanceof Uint8Array&&(r[a.replace("images/","")]=Ce(h))}return r}),Ve.apply(this,arguments)}function Fe(){return Fe=(0,M.Z)(function*(i,t){var e;let r=new Map;for(let[h,d]of Object.entries(t))for(let p of d.assets||[])if(Si(p)){let m=p.p;r.has(m)||r.set(m,new Set),null==(e=r.get(m))||e.add(h)}let a=yield function ie(i,t){return Ve.apply(this,arguments)}(i,h=>r.has(h.name));for(let[h,d]of r){let p=a[h];if(p)for(let m of d){let g=t[m];for(let v of g?.assets||[])Si(v)&&v.p===h&&(v.p=p,v.u="",v.e=1)}}}),Fe.apply(this,arguments)}function He(){return He=(0,M.Z)(function*(i,t,{inlineAssets:e}={},r){let a=`animations/${t}.json`,h=yield Ae(i,a,r);if(typeof h>"u")return;let d=JSON.parse(Xt(h,!1));if(!e)return d;let p={[t]:d};return yield function Vi(i,t){return Fe.apply(this,arguments)}(i,p),yield function ji(i,t){return je.apply(this,arguments)}(i,p),d}),He.apply(this,arguments)}function Be(){return Be=(0,M.Z)(function*(i,t,e){let r=`themes/${t}.lss`,a=yield Ae(i,r,e);if(!(typeof a>"u"))return Xt(a,!1)}),Be.apply(this,arguments)}function Ye(){return Ye=(0,M.Z)(function*(i,t){let e={},r=yield Y(i,a=>{let h=a.name.replace("states/","").replace(".json","");return a.name.startsWith("states/")&&(!t||t({...a,name:h}))});for(let a in r){let h=r[a];h instanceof Uint8Array&&(e[a.replace("states/","").replace(".json","")]=Xt(h,!1))}return e}),Ye.apply(this,arguments)}function Ge(){return Ge=(0,M.Z)(function*(i,t,e){let r=`states/${t}.json`,a=yield Ae(i,r,e);return typeof a>"u"?void 0:JSON.parse(Xt(a,!1))}),Ge.apply(this,arguments)}function $(i,t="dotLottie-common"){return new Error(`[${t}]: ${i}`)}function Bt(i,t="dotLottie-common",...e){console.error(`[${t}]:`,i,...e)}function G(i,t="dotLottie-common",...e){console.warn(`[${t}]:`,i,...e)}function o(i){return["v","ip","op","layers","fr","w","h"].every(t=>Object.prototype.hasOwnProperty.call(i,t))}function u(i,t){let e=Object.keys(i).find(r=>i[r]===t);if(void 0===e)throw new Error("Value not found in the object.");return e}function c(i){return JSON.parse(JSON.stringify(i))}function k(){return k=(0,M.Z)(function*(i,t){let[{relottie:e},{default:r}]=yield Promise.all([_.e(884).then(_.bind(_,1884)),_.e(923).then(_.bind(_,8923))]),a=yield e().use(r,{lss:t}).process(JSON.stringify(i));return JSON.parse(a.value)}),k.apply(this,arguments)}function y(){throw new Error("Cycle detected")}function H(){if(X>1)X--;else{for(var i,t=!1;void 0!==j;){var e=j;for(j=void 0,At++;void 0!==e;){var r=e.o;if(e.o=void 0,e.f&=-3,!(8&e.f)&&nn(e))try{e.c()}catch(a){t||(i=a,t=!0)}e=r}}if(At=0,X--,t)throw i}}((i,t,e)=>{e=null!=i?pi(Wt(i)):{},((i,t,e,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let a of T(t))!it.call(i,a)&&undefined!==a&&_e(i,a,{get:()=>t[a],enumerable:!(r=Mi(t,a))||r.enumerable})})(i&&i.__esModule?e:_e(e,"default",{value:i,enumerable:!0}),i)})(Ei());var I=void 0,j=void 0,X=0,At=0,we=0;function ue(i){if(void 0!==I){var t=i.n;if(void 0===t||t.t!==I)return t={i:0,S:i,p:I.s,n:void 0,t:I,e:void 0,x:void 0,r:t},void 0!==I.s&&(I.s.n=t),I.s=t,i.n=t,32&I.f&&i.S(t),t;if(-1===t.i)return t.i=0,void 0!==t.n&&(t.n.p=t.p,void 0!==t.p&&(t.p.n=t.n),t.p=I.s,t.n=void 0,I.s.n=t,I.s=t),t}}function wt(i){this.v=i,this.i=0,this.n=void 0,this.t=void 0}function nn(i){for(var t=i.s;void 0!==t;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function on(i){for(var t=i.s;void 0!==t;t=t.n){var e=t.S.n;if(void 0!==e&&(t.r=e),t.S.n=t,t.i=-1,void 0===t.n){i.s=t;break}}}function sn(i){for(var t=i.s,e=void 0;void 0!==t;){var r=t.p;-1===t.i?(t.S.U(t),void 0!==r&&(r.n=t.n),void 0!==t.n&&(t.n.p=r)):e=t,t.S.n=t.r,void 0!==t.r&&(t.r=void 0),t=r}i.s=e}function de(i){wt.call(this,void 0),this.x=i,this.s=void 0,this.g=we-1,this.f=4}function rn(i){var t=i.u;if(i.u=void 0,"function"==typeof t){X++;var e=I;I=void 0;try{t()}catch(r){throw i.f&=-2,i.f|=8,Ji(i),r}finally{I=e,H()}}}function Ji(i){for(var t=i.s;void 0!==t;t=t.n)t.S.U(t);i.x=void 0,i.s=void 0,rn(i)}function bn(i){if(I!==this)throw new Error("Out-of-order effect");sn(this),I=i,this.f&=-2,8&this.f&&Ji(this),H()}function Je(i){this.x=i,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}function Qi(){return Qi=(0,M.Z)(function*(i,t){let[{DotLottieStateMachineManager:e}]=yield Promise.all([_.e(233).then(_.bind(_,3233))]);if(!i.length)throw $("No state machines available inside this .lottie!");return new e(i,t)}),Qi.apply(this,arguments)}wt.prototype.h=function(){return!0},wt.prototype.S=function(i){this.t!==i&&void 0===i.e&&(i.x=this.t,void 0!==this.t&&(this.t.e=i),this.t=i)},wt.prototype.U=function(i){if(void 0!==this.t){var t=i.e,e=i.x;void 0!==t&&(t.x=e,i.e=void 0),void 0!==e&&(e.e=t,i.x=void 0),i===this.t&&(this.t=e)}},wt.prototype.subscribe=function(i){var t=this;return function Cn(i){var t=new Je(i);try{t.c()}catch(e){throw t.d(),e}return t.d.bind(t)}(function(){var e=t.value,r=32&this.f;this.f&=-33;try{i(e)}finally{this.f|=r}})},wt.prototype.valueOf=function(){return this.value},wt.prototype.toString=function(){return this.value+""},wt.prototype.toJSON=function(){return this.value},wt.prototype.peek=function(){return this.v},Object.defineProperty(wt.prototype,"value",{get:function(){var i=ue(this);return void 0!==i&&(i.i=this.i),this.v},set:function(i){if(I instanceof de&&function(){throw new Error("Computed cannot have side-effects")}(),i!==this.v){At>100&&y(),this.v=i,this.i++,we++,X++;try{for(var t=this.t;void 0!==t;t=t.x)t.t.N()}finally{H()}}}}),(de.prototype=new wt).h=function(){if(this.f&=-3,1&this.f)return!1;if(32==(36&this.f)||(this.f&=-5,this.g===we))return!0;if(this.g=we,this.f|=1,this.i>0&&!nn(this))return this.f&=-2,!0;var i=I;try{on(this),I=this;var t=this.x();(16&this.f||this.v!==t||0===this.i)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return I=i,sn(this),this.f&=-2,!0},de.prototype.S=function(i){if(void 0===this.t){this.f|=36;for(var t=this.s;void 0!==t;t=t.n)t.S.S(t)}wt.prototype.S.call(this,i)},de.prototype.U=function(i){if(void 0!==this.t&&(wt.prototype.U.call(this,i),void 0===this.t)){this.f&=-33;for(var t=this.s;void 0!==t;t=t.n)t.S.U(t)}},de.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var i=this.t;void 0!==i;i=i.x)i.t.N()}},de.prototype.peek=function(){if(this.h()||y(),16&this.f)throw this.v;return this.v},Object.defineProperty(de.prototype,"value",{get:function(){1&this.f&&y();var i=ue(this);if(this.h(),void 0!==i&&(i.i=this.i),16&this.f)throw this.v;return this.v}}),Je.prototype.c=function(){var i=this.S();try{if(8&this.f||void 0===this.x)return;var t=this.x();"function"==typeof t&&(this.u=t)}finally{i()}},Je.prototype.S=function(){1&this.f&&y(),this.f|=1,this.f&=-9,rn(this),on(this),X++;var i=I;return I=this,bn.bind(this,i)},Je.prototype.N=function(){2&this.f||(this.f|=2,this.o=j,j=this)},Je.prototype.d=function(){this.f|=8,1&this.f||Ji(this)};var wn_dependencies_lottie_web="^5.12.2",an=(i=>(i.Complete="complete",i.DataFail="data_fail",i.DataReady="data_ready",i.Error="error",i.Frame="frame",i.Freeze="freeze",i.LoopComplete="loopComplete",i.Pause="pause",i.Play="play",i.Ready="ready",i.Stop="stop",i.VisibilityChange="visibilityChange",i))(an||{}),ln=(i=>(i.Completed="completed",i.Error="error",i.Fetching="fetching",i.Frozen="frozen",i.Initial="initial",i.Loading="loading",i.Paused="paused",i.Playing="playing",i.Ready="ready",i.Stopped="stopped",i))(ln||{}),hn=(i=>(i.Bounce="bounce",i.Normal="normal",i))(hn||{}),Ot={autoplay:!1,direction:1,hover:!1,intermission:0,loop:!1,playMode:"normal",speed:1,defaultTheme:""},cn={activeStateId:"",autoplay:!1,currentState:"initial",frame:0,seeker:0,direction:1,hover:!1,loop:!1,playMode:"normal",speed:1,background:"transparent",intermission:0,currentAnimationId:void 0,visibilityPercentage:0},xn=class{constructor(t,e,r){(0,x.Z)(this,"_lottie",void 0),(0,x.Z)(this,"_src",void 0),(0,x.Z)(this,"_animationConfig",void 0),(0,x.Z)(this,"_prevUserPlaybackOptions",{}),(0,x.Z)(this,"_userPlaybackOptions",void 0),(0,x.Z)(this,"_hover",!1),(0,x.Z)(this,"_loop",!1),(0,x.Z)(this,"_counter",0),(0,x.Z)(this,"_intermission",0),(0,x.Z)(this,"_counterInterval",null),(0,x.Z)(this,"_container",null),(0,x.Z)(this,"_name",void 0),(0,x.Z)(this,"_mode","normal"),(0,x.Z)(this,"_background","transparent"),(0,x.Z)(this,"_animation",void 0),(0,x.Z)(this,"_defaultTheme",void 0),(0,x.Z)(this,"_activeAnimationId",void 0),(0,x.Z)(this,"_currentAnimationId",void 0),(0,x.Z)(this,"_testId",void 0),(0,x.Z)(this,"_listeners",new Map),(0,x.Z)(this,"_currentState","initial"),(0,x.Z)(this,"_stateBeforeFreeze","initial"),(0,x.Z)(this,"state",new class{constructor(t){(0,x.Z)(this,"_state",void 0),(0,x.Z)(this,"_prevState",void 0),this._prevState=t,this._state=function _n(i){return new wt(i)}(t)}setState(t){this._prevState=this._state.value,this._state.value=t}subscribe(t){return this._state.subscribe(e=>t(e,this._prevState))}}(cn)),(0,x.Z)(this,"_light",!1),(0,x.Z)(this,"_worker",!1),(0,x.Z)(this,"_dotLottieLoader",new class{constructor(){(0,x.Z)(this,"_dotLottie",void 0),(0,x.Z)(this,"_animationsMap",new Map),(0,x.Z)(this,"_themeMap",new Map),(0,x.Z)(this,"_stateMachinesMap",new Map),(0,x.Z)(this,"_manifest",void 0)}get dotLottie(){return this._dotLottie}get animationsMap(){return this._animationsMap}get themeMap(){return this._themeMap}get stateMachinesMap(){return this._stateMachinesMap}get manifest(){return this._manifest}loadFromUrl(t){var e=this;return(0,M.Z)(function*(){let r=yield fetch(t,{method:"GET",mode:"cors"});if(!r.ok)throw new Error(`Failed to load dotLottie from ${t} with status ${r.status}`);let a=r.headers.get("content-type");if(null!=a&&a.includes("application/json")){let h=yield r.json();if(!o(h))throw new Error(`Invalid lottie JSON at ${t}`);let d=function Gi(i=""){let t=i.trim(),e=t.lastIndexOf("/"),r=t.substring(e+1),a=r.indexOf(".");return-1!==a?r.substring(0,a):r}(t);e._animationsMap.set(d,h),e._manifest={activeAnimationId:d,animations:[{id:d}]}}else{e._dotLottie=yield Ai(yield r.arrayBuffer());let h=yield Ne(e._dotLottie);if(!h)throw new Error("Manifest not found");e._manifest=h}})()}loadFromLottieJSON(t){if(!o(t))throw new Error("Invalid lottie JSON");let e="my-animation";this._animationsMap.set(e,t),this._manifest={activeAnimationId:e,animations:[{id:e}]}}loadFromArrayBuffer(t){var e=this;return(0,M.Z)(function*(){e._dotLottie=yield Ai(t);let r=yield Ne(e._dotLottie);if(!r)throw new Error("Manifest not found");e._manifest=r})()}getAnimation(t){var e=this;return(0,M.Z)(function*(){if(e._animationsMap.get(t))return e._animationsMap.get(t);if(!e._dotLottie)return;let r=yield function Fi(i,t){return He.apply(this,arguments)}(e._dotLottie,t,{inlineAssets:!0});return r&&e._animationsMap.set(t,r),r})()}getTheme(t){var e=this;return(0,M.Z)(function*(){if(e._themeMap.get(t))return e._themeMap.get(t);if(!e._dotLottie)return;let r=yield function Hi(i,t,e){return Be.apply(this,arguments)}(e._dotLottie,t);return r&&e._themeMap.set(t,r),r})()}getStateMachines(){var t=this;return(0,M.Z)(function*(){if(!t._dotLottie)return;let e=yield function Bi(i,t){return Ye.apply(this,arguments)}(t._dotLottie);for(let r in e)if(r){let a=e[r];if(a){let h=JSON.parse(a);if(h){let d=h.descriptor.id;t._stateMachinesMap.get(d)||t._stateMachinesMap.set(d,h)}}}return Array.from(t._stateMachinesMap.values())})()}getStateMachine(t){var e=this;return(0,M.Z)(function*(){if(e._stateMachinesMap.get(t))return e._stateMachinesMap.get(t);if(!e._dotLottie)return;let r=yield function Yi(i,t,e){return Ge.apply(this,arguments)}(e._dotLottie,t);return r&&e._stateMachinesMap.set(r.descriptor.id,r),r})()}}),(0,x.Z)(this,"_activeStateId",void 0),(0,x.Z)(this,"_inInteractiveMode",!1),(0,x.Z)(this,"_scrollTicking",!1),(0,x.Z)(this,"_scrollCallback",void 0),(0,x.Z)(this,"_onShowIntersectionObserver",void 0),(0,x.Z)(this,"_visibilityPercentage",0),(0,x.Z)(this,"_audios",[]),(0,x.Z)(this,"_stateMachineManager",void 0),this._src="string"==typeof t?t:c(t),null!=r&&r.testId&&(this._testId=r.testId),this._defaultTheme=r?.defaultTheme||"",this._userPlaybackOptions=this._validatePlaybackOptions(r||{}),"string"==typeof r?.activeAnimationId&&(this._activeAnimationId=r.activeAnimationId),this._container=e||null,"string"==typeof r?.background&&this.setBackground(r.background),typeof r?.activeStateId<"u"&&(this._activeStateId=r.activeStateId);let{rendererSettings:a,...h}=r||{};this._animationConfig={loop:!1,autoplay:!1,renderer:"svg",rendererSettings:{clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0,filterSize:{width:"200%",height:"200%",x:"-50%",y:"-50%"},...a},...h},null!=r&&r.light&&(this._light=r.light),null!=r&&r.worker&&(this._worker=r.worker),this._listenToHover(),this._listenToVisibilityChange()}_listenToHover(){var t,e,r,a;let h=()=>{this._hover&&"playing"!==this.currentState&&this.play()},d=()=>{this._hover&&"playing"===this.currentState&&this.stop()};null==(t=this._container)||t.removeEventListener("mouseenter",h),null==(e=this._container)||e.removeEventListener("mouseleave",d),null==(r=this._container)||r.addEventListener("mouseleave",d),null==(a=this._container)||a.addEventListener("mouseenter",h)}_onVisibilityChange(){!this._lottie||typeof document>"u"||(document.hidden&&"playing"===this.currentState?this.freeze():"frozen"===this.currentState&&this.unfreeze())}_listenToVisibilityChange(){typeof document<"u"&&typeof document.hidden<"u"&&document.addEventListener("visibilitychange",()=>this._onVisibilityChange())}_getOption(t){var e;if(typeof this._userPlaybackOptions[t]<"u")return this._userPlaybackOptions[t];let r=null==(e=this._dotLottieLoader.manifest)?void 0:e.animations.find(a=>a.id===this._currentAnimationId);return r&&typeof r[t]<"u"?r[t]:Ot[t]}_getPlaybackOptions(){let t={};for(let e in Ot)typeof Ot[e]<"u"&&(t[e]=this._getOption(e));return t}_setPlayerState(t){var e,r,a;let h=t(this._getPlaybackOptions());try{_i._parse(h)}catch{return void G(`Invalid PlaybackOptions, ${JSON.stringify(h,null,2)}`)}typeof h.defaultTheme<"u"&&(this._defaultTheme=h.defaultTheme),typeof h.playMode<"u"&&(this._mode=h.playMode),typeof h.intermission<"u"&&(this._intermission=h.intermission),typeof h.hover<"u"&&(this._hover=h.hover),typeof h.loop<"u"&&(this.clearCountTimer(),this._loop=h.loop,this._counter=0,null==(e=this._lottie)||e.setLoop("number"==typeof h.loop||h.loop)),typeof h.speed<"u"&&(null==(r=this._lottie)||r.setSpeed(h.speed)),typeof h.autoplay<"u"&&this._lottie&&(this._lottie.autoplay=h.autoplay),typeof h.direction<"u"&&(null==(a=this._lottie)||a.setDirection(h.direction))}_getOptionsFromAnimation(t){let{id:e,...r}=t;return{...Ot,...r}}_updateTestData(){!this._testId||!this._lottie||(window.dotLottiePlayer||(window.dotLottiePlayer={[this._testId]:{}}),window.dotLottiePlayer[this._testId]={direction:this._lottie.playDirection,currentState:this._currentState,loop:this.loop,mode:this._mode,speed:this._lottie.playSpeed})}setContainer(t){t!==this._container&&(this._container=t,this.setBackground(this._background),this._listenToHover())}get currentState(){return this._currentState}clearCountTimer(){this._counterInterval&&clearInterval(this._counterInterval)}setCurrentState(t){this._currentState=t,this._notify(),this._updateTestData()}static isPathJSON(t){var e;return"json"===(null==(e=t.split(".").pop())?void 0:e.toLowerCase())}get src(){return this._src}updateSrc(t){this._src!==t&&(this._src="string"==typeof t?t:c(t),this._activeAnimationId=void 0,this._currentAnimationId=void 0,this.load())}get intermission(){return this._intermission}get hover(){return this._hover}setHover(t){"boolean"==typeof t&&(this._hover=t,this._userPlaybackOptions.hover=t,this._notify())}setIntermission(t){this._intermission=t,this._userPlaybackOptions.intermission=t,this._notify()}get mode(){return this._mode}get animations(){return this._dotLottieLoader.animationsMap}get themes(){return this._dotLottieLoader.themeMap}setMode(t){"string"==typeof t&&(this._mode=t,this._userPlaybackOptions.playMode=t,this._setPlayerState(()=>({playMode:t})),this._notify(),this._updateTestData())}get container(){if(this._container)return this._container}goToAndPlay(t,e,r){this._lottie&&!["loading"].includes(this._currentState)?(this._lottie.goToAndPlay(t,e,r),this.setCurrentState("playing")):G("goToAndPlay() Can't use whilst loading.")}goToAndStop(t,e,r){this._lottie&&!["loading"].includes(this._currentState)?(this._lottie.goToAndStop(t,e,r),this.setCurrentState("stopped")):G("goToAndStop() Can't use whilst loading.")}seek(t){if(!this._lottie||["loading"].includes(this._currentState))return void G("seek() Can't use whilst loading.");let e=t;"number"==typeof e&&(e=Math.round(e));let r=/^(\d+)(%?)$/u.exec(e.toString());if(!r)return;let a="%"===r[2]?this.totalFrames*Number(r[1])/100:r[1];void 0!==a&&(this._lottie.goToAndPlay(a,!0),"playing"===this.currentState?this.play():"frozen"===this.currentState?this.freeze():this.pause())}_areNumbersInRange(t,e){return t>=0&&t<=1&&e>=0&&e<=1}_updatePosition(t,e,r){let[a,h]=t??[0,this.totalFrames-1],[d,p]=e??[0,1];if(this._areNumbersInRange(d,p)){if(this.container){let{height:m,top:g}=this.container.getBoundingClientRect(),C=(window.innerHeight-g)/(window.innerHeight+m),A=a+Math.round((C-d)/(p-d)*(h-a));r&&r(C),this.goToAndStop(A,!0),(A>=h||C>=p)&&this._handleAnimationComplete()}this._scrollTicking=!1}else Bt("threshold values must be between 0 and 1")}_requestTick(t,e,r){this._scrollTicking||(requestAnimationFrame(()=>this._updatePosition(t,e,r)),this._scrollTicking=!0)}playOnScroll(t){this.stop(),this._scrollCallback&&this.stopPlayOnScroll(),this._scrollCallback=()=>this._requestTick(t?.segments,t?.threshold,t?.positionCallback),window.addEventListener("scroll",this._scrollCallback)}stopPlayOnScroll(){this._scrollCallback&&(window.removeEventListener("scroll",this._scrollCallback),this._scrollCallback=void 0)}stopPlayOnShow(){this._onShowIntersectionObserver&&(this._onShowIntersectionObserver.disconnect(),this._onShowIntersectionObserver=void 0)}addIntersectionObserver(t){if(!this.container)throw $("Can't play on show, player container element not available.");this._onShowIntersectionObserver=new IntersectionObserver(a=>{a.forEach(h=>{var d,p;this._visibilityPercentage=100*h.intersectionRatio,h.isIntersecting?(null!=t&&t.callbackOnIntersect&&t.callbackOnIntersect(this._visibilityPercentage),null==(d=this._container)||d.dispatchEvent(new Event("visibilityChange"))):null!=t&&t.callbackOnIntersect&&(t.callbackOnIntersect(0),null==(p=this._container)||p.dispatchEvent(new Event("visibilityChange")))})},{root:null,rootMargin:"0px",threshold:null!=t&&t.threshold?t.threshold:[0,1]}),this._onShowIntersectionObserver.observe(this.container)}playOnShow(t){var e;if(this.stop(),!this.container)throw $("Can't play on show, player container element not available.");this._onShowIntersectionObserver&&this.stopPlayOnShow(),this.addIntersectionObserver({threshold:null!=(e=t?.threshold)?e:[],callbackOnIntersect:r=>{0===r?this.pause():this.play()}})}_validatePlaybackOptions(t){if(!t)return{};let e={};for(let[r,a]of Object.entries(t))switch(r){case"autoplay":"boolean"==typeof a&&(e.autoplay=a);break;case"direction":"number"==typeof a&&[1,-1].includes(a)&&(e.direction=a);break;case"loop":("boolean"==typeof a||"number"==typeof a)&&(e.loop=a);break;case"playMode":"string"==typeof a&&["normal","bounce"].includes(a)&&(e.playMode=a);break;case"speed":"number"==typeof a&&(e.speed=a);break;case"themeColor":"string"==typeof a&&(e.themeColor=a);break;case"hover":"boolean"==typeof a&&(e.hover=a);break;case"intermission":"number"==typeof a&&(e.intermission=a);break;case"defaultTheme":"string"==typeof a&&(e.defaultTheme=a)}return this._requireValidPlaybackOptions(e),e}_requireAnimationsInTheManifest(){var t;if(null==(t=this._dotLottieLoader.manifest)||!t.animations.length)throw $("No animations found in manifest.")}_requireAnimationsToBeLoaded(){if(0===this._dotLottieLoader.animationsMap.size)throw $("No animations have been loaded.")}play(t,e){var r=this;return(0,M.Z)(function*(){var a,h;if(["initial","loading"].includes(r._currentState))G("Player unable to play whilst loading.");else{if(r._requireAnimationsInTheManifest(),r._requireAnimationsToBeLoaded(),r._lottie&&!t)return-1===r._lottie.playDirection&&0===r._lottie.currentFrame?r._lottie.goToAndPlay(r._lottie.totalFrames,!0):r._lottie.play(),void r.setCurrentState("playing");if("number"==typeof t){let d=null==(a=r._dotLottieLoader.manifest)?void 0:a.animations[t];if(!d)throw $("animation not found.");"function"==typeof e?yield r.render({id:d.id,...e(r._getPlaybackOptions(),r._getOptionsFromAnimation(d))}):yield r.render({id:d.id})}if("string"==typeof t){let d=null==(h=r._dotLottieLoader.manifest)?void 0:h.animations.find(p=>p.id===t);if(!d)throw $("animation not found.");"function"==typeof e?yield r.render({id:d.id,...e(r._getPlaybackOptions(),r._getOptionsFromAnimation(d))}):yield r.render({id:d.id})}}})()}playSegments(t,e){this._lottie&&!["loading"].includes(this._currentState)?(this._lottie.playSegments(t,e),this.setCurrentState("playing")):G("playSegments() Can't use whilst loading.")}resetSegments(t){this._lottie&&!["loading"].includes(this._currentState)?this._lottie.resetSegments(t):G("resetSegments() Can't use whilst loading.")}togglePlay(){"playing"===this.currentState?this.pause():this.play()}_getAnimationByIdOrIndex(t){var e,r;if(this._requireAnimationsInTheManifest(),this._requireAnimationsToBeLoaded(),"number"==typeof t){let a=null==(e=this._dotLottieLoader.manifest)?void 0:e.animations[t];if(!a)throw $("animation not found.");return a}if("string"==typeof t){let a=null==(r=this._dotLottieLoader.manifest)?void 0:r.animations.find(h=>h.id===t);if(!a)throw $("animation not found.");return a}throw $("first param must be a number or string")}get activeAnimationId(){return this._getActiveAnimationId()}get currentAnimationId(){return this._currentAnimationId}get activeStateId(){return this._activeStateId}_startInteractivity(t){var e=this;return(0,M.Z)(function*(){if(e._inInteractiveMode){if(0===e._dotLottieLoader.stateMachinesMap.size&&(yield e._dotLottieLoader.getStateMachines()),0===e._dotLottieLoader.stateMachinesMap.size)throw $("No interactivity states are available.");if("undefined"===t)throw $("stateId is not specified.");e._stateMachineManager||(e._stateMachineManager=yield function An(i,t){return Qi.apply(this,arguments)}(Array.from(e._dotLottieLoader.stateMachinesMap.values()),e)),e._stateMachineManager.start(t)}else Bt("Can't start interactivity. Not in interactive mode. Call enterInteractiveMode(stateId: string) to start.")})()}enterInteractiveMode(t){var e;if(!t)throw $("stateId must be a non-empty string.");this._inInteractiveMode||(this._prevUserPlaybackOptions={...this._userPlaybackOptions}),this._inInteractiveMode&&(null==(e=this._stateMachineManager)||e.stop()),this._activeStateId=t,this._inInteractiveMode=!0,this._startInteractivity(t)}exitInteractiveMode(){var t;this._inInteractiveMode&&(this._inInteractiveMode=!1,this._activeStateId="",null==(t=this._stateMachineManager)||t.stop(),this._userPlaybackOptions={},this._userPlaybackOptions={...this._prevUserPlaybackOptions},this._prevUserPlaybackOptions={},this.reset())}reset(){var t;let e=this._getActiveAnimationId(),r=null==(t=this._dotLottieLoader.manifest)?void 0:t.animations.find(a=>a.id===e);if(this._inInteractiveMode&&this.exitInteractiveMode(),!r)throw $("animation not found.");this.play(e)}previous(t){if(!this._dotLottieLoader.manifest||!this._dotLottieLoader.manifest.animations.length)throw $("manifest not found.");if(this._inInteractiveMode)return void G("previous() is not supported in interactive mode.");let e=this._dotLottieLoader.manifest.animations.findIndex(a=>a.id===this._currentAnimationId);if(-1===e)throw $("animation not found.");let r=this._dotLottieLoader.manifest.animations[(e-1+this._dotLottieLoader.manifest.animations.length)%this._dotLottieLoader.manifest.animations.length];if(!r||!r.id)throw $("animation not found.");this.render("function"==typeof t?{id:r.id,...t(this._getPlaybackOptions(),this._getOptionsFromAnimation(r))}:{id:r.id})}next(t){if(!this._dotLottieLoader.manifest||!this._dotLottieLoader.manifest.animations.length)throw $("manifest not found.");if(this._inInteractiveMode)return void G("next() is not supported in interactive mode.");let e=this._dotLottieLoader.manifest.animations.findIndex(a=>a.id===this._currentAnimationId);if(-1===e)throw $("animation not found.");let r=this._dotLottieLoader.manifest.animations[(e+1)%this._dotLottieLoader.manifest.animations.length];if(!r||!r.id)throw $("animation not found.");this.render("function"==typeof t?{id:r.id,...t(this._getPlaybackOptions(),this._getOptionsFromAnimation(r))}:{id:r.id})}getManifest(){return this._dotLottieLoader.manifest}resize(){this._lottie&&!["loading"].includes(this._currentState)?this._lottie.resize():G("resize() Can't use whilst loading.")}stop(){this._lottie&&!["loading"].includes(this._currentState)?(this.clearCountTimer(),this._counter=0,this._setPlayerState(()=>({direction:this._getOption("direction")})),this._lottie.stop(),this.setCurrentState("stopped")):G("stop() Can't use whilst loading.")}pause(){this._lottie&&!["loading"].includes(this._currentState)?(this.clearCountTimer(),this._lottie.pause(),this.setCurrentState("paused")):G("pause() Can't use whilst loading.")}freeze(){this._lottie&&!["loading"].includes(this._currentState)?("frozen"!==this.currentState&&(this._stateBeforeFreeze=this.currentState),this._lottie.pause(),this.setCurrentState("frozen")):G("freeze() Can't use whilst loading.")}unfreeze(){this._lottie&&!["loading"].includes(this._currentState)?"playing"===this._stateBeforeFreeze?this.play():this.pause():G("unfreeze() Can't use whilst loading.")}destroy(){var t,e;null!=(t=this._container)&&t.__lottie&&(this._container.__lottie.destroy(),this._container.__lottie=null),this._audios.length&&(this._audios.forEach(r=>{r.unload()}),this._audios=[]),this.clearCountTimer(),typeof document<"u"&&document.removeEventListener("visibilitychange",()=>this._onVisibilityChange()),this._counter=0,null==(e=this._lottie)||e.destroy(),this._lottie=void 0}getAnimationInstance(){return this._lottie}static getLottieWebVersion(){return`${wn_dependencies_lottie_web}`}addEventListener(t,e){var r,a,h;this._listeners.has(t)||this._listeners.set(t,new Set),null==(r=this._listeners.get(t))||r.add(e);try{"complete"===t?null==(a=this._container)||a.addEventListener(t,e):null==(h=this._lottie)||h.addEventListener(t,e)}catch(d){Bt(`addEventListener ${d}`)}}getState(){var t,e,r,a,h,d,p;return{autoplay:null!=(e=null==(t=this._lottie)?void 0:t.autoplay)&&e,currentState:this._currentState,frame:this._frame,visibilityPercentage:this._visibilityPercentage,seeker:this._seeker,direction:null!=(a=null==(r=this._lottie)?void 0:r.playDirection)?a:1,hover:this._hover,loop:this._loop||!1,playMode:this._mode,speed:null!=(d=null==(h=this._lottie)?void 0:h.playSpeed)?d:1,background:this._background,intermission:this._intermission,defaultTheme:this._defaultTheme,currentAnimationId:this._currentAnimationId,activeStateId:null!=(p=this._activeStateId)?p:""}}_notify(){this.state.setState(this.getState())}get totalFrames(){var t;return(null==(t=this._lottie)?void 0:t.totalFrames)||0}get direction(){return this._lottie?this._lottie.playDirection:1}setDirection(t){this._requireValidDirection(t),this._setPlayerState(()=>({direction:t})),this._userPlaybackOptions.direction=t}get speed(){var t;return(null==(t=this._lottie)?void 0:t.playSpeed)||1}setSpeed(t){this._requireValidSpeed(t),this._setPlayerState(()=>({speed:t})),this._userPlaybackOptions.speed=t}get autoplay(){var t,e;return null!=(e=null==(t=this._lottie)?void 0:t.autoplay)&&e}setAutoplay(t){this._requireValidAutoplay(t),this._lottie&&!["loading"].includes(this._currentState)?(this._setPlayerState(()=>({autoplay:t})),this._userPlaybackOptions.autoplay=t):G("setAutoplay() Can't use whilst loading.")}toggleAutoplay(){this._lottie&&!["loading"].includes(this._currentState)?this.setAutoplay(!this._lottie.autoplay):G("toggleAutoplay() Can't use whilst loading.")}get defaultTheme(){return this._defaultTheme}setDefaultTheme(t){this._setPlayerState(()=>({defaultTheme:t})),this._userPlaybackOptions.defaultTheme=t,this._animation&&this.render()}get loop(){return this._loop}setLoop(t){this._requireValidLoop(t),this._setPlayerState(()=>({loop:t})),this._userPlaybackOptions.loop=t}toggleLoop(){this._lottie&&!["loading"].includes(this._currentState)?this.setLoop(!this._loop):G("toggleLoop() Can't use whilst loading.")}get background(){return this._background}setBackground(t){this._requireValidBackground(t),this._background=t,this._container&&(this._container.style.backgroundColor=t)}get _frame(){return this._lottie?"completed"===this.currentState?-1===this.direction?0:this._lottie.totalFrames:this._lottie.currentFrame:0}get _seeker(){return this._lottie?this._frame/this._lottie.totalFrames*100:0}revertToManifestValues(t){var e=this;return(0,M.Z)(function*(){var r;let a;a=Array.isArray(t)&&0!==t.length?t:["autoplay","defaultTheme","direction","hover","intermission","loop","playMode","speed","activeAnimationId"];let h=!1;if(a.includes("activeAnimationId")){let d=null==(r=e._dotLottieLoader.manifest)?void 0:r.activeAnimationId,p=e._getAnimationByIdOrIndex(d||0);e._activeAnimationId=d,yield e._setCurrentAnimation(p.id),h=!0}a.forEach(d=>{switch(d){case"autoplay":delete e._userPlaybackOptions.autoplay,e.setAutoplay(e._getOption("autoplay"));break;case"defaultTheme":delete e._userPlaybackOptions.defaultTheme,e.setDefaultTheme(e._getOption("defaultTheme"));break;case"direction":delete e._userPlaybackOptions.direction,e.setDirection(e._getOption("direction"));break;case"hover":delete e._userPlaybackOptions.hover,e.setHover(e._getOption("hover"));break;case"intermission":delete e._userPlaybackOptions.intermission,e.setIntermission(e._getOption("intermission"));break;case"loop":delete e._userPlaybackOptions.loop,e.setLoop(e._getOption("loop"));break;case"playMode":delete e._userPlaybackOptions.playMode,e.setMode(e._getOption("playMode")),e.setDirection(e._getOption("direction"));break;case"speed":delete e._userPlaybackOptions.speed,e.setSpeed(e._getOption("speed"))}}),h&&e.render()})()}removeEventListener(t,e){var r,a,h;try{"complete"===t?null==(r=this._container)||r.removeEventListener(t,e):null==(a=this._lottie)||a.removeEventListener(t,e),null==(h=this._listeners.get(t))||h.delete(e)}catch(d){Bt("removeEventListener",d)}}_handleAnimationComplete(){var t;"number"==typeof this._loop&&this.stop(),this.goToAndStop(-1===this.direction?0:this.totalFrames,!0),this._counter=0,this.clearCountTimer(),this.setCurrentState("completed"),null==(t=this._container)||t.dispatchEvent(new Event("complete"))}addEventListeners(){var t;if(this._lottie&&!["loading"].includes(this._currentState)){this._lottie.addEventListener("enterFrame",()=>{var e;this._lottie?(0===Math.floor(this._lottie.currentFrame)&&-1===this.direction&&(null==(e=this._container)||e.dispatchEvent(new Event("complete")),this.loop||this.setCurrentState("completed")),this._notify()):G("enterFrame event : Lottie is undefined.")}),this._lottie.addEventListener("loopComplete",()=>{var e;if(!this._lottie)return void G("loopComplete event : Lottie is undefined.");null==(e=this._container)||e.dispatchEvent(new Event("loopComplete")),this.intermission>0&&this.pause();let r=this._lottie.playDirection;if("number"==typeof this._loop&&this._loop>0&&(this._counter+="bounce"===this._mode?.5:1,this._counter>=this._loop))return void this._handleAnimationComplete();"bounce"===this._mode&&"number"==typeof r&&(r=-1*Number(r));let a=-1===r?this._lottie.totalFrames-1:0;this.intermission?(this.goToAndPlay(a,!0),this.pause(),this._counterInterval=window.setTimeout(()=>{this._lottie&&(this._setPlayerState(()=>({direction:r})),this.goToAndPlay(a,!0))},this._intermission)):(this._setPlayerState(()=>({direction:r})),this.goToAndPlay(-1===r?this.totalFrames-1:0,!0))}),this._lottie.addEventListener("complete",()=>{if(this._lottie&&!1===this._loop&&"bounce"===this._mode){if(this._counter+=.5,this._counter>=1)return void this._handleAnimationComplete();this._counterInterval=window.setTimeout(()=>{if(!this._lottie)return;let e=this._lottie.playDirection;"bounce"===this._mode&&"number"==typeof e&&(e=-1*Number(e));let r=-1===e?this.totalFrames-1:0;this._setPlayerState(()=>({direction:e})),this.goToAndPlay(r,!0)},this._intermission)}else this._handleAnimationComplete()});for(let[e,r]of this._listeners)if("complete"===e)for(let a of r)null==(t=this._container)||t.addEventListener(e,a);else for(let a of r)this._lottie.addEventListener(e,a)}else G("addEventListeners() Can't use whilst loading.")}_setCurrentAnimation(t){var e=this;return(0,M.Z)(function*(){e._currentState="loading";let r=yield e._dotLottieLoader.getAnimation(t);e._currentAnimationId=t,e._animation=r,e._currentState="ready"})()}_getAudioFactory(){var t=this;return(0,M.Z)(function*(){if(t._animation&&function n(i){let t=i.assets;return!!t&&t.some(e=>Se(e))}(t._animation)){let{DotLottieAudio:e}=yield _.e(588).then(_.bind(_,6588));return r=>{let a=new e({src:[r]});return t._audios.push(a),a}}return null})()}render(t){var e=this;return(0,M.Z)(function*(){var r,a,h,d,p,m,g,v,f,C,A,L,w,O,P,V,R,yt;if(null!=t&&t.id)yield e._setCurrentAnimation(t.id);else if(!e._animation)throw $("no animation selected");let at=null!=(r=Ot.loop)&&r,_t=null!=(a=Ot.autoplay)&&a,ut=null!=(h=Ot.playMode)?h:"normal",q=null!=(d=Ot.intermission)?d:0,ct=null!=(p=Ot.hover)&&p,Nt=null!=(m=Ot.direction)?m:1,dt=null!=(g=Ot.speed)?g:1,bt=null!=(v=Ot.defaultTheme)?v:"";at=null!=(f=t?.loop)?f:e._getOption("loop"),_t=null!=(C=t?.autoplay)?C:e._getOption("autoplay"),ut=null!=(A=t?.playMode)?A:e._getOption("playMode"),q=null!=(L=t?.intermission)?L:e._getOption("intermission"),ct=null!=(w=t?.hover)?w:e._getOption("hover"),Nt=null!=(O=t?.direction)?O:e._getOption("direction"),dt=null!=(P=t?.speed)?P:e._getOption("speed"),bt=null!=(V=t?.defaultTheme)?V:e._getOption("defaultTheme");let Ct={...e._animationConfig,autoplay:!ct&&_t,loop:"number"==typeof at||at,renderer:e._worker?"svg":null!=(R=e._animationConfig.renderer)?R:"svg"},[Tt,pt,Rt]=yield Promise.all([e._dotLottieLoader.getTheme(bt),e._getLottiePlayerInstance(),e._getAudioFactory()]);e._animation=Tt&&e._animation?yield function S(i,t){return k.apply(this,arguments)}(e._animation,Tt):yield e._dotLottieLoader.getAnimation(null!=(yt=e._currentAnimationId)?yt:""),!e._activeStateId||e._inInteractiveMode?(e.destroy(),e._setPlayerState(()=>({defaultTheme:bt,playMode:ut,intermission:q,hover:ct,loop:at})),e._lottie=pt.loadAnimation(Rt?{...Ct,container:e._container,animationData:e._animation,audioFactory:Rt}:{...Ct,container:e._container,animationData:e._animation}),typeof e._lottie.resetSegments>"u"&&(e._lottie.resetSegments=()=>{var Dt;null==(Dt=e._lottie)||Dt.playSegments([0,e._lottie.totalFrames],!0)}),e.addEventListeners(),e._container&&(e._container.__lottie=e._lottie),e._setPlayerState(()=>({direction:Nt,speed:dt})),_t&&!ct&&(!1===at&&-1===Nt?e.play():e.setCurrentState("playing")),e._updateTestData()):e.enterInteractiveMode(e._activeStateId)})()}_getLottiePlayerInstance(){var t=this;return(0,M.Z)(function*(){var e;let a,r=null!=(e=t._animationConfig.renderer)?e:"svg";if(t._worker)return"svg"!==r&&G("Worker is only supported with svg renderer. Change or remove renderer prop to get rid of this warning."),a=yield _.e(144).then(_.bind(_,2144)),a.default;switch(r){case"svg":a=t._light?yield _.e(952).then(_.bind(_,952)):yield _.e(791).then(_.bind(_,7791));break;case"canvas":a=t._light?yield _.e(209).then(_.bind(_,2209)):yield _.e(65).then(_.bind(_,65));break;case"html":a=t._light?yield _.e(91).then(_.bind(_,5091)):yield _.e(516).then(_.bind(_,4516));break;default:throw new Error(`Invalid renderer: ${r}`)}return a.default})()}_getActiveAnimationId(){var t,e,r,a;let h=this._dotLottieLoader.manifest;return null!=(a=null!=(r=null!=(t=this._activeAnimationId)?t:h?.activeAnimationId)?r:null==(e=h?.animations[0])?void 0:e.id)?a:void 0}load(t){var e=this;return(0,M.Z)(function*(){if("loading"!==e._currentState)try{if(e.setCurrentState("loading"),"string"==typeof e._src)if(function s(i){try{return o(JSON.parse(i))}catch{return!1}}(e._src)){let a=JSON.parse(e._src);e._dotLottieLoader.loadFromLottieJSON(a)}else{let a=new URL(e._src,window.location.href);yield e._dotLottieLoader.loadFromUrl(a.toString())}else{if("object"!=typeof e._src||!o(e._src))throw $("Invalid src provided");e._dotLottieLoader.loadFromLottieJSON(e._src)}if(!e._dotLottieLoader.manifest)throw $("No manifest found");let r=e._getActiveAnimationId();if(!r)throw $("No active animation found");yield e._setCurrentAnimation(r),yield e.render(t)}catch(r){e.setCurrentState("error"),r instanceof Error&&Bt(`Error loading animation: ${r.message}`)}else G("Loading in progress..")})()}setErrorState(t){this.setCurrentState("error"),Bt(t)}_requireValidDirection(t){if(-1!==t&&1!==t)throw $("Direction can only be -1 (backwards) or 1 (forwards)")}_requireValidIntermission(t){if(t<0||!Number.isInteger(t))throw $("intermission must be a positive number")}_requireValidLoop(t){if("number"==typeof t&&(!Number.isInteger(t)||t<0))throw $("loop must be a positive number or boolean")}_requireValidSpeed(t){if("number"!=typeof t)throw $("speed must be a number")}_requireValidBackground(t){if("string"!=typeof t)throw $("background must be a string")}_requireValidAutoplay(t){if("boolean"!=typeof t)throw $("autoplay must be a boolean")}_requireValidPlaybackOptions(t){t.direction&&this._requireValidDirection(t.direction),t.intermission&&this._requireValidIntermission(t.intermission),t.loop&&this._requireValidLoop(t.loop),t.speed&&this._requireValidSpeed(t.speed)}}},1053:(Xe,zt,_)=>{_.d(zt,{a:()=>xt});var M=Object.defineProperty,x=Object.getOwnPropertyDescriptor,xt=(mt,N,B,K)=>{for(var D,Q=K>1?void 0:K?x(N,B):N,lt=mt.length-1;lt>=0;lt--)(D=mt[lt])&&(Q=(K?D(N,B,Q):D(Q))||Q);return K&&Q&&M(N,B,Q),Q}},5861:(Xe,zt,_)=>{function M(xt,mt,N,B,K,Q,lt){try{var D=xt[Q](lt),z=D.value}catch(Lt){return void N(Lt)}D.done?mt(z):Promise.resolve(z).then(B,K)}function x(xt){return function(){var mt=this,N=arguments;return new Promise(function(B,K){var Q=xt.apply(mt,N);function lt(z){M(Q,B,K,lt,D,"next",z)}function D(z){M(Q,B,K,lt,D,"throw",z)}lt(void 0)})}}_.d(zt,{Z:()=>x})}}]);