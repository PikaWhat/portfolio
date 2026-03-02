(function(){
  const enabledByPage = !!(document.getElementById('menu-flow') || document.body?.dataset?.waves === 'on');
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!enabledByPage || isMobile || reduce) return;

  const cvs = document.createElement('canvas');
  Object.assign(cvs.style,{position:'fixed',inset:'0',zIndex:'0',pointerEvents:'none',opacity:'0.22'});
  document.documentElement.prepend(cvs);
  const ctx = cvs.getContext('2d',{alpha:true});

  let W=0,H=0,DPR=1, raf=0, last=0;
  const LINES=16, STEP=26, SPEED=0.00018; // much lighter

  function resize(){
    DPR=Math.min(2, window.devicePixelRatio||1);
    W=window.innerWidth|0; H=window.innerHeight|0;
    cvs.width=Math.round(W*DPR); cvs.height=Math.round(H*DPR);
    cvs.style.width=W+'px'; cvs.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  function frame(t){
    // throttle to ~24fps
    if (t-last < 1000/24){ raf=requestAnimationFrame(frame); return; }
    last=t;
    const p=t*SPEED;
    ctx.clearRect(0,0,W,H);

    for(let i=0;i<LINES;i++){
      const y0=(i/(LINES-1))*H;
      const op=0.03 + (i/LINES)*0.09;
      ctx.strokeStyle=`rgba(107,125,43,${op.toFixed(3)})`;
      ctx.lineWidth=1;
      ctx.beginPath();
      for(let x=0;x<=W;x+=STEP){
        const y = y0 + Math.sin(x*0.008 + i*0.35 + p)*5 + Math.sin(x*0.003 - p*0.7)*3;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
})();
