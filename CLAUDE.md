# CLAUDE.md · condado-club

Web de Condado Club Dénia: **https://condadoclub.es**. Repo público: aquí solo va lo técnico.

## Infraestructura

| Pieza | Detalle |
|---|---|
| Hosting en producción | **Dinahosting** (Apache), servidor `condadoclub-es.espacioseguro.com`, usuario FTP `condadoclub_ftp` |
| Publicación | GitHub Actions → FTPS (`.github/workflows/publicar-dinahosting.yml`). Secreto `FTP_PASSWORD` en Settings → Secrets → Actions |
| Rama de producción | `main`. Cada push a `main` publica (salvo cambios solo en `.github/**`) |
| Venta de entradas | **Fourvenues** (iframes/scripts incrustados, slug `condado-club-denia`) |
| Analítica | Google Tag Manager `GTM-T2TBQTHZ` con Consent Mode v2; solo se carga si el usuario acepta cookies (`localStorage.cookie_consent`) |
| Configs de otros hostings | `vercel.json` (Vercel) y `_redirects` (Netlify) hacen lo mismo que `.htaccess`. No son producción; mantenerlos coherentes si se cambian rutas |

No hay build, ni `package.json`, ni dependencias locales. Lo que hay en el repo es exactamente lo que se sirve.

## Arquitectura

```
index.html            # TODA la web (SPA): HTML + CSS + React/JSX en un solo archivo (~3.350 líneas)
evento/index.html     # Página independiente (HTML + JS vanilla) con el widget de evento de Fourvenues
assets/
  artists/            # Fotos de artistas  (*-condado.jpg)
  events/             # Carteles antiguos (no los usa la web actual)
  sala/               # Galería de la sala (sala-condado-NN.jpg, zona-vip-escenario.jpg)
  logos/              # Logo, favicon, sellos (Top 100, etc.), logo Silence Club
  svg/condado-sala.svg  # Motivo del techo LED
  video/              # Vídeos del hero (mp4, ~4 MB cada uno)
  fonts/              # Oxanium
.htaccess             # Reescrituras Apache (SPA)
robots.txt, sitemap.xml
```

### index.html

- React 18.3.1 + ReactDOM + Babel standalone desde unpkg (con `integrity`). El JSX se compila **en el navegador** (`<script type="text/babel">`). Un error de sintaxis deja la web en blanco: no hay compilador que avise.
- `<base href="/">` y rutas de assets relativas (`assets/...`).
- `<head>`: GTM + consentimiento, SEO (title, description, canonical, Open Graph, Twitter) y JSON-LD `NightClub` (dirección, teléfono, horario, redes). Si cambia un dato de contacto, cambiarlo también aquí.
- Router propio: objeto `ROUTES` (path → componente) + `history.pushState` + `popstate`. Navegación interna con `onNav(path)`. Ruta desconocida → Home.
  - Rutas: `/`, `/calendario`, `/mesas-vip`, `/sala`, `/artistas`, `/eventos-privados`, `/evento`, `/contacto`, `/aviso-legal`, `/politica-privacidad`, `/politica-cookies`.
  - Ruta nueva = añadir a `ROUTES`, a `NAV_ITEMS` si va en el menú y a `sitemap.xml`.
- `App` monta siempre: `Nav`, página, `Footer`, `WhatsAppButton` (wa.me en móvil, WhatsApp Web en escritorio), `CookieBanner`, `TweaksPanel`.
- Diseño: tokens CSS en `:root` (`--gold`, `--night`, `--serif`, `--sans`…). `applyTweaks()` los sobrescribe según `TWEAK_DEFAULTS` (vibe `gold`, display `condensed`, intensity `editorial`). El `TweaksPanel` es una herramienta de diseño que solo se abre por `postMessage` (`__activate_edit_mode`); en la web pública no se ve. Para cambiar el look en producción, cambiar `TWEAK_DEFAULTS`.
- Animación de entrada: clase `.reveal` + IntersectionObserver.

### Dónde se edita cada contenido (todo en `index.html`)

