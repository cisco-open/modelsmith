import{a as T,b as ct,c as Jt,d as Ft,e as M,f as C,h as Ht,i as Z}from"./chunk-EPEASEK2.js";import{a as Vt}from"./chunk-FE37LKGS.js";import{a as Be,c as te,e as q,f as pt,g as ee,i as je,j as ie}from"./chunk-DKFHDFWS.js";import{c as f}from"./chunk-CZWWHHM6.js";import{b as X,e as lt,i as He,k as ze,m as Ge}from"./chunk-22GQ5QYP.js";import{b as Fe}from"./chunk-LTSEX5PY.js";import{$a as Ee,A as O,Bc as Dt,Da as Pe,Ea as we,Fa as Le,Ga as Tt,Gd as rt,Ha as m,Ia as Te,J as wt,Ja as Mt,Ka as qt,Kd as Ue,La as Kt,Ma as Wt,N as E,O as Lt,Q as Se,Qa as Me,Sa as Et,T as it,Ta as $t,Tb as Qt,Td as Ut,U as nt,Va as It,_ as xe,ab as at,bb as $e,cb as Ie,da as h,de as Ve,ea as S,g as U,gb as Oe,ha as Ae,hc as Re,ib as De,jb as ke,ka as D,lc as Ne,ld as Y,ma as d,md as st,od as Ct,q as N,qa as p,qd as kt,ra as c,sa as g,sd as Rt,ta as W,u as I,ua as Q,ud as Nt,wa as ot,wc as Ot,wd as ft,xa as j,ya as V}from"./chunk-DXRB2X5O.js";import{a as y,b,f as yt}from"./chunk-B2MDGYRE.js";var zt=window,me=zt.ShadowRoot&&(zt.ShadyCSS===void 0||zt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ue=Symbol(),Ye=new WeakMap,oi=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(me&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ye.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ye.set(e,t))}return t}toString(){return this.cssText}},Pi=t=>new oi(typeof t=="string"?t:t+"",void 0,ue),wi=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((n,o,a)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[a+1],t[0]);return new oi(i,t,ue)},Li=(t,e)=>{me?t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet):e.forEach(i=>{let n=document.createElement("style"),o=zt.litNonce;o!==void 0&&n.setAttribute("nonce",o),n.textContent=i.cssText,t.appendChild(n)})},Xe=me?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(let n of e.cssRules)i+=n.cssText;return Pi(i)})(t):t,ne,Gt=window,Ze=Gt.trustedTypes,Ti=Ze?Ze.emptyScript:"",qe=Gt.reactiveElementPolyfillSupport,ce={toAttribute(t,e){switch(e){case Boolean:t=t?Ti:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},ai=(t,e)=>e!==t&&(e==e||t==t),oe={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:ai},pe="finalized",ht=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,i)=>{let n=this._$Ep(i,e);n!==void 0&&(this._$Ev.set(n,i),t.push(n))}),t}static createProperty(t,e=oe){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let i=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){let o=this[t];this[e]=n,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||oe}static finalize(){if(this.hasOwnProperty(pe))return!1;this[pe]=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let n of i)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let n of i)e.unshift(Xe(n))}else t!==void 0&&e.push(Xe(t));return e}static _$Ep(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Li(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=oe){var n;let o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){let a=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:ce).toAttribute(e,i.type);this._$El=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(t,e){var i;let n=this.constructor,o=n._$Ev.get(t);if(o!==void 0&&this._$El!==o){let a=n.getPropertyOptions(o),r=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:ce;this._$El=o,this[o]=r.fromAttribute(e,a.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ai)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}_$Ej(){return yt(this,null,function*(){this.isUpdatePending=!0;try{yield this._$E_}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&(yield t),!this.isUpdatePending})}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let e=!1,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(i)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};ht[pe]=!0,ht.elementProperties=new Map,ht.elementStyles=[],ht.shadowRootOptions={mode:"open"},qe?.({ReactiveElement:ht}),((ne=Gt.reactiveElementVersions)!==null&&ne!==void 0?ne:Gt.reactiveElementVersions=[]).push("1.6.3");var ae,Bt=window,mt=Bt.trustedTypes,Ke=mt?mt.createPolicy("lit-html",{createHTML:t=>t}):void 0,he="$lit$",K=`lit$${(Math.random()+"").slice(9)}$`,si="?"+K,Mi=`<${si}>`,et=document,bt=()=>et.createComment(""),St=t=>t===null||typeof t!="object"&&typeof t!="function",ri=Array.isArray,Ei=t=>ri(t)||typeof t?.[Symbol.iterator]=="function",se=`[ 	
\f\r]`,_t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,We=/-->/g,Qe=/>/g,J=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,ti=/"/g,li=/^(?:script|style|textarea|title)$/i,$i=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),u=$i(1),ut=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),ei=new WeakMap,tt=et.createTreeWalker(et,129,null,!1);function ci(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ke!==void 0?Ke.createHTML(e):e}var Ii=(t,e)=>{let i=t.length-1,n=[],o,a=e===2?"<svg>":"",r=_t;for(let s=0;s<i;s++){let l=t[s],$,w,v=-1,L=0;for(;L<l.length&&(r.lastIndex=L,w=r.exec(l),w!==null);)L=r.lastIndex,r===_t?w[1]==="!--"?r=We:w[1]!==void 0?r=Qe:w[2]!==void 0?(li.test(w[2])&&(o=RegExp("</"+w[2],"g")),r=J):w[3]!==void 0&&(r=J):r===J?w[0]===">"?(r=o??_t,v=-1):w[1]===void 0?v=-2:(v=r.lastIndex-w[2].length,$=w[1],r=w[3]===void 0?J:w[3]==='"'?ti:Je):r===ti||r===Je?r=J:r===We||r===Qe?r=_t:(r=J,o=void 0);let R=r===J&&t[s+1].startsWith("/>")?" ":"";a+=r===_t?l+Mi:v>=0?(n.push($),l.slice(0,v)+he+l.slice(v)+K+R):l+K+(v===-2?(n.push(void 0),s):R)}return[ci(t,a+(t[i]||"<?>")+(e===2?"</svg>":"")),n]},de=class pi{constructor({strings:e,_$litType$:i},n){let o;this.parts=[];let a=0,r=0,s=e.length-1,l=this.parts,[$,w]=Ii(e,i);if(this.el=pi.createElement($,n),tt.currentNode=this.el.content,i===2){let v=this.el.content,L=v.firstChild;L.remove(),v.append(...L.childNodes)}for(;(o=tt.nextNode())!==null&&l.length<s;){if(o.nodeType===1){if(o.hasAttributes()){let v=[];for(let L of o.getAttributeNames())if(L.endsWith(he)||L.startsWith(K)){let R=w[r++];if(v.push(L),R!==void 0){let Ai=o.getAttribute(R.toLowerCase()+he).split(K),Pt=/([.?@])?(.*)/.exec(R);l.push({type:1,index:a,name:Pt[2],strings:Ai,ctor:Pt[1]==="."?Di:Pt[1]==="?"?Ri:Pt[1]==="@"?Ni:jt})}else l.push({type:6,index:a})}for(let L of v)o.removeAttribute(L)}if(li.test(o.tagName)){let v=o.textContent.split(K),L=v.length-1;if(L>0){o.textContent=mt?mt.emptyScript:"";for(let R=0;R<L;R++)o.append(v[R],bt()),tt.nextNode(),l.push({type:2,index:++a});o.append(v[L],bt())}}}else if(o.nodeType===8)if(o.data===si)l.push({type:2,index:a});else{let v=-1;for(;(v=o.data.indexOf(K,v+1))!==-1;)l.push({type:7,index:a}),v+=K.length-1}a++}}static createElement(e,i){let n=et.createElement("template");return n.innerHTML=e,n}};function gt(t,e,i=t,n){var o,a,r,s;if(e===ut)return e;let l=n!==void 0?(o=i._$Co)===null||o===void 0?void 0:o[n]:i._$Cl,$=St(e)?void 0:e._$litDirective$;return l?.constructor!==$&&((a=l?._$AO)===null||a===void 0||a.call(l,!1),$===void 0?l=void 0:(l=new $(t),l._$AT(t,i,n)),n!==void 0?((r=(s=i)._$Co)!==null&&r!==void 0?r:s._$Co=[])[n]=l:i._$Cl=l),l!==void 0&&(e=gt(t,l._$AS(t,e.values),l,n)),e}var Oi=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;let{el:{content:i},parts:n}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:et).importNode(i,!0);tt.currentNode=o;let a=tt.nextNode(),r=0,s=0,l=n[0];for(;l!==void 0;){if(r===l.index){let $;l.type===2?$=new ge(a,a.nextSibling,this,t):l.type===1?$=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&($=new Ui(a,this,t)),this._$AV.push($),l=n[++s]}r!==l?.index&&(a=tt.nextNode(),r++)}return tt.currentNode=et,o}v(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ge=class hi{constructor(e,i,n,o){var a;this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=n,this.options=o,this._$Cp=(a=o?.isConnected)===null||a===void 0||a}get _$AU(){var e,i;return(i=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&i!==void 0?i:this._$Cp}get parentNode(){let e=this._$AA.parentNode,i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=gt(this,e,i),St(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==ut&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ei(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==x&&St(this._$AH)?this._$AA.nextSibling.data=e:this.$(et.createTextNode(e)),this._$AH=e}g(e){var i;let{values:n,_$litType$:o}=e,a=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=de.createElement(ci(o.h,o.h[0]),this.options)),o);if(((i=this._$AH)===null||i===void 0?void 0:i._$AD)===a)this._$AH.v(n);else{let r=new Oi(a,this),s=r.u(this.options);r.v(n),this.$(s),this._$AH=r}}_$AC(e){let i=ei.get(e.strings);return i===void 0&&ei.set(e.strings,i=new de(e)),i}T(e){ri(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,n,o=0;for(let a of e)o===i.length?i.push(n=new hi(this.k(bt()),this.k(bt()),this,this.options)):n=i[o],n._$AI(a),o++;o<i.length&&(this._$AR(n&&n._$AB.nextSibling,o),i.length=o)}_$AR(e=this._$AA.nextSibling,i){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,i);e&&e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){var i;this._$AM===void 0&&(this._$Cp=e,(i=this._$AP)===null||i===void 0||i.call(this,e))}},jt=class{constructor(t,e,i,n,o){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){let o=this.strings,a=!1;if(o===void 0)t=gt(this,t,e,0),a=!St(t)||t!==this._$AH&&t!==ut,a&&(this._$AH=t);else{let r=t,s,l;for(t=o[0],s=0;s<o.length-1;s++)l=gt(this,r[i+s],e,s),l===ut&&(l=this._$AH[s]),a||(a=!St(l)||l!==this._$AH[s]),l===x?t=x:t!==x&&(t+=(l??"")+o[s+1]),this._$AH[s]=l}a&&!n&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Di=class extends jt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}},ki=mt?mt.emptyScript:"",Ri=class extends jt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==x?this.element.setAttribute(this.name,ki):this.element.removeAttribute(this.name)}},Ni=class extends jt{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=gt(this,t,e,0))!==null&&i!==void 0?i:x)===ut)return;let n=this._$AH,o=t===x&&n!==x||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,a=t!==x&&(n===x||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},Ui=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){gt(this,t)}},ii=Bt.litHtmlPolyfillSupport;ii?.(de,ge),((ae=Bt.litHtmlVersions)!==null&&ae!==void 0?ae:Bt.litHtmlVersions=[]).push("2.8.0");var Vi=(t,e,i)=>{var n,o;let a=(n=i?.renderBefore)!==null&&n!==void 0?n:e,r=a._$litPart$;if(r===void 0){let s=(o=i?.renderBefore)!==null&&o!==void 0?o:null;a._$litPart$=r=new ge(e.insertBefore(bt(),s),s,void 0,i??{})}return r._$AI(t),r},re,le,dt=class extends ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;let i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return ut}};dt.finalized=!0,dt._$litElement$=!0,(re=globalThis.litElementHydrateSupport)===null||re===void 0||re.call(globalThis,{LitElement:dt});var ni=globalThis.litElementPolyfillSupport;ni?.({LitElement:dt});((le=globalThis.litElementVersions)!==null&&le!==void 0?le:globalThis.litElementVersions=[]).push("3.3.3");var di=wi`
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
`;var Fi=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?b(y({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},Hi=(t,e,i)=>{e.constructor.createProperty(i,t)};function A(t){return(e,i)=>i!==void 0?Hi(t,e,i):Fi(t,e)}function zi(t){return A(b(y({},t),{state:!0}))}var Gi=({finisher:t,descriptor:e})=>(i,n)=>{var o;if(n===void 0){let a=(o=i.originalKey)!==null&&o!==void 0?o:i.key,r=e!=null?{kind:"method",placement:"prototype",key:a,descriptor:e(i.key)}:b(y({},i),{key:a});return t!=null&&(r.finisher=function(s){t(s,a)}),r}{let a=i.constructor;e!==void 0&&Object.defineProperty(i,n,e(n)),t?.(a,n)}};function Bi(t,e){return Gi({descriptor:i=>{let n={get(){var o,a;return(a=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(t))!==null&&a!==void 0?a:null},enumerable:!0,configurable:!0};if(e){let o=typeof i=="symbol"?Symbol():"__"+i;n.get=function(){var a,r;return this[o]===void 0&&(this[o]=(r=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(t))!==null&&r!==void 0?r:null),this[o]}}return n}})}var ve;((ve=window.HTMLSlotElement)===null||ve===void 0?void 0:ve.prototype.assignedElements)!=null;var ji={name:"@dotlottie/player-component",version:"2.7.8",description:"dotLottie animation player web component.",repository:"https://github.com/dotlottie/player-component.git",homepage:"https://dotlottie.com/players",bugs:"https://github.com/dotlottie/player-component/issues",author:"Jawish Hameed <jawish@lottiefiles.com>",license:"MIT",main:"dist/dotlottie-player.js",module:"dist/dotlottie-player.mjs",types:"dist/dotlottie-player.d.ts",files:["dist"],keywords:["dotlottie","animation","web component","component","lit-element","player"],scripts:{build:"tsup","cypress:open":"cypress open --component",dev:"tsup --watch",lint:"eslint .","lint:fix":"eslint --fix",test:"cypress run --component","type-check":"tsc --noEmit"},dependencies:{"@dotlottie/common":"workspace:*",lit:"^2.7.5"},devDependencies:{"@vitejs/plugin-legacy":"^4.1.0","axe-core":"^4.7.2",cypress:"^12.11.0","cypress-axe":"^1.4.0","cypress-ct-lit":"^0.3.2","lottie-web":"^5.12.2",terser:"^5.19.0",tsup:"^7.2.0",typescript:"^4.7.4",vite:"^4.3.9"},publishConfig:{access:"public"},browserslist:["> 3%"]},mi="dotlottie-player",_=class extends dt{defaultTheme="";container;playMode=ee.Normal;autoplay=!1;background="transparent";controls=!1;direction=1;hover=!1;loop;renderer="svg";speed=1;src;intermission=0;activeAnimationId=null;light=!1;worker=!1;activeStateId;_seeker=0;_dotLottieCommonPlayer;_io;_loop;_renderer="svg";_unsubscribeListeners;_hasMultipleAnimations=!1;_hasMultipleThemes=!1;_hasMultipleStates=!1;_popoverIsOpen=!1;_animationsTabIsOpen=!1;_statesTabIsOpen=!1;_styleTabIsOpen=!1;_themesForCurrentAnimation=[];_statesForCurrentAnimation=[];_parseLoop(t){let e=parseInt(t,10);return Number.isInteger(e)&&e>0?(this._loop=e,e):typeof t=="string"&&["true","false"].includes(t)?(this._loop=t==="true",this._loop):(te("loop must be a positive integer or a boolean"),!1)}_handleSeekChange(t){let e=t.currentTarget;try{let i=parseInt(e.value,10);if(!this._dotLottieCommonPlayer)return;let n=i/100*this._dotLottieCommonPlayer.totalFrames;this.seek(n)}catch{throw Be("Error while seeking animation")}}_initListeners(){let t=this._dotLottieCommonPlayer;if(t===void 0){te("player not initialized - cannot add event listeners","dotlottie-player-component");return}this._unsubscribeListeners=t.state.subscribe((e,i)=>{this._seeker=e.seeker,this.requestUpdate(),i.currentState!==e.currentState&&this.dispatchEvent(new CustomEvent(e.currentState)),this.dispatchEvent(new CustomEvent(q.Frame,{detail:{frame:e.frame,seeker:e.seeker}})),this.dispatchEvent(new CustomEvent(q.VisibilityChange,{detail:{visibilityPercentage:e.visibilityPercentage}}))}),t.addEventListener("complete",()=>{this.dispatchEvent(new CustomEvent(q.Complete))}),t.addEventListener("loopComplete",()=>{this.dispatchEvent(new CustomEvent(q.LoopComplete))}),t.addEventListener("DOMLoaded",()=>{let e=this.getManifest();e&&e.themes&&(this._themesForCurrentAnimation=e.themes.filter(i=>i.animations.includes(this.getCurrentAnimationId()||""))),e&&e.states&&(this._hasMultipleStates=e.states.length>0,this._statesForCurrentAnimation=[],e.states.forEach(i=>{this._statesForCurrentAnimation.push(i)})),this.dispatchEvent(new CustomEvent(q.Ready))}),t.addEventListener("data_ready",()=>{this.dispatchEvent(new CustomEvent(q.DataReady))}),t.addEventListener("data_failed",()=>{this.dispatchEvent(new CustomEvent(q.DataFail))}),window&&window.addEventListener("click",e=>this._clickOutListener(e))}load(t,e,i){return yt(this,null,function*(){if(!this.shadowRoot)return;this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.destroy(),this._dotLottieCommonPlayer=new ie(t,this.container,{rendererSettings:e??{scaleMode:"noScale",clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0},hover:this.hasAttribute("hover")?this.hover:void 0,renderer:this.hasAttribute("renderer")?this._renderer:void 0,loop:this.hasAttribute("loop")?this._loop:void 0,direction:this.hasAttribute("direction")?this.direction===1?1:-1:void 0,speed:this.hasAttribute("speed")?this.speed:void 0,intermission:this.hasAttribute("intermission")?Number(this.intermission):void 0,playMode:this.hasAttribute("playMode")?this.playMode:void 0,autoplay:this.hasAttribute("autoplay")?this.autoplay:void 0,activeAnimationId:this.hasAttribute("activeAnimationId")?this.activeAnimationId:void 0,defaultTheme:this.hasAttribute("defaultTheme")?this.defaultTheme:void 0,light:this.light,worker:this.worker,activeStateId:this.hasAttribute("activeStateId")?this.activeStateId:void 0}),yield this._dotLottieCommonPlayer.load(i);let n=this.getManifest();this._hasMultipleAnimations=this.animationCount()>1,n&&(n.themes&&(this._themesForCurrentAnimation=n.themes.filter(o=>o.animations.includes(this.getCurrentAnimationId()||"")),this._hasMultipleThemes=n.themes.length>0),n.states&&(this._hasMultipleStates=n.states.length>0,this._statesForCurrentAnimation=[],n.states.forEach(o=>{this._statesForCurrentAnimation.push(o)}))),this._initListeners()})}getCurrentAnimationId(){var t;return(t=this._dotLottieCommonPlayer)==null?void 0:t.currentAnimationId}animationCount(){var t;return this._dotLottieCommonPlayer&&((t=this._dotLottieCommonPlayer.getManifest())==null?void 0:t.animations.length)||0}animations(){if(!this._dotLottieCommonPlayer)return[];let t=this._dotLottieCommonPlayer.getManifest();return t?.animations.map(e=>e.id)||[]}currentAnimation(){return!this._dotLottieCommonPlayer||!this._dotLottieCommonPlayer.currentAnimationId?"":this._dotLottieCommonPlayer.currentAnimationId}getState(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.getState():je}getManifest(){var t;return(t=this._dotLottieCommonPlayer)==null?void 0:t.getManifest()}getLottie(){var t;return(t=this._dotLottieCommonPlayer)==null?void 0:t.getAnimationInstance()}getVersions(){return{lottieWebVersion:ie.getLottieWebVersion(),dotLottiePlayerVersion:`${ji.version}`}}previous(t){var e;(e=this._dotLottieCommonPlayer)==null||e.previous(t)}next(t){var e;(e=this._dotLottieCommonPlayer)==null||e.next(t)}reset(){var t;(t=this._dotLottieCommonPlayer)==null||t.reset()}play(t,e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.play(t,e)}pause(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.pause()}stop(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stop()}playOnShow(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnShow(t)}stopPlayOnShow(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnShow()}playOnScroll(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnScroll(t)}stopPlayOnScroll(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnScroll()}seek(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.seek(t)}snapshot(t=!0){if(!this.shadowRoot)return"";let e=this.shadowRoot.querySelector(".animation svg"),i=new XMLSerializer().serializeToString(e);if(t){let n=document.createElement("a");n.href=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(i)}`,n.download=`download_${this._seeker}.svg`,document.body.appendChild(n),n.click(),document.body.removeChild(n)}return i}setTheme(t){var e;(e=this._dotLottieCommonPlayer)==null||e.setDefaultTheme(t)}themes(){var t;if(!this._dotLottieCommonPlayer)return[];let e=this._dotLottieCommonPlayer.getManifest();return((t=e?.themes)==null?void 0:t.map(i=>i.id))||[]}getDefaultTheme(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.defaultTheme:""}getActiveStateMachine(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.activeStateId:""}_freeze(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.freeze()}setSpeed(t=1){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setSpeed(t)}setDirection(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setDirection(t)}setLooping(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setLoop(t)}isLooping(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.loop:!1}togglePlay(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.togglePlay()}toggleLooping(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.toggleLoop()}setPlayMode(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setMode(t)}enterInteractiveMode(t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.enterInteractiveMode(t)}exitInteractiveMode(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.exitInteractiveMode()}revertToManifestValues(t){var e;(e=this._dotLottieCommonPlayer)==null||e.revertToManifestValues(t)}static get styles(){return di}firstUpdated(){return yt(this,null,function*(){var t;this.container=(t=this.shadowRoot)==null?void 0:t.querySelector("#animation"),"IntersectionObserver"in window&&(this._io=new IntersectionObserver(e=>{var i,n;e[0]!==void 0&&e[0].isIntersecting?((i=this._dotLottieCommonPlayer)==null?void 0:i.currentState)===pt.Frozen&&this.play():((n=this._dotLottieCommonPlayer)==null?void 0:n.currentState)===pt.Playing&&this._freeze()}),this._io.observe(this.container)),this.loop?this._parseLoop(this.loop):this.hasAttribute("loop")&&this._parseLoop("true"),this.renderer==="svg"?this._renderer="svg":this.renderer==="canvas"?this._renderer="canvas":this.renderer==="html"&&(this._renderer="html"),this.src&&(yield this.load(this.src))})}disconnectedCallback(){var t,e;this._io&&(this._io.disconnect(),this._io=void 0),(t=this._dotLottieCommonPlayer)==null||t.destroy(),(e=this._unsubscribeListeners)==null||e.call(this),window&&window.removeEventListener("click",i=>this._clickOutListener(i))}_clickOutListener(t){!t.composedPath().some(e=>e instanceof HTMLElement?e.classList.contains("popover")||e.id==="lottie-animation-options":!1)&&this._popoverIsOpen&&(this._popoverIsOpen=!1,this.requestUpdate())}renderControls(){var t,e,i,n,o;let a=((t=this._dotLottieCommonPlayer)==null?void 0:t.currentState)===pt.Playing,r=((e=this._dotLottieCommonPlayer)==null?void 0:e.currentState)===pt.Paused;return u`
      <div id="lottie-controls" aria-label="lottie-animation-controls" class="toolbar">
        ${this._hasMultipleAnimations?u`
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
            `:u``}
        <button
          id="lottie-play-button"
          @click=${()=>{this.togglePlay()}}
          class=${a||r?`active ${this._hasMultipleAnimations?"btn-spacing-center":"btn-spacing-right"}`:`${this._hasMultipleAnimations?"btn-spacing-center":"btn-spacing-right"}`}
          aria-label="play / pause animation"
        >
          ${a?u`
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
              `:u`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.33337 3.46787C3.33337 2.52312 4.35948 1.93558 5.17426 2.41379L12.8961 6.94592C13.7009 7.41824 13.7009 8.58176 12.8961 9.05408L5.17426 13.5862C4.35948 14.0644 3.33337 13.4769 3.33337 12.5321V3.46787Z"
                    fill="#20272C"
                  />
                </svg>
              `}
        </button>
        ${this._hasMultipleAnimations?u`
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
            `:u``}
        <input
          id="lottie-seeker-input"
          class="seeker ${((i=this._dotLottieCommonPlayer)==null?void 0:i.direction)===-1?"to-left":""}"
          type="range"
          min="0"
          step="1"
          max="100"
          .value=${this._seeker}
          @input=${s=>this._handleSeekChange(s)}
          @mousedown=${()=>{this._freeze()}}
          @mouseup=${()=>{var s;(s=this._dotLottieCommonPlayer)==null||s.unfreeze()}}
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
          class=${(n=this._dotLottieCommonPlayer)!=null&&n.loop?"active btn-spacing-left":"btn-spacing-left"}
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
        ${this._hasMultipleAnimations||this._hasMultipleThemes||this._hasMultipleStates?u`
              <button
                id="lottie-animation-options"
                @click=${()=>{this._popoverIsOpen=!this._popoverIsOpen,this.requestUpdate()}}
                aria-label="options"
                class="btn-spacing-right"
                style=${`background-color: ${this._popoverIsOpen?"var(--lottie-player-toolbar-icon-hover-color)":""}`}
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
            `:u``}
      </div>
      ${this._popoverIsOpen?u`
            <div
              id="popover"
              class="popover"
              tabindex="0"
              aria-label="lottie animations themes popover"
              style="min-height: ${this.themes().length>0?"84px":"auto"}"
            >
              ${!this._animationsTabIsOpen&&!this._styleTabIsOpen&&!this._statesTabIsOpen?u`
                    <button
                      class="popover-button"
                      tabindex="0"
                      aria-label="animations"
                      @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate()}}
                      @keydown=${s=>{(s.code==="Space"||s.code==="Enter")&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate())}}
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
                  `:u``}
              ${this._hasMultipleThemes&&!this._styleTabIsOpen&&!this._animationsTabIsOpen&&!this._statesTabIsOpen?u` <button
                    class="popover-button"
                    aria-label="Themes"
                    @click=${()=>{this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate()}}
                    @keydown=${s=>{(s.code==="Space"||s.code==="Enter")&&(this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate())}}
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
                  </button>`:""}
              ${this._hasMultipleStates&&!this._styleTabIsOpen&&!this._animationsTabIsOpen&&!this._statesTabIsOpen?u` <button
                    class="popover-button"
                    aria-label="States"
                    @click=${()=>{this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate()}}
                    @keydown=${s=>{(s.code==="Space"||s.code==="Enter")&&(this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate())}}
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
                  </button>`:""}
              ${this._animationsTabIsOpen?u`<button
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
                        ${this.animations().map(s=>u`
                            <li>
                              <button
                                class="option-button"
                                aria-label=${`${s}`}
                                @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(s),this.requestUpdate()}}
                                @keydown=${l=>{(l.code==="Space"||l.code==="Enter")&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(s),this.requestUpdate())}}
                              >
                                <div class="option-tick">
                                  ${this.currentAnimation()===s?u`
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
                                      `:u`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${s}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div> `:u``}
              ${this._styleTabIsOpen?u`<div class="option-title-themes-row">
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
                        ${((o=this._dotLottieCommonPlayer)==null?void 0:o.defaultTheme)===""?u``:u`
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
                        ${this._themesForCurrentAnimation.map(s=>u`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${s.id}"
                                @click=${()=>{this.setTheme(s.id)}}
                                @keydown=${l=>{(l.code==="Space"||l.code==="Enter")&&this.setTheme(s.id)}}
                              >
                                <div class="option-tick">
                                  ${this.getDefaultTheme()===s.id?u`
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
                                      `:u`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${s.id}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:u``}
              ${this._statesTabIsOpen?u`<div class="option-title-themes-row">
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
                        ${this._statesForCurrentAnimation.map(s=>u`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${s}"
                                @click=${()=>{this.enterInteractiveMode(s)}}
                                @keydown=${l=>{(l.code==="Space"||l.code==="Enter")&&this.enterInteractiveMode(s)}}
                              >
                                <div class="option-tick">
                                  ${this.getActiveStateMachine()===s?u`
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
                                      `:u`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${s}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:u``}
            </div>
          `:u``}
    `}render(){var t;let e=this.controls?"main controls":"main",i=this.controls?"animation controls":"animation";return u`
      <div id="animation-container" class=${e} lang="en" role="img" aria-label="lottie-animation-container">
        <div id="animation" class=${i} style="background:${this.background};">
          ${((t=this._dotLottieCommonPlayer)==null?void 0:t.currentState)===pt.Error?u` <div class="error">⚠️</div> `:void 0}
        </div>
        ${this.controls?this.renderControls():void 0}
      </div>
    `}};f([A({type:String})],_.prototype,"defaultTheme",2),f([Bi("#animation")],_.prototype,"container",2),f([A()],_.prototype,"playMode",2),f([A({type:Boolean})],_.prototype,"autoplay",2),f([A({type:String})],_.prototype,"background",2),f([A({type:Boolean})],_.prototype,"controls",2),f([A({type:Number})],_.prototype,"direction",2),f([A({type:Boolean})],_.prototype,"hover",2),f([A({type:String})],_.prototype,"loop",2),f([A({type:String})],_.prototype,"renderer",2),f([A({type:Number})],_.prototype,"speed",2),f([A({type:String})],_.prototype,"src",2),f([A()],_.prototype,"intermission",2),f([A({type:String})],_.prototype,"activeAnimationId",2),f([A({type:Boolean})],_.prototype,"light",2),f([A({type:Boolean})],_.prototype,"worker",2),f([A({type:String})],_.prototype,"activeStateId",2),f([zi()],_.prototype,"_seeker",2);customElements.get(mi)||customElements.define(mi,_);function ui(t,e){let i=t.ngOnInit;t.ngOnInit=function(){if(this[e]===void 0||this[e]===null)throw new Error(`Required input '${e}' was not provided in ${t.constructor.name}.`);if(i)return i.apply(this)}}var vt=function(t){return t.QUANTIZATION="quant",t.PRUNING="pruning",t}(vt||{});var ye={[vt.PRUNING]:{path:"../assets/animations/pruning.lottie",speed:.15,className:"pruning"},[vt.QUANTIZATION]:{path:"../assets/animations/quantization.lottie",speed:.08,className:"quant"}};var Xi=["lottiePlayer"],F,xt=(F=class{constructor(e,i,n){this.scriptFacadeService=e,this.el=i,this.renderer=n}ngAfterViewInit(){let e=ye[this.animationType];if(!e)throw new Error(`Unknown animation type: ${this.animationType}`);this.initializeAnimation(e)}initializeAnimation(e){setTimeout(()=>{this.lottiePlayer.nativeElement.load(e.path,{progresiveLoad:!0})},0),this.renderer.addClass(this.el.nativeElement,e.className)}listenToScriptStateChanges(){let e=ye[this.animationType];this.lottiePlayer.nativeElement.setSpeed(e.speed),this.scriptFacadeService.scriptStatus$.pipe(st(this)).subscribe(i=>{kt(i)?this.playAnimation():this.stopAnimation()})}playAnimation(){this.lottiePlayer.nativeElement.play()}stopAnimation(){this.lottiePlayer.nativeElement.stop()}},F.\u0275fac=function(i){return new(i||F)(S(rt),S(xe),S(Ae))},F.\u0275cmp=E({type:F,selectors:[["ms-running-animation"]],viewQuery:function(i,n){if(i&1&&Pe(Xi,7),i&2){let o;we(o=Le())&&(n.lottiePlayer=o.first)}},inputs:{animationType:"animationType"},decls:3,vars:1,consts:[["lottiePlayer",""],[1,"parent-container"],["loop","","renderer","svg",3,"ready","worker"]],template:function(i,n){if(i&1){let o=ot();p(0,"div",1)(1,"dotlottie-player",2,0),j("ready",function(){return it(o),nt(n.listenToScriptStateChanges())}),c()()}i&2&&(h(),d("worker",!0))},styles:[".parent-container[_ngcontent-%COMP%]{overflow:hidden;height:300px;border-radius:10px;margin-bottom:10px;position:relative;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}dotlottie-player[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:cover;position:absolute;top:50%;left:0;transform:translateY(-50%)}.pruning[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{background-color:#b2ddff}@media (max-width: 1000px){.pruning[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{height:180px}}@media (min-width: 1200px){.pruning[_nghost-%COMP%]   dotlottie-player[_ngcontent-%COMP%]{width:900px;left:calc((100% - 900px)/2)}}.quant[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{background-color:#1649a8}@media (max-width: 1000px){.quant[_nghost-%COMP%]   .parent-container[_ngcontent-%COMP%]{height:180px}}@media (min-width: 1100px){.quant[_nghost-%COMP%]   dotlottie-player[_ngcontent-%COMP%]{width:900px;left:calc((100% - 900px)/2)}}"],changeDetection:0}),F);U([ui],xt.prototype,"animationType",void 0);xt=U([Y()],xt);var P=function(t){return t.ACCURACY="accuracy",t.LOSS="loss",t}(P||{}),qi=100,At=(t,e,i=!1)=>t.map(n=>({datasetIndex:n.datasetIndex,values:(i?n.testing:n.steps).map(o=>o[e])||[]})),gi=t=>{let e=t.flatMap(i=>i.sparsity).filter(i=>i!=null);return[{datasetIndex:0,values:[qi,...e]}]},Ce=(t,e)=>[{datasetIndex:0,values:t.steps.map(i=>i[e]).filter(i=>i!=null)}],fe=(t,e)=>e===P.LOSS?t.map((i,n)=>({datasetIndex:n,values:i.steps.map(o=>o?.loss).filter(o=>o!=null)})):[{datasetIndex:0,values:t.map(i=>i.accuracy).filter(i=>i!=null)}],_e=(t,e)=>t.epochs.map((i,n)=>({datasetIndex:n,values:i.steps.map(o=>o[e])})),be=(t,e)=>t.tests.map((i,n)=>({datasetIndex:n,values:i.steps.map(o=>o[e])}));var Ci=(()=>{let e=class e{constructor(n){this.chartsFacadeService=n,this.RealtimeUpdateMetric=C,this.initialAccuracyChartData=[],this.accuracyChartDisplaySettings={chartDataStructure:M.SINGLE_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisDynamic:!0,datasetLabelPrefix:"Epoch:",xAxisLabelPrefix:"Step",xAxisRepetitionCount:1,yAxisMinimumValue:0,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.GREEN,realtimeUpdateMetric:C.ACCURACY},this.initialAccuracyTestingChartData=[],this.testingAccuracyChartDisplaySettings={chartDataStructure:M.SINGLE_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!0,isXAxisDynamic:!0,xAxisLabelPrefix:"Step",datasetLabelPrefix:"Test:",xAxisRepetitionCount:1,yAxisMinimumValue:0,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.YELLOW,realtimeUpdateMetric:C.TESTING_ACCURACY},this.initialLossChartData=[],this.lossChartDisplaySettings={chartDataStructure:M.SINGLE_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!0,isXAxisDynamic:!0,xAxisLabelPrefix:"Step",datasetLabelPrefix:"Epoch:",xAxisRepetitionCount:1,yAxisMinimumValue:0,isYAxisDynamic:!0,datasetColorSettingsKey:T.RED,realtimeUpdateMetric:C.LOSS},this.initialLossTestingChartData=[],this.testingLossChartDisplaySettings={chartDataStructure:M.SINGLE_PHASE_X_AXIS,xAxisDataPointsCount:159,isXAxisVisible:!0,isXAxisDynamic:!0,xAxisLabelPrefix:"Step",datasetLabelPrefix:"Test:",xAxisRepetitionCount:1,yAxisMinimumValue:0,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:1,dynamicYAxisGrowthRoundFactor:2,datasetColorSettingsKey:T.YELLOW,realtimeUpdateMetric:C.TESTING_LOSS}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.dispatch(X.getCurrentMachineUnlearningChartData())}loadLatestChartsData(){this.chartsFacadeService.machineUnlearningProgress$.pipe(O(1),N(n=>!Rt(n)),I(1)).subscribe(n=>{this.initialAccuracyChartData=_e(n,P.ACCURACY),this.initialLossChartData=_e(n,P.LOSS),this.initialAccuracyTestingChartData=be(n,P.ACCURACY),this.initialLossTestingChartData=be(n,P.LOSS)})}};e.\u0275fac=function(o){return new(o||e)(S(lt))},e.\u0275cmp=E({type:e,selectors:[["ms-running-machine-unlearning-charts"]],decls:19,vars:8,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"epochs"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"]],template:function(o,a){o&1&&(p(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),m(4,"Accuracy Training"),c(),g(5,"ms-line-chart",4),c(),p(6,"div",5)(7,"p",3),m(8,"Accuracy Test"),c(),g(9,"ms-line-chart",4),c()(),p(10,"div",6)(11,"div",2)(12,"p",3),m(13,"Loss Training"),c(),g(14,"ms-line-chart",4),c(),p(15,"div",5)(16,"p",3),m(17,"Loss Test"),c(),g(18,"ms-line-chart",4),c()()()),o&2&&(h(5),d("data",a.initialAccuracyChartData)("settings",a.accuracyChartDisplaySettings),h(4),d("data",a.initialAccuracyTestingChartData)("settings",a.testingAccuracyChartDisplaySettings),h(5),d("data",a.initialLossChartData)("settings",a.lossChartDisplaySettings),h(4),d("data",a.initialLossTestingChartData)("settings",a.testingLossChartDisplaySettings))},dependencies:[Z],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.accuracy-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.loss-chart[_ngcontent-%COMP%]{background-color:var(--backgrounds-80);border-radius:20px;padding:10px;margin:10px 0}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .epochs[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{border-left:1px solid var(--foregrounds-300);padding-left:10px;margin-left:10px;flex:0 0 28.5%}"]});let t=e;return t})();var k=function(t){return t.SPARSITY_PRUNING="sparsityPruning",t.ACCURACY_PRUNING="accuracyPruning",t.ACCURACY_QUANTIZATION="accuracyQuantization",t.ACCURACY_MACHINE_UNLEARNING="accuracyMachineUnlearning",t.LOSS_QUANTIZATION="lossQuantization",t.LOSS_PRUNING="lossPruning",t.LOSS_MACHINE_UNLEARNING="lossMachineUnlearning",t.TESTING_ACCURACY_CHART="testing_accuracyChart",t.TESTING_LOSS_CHART="testing_lossChart",t}(k||{});var z,Yt=(z=class{constructor(e){this.chartsFacadeService=e,this.RealtimeUpdateMetric=C,this.initialLossChartData=[],this.lossPruningChartSettings={},this.lossChartDisplaySettings=b(y({},ct),{yAxisMinimumValue:0,yAxisTickInterval:2,chartDataStructure:M.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:Jt,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:2,datasetColorSettingsKey:T.RED,realtimeUpdateMetric:C.LOSS}),this.initialLossTestingChartData=[],this.testingLossChartDisplaySettings=b(y({},ct),{yAxisMinimumValue:0,yAxisTickInterval:2,chartDataStructure:M.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:Ft,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:2,datasetColorSettingsKey:T.YELLOW,realtimeUpdateMetric:C.TESTING_LOSS}),this.initialAccuracyChartData=[],this.accuracyPruningChartSettings={},this.accuracyChartDisplaySettings=b(y({},ct),{chartDataStructure:M.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:Jt,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.GREEN,realtimeUpdateMetric:C.ACCURACY}),this.initialAccuracyTestingChartData=[],this.testingAccuracyChartDisplaySettings=b(y({},ct),{yAxisTickInterval:20,chartDataStructure:M.MUlTI_PHASE_X_AXIS,xAxisDataPointsCount:Ft,yAxisMaximumValue:100,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.YELLOW,realtimeUpdateMetric:C.TESTING_ACCURACY}),this.initialSparsityChartData=[],this.sparsityPruningChartSettings={},this.sparsityChartDisplaySettings=b(y({},ct),{xAxisLabelPrefix:"Pruning",isDatasetLabelVisible:!1,yAxisTickInterval:100,chartDataStructure:M.SINGLE_PHASE_X_AXIS_SKIP_ONE,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.BLUE,useSteppedLines:!0,realtimeUpdateMetric:C.SPARSITY})}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.settings$.pipe(O(1),I(1)).subscribe(e=>{e&&(this.accuracyPruningChartSettings=e[k.ACCURACY_PRUNING]||{},this.accuracyChartDisplaySettings=b(y({},this.accuracyChartDisplaySettings),{xAxisRepetitionCount:Number(this.accuracyPruningChartSettings.epochs)}),this.testingAccuracyChartDisplaySettings=b(y({},this.testingAccuracyChartDisplaySettings),{xAxisRepetitionCount:Number(this.accuracyPruningChartSettings.epochs)}),this.lossPruningChartSettings=b(y({},e[k.LOSS_PRUNING]||{}),{testingSteps:Ft}),this.lossChartDisplaySettings=b(y({},this.lossChartDisplaySettings),{xAxisRepetitionCount:Number(this.lossPruningChartSettings.epochs)}),this.testingLossChartDisplaySettings=b(y({},this.testingLossChartDisplaySettings),{xAxisRepetitionCount:Number(this.lossPruningChartSettings.epochs)}),this.sparsityPruningChartSettings=y({},e[k.SPARSITY_PRUNING]||{}),this.sparsityChartDisplaySettings=b(y({},this.sparsityChartDisplaySettings),{xAxisDataPointsCount:this.sparsityPruningChartSettings.pruningTimes+1}),this.chartsFacadeService.dispatch(X.getCurrentPruningChartData()))}),this.chartsFacadeService.dispatch(X.getChartConfigurationSettings({chartTypes:[k.ACCURACY_PRUNING,k.LOSS_PRUNING,k.SPARSITY_PRUNING]}))}loadLatestChartsData(){this.chartsFacadeService.pruningProgress.pipe(O(1),N(e=>!!e&&e.length>0),I(1)).subscribe(e=>{this.initialLossChartData=At(e,P.LOSS),this.initialLossTestingChartData=At(e,P.LOSS,!0),this.initialAccuracyChartData=At(e,P.ACCURACY),this.initialAccuracyTestingChartData=At(e,P.ACCURACY,!0),this.initialSparsityChartData=gi(e)})}},z.\u0275fac=function(i){return new(i||z)(S(lt))},z.\u0275cmp=E({type:z,selectors:[["ms-running-pruning-charts"]],decls:23,vars:10,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"epochs"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"],[1,"ms-chart-display","sparsity-chart"]],template:function(i,n){i&1&&(p(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),m(4,"Accuracy Training"),c(),g(5,"ms-line-chart",4),c(),p(6,"div",5)(7,"p",3),m(8,"Accuracy Test"),c(),g(9,"ms-line-chart",4),c()(),p(10,"div",6)(11,"div",2)(12,"p",3),m(13,"Loss Training"),c(),g(14,"ms-line-chart",4),c(),p(15,"div",5)(16,"p",3),m(17,"Loss Test"),c(),g(18,"ms-line-chart",4),c()(),p(19,"div",7)(20,"p",3),m(21,"Sparsity Training"),c(),g(22,"ms-line-chart",4),c()()),i&2&&(h(5),d("data",n.initialAccuracyChartData)("settings",n.accuracyChartDisplaySettings),h(4),d("data",n.initialAccuracyTestingChartData)("settings",n.testingAccuracyChartDisplaySettings),h(5),d("data",n.initialLossChartData)("settings",n.lossChartDisplaySettings),h(4),d("data",n.initialLossTestingChartData)("settings",n.testingLossChartDisplaySettings),h(4),d("data",n.initialSparsityChartData)("settings",n.sparsityChartDisplaySettings))},dependencies:[Z],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.sparsity-chart[_ngcontent-%COMP%]{flex-direction:column}.charts[_ngcontent-%COMP%]   .ms-chart-display.sparsity-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.accuracy-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.loss-chart[_ngcontent-%COMP%]{background-color:var(--backgrounds-80);border-radius:20px;padding:10px;margin:10px 0}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .epochs[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{border-left:1px solid var(--foregrounds-300);padding-left:10px;flex:0 0 30%}"]}),z);Yt=U([Y()],Yt);var fi=(()=>{let e=class e{constructor(n){this.chartsFacadeService=n,this.RealtimeUpdateMetric=C,this.initialLossChartData=[],this.initialLossTestingChartData=[],this.initialAccuracyChartData=[],this.initialAccuracyTestingChartData=[],this.lossChartDisplaySettings={yAxisMinimumValue:0,xAxisDataPointsCount:40,datasetLabelPrefix:"Reconstruction:",xAxisLabelPrefix:"Step",chartDataStructure:M.SINGLE_PHASE_X_AXIS,isXAxisVisible:!0,isXAxisDynamic:!0,isYAxisDynamic:!0,dynamicYAxisGrowthOffset:50,datasetColorSettingsKey:T.RED,realtimeUpdateMetric:C.LOSS},this.lossTestingChartDisplaySettings={yAxisMinimumValue:0,xAxisDataPointsCount:78,isDatasetLabelVisible:!1,xAxisLabelPrefix:"Step",chartDataStructure:M.SINGLE_PHASE_X_AXIS,isXAxisVisible:!0,isXAxisDynamic:!0,isYAxisDynamic:!0,datasetColorSettingsKey:T.YELLOW,dynamicYAxisGrowthRoundFactor:2,realtimeUpdateMetric:C.TESTING_LOSS},this.accuracyChartDisplaySettings={yAxisMaximumValue:100,yAxisMinimumValue:0,xAxisLabelPrefix:"Recon.",isDatasetLabelVisible:!1,isXAxisVisible:!0,xAxisInitialLabelValue:0,chartDataStructure:M.SINGLE_PHASE_X_AXIS,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.GREEN,isXAxisDynamic:!0,realtimeUpdateMetric:C.ACCURACY,enhanceSinglePhaseXAxisWebsocketEvent:!0},this.accuracyTestingChartDisplaySettings={yAxisMaximumValue:100,yAxisMinimumValue:0,xAxisDataPointsCount:78,isDatasetLabelVisible:!1,xAxisLabelPrefix:"Step",chartDataStructure:M.SINGLE_PHASE_X_AXIS,isXAxisVisible:!0,isXAxisDynamic:!0,zoomRangeLimits:{max:100},datasetColorSettingsKey:T.YELLOW,realtimeUpdateMetric:C.TESTING_ACCURACY}}ngOnInit(){this.loadChartSettings(),this.loadLatestChartsData()}loadChartSettings(){this.chartsFacadeService.settings$.pipe(O(1),I(1)).subscribe(n=>{n&&(this.accuracyChartDisplaySettings=b(y({},this.accuracyChartDisplaySettings),{xAxisDataPointsCount:n[k.ACCURACY_QUANTIZATION]?.reconstructions}),this.chartsFacadeService.dispatch(X.getCurrentQuantizationChartData()))}),this.chartsFacadeService.dispatch(X.getChartConfigurationSettings({chartTypes:[k.ACCURACY_QUANTIZATION]}))}loadLatestChartsData(){this.chartsFacadeService.quantizationProgress$.pipe(O(1),N(n=>!!n),I(1)).subscribe(n=>this.processChartData(n))}processChartData(n){this.initialLossChartData=fe(n.reconstructions,P.LOSS),this.initialAccuracyChartData=fe(n.reconstructions,P.ACCURACY),this.initialLossTestingChartData=Ce(n.testing,P.LOSS),this.initialAccuracyTestingChartData=Ce(n.testing,P.ACCURACY)}};e.\u0275fac=function(o){return new(o||e)(S(lt))},e.\u0275cmp=E({type:e,selectors:[["ms-running-quantization-charts"]],decls:19,vars:8,consts:[[1,"charts"],[1,"ms-chart-display","accuracy-chart"],[1,"reconstructions"],[1,"paragraph-bold-p3-small-bold","p-2"],[3,"data","settings"],[1,"testing"],[1,"ms-chart-display","loss-chart"]],template:function(o,a){o&1&&(p(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),m(4,"Accuracy Training"),c(),g(5,"ms-line-chart",4),c(),p(6,"div",5)(7,"p",3),m(8,"Accuracy Test"),c(),g(9,"ms-line-chart",4),c()(),p(10,"div",6)(11,"div",2)(12,"p",3),m(13,"Loss Training"),c(),g(14,"ms-line-chart",4),c(),p(15,"div",5)(16,"p",3),m(17,"Loss Test"),c(),g(18,"ms-line-chart",4),c()()()),o&2&&(h(5),d("data",a.initialAccuracyChartData)("settings",a.accuracyChartDisplaySettings),h(4),d("data",a.initialAccuracyTestingChartData)("settings",a.accuracyTestingChartDisplaySettings),h(5),d("data",a.initialLossChartData)("settings",a.lossChartDisplaySettings),h(4),d("data",a.initialLossTestingChartData)("settings",a.lossTestingChartDisplaySettings))},dependencies:[Z],styles:[".charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]{display:flex}.charts[_ngcontent-%COMP%]   .ms-chart-display.accuracy-chart[_ngcontent-%COMP%], .charts[_ngcontent-%COMP%]   .ms-chart-display.loss-chart[_ngcontent-%COMP%]{background-color:var(--backgrounds-80);border-radius:20px;padding:10px;margin:10px 0}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .reconstructions[_ngcontent-%COMP%]{flex:0 0 70%}.charts[_ngcontent-%COMP%]   .ms-chart-display[_ngcontent-%COMP%]   .testing[_ngcontent-%COMP%]{border-left:1px solid var(--foregrounds-300);padding-left:10px;margin-left:10px;flex:0 0 28.5%}"]});let t=e;return t})();var _i=(()=>{let e=class e{constructor(){this.keyMap={forget_acc:"Forget Accuracy",retain_acc:"Retain Accuracy",test_acc:"Test Accuracy",val_acc:"Validation Accuracy"}}transform(n){if(!n)return n;let o=n.split("_");if(o.length<3)return n;let a=o.slice(0,-2).join("_"),r=o[o.length-1];return`${this.keyMap[a]||a.split("_").map(l=>l.charAt(0).toUpperCase()+l.slice(1)).join(" ")} (Test #${r})`}};e.\u0275fac=function(o){return new(o||e)},e.\u0275pipe=Se({name:"readableStatisticsLabel",type:e,pure:!0});let t=e;return t})();var on=t=>({stats:t});function an(t,e){if(t&1&&(p(0,"div",7)(1,"span",8),m(2),Et(3,"readableStatisticsLabel"),c(),p(4,"span",9),m(5),c()()),t&2){let i=e.$implicit;h(2),Mt("",$t(3,2,i.key),":"),h(3),Te(i.value)}}function sn(t,e){if(t&1&&(W(0),p(1,"div",5),D(2,an,6,4,"div",6),c(),Q()),t&2){let i=V().ngIf;h(2),d("ngForOf",i.stats)}}function rn(t,e){t&1&&g(0,"ms-empty-state",10)}function ln(t,e){if(t&1&&(W(0),D(1,sn,3,1,"ng-container",4)(2,rn,1,0,"ng-template",null,0,It),Q()),t&2){let i=e.ngIf,n=Tt(3);h(),d("ngIf",i.stats==null?null:i.stats.length)("ngIfElse",n)}}var Si=(()=>{let e=class e{constructor(n){this.statisticsFacadeService=n,this.statistics$=this.statisticsFacadeService.statistics$}ngOnInit(){this.statisticsFacadeService.dispatch(Ge.getStatistics())}};e.\u0275fac=function(o){return new(o||e)(S(ze))},e.\u0275cmp=E({type:e,selectors:[["ms-running-statistics"]],decls:6,vars:7,consts:[["noStatistics",""],[1,"ms-card"],[1,"heading-section-title"],[4,"ngIf"],[4,"ngIf","ngIfElse"],[1,"key-value-container","dense"],["class","key-value-pair",4,"ngFor","ngForOf"],[1,"key-value-pair"],[1,"key-value-key"],[1,"key-value-value"],["title","No statistics available."]],template:function(o,a){o&1&&(p(0,"mat-card",1)(1,"p",2),m(2,"Statistics"),c(),D(3,ln,4,2,"ng-container",3),Et(4,"async"),Et(5,"keyvalue"),c()),o&2&&(h(3),d("ngIf",Me(5,on,$t(5,3,$t(4,1,a.statistics$)))))},dependencies:[Ee,at,Ut,Vt,Oe,De,_i]});let t=e;return t})();function dn(t,e){if(t&1){let i=ot();p(0,"div",18)(1,"button",19),j("click",function(){it(i);let o=V();return nt(o.runStopScript())}),m(2," Stop "),c()()}}function mn(t,e){t&1&&(p(0,"div",20)(1,"div",13),m(2,"\u2014"),c(),p(3,"div",14),m(4,"Sparsity"),c()())}var G,Xt=(G=class{constructor(e,i){this.scriptFacadeService=e,this.chartToolsGlobalSignalsService=i,this.isScriptActive=!1,this.enableTooltips=!1,this.enableZoom=!1}ngOnInit(){this.listenToScriptStateChanges(),this.subscribeToChartToolsSignals()}listenToScriptStateChanges(){this.scriptFacadeService.dispatch(Ct.getCurrentOrLastActiveScriptDetails()),this.scriptFacadeService.scriptDetails$.pipe(O(1),I(1),N(e=>!Nt(e?.algKey))).subscribe(e=>{this.scriptDetails=e}),this.scriptFacadeService.scriptStatus$.pipe(st(this)).subscribe(e=>{this.isScriptActive=kt(e)})}toggleTooltip(e){this.chartToolsGlobalSignalsService.toggleTooltips=e.checked}toggleZoom(e){this.chartToolsGlobalSignalsService.toggleZoom=e.checked}get isSparsityVisible(){return this.scriptDetails?.type===ft.PRUNING}subscribeToChartToolsSignals(){this.chartToolsGlobalSignalsService.toggleTooltips$.pipe(st(this)).subscribe(e=>{this.enableTooltips=e}),this.chartToolsGlobalSignalsService.toggleZoom$.pipe(st(this)).subscribe(e=>{this.enableZoom=e})}runStopScript(){this.scriptFacadeService.dispatch(Ct.stopScript())}},G.\u0275fac=function(i){return new(i||G)(S(rt),S(Ht))},G.\u0275cmp=E({type:G,selectors:[["ms-running-status-bar"]],decls:33,vars:7,consts:[[1,"training-status","mb-2"],[1,"status-bar"],[1,"runnning-title-container"],[1,"model-name","heading-sub-section-title"],["class","ml-2",4,"ngIf"],[1,"mt-2","flex"],["color","primary",3,"ngModelChange","change","ngModel","disabled"],[1,"flex"],["color","primary",1,"ml-2",3,"ngModelChange","change","ngModel","disabled"],[1,"ml-1"],["fontSet","ms","fontIcon","icon-Info","matTooltip","Use mouse wheel or touchpad pinch to zoom in/out. Drag to select an area for specific zoom, or use touchpad gestures to navigate."],[1,"metrics"],[1,"metric","accuracy"],[1,"metric-value"],[1,"metric-name","paragraph-semibold-p2-large-emphasis"],[1,"metric","loss"],["class","metric sparsity",4,"ngIf"],[1,"metric","testing"],[1,"ml-2"],["mat-raised-button","","color","warn","matTooltip","Stop current process.",3,"click"],[1,"metric","sparsity"]],template:function(i,n){i&1&&(p(0,"div",0)(1,"div",1)(2,"div")(3,"div",2)(4,"div",3),m(5),c(),D(6,dn,3,0,"div",4),c(),p(7,"div",5)(8,"div")(9,"mat-slide-toggle",6),Wt("ngModelChange",function(a){return Kt(n.enableTooltips,a)||(n.enableTooltips=a),a}),j("change",function(a){return n.toggleTooltip(a)}),m(10," Enable tooltips "),c()(),p(11,"div",7)(12,"mat-slide-toggle",8),Wt("ngModelChange",function(a){return Kt(n.enableZoom,a)||(n.enableZoom=a),a}),j("change",function(a){return n.toggleZoom(a)}),m(13," Enable zoom "),c(),p(14,"div",9),g(15,"mat-icon",10),c()()()()(),p(16,"div",11)(17,"div",12)(18,"div",13),m(19,"\u2014"),c(),p(20,"div",14),m(21,"Accuracy"),c()(),p(22,"div",15)(23,"div",13),m(24,"\u2014"),c(),p(25,"div",14),m(26,"Loss"),c()(),D(27,mn,5,0,"div",16),p(28,"div",17)(29,"div",13),m(30,"\u2014"),c(),p(31,"div",14),m(32,"Test"),c()()()()),i&2&&(h(5),Mt("Algorithm: ",(n.scriptDetails==null?null:n.scriptDetails.algKey)||"None",""),h(),d("ngIf",n.isScriptActive),h(3),qt("ngModel",n.enableTooltips),d("disabled",!(n.scriptDetails!=null&&n.scriptDetails.algKey)),h(3),qt("ngModel",n.enableZoom),d("disabled",!(n.scriptDetails!=null&&n.scriptDetails.algKey)),h(15),d("ngIf",n.isSparsityVisible))},dependencies:[at,Ot,Dt,Ue,Ve,Re,Ne],styles:[".training-status[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.training-status[_ngcontent-%COMP%]   .status-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.training-status[_ngcontent-%COMP%]   .runnning-title-container[_ngcontent-%COMP%]{display:flex;align-items:center}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%], .training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]{display:flex;gap:10px}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-size:1.25rem}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.sparsity[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-sparsity)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.accuracy[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-accuracy)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.loss[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-loss)}.training-status[_ngcontent-%COMP%]   .metrics[_ngcontent-%COMP%]   .metric.testing[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%]{font-weight:700;color:var(--metrics-testing)}"]}),G);Xt=U([Y()],Xt);function gn(t,e){if(t&1&&g(0,"ms-running-animation",10),t&2){let i=V();d("animationType",i.AnimationType.QUANTIZATION)}}function vn(t,e){if(t&1&&g(0,"ms-running-animation",10),t&2){let i=V();d("animationType",i.AnimationType.PRUNING)}}function yn(t,e){if(t&1&&g(0,"ms-running-animation",10),t&2){let i=V();d("animationType",i.AnimationType.PRUNING)}}function Cn(t,e){t&1&&g(0,"ms-running-quantization-charts")}function fn(t,e){t&1&&g(0,"ms-running-pruning-charts")}function _n(t,e){t&1&&g(0,"ms-running-machine-unlearning-charts")}function bn(t,e){if(t&1&&(W(0)(1,2),D(2,Cn,1,0,"ms-running-quantization-charts",11)(3,fn,1,0,"ms-running-pruning-charts",11)(4,_n,1,0,"ms-running-machine-unlearning-charts",11),Q()()),t&2){let i=V();h(),d("ngSwitch",i.scriptDetails==null?null:i.scriptDetails.type),h(),d("ngSwitchCase",i.AlgorithmType.QUANTIZATION),h(),d("ngSwitchCase",i.AlgorithmType.PRUNING),h(),d("ngSwitchCase",i.AlgorithmType.MACHINE_UNLEARNING)}}function Sn(t,e){t&1&&g(0,"ms-empty-state",12)}function xn(t,e){t&1&&(W(0),p(1,"div",13),g(2,"ms-running-statistics"),c(),Q())}var B,Zt=(B=class{constructor(e,i){this.navigationService=e,this.scriptFacadeService=i,this.AlgorithmType=ft,this.AnimationType=vt}ngOnInit(){this.listenToScriptStateChanges()}listenToScriptStateChanges(){this.scriptFacadeService.dispatch(Ct.getCurrentOrLastActiveScriptDetails()),this.scriptFacadeService.scriptDetails$.pipe(O(1),I(1),N(e=>!Nt(e?.algKey))).subscribe(e=>{this.scriptDetails=e})}get isChartVisible(){return!Rt(this.scriptDetails?.algKey)&&this.scriptDetails?.type!==ft.TRAIN}},B.\u0275fac=function(i){return new(i||B)(S(He),S(rt))},B.\u0275cmp=E({type:B,selectors:[["ms-running"]],decls:16,vars:7,consts:[["noChartData",""],[1,"heading-primary-title","title"],[3,"ngSwitch"],[3,"animationType",4,"ngSwitchCase"],[1,"ms-card","running-prunning"],[4,"ngIf","ngIfElse"],[4,"ngIf"],[1,"mt-4"],["mat-stroked-button","","color","primary",3,"click"],["fontSet","ms","fontIcon","icon-ArrowLeft"],[3,"animationType"],[4,"ngSwitchCase"],["title","No Chart Data Available","message","Please run the appropriate script to generate chart data."],[1,"mt-2"]],template:function(i,n){if(i&1){let o=ot();p(0,"p",1),m(1,"Running"),c(),W(2,2),D(3,gn,1,1,"ms-running-animation",3)(4,vn,1,1,"ms-running-animation",3)(5,yn,1,1,"ms-running-animation",3),Q(),p(6,"mat-card",4),g(7,"ms-running-status-bar"),D(8,bn,5,4,"ng-container",5)(9,Sn,1,0,"ng-template",null,0,It),c(),D(11,xn,3,0,"ng-container",6),p(12,"div",7)(13,"button",8),j("click",function(){return it(o),nt(n.navigationService.goToPreviousPage())}),g(14,"mat-icon",9),m(15," Go back "),c()()}if(i&2){let o=Tt(10);h(2),d("ngSwitch",n.scriptDetails==null?null:n.scriptDetails.type),h(),d("ngSwitchCase",n.AlgorithmType.QUANTIZATION),h(),d("ngSwitchCase",n.AlgorithmType.PRUNING),h(),d("ngSwitchCase",n.AlgorithmType.MACHINE_UNLEARNING),h(3),d("ngIf",n.isChartVisible)("ngIfElse",o),h(3),d("ngIf",(n.scriptDetails==null?null:n.scriptDetails.type)===n.AlgorithmType.MACHINE_UNLEARNING)}},dependencies:[at,$e,Ie,Ot,Dt,Ut,Vt,Yt,fi,Ci,xt,Si,Xt]}),B);Zt=U([Y()],Zt);var An=[{path:"",component:Zt}],xi=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=Lt({type:e}),e.\u0275inj=wt({imports:[Qt.forChild(An),Qt]});let t=e;return t})();var Sa=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=Lt({type:e}),e.\u0275inj=wt({providers:[Ht],imports:[xi,ke,Fe,Z]});let t=e;return t})();export{Sa as RunningModule};
