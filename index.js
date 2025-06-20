import{a as b,S as L}from"./assets/vendor-CigWwf1c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const S="50968797-ac4ce653463231c04fcc57188",q="https://pixabay.com/api/";async function w(e,r=1,s=15){const n={key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:s};return(await b.get(q,{params:n})).data}function v(e){return e.map(({webformatURL:r,largeImageURL:s,tags:n,likes:t,views:o,comments:a,downloads:h})=>`
      <li class="gallery-item">
        <a href="${s}">
          <img src="${r}" alt="${n}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${t}</p>
          <p><b>Views</b> ${o}</p>
          <p><b>Comments</b> ${a}</p>
          <p><b>Downloads</b> ${h}</p>
        </div>
      </li>
    `).join("")}function M(e){document.querySelector(".gallery").insertAdjacentHTML("beforeend",e)}function p(){const e=document.querySelector(".gallery");e.innerHTML=""}function l(e=!0){const r=document.querySelector(".load-more");r&&(r.style.display=e?"block":"none")}function c(){const e=document.querySelector(".end-message");e&&(e.style.display="block")}function f(){const e=document.querySelector(".end-message");e&&(e.style.display="none")}let i=1,d="",m=0,u=null;const y=document.querySelector("form"),E=document.querySelector(".load-more");document.querySelector(".end-message");l(!1);f();y.addEventListener("submit",async e=>{e.preventDefault(),p(),l(!1),f(),d=y.elements.search.value.trim(),d&&(i=1,await g())});E.addEventListener("click",async()=>{i+=1,await g()});async function g(){try{const{hits:e,totalHits:r}=await w(d,i);if(m=r,i===1&&p(),e.length===0){l(!1),c();return}M(v(e)),u?u.refresh():u=new L(".gallery a");const s=Math.ceil(m/15);if(i<s?(l(!0),f()):(l(!1),c()),i>1){const n=document.querySelector(".gallery").firstElementChild;if(n){const{height:t}=n.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}}catch(e){console.error(e),l(!1),c()}}
//# sourceMappingURL=index.js.map
