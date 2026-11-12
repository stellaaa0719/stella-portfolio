(()=>{
'use strict';
const frame=document.getElementById('platform-demo-frame');
if(!frame)return;
const requestHeight=()=>frame.contentWindow?.postMessage({type:'stella-demo-measure'},location.origin);
frame.addEventListener('load',requestHeight);
requestHeight();
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off';
window.addEventListener('message',event=>{
 if(event.source!==frame.contentWindow||event.origin!==location.origin||event.data?.type!=='stella-demo-size')return;
 const height=Number(event.data.height);
 if(!Number.isFinite(height)||height<200||height>5000)return;
 const next=Math.ceil(height);
 if(Math.abs(frame.getBoundingClientRect().height-next)>2)frame.style.height=next+'px';
});
document.querySelectorAll('[data-start-demo]').forEach(link=>link.addEventListener('click',()=>{
 frame.contentWindow?.postMessage({type:'stella-demo-start'},location.origin);
 document.getElementById('experience').scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});
}));
const comparison={
 before:['逐个网站查看，再手工复制和整理。','沟通散落在聊天里，下次重新找背景。','重新搜政策、翻案例，从头准备方案。'],
 after:['按来源汇集，结合能力形成调查方向。','关联已有对象，确认后沉淀客户反馈。','复用确认信息，按依据写作与修订。']
};
function setComparison(mode){
 for(const key of ['before','after'])document.getElementById(key+'-mode')?.setAttribute('aria-pressed',String(key===mode));
 document.querySelectorAll('#work-comparison p').forEach((p,i)=>{p.textContent=comparison[mode][i];});
}
document.getElementById('before-mode')?.addEventListener('click',()=>setComparison('before'));
document.getElementById('after-mode')?.addEventListener('click',()=>setComparison('after'));
})();
