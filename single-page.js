(()=>{
'use strict';
const status=document.getElementById('contact-status');
async function copyContact(value){try{await navigator.clipboard.writeText(value);status.textContent='已复制，可粘贴使用。';}catch{status.textContent='请选中联系方式手动复制。';}}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copyContact(button.dataset.copy)));
const reveal=document.querySelector('[data-reveal-wechat]');
if(reveal)reveal.addEventListener('click',()=>{
 const value=document.getElementById('wechat-value');
 if(value.hidden){value.hidden=false;document.getElementById('wechat-placeholder').hidden=true;reveal.setAttribute('aria-expanded','true');reveal.setAttribute('aria-label','复制微信号');reveal.textContent='复制';status.textContent='微信号已显示。';}
 else copyContact(value.textContent);
});
})();
