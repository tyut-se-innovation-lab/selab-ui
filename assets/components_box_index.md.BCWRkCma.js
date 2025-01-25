import{_ as r,B as l,o as h,c as p,G as a,w as E,a as n,j as e,d as o,ar as t}from"./chunks/framework.CGYH__f6.js";const A={};function C(k,s){const i=l("se-box");return h(),p("div",null,[a(i,{type:"primary"},{default:E(()=>s[0]||(s[0]=[n("这是一个 Primary 类型的 Box")])),_:1}),a(i,{type:"secondary"},{default:E(()=>s[1]||(s[1]=[n("这是一个 Secondary 类型的 Box")])),_:1}),a(i,{type:"success",tag:"section"},{default:E(()=>s[2]||(s[2]=[n("这是一个使用 Section 标签的 Box")])),_:1}),a(i,{type:"warning",customClass:"custom-style"},{default:E(()=>s[3]||(s[3]=[n("带有自定义类名的 Box")])),_:1}),a(i,{type:"info"},{default:E(()=>s[4]||(s[4]=[e("p",null,"插槽内容可以是任意的 HTML 或组件。",-1),e("button",null,"这是一个按钮",-1)])),_:1})])}const B=r(A,[["render",C],["__scopeId","data-v-63478156"]]),g=JSON.parse('{"title":"Box(盒子)","description":"","frontmatter":{},"headers":[],"relativePath":"components/box/index.md","filePath":"components/box/index.md","lastUpdated":1737209663000}'),c={name:"components/box/index.md"},y=o({...c,setup(k){return(s,i)=>{const d=l("demo-preview");return h(),p("div",null,[i[0]||(i[0]=t('<h1 id="box-盒子" tabindex="-1">Box(盒子) <a class="header-anchor" href="#box-盒子" aria-label="Permalink to &quot;Box(盒子)&quot;">​</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p><code>Box</code> 组件是一个容器组件，旨在帮助你轻松创建带有不同样式和内容的盒子。它可以用于各种 UI 布局中，支持多种类型的样式、插槽内容、自定义类名等功能。</p><h2 id="预览" tabindex="-1">预览 <a class="header-anchor" href="#预览" aria-label="Permalink to &quot;预览&quot;">​</a></h2>',4)),a(d,{title:"基本使用",description:"展示如何使用基本的 Box 组件，包含不同的类型和插槽内容。",code:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3C!--%20%E6%A1%88%E4%BE%8B%201%EF%BC%9A%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%20--%3E%0A%20%20%20%20%3Cse-box%20type=%22primary%22%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%20Primary%20%E7%B1%BB%E5%9E%8B%E7%9A%84%20Box%3C/se-box%3E%0A%0A%20%20%20%20%3C!--%20%E6%A1%88%E4%BE%8B%202%EF%BC%9A%E5%B8%A6%E6%9C%89%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B%20--%3E%0A%20%20%20%20%3Cse-box%20type=%22secondary%22%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%20Secondary%20%E7%B1%BB%E5%9E%8B%E7%9A%84%20Box%3C/se-box%3E%0A%0A%20%20%20%20%3C!--%20%E6%A1%88%E4%BE%8B%203%EF%BC%9A%E5%8A%A8%E6%80%81%E6%A0%87%E7%AD%BE%20--%3E%0A%20%20%20%20%3Cse-box%20type=%22success%22%20tag=%22section%22%0A%20%20%20%20%20%20%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E4%BD%BF%E7%94%A8%20Section%20%E6%A0%87%E7%AD%BE%E7%9A%84%20Box%3C/se-box%0A%20%20%20%20%3E%0A%0A%20%20%20%20%3C!--%20%E6%A1%88%E4%BE%8B%204%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%90%8D%20--%3E%0A%20%20%20%20%3Cse-box%20type=%22warning%22%20customClass=%22custom-style%22%0A%20%20%20%20%20%20%3E%E5%B8%A6%E6%9C%89%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%90%8D%E7%9A%84%20Box%3C/se-box%0A%20%20%20%20%3E%0A%0A%20%20%20%20%3C!--%20%E6%A1%88%E4%BE%8B%205%EF%BC%9A%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9%20--%3E%0A%20%20%20%20%3Cse-box%20type=%22info%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20#default%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9%E5%8F%AF%E4%BB%A5%E6%98%AF%E4%BB%BB%E6%84%8F%E7%9A%84%20HTML%20%E6%88%96%E7%BB%84%E4%BB%B6%E3%80%82%3C/p%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%8C%89%E9%92%AE%3C/button%3E%0A%20%20%20%20%20%20%3C/template%3E%0A%20%20%20%20%3C/se-box%3E%0A%20%20%3C/div%3E%0A%3C/template%3E%0A%0A%3Cstyle%20scoped%3E%0A/*%20%E7%A4%BA%E4%BE%8B%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F%20*/%0A.custom-style%20%7B%0A%20%20border:%202px%20dashed%20red;%0A%20%20padding:%2010px;%0A%7D%0A%3C/style%3E%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%26%23x3C%3B!--%20%E6%A1%88%E4%BE%8B%201%EF%BC%9A%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%20--%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22primary%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%20Primary%20%E7%B1%BB%E5%9E%8B%E7%9A%84%20Box%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%26%23x3C%3B!--%20%E6%A1%88%E4%BE%8B%202%EF%BC%9A%E5%B8%A6%E6%9C%89%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B%20--%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22secondary%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%20Secondary%20%E7%B1%BB%E5%9E%8B%E7%9A%84%20Box%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%26%23x3C%3B!--%20%E6%A1%88%E4%BE%8B%203%EF%BC%9A%E5%8A%A8%E6%80%81%E6%A0%87%E7%AD%BE%20--%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22success%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20tag%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22section%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E4%BD%BF%E7%94%A8%20Section%20%E6%A0%87%E7%AD%BE%E7%9A%84%20Box%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%26%23x3C%3B!--%20%E6%A1%88%E4%BE%8B%204%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%90%8D%20--%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22warning%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20customClass%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22custom-style%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%3E%E5%B8%A6%E6%9C%89%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%90%8D%E7%9A%84%20Box%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%26%23x3C%3B!--%20%E6%A1%88%E4%BE%8B%205%EF%BC%9A%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9%20--%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22info%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3Edefault%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ep%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9%E5%8F%AF%E4%BB%A5%E6%98%AF%E4%BB%BB%E6%84%8F%E7%9A%84%20HTML%20%E6%88%96%E7%BB%84%E4%BB%B6%E3%80%82%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ep%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ebutton%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%8C%89%E9%92%AE%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ebutton%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ese-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20scoped%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%2F*%20%E7%A4%BA%E4%BE%8B%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F%20*%2F%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E.custom-style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20border%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E2%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20dashed%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20red%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20padding%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E10%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"D:\\project\\selab-ui\\site\\docs\\demos\\box\\box.vue",relativePath:"../../demos/box/box.vue"},{default:E(()=>[a(B)]),_:1}),i[1]||(i[1]=t(`<h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;测试&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><hr><h2 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h2><h2 id="参数说明" tabindex="-1">参数说明 <a class="header-anchor" href="#参数说明" aria-label="Permalink to &quot;参数说明&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数名</th><th>类型</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td><code>type</code></td><td><code>String</code></td><td><code>&#39;&#39;</code></td><td>用于设置 Box 组件的类型，控制其样式。可选值：<code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>info</code>, <code>custom</code></td></tr><tr><td><code>tag</code></td><td><code>String</code></td><td><code>&#39;div&#39;</code></td><td>用于自定义渲染的 HTML 标签。默认是 <code>div</code>，可以选择其他标签（如 <code>section</code>、<code>article</code> 等）。</td></tr><tr><td><code>customClass</code></td><td><code>String</code></td><td><code>&#39;&#39;</code></td><td>为 Box 组件添加额外的自定义类名，方便进行样式扩展和个性化设计。</td></tr><tr><td><code>slots</code></td><td><code>VNode</code></td><td><code>null</code></td><td>支持默认插槽和具名插槽，可以将自定义内容插入到 Box 组件内。</td></tr></tbody></table><hr><h2 id="类型-type-说明" tabindex="-1">类型 (<code>type</code>) 说明 <a class="header-anchor" href="#类型-type-说明" aria-label="Permalink to &quot;类型 (\`type\`) 说明&quot;">​</a></h2><p><code>Box</code> 组件通过 <code>type</code> 参数支持不同的样式。通过设置不同的类型，组件的外观和颜色会发生变化，适应不同的业务需求。以下是可用的类型及其对应样式：</p><ul><li><code>primary</code>: 蓝色主题，适用于需要突出显示的重要内容。</li><li><code>secondary</code>: 灰色主题，适用于次要或辅助性内容。</li><li><code>success</code>: 绿色主题，表示成功或通过的状态。</li><li><code>warning</code>: 黄色主题，表示警告或需要注意的内容。</li><li><code>info</code>: 蓝绿色主题，用于提示信息。</li><li><code>custom</code>: 自定义样式，允许你通过自定义类名来修改样式。</li></ul><h4 id="示例-基础使用" tabindex="-1">示例：基础使用 <a class="header-anchor" href="#示例-基础使用" aria-label="Permalink to &quot;示例：基础使用&quot;">​</a></h4><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;这是一个基础的 Box&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="示例-设置类型" tabindex="-1">示例：设置类型 <a class="header-anchor" href="#示例-设置类型" aria-label="Permalink to &quot;示例：设置类型&quot;">​</a></h4><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;primary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;这是一个 primary 类型的 Box&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;success&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;这是一个 success 类型的 Box&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><hr><h2 id="标签-tag-说明" tabindex="-1">标签 (<code>tag</code>) 说明 <a class="header-anchor" href="#标签-tag-说明" aria-label="Permalink to &quot;标签 (\`tag\`) 说明&quot;">​</a></h2><p><code>tag</code> 属性允许你自定义渲染的 HTML 标签，默认为 <code>div</code>，你可以根据实际需求将其更改为其他标签，如 <code>section</code> 或 <code>article</code>，以增强语义化。</p><h4 id="示例-自定义标签" tabindex="-1">示例：自定义标签 <a class="header-anchor" href="#示例-自定义标签" aria-label="Permalink to &quot;示例：自定义标签&quot;">​</a></h4><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;section&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;这是一个使用 section 标签的 Box&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><hr><h2 id="自定义类名-customclass" tabindex="-1">自定义类名 (<code>customClass</code>) <a class="header-anchor" href="#自定义类名-customclass" aria-label="Permalink to &quot;自定义类名 (\`customClass\`)&quot;">​</a></h2><p>通过 <code>customClass</code> 属性，你可以为 <code>Box</code> 组件添加一个或多个额外的 CSS 类，进而应用定制化的样式。这样，你可以在不修改组件本身的情况下，轻松实现样式定制。</p><h4 id="示例-自定义类名" tabindex="-1">示例：自定义类名 <a class="header-anchor" href="#示例-自定义类名" aria-label="Permalink to &quot;示例：自定义类名&quot;">​</a></h4><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;warning&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> customClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;my-custom-box&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;这是一个带有自定义类名的 Box&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 自定义样式 */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.my-custom-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dashed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#fff4f4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><hr><h2 id="插槽内容-slots" tabindex="-1">插槽内容 (<code>slots</code>) <a class="header-anchor" href="#插槽内容-slots" aria-label="Permalink to &quot;插槽内容 (\`slots\`)&quot;">​</a></h2><p><code>Box</code> 组件支持插槽，可以插入任意的内容（如文本、按钮、图标或其他组件）以增强其灵活性。你可以通过默认插槽或具名插槽来传递内容。</p><h4 id="示例-插槽内容" tabindex="-1">示例：插槽内容 <a class="header-anchor" href="#示例-插槽内容" aria-label="Permalink to &quot;示例：插槽内容&quot;">​</a></h4><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;info&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;这是插槽中的内容，可以是任意 HTML 或组件。&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;点击按钮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><hr><h2 id="高级用法" tabindex="-1">高级用法 <a class="header-anchor" href="#高级用法" aria-label="Permalink to &quot;高级用法&quot;">​</a></h2><h2 id="响应式设计" tabindex="-1">响应式设计 <a class="header-anchor" href="#响应式设计" aria-label="Permalink to &quot;响应式设计&quot;">​</a></h2><p><code>Box</code> 组件支持响应式设计，确保在不同屏幕尺寸下都能良好展示。你可以通过 <code>@media</code> 媒体查询自定义样式，调整 <code>Box</code> 的内边距、字体大小等，确保组件在各种设备上都具有良好的显示效果。</p><h4 id="示例-响应式样式" tabindex="-1">示例：响应式样式 <a class="header-anchor" href="#示例-响应式样式" aria-label="Permalink to &quot;示例：响应式样式&quot;">​</a></h4><div class="language-less vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">less</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">max-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">768</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    .se-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">14</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><hr><h2 id="其他说明" tabindex="-1">其他说明 <a class="header-anchor" href="#其他说明" aria-label="Permalink to &quot;其他说明&quot;">​</a></h2><ol><li><strong>交互效果</strong>：所有类型的 <code>Box</code> 都包含简单的 <code>hover</code> 效果，在鼠标悬停时，组件的背景色和边框颜色会发生变化，提供用户交互反馈。</li><li><strong>默认样式</strong>：<code>Box</code> 组件自带基础的边框、圆角、内边距等样式，可根据需要通过 <code>type</code>、<code>customClass</code> 和 <code>tag</code> 属性进行扩展。</li><li><strong>主题支持</strong>：<code>Box</code> 组件通过不同的 <code>type</code> 属性支持多种视觉主题，适应不同的 UI 风格和设计需求。</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p><code>Box</code> 组件是一个灵活的容器，支持通过参数配置、插槽内容和自定义样式进行定制，适用于各种 UI 布局。它使得在 Vue 项目中创建容器变得更加简便和高效。</p>`,41))])}}});export{g as __pageData,y as default};
