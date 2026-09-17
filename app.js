const benchmark = [
  {id:1,title:"The sacrifice behind the uniform",type:"emotion",source:"01:54:19–01:55:18",duration:"53 sec",anchor:"A 17-year-old child is away from his family.",scores:{hook:84,payoff:88,density:79},versions:{emotional:[
    ["keep","01:54:19","A 17-year-old child is away from his family.","Emotional anchor"],
    ["keep","01:54:25","My friends were going to college and enjoying normal life.","Contrast raises the cost"],
    ["cut","01:54:34","We had a very rigorous schedule and many different kinds of training.","True, but generic and slows the story"],
    ["keep","01:54:43","There were nights when I could not sleep or speak to my mother.","Specific emotional detail"],
    ["keep","01:54:54","A hundred people waited for the phone. We got only two minutes.","Concrete payoff"]],fast:[
    ["keep","01:54:19","A 17-year-old child is away from his family.","Immediate anchor"],
    ["cut","01:54:25","My friends were going to college and enjoying normal life.","Useful, but not essential in the fast version"],
    ["keep","01:54:43","There were nights when I could not sleep or speak to my mother.","Escalation"],
    ["keep","01:54:54","A hundred people waited for the phone. We got only two minutes.","Payoff"]]}},
  {id:2,title:"ADCs to the President cannot get married",type:"surprise",source:"02:07:09–02:07:50",duration:"28 sec",anchor:"There is a clause that ADCs cannot get married.",scores:{hook:94,payoff:83,density:92},versions:{fast:[
    ["keep","02:07:20","I am not married.","Clean entry"],
    ["keep","02:07:23","There is a clause that ADCs cannot get married.","Surprise anchor"],
    ["keep","02:07:31","They have to stay away from family.","Consequence"],
    ["keep","02:07:38","I could not go out like a normal person and enjoy life.","Personal payoff"]],emotional:[
    ["keep","02:07:09","But has there been a sacrifice?", "Question creates context"],
    ["keep","02:07:20","I am not married. There is a clause that ADCs cannot get married.","Revelation"],
    ["keep","02:07:31","They have to stay away from family.","Emotional consequence"],
    ["keep","02:07:38","I could not go out like a normal person and enjoy life.","Payoff"]]}},
  {id:3,title:"What did becoming the President’s ADC cost him?",type:"emotion",source:"02:06:10–02:07:50",duration:"37 sec",anchor:"What is the personal cost that you have paid?",scores:{hook:89,payoff:90,density:86},versions:{emotional:[
    ["keep","02:06:10","What is the personal cost that you have paid to become the ADC to the President?","Strong question hook"],
    ["cut","02:06:15","I was shortlisted, spoke to people and asked my commanding officer for advice.","Relevant backstory, but delays the answer by nearly a minute"],
    ["keep","02:07:09","But has there been a sacrifice? Personally, what?","Bridge after jump"],
    ["keep","02:07:20","I am not married. ADCs cannot get married while serving.","Main revelation"],
    ["keep","02:07:31","They stay away from family and cannot live like a normal person.","Payoff"]],fast:[
    ["cut","02:06:10","What is the personal cost that you have paid?","Headline already supplies context"],
    ["keep","02:07:20","I am not married. ADCs cannot get married while serving.","Start on revelation"],
    ["keep","02:07:31","They stay away from family and cannot live like a normal person.","Payoff"]]}},
  {id:4,title:"What is the definition of a good man?",type:"universal",source:"02:10:45–02:11:39",duration:"56 sec",anchor:"What is the definition of a good man?",scores:{hook:87,payoff:85,density:76},versions:{emotional:[
    ["cut","02:10:27","You should dream beyond your capabilities and be impractical.","Broader topic; not needed for this sub-question"],
    ["keep","02:10:45","You said you want to be a good man. What is the definition of a good man?","Universal question hook"],
    ["keep","02:10:55","A good man is first happy within himself.","Direct answer"],
    ["keep","02:11:08","Nobody inherently wants to do wrong.","Provocative belief"],
    ["keep","02:11:20","Sometimes circumstances push people into decisions they would not otherwise take.","Nuanced payoff"]],fast:[
    ["keep","02:10:45","What is the definition of a good man?","Question hook"],
    ["keep","02:10:55","A good man is first happy within himself.","Answer"],
    ["cut","02:11:08","Nobody inherently wants to do wrong.","Requires more explanation"],
    ["keep","02:11:20","Circumstances can push people into decisions they would not otherwise take.","Payoff"]]}},
  {id:5,title:"The 17-year-old most people never see",type:"emotion",source:"01:54:19–01:54:52",duration:"26 sec",anchor:"Behind every soldier is a child who left normal life early.",scores:{hook:86,payoff:81,density:91},versions:{fast:[
    ["keep","01:54:19","A 17-year-old child is away from his family.","Immediate emotional anchor"],
    ["keep","01:54:25","His friends are going to college and enjoying life.","Contrast"],
    ["cut","01:54:32","There are boundaries, schedules and many stages of training.","Generic explanation"],
    ["keep","01:54:43","He is awake at night, unable to speak to his mother.","Strong ending"]],emotional:[
    ["keep","01:54:19","A 17-year-old child is away from his family.","Anchor"],
    ["keep","01:54:25","His friends are going to college and enjoying life.","Contrast"],
    ["keep","01:54:32","He is living inside boundary walls under rigorous training.","Visual context"],
    ["keep","01:54:43","He is awake at night, unable to speak to his mother.","Emotional payoff"]]}}
];

