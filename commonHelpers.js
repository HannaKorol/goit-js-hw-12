import{S as d,i as n}from"./assets/vendor-0fc460d7.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="https://pixabay.com/api/",m="45296804-0fb55f0e1381bd4cbf585a7a5";function p(i){const o=new URLSearchParams({key:m,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${f}?${o.toString()}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).catch(t=>{throw console.error("Image Search Error:",t),t})}const c=document.querySelector(".gallery-list");function h(i){const o=i.map(({webformatURL:t,largeImageURL:s,tags:e,likes:r,views:a,comments:l,downloads:u})=>`
    <li>
    <a href="${s}">
        <img src="${t}" alt="${e}"/>
        </a>
        <div class="text-wrapper">
    <div class="stat"><p><b>Likes:</b> ${r}</p></div>
    <div class="stat"><p><b>Views:</b> ${a}</p> </div>
    <div class="stat"><p><b>Comments:</b> ${l}</p></div>
    <div class="stat"><p><b>Downloads:</b> ${u}</p></div>
        </div>
    </li>
    `).join("");c.insertAdjacentHTML("beforeend",o),new d(".gallery-list a",{captionsData:"alt",captionsDelay:250}).refresh()}function y(){c.innerHTML=""}function g(){document.querySelector(".loader").classList.remove("hidden")}function b(){document.querySelector(".loader").classList.add("hidden")}const L=document.querySelector(".form-search");L.addEventListener("submit",i=>{i.preventDefault();const o=i.currentTarget.elements.query,t=o.value.trim().toLowerCase();if(!t){n.error({message:"Please enter a search query!",position:"topRight"});return}y(),g(),p(t).then(s=>{s.hits.length===0?n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):h(s.hits)}).catch(s=>{n.error({title:"Error",message:s.message})}).finally(()=>{b(),o.value=""})});
//# sourceMappingURL=commonHelpers.js.map
