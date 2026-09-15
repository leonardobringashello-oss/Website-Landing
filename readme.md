# Desarrollo Web Profesional - Leonardo Bringas

Landing de servicios de desarrollo web de **Leonardo Bringas** (LeoBringasAtLife), Buenos Aires, Argentina. Sitios claros, rápidos y estratégicos para convertir visitas en consultas y ventas.

[Sitio web](https://leobringasatlife.site)

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 5 (static output) |
| CSS | Tailwind CSS v4 (`@tailwindcss/vite`, sin config) |
| SEO | `@astrojs/sitemap`, JSON-LD `ProfessionalService` + `FAQPage` |
| Form | Formspree (configurar ID) + honeypot |
| Deploy | GitHub Actions → GitHub Pages, dominio `leobringasatlife.site` vía `public/CNAME` |
| Imágenes | `scripts/generate-images.py` (Pillow): OG 1200×630, iconos PWA, favicon |

## Estructura

```
├── src/
│   ├── layouts/Base.astro      # SEO centralizado (canonical, OG, JSON-LD)
│   ├── components/Header|Pricing|Content|Footer.astro
│   ├── data/planes.ts + faq.ts # contenido (precios, features, FAQ)
│   ├── pages/index|404|gracias.astro
│   └── styles/global.css        # Tailwind v4 + .pressable
├── public/                      # CNAME, robots.txt, manifest, imágenes
├── scripts/generate-images.py
├── docs/docs-opencode/          # historial y decisiones
└── astro.config.mjs             # site + sitemap
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

Antes de publicar: poner el ID real de Formspree en `src/components/Content.astro` (`TU_ID`) y regenerar imágenes si cambia la marca (`python scripts/generate-images.py`).

## Planes

| Plan | Precio | Entrega |
|---|---|---|
| Inicial | $150.000 ARS | 5–7 días |
| Landing Pages ⭐ | $270.000 ARS | 15–20 días |
| Ecommerce | $1.700.000 ARS | 45–60 días |

Precios base en ARS, sin impuestos ni hosting/dominio. Detalle en `src/data/planes.ts`.

## Autor

**Leonardo Bringas** — Buenos Aires, Argentina — [leobringasatlife.site](https://leobringasatlife.site)
