(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth = canvas.parentElement.offsetWidth;
  let h = canvas.height = canvas.offsetHeight = canvas.parentElement.offsetHeight;
  let points = [];
  const density = Math.max(60, Math.floor((w*h)/60000));
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize(){
    w = canvas.width = Math.floor(canvas.parentElement.offsetWidth * DPR);
    h = canvas.height = Math.floor(canvas.parentElement.offsetHeight * DPR);
  }
  window.addEventListener('resize', ()=>{ resize(); init(); });

  function init(){
    points = [];
    for(let i=0;i<density;i++){
      points.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-.5)*.3,
        vy: (Math.random()-.5)*.3,
        r: Math.random()*2*DPR + .5*DPR
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(125,211,252,0.7)';
    const linkDist = 120*DPR;

    // motion + dots
    for(const p of points){
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    }

    // links
    ctx.strokeStyle = 'rgba(94,234,212,0.25)';
    ctx.lineWidth = 1*DPR;
    for(let i=0;i<points.length;i++){
      for(let j=i+1;j<points.length;j++){
        const a = points[i], b = points[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.hypot(dx, dy);
        if(d < linkDist){
          ctx.globalAlpha = 1 - d/linkDist;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize(); init(); draw();
})();
