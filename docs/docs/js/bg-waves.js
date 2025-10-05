// DEBUG VERSION — stronger visible waves + logs
// Revert after verification or adjust vars below.
(function () {
  // activation: menu-flow OR body data-waves
  const enabled = !!(document.getElementById("menu-flow") || document.body?.dataset?.waves === "on");
  if (!enabled) {
    console.log('bg-waves: not enabled for this page');
    return;
  }

  // tunables (you can tweak via body dataset: data-waves-speed etc.)
  const rootStyles = getComputedStyle(document.documentElement);
  const getNum = (name, fallback) => {
    const v = (document.body.dataset[name] || rootStyles.getPropertyValue(`--bg-${name}`) || rootStyles.getPropertyValue(`--bg-waves-${name}`) || '').trim();
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  };

  // much calmer defaults
const LINES  = Math.max(6, Math.round(getNum('waves-lines', 60)));
const STEP_X = Math.max(6, getNum('waves-stepx', 22));
const A_BASE = getNum('waves-amp', 12);
const A_JIT  = getNum('waves-jitter', 6);
const F1     = getNum('waves-f1', 0.0075);
const F2     = getNum('waves-f2', 0.0025);
const SPEED  = getNum('waves-speed', 0.000003);   // ≈3× langsamer
const OP_MIN = getNum('waves-op-min', 0.04);
const OP_MAX = getNum('waves-op-max', 0.16);


  // create canvas
  const cvs = document.createElement('canvas');
  cvs.id = 'bg-waves';
  // IMPORTANT: zIndex 0 so it sits above slideshow(-1) but under content (header/main/footer z>=1)
  Object.assign(cvs.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '0',
    pointerEvents: 'none',
    display: 'block',
    opacity: '0.4'
  });
  // put canvas as first child to avoid some stacking issues
  document.documentElement.prepend(cvs);

  const ctx = cvs.getContext('2d', { alpha: true });
  let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let W = 0, H = 0;

  function resize() {
    DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    W = Math.max(320, window.innerWidth | 0);
    H = Math.max(200, window.innerHeight | 0);
    cvs.width = Math.round(W * DPR);
    cvs.height = Math.round(H * DPR);
    cvs.style.width = W + 'px';
    cvs.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // clear once
    ctx.clearRect(0, 0, W, H);
    console.log('bg-waves resized', W, H, 'DPR', DPR);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // choose debug stroke color contrasting with page bg
  const debugColor = (rootStyles.getPropertyValue('--bg-waves-debug-color') || '200,30,30').trim();
  // main animation
  let last = performance.now();
  function frame(now) {
    const dt = now - last;
    last = now;
    const phase = now * SPEED;

    // subtle background wash (debug visible)
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,240,230,0.03)'; // faint warm wash
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < LINES; i++) {
      const y0 = (i / Math.max(1, (LINES - 1))) * H;
      const amp = (A_BASE + A_JIT * Math.sin(i * 0.31 + phase * 0.15));
      const op = OP_MIN + (OP_MAX - OP_MIN) * (i / Math.max(1, (LINES - 1)));
      ctx.strokeStyle = `rgba(${debugColor},${op.toFixed(3)})`;
      ctx.lineWidth = 1.5 + (i % 3) * 0.5;

      ctx.beginPath();
      for (let x = 0; x <= W; x += STEP_X) {
        const k1 = x * F1 + i * 0.5 + phase;
        const k2 = x * F2 + i * 0.09 - phase * 0.5;
        const y = y0 + Math.sin(k1) * amp * 0.45 + Math.sin(k2) * amp * 0.28;
        x === 0 ? ctx.moveTo(0, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestAnimationFrame(frame);
  }

  // start and log
  console.log('bg-waves: starting animation (debug). lines', LINES, 'step', STEP_X, 'amp', A_BASE, 'speed', SPEED);
  requestAnimationFrame(frame);

  // small API for console tinkering
  window.__bgWaves = {
    canvas: cvs,
    resize,
    setDebugColor(c){ cvs && (cvs.style.outline = '2px dashed ' + c); console.log('outline set', c); }
  };
})();
