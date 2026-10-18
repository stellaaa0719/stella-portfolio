(() => {
'use strict';
const $ = id => document.getElementById(id);
const refs = [
 {source:'能力摘要 · 依据平台现有能力配置整理',quote:'物流大数据与数字化：数据治理、物流大数据平台可研与公共数据产品；物流园区／枢纽规划与运营：园区规划、可研及运营指导。',reason:'政策提出系统集成与数据交换，公司能力覆盖数据治理和园区规划。因此切入点具体到“现状诊断 + 改造路径”，先讨论咨询范围。',next:'建议：带系统与数据现状访谈提纲，找园区运营或信息化负责人。'},
 {source:'历史项目方法片段 · 演示参考',quote:'前期调研先盘点业务流程、系统接口与数据责任人，梳理人工重复录入及跨系统断点；形成问题清单，再确定分期改造范围。',reason:'这一方法把宽泛的“数字化改造”转成可执行的调研。先交付系统清单、数据流转图和问题优先级，帮助客户讨论下一步。',next:'建议调整：首次沟通先收集系统清单与一条典型作业流程，再讨论建设方案。'},
 {source:'核实清单 · 推断与事实分开',quote:'政策方向明确，但示例园区是否存在系统断点、谁有决策权、是否有预算和近期改造计划，都还需要客户确认。',reason:'公司有相关能力，只能说明可能匹配；需要客户反馈支持具体需求。没有依据的金额和周期不进入正式承诺。',next:'建议调整：先安排需求访谈；若近期没有改造安排，则保留线索，暂不新建项目商机。'}
];
function bindTabs(buttons,onSelect){buttons.forEach((button,i)=>{button.addEventListener('click',()=>onSelect(i));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();const n=buttons.length;const next=event.key==='Home'?0:event.key==='End'?n-1:(i+(['ArrowLeft','ArrowUp'].includes(event.key)?-1:1)+n)%n;onSelect(next);buttons[next].focus();});});}
const refTabs=[...document.querySelectorAll('[data-ref]')];
function selectRef(i){const item=refs[i];refTabs.forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;});$('reference-panel').setAttribute('aria-labelledby','ref-tab-'+i);const card=document.createElement('div');card.className='reference-card';for(const [tag,text,cls] of [['small',item.source,''],['blockquote',item.quote,''],['p',item.reason,'reason'],['p',item.next,'']]){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;card.append(n);}$('reference-panel').replaceChildren(card);}
bindTabs(refTabs,selectRef);selectRef(0);
let returnFocus=null;
const dialogs=[...document.querySelectorAll('.study-dialog')];
function openDialog(key,trigger){const current=dialogs.find(d=>d.open);if(!current)returnFocus=trigger;else current.close();const dialog=$('case-'+key);if(key==='materials')syncMaterialContext();dialog.showModal();document.documentElement.classList.add('study-modal-open');dialog.querySelector('[data-close]').focus();}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openDialog(b.dataset.open,b)));
dialogs.forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});d.addEventListener('close',()=>{if(!dialogs.some(x=>x.open)){document.documentElement.classList.remove('study-modal-open');returnFocus?.focus();}});});
$('follow-lead').addEventListener('click',event=>{ $('decision-status').textContent='已准备跟进草稿，核对后再确认。';openDialog('operations',event.currentTarget);});
document.querySelectorAll('[data-decision]').forEach(b=>b.addEventListener('click',()=>{$('decision-status').textContent=b.dataset.decision==='investigate'?'调查清单已标记：补齐发布来源，核实园区现状、负责人及改造安排。':'已标记为暂不处理；获得新的政策或客户信息后可重新研判。';}));
let savedRecord=null;
const help={followup:'复用已有客户与商机，只追加跟进内容。',customer:'仅形成客户档案，不连带创建空商机；如存在同名客户，优先复用。',opportunity:'有明确合作事项时才创建商机草稿，关联已有客户并核对需求。'};
const labels={followup:'确认跟进记录 ✓',customer:'确认客户档案 ✓',opportunity:'确认商机草稿 ✓'};
function updateKind(){const kind=$('record-kind').value;$('kind-help').textContent=help[kind];$('opportunity-name').value=kind==='customer'?'无 · 不创建商机':'园区数字化咨询';$('confirm-record').textContent=labels[kind];invalidateRecord();}
function invalidateRecord(){savedRecord=null;$('record-result').textContent='待确认 · 尚未写入演示记录';}
$('record-kind').addEventListener('change',updateKind);
$('followup-form').addEventListener('input',invalidateRecord);
$('followup-form').addEventListener('submit',event=>{event.preventDefault();const owner=$('record-owner').value.trim(),need=$('record-need').value.trim(),next=$('record-next').value.trim();if(!owner||!need||!next){$('record-result').textContent='请补充负责人、需求摘要和下一步行动。';return;}savedRecord={kind:$('record-kind').value,owner,need,next};const action={followup:'已关联已有客户与商机，确认跟进记录',customer:'已确认客户档案，不创建商机',opportunity:'已关联已有客户，确认新商机草稿'}[savedRecord.kind];$('record-result').textContent=`${action}。\n负责人：${owner}\n需求：${need}\n下一步：${next}\n已确认 · 仅保留在当前页面`;});
$('reset-record').addEventListener('click',()=>{$('followup-form').reset();updateKind();});updateKind();
const chapterTitles=['01 项目背景','02 需求与目标','03 实施路径','04 待补充事项'];
const initialChapters=[
'《物流网建设实施方案》提出物流设施设备数智化转型与物流信息互联互通的方向。示例园区希望梳理系统与数据问题，可从现状诊断入手，明确后续改造范围。\n\n本建议书以示例沟通记录和所附方案片段为背景，具体需求仍需访谈核实。',
'初步目标：识别仓储、运输与园区管理之间的数据断点，形成系统清单、业务流程与问题优先级。\n\n建议与园区运营和信息化负责人共同确认典型作业场景、数据责任人及改造约束。预算与周期待补充。',
'第一阶段｜现状调研\n访谈运营与信息化负责人，盘点现有系统，梳理一条典型作业流程及人工重复录入环节。\n\n第二阶段｜诊断与路径设计\n形成系统清单、数据流转图和问题优先级，讨论数据治理、接口协同与分期改造范围。\n\n第三阶段｜方案讨论\n结合客户确认的需求与资源条件修订项目范围。实施周期与预算待补充。',
'待客户确认：\n1. 现有系统与接口清单。\n2. 主要业务痛点及优先级。\n3. 决策人和跨部门配合安排。\n4. 预算范围：待补充。\n5. 实施周期：待补充。\n6. 政策适用条件及原始发布信息：待核对。'
];
const sources=['依据：所附方案第 5、7 页 + 示例沟通记录','依据：客户任务背景；目标范围需访谈确认','参考：演示历史方法；结构：项目建议书模板','依据：信息缺口清单；不从模板补造预算和周期'];
let chapters=[...initialChapters],currentChapter=0;
const chapterTabs=[...document.querySelectorAll('[data-chapter]')];
function selectChapter(i){currentChapter=i;chapterTabs.forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;});$('chapter-panel').setAttribute('aria-labelledby','chapter-tab-'+i);$('editor-label').textContent=chapterTitles[i]+' · 可编辑';$('chapter-editor').value=chapters[i];$('chapter-source').textContent=sources[i];}
bindTabs(chapterTabs,selectChapter);selectChapter(0);
$('chapter-editor').addEventListener('input',()=>{chapters[currentChapter]=$('chapter-editor').value;$('editor-status').textContent='修改已保留在当前页面，切换章节不会丢失；可导出为 TXT。';});
function syncMaterialContext(){const line=savedRecord?`已确认${savedRecord.kind==='customer'?'客户背景':'记录'} · ${savedRecord.owner} · ${savedRecord.need} · 下一步：${savedRecord.next}`:'园区数字化咨询 · 使用预置示例沟通记录';$('material-context').textContent=line;}
$('download-draft').addEventListener('click',()=>{const text='演示案例｜园区数字化改造建议书\n\n'+$('material-context').textContent+'\n\n'+chapters.map((c,i)=>chapterTitles[i]+'\n\n'+c).join('\n\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='演示案例-园区数字化改造建议书.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('editor-status').textContent='已导出当前四个章节及关联背景，包含你的编辑内容。';});
$('reset-draft').addEventListener('click',()=>{chapters=[...initialChapters];selectChapter(0);$('editor-status').textContent='已恢复示例初稿。预算与周期保留待补充。';});
})();
