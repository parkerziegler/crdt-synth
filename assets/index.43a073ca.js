var K=Object.defineProperty,Y=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var I=(t,e,n)=>e in t?K(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,u=(t,e)=>{for(var n in e||(e={}))G.call(e,n)&&I(t,n,e[n]);if(B)for(var n of B(e))J.call(e,n)&&I(t,n,e[n]);return t},g=(t,e)=>Y(t,X(e));var h=(t,e,n)=>(I(t,typeof e!="symbol"?e+"":e,n),n),Q=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};var j=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)};var L=(t,e,n)=>(Q(t,e,"access private method"),n);import{a as S,l as Z,b as ee,c as te,u as E,r as m,j as s,d as c,F as A,e as b,f as F,D as ne,C as oe,P as re,H as se,g as ae,v as ie,h as le}from"./vendor.65d96efa.js";const ce=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};ce();const de=5,C=10,fe=()=>{const e=Math.random()>.5?"add":"rmv";return[e,e==="add"?"rmv":"add"]},he=()=>{const t=Math.random();if(t<.33){const e=Math.random()>.5?"add":null;return["add",e]}else if(t<.66){const e=Math.random()>.5?"rmv":null;return["rmv",e]}else{const e=Math.random()>.5?"add":"rmv";return[null,e]}},ue=()=>{const t={1:[],2:[]},e=Z(1,3),n=new Array(e).fill(void 0).map(()=>{const[a,l]=fe(),d={type:a,payload:Math.floor(Math.random()*C),reconciled:!1,first:!0},p={type:l,payload:Math.floor(Math.random()*C),reconciled:!1,first:!1};return[d,p]}),r=de-e,o=new Array(r).fill(void 0).map(()=>{const[a,l]=he(),d={type:a,payload:Math.floor(Math.random()*C),reconciled:!1,first:!0},p={type:l,payload:Math.floor(Math.random()*C),reconciled:!1,first:!1};return[d,p]}),i=ee(n.concat(o));for(const[a,[l,d]]of i.entries())t["1"].push(g(u({},l),{id:`operation_${a}`})),t["2"].push(g(u({},d),{id:`operation_${a}`}));return t},x=S(ue()),_={add:1,rmv:0},pe=S(t=>{const e=t(x);return te(e["1"],e["2"]).map(([n,r])=>{const o=n!=null&&n.type?_[n.type]:-1,i=r!=null&&r.type?_[r.type]:-1;return n!=null&&n.first?[o,i]:[i,o]})}),H=t=>{const e=[];for(let n=0;n<t["1"].length;n++){const[r,o]=[t["1"][n],t["2"][n]],i=r.type==="add"&&o.type==="rmv"||r.type==="rmv"&&o.type==="add",a=!r.reconciled||!o.reconciled;i&&a&&e.push({op1:r,op2:o,index:n})}return e},me=t=>H(t).map(({index:n})=>n),V=S(t=>{const e=t(x);return me(e)}),D=({winner:t,index:e})=>{const[n,r]=E(x),o=m.exports.useCallback(()=>{[n["1"][e],n["2"][e]].forEach(a=>{a.first=a.type!==t,a.reconciled=!0}),r(u({},n))},[t,n]);return s("button",{className:"flex border border-white p-2 hover:bg-neon-white",onClick:o,children:t==="add"?c(A,{children:[s("span",{className:"w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative mr-4 shrink-0"}),s("span",{className:"w-6 h-6 rounded-full bg-neon-light border border-neon shrink-0"})]}):c(A,{children:[s("span",{className:"w-6 h-6 rounded-full bg-neon-light border border-neon mr-4 shrink-0"}),s("span",{className:"w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative shrink-0"})]})})},ge=({index:t})=>{const e=b(x),n=e["1"][t].first?e["2"][t].type:e["1"][t].type;return s("div",{className:"w-48 flex flex-col stack-v items-center justify-center shrink-0",children:n==="add"?c(A,{children:[c("div",{className:"flex stack",children:[s("span",{className:"w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative shrink-0"}),s("span",{className:"w-6 h-6 rounded-full bg-neon-light border border-neon shrink-0"})]}),s("span",{className:"text-neon text-xl",children:"Add Wins"})]}):c(A,{children:[c("div",{className:"flex stack",children:[s("span",{className:"w-6 h-6 rounded-full bg-neon-light border border-neon shrink-0"}),s("span",{className:"w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative shrink-0"})]}),s("span",{className:"text-neon-negative text-xl",children:"Remove Wins"})]})})},xe=(t,e)=>t["1"][e].type!==null&&t["2"][e].type!==null&&t["1"][e].reconciled&&t["2"][e].reconciled&&t["1"][e].type!==t["2"][e].type,ve=()=>{const t=b(x),n=b(V)[0];return c("div",{className:"flex items-center stack relative font-mono",children:[s("span",{className:"text-white text-3xl font-bold p-6 shrink-0 mr-auto invisible basis-60",children:"Conflicts"}),t["1"].map((r,o)=>o===n?c("div",{className:"w-48 flex flex-col stack-v items-center justify-center shrink-0",children:[s("span",{className:"text-neon-caution text-xl",children:"Select Ordering"}),c("div",{className:"flex stack",children:[s(D,{index:o,winner:"add"}),s(D,{index:o,winner:"rmv"})]})]},r.id):xe(t,o)?s(ge,{index:o},r.id):s("div",{className:"w-48 flex stack items-center justify-center shrink-0"},r.id))]})},be=()=>{const[t,e]=E(x),n=m.exports.useCallback(r=>()=>{const o={};for(const i in t){const a={type:r,id:`operation_${t[i].length}`,payload:0,reconciled:!1,first:i==="1"};o[i]=t[i].concat(a)}e(o)},[t]);return c("div",{className:"col-span-12 flex stack font-mono items-center p-10 border-b border-b-outline",children:[s("h1",{className:"text-neon-caution text-5xl flex-1 font-bold",children:"Set CRDT Visualizer"}),s("button",{className:"text-neon text-2xl border border-neon px-8 py-4 hover:bg-neon-light transition-colors",onClick:n("add"),children:"Add +"}),s("button",{className:"text-neon-negative text-2xl border border-neon-negative px-8 py-4 hover:bg-neon-negative-light transition-colors",onClick:n("rmv"),children:"Remove -"})]})},ye=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:s("polyline",{points:"18 15 12 9 6 15"})}),we=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:s("polyline",{points:"6 9 12 15 18 9"})}),Ne=({draggableProps:t,dragHandleProps:e,operation:n,innerRef:r,replicaId:o})=>{const[i,a]=m.exports.useState(!1),[l,d]=E(x),p=m.exports.useRef(null),v=m.exports.useCallback(f=>{if(f>9||f<0)return;const y=l[o].findIndex(U=>U.id===n.id),w=Array.from(l[o]);w[y].payload=f;const W=g(u({},l),{[o]:w});d(W)},[l,n]),O=m.exports.useCallback(f=>{p.current=f,r(f)},[r]);return m.exports.useEffect(()=>{const f=y=>{var w;!((w=p.current)!=null&&w.contains(y.target))&&i&&a(!1)};return document.addEventListener("mousedown",f),()=>{document.removeEventListener("mousedown",f)}},[i]),s("div",g(u(u({ref:O,className:F("flex items-center justify-center shrink-0 relative h-48 w-48 rounded-full font-mono font-bold text-2xl border",{"bg-neon-light text-neon border-neon":n.type==="add","bg-neon-negative-light text-neon-negative border-neon-negative":n.type==="rmv",invisible:n.type===null})},t),e),{children:i?c("span",{className:"flex items-center",children:[n.type,"(",s("input",{type:"number",className:"ml-2 bg-canvas w-8 px-2",value:n.payload,onChange:f=>v(+f.target.value),onKeyDown:f=>{f.code==="Enter"&&a(!1)}}),c("div",{className:"flex flex-col",children:[s("button",{onClick:()=>v(n.payload+1),children:ye}),s("button",{onClick:()=>v(n.payload-1),children:we})]}),")"]}):c("span",{onDoubleClick:()=>a(!0),children:[n.type,"(",n.payload,")"]})}))},ke=(t,e,n)=>{const r=Array.from(t),[o]=r.splice(e,1);return r.splice(n,0,o),r},z=({replicaId:t})=>{const[e,n]=E(x),r=m.exports.useCallback(o=>{if(!o.destination)return;const i=ke(e[t],o.source.index,o.destination.index),a=g(u({},e),{[t]:i});for(const l in a)for(const[d,p]of a[l].entries())d>=o.destination.index&&(p.reconciled=!1);n(a)},[e]);return s(ne,{onDragEnd:r,children:s(oe,{droppableId:"replica",direction:"horizontal",children:o=>c("div",{className:"flex items-center stack",children:[c("span",{className:"text-white text-3xl font-bold font-mono p-6 shrink-0 basis-60",children:["Replica ",t]}),c("div",g(u({ref:o.innerRef,className:"flex stack"},o.droppableProps),{children:[e[t].map((i,a)=>s(re,{draggableId:i.id,index:a,children:l=>s(Ne,{innerRef:l.innerRef,draggableProps:l.draggableProps,dragHandleProps:l.dragHandleProps,operation:i,replicaId:t})},i.id)),o.placeholder]}))]})})})},q=(t,e)=>{switch(e.type){case"add":t.add(e.payload);break;case"rmv":t.delete(e.payload);break}},Oe=(t,e)=>{const n=H(t)[0],r=n&&e>n.index?n.index:e;if(e>r)return null;const o=new Set,i=new Set;for(let a=0;a<=r;a++)(t["1"][a].first?[t["1"][a],t["2"][a]]:[t["2"][a],t["1"][a]]).forEach(d=>{q(o,d)});for(let a=0;a<=r;a++){const l=t["1"][a].first?[t["1"][a],t["2"][a]]:[t["2"][a],t["1"][a]];!l[0].reconciled&&!l[1].reconciled&&l.reverse(),l.forEach(d=>{q(i,d)})}return[o,i]};function R(t){const e=Array.from(t);return e.length===0?"{}":"{"+e.slice(1).reduce((n,r)=>n.concat(`, ${r}`),`${e[0]}`)+"}"}function Ce(t,e){return t.size===e.size&&Array.from(t).every(n=>e.has(n))}const Ae=()=>{const t=b(x),e=new Array(t["1"].length).fill(void 0).map((n,r)=>Oe(t,r));return c("div",{className:"flex items-top stack",children:[s("span",{className:"text-white text-3xl font-bold font-mono p-6 shrink-0 basis-60",style:{marginRight:"auto"},children:"State"}),e.map((n,r)=>{if(n===null)return s("span",{className:"text-white text-2xl font-bold w-48 flex justify-center shrink-0 p-6"},r);const[o,i]=n;return s("span",{className:"text-white text-2xl font-bold w-48 flex justify-center shrink-0 py-6",children:Ce(o,i)?R(o):`${R(o)} or ${R(i)}`},r)})]})},Pe=()=>c("div",{className:"flex flex-col col-span-12 lg:col-span-8",children:[s(be,{}),c("div",{className:"flex flex-col justify-center flex-1 stack-v mx-auto max-w-full p-10 overflow-auto",children:[s(z,{replicaId:"1"}),s(z,{replicaId:"2"}),s(Ae,{}),s(ve,{})]})]});var $,Te;class k{constructor(e){j(this,$);h(this,"bool");h(this,"tag","BoolLit");this.bool=e}show(){return`BoolLit(${L(this,$,Te).call(this)})`}format(){return`def inOrder(arg1, arg2):
  ${this.show()}
  `}evaluate(e){return this.bool}}$=new WeakSet,Te=function(){return this.bool.toString().charAt(0).toUpperCase()+this.bool.toString().slice(1)};class P{constructor(e){h(this,"int");h(this,"tag","IntLit");this.int=e}show(){return`IntLit(${this.int})`}format(){return`def inOrder(arg1, arg2):
  ${this.show()}
  `}evaluate(e){return this.int}}class T{constructor(e){h(this,"name");h(this,"tag","Var");this.name=e}show(){return this.name}format(){return`def inOrder(arg1, arg2):
  ${this.show()}
  `}evaluate(e){return this.name==="arg1[0]"?e[0]:e[1]}}class N{constructor(e,n){h(this,"left");h(this,"right");h(this,"tag","Eq");this.left=e,this.right=n}show(){return`Eq(${this.left.show()}, ${this.right.show()})`}format(){return`def inOrder(arg1, arg2):
  ${this.show()}
  `}evaluate(e){return this.left.evaluate(e)===this.right.evaluate(e)}}class M{constructor(e){h(this,"expr");h(this,"tag","Not");this.expr=e}show(){return`Not(${this.expr.show()})`}format(){return`def inOrder(arg1, arg2):
  ${this.show()}
  `}evaluate(e){return!this.expr.evaluate(e)}}class $e{constructor(e,n,r){h(this,"guard");h(this,"ifBody");h(this,"elseBody");this.guard=e,this.ifBody=n,this.elseBody=r}show(){return`Ite(
    ${this.guard.show()},
    ${this.ifBody.show()},
    ${this.elseBody.show()}
  )`}format(){return`def inOrder(arg1, arg2):
  ${this.show()}
  `}evaluate(e){return this.guard.evaluate(e)?this.ifBody.evaluate(e):this.elseBody.evaluate(e)}}function Ee(t){const e=[];for(const n of t)(n instanceof k||n instanceof N)&&e.push(new M(n));for(const n of t)for(const r of t)(n instanceof P||n instanceof T)&&(r instanceof P||r instanceof T)&&n!==r&&e.push(new N(n,r));for(const n of t)for(const r of t)for(const o of t)n instanceof N&&(r instanceof k||r instanceof N||r instanceof M)&&(o instanceof k||o instanceof N||o instanceof M)&&e.push(new $e(n,r,o));return t.concat(e)}function Ie(t,e){const n=t.show().includes("arg1")&&t.show().includes("arg2"),r=e.every(o=>t.evaluate(o)===!0);return n&&r}function Re(t){let e=[new k(!0),new k(!1),new T("arg1[0]"),new T("arg2[0]"),new P(0),new P(1)];const n=[];for(let r=0;r<2;r++){e=Ee(e);for(const o of e)Ie(o,t)&&!n.includes(o)&&n.push(o)}return n}const Me=()=>{const t=b(pe),e=b(V),n=m.exports.useMemo(()=>e.length===0?Re(t):[],[e,t]);return c("div",{className:"col-span-12 lg:col-span-4 flex lg:flex-col font-mono border-l border-l-outline overflow-hidden",children:[c("div",{className:"flex justify-between items-center p-8",children:[s("h2",{className:"text-4xl font-mono text-neon border-b border-b-outline text-vertical lg:text-horizontal",children:"Candidates"}),n.length>0?c("span",{className:"text-xl ml-auto text-white",children:[n.length," programs synthesized"]}):null]}),e.length>0?s("p",{className:"p-8 text-3xl font-mono text-white",children:"Resolve commutative conflicts to see synthesized candidates..."}):s("ul",{className:"overflow-auto",children:n.map((r,o)=>s("li",{children:s(se,g(u({},ae),{code:r.format(),language:"python",theme:ie,children:({className:i,style:a,tokens:l,getLineProps:d,getTokenProps:p})=>s("pre",{className:F("p-8 text-2xl overflow-x-auto shrink-0 border-b border-b-outline",i),style:a,children:l.map((v,O)=>c("div",g(u({},d({line:v,key:O})),{className:"table-row",children:[s("span",{className:"table-cell pr-4 text-right select-none opacity-50",children:O+1}),v.map((f,y)=>s("span",u({},p({token:f,key:y}))))]})))})}))},o))})]})},Se=()=>c("div",{className:"absolute inset-0 bg-canvas grid grid-cols-12",children:[s(Pe,{}),s(Me,{})]});le.exports.render(s(m.exports.StrictMode,{children:s(Se,{})}),document.getElementById("root"));