| Contenido | Dónde |
|---|---|
| Eventos / calendario / entradas | **En Fourvenues, no en el código.** Home (`type=home`) y `/calendario` (`type=all`) incrustan el script de `custom-iframe.fourvenues.com/iframe/condado-club-denia/...`, con `href=evento` |
| Artistas | Array `ARTISTS` (`name`, `genre`, `img`). Home muestra los 10 primeros; `/artistas`, todos. Foto en `assets/artists/<slug>-condado.jpg` |
| Mesas VIP | Array `VIP_TABLES` (id, nombre, precio, pax, ubicación…) |
| Galería de la sala | Array `GALLERY` (rutas en `assets/sala/`) |
| Menú | `NAV_ITEMS` |
| Footer (contacto, "Trabaja con nosotros", redes, firma) | Componente `Footer` |
| Contacto | Componente `Contacto` (mapa de Google con filtro oscuro) |
| WhatsApp | `WhatsAppButton` (teléfono + texto). Duplicado en `evento/index.html` |
| Textos legales | `AvisoLegal`, `PoliticaPrivacidad`, `PoliticaCookies` |

Código muerto: `EVENTS`, `EventCard` y `MONTH_NUM`/`MONTH_NAME` son de la versión anterior a Fourvenues y no se pintan en ninguna página. No actualizar `EVENTS` creyendo que cambia el calendario.

### evento/index.html

- Página aparte, sin React. Carga `https://www.fourvenues.com/assets/iframe/condado-club-denia/events` (ficha del evento y compra).
- Cabecera propia (menú lateral + logo), botón "Eventos" con flecha curva que solo aparece en URLs `/evento/#events/<evento>` y lleva al calendario, y WhatsApp flotante.
- Al ser carpeta real, Apache la sirve directamente; la ruta `/evento` del SPA (`Evento` en `ROUTES`) en Dinahosting no llega a usarse.
- Repite a mano tokens de color, menú, WhatsApp y favicon de `index.html`: si cambian allí, cambiarlos aquí.

### Reescrituras (.htaccess)

1. `/ruta/` → `/ruta` (301), salvo carpetas reales como `/evento/`: los assets relativos fallarían con barra final.
2. Todo lo que no sea archivo ni carpeta real → `index.html`. `/assets/` y `/.well-known/` quedan fuera: un asset que falta da 404 (así se detecta).

## Publicación en Dinahosting

Workflow `Publicar en Dinahosting`:

- **Push a `main`** → copia de seguridad del servidor + publicación. `CLAUDE.md` no se sube a la web y un cambio solo en él no publica.
- **Manual** (Actions → Run workflow): `comparar` (por defecto) solo hace copia y lista diferencias; `publicar` sube.
- Pasos: descarga el servidor completo con `lftp mirror` (excepto `cgi-bin/` y `.well-known/`) → lo guarda como artifact `copia-servidor-<n>` (90 días) → compara con `git ls-files` → sube **solo** los archivos distintos o que faltan, uno a uno, sobrescribiendo.
- **Nunca borra nada del servidor.** Si se elimina o renombra un archivo en el repo, el viejo sigue en Dinahosting: hay que borrarlo a mano por FTP.
- `concurrency: dinahosting` evita dos publicaciones a la vez.
- El resumen del run incluye el diff de `index.html`, `evento/index.html`, `robots.txt` y `sitemap.xml`.
- Para restaurar: descargar el artifact `copia-servidor-<n>` del run anterior y subirlo.

## Flujo de trabajo

- Trabajar en ramas `claude/*` → PR a `main` → merge = publicación en producción. No hacer push directo a `main`.
- Ramas de prueba: `preview-*` (p. ej. `preview-evento-menu`, `preview-firma`, `preview-mapa-oscuro`) y `prueba-*` (p. ej. `prueba-eventos`, que contiene `docs-fourvenues/` con la documentación de la API). Sirven para enseñar o probar cambios; sus commits suelen ir marcados "Prueba (no aprobar)". **No se mergean.** Si una propuesta se aprueba, se rehace limpia en una rama `claude/*`.
- Cambios quirúrgicos: tocar solo lo pedido en `index.html`, sin reformatear el archivo (los diffs del workflow tienen que poder leerse).
- Assets reales del club, nunca de relleno. Nombres en minúsculas con guiones y sufijo `-condado` (`assets/artists/nombre-condado.jpg`). Comprimir imágenes y vídeos antes de subirlos.
- Antes de hacer push, abrir `index.html` servido en local (p. ej. `python3 -m http.server`) y comprobar que pinta: Babel solo falla en el navegador.
- Mensajes de commit en español, describiendo el cambio visible (`Footer: ...`, `/evento: ...`).
