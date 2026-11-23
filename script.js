const FF='"Bricolage Grotesque","Arial Black",system-ui,sans-serif',BODY='Figtree,system-ui,sans-serif',INK='#10243E';
const TYPES={
 salon:{label:'Salon',name:'Glow Beauty Salon',head:'Weekend special',price:'KES 1,500',det:'Braids, wash and set, manicure. Walk-ins welcome.',phone:'0712 345 678',tags:'#salon #beauty #hairstyles #braids #nailart'},
 shop:{label:'Shop',name:'Mwangi Hardware',head:'Cement offer',price:'KES 720 per bag',det:'Free delivery in town for orders above KES 20,000.',phone:'0722 111 222',tags:'#hardware #construction #buildingmaterials #offer'},
 food:{label:'Restaurant',name:'Mama Njeri Kitchen',head:'Lunch combo',price:'KES 300',det:'Pilau, kachumbari and a soda. Served 12pm to 3pm.',phone:'0733 456 789',tags:'#lunch #kenyanfood #pilau #foodie #restaurant'},
 fashion:{label:'Boutique',name:'Zuri Fashion',head:'New arrivals',price:'From KES 800',det:'Dresses, tops and shoes. Pay on delivery in town.',phone:'0700 222 333',tags:'#fashion #newarrivals #boutique #style #ootd'},
 event:{label:'Church or event',name:'Grace Community Church',head:'Youth Sunday',price:'Free entry',det:'Join us this Sunday at 9am. Music, a message and refreshments.',phone:'0711 987 654',tags:'#church #youth #sunday #community #event'}
};
const TPLS=['Bold','Fresh','Clean','Night','Split','Sunburst','Frame','Magazine','Ticket'];
const ACCS=['#FFB300','#FF5A5F','#2EC4B6','#8EA8FF','#9BE564','#FF7AC6'];
const S={type:'salon',tpl:0,acc:ACCS[0],capEdited:false};
let x;const $=id=>document.getElementById(id),cv=$('cv'),mx=cv.getContext('2d');x=mx;
const F={name:$('f-name'),head:$('f-head'),price:$('f-price'),det:$('f-det'),phone:$('f-phone')};

function chips(el,items,cur,fn,swatch){
  el.innerHTML='';
  items.forEach((it,i)=>{
    const b=document.createElement('button');
    b.type='button';
    if(swatch){b.className='sw';b.style.background=it;b.setAttribute('aria-label','Accent '+(i+1))}
    else{b.className='chip';b.textContent=it.label||it}
    b.setAttribute('aria-pressed',String(cur(i,it)));
    b.onclick=()=>fn(i,it);
    el.appendChild(b);
  });
}
function drawChips(){
  chips($('types'),Object.keys(TYPES).map(k=>({k,label:TYPES[k].label})),(i,it)=>it.k===S.type,(i,it)=>{S.type=it.k;fillDefaults();S.capEdited=false;update()});
  gal.querySelectorAll('.thumb').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===S.tpl)));
  chips($('accs'),ACCS,(i,it)=>it===S.acc,(i,it)=>{S.acc=it;update()},true);
}
function fillDefaults(){const t=TYPES[S.type];F.name.value=t.name;F.head.value=t.head;F.price.value=t.price;F.det.value=t.det;F.phone.value=t.phone}

