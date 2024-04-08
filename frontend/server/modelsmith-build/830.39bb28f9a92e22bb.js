"use strict";(self.webpackChunkmodelsmith=self.webpackChunkmodelsmith||[]).push([[830],{2830:(J,h,e)=>{e.r(h),e.d(h,{MachineUnlearningModule:()=>R});var r,v=e(6814),M=e(4245),p=e(3328),g=e(1668),u=e(1543),s=e(4190),U=e(7582),d=e(8791),C=e(4279),y=e(9547),l=e(7820),f=e(127),n=e(5879),m=e(6223),A=e(8471),T=e(2296);const S=["panelParameters"];let c=((r=class{constructor(t,i,o){this.fb=t,this.scriptFacadeService=i,this.router=o,this.AlgorithmType=l.Bd,this.MachineUnlearningAlgorithmsEnum=l.rj,this.isScriptActive=!1}ngOnInit(){this.initForm(),this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.scriptStatus$.pipe((0,d.t)(this)).subscribe(t=>{this.isScriptActive=(0,f.A)(t),(0,f.A)(t)?this.form.disable():this.form.enable()})}initForm(){this.form=this.fb.group({algorithm:this.fb.group({alg:[]})}),setTimeout(()=>{this.form.get("algorithm.alg")?.setValue(l.rj.MU)},0)}submit(){if(this.isScriptActive)return;const{algorithm:t,model:i}=this.form.getRawValue(),{model:o}=i,F={...t,params:{...this.panelParametersComponent.parametersFormatted,arch:o}};this.scriptFacadeService.dispatch(C.a.callScript({configs:F}))}goToChartPage(){this.router.navigate([y.Z.RUNNING.ROOT])}}).\u0275fac=function(t){return new(t||r)(n.Y36(m.qu),n.Y36(A.O),n.Y36(s.F0))},r.\u0275cmp=n.Xpm({type:r,selectors:[["ms-machine-unlearning"]],viewQuery:function(t,i){if(1&t&&n.Gf(S,5),2&t){let o;n.iGM(o=n.CRH())&&(i.panelParametersComponent=o.first)}},decls:15,vars:5,consts:[[1,"heading-primary-title","title"],[1,"page-wrapper",3,"formGroup"],[1,"left"],[3,"formGroup"],["controlKey","model",3,"algorithmType"],["controlKey","params",3,"algorithm"],["panelParameters",""],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","primary",1,"ml-2",3,"click"],[1,"right"]],template:function(t,i){1&t&&(n.TgZ(0,"p",0),n._uU(1,"Machine Unlearning"),n.qZA(),n.TgZ(2,"div",1)(3,"div",2),n.ynx(4,3),n._UZ(5,"ms-panel-model",4)(6,"ms-panel-parameters",5,6),n.BQk(),n.TgZ(8,"div")(9,"button",7),n.NdJ("click",function(){return i.submit()}),n._uU(10," Run "),n.qZA(),n.TgZ(11,"button",8),n.NdJ("click",function(){return i.goToChartPage()}),n._uU(12,"View Chart"),n.qZA()()(),n.TgZ(13,"div",9),n._UZ(14,"ms-terminal"),n.qZA()()),2&t&&(n.xp6(2),n.Q6J("formGroup",i.form),n.xp6(2),n.Q6J("formGroup",i.form),n.xp6(1),n.Q6J("algorithmType",i.AlgorithmType.MACHINE_UNLEARNING),n.xp6(1),n.Q6J("algorithm",i.MachineUnlearningAlgorithmsEnum.MU),n.xp6(3),n.Q6J("disabled",i.isScriptActive||i.form.invalid))},dependencies:[T.lW,m.JL,m.sg,u.d,g.w,p.d],styles:[".title[_ngcontent-%COMP%]{margin-bottom:13px}"]}),r);c=(0,U.gn)([(0,d.c)()],c);const N=[{path:"",component:c}];let Z=(()=>{var a;class t{}return(a=t).\u0275fac=function(o){return new(o||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[s.Bz.forChild(N),s.Bz]}),t})(),R=(()=>{var a;class t{}return(a=t).\u0275fac=function(o){return new(o||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[v.ez,M.m,Z,u.d,g.w,p.d]}),t})()}}]);