const $ = s => document.querySelector(s);
const states = {empty:$('#emptyState'),loading:$('#loadingState'),results:$('#results')};
let candidates = benchmark, selectedId = 1, selectedVersion = 'emotional';

function show(name){Object.entries(states).forEach(([k,v])=>v.classList.toggle('hidden',k!==name));}
function render(filter='all'){
  const visible=candidates.filter(c=>filter==='all'||c.type===filter);
  $('#resultCount').textContent=visible.length;
  $('#candidateList').innerHTML=visible.map(c=>`<button class="candidate ${c.id===selectedId?'active':''}" data-id="${c.id}"><div class="candidate-top"><div><span class="tag">${c.type}</span><h3>${c.title}</h3></div><span class="duration">${c.duration}</span></div><p>${c.source}</p><div class="metrics"><span>Hook <b>${c.scores.hook}</b></span><span>Payoff <b>${c.scores.payoff}</b></span><span>Density <b>${c.scores.density}</b></span></div></button>`).join('');
  document.querySelectorAll('.candidate').forEach(b=>b.onclick=()=>{selectedId=+b.dataset.id;selectedVersion='emotional';render(filter)});
  if(!visible.some(c=>c.id===selectedId)&&visible[0])selectedId=visible[0].id;
  renderDetail(candidates.find(c=>c.id===selectedId));
}
function renderDetail(c){if(!c)return;const keys=Object.keys(c.versions);if(!keys.includes(selectedVersion))selectedVersion=keys[0];const segs=c.versions[selectedVersion];const kept=segs.filter(s=>s[0]==='keep').length;$('#detailPanel').innerHTML=`<div class="detail-head"><span class="tag">${c.type} anchor</span><h3>${c.title}</h3><div class="detail-meta"><span>Source ${c.source}</span><span>•</span><span>Final ${c.duration}</span></div><div class="anchor">“${c.anchor}”</div></div><div class="version-tabs">${keys.map(k=>`<button class="${k===selectedVersion?'active':''}" data-version="${k}">${k==='fast'?'Fast cut':'Emotional cut'}</button>`).join('')}</div><div class="timeline">${segs.map(s=>`<div class="segment ${s[0]}"><div class="segment-state">${s[0]}</div><div class="segment-time">${s[1]}</div><div class="segment-copy">${s[2]}<span class="reason">${s[3]}</span></div></div>`).join('')}</div><div class="detail-foot"><div class="retention"><strong>${kept}/${segs.length}</strong> segments retained</div><button class="copy-plan">Copy cut plan</button></div>`;
  document.querySelectorAll('[data-version]').forEach(b=>b.onclick=()=>{selectedVersion=b.dataset.version;renderDetail(c)});
  $('.copy-plan').onclick=async()=>{const text=[c.title,`Source: ${c.source}`, ...segs.map(s=>`${s[1]} ${s[0].toUpperCase()} — ${s[2]} (${s[3]})`)].join('\n');await navigator.clipboard.writeText(text);$('.copy-plan').textContent='Copied';setTimeout(()=>$('.copy-plan').textContent='Copy cut plan',1200)};
}
async function analyse(){
  const url=$('#youtubeUrl').value.trim(), transcript=$('#transcript').value.trim();
  if(!url&&!transcript){$('#youtubeUrl').focus();return}
  show('loading');let p=10;const labels=[[22,'Retrieving captions'],[43,'Mapping the conversation'],[62,'Finding anchor lines'],[79,'Constructing alternate edits'],[91,'Checking that meaning is preserved']];const timer=setInterval(()=>{p=Math.min(94,p+Math.random()*7);$('#progressBar').style.width=p+'%';$('#loadingPercent').textContent=Math.round(p)+'%';const item=[...labels].reverse().find(x=>p>=x[0]);if(item)$('#loadingLabel').textContent=item[1]},500);
  try{
    const api=localStorage.getItem('cutroomApi') || 'https://cutroom-api.abhirx99.workers.dev';
    if(api){const res=await fetch(api.replace(/\/$/,'')+'/api/analyze',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({youtubeUrl:url,transcript,language:$('#language').value,duration:$('#duration').value,headlineContext:$('#headlineContext').checked})});if(!res.ok)throw new Error((await res.json().catch(()=>({}))).error||'Analysis failed');const data=await res.json();candidates=data.candidates}
    else{await new Promise(r=>setTimeout(r,2500));candidates=benchmark}
    clearInterval(timer);$('#progressBar').style.width='100%';$('#loadingPercent').textContent='100%';setTimeout(()=>{show('results');render()},350);
  }catch(e){clearInterval(timer);show('empty');states.empty.insertAdjacentHTML('beforebegin',`<div class="error-box">${e.message}. Open Setup to check the backend address, or paste the transcript and try again.</div>`)}
}
$('#analyseButton').onclick=analyse;$('#loadDemo').onclick=()=>{show('results');render()};
document.querySelectorAll('.filter-tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});
const dialog=$('#settingsDialog');$('#settingsButton').onclick=()=>{ $('#apiUrl').value=localStorage.getItem('cutroomApi')||'';dialog.showModal()};$('#saveSettings').onclick=()=>localStorage.setItem('cutroomApi',$('#apiUrl').value.trim());
