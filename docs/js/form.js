const form = document.getElementById('order-form');
if (form) {
  const status = document.getElementById('order-status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = 'Sende…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      status.textContent = res.ok ? 'Danke, Ihre Bestellung ist eingegangen.' : 'Fehler, bitte erneut versuchen.';
      if (res.ok) form.reset();
    } catch {
      status.textContent = 'Netzwerkfehler. Bitte telefonisch bestellen.';
    }
  });
}
