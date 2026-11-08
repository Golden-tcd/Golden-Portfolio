// Mobile menu
var btn = document.querySelector('.menu-btn'), links = document.getElementById('links');
btn.addEventListener('click', function () {
  var open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') { links.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
});

// Waveform bars (beat-production nod)
var wave = document.querySelector('.wave');
for (var i = 0; i < 36; i++) {
  var b = document.createElement('i');
  b.style.animationDelay = (Math.random() * 1.2).toFixed(2) + 's';
  b.style.animationDuration = (0.8 + Math.random() * 0.9).toFixed(2) + 's';
  wave.appendChild(b);
}

// Rotating role text
var roles = ['Frontend Developer', 'Graphic Designer', 'Beat Producer', 'Computer Science Student'];
var roleEl = document.getElementById('role'), r = 0, c = roles[0].length, del = true;
function typeRole() {
  var delay = del ? 80 : 150;
  if (del) {
    c--;
    if (c < 0) { del = false; r = (r + 1) % roles.length; c = 0; delay = 400; }
  } else {
    c++;
    if (c >= roles[r].length) { del = true; c = roles[r].length; delay = 2500; }
  }
  roleEl.textContent = roles[r].slice(0, Math.max(c, 0));
  setTimeout(typeRole, delay);
}
setTimeout(typeRole, 2500);

// Scroll reveal + counters
function count(el) {
  var n = +el.dataset.n, v = 0;
  var t = setInterval(function () { v++; el.textContent = v; if (v >= n) clearInterval(t); }, 300);
}
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function (s) { io.observe(s); });
document.querySelectorAll('[data-n]').forEach(count);

// Cursor glow (mouse devices only)
window.addEventListener('pointermove', function (e) {
  if (e.pointerType !== 'mouse') return;
  document.documentElement.style.setProperty('--x', e.clientX + 'px');
  document.documentElement.style.setProperty('--y', e.clientY + 'px');
});

