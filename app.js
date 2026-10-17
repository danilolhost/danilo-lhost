(() => {
const reduce = false;
const fine = matchMedia('(pointer: fine)').matches;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const spring = (k = 170, c = 22, x = 0) => ({ x, v: 0, t: x,
step(dt){ const f = -k * (this.x - this.t) - c * this.v; this.v += f * dt; this.x += this.v * dt; } });
const updaters = [];
/* ---------- Idioma: español para regiones hispanohablantes, inglés para el resto ---------- */
const EN = {"nav_exp": "Experience", "nav_proj": "Work", "nav_contact": "Contact", "hint": "<b>Scroll to see more</b>", "stack_fe": "<b>Frontend:</b> HTML5, CSS3, JavaScript and TypeScript on Node.js. Deployed on <a href=\"https://vercel.com\" target=\"_blank\" rel=\"noopener\">Vercel</a> with version control on <a href=\"https://github.com\" target=\"_blank\" rel=\"noopener\">GitHub</a>.", "stack_be": "<b>Backend and architecture:</b> databases with PostgreSQL and <a href=\"https://supabase.com\" target=\"_blank\" rel=\"noopener\">Supabase</a>, authentication and security with NextAuth and JWT, and video streaming.", "stack_ai": "<b>AI and automation:</b> vibecoder certified by <a href=\"https://www.anthropic.com\" target=\"_blank\" rel=\"noopener\">Anthropic</a>. I build AI into workflows and run 100% automated marketing services.", "stack_more": "<b>Beyond code:</b> trading SPY options for more than 2 years, and high-performance football.", "tr_kicker": "Financial options", "tr_years": "<b>2+ years</b><span>Trading options on the S&amp;P 500.</span>", "tr_code": "<b>Code + structure</b><span>I write my own scripts to analyze the market and read its structure before taking calls or puts.</span>", "exp_big": "I build websites and AI systems that run on their own, from design to deployment.", "exp_title": "Experience", "exp_sum": "Summary", "exp_web": "<h3>Web development</h3><p>10 live sites for academies, sports, aviation and products. Frontend, backend and deployment.</p><span class=\"mono\">10 sites</span>", "exp_ai": "<h3>AI and automation</h3><p>AI integrations in workflows and 100% automated marketing services. Claude certification from Anthropic.</p><span class=\"mono\">Vibecoder</span>", "exp_be": "<h3>Backend and security</h3><p>PostgreSQL and Supabase databases, authentication with NextAuth and JWT, video streaming.</p><span class=\"mono\">Full stack</span>", "work_title": "Recent work", "work_count": "4 of 10 featured", "k_edu": "Education · Trading", "k_sport": "Sports", "k_avi": "Aviation · Services", "k_prod": "Product · Landing", "work_more": "10 live sites in total. These are the 4 that matter most.", "fb_title": "Football", "fb_kicker": "High performance", "fb_big": "Discipline<br>from the pitch.", "fb_eq": "<b>La Equidad academy</b><span>Under-15 squad, Colombia.</span>", "fb_dubai": "<span class=\"mono\">Dubai · International tournaments</span><b>Matches against first-division teams.</b>", "fb_why": "I code to fund my football career. Every site, every automation and every client brings me closer to playing for Barcelona.", "ct_title": "Let's build<br>something <em>together</em>.", "soc_code": "Code", "soc_net": "Social", "nocookie": "<i></i>No cookies", "lg_priv": "Privacy", "lg_terms": "Terms", "copy": "© 2026 Danilo Fernández · Based in Colombia", "lg_updated": "Updated October 16, 2026", "wa": "Message me on WhatsApp", "art_priv": "\n      <h2>Privacy</h2>\n      <p class=\"lead\">This site is my portfolio. It doesn't ask for your data, doesn't create accounts and doesn't use cookies.</p>\n      <h3>What data I collect</h3>\n      <p>None directly. There are no forms, sign-ups or logins.</p>\n      <h3>Cookies</h3>\n      <p>I don't use cookies or similar technologies to track or measure you. That's why you don't see a cookie banner.</p>\n      <h3>Analytics and advertising</h3>\n      <p>There are no analytics tools, ad pixels or cross-site tracking.</p>\n      <h3>Hosting</h3>\n      <p>The provider that serves the page processes minimal technical data, such as your IP address and browser, only to deliver it and protect it from abuse.</p>\n      <h3>Fonts</h3>\n      <p>Fonts load from Google Fonts, which receives your IP address to deliver them. It sets no cookies.</p>\n      <h3>External links</h3>\n      <p>If you open WhatsApp or one of my social profiles, you leave this site and that platform's policies apply.</p>\n      <h3>Your rights</h3>\n      <p>If you message me, I only use your message to reply. You can ask me to delete it at any time, under Colombia's data protection law (Law 1581 of 2012).</p>\n      <h3>Contact</h3>\n      <p>WhatsApp: <span class=\"sel\">+971 58 639 1275</span></p>\n    ", "art_terms": "\n      <h2>Terms</h2>\n      <p class=\"lead\">By using this site you accept these simple terms.</p>\n      <h3>Use</h3>\n      <p>This site is informational: it shows who I am, what I do and my projects.</p>\n      <h3>Ownership</h3>\n      <p>The design, code and text of this site are mine. The projects shown belong to their clients and brands and appear as part of my work.</p>\n      <h3>Trading</h3>\n      <p>What I share about trading describes my personal experience. It is not financial advice or an investment recommendation.</p>\n      <h3>External links</h3>\n      <p>I don't control the content of the sites I link to.</p>\n      <h3>Changes</h3>\n      <p>I may update these terms. The date above shows the latest version.</p>\n    "};
const ES = {};
document.querySelectorAll('[data-i18n]').forEach(el => { ES[el.dataset.i18n] = el.innerHTML; });
const UI = {
es: { typing: 'escribiendo…', done: '✓ desplegado', hint: 'Desliza para ver más', toggle: 'EN', toggleLabel: 'Ver en inglés', code: 'Perfil de Danilo en código' },
en: { typing: 'typing…', done: '✓ deployed', hint: 'Scroll to see more', toggle: 'ES', toggleLabel: 'Ver en español', code: "Danilo's profile in code" },
};
const detectLang = () => {
try { const saved = localStorage.getItem('lang'); if (saved === 'es' || saved === 'en') return saved; } catch (e) {}
const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
return langs.some(l => /^es\b/i.test(l)) ? 'es' : 'en';
};
let LANG = detectLang();
const applyDom = lang => {
document.documentElement.lang = lang;
document.querySelectorAll('[data-i18n]').forEach(el => {
const k = el.dataset.i18n, html = lang === 'en' ? EN[k] : ES[k];
if (html != null && el.innerHTML !== html) el.innerHTML = html;
});
const u = UI[lang];
const hintEl = document.getElementById('scrollHint'); if (hintEl) hintEl.setAttribute('aria-label', u.hint);
const hc = document.querySelector('.hero-code'); if (hc) hc.setAttribute('aria-label', u.code);
const lb = document.getElementById('langBtn'); if (lb) { lb.textContent = u.toggle; lb.setAttribute('aria-label', u.toggleLabel); }
};
applyDom(LANG);
let last = performance.now();
const loop = now => { const dt = Math.min((now - last) / 1000, 1 / 30); last = now; for (const u of updaters) u(dt, now / 1000); requestAnimationFrame(loop); };
/* ---------- Preloader: saludos + cortina curva ---------- */
const pre = document.getElementById('pre'), word = document.getElementById('preWord'), prePath = document.getElementById('prePath');
const ready = () => document.body.classList.add('is-ready');
if (reduce) { pre.classList.add('gone'); ready(); }
else {
document.body.classList.add('locked');
const words = LANG === 'en' ? ['Hello', 'Hola', 'Bonjour', 'Ciao', 'Olá', 'Hallo', 'مرحبا'] : ['Hola', 'Hello', 'Bonjour', 'Ciao', 'Olá', 'Hallo', 'مرحبا'];
let i = 0;
const next = () => {
i++;
if (i < words.length) { word.textContent = words[i]; setTimeout(next, i === 1 ? 260 : 150); }
else lift();
};
setTimeout(next, 900);
const lift = () => {
pre.classList.add('out');
const t0 = performance.now(), D = 900;
const ease = t => 1 - Math.pow(1 - t, 3);
const anim = now => {
const t = clamp((now - t0) / D), e = ease(t);
const y = 100 - e * 100;                 // borde inferior sube
const bulge = Math.sin(Math.min(t * 1.4, 1) * Math.PI) * 18 * (1 - t * .6); // curva hacia abajo
prePath.setAttribute('d', `M0 0 H100 V${y} Q50 ${y + bulge} 0 ${y} Z`);
if (t > .25 && !document.body.classList.contains('is-ready')) ready();
if (t < 1) requestAnimationFrame(anim);
else { pre.classList.add('gone'); document.body.classList.remove('locked'); }
};
requestAnimationFrame(anim);
};
}
/* ---------- WebGL: niebla gris clara + lente sutil ---------- */
const hero = document.getElementById('top');
const cv = document.getElementById('field');
const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
if (gl) {
const vs = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;
const fs = `precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uHover; varying vec2 vUv;
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6); for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p; a*=.5; } return v; }
void main(){
vec2 asp = vec2(uRes.x/uRes.y, 1.);
vec2 p = (vUv-.5)*asp; vec2 m = (uMouse-.5)*asp;
float d = length(p-m);
float lens = exp(-d*d*7.)*uHover;
float ripple = sin(d*38. - uTime*2.2)*exp(-d*5.)*uHover;
p -= (p-m)*lens*.28;
p += normalize(p-m+1e-4)*ripple*.006;
float t = uTime*.04;
vec2 q = vec2(fbm(p*1.1+t), fbm(p*1.1+vec2(5.2,1.3)-t));
float f = fbm(p*1.3+2.2*q);
vec3 hi = vec3(.905,.91,.918), lo = vec3(.80,.808,.822);
vec3 col = mix(lo, hi, smoothstep(.15,.85, f*.9 + (1.-vUv.y)*.15 + .1));
float beam = exp(-pow(dot(p, normalize(vec2(1.,.55))) - sin(uTime*.12)*.5, 2.)*7.);
col += vec3(1.)*beam*.035;
col += vec3(.19,.28,.96)*lens*.035;
col += vec3(1.)*ripple*.012;
col *= 1.-.12*smoothstep(.45,1.2,length((vUv-.5)*vec2(1.2,1.)));
col += (hash(vUv*uRes+fract(uTime))-.5)*.028;
gl_FragColor = vec4(col,1.);
}`;
const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
const prog = gl.createProgram();
gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
gl.useProgram(prog);
const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
const U = n => gl.getUniformLocation(prog, n);
const uTime = U('uTime'), uRes = U('uRes'), uMouse = U('uMouse'), uHover = U('uHover');
const size = () => {
const s = Math.min(devicePixelRatio || 1, 1.5) * (innerWidth < 760 ? .55 : .7);
cv.width = Math.max(1, Math.round(hero.clientWidth * s)); cv.height = Math.max(1, Math.round(hero.clientHeight * s));
gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uRes, cv.width, cv.height);
};
size(); addEventListener('resize', size);
const mx = spring(40, 12, .62), my = spring(40, 12, .5), hv = spring(60, 16, 0);
let lastMove = -10, visible = true, clock = 0;
const setPointer = (x, y) => {
const r = hero.getBoundingClientRect();
mx.t = (x - r.left) / r.width; my.t = 1 - (y - r.top) / r.height;
hv.t = (y >= r.top && y <= r.bottom) ? 1 : 0; lastMove = performance.now() / 1000;
};
addEventListener('pointermove', e => setPointer(e.clientX, e.clientY), { passive: true });
addEventListener('touchmove', e => { const t = e.touches[0]; if (t) setPointer(t.clientX, t.clientY); }, { passive: true });
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
const draw = () => { gl.uniform1f(uTime, clock); gl.uniform2f(uMouse, mx.x, my.x); gl.uniform1f(uHover, hv.x); gl.drawArrays(gl.TRIANGLES, 0, 3); };
if (reduce) { clock = 8; draw(); }
else updaters.push((dt, now) => {
if (now - lastMove > 2.5) { mx.t = .5 + Math.cos(now * .3) * .25; my.t = .5 + Math.sin(now * .42) * .16; hv.t = .6; }
mx.step(dt); my.step(dt); hv.step(dt);
if (!visible) return; clock += dt; draw();
});
}
}
/* ---------- Ventana de código que se escribe sola ---------- */
const codePre = document.getElementById('codePre'), codeStatus = document.getElementById('codeStatus'), codeCard = document.getElementById('codeCard');
const CODE = {
es: [
[['k','const '],['','danilo = {']],
[['','  rol: '],['s','"Software Developer"'],['',',']],
[['','  stack: ['],['s','"TypeScript"'],['',', '],['s','"Supabase"'],['',', '],['s','"Vercel"'],['','],']],
[['','  ia: '],['s','"Claude + automatización"'],['',',']],
[['','  sitios: '],['n','10'],['',',']],
[['','  trading: '],['s','"opciones SPY"'],['',',']],
[['','  meta: '],['s','"jugar en el Barcelona"'],['',',']],
[['','};']],
[['','']],
[['f','deploy'],['','(danilo); '],['c','// listo']],
],
en: [
[['k','const '],['','danilo = {']],
[['','  role: '],['s','"Software Developer"'],['',',']],
[['','  stack: ['],['s','"TypeScript"'],['',', '],['s','"Supabase"'],['',', '],['s','"Vercel"'],['','],']],
[['','  ai: '],['s','"Claude + automation"'],['',',']],
[['','  sites: '],['n','10'],['',',']],
[['','  trading: '],['s','"SPY options"'],['',',']],
[['','  goal: '],['s','"play for Barcelona"'],['',',']],
[['','};']],
[['','']],
[['f','deploy'],['','(danilo); '],['c','// done']],
],
};
let lines = CODE[LANG];
let codeDone = false;
codeStatus.textContent = UI[LANG].typing;
const esc = t => t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const totalOf = () => lines.reduce((a, l) => a + l.reduce((b, [, t]) => b + t.length, 0) + 1, 0);
let total = totalOf();
const renderCode = n => {
let out = '', left = n;
for (const line of lines) {
if (left <= 0) break;
for (const [c, t] of line) {
if (left <= 0) break;
const part = t.slice(0, left); left -= part.length;
out += c ? `<span class="${c}">${esc(part)}</span>` : esc(part);
}
if (left > 0) { out += '\n'; left--; }
}
codePre.innerHTML = out + '<span class="caret"></span>';
};
const hint = document.getElementById('scrollHint');
let hintTimer = null;
const farDown = () => scrollY > innerHeight * .3;
const showHint = () => {
hint.classList.add('show');
hint.classList.toggle('hide', farDown());
if (reduce) return;
setInterval(() => {               // si no baja, el botón vuelve a "llamar"
if (farDown()) return;
hint.classList.remove('nudge'); void hint.offsetWidth; hint.classList.add('nudge');
}, 3500);
};
hint.addEventListener('animationend', e => { if (e.animationName === 'pop') hint.classList.add('popped'); if (e.animationName === 'nudge') hint.classList.remove('nudge'); });
addEventListener('scroll', () => { if (hint.classList.contains('show')) hint.classList.toggle('hide', farDown()); }, { passive: true });
const finishCode = () => { codeDone = true; codeStatus.textContent = UI[LANG].done; codeStatus.classList.add('ok'); if (reduce) showHint(); };
if (reduce) { renderCode(total); finishCode(); }
else {
renderCode(0);
let typed = 0, started = false, pause = 0, hintShown = false;
const iaStart = lines.slice(0, 3).reduce((a, l) => a + l.reduce((b, [, t]) => b + t.length, 0) + 1, 0);
const hintAt = Math.max(0, iaStart - 38);
updaters.push(dt => {
if (!started) { if (document.body.classList.contains('is-ready')) { started = true; pause = .5; } return; }
if (typed >= total) return;
if (pause > 0) { pause -= dt; return; }
const before = Math.floor(typed);
typed = Math.min(total, typed + dt * 38);
const n = Math.floor(typed);
if (n !== before) {
renderCode(n);
let k = 0, nl = false;           // pequeña pausa al final de cada línea
for (const l of lines) { k += l.reduce((b, [, t]) => b + t.length, 0) + 1; if (k === n) { nl = true; break; } if (k > n) break; }
if (nl) pause = .12;
}
if (!hintShown && typed >= hintAt) { hintShown = true; showHint(); } // ~1 s antes de la línea de IA
if (typed >= total) finishCode();
});
}
if (fine && !reduce) {
const rx = spring(120, 16), ry = spring(120, 16);
addEventListener('pointermove', e => {
const r = codeCard.getBoundingClientRect();
const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth, dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
ry.t = clamp(dx * 14, -7, 7); rx.t = clamp(-dy * 12, -6, 6);
}, { passive: true });
updaters.push(dt => { rx.step(dt); ry.step(dt); codeCard.style.transform = `rotateX(${rx.x.toFixed(2)}deg) rotateY(${ry.x.toFixed(2)}deg)`; });
}
/* ---------- Marquee ---------- */
const track = document.getElementById('track'), group = track.querySelector('.group');
let groupW = 0;
const measure = () => { groupW = group.offsetWidth; };
addEventListener('resize', measure);
document.fonts && document.fonts.ready.then(measure);
let x = 0, dir = -1, lastY = scrollY, boost = 0;
addEventListener('scroll', () => { const d = scrollY - lastY; if (d) dir = d > 0 ? -1 : 1; boost = Math.min(boost + Math.abs(d) * .9, 1400); lastY = scrollY; }, { passive: true });
if (!reduce) updaters.push(dt => {
if (!groupW) measure(); const w = groupW; if (!w) return;
boost *= Math.pow(.04, dt);
x += dir * ((innerWidth < 760 ? 46 : 70) + boost * .45) * dt;
if (x <= -w) x += w; if (x > 0) x -= w;
track.style.transform = `translate3d(${x}px,0,0)`;
});
/* ---------- Trading: gráfico que se dibuja con el scroll ---------- */
const trading = document.getElementById('trading');
(() => {
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const N = 90, pts = []; let v = 190;
for (let i = 0; i < N; i++) { v += (rnd() - .43) * 22; v = clamp(v, 30, 270); pts.push([i / (N - 1) * 1000, 300 - v]); }
const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
document.getElementById('linePath').setAttribute('d', d);
document.getElementById('areaPath').setAttribute('d', d + ' L1000 300 L0 300 Z');
const tape = document.getElementById('tape');
const items = ['SPY', 'CALLS', 'PUTS', 'THETA', 'DELTA', 'GAMMA', 'VEGA', 'IV', 'S&P 500', 'OPCIONES', 'RIESGO / BENEFICIO'];
const html = items.map(s => `<span><b>●</b> ${s}</span>`).join('');
tape.innerHTML = html + html + html;
})();
const reveal = document.getElementById('revealRect'), spy = document.getElementById('spy'), tape = document.getElementById('tape');
let tapeX = 0;
/* ---------- Fútbol: verde + líneas + balón con el scroll ---------- */
const futbol = document.getElementById('futbol'), ball = document.getElementById('ball');
const lns = futbol.querySelectorAll('.ln');
lns.forEach(l => { l.style.strokeDasharray = '1'; });
const progress = el => { const r = el.getBoundingClientRect(); return clamp((innerHeight - r.top) / (innerHeight + r.height)); };
const scrollFx = () => {
const pt = progress(trading);
const draw = reduce ? 1 : clamp((pt - .15) / .5);
reveal.setAttribute('width', (draw * 1000).toFixed(1));
trading.style.setProperty('--p', reduce ? .5 : clamp((pt - .1) / .8).toFixed(3));
const pf = progress(futbol);
const g = reduce ? 1 : clamp((pf - .12) / .25);
futbol.style.setProperty('--g', g.toFixed(3));
futbol.classList.toggle('on', g > .5);
const ld = reduce ? 1 : clamp((pf - .2) / .35);
lns.forEach(l => { l.style.strokeDashoffset = (1 - ld).toFixed(3); });
const bw = futbol.clientWidth;
const bp = clamp((pf - .1) / .8);
ball.style.transform = `translate3d(${(-bw * 1.05 * bp + (reduce ? -bw * .2 : 0)).toFixed(1)}px, ${(Math.abs(Math.sin(bp * Math.PI * 3)) * -40).toFixed(1)}px, 0) rotate(${(-bp * 900).toFixed(1)}deg)`;
};
scrollFx();
addEventListener('scroll', scrollFx, { passive: true });
addEventListener('resize', scrollFx);
if (!reduce) updaters.push(dt => {
const w = tape.scrollWidth / 3; if (!w) return;
tapeX -= (40 + boost * .3) * dt; if (tapeX <= -w) tapeX += w;
tape.style.transform = `translate3d(${tapeX}px,0,0)`;
});
/* ---------- Cursor + vista previa de proyectos ---------- */
if (fine && !reduce) {
const cur = document.getElementById('cursor'), peek = document.getElementById('peek');
const cx = spring(500, 40), cy = spring(500, 40), cs = spring(260, 20, 1);
const px = spring(180, 22), py = spring(180, 22), ps = spring(220, 20, 0), pr = spring(120, 14, 0);
let seen = false, prevX = 0;
addEventListener('pointermove', e => {
if (!seen) { cx.x = cx.t = e.clientX; cy.x = cy.t = e.clientY; px.x = e.clientX; py.x = e.clientY; seen = true; cur.style.opacity = 1; }
cx.t = e.clientX; cy.t = e.clientY; px.t = e.clientX + 24; py.t = e.clientY - 100;
pr.t = clamp((e.clientX - prevX) * .6, -8, 8); prevX = e.clientX;
}, { passive: true });
document.addEventListener('pointerleave', () => { cur.style.opacity = 0; seen = false; });
document.querySelectorAll('a').forEach(a => {
a.addEventListener('pointerenter', () => { cs.t = a.closest('.rows') ? 0 : 3.2; });
a.addEventListener('pointerleave', () => { cs.t = 1; });
});
document.querySelectorAll('.rows a').forEach(a => {
a.addEventListener('pointerenter', () => {
document.getElementById('peekDomain').textContent = a.dataset.domain;
document.getElementById('peekName').textContent = a.querySelector('.r-name').textContent;
peek.style.setProperty('--h', a.dataset.hue); ps.t = 1;
});
a.addEventListener('pointerleave', () => { ps.t = 0; });
});
updaters.push(dt => {
[cx, cy, cs, px, py, ps, pr].forEach(s => s.step(dt)); pr.t *= .9;
cur.style.transform = `translate3d(${cx.x}px,${cy.x}px,0) scale(${Math.max(0, cs.x)})`;
const s = Math.max(0, ps.x);
peek.style.opacity = Math.min(1, s * 1.4);
peek.style.transform = `translate3d(${px.x}px,${py.x}px,0) scale(${.6 + .4 * s}) rotate(${pr.x}deg)`;
});
}
/* ---------- Legal (sin banner de cookies) ---------- */
const legal = document.getElementById('legal');
let lastFocus = null;
const openLegal = id => {
lastFocus = document.activeElement;
legal.querySelectorAll('article').forEach(a => { a.hidden = a.id !== id; });
legal.querySelector('h2#legalTitle')?.removeAttribute('id');
legal.querySelector('#' + id + ' h2').id = 'legalTitle';
legal.hidden = false; document.body.classList.add('locked');
const sheet = legal.querySelector('.legal-sheet'); sheet.scrollTop = 0;
requestAnimationFrame(() => requestAnimationFrame(() => { legal.classList.add('open'); sheet.focus(); }));
};
const closeLegal = () => {
legal.classList.remove('open'); document.body.classList.remove('locked');
setTimeout(() => { legal.hidden = true; lastFocus && lastFocus.focus(); }, reduce ? 0 : 450);
};
document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => openLegal(b.dataset.open)));
legal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeLegal));
addEventListener('keydown', e => { if (e.key === 'Escape' && !legal.hidden) closeLegal(); });
/* cambio manual de idioma */
const langBtn = document.getElementById('langBtn');
langBtn.addEventListener('click', () => {
LANG = LANG === 'es' ? 'en' : 'es';
try { localStorage.setItem('lang', LANG); } catch (e) {}
applyDom(LANG);
lines = CODE[LANG]; total = totalOf();
if (codeDone || reduce) { renderCode(total); codeStatus.textContent = UI[LANG].done; }
else codeStatus.textContent = UI[LANG].typing;
});
if (['privacidad', 'terminos'].includes(location.hash.slice(1))) openLegal(location.hash.slice(1));
requestAnimationFrame(loop);
})();
