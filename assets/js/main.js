/* Photo */
document.getElementById('vladPhoto').src='assets/images/vladimir-fedorenko.jpg';

/* ── Hero film grain ── */
(function(){
  const cv=document.getElementById('heroGrain');
  if(!cv)return;
  const ctx=cv.getContext('2d');
  function resize(){cv.width=window.innerWidth;cv.height=Math.max(window.innerHeight,640)}
  resize();window.addEventListener('resize',resize,{passive:true});
  let frame=0;
  function draw(){
    frame++;
    if(frame%2!==0){requestAnimationFrame(draw);return}
    const W=cv.width,H=cv.height,img=ctx.createImageData(W,H),d=img.data;
    for(let i=0;i<d.length;i+=4){const v=(Math.random()*255)|0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=18}
    ctx.putImageData(img,0,0);
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Hero image fallback chain ── */
(function(){
  const el=document.getElementById('heroImg');
  if(!el)return;
  const SRC=[
    'https://images.unsplash.com/photo-1743309411498-a0f4f4b96b65?w=2000&q=92&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=92&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=2000&q=92&auto=format&fit=crop'
  ];
  let i=0;
  el.onerror=function(){i++;if(i<SRC.length)el.src=SRC[i]};
})();


/* Cursor */
const CUR=document.getElementById('CUR'),CDOT=document.getElementById('CDOT');
let mx=0,my=0,cx=0,cy=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;CDOT.style.cssText=`left:${mx}px;top:${my}px;transform:translate(-50%,-50%)`},{passive:true});
(function anim(){cx+=(mx-cx)*.1;cy+=(my-cy)*.1;CUR.style.cssText=`left:${cx}px;top:${cy}px;transform:translate(-50%,-50%)`;requestAnimationFrame(anim)})();
document.querySelectorAll('a,button,.pcard,.pcard-sm-wrap,.bon,.rev,.met,.tl-row').forEach(el=>{
  el.addEventListener('mouseenter',()=>CUR.classList.add('h'));
  el.addEventListener('mouseleave',()=>CUR.classList.remove('h'));
});

/* Loader */
window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('LOAD').classList.add('out');initAll()},1700)});

/* Nav */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('on',window.scrollY>40)},{passive:true});
document.getElementById('navCta').onclick=()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'});
document.getElementById('heroBtn1').onclick=()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'});
document.getElementById('heroBtn2').onclick=()=>document.getElementById('income').scrollIntoView({behavior:'smooth'});
function toggleNav(){const b=document.getElementById('burger'),m=document.getElementById('mobnav');b.classList.toggle('open');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}
function closeNav(){document.getElementById('burger').classList.remove('open');document.getElementById('mobnav').classList.remove('open');document.body.style.overflow=''}

function initAll(){
  gsap.registerPlugin(ScrollTrigger);

  /* Hero entrance */
  const tl=gsap.timeline({delay:.05});
  tl.to('#hEyebrow',{opacity:1,y:0,duration:.7,ease:'power3.out'})
    .fromTo('#heroH1 .row span',{y:'110%'},{y:'0%',duration:1,ease:'power4.out',stagger:.1},'-=.3')
    .fromTo('#heroH1 em',{y:'110%'},{y:'0%',duration:1,ease:'power4.out'},'-=.5')
    .to('#heroSub',{opacity:1,y:0,duration:.75,ease:'power3.out'},'-=.4')
    .to('#heroBtns',{opacity:1,y:0,duration:.65,ease:'power3.out'},'-=.35')
    .to('#heroNums',{opacity:1,y:0,duration:.65,ease:'power3.out'},'-=.3')
    .to('#heroRight',{opacity:1,y:0,duration:.65,ease:'power3.out'},'-=.3');

  /* Hero parallax */
  gsap.to('.hero-photo img',{
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true},
    y:'20%',ease:'none'
  });
  gsap.to('.hero-left',{
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true},
    y:'-8%',ease:'none'
  });

  /* Count up */
  document.querySelectorAll('[data-target]').forEach(el=>{
    const t=parseInt(el.dataset.target);
    const obj={v:0};
    ScrollTrigger.create({trigger:el,start:'top 88%',once:true,
      onEnter:()=>gsap.to(obj,{v:t,duration:2,ease:'power2.out',onUpdate(){el.textContent=Math.round(obj.v)+(t>=200?'+':'')}})
    });
  });

  /* Scroll reveals */
  gsap.utils.toArray('.g-fade').forEach(el=>{
    ScrollTrigger.create({trigger:el,start:'top 84%',once:true,
      onEnter:()=>el.classList.add('in')
    });
  });
  gsap.utils.toArray('.g-left').forEach(el=>{
    ScrollTrigger.create({trigger:el,start:'top 80%',once:true,
      onEnter:()=>el.classList.add('in')
    });
  });

  /* Paths parallax */
  document.querySelectorAll('.pth-photo img').forEach(img=>{
    gsap.to(img,{
      scrollTrigger:{trigger:img.closest('.pth'),start:'top bottom',end:'bottom top',scrub:true},
      y:'15%',ease:'none'
    });
  });

  /* About photo parallax */
  gsap.to('.about-photo img',{
    scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:true},
    y:'8%',ease:'none'
  });

  /* Products big card parallax */
  gsap.to('.pcard-big .pcard-photo',{
    scrollTrigger:{trigger:'.prod-grid',start:'top bottom',end:'bottom top',scrub:true},
    y:'12%',ease:'none'
  });

  /* CTA photo parallax */
  gsap.to('.cta-photo img',{
    scrollTrigger:{trigger:'.cta',start:'top bottom',end:'bottom top',scrub:true},
    y:'10%',ease:'none'
  });

  /* Products stagger */
  gsap.from('.pcard-big',{scrollTrigger:{trigger:'.prod-grid',start:'top 80%',once:true},y:50,opacity:0,duration:.9,ease:'power3.out'});
  gsap.from('.pcard-sm-wrap',{scrollTrigger:{trigger:'.prod-right-col',start:'top 80%',once:true},y:40,opacity:0,duration:.8,ease:'power3.out',stagger:.1});
  gsap.from('.rev',{scrollTrigger:{trigger:'.rev-grid',start:'top 80%',once:true},y:36,opacity:0,duration:.8,ease:'power3.out',stagger:.1});
  gsap.from('.bon',{scrollTrigger:{trigger:'.bon-grid',start:'top 80%',once:true},y:32,opacity:0,duration:.75,ease:'power3.out',stagger:.1});
  gsap.from('.stat',{scrollTrigger:{trigger:'.stats-inner',start:'top 80%',once:true},x:-28,opacity:0,duration:.7,ease:'power3.out',stagger:.12});
  gsap.from('.met',{scrollTrigger:{trigger:'.metrics',start:'top 82%',once:true},scale:.92,opacity:0,duration:.55,ease:'back.out(1.5)',stagger:.07});
  gsap.from('.cta-form-wrap > *',{scrollTrigger:{trigger:'.cta-form-wrap',start:'top 75%',once:true},y:28,opacity:0,duration:.7,ease:'power3.out',stagger:.08});
}

