const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toast = (message) => { const el=$("#toast"); el.textContent=message; el.classList.add("show"); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove("show"),2600); };

const date = new Date();
$("#todayLabel").textContent = date.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
$("#publishDate").value = new Date(Date.now()+86400000).toISOString().slice(0,10);

function showView(view){
  $$(".page").forEach(p=>p.classList.toggle("active-page",p.id===view));
  $$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  const active=$(`[data-view="${view}"]`);
  $("#pageCrumb").textContent=active?active.textContent.trim():view[0].toUpperCase()+view.slice(1);
  if(view==="planner") renderCalendar();
  window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav-link").forEach(btn=>btn.addEventListener("click",()=>showView(btn.dataset.view)));
$$("[data-goto]").forEach(btn=>btn.addEventListener("click",()=>showView(btn.dataset.goto)));
$("#mobileMenu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
document.addEventListener("click",e=>{if(window.innerWidth<=700 && !e.target.closest("#sidebar")&&!e.target.closest("#mobileMenu"))$("#sidebar").classList.remove("open")});

const modal=$("#postModal");
function openModal(){modal.classList.add("open");}
function closeModal(){modal.classList.remove("open");}
$("#createPostBtn").addEventListener("click",openModal);
$("#plannerCreate").addEventListener("click",openModal);
$("#closeModal").addEventListener("click",closeModal);
$("#cancelModal").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
$("#postForm").addEventListener("submit",e=>{
  e.preventDefault();
  const caption=$("#caption").value.trim();
  if(!caption)return;
  toast("Your post has been saved to the content planner.");
  $("#postForm").reset(); closeModal();
});

let weekOffset=0;
function renderCalendar(){
  const start=new Date(); start.setDate(start.getDate()-((start.getDay()+6)%7)+weekOffset*7);
  const end=new Date(start); end.setDate(start.getDate()+6);
  $("#weekTitle").textContent=weekOffset===0?"This week":`${start.toLocaleDateString("en-IN",{day:"numeric",month:"short"})} – ${end.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}`;
  const events=[{d:0,t:"Brand story carousel",c:""},{d:1,t:"Marketing tips",c:"blue-event"},{d:3,t:"Behind the scenes",c:"orange-event"},{d:5,t:"Weekly roundup",c:""}];
  $("#weekGrid").innerHTML="";
  for(let i=0;i<7;i++){
    const day=new Date(start);day.setDate(start.getDate()+i);
    const col=document.createElement("div");col.className="day-col";
    col.innerHTML=`<header>${day.toLocaleDateString("en-IN",{weekday:"short"})}<b>${day.getDate()}</b></header>`;
    events.filter(ev=>ev.d===i).forEach(ev=>{const item=document.createElement("div");item.className=`calendar-event ${ev.c}`;item.textContent=ev.t;col.append(item)});
    $("#weekGrid").append(col);
  }
}
$("#prevWeek").addEventListener("click",()=>{weekOffset--;renderCalendar()});
$("#nextWeek").addEventListener("click",()=>{weekOffset++;renderCalendar()});

$("#sendReply").addEventListener("click",()=>{
  const input=$("#replyInput");if(!input.value.trim())return;
  const msg=document.createElement("div");msg.className="message sent";msg.textContent=input.value.trim();
  $(".conversation").insertBefore(msg,$(".reply-box"));input.value="";toast("Reply added to this demo conversation.");
});
$("#replyInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("#sendReply").click()});
$("#exportReport").addEventListener("click",()=>{
  const csv="Metric,Value\\nReach,186400\\nEngagements,13290\\nLink clicks,4820\\nNew followers,1248";
  const blob=new Blob([csv],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="socialsparks-analytics.csv";a.click();URL.revokeObjectURL(a.href);toast("Analytics report exported.");
});
$("#mediaUpload").addEventListener("change",e=>{
  [...e.target.files].forEach(file=>{
    if(!file.type.startsWith("image/"))return;
    const url=URL.createObjectURL(file),card=document.createElement("div");card.className="media-card";
    card.style.background=`linear-gradient(#0002,#0008),url("${url}") center/cover`;
    const name=document.createElement("b");name.textContent=file.name;
    const size=document.createElement("small");size.textContent=`Image · ${(file.size/1024/1024).toFixed(1)} MB`;
    card.append(name,size);$("#mediaGrid").prepend(card);
  });if(e.target.files.length)toast("Media added to your library.");
});
$("#periodSelect").addEventListener("change",e=>toast(`Showing ${e.target.value.toLowerCase()} performance (sample data).`));
$$(".tiny-plus").forEach(b=>b.addEventListener("click",()=>toast("Channel connection can be added in the integrations phase.")));
$$(".more-btn").forEach(b=>b.addEventListener("click",()=>toast("More workspace options coming soon.")));
renderCalendar();