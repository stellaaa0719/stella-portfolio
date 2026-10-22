(()=>{const status=document.getElementById('contact-status');document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);status.textContent='已复制，可粘贴使用。';}catch{status.textContent='请选中号码手动复制。';}}));})();

(()=>{
'use strict';
const section=document.getElementById('about-me');if(!section)return;
const cards=[...section.querySelectorAll('.career-record,.education-item')];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const enabled=()=>!reduced.matches&&document.documentElement.dataset.motion!=='off';
const timers=new WeakMap();
for(const card of cards){
 const activate=()=>{if(enabled())card.classList.add('is-star-active');};
 const relax=()=>{clearTimeout(timers.get(card));timers.set(card,setTimeout(()=>card.classList.remove('is-star-active'),550));};
 card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){clearTimeout(timers.get(card));activate();}});
 card.addEventListener('pointerleave',relax);
 card.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.pointerType==='pen'){activate();clearTimeout(timers.get(card));timers.set(card,setTimeout(()=>card.classList.remove('is-star-active'),1500));}},{passive:true});
 card.addEventListener('focusin',activate);
 card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget))relax();});
}
let observer=null;
function showAll(){observer?.disconnect();cards.forEach(card=>{card.classList.add('profile-visible');card.classList.remove('is-star-active');});}
if(enabled()&&'IntersectionObserver' in window){
 observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('profile-visible');observer.unobserve(entry.target);}}},{threshold:.08,rootMargin:'0px 0px -15px 0px'});
 for(const card of cards){card.classList.add('profile-reveal');observer.observe(card);}
}
new MutationObserver(()=>{if(!enabled())showAll();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
reduced.addEventListener('change',()=>{if(!enabled())showAll();});
})();
