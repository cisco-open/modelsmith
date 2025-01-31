import{Aa as b,S as f,X as d,aa as D,g as l,j as i,o as a,r as p,y as c}from"./chunk-KEE6Z3KT.js";var P=D;function S(e){return!!e[P]}var w=Symbol("__destroy"),g=Symbol("__decoratorApplied");function v(e){return typeof e=="string"?Symbol(`__destroy__${e}`):w}function x(e){e.prototype[g]=!0}function O(e,t){e[t]||(e[t]=new i)}function _(e,t){e[t]&&(e[t].next(),e[t].complete(),e[t]=null)}function C(e){e instanceof l&&e.unsubscribe()}function j(e){Array.isArray(e)&&e.forEach(C)}function E(e,t){return function(){if(e&&e.call(this),_(this,v()),t.arrayName&&j(this[t.arrayName]),t.checkProperties)for(let o in this)t.blackList?.includes(o)||C(this[o])}}function k(e,t){e.prototype.ngOnDestroy=E(e.prototype.ngOnDestroy,t)}function A(e,t){let o=e.\u0275pipe;o.onDestroy=E(o.onDestroy,t)}function G(e={}){return t=>{S(t)?A(t,e):k(t,e),x(t)}}var m=7,y=Symbol("CheckerHasBeenSet");function B(e,t){e[y]||I()||(h(()=>p(Promise.resolve()).pipe(c(()=>{let o;try{o=b(e)}catch{o=null}let n=o?.lView;if(n==null)return a;let r=n[m]||(n[m]=[]),s=new i;return r.push(function(){h(()=>{s.next(),s.complete()})}),s}),c(()=>Promise.resolve())).subscribe(()=>{(t.observed??t.observers.length>0)&&console.warn(T(e))})),e[y]=!0)}function I(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]"}function h(e){let t=d.Zone;return!!t&&typeof t.root?.run=="function"?t.root.run(e):e()}function T(e){return`
  The ${e.constructor.name} still has subscriptions that haven't been unsubscribed.
  This may happen if the class extends another class decorated with @UntilDestroy().
  The child class implements its own ngOnDestroy() method but doesn't call super.ngOnDestroy().
  Let's look at the following example:
  @UntilDestroy()
  @Directive()
  export abstract class BaseDirective {}
  @Component({ template: '' })
  export class ConcreteComponent extends BaseDirective implements OnDestroy {
    constructor() {
      super();
      someObservable$.pipe(untilDestroyed(this)).subscribe();
    }
    ngOnDestroy(): void {
      // Some logic here...
    }
  }
  The BaseDirective.ngOnDestroy() will not be called since Angular will call ngOnDestroy()
  on the ConcreteComponent, but not on the BaseDirective.
  One of the solutions is to declare an empty ngOnDestroy method on the BaseDirective:
  @UntilDestroy()
  @Directive()
  export abstract class BaseDirective {
    ngOnDestroy(): void {}
  }
  @Component({ template: '' })
  export class ConcreteComponent extends BaseDirective implements OnDestroy {
    constructor() {
      super();
      someObservable$.pipe(untilDestroyed(this)).subscribe();
    }
    ngOnDestroy(): void {
      // Some logic here...
      super.ngOnDestroy();
    }
  }
  `}var u=!1;function U(e,t,o){let n=e[t];if(u&&typeof n!="function")throw new Error(`${e.constructor.name} is using untilDestroyed but doesn't implement ${t}`);O(e,o),e[t]=function(){n.apply(this,arguments),_(this,o),e[t]=n}}function H(e,t){return o=>{let n=v(t);typeof t=="string"?U(e,t,n):(u&&L(e),O(e,n));let r=e[n];return u&&B(e,r),o.pipe(f(r))}}function L(e){let t=Object.getPrototypeOf(e);if(!(g in t))throw new Error("untilDestroyed operator cannot be used inside directives or components or providers that are not decorated with UntilDestroy decorator")}export{G as a,H as b};
