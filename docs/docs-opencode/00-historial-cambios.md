# Historial de cambios — Website Landing

> Fuente única de verdad para auditoría, migración y limpieza.
> Todo cambio futuro debe agregar una entrada aquí con fecha UTC.

## 2026-09-15 — Auditoría 5 tracks (previo a Astro)

**Rol:** auditor senior full-stack + SEO + CRO.

**Hallazgos (con evidencia):**

| # | Hallazgo | Evidencia | Sev |
|---|---|---|---|
| 1 | Form contacto inexistente, JS muerto + falso éxito | `assets/javascript/main.js:67-133` vs `index.html` sin `<form id="contactForm">` | Crítica |
| 2 | Deploy subía todo el repo (`path: '.'`) | `.github/workflows/static.yml:40` | Alta |
| 3 | Sin CSP / headers seguridad | `index.html:1-70`, sin `_headers` | Alta |
| 4 | `onclick=switchTab` + reescritura `className` | `index.html:314,316`, `main.js:137-169` | Media |
| 5 | `sitemap.XML` mayúsculas vs `robots.txt` pide minúsculas → 404 en Pages | `sitemap.XML:1`, `robots.txt:4` | Alta |
| 6 | Doble CSS + `@import` Fonts bloqueante | `index.html:43-44`, `assets/css/global.css:9` | Alta |
| 7 | Manifest PWA inválido (`.ico` para 192/512) | `site.webmanifest:10-26` | Media |
| 8 | Tab Empresas vacío = fuga conversión | `index.html:768-772` | Alta |
| 9 | SVG Instagram roto (`fill=" none"`) | `index.html:1241` | Media |
| 10 | Email/tel en plano, sin backend | `index.html:1216,1232` | Media |
| 11 | Se promete GA4/píxel y no existe tracking | `index.html:1391-1394` | Alta |
| 12 | Jerarquía H rota (`h3` en Sobre mí), alt largo, `images.png` huérfano | `index.html:1157,1186` | Baja |

**Decisiones del usuario:**
1. Migrar todo a Astro (sí).
2. Mantener dominio `leobringasatlife.site`, source en GitHub.
3. Tailwind v4 con Astro.
4. Librerías livianas solo.

## 2026-09-15 — Scaffold Astro + Tailwind v4 en `astro/`

**Qué se creó (sin tocar legacy):**
- `astro/package.json` — `astro@5`, `@astrojs/sitemap`, `@tailwindcss/vite@4`, `sharp`. Scripts `dev/build/preview`.
- `astro/astro.config.mjs` — `site: https://leobringasatlife.site`, `output: static`.
- `astro/src/styles/global.css` — `@import "tailwindcss"`, `@theme Inter`, `prefers-reduced-motion`, `.pressable:active scale(0.97)`, hover con `@media (hover:hover)`.
- `astro/src/layouts/Base.astro` — SEO centralizado (canonical, OG/Twitter, JSON-LD `ProfessionalService` + `telephone`), `preconnect` Fonts.
- `astro/src/data/planes.ts` + `faq.ts` — contenido fuera del HTML.
- `astro/src/components/Header|Pricing|Content|Footer.astro` — 0 framework JS; menú vanilla, FAQ con `<details>`, form con honeypot + `data-event="wa_click"`.
- `astro/src/pages/index|404|gracias.astro`.
- `astro/public/CNAME`, `robots.txt` (minúsculas, sitemap-index), `site.webmanifest` (png 192/512), `.nojekyll`.
- `astro/.github-workflow-example.yml` — build `astro/dist`, upload solo `dist`.
- Build verificado: 3 páginas, `sitemap-index.xml` generado.

## 2026-09-15 — Unificación a un solo `package.json` (esta entrada sigue abajo)

Ver `03-limpieza-unificacion.md`.
