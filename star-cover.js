(() => {
'use strict';
const canvas=document.getElementById('world-stars');
if(!canvas)return;
const ctx=canvas.getContext('2d',{alpha:false});
if(!ctx)return;
const stage=document.getElementById('night-stage');
const hero=document.querySelector('.sky-hero');
const status=document.getElementById('sky-status');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let seed=719;
function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
const lerp=(a,b,t)=>a+(b-a)*t;
// Hand-drawn, deliberately generalized continent silhouettes; no political borders.
const land=[
 [[-168,70],[-151,72],[-140,69],[-131,58],[-125,51],[-124,41],[-117,32],[-111,29],[-105,23],[-98,19],[-91,18],[-86,16],[-83,10],[-79,9],[-83,17],[-88,21],[-85,25],[-81,25],[-80,32],[-75,35],[-70,43],[-60,49],[-55,53],[-63,59],[-74,62],[-81,67],[-96,70],[-112,73],[-128,70],[-143,72]],
 [[-73,59],[-52,60],[-40,67],[-27,76],[-36,82],[-51,82],[-63,76],[-66,67]],
 [[-81,12],[-72,11],[-64,10],[-59,6],[-51,4],[-48,-1],[-35,-6],[-39,-16],[-44,-23],[-49,-29],[-53,-34],[-59,-40],[-65,-52],[-70,-55],[-74,-48],[-75,-35],[-71,-24],[-75,-15],[-80,-5]],
 [[-10,36],[-10,44],[-6,48],[-3,49],[2,51],[8,54],[9,58],[4,59],[8,63],[16,70],[25,71],[31,69],[28,61],[35,61],[43,65],[56,69],[68,73],[91,76],[112,73],[128,72],[140,69],[161,69],[179,65],[176,59],[163,57],[153,51],[142,47],[139,40],[130,35],[123,30],[120,22],[113,19],[108,12],[104,2],[100,4],[97,13],[90,22],[86,22],[81,8],[77,8],[72,20],[68,24],[60,25],[56,20],[52,16],[43,13],[38,20],[34,29],[35,34],[29,37],[25,40],[22,37],[16,40],[12,43],[7,44],[0,41],[-5,36]],
 [[-17,35],[-5,36],[9,36],[16,32],[24,32],[33,30],[36,22],[43,12],[51,11],[44,2],[41,-12],[35,-20],[32,-29],[25,-35],[18,-34],[12,-22],[11,-11],[8,-4],[1,5],[-8,5],[-14,11],[-17,21]],
 [[113,-22],[116,-20],[122,-16],[130,-12],[137,-12],[141,-17],[144,-12],[146,-19],[153,-27],[150,-35],[144,-39],[135,-35],[129,-32],[120,-34],[114,-29]],
 [[47,-13],[50,-17],[49,-24],[45,-26],[44,-20]],
 [[131,32],[136,34],[140,40],[142,45],[145,43],[143,37],[138,33]],
 [[-8,50],[-5,50],[0,53],[-3,58],[-6,57]],
 [[-25,64],[-20,66],[-14,65],[-17,63]],
 [[95,5],[99,1],[104,-5],[101,-6],[97,-1]],
 [[105,-6],[115,-8],[122,-9],[115,-5]],
 [[109,6],[118,7],[119,1],[113,-4],[109,-1]],
 [[120,18],[124,15],[126,8],[122,7]],
 [[131,-3],[141,-3],[150,-8],[145,-11],[137,-8]],
 [[166,-35],[173,-39],[178,-38],[174,-42],[168,-46],[165,-44]],
 [[-84,23],[-75,21],[-78,19],[-85,21]]
];
const project=([lon,lat])=>[(lon+180)/360*1000,(82-lat)/148*480];
const polygons=land.map(poly=>poly.map(project));
function contains(x,y,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
const points=[];
function add(x,y,coast){points.push({u:x,v:y,coast,phase:random()*Math.PI*2,jx:(random()-.5)*(coast?13:25),jy:(random()-.5)*(coast?13:25),r:.55+random()*.76,alpha:.46+random()*.46,energy:0,x:0,y:0,s:random()});}
for(const poly of polygons){for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];const n=Math.max(1,Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/13));for(let j=0;j<n;j++){if(random()>.13)add(lerp(a[0],b[0],j/n)+(random()-.5)*3,lerp(a[1],b[1],j/n)+(random()-.5)*3,true);}}}
for(let y=24;y<460;y+=17){for(let x=20;x<985;x+=18){const px=x+(random()-.5)*13,py=y+(random()-.5)*13;if(random()<.62&&polygons.some(poly=>contains(px,py,poly)))add(px,py,false);}}
const sOrder=points.map((p,i)=>({s:p.s,i})).sort((a,b)=>a.s-b.s);
const edges=[];
points.forEach((p,i)=>{const neighbors=[];points.forEach((q,j)=>{if(i===j)return;const d=Math.hypot(p.u-q.u,p.v-q.v);if(d>7&&d<34)neighbors.push({j,d});});neighbors.sort((a,b)=>a.d-b.d);neighbors.slice(0,p.coast?2:3).forEach(({j,d})=>{if(j>i)edges.push({a:i,b:j,d});});});
const mobileEdges=[];
points.forEach((p,i)=>{if(i%3!==0)return;const near=[];points.forEach((q,j)=>{if(j%3!==0||i===j)return;const d=Math.hypot(p.u-q.u,p.v-q.v);if(d>8&&d<66)near.push({j,d});});near.sort((a,b)=>a.d-b.d);near.slice(0,2).forEach(({j,d})=>{if(j>i)mobileEdges.push({a:i,b:j,d});});});
const background=Array.from({length:85},()=>({u:random(),v:random(),r:.30+random()*.72,alpha:.23+random()*.38,phase:random()*6.28,cross:random()<.055}));
let width=0,height=0,dpr=1,frame=0,last=0,visible=true,progress=0,scrollDirty=true,shapeStart=0,staticShape=false,shapeTimer=0;
let layout={x:0,y:0,w:0,h:0};
const pointer={x:-10000,y:-10000,at:-10000,down:false};
const portals=[...document.querySelectorAll('.star-portal')];
const dust=[];let lastDust=0;
function textAttenuation(x,y){if(width<=700)return 1;const dx=(x-width*.5)/(width*.28),dy=(y-height*.65)/(height*.27);return .27+.73*smooth(Math.hypot(dx,dy));}
function emitDust(x,y,burst=false){if(!motionEnabled()||progress>.45)return;const now=performance.now();if(!burst&&now-lastDust<20)return;lastDust=now;const n=burst?8:2;for(let i=0;i<n;i++){dust.push({x:x+9+(random()-.5)*9,y:y+9+(random()-.5)*9,vx:(random()-.5)*.018,vy:(random()-.4)*.018,born:now,life:650+random()*400,r:.65+random()*.85,star:i===0||random()<.22});}if(dust.length>80)dust.splice(0,dust.length-80);}
function drawDust(now){if(!motionEnabled())return;for(let i=dust.length-1;i>=0;i--){const d=dust[i],age=now-d.born;if(age>d.life){dust.splice(i,1);continue;}const t=age/d.life,x=d.x+d.vx*age,y=d.y+d.vy*age;const alpha=(1-t)*( .70+.20*Math.sin(t*Math.PI))*(1-progress);ctx.globalAlpha=alpha;ctx.fillStyle='#d2e0e7';ctx.beginPath();ctx.arc(x,y,d.r*(1-t*.35),0,Math.PI*2);ctx.fill();if(d.star){const r=(2+d.r)*(1-t*.5);ctx.globalAlpha=alpha*.7;ctx.strokeStyle='#c5d9e4';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x-r,y);ctx.lineTo(x+r,y);ctx.moveTo(x,y-r);ctx.lineTo(x,y+r);ctx.stroke();}}
 const age=now-pointer.at;if(age<300&&progress<.45){const alpha=(1-age/300)*.75,x=pointer.x+9,y=pointer.y+9;ctx.globalAlpha=alpha;ctx.strokeStyle='#e1ebef';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.moveTo(x-2,y-2);ctx.lineTo(x+2,y+2);ctx.moveTo(x+2,y-2);ctx.lineTo(x-2,y+2);ctx.stroke();}ctx.globalAlpha=1;
}
function motionEnabled(){return !reduced.matches&&document.documentElement.dataset.motion!=='off';}
function size(){width=window.innerWidth;height=window.innerHeight;dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);const mobile=width<=700;let w=mobile?width*1.12:Math.min(width*.87,1550);if(!mobile)w=Math.min(w,height*.72/0.48);layout={x:mobile?(width-w)*.5:width-w-width*.035,y:mobile?Math.max(96,height*.12):height*.14,w,h:w*.48};updateScroll();points.forEach(p=>{p.x=layout.x+p.u/1000*layout.w;p.y=layout.y+p.v/480*layout.h;});draw(performance.now(),0);schedule();}
function updateScroll(){const rect=stage.getBoundingClientRect();progress=clamp(-rect.top/(height*.92));stage.classList.toggle('bridge-visible',progress>.42);document.body.classList.toggle('day-mode',rect.bottom<height*.55);canvas.parentElement.style.opacity=rect.bottom>0?'1':'0';canvas.parentElement.style.clipPath='inset(0px 0px '+Math.max(0,height-rect.bottom)+'px 0px)';scrollDirty=false;}
function bezier(t,a,b,c,d){const v=1-t;return v*v*v*a+3*v*v*t*b+3*v*t*t*c+t*t*t*d;}
function sPosition(t){let x,y;if(t<.5){const v=t*2;x=bezier(v,.82,.05,.05,.5);y=bezier(v,.15,-.05,.43,.5);}else{const v=(t-.5)*2;x=bezier(v,.5,.99,.97,.18);y=bezier(v,.5,.56,1.08,.86);}const h=Math.min(height*.52,width*.60);return {x:(width<=700?width*.5:width*.69)+(x-.5)*h*.70,y:(width<=700?height*.29:height*.38)+(y-.5)*h};}
function sMix(now){if(staticShape)return 1;if(!shapeStart)return 0;const elapsed=now-shapeStart;if(elapsed<850)return smooth(elapsed/850);if(elapsed<2100)return 1;if(elapsed<3700)return 1-smooth((elapsed-2100)/1600);shapeStart=0;canvas.dataset.shape='world';status.textContent='星点已回到世界星图。';return 0;}
function draw(now,dt){if(scrollDirty)updateScroll();ctx.fillStyle='#0b131b';ctx.fillRect(0,0,width,height);const active=motionEnabled();const sec=active?now*.001:0;const mix=sMix(now);const p=active?smooth(progress):0;const worldAlpha=1-progress*.80;const pointerAge=now-pointer.at;const nearPointer=pointerAge<2400;const pointerStrength=nearPointer?1-clamp((pointerAge-350)/2050):0;
 for(const [backgroundIndex,star] of background.entries()){if(width<=700&&backgroundIndex%2)continue;const drift=active?Math.sin(sec*.10+star.phase)*2:0;const x=star.u*width+drift,y=star.v*height+drift*.6;ctx.globalAlpha=star.alpha*(1-progress*.65)*(1-mix*.65);ctx.fillStyle='#becdd9';ctx.beginPath();ctx.arc(x,y,star.r,0,Math.PI*2);ctx.fill();if(star.cross){ctx.strokeStyle='#d1dce3';ctx.lineWidth=.5;ctx.globalAlpha*=.45;ctx.beginPath();ctx.moveTo(x-3,y);ctx.lineTo(x+3,y);ctx.moveTo(x,y-3);ctx.lineTo(x,y+3);ctx.stroke();}}
 points.forEach((point,i)=>{const baseX=layout.x+point.u/1000*layout.w,baseY=layout.y+point.v/480*layout.h;const distance=Math.hypot(baseX-pointer.x,baseY-pointer.y);const range=width<=700?95:145;const targetEnergy=pointerStrength*smooth(1-distance/range);point.energy=active?lerp(point.energy,targetEnergy,Math.min(1,dt*.0045)):targetEnergy;const drift=active?Math.sin(sec*.20+point.phase)*2:0;const loosen=(1-point.energy*.90)*(1-mix);let tx=baseX+(point.jx+drift)*loosen,ty=baseY+(point.jy+drift*.6)*loosen;
  if(point.energy>.02){tx+=(pointer.x-baseX)*.025*point.energy;ty+=(pointer.y-baseY)*.025*point.energy;}
  if(mix>0){const sp=sPosition(point.s);tx=lerp(tx,sp.x+(point.jx*.30),mix);ty=lerp(ty,sp.y+(point.jy*.30),mix);}
  if(p>0&&i%13===0){const angle=point.phase;const cx=width<=700?width*.5:width*.26,cy=height*.58;const radius=(width<=700?70:110)*( .35+point.s*.65);tx=lerp(tx,cx+Math.cos(angle)*radius,p);ty=lerp(ty,cy+Math.sin(angle)*radius*.7,p);}
  const ease=active&&dt>0?1-Math.exp(-dt*.005):1;point.x=lerp(point.x,tx,ease);point.y=lerp(point.y,ty,ease);
 });
 ctx.lineWidth=.55;ctx.strokeStyle='#8ba9bf';
 for(const edge of (width<=700?mobileEdges:edges)){const a=points[edge.a],b=points[edge.b];const energy=Math.max(a.energy,b.energy);const copyDim=textAttenuation((a.x+b.x)*.5,(a.y+b.y)*.5);const alpha=(.13+energy*.24)*(1-progress*.85)*(1-mix)*copyDim;if(alpha<.008)continue;ctx.globalAlpha=alpha;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
 if(mix>.01){ctx.globalAlpha=.14*mix;ctx.beginPath();sOrder.forEach(({i},j)=>{const p=points[i];if(j===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);});ctx.stroke();}
 for(let i=0;i<points.length;i++){if(width<=700&&i%3!==0)continue;const point=points[i];const copyDim=textAttenuation(point.x,point.y);let alpha=point.alpha*(1.03+point.energy*.43)*worldAlpha*copyDim;if(progress>.2&&i%13===0)alpha=Math.max(alpha,.30*p);ctx.globalAlpha=clamp(alpha);ctx.fillStyle=point.energy>.3?'#e5edf0':'#bfccd5';ctx.beginPath();ctx.arc(point.x,point.y,point.r*(1+point.energy*.55),0,Math.PI*2);ctx.fill();}
 drawDust(now);ctx.globalAlpha=1;
}
function tick(now){frame=0;if(!visible||document.hidden)return;const dt=Math.min(40,now-(last||now));last=now;draw(now,dt);if(motionEnabled())frame=requestAnimationFrame(tick);}
function schedule(){if(!frame&&visible&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
function pointerEvent(event,burst=false){pointer.x=event.clientX;pointer.y=event.clientY;pointer.at=performance.now();emitDust(pointer.x,pointer.y,burst);const near=portals.map(el=>{const r=el.getBoundingClientRect();return Math.hypot(r.x+r.width*.5-pointer.x,r.y+r.height*.45-pointer.y)<(width<=700?110:170);});portals.forEach((el,i)=>el.classList.toggle('is-near',near[i]));if(!motionEnabled())draw(pointer.at,0);else schedule();}
hero.addEventListener('pointermove',event=>{if(event.pointerType==='mouse')pointerEvent(event);},{passive:true});
hero.addEventListener('pointerdown',event=>pointerEvent(event,true),{passive:true});
hero.addEventListener('pointerleave',()=>{pointer.at=Math.min(pointer.at,performance.now()-600);portals.forEach(el=>el.classList.remove('is-near'));},{passive:true});
window.addEventListener('scroll',()=>{scrollDirty=true;if(!motionEnabled()){updateScroll();draw(performance.now(),0);}else schedule();},{passive:true});
let resizeFrame=0;window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(size);},{passive:true});
document.getElementById('constellation-mark').addEventListener('click',()=>{pointer.at=-10000;clearTimeout(shapeTimer);status.textContent='星点汇聚为字母 S，随后回到世界星图。';canvas.dataset.shape='s';if(motionEnabled()){shapeStart=performance.now();staticShape=false;schedule();}else{staticShape=true;draw(performance.now(),0);shapeTimer=setTimeout(()=>{staticShape=false;canvas.dataset.shape='world';status.textContent='星点已回到世界星图。';draw(performance.now(),0);},1700);}});
function syncMotion(){const enabled=motionEnabled();stage.classList.toggle('sky-static',!enabled);if(!enabled){dust.length=0;cancelAnimationFrame(frame);frame=0;shapeStart=0;staticShape=false;clearTimeout(shapeTimer);canvas.dataset.shape='world';draw(performance.now(),0);}else schedule();}
new MutationObserver(syncMotion).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});reduced.addEventListener('change',syncMotion);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;}else schedule();});
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){updateScroll();cancelAnimationFrame(frame);frame=0;}else schedule();},{threshold:0}).observe(stage);}
canvas.dataset.shape='world';size();syncMotion();
})();
