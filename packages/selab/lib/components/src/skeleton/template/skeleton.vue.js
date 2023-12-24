"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("vue");require("../../less/components/skeleton/index.css");const n={class:"se-skeleton"},s={key:0,class:"skeleton-avatar"},r={key:0,class:"skeleton-avatar"},c={class:"skeleton-paragraph"},i=e.defineComponent({name:"se-skeleton"}),d=e.defineComponent({...i,props:{avatarShow:{type:Boolean,default:!0},rows:{default:3},active:{type:Boolean,default:!1},titleWidth:{default:"100%"}},setup(o){const t=o;return(a,m)=>(e.openBlock(),e.createElementBlock("div",n,[e.createElementVNode("div",{class:e.normalizeClass(["skeleton-container",a.active?"skeleton-animation":""])},[e.createElementVNode("div",{class:"skeleton-header",style:e.normalizeStyle({marginBottom:t.avatarShow?"0px":"10px"})},[t.avatarShow?(e.openBlock(),e.createElementBlock("div",s)):e.createCommentVNode("",!0),e.createElementVNode("div",{class:"skeleton-title",style:e.normalizeStyle({"--skeleton-title-width":t.titleWidth})},null,4)],4),e.createElementVNode("div",{class:"skeleton-content",style:e.normalizeStyle({marginTop:t.avatarShow?"-10px":"0px"})},[t.avatarShow?(e.openBlock(),e.createElementBlock("div",r)):e.createCommentVNode("",!0),e.createElementVNode("div",c,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.rows,l=>(e.openBlock(),e.createElementBlock("div",{class:"skeleton-paragraph-content",key:l}))),128))])],4)],2)]))}});exports.default=d;
