# Limpieza y unificación — 2026-09-15

## Objetivo
Un solo `package.json` (Astro + Tailwind v4). Eliminar todo lo legacy que ya no cumple función.

## Eliminados (legacy vanilla)
| Archivo | Por qué ya no sirve |
|---|---|
| `index.html` (98 KB) | Reemplazado por `src/pages/index.astro` + componentes |
| `assets/` (`css/global.css`, `tailwind.min.css`, `javascript/main.js`, `image/`) | CSS/JS/imágenes ahora en `src/` + `public/`. Imágenes copiadas antes de borrar |
| `server.js` (express+livereload) | Solo dev legacy. Ahora `npm run dev` (Astro) |
| `tailwind.config.js` (v3) | Tailwind v4 usa plugin Vite, sin config |
| `sitemap.XML` (mayúsculas) | 404 en Pages. Ahora sitemap auto en minúsculas vía `@astrojs/sitemap` |
| `robots.txt` + `site.webmanifest` (root) | Movidos a `public/` con contenido corregido |
| `package.json` + `package-lock.json` + `node_modules/` (root legacy) | Stack viejo (tailwind v3, express). Reemplazados por los de Astro |
| `.github/workflows/static.yml` | Subía `path: '.'` (exponía todo). Reemplazado por `astro.yml` (solo `dist/`) |

## Movidos (`astro/` → root)
- `astro/src` → `src/`, `astro/public/*` → `public/`
- `astro/astro.config.mjs`, `astro/package.json`, `astro/package-lock.json` → root
- `astro/.github-workflow-example.yml` → `docs/docs-opencode/github-workflow-example.yml` (referencia)
- `astro/node_modules` → `node_modules/` (se evitó reinstalar)
- `astro/dist`, `astro/.astro` eliminados (regenerables)

## Estado
- Queda dir `astro/` vacío (bloqueado por otro proceso al intentar borrarlo). Borrar manual cuando se libere; no afecta el build.
- `.gitignore`: `node_modules/ dist/ .astro/` + logs. `package-lock.json` SÍ se commitea (lo exige `npm ci` en CI).
- Workflow activo: `.github/workflows/astro.yml`.
- Dominio: `public/CNAME` = `leobringasatlife.site`.
