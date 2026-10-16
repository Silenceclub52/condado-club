// Genera las páginas de eventos de condadoclub.es a partir de la API de Fourvenues.
//
//   node scripts/generar-eventos.mjs <eventos.json>
//
// <eventos.json> es la respuesta de GET /integrations/events/ ({ success, data: [...] }).
// Escribe:
//   eventos/index.html            → listado: próximos eventos + eventos pasados
//   eventos/<slug>/index.html     → una página por evento (las antiguas se conservan)
//   eventos/historico.json        → todos los eventos vistos alguna vez; así los pasados
//                                   siguen en el listado aunque la API ya no los devuelva
//
// La cabecera, el menú y el botón de WhatsApp se copian de evento/index.html,
// para que todas las páginas compartan el mismo aspecto.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = 'https://www.condadoclub.es';
const TZ = 'Europe/Madrid';

const input = process.argv[2];
if (!input) {
  console.error('Uso: node scripts/generar-eventos.mjs <eventos.json>');
  process.exit(1);
}
const HISTORY = path.join(ROOT, 'eventos', 'historico.json');
const KEEP = ['_id', 'name', 'slug', 'url', 'start', 'end', 'flyer', 'description', 'age', 'music_genres', 'outfit', 'artists', 'location_town', 'visible', 'active'];
const slim = (e) => Object.fromEntries(KEEP.filter((k) => e[k] !== undefined).map((k) => [k, e[k]]));

// Histórico + lo nuevo de la API (lo nuevo manda: si cambia un evento, se actualiza).
const merged = new Map();
if (fs.existsSync(HISTORY)) for (const e of JSON.parse(fs.readFileSync(HISTORY, 'utf8'))) merged.set(e._id || e.slug, e);
for (const e of JSON.parse(fs.readFileSync(input, 'utf8')).data || []) if (e && e.slug) merged.set(e._id || e.slug, slim(e));
const all = [...merged.values()].sort((a, b) => a.start - b.start);

const events = all.filter((e) => e.name && e.start && e.visible !== false && e.active !== false);

// ---------- Piezas compartidas con evento/index.html ----------
const base = fs.readFileSync(path.join(ROOT, 'evento/index.html'), 'utf8');
const pick = (re, what) => {
  const m = base.match(re);
  if (!m) throw new Error(`No encuentro ${what} en evento/index.html`);
  return m[0];
};
const baseStyle = pick(/<style>[\s\S]*?<\/style>/, 'el bloque <style>').replace(/^<style>|<\/style>$/g, '');
const header = pick(/<header class="ev-header">[\s\S]*?<\/header>/, 'la cabecera');
const drawer = pick(/<div class="ev-overlay"[\s\S]*?<\/nav>/, 'el menú lateral');
const whatsapp = pick(/<a class="ev-whatsapp"[\s\S]*?<\/a>/, 'el botón de WhatsApp');

// ---------- Utilidades ----------
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SMALL = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'en', 'a', 'con']);
const titleCase = (s) =>
  s
    .toLocaleLowerCase('es')
    .split(/(\s+|-)/)
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toLocaleUpperCase('es') + w.slice(1)))
    .join('')
    .replace(/\s+-\s+/g, ' – ');

