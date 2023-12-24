"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("vue");require("../../less/components/select/index.css");const _={class:"se-select-wrapper"},k={class:"se-select-selection-tags"},g=["onClick"],E={class:"se-select-selection-search"},w=["value"],C={class:"se-select-dropdown"},V=["onClick"],B=e.defineComponent({name:"se-select"}),y=e.defineComponent({...B,props:{placeholder:{default:"请输入内容"},options:{},multiple:{type:Boolean,default:!1},autoClearSearchValue:{type:Boolean,default:!0}},setup(d){const l=d,o=e.ref(""),i=e.computed(()=>l.multiple&&o.value?l.options.filter(t=>t.value.includes(o.value)):l.options),a=e.ref(!1),n=e.ref(["a1","b3"]),v=t=>{o.value=t.target.value,a.value=o.value.length>0},p=()=>{console.log(55),a.value=!1},f=t=>{if(!l.multiple){a.value=!1,o.value=t.value;return}l.autoClearSearchValue&&(o.value="");const s=n.value.indexOf(t.value);s>-1?n.value.splice(s,1):n.value.push(t.value)},h=t=>{n.value=n.value.filter(s=>s!==t)};e.watchEffect(()=>{}),e.ref(6);const u=e.ref();return(t,s)=>{const m=e.resolveDirective("click-outside");return e.withDirectives((e.openBlock(),e.createElementBlock("div",{class:"se-select",onClick:s[1]||(s[1]=c=>{var r;return(r=u.value)==null?void 0:r.focus()})},[e.createElementVNode("div",_,[l.multiple?(e.openBlock(!0),e.createElementBlock(e.Fragment,{key:0},e.renderList(n.value,c=>(e.openBlock(),e.createElementBlock("div",k,[e.createElementVNode("span",null,e.toDisplayString(c),1),e.createElementVNode("span",{class:"se-select-selection-tag-close",onClick:r=>h(c)},"x",8,g)]))),256)):e.createCommentVNode("",!0),e.createElementVNode("div",E,[e.createElementVNode("input",{ref_key:"inputRef",ref:u,class:"se-select-search-input",type:"text",onInput:v,value:o.value,onClick:s[0]||(s[0]=c=>a.value=!0)},null,40,w)]),e.withDirectives(e.createElementVNode("div",{class:"se-select-selection-placeholder"},e.toDisplayString(l.placeholder),513),[[e.vShow,o.value==""&&l.placeholder&&n.value.length<0]])]),e.withDirectives(e.createElementVNode("div",C,[e.createElementVNode("div",{class:"se-select-dropdown-wrapper",style:e.normalizeStyle({height:i.value.length*32+"px"})},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(i.value,c=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["se-select-dropdown-item",n.value.includes(c.value)?"se-select-dropdown-item-selected":""]),onClick:r=>f(c)},e.toDisplayString(c.value),11,V))),256))],4)],512),[[e.vShow,a.value]])])),[[m,p]])}}});exports.default=y;