/* Calc */
let tL=1;
const cD={
  1:{1:{t:'25 000 ₽',p:'через 3–4 месяца',s:'8 000 ₽',m:'14 000 ₽',b:'3 000 ₽'},2:{t:'45 000 ₽',p:'через 3–4 месяца',s:'15 000 ₽',m:'25 000 ₽',b:'5 000 ₽'},3:{t:'75 000 ₽',p:'через 5–6 месяцев',s:'25 000 ₽',m:'42 000 ₽',b:'8 000 ₽'},4:{t:'120 000 ₽',p:'через 8–10 месяцев',s:'40 000 ₽',m:'68 000 ₽',b:'12 000 ₽'}},
  2:{1:{t:'40 000 ₽',p:'через 2–3 месяца',s:'12 000 ₽',m:'23 000 ₽',b:'5 000 ₽'},2:{t:'75 000 ₽',p:'через 2–3 месяца',s:'25 000 ₽',m:'42 000 ₽',b:'8 000 ₽'},3:{t:'130 000 ₽',p:'через 4–5 месяцев',s:'45 000 ₽',m:'72 000 ₽',b:'13 000 ₽'},4:{t:'200 000+ ₽',p:'через 6–8 месяцев',s:'60 000 ₽',m:'120 000 ₽',b:'20 000+ ₽'}},
  3:{1:{t:'60 000 ₽',p:'через 1–2 месяца',s:'20 000 ₽',m:'32 000 ₽',b:'8 000 ₽'},2:{t:'110 000 ₽',p:'через 2–3 месяца',s:'35 000 ₽',m:'62 000 ₽',b:'13 000 ₽'},3:{t:'180 000 ₽',p:'через 3–4 месяца',s:'60 000 ₽',m:'100 000 ₽',b:'20 000 ₽'},4:{t:'300 000+ ₽',p:'через 5–7 месяцев',s:'80 000 ₽',m:'190 000+ ₽',b:'30 000+ ₽'}}
};
function setT(el,l){document.querySelectorAll('.copt').forEach(o=>o.classList.remove('on'));el.classList.add('on');tL=l;upC()}
function upC(){
  const g=parseInt(document.getElementById('gR').value),d=cD[tL][g];
  const a=document.getElementById('rA');
  if(window.gsap)gsap.fromTo(a,{y:-10,opacity:.3},{y:0,opacity:1,duration:.4,ease:'power2.out'});
  a.textContent=d.t;
  document.getElementById('rP').textContent=d.p;
  document.getElementById('rS').textContent=d.s;
  document.getElementById('rT').textContent=d.m;
  document.getElementById('rB').textContent=d.b;
}
function selG(el){document.querySelectorAll('.fg-o').forEach(o=>o.classList.remove('on'));el.classList.add('on')}

/* ── Safety: if GSAP fails to load, reveal hero immediately ── */
setTimeout(function(){
  if(typeof gsap==='undefined'){
    ['hEyebrow','heroSub','heroBtns','heroNums','heroRight'].forEach(function(id){
      var el=document.getElementById(id);
      if(el){el.style.opacity='1';el.style.transform='none'}
    });
    var em=document.getElementById('heroEm');
    if(em)em.style.transform='none';
    document.querySelectorAll('#heroH1 .row span').forEach(function(sp){sp.style.transform='none'});
    document.querySelectorAll('.g-fade,.g-left').forEach(function(el){el.classList.add('in')});
    var ld=document.getElementById('LOAD');if(ld)ld.classList.add('out');
  }
},2600);