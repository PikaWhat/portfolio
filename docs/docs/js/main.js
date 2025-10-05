// overlay menu toggle + esc close
(function () {
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('menuPanel');
  if (!btn || !panel) return;

  const open = () => { panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); btn.setAttribute('aria-expanded','true'); };
  const close = () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false'); };

  btn.addEventListener('click', () => panel.classList.contains('open') ? close() : open());
  panel.addEventListener('click', e => { if (e.target === panel || e.target.tagName === 'A') close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
// mark sections with an odd number of .menu-item children
(function(){
  document.querySelectorAll('.menu-category').forEach(cat=>{
    const count = cat.querySelectorAll('.menu-item').length;
    if(count % 2 === 1) cat.classList.add('has-odd'); else cat.classList.remove('has-odd');
  });
})();



// Section nav: smooth scroll + scrollspy
(function(){
  const nav = document.querySelector('.section-nav');
  if(!nav) return;

  // smooth scroll (native)
  nav.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // scrollspy
  const links = [...nav.querySelectorAll('a[data-target]')];
  const map = new Map(links.map(a => [a.dataset.target, a]));
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en => {
      if(en.isIntersecting){
        links.forEach(l => l.classList.remove('active'));
        const a = map.get(en.target.id);
        if(a) a.classList.add('active');
      }
    });
  }, {rootMargin: '-40% 0px -50% 0px', threshold: 0.01});

  document.querySelectorAll('.menu-category[id]').forEach(sec => obs.observe(sec));
})();
 