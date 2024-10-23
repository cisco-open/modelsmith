import{a as y,b as _}from"./chunk-GBNVCHMB.js";import{d as p,f as e}from"./chunk-LRK34XDC.js";import{a as w}from"./chunk-QJ55TOIV.js";import{$a as x,Ab as b,ab as u,bb as f,fb as v,ga as h,ib as I,oa as o,p as T,pa as l,sb as a,tb as g}from"./chunk-DL2LTWBU.js";var r,E=(r=class{},r.\u0275fac=function(i){return new(i||r)},r.\u0275cmp=h({type:r,selectors:[["ms-terminal"]],standalone:!0,features:[b],decls:8,vars:0,consts:[["terminal",""],[1,"ms-terminal-wrapper"],[1,"top-terminal-section"],[1,"heading-section-title","mb-1","flex","items-center"],[3,"clearTerminal","scrollToTopTerminal","scrollToBottomTerminal","searchTerminal","disposeSearch"]],template:function(i,c){if(i&1){let s=v();x(0,"div",1)(1,"div",2)(2,"div",3),g(3,"Terminal"),u(),x(4,"div")(5,"ms-terminal-toolbar",4),I("clearTerminal",function(){o(s);let t=a(7);return l(t.clearTerminal())})("scrollToTopTerminal",function(){o(s);let t=a(7);return l(t.scrollToTop())})("scrollToBottomTerminal",function(){o(s);let t=a(7);return l(t.scrollToBottom())})("searchTerminal",function(t){o(s);let A=a(7);return l(A.search(t))})("disposeSearch",function(){o(s);let t=a(7);return l(t.clearSearch())}),u()()(),f(6,"ms-terminal-xterm",null,0),u()}},dependencies:[_,y],styles:[`.xterm{cursor:text;position:relative;user-select:none;-ms-user-select:none;-webkit-user-select:none}.xterm.focus,.xterm:focus{outline:none}.xterm .xterm-helpers{position:absolute;top:0;z-index:5}.xterm .xterm-helper-textarea{padding:0;border:0;margin:0;position:absolute;opacity:0;left:-9999em;top:0;width:0;height:0;z-index:-5;white-space:nowrap;overflow:hidden;resize:none}.xterm .composition-view{background:#000;color:#fff;display:none;position:absolute;white-space:nowrap;z-index:1}.xterm .composition-view.active{display:block}.xterm .xterm-viewport{background-color:#000;overflow-y:scroll;cursor:default;position:absolute;inset:0}.xterm .xterm-screen{position:relative}.xterm .xterm-screen canvas{position:absolute;left:0;top:0}.xterm .xterm-scroll-area{visibility:hidden}.xterm-char-measure-element{display:inline-block;visibility:hidden;position:absolute;top:0;left:-9999em;line-height:normal}.xterm.enable-mouse-events{cursor:default}.xterm.xterm-cursor-pointer,.xterm .xterm-cursor-pointer{cursor:pointer}.xterm.column-select.focus{cursor:crosshair}.xterm .xterm-accessibility:not(.debug),.xterm .xterm-message{position:absolute;inset:0;z-index:10;color:transparent;pointer-events:none}.xterm .xterm-accessibility-tree:not(.debug) *::selection{color:transparent}.xterm .xterm-accessibility-tree{-webkit-user-select:text;user-select:text;white-space:pre}.xterm .live-region{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}.xterm-dim{opacity:1!important}.xterm-underline-1{text-decoration:underline}.xterm-underline-2{text-decoration:double underline}.xterm-underline-3{text-decoration:wavy underline}.xterm-underline-4{text-decoration:dotted underline}.xterm-underline-5{text-decoration:dashed underline}.xterm-overline{text-decoration:overline}.xterm-overline.xterm-underline-1{text-decoration:overline underline}.xterm-overline.xterm-underline-2{text-decoration:overline double underline}.xterm-overline.xterm-underline-3{text-decoration:overline wavy underline}.xterm-overline.xterm-underline-4{text-decoration:overline dotted underline}.xterm-overline.xterm-underline-5{text-decoration:overline dashed underline}.xterm-strikethrough{text-decoration:line-through}.xterm-screen .xterm-decoration-container .xterm-decoration{z-index:6;position:absolute}.xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer{z-index:7}.xterm-decoration-overview-ruler{z-index:8;position:absolute;top:0;right:0;pointer-events:none}.xterm-decoration-top{z-index:2;position:relative}.ms-terminal-wrapper{overflow-x:auto}.ms-terminal-wrapper .terminal-wrapper{border:10px solid var(--terminal-color);background-color:var(--terminal-color);border-radius:10px}.ms-terminal-wrapper .xterm-viewport{overflow-y:auto!important}.ms-terminal-wrapper .top-terminal-section{display:flex;justify-content:space-between}
/*! Bundled license information:

@xterm/xterm/css/xterm.css:
  (**
   * Copyright (c) 2014 The xterm.js authors. All rights reserved.
   * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
   * https://github.com/chjj/term.js
   * @license MIT
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *
   * Originally forked from (with the author's permission):
   *   Fabrice Bellard's javascript vt100 for jslinux:
   *   http://bellard.org/jslinux/
   *   Copyright (c) 2011 Fabrice Bellard
   *   The original design remains. The terminal itself
   *   has been extended to include xterm CSI codes, among
   *   other features.
   *)
*/
`],encapsulation:2}),r);E=T([w()],E);var O=[{key:e.IPG,value:"GraSP pruning"},{key:e.IPM,value:"Magnitude-based init pruning"},{key:e.IPR,value:"Random init pruning"},{key:e.IMP,value:"Iterative Magnitude Pruning"},{key:e.OMP,value:"One-shot Magnitude Pruning"},{key:e.IPS,value:"Init Pruning Snip"},{key:e.IPSY,value:"Init Pruning Synflow"},{key:e.IPMB,value:"Init Pruning Magnitude Both"}],S=[{key:p.BPTQ,value:"Basic PTQ"},{key:p.BRECQ,value:"Brec-q"},{key:p.MINMAXPTQ,value:"Minmax-ptq"}],R=[...O,...S],B=e.IMP,F=m=>R.filter(n=>m.includes(n.key)).map(n=>n.value),D=m=>{let n=O.find(c=>c.value===m);if(n)return n.key;let i=S.find(c=>c.value===m);return i?i.key:null};export{E as a,O as b,S as c,B as d,F as e,D as f};