const lum=h=>{const n=parseInt(h.slice(1),16);return(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255};
const on=h=>lum(h)>.6?INK:'#fff';
function wrap(t,maxW){const out=[];let cur='';for(const w of t.split(/\s+/).filter(Boolean)){const test=cur?cur+' '+w:w;if(x.measureText(test).width>maxW&&cur){out.push(cur);cur=w}else cur=test}if(cur)out.push(cur);return out}
function txt(t,px,py,o){
  o=Object.assign({size:60,min:24,weight:800,color:'#000',align:'left',maxW:900,maxLines:3,lh:1.1,upper:false,fam:FF},o);
  if(!t)return py;if(o.upper)t=t.toUpperCase();
  let s=o.size,L;
  for(;;){x.font=o.weight+' '+s+'px '+o.fam;L=wrap(t,o.maxW);if(L.length<=o.maxLines||s<=o.min)break;s-=2}
  x.fillStyle=o.color;x.textAlign=o.align;x.textBaseline='top';
  L.slice(0,o.maxLines).forEach((l,i)=>x.fillText(l,px,py+i*s*o.lh));
  return py+Math.min(L.length,o.maxLines)*s*o.lh;
}
function rr(a,b,w,h,r,fill){x.beginPath();x.roundRect(a,b,w,h,r);x.fillStyle=fill;x.fill()}

const T=[
 function bold(v,A){
  x.fillStyle=A;x.fillRect(0,0,1080,1080);
  x.fillStyle=INK;x.beginPath();x.moveTo(0,720);x.lineTo(1080,640);x.lineTo(1080,1080);x.lineTo(0,1080);x.closePath();x.fill();
  txt(v.name,80,80,{size:34,weight:700,fam:BODY,color:on(A),maxW:600,maxLines:1});
  txt(v.head,80,150,{size:170,min:70,maxW:920,color:on(A),upper:true,lh:1});
  txt(v.price,80,770,{size:110,min:50,color:A,maxW:920,maxLines:1});
  txt(v.det,80,905,{size:34,weight:500,fam:BODY,color:'#fff',maxW:920,maxLines:2,lh:1.3});
  txt(v.phone?'Call or WhatsApp '+v.phone:'',80,1010,{size:36,weight:700,fam:BODY,color:A,maxW:920,maxLines:1});
 },
 function fresh(v,A){
  x.fillStyle='#0B3D2E';x.fillRect(0,0,1080,1080);
  x.beginPath();x.arc(820,300,230,0,7);x.fillStyle=A;x.fill();
  txt(v.price,820,235,{size:84,min:36,color:on(A),align:'center',maxW:380,maxLines:2,lh:1.1});
  txt(v.name,80,80,{size:34,weight:700,fam:BODY,color:'#fff',maxW:460,maxLines:2});
  let y=txt(v.head,80,600,{size:130,min:60,maxW:920,maxLines:2,color:'#fff',lh:1.02})+26;
  txt(v.det,80,y,{size:36,weight:500,fam:BODY,color:'#CFE3DA',maxW:880,maxLines:3,lh:1.3});
  rr(80,930,560,84,42,A);
  txt(v.phone,360,950,{size:38,weight:700,fam:BODY,color:on(A),align:'center',maxW:520,maxLines:1});
 },
 function clean(v,A){
  x.fillStyle='#FBFBFA';x.fillRect(0,0,1080,1080);x.fillStyle=A;x.fillRect(0,0,40,1080);
  txt(v.name,110,90,{size:34,weight:700,fam:BODY,color:INK,maxW:860,maxLines:1});
  let y=txt(v.head,110,190,{size:150,min:64,maxW:880,color:INK,lh:1.02})+40;
  x.font='800 90px '+FF;const w=Math.min(x.measureText(v.price).width+80,880);
  rr(110,y,w,130,20,A);
  txt(v.price,150,y+22,{size:90,min:36,color:on(A),maxW:w-80,maxLines:1});
  txt(v.det,110,y+170,{size:36,weight:500,fam:BODY,color:'#4A5A6A',maxW:860,maxLines:3,lh:1.3});
  x.fillStyle=INK;x.fillRect(110,945,860,3);
  txt(v.phone,110,975,{size:44,weight:700,fam:BODY,color:INK,maxW:860,maxLines:1});
 },
 function night(v,A){
  const g=x.createLinearGradient(0,0,0,1080);g.addColorStop(0,'#2D1B4E');g.addColorStop(1,'#140A26');
  x.fillStyle=g;x.fillRect(0,0,1080,1080);
  x.save();x.globalAlpha=.28;x.beginPath();x.arc(540,560,380,0,7);x.fillStyle=A;x.fill();x.restore();
  txt(v.name,540,90,{size:34,weight:700,fam:BODY,color:'#E7DFFA',align:'center',maxW:900,maxLines:1});
  let y=txt(v.head,540,210,{size:150,min:64,maxW:900,color:'#fff',align:'center',upper:true,lh:1.02})+30;
  y=txt(v.price,540,y,{size:100,min:44,color:A,align:'center',maxW:900,maxLines:1})+20;
  txt(v.det,540,y,{size:36,weight:500,fam:BODY,color:'#D8CFF0',align:'center',maxW:800,maxLines:3,lh:1.3});
  txt(v.phone,540,975,{size:44,weight:700,fam:BODY,color:'#fff',align:'center',maxW:900,maxLines:1});
 },
 function split(v,A){
  x.fillStyle=INK;x.fillRect(0,0,1080,1080);x.fillStyle=A;x.fillRect(0,0,1080,600);
  txt(v.name,80,70,{size:34,weight:700,fam:BODY,color:on(A),maxW:920,maxLines:1});
  txt(v.head,80,150,{size:140,min:60,maxW:920,maxLines:3,color:on(A),upper:true,lh:1});
  txt(v.price,80,650,{size:100,min:44,color:A,maxW:920,maxLines:1});
  txt(v.det,80,790,{size:34,weight:500,fam:BODY,color:'#fff',maxW:920,maxLines:2,lh:1.3});
  txt(v.phone?'Call or WhatsApp '+v.phone:'',80,960,{size:38,weight:700,fam:BODY,color:A,maxW:920,maxLines:1});
 },
 function sun(v,A){
  x.fillStyle=A;x.fillRect(0,0,1080,1080);
  x.save();x.translate(540,540);x.fillStyle='rgba(255,255,255,.2)';
  for(let i=0;i<12;i++){x.rotate(Math.PI/6);x.beginPath();x.moveTo(0,0);x.lineTo(1500,-200);x.lineTo(1500,200);x.closePath();x.fill()}
  x.restore();
  txt(v.name,540,80,{size:40,weight:700,fam:BODY,color:on(A),align:'center',maxW:900,maxLines:1});
  rr(90,170,900,680,40,'#fff');
  let y=txt(v.head,540,225,{size:120,min:54,maxW:800,maxLines:2,color:INK,align:'center',upper:true,lh:1.05})+20;
  y=txt(v.price,540,y,{size:110,min:44,color:INK,align:'center',maxW:800,maxLines:1})+20;
  txt(v.det,540,y,{size:34,weight:500,fam:BODY,color:'#4A5A6A',align:'center',maxW:760,maxLines:3,lh:1.3});
  rr(240,900,600,84,42,INK);
  txt(v.phone,540,920,{size:40,weight:700,fam:BODY,color:'#fff',align:'center',maxW:560,maxLines:1});
 },
 function frame(v,A){
  x.fillStyle='#fff';x.fillRect(0,0,1080,1080);
  x.strokeStyle=A;x.lineWidth=28;x.strokeRect(40,40,1000,1000);
  x.strokeStyle=INK;x.lineWidth=4;x.strokeRect(86,86,908,908);
  txt(v.name,540,140,{size:36,weight:700,fam:BODY,color:INK,align:'center',maxW:780,maxLines:1});
  let y=txt(v.head,540,230,{size:120,min:54,maxW:800,maxLines:2,color:INK,align:'center',upper:true,lh:1.02})+30;
  x.font='800 80px '+FF;const w=Math.min(x.measureText(v.price).width+100,820);
  rr(540-w/2,y,w,120,10,A);
  txt(v.price,540,y+22,{size:80,min:34,color:on(A),align:'center',maxW:w-60,maxLines:1});
  txt(v.det,540,y+160,{size:34,weight:500,fam:BODY,color:'#4A5A6A',align:'center',maxW:760,maxLines:2,lh:1.3});
  txt(v.phone,540,900,{size:44,weight:700,fam:BODY,color:INK,align:'center',maxW:780,maxLines:1});
 },
 function mag(v,A){
  x.fillStyle='#F1F1EE';x.fillRect(0,0,1080,1080);x.fillStyle=A;x.fillRect(0,0,150,1080);
  x.save();x.translate(95,1020);x.rotate(-Math.PI/2);
  txt(v.name,0,-22,{size:44,weight:800,color:on(A),maxW:900,maxLines:1});
  x.restore();
  let y=txt(v.head,210,110,{size:140,min:60,maxW:820,maxLines:3,color:INK,upper:true,lh:1})+30;
  txt(v.det,210,y,{size:36,weight:500,fam:BODY,color:'#4A5A6A',maxW:800,maxLines:2,lh:1.3});
  x.beginPath();x.arc(800,850,180,0,7);x.fillStyle=INK;x.fill();
  txt(v.price,800,790,{size:70,min:30,color:A,align:'center',maxW:300,maxLines:2});
  txt('Call or WhatsApp',210,840,{size:28,weight:500,fam:BODY,color:'#4A5A6A',maxW:380,maxLines:1});
  txt(v.phone,210,880,{size:44,weight:700,fam:BODY,color:INK,maxW:380,maxLines:2,lh:1.2});
 },
 function ticket(v,A){
  x.fillStyle=A;x.fillRect(0,0,1080,1080);
  rr(90,150,900,780,36,'#fff');
  x.save();x.setLineDash([16,12]);x.strokeStyle=A;x.lineWidth=4;x.beginPath();x.moveTo(130,740);x.lineTo(950,740);x.stroke();x.restore();
  x.fillStyle=A;x.beginPath();x.arc(90,740,34,0,7);x.fill();x.beginPath();x.arc(990,740,34,0,7);x.fill();
  txt(v.name,540,70,{size:38,weight:700,fam:BODY,color:on(A),align:'center',maxW:900,maxLines:1});
  let y=txt(v.head,540,210,{size:110,min:50,maxW:780,maxLines:2,color:INK,align:'center',upper:true,lh:1.02})+20;
  y=txt(v.price,540,y,{size:120,min:44,color:INK,align:'center',maxW:780,maxLines:1})+14;
  txt(v.det,540,y,{size:32,weight:500,fam:BODY,color:'#4A5A6A',align:'center',maxW:760,maxLines:2,lh:1.3});
  txt('Call or WhatsApp',540,790,{size:28,weight:500,fam:BODY,color:'#4A5A6A',align:'center',maxW:700,maxLines:1});
  txt(v.phone,540,830,{size:56,weight:700,fam:BODY,color:INK,align:'center',maxW:780,maxLines:1});
 }
];

function vals(){return{name:F.name.value.trim(),head:F.head.value.trim(),price:F.price.value.trim(),det:F.det.value.trim(),phone:F.phone.value.trim()}}
function render(){
  x.clearRect(0,0,1080,1080);
  T[S.tpl](vals(),S.acc);
}
function caption(){
  const v=vals(),t=TYPES[S.type];
  return v.head+'! '+'\uD83D\uDD25\n\n'+v.det+'\n\n\uD83D\uDCB0 '+v.price+'\n\uD83D\uDCCD '+v.name+'\n\uD83D\uDCDE Call or WhatsApp: '+v.phone+'\n\n'+t.tags;
}
const gal=$('tpls');
function buildGallery(){
  gal.innerHTML='';
  TPLS.forEach((n,i)=>{
    const b=document.createElement('button');b.type='button';b.className='thumb';
    b.setAttribute('aria-pressed',String(i===S.tpl));b.setAttribute('aria-label',n+' design');
    const c=document.createElement('canvas');c.width=c.height=240;b.appendChild(c);
    const s=document.createElement('span');s.textContent=n;b.appendChild(s);
    b.onclick=()=>{S.tpl=i;update()};
    gal.appendChild(b);
  });
}
function thumbs(){
  const v=vals();
  gal.querySelectorAll('canvas').forEach((c,i)=>{
    const t=c.getContext('2d');t.clearRect(0,0,240,240);
    x=t;x.save();x.scale(240/1080,240/1080);T[i](v,S.acc);x.restore();
  });
  x=mx;
}
function update(){drawChips();render();thumbs();if(!S.capEdited)$('cap').value=caption()}

Object.values(F).forEach(i=>i.addEventListener('input',()=>{render();thumbs();if(!S.capEdited)$('cap').value=caption()}));
$('cap').addEventListener('input',()=>{S.capEdited=true});
$('copy').onclick=async()=>{
  try{await navigator.clipboard.writeText($('cap').value);$('copied').textContent='Caption copied.'}
  catch(e){$('cap').select();$('copied').textContent='Press copy on your keyboard to copy the selected caption.'}
};
$('dl').onclick=()=>{
  render();
  cv.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='poster.png';document.body.appendChild(a);a.click();a.remove()});
};

buildGallery();fillDefaults();update();
Promise.all([document.fonts.load('800 60px "Bricolage Grotesque"'),document.fonts.load('700 30px Figtree'),document.fonts.load('500 30px Figtree')]).then(()=>{render();thumbs()}).catch(()=>{});
