/* Textos de la introducción en ES/EN (complementa app.js) */
(() => {
const T = { es: { avail: 'Disponible para proyectos', hi: 'Hola, soy Danilo.', port: 'Este es mi portafolio.', sub: 'Diseño y desarrollo sitios web, automatizaciones e integraciones de IA.' },
en: { avail: 'Available for projects', hi: "Hi, I'm Danilo.", port: 'This is my portfolio.', sub: 'I design and build websites, automations and AI integrations.' } };
const MORE = { es: '<b>Complementario:</b> trading de opciones sobre SPY desde hace más de 2 años.', en: '<b>Beyond code:</b> trading SPY options for more than 2 years.' };
const apply = () => { const k = document.documentElement.lang === 'en' ? 'en' : 'es', t = T[k]; document.querySelectorAll('[data-x]').forEach(el => { el.textContent = t[el.dataset.x]; }); const m = document.querySelector('[data-i18n="stack_more"]'); if (m) m.innerHTML = MORE[k]; };
apply();
const b = document.getElementById('langBtn'); if (b) b.addEventListener('click', apply);
})();
/* Frase de experiencia: las palabras se encienden con el scroll */
(() => {
const big = document.querySelector('.statement .big');
if (!big) return;
const reduce = false;
const HL = /^(IA|AI|solos|own)[.,]?$/i;
const split = () => {
  if (big.querySelector('.w')) return;
  const words = big.textContent.trim().split(/\s+/);
  big.innerHTML = words.map(w => '<span class="w' + (HL.test(w) ? ' hl' : '') + '">' + w + '</span>').join(' ');
  update();
};
const update = () => {
  const ws = big.querySelectorAll('.w'); if (!ws.length) return;
  const r = big.getBoundingClientRect();
  const p = reduce ? 1 : Math.max(0, Math.min(1, (innerHeight * .85 - r.top) / (innerHeight * .55)));
  const n = Math.round(p * ws.length);
  ws.forEach((w, i) => w.classList.toggle('on', i < n));
};
addEventListener('scroll', update, { passive: true });
addEventListener('resize', update);
split();
const b = document.getElementById('langBtn'); if (b) b.addEventListener('click', () => requestAnimationFrame(split));
})();
/* Orden de secciones: Trading al final, antes de Contacto */
(() => {
const main = document.querySelector('main'), trading = document.getElementById('trading'), work = document.getElementById('proyectos');
if (!main || !trading || !work) return;
work.after(trading);
const go = (id, target, label) => { const a = document.querySelector('#' + id + ' .next'); if (a) { a.setAttribute('href', '#' + target); a.setAttribute('aria-label', 'Ir a ' + label); } };
go('stack', 'experiencia', 'Experiencia');
go('proyectos', 'trading', 'Trading');
go('trading', 'contacto', 'Contacto');
})();
/* Trabajos: cada fila entra al aparecer en pantalla y una línea azul la recorre */
(() => {
if (!('IntersectionObserver' in window)) return;
const items = [...document.querySelectorAll('.rows li')];
items.forEach(li => li.classList.add('wait'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const i = items.indexOf(e.target);
    e.target.style.transitionDelay = e.target.style.animationDelay = (i % 4) * 90 + 'ms';
    const a = e.target.querySelector('a'); a.style.transitionDelay = a.style.animationDelay = (i % 4) * 90 + 'ms';
    e.target.classList.remove('wait'); e.target.classList.add('in');
    setTimeout(() => { a.style.transitionDelay = ''; }, 1500);
    io.unobserve(e.target);
  });
}, { threshold: .25 });
items.forEach(li => io.observe(li));
})();
/* Stack: lluvia de código tipo matrix, tenue y lenta */
(() => {
const sec = document.getElementById('stack'); if (!sec) return;
const cv = document.createElement('canvas'); cv.className = 'code-rain'; cv.setAttribute('aria-hidden', 'true');
sec.prepend(cv);
const ctx = cv.getContext('2d'); if (!ctx) return;
const reduce = false;
const TOK = ['0', '1', '{', '}', '<', '/>', '=>', ';', '()', '[]', 'fn', 'if', 'ts', 'ai', 'db', '&&', '||', '#', '*', '$', 'λ', '::'];
const pick = () => TOK[(Math.random() * TOK.length) | 0];
const LH = 17, CW = 26;
let W = 0, H = 0, cols = [], visible = false, last = 0;
const mk = (x, fresh) => ({ x, y: fresh ? -Math.random() * H : Math.random() * H, v: 14 + Math.random() * 26, len: 5 + ((Math.random() * 9) | 0), trail: [], acc: 0, blue: Math.random() < .14 });
const size = () => {
  const r = sec.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
  W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  ctx.font = '500 12px "Geist Mono", ui-monospace, monospace'; ctx.textBaseline = 'top';
  cols = []; for (let x = 8; x < W; x += CW) if (Math.random() < .62) cols.push(mk(x, false));
  cols.forEach(c => { for (let i = 0; i < c.len; i++) c.trail.push(pick()); });
  draw();
};
const draw = () => {
  ctx.clearRect(0, 0, W, H);
  for (const c of cols) {
    for (let i = 0; i < c.trail.length; i++) {
      const y = c.y - i * LH; if (y < -LH || y > H) continue;
      const a = i === 0 ? .3 : .14 * (1 - i / c.trail.length);
      ctx.fillStyle = i === 0 && c.blue ? `rgba(47,72,245,${a + .12})` : `rgba(15,16,19,${a})`;
      ctx.fillText(c.trail[i], c.x, y);
    }
  }
};
const tick = now => {
  if (!visible) return;
  const dt = Math.min((now - (last || now)) / 1000, .05); last = now;
  for (const c of cols) {
    c.y += c.v * dt; c.acc += c.v * dt;
    while (c.acc >= LH) { c.acc -= LH; c.trail.unshift(pick()); if (c.trail.length > c.len) c.trail.pop(); }
    if (Math.random() < .02) c.trail[1 + ((Math.random() * (c.trail.length - 1)) | 0)] = pick();
    if (c.y - c.len * LH > H) Object.assign(c, mk(c.x, true), { trail: [pick()] });
  }
  draw(); requestAnimationFrame(tick);
};
new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting && !reduce; if (visible && !was) { last = 0; requestAnimationFrame(tick); } }).observe(sec);
addEventListener('resize', () => { clearTimeout(size.t); size.t = setTimeout(size, 150); });
(document.fonts ? document.fonts.ready : Promise.resolve()).then(size);
size();
})();
/* Menú: solo Proyectos y Contacto */
(() => { const a = document.querySelector('.nav a[href="#experiencia"]'); if (a && a.parentElement) a.parentElement.remove(); })();
