import{e as R}from"./chunk-XX6ZYDLH.js";var r=function(N){return N.RUNNING="running",N.NOT_RUNNING="not_running",N.STOPPING="stopping",N.ERROR="error",N}(r||{});function M(N){return N?N===r.RUNNING||N===r.STOPPING:!1}var e=function(N){return N.QUANTIZATION="quantization",N.PRUNING="pruning",N.MACHINE_UNLEARNING="machine_unlearning",N.AWQ="awq",N.MULTIFLOW="multiflow",N.TRAIN="train",N}(e||{}),_=Object.entries(e).map(([N,c])=>({key:c,value:R(N)})),n=function(N){return N.BPTQ="BPTQ",N.BRECQ="BRECQ",N.MINMAXPTQ="MINMAXPTQ",N}(n||{}),t=function(N){return N.MULTIFLOW_PRUNE="MULTIFLOW_PRUNE",N}(t||{}),T=function(N){return N.IPG="IPG",N.IPM="IPM",N.IPR="IPR",N.IMP="IMP",N.OMP="OMP",N.IPS="IPS",N.IPSY="IPSY",N.IPMB="IPMB",N}(T||{}),A=function(N){return N.MU="MU",N}(A||{}),U=function(N){return N.AWQ_QUANTIZATION="AWQ_Q",N}(U||{}),I=function(N){return N.QUANTIZATION_TRAIN="Q_TRAIN",N.PRUNING_TRAIN="P_TRAIN",N.MACHINE_UNLEARNING_TRAIN="MU_TRAIN",N}(I||{}),f={[e.MACHINE_UNLEARNING]:I.MACHINE_UNLEARNING_TRAIN,[e.PRUNING]:I.PRUNING_TRAIN,[e.QUANTIZATION]:I.QUANTIZATION_TRAIN};function o(N){return Object.values(T).includes(N)?e.PRUNING:Object.values(n).includes(N)?e.QUANTIZATION:Object.values(A).includes(N)?e.MACHINE_UNLEARNING:Object.values(U).includes(N)?e.AWQ:Object.values(I).includes(N)?e.TRAIN:Object.values(t).includes(N)?e.MULTIFLOW:null}export{r as a,M as b,e as c,n as d,t as e,T as f,A as g,U as h,I as i,f as j,o as k};
