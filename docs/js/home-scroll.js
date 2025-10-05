/* home-scroll.js — minimal, content-height sections (no sticky/pin) */
document.addEventListener('DOMContentLoaded', () => {
  // simple fade/slide-in when section enters viewport
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('stage-active');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-stage').forEach(s => obs.observe(s));

  // duplicate gallery tiles once for a seamless loop
  const track = document.querySelector('.scroll-content');
  if (track && track.children.length) {
    const clones = Array.from(track.children).map(n => n.cloneNode(true));
    clones.forEach(n => track.appendChild(n));
  }
});
document.addEventListener('DOMContentLoaded', () => {
  /* fade-in when section is in view */
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('stage-active'); });
  }, {threshold: 0.12, rootMargin: '0px 0px -10% 0px'});
  document.querySelectorAll('.scroll-stage').forEach(s => io.observe(s));

  /* force-download for PDF (handles Safari/iOS too) */
  const forceDownload = async (url, filename='tageskarte.pdf') => {
    try {
      const res = await fetch(url, {mode:'cors'});
      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      // fallback if fetch blocked
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  // Click anywhere on the Tageskarte card OR the button to download
  document.querySelectorAll('.pdf-card').forEach(card => {
    const url = card.getAttribute('data-download');
    // button
    const btn = card.querySelector('.pdf-dl-btn');
    if (btn) btn.addEventListener('click', (e)=>{ e.stopPropagation(); forceDownload(url); });
    // whole preview area
    const preview = card.querySelector('.pdf-preview');
    if (preview) preview.addEventListener('click', ()=> forceDownload(url));
  });
});
