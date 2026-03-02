document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('stage-active'); });
  }, {threshold: 0.12, rootMargin: '0px 0px -10% 0px'});
  document.querySelectorAll('.scroll-stage').forEach(s => io.observe(s));

  const track = document.querySelector('.scroll-content');
  if (track && track.children.length) {
    const clones = Array.from(track.children).map(n => n.cloneNode(true));
    clones.forEach(n => track.appendChild(n));
  }

  const forceDownload = async (url, filename='download.pdf') => {
    try {
      const res = await fetch(url, { mode:'cors' });
      const blob = await res.blob();
      const link = document.createElement('a');
      const obj = URL.createObjectURL(blob);
      link.href = obj;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(obj);
    } catch {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  document.querySelectorAll('.pdf-card').forEach(card => {
    const url = card.getAttribute('data-download');
    const filename = card.getAttribute('data-filename') || 'download.pdf';
    if (!url) return;
    card.addEventListener('click', () => forceDownload(url, filename));
  });
});
