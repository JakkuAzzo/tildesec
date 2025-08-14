// Theme toggle
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const preferred = localStorage.getItem('theme') || 'auto';
  function apply(mode){
    root.setAttribute('data-theme', mode === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode);
    localStorage.setItem('theme', mode);
  }
  apply(preferred);
  if(btn){
    btn.addEventListener('click', ()=>{
      const current = localStorage.getItem('theme') || 'auto';
      const next = current === 'dark' ? 'light' : current === 'light' ? 'auto' : 'dark';
      apply(next);
      btn.title = 'Theme: ' + next;
    });
    btn.title = 'Theme: ' + (localStorage.getItem('theme')||'auto');
  }
})();

// Mobile nav toggle
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if(!toggle || !nav) return;
  function setExpanded(v){ nav.setAttribute('aria-expanded', v); toggle.setAttribute('aria-expanded', v); }
  toggle.addEventListener('click', ()=> setExpanded(nav.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setExpanded(false)));
})();

// Reveal on scroll
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || !els.length){ els.forEach(e=>e.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }
  }, { threshold: .15 });
  els.forEach(el=> io.observe(el));
})();

// Hover tilt
(function(){
  const cards = document.querySelectorAll('.hover-tilt');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  cards.forEach(card => {
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      const rx = clamp(-y*8, -10, 10), ry = clamp(x*12, -12, 12);
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  });
})();

// Stat counter
(function(){
  const nums = document.querySelectorAll('.num[data-count]');
  if(!nums.length) return;
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){ if(!e.isIntersecting) continue; const el = e.target; const target = parseInt(el.dataset.count,10)||0; let n=0; const steps=50; const inc = Math.ceil(target/steps); const t = setInterval(()=>{ n+=inc; if(n>=target){ n=target; clearInterval(t); } el.textContent = n.toLocaleString(); }, 24); io.unobserve(el); }
  },{threshold:.5});
  nums.forEach(n=> io.observe(n));
})();

// Simple carousel for Featured Projects
(function(){
  const scroller = document.querySelector('[data-carousel]');
  if(!scroller) return;
  let idx = 0; const items = scroller.querySelectorAll('[data-item]');
  function go(i){ idx = (i+items.length)%items.length; items.forEach((el, n)=> el.setAttribute('data-active', n===idx)); }
  setInterval(()=> go(idx+1), 4000);
  go(0);
})();

// Footer year
(function(){
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
})();
