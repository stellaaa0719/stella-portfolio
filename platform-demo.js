
(()=>{
const root=document.getElementById('actual-ai-workbench'),q=s=>root.querySelector(s);
const scenes={
intel:{name:'情报研判',title:'从数字化资讯，找到值得调查的合作方向',prompt:'请阅读预设的物流智能化与数据互联资讯，结合我们的物流规划、数字化诊断与数据治理服务，判断哪些园区或物流企业值得联系。\n请说明：信息里出现了什么变化、与我们的服务有什么关系、第一次访谈该问什么，并区分事实与推测。',answer:'<h3>可以先调查“仓储与运输数据衔接”问题</h3><p><b>外部信号：</b>演示资讯提到物流园区关注仓储智能化、运输协同与跨系统数据互联。这说明存在一个值得研究的主题，不能直接证明某家企业要采购。</p><p><b>能力关联：</b>我们能先做仓运业务访谈与系统、数据盘点，帮助客户界定智能化改造范围，而不是直接推销一套系统。</p><p><b>候选客户：</b>示例物流园区 A曾反馈仓储与运输系统的数据需要人工核对，与这一调查方向相关。</p><p><b>建议下一步：</b>联系业务负责人，请对方提供一票脱敏订单和系统清单，核实仓储与运输的数据断点。</p><details><summary class="cursor-interaction">查看使用的依据</summary><p>① 外部资讯：物流设施智能化与仓运数据互联。仅为预设资讯，不对应真实政策。</p><p>② 服务能力：仓运业务访谈、系统与数据盘点、分期改造建议。演示摘要。</p><p>③ 客户记录：“仓库和运输系统里的订单状态对不上，同一批货物需要人工核对。”演示沟通。</p></details>',next:'customer',follow:'继续分析这个客户'},
customer:{name:'客户洞察',title:'整理客户需求与下次访谈问题',prompt:'请分析示例物流园区 A。客户说：“仓库和运输系统里的订单状态对不上，同一批货物需要人工核对，但不知道应该先改数据还是换系统。”\n请整理已知事实、可能原因、尚缺的信息，以及下次访谈最该问的问题。不要补写预算、决策人和采购计划。',answer:'<h3>客户已说明问题，但还没有明确解决方案</h3><ul><li><b>已知事实：</b>存在仓运数据不一致与人工核对；是否更换系统尚未决定。</li><li><b>待验证判断：</b>原因可能涉及字段重复、流程分工或系统之间信息不通，需要查看实际流程。</li><li><b>访谈问题：</b>同一条信息分别由谁填写？交给谁使用？哪个环节必须人工核对？</li><li><b>信息缺口：</b>涉及部门、问题频率、现有系统、负责人和时间安排。</li></ul><details><summary class="cursor-interaction">查看沟通依据</summary><p>“仓库和运输系统里的订单状态对不上，同一批货物需要人工核对，但不知道应该先改数据还是换系统。”——预设沟通记录。</p></details>',next:'opportunity',follow:'结合反馈研判商机'},
opportunity:{name:'商机研判',title:'判断咨询机会的风险和下一步',prompt:'请研判示例物流园区 A的“物流园区智能化转型诊断”咨询机会。已知客户有仓运数据不一致和人工核对的问题，但预算、决策人和实施时间尚未明确。\n请结合当前沟通背景，给出值得推进的依据、主要风险和下一步行动，不要生成缺少依据的成交概率。',answer:'<h3>可以继续核实需求，暂不进入系统建设承诺</h3><p><b>支持依据：</b>客户已提出具体工作问题，适合先讨论诊断范围和访谈安排。</p><p><b>主要风险：</b>预算、负责人、决策流程和时间安排不明确；客户是否愿意为诊断服务付费仍待确认。</p><p data-context-answer></p><p><b>下一步：</b>约一次需求访谈，收集脱敏订单、系统清单与仓运业务流程，确认咨询范围及客户预期。</p><details><summary class="cursor-interaction">查看判断依据与边界</summary><p>依据为预设客户沟通与商机记录。问题存在，不等于采购需求已成立；本例不估算成交概率。</p></details>',next:'document',follow:'基于这些信息起草材料'},
document:{name:'材料创作',title:'起草一段有具体工作与交付物的建议书',prompt:'请基于示例物流园区 A的已知问题和当前沟通背景，起草《物流园区智能化转型诊断建议》的“主要工作内容”一节。\n请写清需要访谈谁、检查哪些材料、形成什么交付物；不要泛泛地写“提升效率”。预算和周期保留待确认，不承诺更换系统。',answer:'<h3>物流园区智能化转型诊断建议</h3><div class="aw-paper"><b>二、主要工作内容</b><p data-paragraph></p><p data-document-context></p><p class="aw-result-note">预算：待确认　／　周期：待确认</p></div><button type="button" data-rewrite class="cursor-interaction">演示：把表述改得更具体</button><details><summary class="cursor-interaction">查看正文依据</summary><p>事实依据：示例客户关于仓运数据不一致与人工核对的沟通记录。</p><p>参考方法：选择典型业务，梳理字段、交接节点与核对责任。</p><p>写作模板只提供章节结构，不补充客户事实。</p></details>',next:'intel',follow:'返回情报研判'}
};
const initialState=()=>({page:'ai',record:0,researchTopic:0,researchSource:0,briefTopics:[],showResearchBrief:false,projectSignal:0,signalKind:'全部',intelFollowups:[],oppStage:'线索',oppAction:'prepare',meetingPreset:'diagnose',meetingDraft:false,meetings:{},addedTasks:[],scope:'diagnosis',roleChoice:null,roleNext:false,todayAdvice:false,dashStage:null,todos:[],sentToIntel:false,intelAction:false,projectStage:0,materialChapter:'background',materialRewrite:false,scene:null,sent:false,feedback:'diagnose',confirmed:null,rewritten:false});
let state=initialState();
function restore(w){const s=w?.privateContent;if(s&&(!s.scene||scenes[s.scene]))state={...state,...s};}
try{restore(JSON.parse(sessionStorage.getItem('stella-platform-demo-v4')||'null'));}catch{}
function save(){try{sessionStorage.setItem('stella-platform-demo-v4',JSON.stringify({privateContent:state}));}catch{}}
const pages={today:['今日工作台','今日摘要 · 重点商机 · 待办与 AI 建议'],ai:['AI 工作台','对话优先 · 企业知识与业务数据协同 · 操作执行前确认'],customers:['客户管理','客户背景、沟通与关联业务'],opportunities:['商机管理','见客准备 · 会后录入 · 增值机会与推进建议'],projects:['项目管理','任务节点与交付进展'],news:['每日资讯','行业趋势 · 多源研读 · 研究简报'],intelligence:['情报中心','项目事件 · 合作方向 · 核实与跟进'],materials:['材料工作台','基于业务背景起草与分段改写'],dashboard:['数据看板','阶段、趋势、结构与待关注事项']};
const requestedView=new URLSearchParams(location.search).get('view');if(requestedView&&pages[requestedView])state.page=requestedView;
const demoCustomers=[{name:'示例物流园区 A',type:'物流园区运营方',need:'仓储、运输系统各自记录订单，同一批货物的状态需要人工核对。',contact:'希望先核实仓运协同与数据问题，再讨论智能化改造路径。'},{name:'示例物流企业 B',type:'物流企业',need:'订单、库存与运输数据口径不统一，经营报表需要人工汇总。',contact:'希望先统一口径，暂未讨论采购安排。'},{name:'示例数据服务机构 C',type:'数据服务机构',need:'希望梳理物流数据共享的业务场景、数据目录与使用边界。',contact:'当前仅有初步需求，具体范围待访谈。'}];

const demoTodos=['约访示例物流园区 A，核实仓运协同与数据断点','核对示例物流企业 B 对关键字段的不同定义','检查物流园区智能化转型诊断建议的初稿与待确认事项'];
function revealMobile(selector){if(!matchMedia('(max-width:550px)').matches)return;requestAnimationFrame(()=>{const body=q('.aw-body'),target=q(selector);if(!target)return;body.scrollTo({top:selector==='.aw-body'?0:body.scrollTop+target.getBoundingClientRect().top-body.getBoundingClientRect().top-12,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});}
function go(page,scene){closeMore();state.page=page;state.record=0;if(scene){state.scene=scene;state.sent=false;}render();save();revealMobile('.aw-body');}
function action(page,label){return '<button type="button" data-page="'+page+'" class="cursor-interaction">'+label+' →</button>';}
function fields(items){return items.map(([label,value])=>'<div class="aw-field-row"><span>'+label+'</span><div>'+value+'</div></div>').join('');}
function taskItems(){return [...demoTodos.map((text,i)=>({id:'base-'+i,text})),...(state.intelAction?[{id:'intelligence',text:'核实演示情报与示例物流园区 A 的需求是否相关'}]:[]),...state.addedTasks];}
function todoList(){return taskItems().map(t=>'<label class="aw-check"><input type="checkbox" data-todo="'+t.id+'" '+(state.todos.includes(t.id)?'checked':'')+'><span>'+t.text+'<small>示例负责人 · '+(state.todos.includes(t.id)?'已完成':'待处理')+'</small></span></label>').join('');}
function addTodayTask(id,text){if(!state.addedTasks.some(t=>t.id===id))state.addedTasks.push({id,text});}
const oppStages=['线索','需求沟通','方案讨论','谈判','成交'];
const opportunities=[
 ['物流园区智能化转型诊断',0,0,0,'预算未明确'],['物流数据治理与指标梳理',1,0,1,'决策流程待核实'],['物流数据共享场景调研',2,0,0,'范围待确认'],['仓储与运输数据贯通规划',0,0,1,'预算未明确'],
 ['仓配协同与智能调度方案',1,1,0,''],['物流数据目录与标准梳理',2,1,1,'决策流程待核实'],['物流数据平台规划',0,1,2,'预算未明确'],
 ['物流数据质量诊断',1,2,1,''],['智慧仓储改造路径',2,2,0,''],['物流园区数字化试点方案',0,3,2,''],['物流数据治理实施辅导',1,3,2,''],['仓运协同调研支持',2,4,0,'']
].map((x,i)=>({id:i,title:x[0],customer:x[1],stage:x[2],service:x[3],risk:x[4]}));
const serviceNames=['物流智能化','数据治理','规划咨询'];
const toolNames={prepare:['见客准备','带着背景与问题去沟通'],meeting:['会后录入','提取要点，确认后关联'],expand:['扩大合同额','识别有依据的增值范围'],roleplay:['模拟对话','练习提问与回应异议'],advice:['AI 建议','明确风险与推进动作']};
function oppName(o){return demoCustomers[o.customer].name+' · '+o.title;}
function pickedOpp(){return opportunities.find(o=>o.id===Number(state.record))||opportunities[0];}
function badge(text,kind=''){return '<span class="aw-badge '+kind+'">'+text+'</span>';}
function openOppButton(o,label){return '<button type="button" data-open-opp="'+o.id+'" class="aw-inline-link">'+label+' →</button>';}
function pendingTasks(){return taskItems().filter(t=>!state.todos.includes(t.id));}
function summaryStat(label,value,note,kind=''){return '<div class="aw-summary-stat '+kind+'"><span>'+label+'</span><strong>'+value+'</strong><small>'+note+'</small></div>';}
function todayPage(){
 const pending=pendingTasks(),priority=[opportunities[0],opportunities[7]],risks=opportunities.filter(o=>o.risk);
 return '<div class="aw-day-brief"><div><span>演示工作日 / 今日简报</span><h3>今天先准备园区访谈，再核对数据治理范围。</h3><p>'+ (pending.length?'今天有 '+pending.length+' 项待处理工作。当前优先：'+pending.slice(0,2).map(t=>t.text).join('；')+'。':'今天列出的事项已完成。可以复核重点商机，或继续查看材料与情报。')+'</p></div><button type="button" data-today-advice class="aw-blue-button">'+(state.todayAdvice?'收起今日建议':'查看 AI 今日建议')+'</button></div>'+
 '<div class="aw-summary-grid">'+summaryStat('今日待处理',pending.length,'完成勾选后同步更新')+summaryStat('重点商机',priority.length,'优先准备与跟进')+summaryStat('条件待核实',risks.length,'预算、决策与需求范围','aw-stat-warn')+summaryStat('待检查材料',1,'检查初稿与待确认事项')+'</div>'+
 '<div class="aw-today-grid"><section class="aw-board-panel"><div class="aw-panel-title"><h3>今日待办 / 需关注</h3><span>'+state.todos.length+' 项已完成</span></div>'+todoList()+'<p class="aw-result-note">情报建立的跟进与会后确认的新行动，也会汇总到这里。</p></section><section class="aw-board-panel"><div class="aw-panel-title"><h3>重点商机</h3><button type="button" data-page="opportunities" class="aw-inline-link">全部 →</button></div>'+priority.map(o=>'<article class="aw-priority-item"><div>'+badge(oppStages[o.stage])+'<b>'+oppName(o)+'</b><p>'+(o.id===0?'访谈前先收集脱敏订单样例，明确仓储与运输的数据断点。':'方案讨论前核对交付范围与客户预期。')+'</p></div>'+openOppButton(o,'见客准备')+'</article>').join('')+'<div class="aw-attention"><b>今天别漏掉</b><p>预算尚未明确的机会，先补齐条件；不要直接进入报价或作出交付承诺。</p></div></section></div>'+
 (state.todayAdvice?'<section class="aw-board-panel aw-advice-panel"><h3>AI 今日建议 · 预设演示</h3><ol><li><b>先准备：</b>带着客户原话与资料清单去访谈。</li><li><b>再确认：</b>会后核对需求、负责人和下一步，再写入关联记录。</li><li><b>后交付：</b>用确认后的背景检查材料，保留预算与周期待补充。</li></ol><div class="aw-mod-toolbar">'+openOppButton(opportunities[0],'准备重点客户沟通')+action('materials','检查材料')+'</div></section>':'');
}
function opportunityTools(o){
 const tool=state.oppAction||'prepare',client=demoCustomers[o.customer],meeting=state.meetings[o.id],need=client.need;
 let body='';
 if(tool==='prepare')body='<div class="aw-assistant-intro"><b>本次沟通目标</b><p>围绕“'+need+'”核实具体问题，明确是否需要进一步诊断。</p></div><div class="aw-tool-columns"><div><h4>已知背景</h4><ul><li>'+client.contact+'</li><li>当前阶段：'+oppStages[o.stage]+'；'+(o.risk||'后续范围仍应以沟通确认为准。')+'</li></ul><h4>建议带的资料</h4><p>脱敏订单样例、系统清单、仓运协同问题清单。</p></div><div><h4>优先问这三个问题</h4><ol><li>选一笔真实业务，订单状态分别由仓库、运输哪个环节更新？</li><li>哪些订单状态需要人工核对，影响哪些作业？</li><li>希望先弄清问题，还是已有明确改进范围？</li></ol></div></div><div class="aw-mod-toolbar"><button type="button" data-opp-action="roleplay">先练习一次客户对话 →</button><button type="button" data-add-prep>加入今日工作台</button></div>';
 if(tool==='meeting'){
  const supplier=state.meetingPreset==='supplier';
  body='<label class="aw-meeting-label" for="aw-meeting-preset">选择一段演示沟通记录</label><select id="aw-meeting-preset" data-meeting-preset><option value="diagnose" '+(!supplier?'selected':'')+'>先了解问题，再讨论改进范围</option><option value="supplier" '+(supplier?'selected':'')+'>已有供应商，先核实现有工具的使用问题</option></select><blockquote class="aw-meeting-quote">'+(supplier?'我们已有软件供应商，不考虑马上更换。可以先看看现在使用和交接中有哪些问题。':'我们想先弄清楚仓库和运输系统的订单状态为什么对不上。下一次可以带业务同事一起看一个实际例子，暂时还没定预算。')+'</blockquote>'+
  (!state.meetingDraft?'<button type="button" data-extract-meeting class="aw-blue-button">演示提取跟进草稿</button>':'<div class="aw-followup-draft"><div class="aw-panel-title"><h4>待确认跟进草稿</h4>'+badge('人工确认')+'</div>'+fields([['关联对象',oppName(o)],['需求摘要',supplier?'核实现有工具的使用问题，不以更换供应商为前提。':'先梳理仓运协同与数据问题，再讨论诊断与改造范围。'],['下一步','准备一票脱敏订单样例，约访相关业务人员。'],['待核实','参与人员、问题范围、预算与时间安排。']])+'<button type="button" data-confirm-meeting class="aw-blue-button">'+(meeting&&meeting.preset===state.meetingPreset?'已确认并关联记录 ✓':'确认录入，关联已有商机')+'</button><small>确认后更新沟通背景，并新增一项今日待办。</small></div>');
 }
 if(tool==='expand')body='<div class="aw-assistant-intro"><b>先识别客户价值，再讨论增值范围</b><p>扩大合同额的建议必须对应额外需求与交付；本演示不自动修改金额。</p></div><div class="aw-scope-options"><button type="button" data-scope="diagnosis" aria-pressed="'+(state.scope==='diagnosis')+'"><b>现状诊断</b><small>弄清问题与范围</small></button><button type="button" data-scope="coaching" aria-pressed="'+(state.scope==='coaching')+'"><b>诊断＋落地辅导</b><small>额外交付需客户确认</small></button></div><div class="aw-scope-result"><h4>'+(state.scope==='coaching'?'可调查的增值项':'当前合作边界')+'</h4><p>'+(state.scope==='coaching'?'若客户希望继续实施，可讨论物流数据标准校验、仓运协同试点与实施辅导。先核对范围、参与人员与交付价值，再形成单独报价。':'先交付问题清单、流程图与优先级建议，不默认包含系统建设或长期实施服务。')+'</p></div><p class="aw-result-note">潜在增值项不等于客户已同意，也不计作签约或收入。</p>';
 if(tool==='roleplay'){
  const good=state.roleChoice==='clarify';
  body='<div class="aw-role-chat"><div class="aw-client-bubble"><small>模拟客户 · '+client.name+'</small><p>我们已经有仓储和运输系统，你们是不是又要推荐一套新系统？</p></div>'+
  (state.roleChoice?'<div class="aw-sales-bubble"><small>你的回应</small><p>'+(good?'不急着推荐系统。我们先一起看一个业务样例，核实仓储与运输的订单状态为什么对不上，再判断是流程、数据还是工具需要调整。':'换一套系统就能解决这些问题，也能明显提高效率。')+'</p></div><div class="aw-role-feedback"><b>'+(good?'演示反馈：先澄清问题，边界更清楚':'演示反馈：这句话承诺过早')+'</b><p>'+(good?'回应了客户对推销系统的顾虑，并把沟通落到可核实的样例。':'尚未定位原因，不能保证更换系统就能解决问题；建议先了解业务样例。')+'</p></div>'+(state.roleNext?'<div class="aw-client-bubble"><small>模拟客户</small><p>'+(good?'那我们先准备一份脱敏订单，请仓储和运输同事讲一遍状态更新与核对过程。':'我更想先弄清问题，而不是马上换系统。你们能先了解现有流程吗？')+'</p></div>':''):'')+'</div><div class="aw-mod-toolbar"><button type="button" data-role-choice="clarify">先问清实际问题</button><button type="button" data-role-choice="promise">直接推荐换系统</button>'+(state.roleChoice?'<button type="button" data-role-next>继续一轮对话 →</button>':'')+'</div>';
 }
 if(tool==='advice')body='<div class="aw-tool-columns"><div><h4>为什么值得继续核实</h4><p>'+need+' 已有具体问题线索，可通过访谈明确影响与范围。</p><h4>当前风险</h4><p>'+(o.risk||'尚需核对具体交付范围与实际决策安排。')+'</p></div><div><h4>建议下一步</h4><ol><li>联系实际使用信息的业务人员。</li><li>收集脱敏订单样例与系统清单。</li><li>确认需求和参与人后，再约定后续范围。</li></ol></div></div>'+fields([['参考依据','预设客户沟通、商机阶段与通用诊断方法。'],['判断边界','不补造预算、采购意向或成交概率。']])+'<div class="aw-mod-toolbar"><button type="button" data-add-ai-advice class="aw-blue-button">把建议加入今日工作台</button><button type="button" data-opp-action="meeting">录入最新沟通 →</button></div>';
 return '<section class="aw-op-assistant"><div class="aw-panel-title"><div><small>商机推进助手</small><h3>'+oppName(o)+'</h3></div>'+badge(oppStages[o.stage])+'</div><div class="aw-op-tool-tabs" role="group" aria-label="商机 AI 操作">'+Object.entries(toolNames).map(([key,val])=>'<button type="button" data-opp-action="'+key+'" aria-pressed="'+(tool===key)+'"><b>'+val[0]+'</b><small>'+val[1]+'</small></button>').join('')+'</div><div class="aw-tool-content">'+body+'</div></section>';
}
function opportunitiesPage(){
 const stage=state.oppStage||'全部',items=stage==='全部'?opportunities:opportunities.filter(o=>oppStages[o.stage]===stage),selected=pickedOpp();
 return '<div class="aw-op-head"><p>围绕一条商机，完成沟通准备、会后记录和下一步判断。</p>'+badge('12 条预设记录')+'</div><div class="aw-phase-tabs" role="group" aria-label="商机阶段"><button type="button" data-opp-stage="全部" aria-pressed="'+(stage==='全部')+'">全部</button>'+oppStages.map(x=>'<button type="button" data-opp-stage="'+x+'" aria-pressed="'+(stage===x)+'">'+x+' <small>'+opportunities.filter(o=>oppStages[o.stage]===x).length+'</small></button>').join('')+'</div><div class="aw-op-records">'+items.map(o=>'<button type="button" data-select-opp="'+o.id+'" aria-pressed="'+(o.id===selected.id)+'"><div>'+badge(oppStages[o.stage])+'<b>'+oppName(o)+'</b><small>'+(o.risk||'查看沟通准备与推进建议')+'</small></div><span>查看 →</span></button>').join('')+'</div>'+opportunityTools(selected);
}
function chartPanel(title,subtitle,content,extra=''){return '<section class="aw-chart-panel '+extra+'"><div class="aw-panel-title"><div><h3>'+title+'</h3>'+(subtitle?'<small>'+subtitle+'</small>':'')+'</div></div>'+content+'</section>';}
function donutChart(){
 const counts=serviceNames.map((_,i)=>opportunities.filter(o=>o.service===i).length),total=opportunities.length,circ=2*Math.PI*52;let offset=0;
 const arcs=counts.map((count,i)=>{const len=count/total*circ;const s='<circle cx="80" cy="80" r="52" fill="none" stroke="var(--aw-chart-'+i+')" stroke-width="18" stroke-dasharray="'+len+' '+(circ-len)+'" stroke-dashoffset="'+(-offset)+'" transform="rotate(-90 80 80)"/>';offset+=len;return s;}).join('');
 return '<div class="aw-donut-layout"><div class="aw-donut"><svg viewBox="0 0 160 160" role="img" aria-label="业务类型分布：'+counts.map((v,i)=>serviceNames[i]+v+'条').join('，')+'"><title>预设商机的业务类型分布</title>'+arcs+'</svg><div><strong>'+total+'</strong><span>预设商机</span></div></div><ul class="aw-chart-legend">'+counts.map((n,i)=>'<li><span class="aw-chart-dot" style="background:var(--aw-chart-'+i+')"></span><span>'+serviceNames[i]+'</span><b>'+n+' 条</b></li>').join('')+'</ul></div>';
}
function dashboardPage(){
 const counts=oppStages.map((_,i)=>opportunities.filter(o=>o.stage===i).length),max=Math.max(...counts),selectedStage=state.dashStage,selected=selectedStage===null?opportunities:opportunities.filter(o=>o.stage>=selectedStage),riskItems=['预算未明确','决策流程待核实','范围待确认'];
 const reached=oppStages.map((_,i)=>opportunities.filter(o=>o.stage>=i).length);
 const stages='<div class="aw-funnel-summary"><span>线索 <b>'+reached[0]+'</b> 条</span><span>当前成交占比 <b>'+(reached[4]/reached[0]*100).toFixed(1)+'%</b></span></div><div class="aw-funnel-chart" role="group" aria-label="商机漏斗分析：同一组虚构商机累计到达各阶段">'+reached.map((n,i)=>{const next=reached[Math.min(i+1,4)],a=(1-n/reached[0])*50,b=(1-next/reached[0])*50,rate=i?(n/reached[i-1]*100).toFixed(1)+'%':'基准';return '<button type="button" data-dash-stage="'+i+'" aria-pressed="'+(selectedStage===i)+'" aria-label="查看到达'+oppStages[i]+'及后续阶段的'+n+'条虚构商机"><span>'+oppStages[i]+'</span><div class="aw-funnel-shape" style="background:var(--aw-chart-'+i+');clip-path:polygon('+a+'% 0,'+(100-a)+'% 0,'+(100-b)+'% 100%,'+b+'% 100%)"></div><div><b>'+n+' 条</b><small>'+(i?'较上级 '+rate:rate)+'</small></div></button>';}).join('')+'</div><p class="aw-funnel-note">同一组 12 条虚构商机累计到达各阶段，包含已推进至后续阶段的记录。</p>';

 const trend='<div class="aw-line-chart"><svg viewBox="0 0 480 160" role="img" aria-label="演示周跟进活动：周一3次，周二5次，周三4次，周四7次，周五6次"><title>预设一周跟进活动</title><defs><linearGradient id="aw-trend-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b91d3" stop-opacity=".24"/><stop offset="1" stop-color="#5b91d3" stop-opacity="0"/></linearGradient></defs><path d="M24 28H456 M24 84H456 M24 140H456" fill="none" stroke="#e5ebf1"/><path d="M24 98L132 70L240 84L348 42L456 56V140H24Z" fill="url(#aw-trend-fill)"/><path d="M24 98L132 70L240 84L348 42L456 56" fill="none" stroke="#4f83c4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'+[[24,98],[132,70],[240,84],[348,42],[456,56]].map(([x,y])=>'<circle cx="'+x+'" cy="'+y+'" r="5" fill="#fff" stroke="#4f83c4" stroke-width="3"/>').join('')+'</svg><div class="aw-trend-labels">'+['周一|3','周二|5','周三|4','周四|7','周五|6'].map(x=>'<div><span>'+x.split('|')[0]+'</span><b>'+x.split('|')[1]+' 次</b></div>').join('')+'</div></div>';
 const risk='<div class="aw-risk-chart">'+riskItems.map((x,i)=>{const n=opportunities.filter(o=>o.risk===x).length;return '<div><div><span>'+x+'</span><b>'+n+' 项</b></div><div class="aw-risk-track"><i style="width:'+n/3*100+'%;background:var(--aw-chart-'+[2,3,4][i]+')"></i></div></div>';}).join('')+'</div><p class="aw-result-note">按预设记录的问题标签汇总，不使用真实客户风险。</p>';
 return '<div class="aw-summary-grid">'+summaryStat('商机记录',12,'五个阶段的预设样本')+summaryStat('客户对象',3,'示例企业与机构')+summaryStat('待核实事项',6,'预算 / 决策 / 范围','aw-stat-warn')+summaryStat('今日待处理',pendingTasks().length,'与今日工作台同步')+'</div><div class="aw-dashboard-grid">'+chartPanel('商机漏斗分析','',stages)+chartPanel('本周跟进活动','演示周 · 次数',trend)+chartPanel('业务类型结构','',donutChart())+chartPanel('需要补齐的关键条件','',risk)+'</div><section class="aw-board-panel"><div class="aw-panel-title"><h3>'+(selectedStage===null?'全部预设商机':'到达'+oppStages[selectedStage]+'及后续阶段的商机')+'</h3><button type="button" data-dash-all class="aw-inline-link">查看全部</button></div><div class="aw-dashboard-records">'+selected.map(o=>'<div><span>'+badge(oppStages[o.stage])+' '+oppName(o)+'</span>'+openOppButton(o,'查看')+'</div>').join('')+'</div></section><p class="aw-result-note">看板数字只用于说明界面与交互，不代表企业规模、真实营收或项目成效。</p>';
}

const researchTopics=[
 {title:'物流智能化',headline:'从单点设备改造，看到仓储与运输的协同问题',summary:'研究物流智能化时，不只看自动化设备，还需要观察订单、库存、运输状态能否形成连续的信息链。',implication:'关注系统衔接、数据标准和作业协同的研究与规划需求，不直接推定某个园区已有采购计划。',questions:['哪些问题适合通过设备改造解决，哪些需要先统一数据？','智能化改造如何分期，怎样评价业务价值？'],sources:[['政策方向 · 演示片段','关注物流设施智能化与系统互联；具体适用条件仍需核验。'],['行业观察 · 演示片段','多个作业环节分别优化后，跨环节数据可能仍需人工核对。'],['方法参考 · 演示片段','先梳理业务链与信息流，再识别需要研究的改造环节。']]},
 {title:'物流数据治理',headline:'从“汇集数据”，进一步研究口径、质量与使用边界',summary:'物流数据研究既涉及订单、库存和运单等业务数据，也涉及字段定义、更新责任、质量规则与共享边界。',implication:'可进一步研究数据目录、标准体系与治理机制，为数据平台或智能分析提供基础。',questions:['哪些业务指标在不同主体之间含义不一致？','哪些数据可以共享，谁负责更新与校验？'],sources:[['政策方向 · 演示片段','关注数据资源的规范治理与合理使用，不对应真实政策文件。'],['行业观察 · 演示片段','相同指标在不同系统中口径不同，会影响汇总分析。'],['方法参考 · 演示片段','按业务场景梳理数据目录，逐步定义字段、质量规则与使用权限。']]},
 {title:'绿色物流',headline:'把能耗与运营效率放在同一条业务链上观察',summary:'绿色物流研究可以结合运输组织、仓储作业和能源使用，分析不同改进路径的条件与边界。',implication:'先研究可获得的数据和评估口径，再讨论绿色改造、运营优化与实施路径。',questions:['能耗数据能否与运输、仓储作业对应？','评估方案需要哪些基线与边界条件？'],sources:[['政策方向 · 演示片段','关注物流降耗与绿色转型，仅用于说明研究入口。'],['行业观察 · 演示片段','设备效率与调度组织都会影响能源使用，不能只看单项技术。'],['方法参考 · 演示片段','先明确统计边界与基础数据，再比较改进方案。']]}
];
researchTopics.push(...[{"title": "智能制造", "headline": "从设备联网，研究生产、质量与交付的协同", "summary": "比较设备、生产计划与质量追溯之间的信息衔接，识别适合逐步验证的数字化场景。", "implication": "先选具体工序与评价基线，再比较系统集成和业务改进路径。", "questions": ["设备数据能否对应到工序、订单和质量？", "试点改善怎样在同一口径下评价？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "供应链协同", "headline": "把企业内部优化，延伸到上下游协同", "summary": "围绕预测、采购、生产与交付，研究不同主体之间的信息延迟和协同边界。", "implication": "研究从订单协同切入的条件，而非直接假设全链条共享可行。", "questions": ["哪些节点影响交付，哪些信息需要跨企业共享？", "参与方的成本、收益和责任如何划分？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "工业 AI", "headline": "先明确任务与验证方式，再研究 AI 应用", "summary": "把知识问答、质量辅助分析和排产建议分开，比较所需数据、容错范围和人工确认位置。", "implication": "选择可验证的任务试点，避免把模型输出直接等同于业务结果。", "questions": ["历史数据是否覆盖目标任务？", "什么结果需要业务人员确认，如何设置评价基线？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "可信数据空间", "headline": "从数据连接，研究可信流通的协作机制", "summary": "关注参与主体如何在约定规则下共享、使用数据，以及技术与治理条件能否共同成立。", "implication": "研究场景价值、参与机制和使用边界，不能仅凭平台建设判断生态成熟度。", "questions": ["共享场景由谁参与、各自获得什么价值？", "授权、使用和退出机制怎样落实？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "数据治理", "headline": "先统一指标含义，再研究分析与应用", "summary": "沿业务链梳理数据目录、指标口径与质量责任，观察数据能否被稳定复用。", "implication": "从高频业务问题入手定义治理范围，不追求一次整理全部数据。", "questions": ["同一指标在不同系统中是否一致？", "谁负责更新、校验和解释异常？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "数据产品", "headline": "从数据资源，走向有明确使用者的产品", "summary": "围绕谁使用、解决什么问题和如何持续更新，研究数据产品的服务形态与应用条件。", "implication": "先验证应用需求与使用边界，再讨论产品化和运营机制。", "questions": ["数据使用者的任务和交付形式是什么？", "数据更新、质量与授权能否支持持续服务？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "园区节能", "headline": "从单项节能，研究园区整体用能", "summary": "将生产、仓储、公共设施的用能放在明确统计边界下，比较节能措施的适用条件。", "implication": "研究基础计量与运营机制，再评估改造组合。", "questions": ["哪些环节有稳定可比的用能数据？", "不同措施的评价边界和运行条件是否一致？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}, {"title": "碳数据管理", "headline": "从填报数据，研究可追溯的核算基础", "summary": "围绕活动数据、核算边界与排放因子，研究碳数据记录与复核机制。", "implication": "先明确口径与数据责任，再讨论管理工具与减排路径。", "questions": ["核算边界覆盖哪些业务活动？", "原始记录、因子与计算版本能否追溯？"], "sources": [["研究方法 · 演示片段", "围绕具体业务活动建立问题清单，比较数据条件、实施边界与可验证的交付物。"], ["观察假设 · 待验证", "这一方向值得持续跟踪；是否形成普遍变化，需要更多时间序列、企业案例与独立资料交叉验证。"]]}]);
const researchIndustries=[
 {name:'物流与供应链',note:'作业 · 网络 · 数据',topics:[0,1,2]},
 {name:'制造与工业',note:'生产 · 协同 · 智能',topics:[3,4,5]},
 {name:'数据产业',note:'治理 · 流通 · 产品',topics:[6,7,8]},
 {name:'绿色转型',note:'用能 · 碳数据',topics:[9,10]}
];
const researchReferences=[
 {title:'交通物流降本提质增效行动计划',publisher:'交通运输部、国家发展改革委',date:'2024-11-09',url:'https://app.www.gov.cn/govdata/gov/202411/13/521631/article.html',summary:'文件围绕交通物流降本提质增效部署相关任务，可作为物流组织与效率研究的政策背景。'},
 {title:'制造业企业数字化转型实施指南',publisher:'工业和信息化部等三部门',date:'2024-12-17',url:'https://wap.miit.gov.cn/jgsj/xxjsfzs/wjfb/art/2024/art_13ef73addaa1491fb410ed34f77ca6c4.html',summary:'指南为制造业企业数字化转型提供指引，可用于研究企业转型场景与实施路径。'},
 {title:'可信数据空间发展行动计划（2024—2028年）',publisher:'国家数据局',date:'2024-11-21',url:'https://www.nda.gov.cn/sjj/swdt/sjdt/1122/20241122163909854419154_pc.html',summary:'文件关注数据流通使用及可信数据空间建设，为研究数据共享机制提供政策背景。'},
 {title:'工业领域碳达峰实施方案',publisher:'工业和信息化部、国家发展改革委、生态环境部',date:'2022-07-07',url:'https://www.mee.gov.cn/xxgk2018/xxgk/xxgk10/202208/t20220802_990575.html',summary:'方案部署工业绿色低碳转型相关任务，可作为用能与减排研究的背景材料。'}
];
const researchTrackers=[["系统集成与改造相关文件", "不同企业试点的场景与评价方法"], ["数据标准与目录规范", "指标口径不一致的实际案例"], ["绿色改造适用条件", "作业量与能耗的可比数据"], ["数字化试点应用场景", "质量与交付指标的评价口径"], ["上下游协同案例", "订单响应与交付变化的证据"], ["工业 AI 任务与验证案例", "数据条件、错误类型与人工介入"], ["数据空间建设与运营规则", "参与主体、实际场景和授权机制"], ["数据治理标准与工具实践", "质量责任与异常闭环机制"], ["产品使用场景与用户反馈", "更新机制、交付方式与使用边界"], ["计量覆盖与统计边界", "节能措施的适用条件与基线"], ["核算方法与因子版本", "活动数据来源与复核链路"]];
const researchLinks=[
 {a:0,b:3,label:'仓产协同',why:'物流作业与生产计划需要衔接，订单状态和交付节点可以作为共同研究对象。'},
 {a:0,b:5,label:'智能调度',why:'物流智能化可以借助 AI 辅助调度，但需要稳定的数据与可验证的任务边界。'},
 {a:1,b:7,label:'统一数据口径',why:'物流数据治理是数据治理的业务场景，字段、质量与更新责任可以相互参照。'},
 {a:4,b:6,label:'跨主体共享',why:'供应链协同涉及多方数据使用，可信数据空间提供可研究的授权与协作机制。'},
 {a:5,b:8,label:'数据支撑 AI',why:'工业 AI 与数据产品都需要明确使用者、数据质量和持续更新条件。'},
 {a:2,b:9,label:'用能优化',why:'绿色物流与园区节能都需要结合实际作业量和计量边界评价改进。'},
 {a:7,b:10,label:'可追溯数据',why:'碳数据管理依赖数据治理中的来源记录、质量校验与版本追溯。'}
];
const researchNodePositions=[[135,150],[100,320],[190,510],[400,85],[650,110],[760,240],[765,420],[665,575],[425,605],[350,470],[435,320]];
const researchGroupPositions=[[240,260],[570,205],[590,450],[270,395]];
function researchMap(){
 const selected=state.researchTopic,related=researchLinks.filter(e=>e.a===selected||e.b===selected),neighbours=related.map(e=>e.a===selected?e.b:e.a),industry=researchIndustries.findIndex(g=>g.topics.includes(selected));
 let lines=researchIndustries.map((g,i)=>g.topics.map(id=>{const a=researchGroupPositions[i],b=researchNodePositions[id];return '<line class="aw-net-hierarchy '+(id===selected?'is-lit':'')+'" x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'"/>';}).join('')).join('');
 lines+=researchLinks.map(e=>{const a=researchNodePositions[e.a],b=researchNodePositions[e.b],lit=e.a===selected||e.b===selected;return '<path class="aw-net-relation '+(lit?'is-lit':'')+'" d="M'+a[0]+','+a[1]+' Q450,340 '+b[0]+','+b[1]+'"/>'+(lit?'<g class="aw-net-edge-label"><rect x="'+((a[0]+900+b[0])/4-43)+'" y="'+((a[1]+680+b[1])/4-10)+'" width="86" height="20" rx="10"/><text x="'+((a[0]+900+b[0])/4)+'" y="'+((a[1]+680+b[1])/4+4)+'">'+e.label+'</text></g>':'');}).join('');
 return '<div class="aw-network-viewport"><div class="aw-network-canvas"><svg viewBox="0 0 900 680" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="aw-net-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#c6d4e3"/></pattern></defs><rect width="900" height="680" fill="url(#aw-net-grid)"/><ellipse cx="450" cy="340" rx="320" ry="245" class="aw-net-orbit"/>'+lines+'</svg>'+researchIndustries.map((g,i)=>'<button type="button" data-research-topic="'+g.topics[0]+'" class="aw-network-group aw-net-color-'+i+' '+(industry===i?'is-active':'')+'" style="left:'+researchGroupPositions[i][0]/9+'%;top:'+researchGroupPositions[i][1]/6.8+'%"><b>'+g.name+'</b></button>').join('')+researchTopics.map((t,i)=>{const group=researchIndustries.findIndex(g=>g.topics.includes(i));return '<button type="button" data-research-topic="'+i+'" aria-pressed="'+(selected===i)+'" class="aw-network-node aw-net-color-'+group+' '+(neighbours.includes(i)?'is-neighbour':'')+' '+(selected!==i&&!neighbours.includes(i)?'is-muted':'')+'" style="left:'+researchNodePositions[i][0]/9+'%;top:'+researchNodePositions[i][1]/6.8+'%"><i aria-hidden="true"></i>'+t.title+'</button>';}).join('')+'</div></div><div class="aw-network-legend"><span><i></i>行业分类</span><span><i></i>跨领域研究关联</span><small>点击节点查看关联；连线为预设研究路径</small></div>';
}
const projectSignals=[
 {title:'示例物流园区 A 开展仓运协同调研',kind:'调研规划',stage:'调研中',subject:'示例物流园区 A 运营方',fact:'预设项目记录：运营方拟了解仓储与运输之间的订单状态核对问题，计划组织业务访谈。',meaning:'可调查智能化转型诊断与数据衔接规划的合作方向；尚不能认定存在采购需求。',verify:['调研组织方与参与人员','实际问题范围及可提供资料','后续是否有改造安排与预算'],next:'约访业务人员，收集脱敏订单样例，核实仓运数据断点。',opp:0,action:'访谈确认'},
 {title:'示例物流企业 B 征集数据治理咨询方案',kind:'需求征询',stage:'范围沟通',subject:'示例物流企业 B',fact:'预设需求征询：企业希望梳理订单、库存和运单数据口径，并了解数据质量治理服务的工作范围。',meaning:'咨询方向较明确，可进一步核对交付要求与参与条件；本例不是实际招标公告。',verify:['征询原文与参与条件','数据范围、交付要求及评审方式','时间窗口与采购流程'],next:'核实征询内容，明确咨询边界，再准备需求澄清问题。',opp:1,action:'需求澄清'},
 {title:'示例数据服务机构 C 筹备物流数据共享试点',kind:'试点合作',stage:'筹备中',subject:'示例数据服务机构 C',fact:'预设合作记录：机构拟讨论物流数据共享场景，尚未明确参与主体、数据使用边界和具体试点范围。',meaning:'可关注场景调研、数据目录与协作机制设计；合作筹备不等于采购项目或已签约业务。',verify:['试点牵头方与参与主体','数据使用权限与责任边界','实际试点范围与后续安排'],next:'联系牵头方，核实场景目标、参与机制与可提供的基础资料。',opp:2,action:'合作核实'}
];
function researchPage(){
 const id=state.researchTopic,topic=researchTopics[id],source=topic.sources[state.researchSource],saved=state.briefTopics.includes(id),industry=researchIndustries.findIndex(g=>g.topics.includes(id));
 const relations=researchLinks.filter(e=>e.a===id||e.b===id),refIds=[...new Set([industry,...relations.map(e=>researchIndustries.findIndex(g=>g.topics.includes(e.a===id?e.b:e.a)))])];
 return '<section class="aw-network-research"><div class="aw-network-heading"><div><h3>行业关联地图</h3><p>从一个方向出发，查看相邻产业、共同议题与相关资讯。</p></div><span>预设研究 · 非实时资讯</span></div><label class="aw-network-picker">选择研究方向<select data-research-picker>'+researchIndustries.map(g=>'<optgroup label="'+g.name+'">'+g.topics.map(i=>'<option value="'+i+'" '+(id===i?'selected':'')+'>'+researchTopics[i].title+'</option>').join('')+'</optgroup>').join('')+'</select></label><div class="aw-network-layout"><div class="aw-network-map-area">'+researchMap()+'</div><aside class="aw-network-detail" aria-live="polite"><span class="aw-network-breadcrumb">'+researchIndustries[industry].name+' / '+topic.title+'</span><h3>'+topic.title+'</h3><p class="aw-network-insight">'+topic.summary+'</p><h4>与哪些方向相连</h4><div class="aw-network-connections">'+relations.map(e=>{const other=e.a===id?e.b:e.a;return '<button type="button" data-research-topic="'+other+'"><span>'+researchTopics[other].title+' <b>↗</b></span><small>'+e.label+'</small><p>'+e.why+'</p></button>';}).join('')+'</div><div class="aw-network-questions"><h4>值得研究的问题</h4><ul>'+topic.questions.map(x=>'<li>'+x+'</li>').join('')+'</ul></div><button type="button" data-save-research class="aw-blue-button">'+(saved?'已加入研究简报 ✓':'加入研究简报')+'</button></aside></div><section class="aw-network-news-section" aria-live="polite"><div class="aw-network-news-heading"><h4>相关资讯与原文 <span>'+refIds.length+'</span></h4><small>随所选行业及关联方向更新</small></div><div class="aw-network-news">'+refIds.map((r,i)=>{const ref=researchReferences[r];return '<article><small>'+(i?'关联领域 · ':'本领域 · ')+ref.publisher+' / '+ref.date+'</small><a href="'+ref.url+'" target="_blank" rel="noopener noreferrer">'+ref.title+' ↗</a><p>'+ref.summary+'</p><span>政策原文 · 历史背景资料</span></article>';}).join('')+'</div></section></section><details class="aw-research-deep"><summary>继续研读：研究问题、参考片段与跟踪方向</summary><div class="aw-research-grid"><section><h3>'+topic.headline+'</h3><p>'+topic.implication+'</p><b>持续跟踪什么</b><ul>'+researchTrackers[id].map(x=>'<li>'+x+'</li>').join('')+'</ul></section><section><h3>研读片段</h3><div class="aw-research-sources">'+topic.sources.map((s,i)=>'<button type="button" data-research-source="'+i+'" aria-pressed="'+(state.researchSource===i)+'">'+s[0]+'</button>').join('')+'</div><blockquote class="aw-research-excerpt">'+source[1]+'</blockquote><p class="aw-result-note">预设分析与官方原文分别呈现；关联不等于因果或客户需求。</p></section></div></details><div class="aw-network-bottom"><button type="button" data-show-brief '+(!state.briefTopics.length?'disabled':'')+'>查看研究简报 ('+state.briefTopics.length+')</button><button type="button" data-project-signal="0">查看项目型情报示例 →</button></div>'+
 (state.showResearchBrief&&state.briefTopics.length?'<section class="aw-research-brief"><div class="aw-panel-title"><h3>行业研究简报 · 预设内容</h3><button type="button" data-show-brief class="aw-inline-link">收起</button></div>'+state.briefTopics.map(i=>'<article><h4>'+researchTopics[i].title+'</h4><p>'+researchTopics[i].summary+'</p><p>'+researchTopics[i].implication+'</p><a href="'+researchReferences[researchIndustries.findIndex(g=>g.topics.includes(i))].url+'" target="_blank" rel="noopener noreferrer">参考原文 ↗</a></article>').join('')+'</section>':'');
}
function intelligencePage(){
 const visible=projectSignals.map((x,i)=>({...x,id:i})).filter(x=>state.signalKind==='全部'||x.kind===state.signalKind),item=projectSignals[state.projectSignal],confirmed=state.intelFollowups.includes(state.projectSignal);
 return '<div class="aw-project-intro"><b>从具体事件，判断下一步跟什么。</b><p>关注谁在做什么、项目处于哪一步，以及还缺哪些条件。</p></div><div class="aw-signal-filters" role="group" aria-label="项目事件类型">'+['全部','调研规划','需求征询','试点合作'].map(x=>'<button type="button" data-signal-kind="'+x+'" aria-pressed="'+(x===state.signalKind)+'">'+x+'</button>').join('')+'</div><div class="aw-project-grid"><div class="aw-project-queue">'+visible.map(x=>'<button type="button" data-project-signal="'+x.id+'" aria-pressed="'+(x.id===state.projectSignal)+'"><small>'+x.kind+' · '+x.stage+'</small><b>'+x.title+'</b><span>建议动作：'+x.action+'</span></button>').join('')+'</div><article class="aw-project-detail"><div class="aw-meta">'+badge(item.kind)+badge(item.stage)+'</div><h3>'+item.title+'</h3><section><h4>项目事件 · 预设事实</h4><p>'+item.fact+'</p></section><section><h4>合作方向 · 业务判断</h4><p>'+item.meaning+'</p></section><section class="aw-project-verify"><h4>推进前还需核实</h4><ul>'+item.verify.map(x=>'<li>'+x+'</li>').join('')+'</ul></section><section><h4>关联业务</h4>'+fields([['事件主体',item.subject],['已有商机',oppName(opportunities[item.opp])],['建议行动',item.next]])+'</section><div class="aw-project-confirm"><span>人工确认后建立跟进；关联已有对象，不自动新建商机。</span><div><button type="button" data-confirm-project-signal class="aw-blue-button">'+(confirmed?'已建立演示跟进 ✓':'确认建立跟进')+'</button>'+openOppButton(opportunities[item.opp],'查看关联商机')+'</div></div></article></div>';
}

function renderPage(){
 if(!pages[state.page])state.page='ai';
 root.querySelectorAll('.aw-sidebar [data-page]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.page===state.page)));
 q('[data-mobile-nav]').value=state.page;
 q('.aw-top b').textContent=pages[state.page][0];q('.aw-top small').textContent=pages[state.page][1];
 root.querySelectorAll('.aw-bottom-nav button:not([data-more-toggle])').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mobileAction?state.page==='opportunities'&&state.oppAction===b.dataset.mobileAction:b.dataset.page===state.page)));
 q('[data-more-toggle]').classList.toggle('aw-nav-selected',!['today','ai','news'].includes(state.page)&&!(state.page==='opportunities'&&state.oppAction==='prepare'));
 const isAI=state.page==='ai';q('.aw-chat').hidden=!isAI;q('.aw-sessions').hidden=!isAI;q('[data-module]').hidden=isAI;q('.aw-body').classList.toggle('aw-module-mode',!isAI);
 if(isAI)return;
 let html='<div class="aw-module-heading"><h2>'+pages[state.page][0]+'</h2>'+badge('虚构案例')+'</div>';
 const current=Math.min(Math.max(Number(state.record)||0,0),2),customer=demoCustomers[current];
 if(state.page==='today')html+=todayPage();
 if(state.page==='customers'){
  html+='<div class="aw-split"><div>'+demoCustomers.map((x,i)=>'<button type="button" data-record="'+i+'" class="aw-record cursor-interaction" aria-pressed="'+(i===current)+'"><div><b>'+x.name+'</b><span>'+x.type+' · 点击查看背景</span></div><span>›</span></button>').join('')+'</div><article class="aw-detail"><div class="aw-meta"><span>'+customer.type+'</span><span>虚构客户</span></div><h3>'+customer.name+'</h3>'+fields([['已知问题',customer.need],['沟通记录',current===0&&state.confirmed?(state.confirmed==='supplier'?'已有软件供应商，先不讨论更换系统。':'想先核实仓运协同与数据问题，再考虑系统改造。'):customer.contact],['待核实', '预算、时间安排和实际决策流程。'],['关联业务',current===0?'物流园区智能化转型诊断（示例商机）':'初步需求线索（示例）']])+'<div class="aw-mod-toolbar"><button type="button" data-analyze="customer" class="cursor-interaction">体验园区 A 的客户洞察 →</button>'+action('opportunities','查看关联商机')+'</div></article></div>';
 }
 if(state.page==='opportunities')html+=opportunitiesPage();
 if(state.page==='projects'){
  const stageNames=['准备中','开展调研','整理初稿','交付确认'];
  html+='<article class="aw-mod-panel"><div class="aw-meta"><span>示例数据服务机构 C</span><span>独立虚构项目</span></div><h3>示例项目 · 物流数据共享场景研究</h3><div class="aw-stages">'+stageNames.map((x,i)=>'<span class="'+(i===state.projectStage?'current':'')+'">'+x+'</span>').join('')+'</div>'+fields([['当前节点',stageNames[state.projectStage]],['本阶段记录',['核对调研范围与资料需求。','记录访谈发现与待确认问题。','将已确认信息整理为可评审文本。','确认交付清单及遗留事项。'][state.projectStage]],['负责人','示例负责人'],['金额与日期','本演示不展示']])+'<div class="aw-mod-toolbar"><button type="button" data-project-back class="cursor-interaction" '+(state.projectStage===0?'disabled':'')+'>上一节点</button><button type="button" data-project-next class="cursor-interaction" '+(state.projectStage===3?'disabled':'')+'>演示推进下一节点 →</button>'+action('materials','查看项目材料')+'</div><p class="aw-result-note">节点仅为通用演示，不对应企业内部审批或交付流程。</p></article>';
 }
 if(state.page==='news')html+=researchPage();
 if(state.page==='intelligence')html+=intelligencePage();
 if(state.page==='materials'){
  const titles={background:'一、项目背景',work:'二、主要工作内容',delivery:'三、交付与待确认事项'};
  let body=state.materialChapter==='background'?'示例物流园区 A 的仓储与运输系统分别记录订单状态，同一批货物需要人工核对。拟先梳理业务与数据断点，再讨论智能化改造路径。':state.materialChapter==='delivery'?'拟形成流程图、问题清单与改进优先级；具体范围经客户核对后确认。预算与周期仍待补充。':state.materialRewrite?'选取一票脱敏货物订单，访谈仓储与运输人员，核对订单状态、库存记录和运单字段；形成系统与数据清单、仓运衔接图及分期改造建议。':'围绕仓储、运输与订单数据协同开展现状诊断，提出智能化改造建议。';
  html+='<div class="aw-split"><div><button type="button" class="aw-record" aria-pressed="true" data-material-open><div><b>物流园区智能化转型诊断建议</b><span>示例物流园区 A · 虚构材料</span></div></button><p class="aw-result-note">事实：预设沟通记录<br>结构：通用建议书模板</p></div><div><div class="aw-mod-toolbar">'+Object.entries(titles).map(([key,title])=>'<button type="button" data-material-chapter="'+key+'" aria-pressed="'+(state.materialChapter===key)+'" class="cursor-interaction">'+title.slice(2)+'</button>').join('')+'</div><article class="aw-document-preview"><small>正文节选 · 可操作演示</small><h3>'+titles[state.materialChapter]+'</h3><p>'+(state.materialRewrite&&state.materialChapter==='work'?'<mark>'+body+'</mark>':body)+'</p>'+(state.confirmed?'<p>已复用本次确认反馈：'+(state.confirmed==='supplier'?'已有供应商，不以更换系统为前提。':'先核实仓运协同与数据问题，再讨论改造。')+'</p>':'')+'<small>预算：待确认　周期：待确认</small></article><div class="aw-mod-toolbar">'+(state.materialChapter==='work'?'<button type="button" data-material-rewrite class="cursor-interaction">'+(state.materialRewrite?'查看改写前':'AI 改写演示：写清具体工作')+'</button>':'')+'<button type="button" data-material-evidence class="cursor-interaction">查看事实依据</button></div></div></div>';
 }
 if(state.page==='dashboard')html+=dashboardPage();
 html+='<p class="aw-mod-status" data-module-status role="status" aria-live="polite">'+(state.page==='news'?'选择专题、比较参考片段，整理行业研究简报。':state.page==='intelligence'?'选择项目事件，核对事实与条件，再确认跟进。':'点击记录查看详情；操作仅影响演示状态。')+'</p>';
 q('[data-module]').innerHTML=html;
}
function render(){
 renderPage();if(state.page!=='ai')return;
 const t=scenes[state.scene];
 q('[data-welcome]').hidden=state.sent;q('[data-conversation]').hidden=!state.sent;
 root.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene===state.scene)));
 q('#aw-prompt').value=t?t.prompt:'';q('#aw-prompt').rows=t?5:2;q('[data-send]').disabled=!t;
 q('[data-prompt-label]').textContent=t?'预设任务 / '+t.name:'选择上方场景，载入一条具体任务';
 q('[data-history]').textContent=state.sent?t.title:'暂无历史会话';
 if(!state.sent){q('[data-status]').textContent=t?'任务已载入，点击“查看示例”展示对应预设结果。':'四个场景均可直接体验，客户、商机与业务内容均为虚构。';return;}
 const conversation=q('[data-conversation]');conversation.replaceChildren();
 const message=document.createElement('div');message.className='aw-user-message';const promptLabel=document.createElement('b');promptLabel.className='aw-message-label';promptLabel.textContent='你的任务';const promptText=document.createElement('p');promptText.textContent=t.prompt;message.append(promptLabel,promptText);
 const answer=document.createElement('article');answer.className='aw-answer';answer.innerHTML='<div class="aw-answer-head"><span class="aw-answer-avatar" aria-hidden="true">AI</span><div><b>AI 工作台 · '+t.name+'</b><small>预设结果 · 可查看依据</small></div></div>'+t.answer;
 conversation.append(message,answer);
 if(state.scene==='customer'){
  const form=document.createElement('div');form.className='aw-switch';form.innerHTML='<label for="aw-feedback">补充一条客户反馈</label><select id="aw-feedback" aria-label="客户新反馈"><option value="diagnose">想先核实仓运协同与数据问题，再考虑系统改造。</option><option value="supplier">已有软件供应商，先不讨论更换系统。</option></select><button type="button" data-confirm class="cursor-interaction"></button>';
  answer.append(form);q('#aw-feedback').value=state.feedback;q('[data-confirm]').textContent=state.confirmed===state.feedback?'本条反馈已确认 ✓':'确认反馈，带入后续任务';
 }
 if(state.scene==='opportunity')q('[data-context-answer]').textContent=state.confirmed==='supplier'?'已确认反馈：客户已有供应商。应先调查现有系统使用问题，不以更换系统为前提。':state.confirmed==='diagnose'?'已确认反馈：客户希望先弄清流程问题，再决定是否更换系统。':'沟通背景：暂无新增确认反馈；当前仅基于虚构客户记录。';
 if(state.scene==='document'){
 q('[data-paragraph]').textContent=state.rewritten?'选取一票脱敏货物订单，访谈仓储与运输人员，核对订单状态、库存记录和运单字段；形成系统与数据清单、仓运衔接图及分期改造建议，供客户确认后续范围。':'围绕仓储、运输与订单数据协同开展现状诊断，提出智能化改造建议。';
 q('[data-paragraph]').style.background=state.rewritten?'var(--aw-hover)':'transparent';
 q('[data-document-context]').textContent=state.confirmed==='supplier'?'根据已确认反馈，本次不以更换现有供应商为前提。':state.confirmed==='diagnose'?'根据已确认反馈，先核实仓运协同与数据问题，再讨论改造。':'本段使用预设客户背景；尚无本次新增确认反馈。';
 q('[data-rewrite]').textContent=state.rewritten?'查看改写前':'演示：把表述改得更具体';
 }
 const actions=document.createElement('div');actions.className='aw-followups';actions.innerHTML='<button type="button" data-follow="'+t.next+'" class="cursor-interaction">'+t.follow+' →</button><button type="button" data-home class="cursor-interaction">选择其他任务</button>';conversation.append(actions);
 q('[data-status]').textContent='预设结果已展示，可展开依据或继续下一项任务。';
}
function closeMore(){q('#aw-more-panel').hidden=true;q('[data-more-toggle]').setAttribute('aria-expanded','false');}
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-more-toggle')){const open=q('#aw-more-panel').hidden;q('#aw-more-panel').hidden=!open;b.setAttribute('aria-expanded',String(open));if(open)q('#aw-more-panel [data-page]').focus({preventScroll:true});}if(b.hasAttribute('data-more-close')){closeMore();q('[data-more-toggle]').focus({preventScroll:true});}if(b.dataset.page)closeMore();});
root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!q('#aw-more-panel').hidden){closeMore();q('[data-more-toggle]').focus({preventScroll:true});}});
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-reset-demo')){state=initialState();render();save();}else if(b.hasAttribute('data-send')){if(!scenes[state.scene])return;state.sent=true;render();revealMobile('[data-conversation]');}else if(b.dataset.scene){state.page='ai';state.scene=b.dataset.scene;state.sent=false;render();revealMobile('.aw-composer');}else if(b.hasAttribute('data-new')){state={...state,scene:null,sent:false,feedback:'diagnose',confirmed:null,rewritten:false};render();}else if(b.dataset.follow){state.scene=b.dataset.follow;state.sent=true;render();revealMobile('[data-conversation]');}else if(b.hasAttribute('data-home')){state.sent=false;render();revealMobile('[data-welcome]');}else if(b.hasAttribute('data-confirm')){state.confirmed=state.feedback;render();q('[data-status]').textContent='反馈已确认；商机研判与材料创作将复用这条信息。';}else if(b.hasAttribute('data-rewrite')){state.rewritten=!state.rewritten;render();}else return;save();});
root.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;

 if(b.hasAttribute('data-mobile-action')){closeMore();state.page='opportunities';state.oppAction=b.dataset.mobileAction;state.oppStage=oppStages[pickedOpp().stage];render();save();revealMobile('.aw-op-assistant');return;}
 if(b.hasAttribute('data-open-opp')){state.page='opportunities';state.record=Number(b.dataset.openOpp);state.oppStage=oppStages[pickedOpp().stage];state.oppAction='prepare';render();save();return;}
 if(b.hasAttribute('data-select-opp')){state.record=Number(b.dataset.selectOpp);state.meetingDraft=false;render();save();return;}
 if(b.hasAttribute('data-opp-stage')){state.oppStage=b.dataset.oppStage;if(state.oppStage!=='全部')state.record=opportunities.find(o=>oppStages[o.stage]===state.oppStage).id;render();save();return;}
 let toolNotice='';
 if(b.hasAttribute('data-opp-action')){state.oppAction=b.dataset.oppAction;}
 else if(b.hasAttribute('data-today-advice')){state.todayAdvice=!state.todayAdvice;}
 else if(b.hasAttribute('data-extract-meeting')){state.meetingDraft=true;}
 else if(b.hasAttribute('data-confirm-meeting')){const o=pickedOpp();state.meetings[o.id]={preset:state.meetingPreset};if(o.customer===0)state.confirmed=state.meetingPreset;addTodayTask('meeting-'+o.id,'会后跟进：'+demoCustomers[o.customer].name+'，准备脱敏订单样例并确认下次沟通');toolNotice='已确认并关联本条商机；今日工作台新增一项跟进。';}
 else if(b.hasAttribute('data-scope')){state.scope=b.dataset.scope;}
 else if(b.hasAttribute('data-role-choice')){state.roleChoice=b.dataset.roleChoice;state.roleNext=false;}
 else if(b.hasAttribute('data-role-next')){state.roleNext=true;}
 else if(b.hasAttribute('data-add-prep')){const o=pickedOpp();addTodayTask('prepare-'+o.id,'见客准备：'+oppName(o)+'，收集典型表格与访谈问题');toolNotice='见客准备已加入今日工作台。';}
 else if(b.hasAttribute('data-add-ai-advice')){const o=pickedOpp();addTodayTask('advice-'+o.id,'推进建议：'+oppName(o)+'，核对参与人、资料与范围');toolNotice='推进建议已加入今日工作台。';}
 else if(b.hasAttribute('data-dash-stage')){state.dashStage=Number(b.dataset.dashStage);}
 else if(b.hasAttribute('data-dash-all')){state.dashStage=null;}
 else {toolNotice=null;}
 if(toolNotice!==null){render();if(toolNotice&&q('[data-module-status]'))q('[data-module-status]').textContent=toolNotice;save();return;}

 if(b.hasAttribute('data-research-topic')){state.researchTopic=Number(b.dataset.researchTopic);state.researchSource=0;render();save();return;}
 if(b.hasAttribute('data-research-source')){state.researchSource=Number(b.dataset.researchSource);render();q('.aw-research-deep').open=true;save();return;}
 if(b.hasAttribute('data-save-research')){if(!state.briefTopics.includes(state.researchTopic))state.briefTopics.push(state.researchTopic);render();save();return;}
 if(b.hasAttribute('data-show-brief')){state.showResearchBrief=!state.showResearchBrief;render();save();return;}
 if(b.hasAttribute('data-project-signal')){if(state.page!=='intelligence')state.signalKind='全部';state.page='intelligence';state.projectSignal=Number(b.dataset.projectSignal);render();save();return;}
 if(b.hasAttribute('data-signal-kind')){state.signalKind=b.dataset.signalKind;const idx=projectSignals.findIndex(x=>state.signalKind==='全部'||x.kind===state.signalKind);if(state.signalKind!=='全部')state.projectSignal=idx;render();save();return;}
 if(b.hasAttribute('data-confirm-project-signal')){const id=state.projectSignal,item=projectSignals[id];if(!state.intelFollowups.includes(id))state.intelFollowups.push(id);addTodayTask('project-signal-'+id,item.subject+'：'+item.next);render();q('[data-module-status]').textContent='该项目事件的跟进已汇入今日工作台；未新建真实商机。';save();return;}
 if(b.dataset.page){go(b.dataset.page);return;}
 if(b.dataset.analyze){go('ai',b.dataset.analyze);return;}
 if(b.hasAttribute('data-record')){state.record=Number(b.dataset.record);render();save();return;}
 let notice='';
 if(b.hasAttribute('data-project-back')){state.projectStage=Math.max(0,state.projectStage-1);notice='已更新演示项目节点。';}
 else if(b.hasAttribute('data-project-next')){state.projectStage=Math.min(3,state.projectStage+1);notice='已更新演示项目节点。';}
 else if(b.hasAttribute('data-material-chapter')){state.materialChapter=b.dataset.materialChapter;}
 else if(b.hasAttribute('data-material-rewrite')){state.materialRewrite=!state.materialRewrite;notice='已切换改写前后文本，仅使用预设内容。';}
 else if(b.hasAttribute('data-material-evidence')){notice='事实依据：预设客户沟通——“仓库和运输系统里的订单状态对不上，同一批货物需要人工核对”。不引用真实客户资料。';}
 else if(b.hasAttribute('data-material-open')){state.materialChapter='background';}
 else return;
 render();if(notice&&q('[data-module-status]'))q('[data-module-status]').textContent=notice;save();
});
root.addEventListener('change',e=>{
 if(e.target.hasAttribute('data-research-picker')){state.researchTopic=Number(e.target.value);state.researchSource=0;render();save();}
 if(e.target.hasAttribute('data-meeting-preset')){state.meetingPreset=e.target.value;state.meetingDraft=false;render();save();}
 if(e.target.id==='aw-feedback'){state.feedback=e.target.value;save();}
 if(e.target.hasAttribute('data-mobile-nav'))go(e.target.value);
 if(e.target.hasAttribute('data-todo')){const id=e.target.dataset.todo;state.todos=state.todos.filter(x=>x!==id);if(e.target.checked)state.todos.push(id);render();q('[data-module-status]').textContent='演示待办已更新，可取消勾选。';save();}
});

render();
let heightFrame=0;
function reportHeight(){cancelAnimationFrame(heightFrame);heightFrame=requestAnimationFrame(()=>{if(window.parent!==window)window.parent.postMessage({type:'stella-demo-size',height:Math.ceil(root.getBoundingClientRect().height),page:state.page},window.location.origin);});}
new ResizeObserver(reportHeight).observe(root);
new MutationObserver(reportHeight).observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class']});
window.addEventListener('resize',reportHeight);
window.addEventListener('message',e=>{if(e.source!==window.parent||e.origin!==location.origin)return;if(e.data?.type==='stella-demo-start'){state.page='ai';state.sent=false;render();save();q('[data-scene="intel"]').focus({preventScroll:true});}if(e.data?.type==='stella-demo-reset'){state=initialState();render();save();}reportHeight();});
reportHeight();
})();
