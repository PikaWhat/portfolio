document.addEventListener('DOMContentLoaded',()=> {
  const el=document.getElementById('map'); if(!el) return;
  const lat=52.45, lng=13.32; // echte Koordinaten einsetzen
  const map=L.map('map',{scrollWheelZoom:false}).setView([lat,lng],16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
  L.marker([lat,lng]).addTo(map).bindPopup('Trattoria Tiamo');
});

// Zielkoordinaten 52°26'48.4"N 13°20'35.4"E
const tiamo = { lat: 52.44678, lng: 13.34317 };


const map = L.map('map', {
  scrollWheelZoom: false,
  zoomControl: true
}).setView([tiamo.lat, tiamo.lng], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap-Mitwirkende'
}).addTo(map);

L.marker([tiamo.lat, tiamo.lng])
  .addTo(map)
  .bindPopup('<strong>Trattoria Tiamo</strong><br>Stephanstr. 1<br>12167 Berlin')
  .openPopup();