const fmt = (unix, opts) => new Intl.DateTimeFormat('es-ES', { timeZone: TZ, ...opts }).format(new Date(unix * 1000));
const cap = (s) => s.charAt(0).toLocaleUpperCase('es') + s.slice(1);
const fechaLarga = (u) => cap(fmt(u, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
const fechaCorta = (u) => cap(fmt(u, { weekday: 'short', day: 'numeric', month: 'short' }));
const hora = (u) => fmt(u, { hour: '2-digit', minute: '2-digit', hour12: false });
const iso = (u) => new Date(u * 1000).toISOString();

const OUTFIT = { free: 'Libre', casual: 'Casual', smart: 'Smart casual', 'half-label': 'Semiformal', label: 'Formal', 'fixed-up': 'Arreglado' };
const GENRE = { urban: 'Urbana', comercial: 'Comercial', hits: 'Éxitos', remember: 'Remember', 'old-school': 'Old school', 'r&b': 'R&B', edm: 'EDM' };
const genero = (g) => GENRE[g] || g.charAt(0).toUpperCase() + g.slice(1).replace(/-/g, ' ');

// El widget de /evento/ abre un evento con #events/<slug>-<código corto>; el código es el final de "url".
const shortCode = (e) => {
  const last = (e.url || '').split('/').filter(Boolean).pop() || '';
  return /^[A-Z0-9]{3,6}$/i.test(last) && !e.slug.endsWith(`-${last}`) ? last : '';
};
const buyHref = (e) => {
  const code = shortCode(e);
  return `/evento/#events/${code ? `${e.slug}-${code}` : e.slug}?hide=backarrow`;
};

const paragraphs = (text = '') =>
  text
    .split(/\n{2,}|\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('\n          ');

// ---------- Estilos propios de las páginas de evento ----------
const pageStyle = `
    .ev-wrap { max-width: 1100px; margin: 0 auto; padding: 28px 20px 120px; }
    .ev-crumbs { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--w40); margin-bottom: 22px; }
    .ev-crumbs a { color: var(--w60); }
    .ev-crumbs a:hover { color: var(--gold); }
    .ev-grid { display: grid; gap: 24px; grid-template-areas: 'head' 'poster' 'rest'; }
    .ev-head { grid-area: head; } .ev-poster { grid-area: poster; } .ev-rest { grid-area: rest; }
    @media (min-width: 860px) { .ev-grid { grid-template-columns: 380px 1fr; grid-template-areas: 'poster head' 'poster rest'; grid-template-rows: auto 1fr; align-items: start; column-gap: 48px; row-gap: 0; } }
    .ev-poster { width: 100%; max-width: 380px; height: auto; border-radius: 24px; background: var(--night-2); border: 1px solid var(--w08); display: block; }
    @media (min-width: 860px) { .ev-poster { position: sticky; top: 96px; } }
    .ev-kicker { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin: 0 0 12px; }
    .ev-title { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; font-size: clamp(40px, 6vw, 72px); line-height: 0.92; letter-spacing: -0.5px; text-transform: uppercase; margin: 0 0 18px; font-weight: 800; }
    .ev-when { font-size: 17px; color: var(--white); margin: 0 0 4px; }
    .ev-where { font-size: 14px; color: var(--w60); margin: 0; }
    @media (min-width: 860px) { .ev-where { margin-bottom: 22px; } }
    .ev-chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 26px; padding: 0; list-style: none; }
    .ev-chips li { font-size: 12px; letter-spacing: 0.5px; padding: 7px 12px; border-radius: 999px; border: 1px solid var(--w15); color: var(--w60); }
    .ev-cta { display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 52px; padding: 0 28px; border-radius: 999px; background: var(--gold); color: #120c02; font-weight: 600; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; transition: filter 200ms ease; }
    .ev-cta:hover, .ev-cta:focus-visible { filter: brightness(1.08); }
    .ev-cta svg { width: 18px; height: 18px; }
    .ev-ended { display: inline-block; padding: 12px 18px; border-radius: 999px; border: 1px solid var(--w15); color: var(--w60); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
    .ev-section { margin-top: 34px; padding-top: 26px; border-top: 1px solid var(--w08); }
    .ev-section h2 { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin: 0 0 12px; }
    .ev-section p { color: var(--w60); line-height: 1.7; margin: 0 0 10px; font-size: 15px; }
    .ev-info { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin: 0; }
    .ev-info dt { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--w40); margin-bottom: 4px; }
    .ev-info dd { margin: 0; color: var(--white); font-size: 14px; line-height: 1.5; }
    .ev-links { display: flex; flex-wrap: wrap; gap: 10px; }
    .ev-links a { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; padding: 11px 16px; border-radius: 999px; border: 1px solid var(--w15); color: var(--white); }
    .ev-links a:hover { border-color: var(--gold); color: var(--gold); }
    .ev-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 24; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: rgba(0,0,0,0.92); border-top: 1px solid var(--w08); display: flex; align-items: center; gap: 12px; }
    .ev-sticky .ev-cta { flex: 1; height: 48px; }
    .ev-sticky-info { font-size: 12px; color: var(--w60); line-height: 1.3; max-width: 45%; }
    .ev-sticky-info strong { display: block; color: var(--white); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    @media (min-width: 860px) { .ev-sticky { display: none; } }
    body.has-sticky .ev-whatsapp { bottom: 92px; }
    @media (min-width: 860px) { body.has-sticky .ev-whatsapp { bottom: 20px; } }

    /* Listado */
    .ev-list-head { margin: 0 0 32px; }
    .ev-cards { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
    @media (min-width: 1100px) { .ev-cards { grid-template-columns: repeat(4, 1fr); } }
    .ev-card { position: relative; display: block; aspect-ratio: 4 / 5.5; border-radius: 24px; overflow: hidden; background: var(--night-2); transition: transform 400ms ease, box-shadow 400ms ease; }
    .ev-card:hover, .ev-card:focus-visible { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(0,0,0,0.5); }
    .ev-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 600ms ease; }
    .ev-card:hover img { transform: scale(1.05); }
    .ev-card-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,5,9,0.97) 0%, rgba(8,5,9,0.65) 38%, rgba(8,5,9,0.12) 65%, transparent 100%); }
    .ev-card-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 20px; }
    .ev-card-date { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin: 0 0 4px; }
    .ev-card h2 { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.3px; line-height: 0.95; margin: 0 0 14px; }
    .ev-card-btn { display: flex; align-items: center; justify-content: center; height: 42px; border-radius: 999px; background: var(--gold); color: #120c02; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
    @media (max-width: 599px) {
      .ev-cards { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .ev-card { border-radius: 16px; }
      .ev-card-body { padding: 12px; }
      .ev-card-date { font-size: 9px; letter-spacing: 1.5px; }
      .ev-card h2 { font-size: 19px; margin-bottom: 10px; }
      .ev-card-btn { height: 34px; font-size: 9.5px; letter-spacing: 1.5px; }
    }
    .ev-empty { color: var(--w60); }
    .ev-past-head { margin: 72px 0 28px; }
    .ev-past-head .ev-title { font-size: clamp(32px, 4.5vw, 52px); }
    .ev-card.is-past img { filter: grayscale(0.6) brightness(0.8); }
    .ev-card.is-past:hover img { filter: none; }
    .ev-card.is-past .ev-card-date { color: var(--w60); }
    .ev-card.is-past .ev-card-btn { background: transparent; color: var(--white); border: 1px solid var(--w15); }
`;

const menuScript = `
  <script>
    (function () {
      var body = document.body, burger = document.querySelector('.ev-burger'), drawer = document.getElementById('ev-drawer');
      function setMenu(open) {
        body.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
        (open ? drawer.querySelector('.ev-close') : burger).focus();
      }
      burger.addEventListener('click', function () { setMenu(true); });
      document.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', function () { setMenu(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false); });
      var wa = document.querySelector('.ev-whatsapp');
      if (wa && !/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        wa.href = 'https://web.whatsapp.com/send?phone=34601602030&text=Hola%2C+necesito+informaci%C3%B3n+sobre+Condado+Club.';
      }
    })();
  </script>`;

const ticketIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9a3 3 0 0 0 0 6v3h18v-3a3 3 0 0 0 0-6V6H3z"/><path d="M14 6v12" stroke-dasharray="2 3"/></svg>`;

const layout = ({ title, description, canonical, image, jsonld = '', body, bodyClass = '' }) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/png" href="/assets/logos/favicon-condado.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Condado Club" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  ${image ? `<meta property="og:image" content="${esc(image)}" />` : ''}
  <meta property="og:locale" content="es_ES" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>${baseStyle}${pageStyle}  </style>
  ${jsonld}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
  ${header}

  ${drawer}

${body}

  ${whatsapp}
${menuScript}
</body>
</html>
`;

// ---------- Página de un evento ----------
function eventPage(e, now) {
  const name = titleCase(e.name);
  const ended = (e.end || e.start + 6 * 3600) < now;
  const url = `${SITE}/eventos/${e.slug}/`;
  const genres = (e.music_genres || []).map(genero);
  const artists = (e.artists || []).map((a) => (typeof a === 'string' ? a : a && a.name)).filter(Boolean);
  const when = `${fechaLarga(e.start)} · ${hora(e.start)}${e.end ? ` – ${hora(e.end)}` : ''}`;
  const description = `${name} en Condado Club Dénia, el ${fechaLarga(e.start).toLocaleLowerCase('es')} a las ${hora(e.start)}.${
    artists.length ? ` Con ${artists.join(', ')}.` : ''
  } Entradas y reservados VIP.`;

  const chips = [
    e.age ? `+${e.age}` : '',
    e.outfit ? `Dress code: ${OUTFIT[e.outfit] || e.outfit}` : '',
    ...genres,
  ].filter(Boolean);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate: iso(e.start),
    ...(e.end ? { endDate: iso(e.end) } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Condado Club',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Marqués de Campo, 42',
        postalCode: '03700',
        addressLocality: 'Dénia',
        addressRegion: 'Alicante',
        addressCountry: 'ES',
      },
    },
    ...(e.flyer ? { image: [e.flyer] } : {}),
    description: e.description || description,
    organizer: { '@type': 'Organization', name: 'Condado Club', url: SITE },
    ...(artists.length ? { performer: artists.map((n) => ({ '@type': 'PerformingGroup', name: n })) } : {}),
    offers: {
      '@type': 'Offer',
      url: `${SITE}${buyHref(e)}`,
      availability: ended ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
  };

  const cta = ended
    ? `<span class="ev-ended">Evento finalizado</span>`
    : `<a class="ev-cta" href="${buyHref(e)}" data-buy>${ticketIcon} Comprar entradas</a>`;

  const body = `  <main class="ev-wrap">
    <p class="ev-crumbs"><a href="/">Inicio</a> / <a href="/eventos/">Eventos</a></p>
    <div class="ev-grid">
      ${e.flyer ? `<img class="ev-poster" src="${esc(e.flyer)}" alt="Cartel de ${esc(name)} en Condado Club Dénia" />` : ''}
      <div class="ev-head">
        <p class="ev-kicker">${ended ? 'Evento pasado' : 'Próximo evento'}</p>
        <h1 class="ev-title">${esc(e.name)}</h1>
        <p class="ev-when">${esc(when)}</p>
        <p class="ev-where">Condado Club · Calle Marqués de Campo, 42 · Dénia</p>
      </div>
      <div class="ev-rest">
        ${chips.length ? `<ul class="ev-chips">${chips.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
        ${cta}
        ${artists.length ? `<section class="ev-section"><h2>Line-up</h2><p>${esc(artists.join(' · '))}</p></section>` : ''}
        ${e.description ? `<section class="ev-section"><h2>Información</h2>\n          ${paragraphs(e.description)}\n        </section>` : ''}
        <section class="ev-section">
          <h2>Cómo llegar</h2>
          <dl class="ev-info">
            <div><dt>Dirección</dt><dd>Calle Marqués de Campo, 42<br>03700 Dénia (Alicante)</dd></div>
            <div><dt>Parking</dt><dd>Parking público a 2 min</dd></div>
            <div><dt>Apertura</dt><dd>${esc(hora(e.start))} h</dd></div>
          </dl>
        </section>
        <section class="ev-section">
          <h2>Más opciones</h2>
          <div class="ev-links">
            <a href="/mesas-vip">Zonas VIP</a>
            <a href="/eventos/">Todos los eventos</a>
            <a href="/contacto">Contacto</a>
          </div>
        </section>
      </div>
    </div>
  </main>
${ended ? '' : `  <div class="ev-sticky">
    <div class="ev-sticky-info"><strong>${esc(name)}</strong>${esc(fechaCorta(e.start))} · ${esc(hora(e.start))}</div>
    <a class="ev-cta" href="${buyHref(e)}" data-buy>${ticketIcon} Comprar</a>
  </div>`}`;

  return layout({
    title: `${name} · ${fmt(e.start, { day: 'numeric', month: 'short', year: 'numeric' })} | Condado Club Dénia`,
    description,
    canonical: url,
    image: e.flyer,
    jsonld: `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
    body,
    bodyClass: ended ? '' : 'has-sticky',
  });
}

// ---------- Listado ----------
const card = (e, past) => `      <a class="ev-card${past ? ' is-past' : ''}" href="/eventos/${e.slug}/">
        ${e.flyer ? `<img src="${esc(e.flyer)}" alt="Cartel de ${esc(titleCase(e.name))}" loading="lazy" />` : ''}
        <div class="ev-card-grad"></div>
        <div class="ev-card-body">
          <p class="ev-card-date">${past ? esc(cap(fmt(e.start, { day: 'numeric', month: 'short', year: 'numeric' }))) : `${esc(fechaCorta(e.start))} · ${esc(hora(e.start))}`}</p>
          <h2>${esc(e.name)}</h2>
          <span class="ev-card-btn">${past ? 'Ver evento' : 'Tickets y VIP'}</span>
        </div>
      </a>`;

function listPage(upcoming, past) {
  const cards = upcoming.map((e) => card(e, false)).join('\n');
  const pastCards = past.map((e) => card(e, true)).join('\n');

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: upcoming.map((e, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/eventos/${e.slug}/` })),
  };

  return layout({
    title: 'Próximos eventos y fiestas en Dénia | Condado Club',
    description: 'Agenda de Condado Club Dénia: próximas fiestas, artistas y eventos. Compra tus entradas y reserva zona VIP.',
    canonical: `${SITE}/eventos/`,
    image: upcoming[0] && upcoming[0].flyer,
    jsonld: `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
    body: `  <main class="ev-wrap">
    <div class="ev-list-head">
      <p class="ev-kicker">Agenda</p>
      <h1 class="ev-title">Próximos eventos</h1>
    </div>
    ${upcoming.length ? `<div class="ev-cards">\n${cards}\n    </div>` : '<p class="ev-empty">Pronto anunciaremos nuevas fechas.</p>'}
    ${past.length ? `<div class="ev-past-head">
      <p class="ev-kicker">Histórico</p>
      <h2 class="ev-title">Eventos pasados</h2>
    </div>
    <div class="ev-cards">\n${pastCards}\n    </div>` : ''}
  </main>`,
  });
}

// ---------- Escritura ----------
const now = Math.floor(Date.now() / 1000);
const outDir = path.join(ROOT, 'eventos');
fs.mkdirSync(outDir, { recursive: true });
for (const e of events) {
  const dir = path.join(outDir, e.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), eventPage(e, now));
}
const isOver = (e) => (e.end || e.start + 6 * 3600) < now;
const upcoming = events.filter((e) => !isOver(e));
const past = events.filter(isOver).reverse();
fs.writeFileSync(path.join(outDir, 'index.html'), listPage(upcoming, past));
fs.writeFileSync(HISTORY, JSON.stringify(all, null, 1) + '\n');
console.log(`Páginas generadas: ${events.length} eventos (${upcoming.length} próximos, ${past.length} pasados) + listado.`);
