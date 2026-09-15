# SEO, OG y contenido — 2026-09-15

## Imágenes (`scripts/generate-images.py`, Pillow)
Derivados generados desde fuentes en `public/`:

| Archivo | Antes | Después | Uso |
|---|---|---|---|
| `og-image.jpg` (nuevo, calidad 80) | — | 69 KB, 1200×630 | `og:image` + `twitter:image` (JPG = compatible WhatsApp/FB/X) |
| `og-image.webp` (nuevo) | — | 41 KB | uso web interno |
| `og-image.png` | 1251 KB, 1672×941 | 652 KB, 1200×630 crop | fallback |
| `favicon.ico` | 473 KB (copia PNG) | 6 KB multi-size real | tab browser |
| `icon-192.png` | 473 KB | 40 KB resize real | PWA + `apple-touch-icon` |
| `icon-512.png` | 473 KB | 262 KB resize real | manifest maskable + JSON-LD `logo` |

Regenerar con: `python scripts/generate-images.py` (+ el paso JPG está en el historial del script; hoy se corrió inline).

## SEO técnico (`src/layouts/Base.astro`, `src/pages/index.astro`)
- `og:image` → `/og-image.jpg` absoluto + `og:image:type image/jpeg`, `og:image:alt` descriptivo.
- Nuevos: `og:site_name`, `og:locale es_AR`, `twitter:image:alt`.
- `apple-touch-icon` → `/icon-192.png` (antes `.ico` inválido); `logo` JSON-LD → `/icon-512.png`.
- `sameAs` suma GitHub; `areaServed` suma Buenos Aires (ciudad) además de Argentina.
- `<title>` y meta home con keywords locales: "Diseño Web en Buenos Aires | Landing Pages y Ecommerce".
- TODO: `TU_ID` Formspree, GA4 con Partytown, BAM.

## Contenido y planes (`src/data/planes.ts`, `Pricing.astro`, `Content.astro`)
Inconsistencias corregidas:
1. Precios mixtos `$150K` vs `$1.7M` → corto unificado (`$150K/$270K/$1,7M`) + línea completa `$150.000 ARS` y nota `ARS · valores base, sin impuestos ni hosting/dominio` (nuevo campo `priceNote`, render en card).
2. SSL Inicial contradictorio ("incluido / indicar si requiere...") → "SSL incluido (instalación según tu hosting)".
3. "Código limpio" (jerga, no beneficio) → "Entrega de archivos del sitio".
4. "Sin soporte incluido" (negativo) → "Garantía de 7 días por errores + mantenimiento optativo".
5. "Pruebas A/B básica" (vago) → "Estructura lista para pruebas A/B de titulares y CTAs".
6. Ecommerce "SSL + correo" en un bullet → dos bullets separados; rondas unificadas a "N rondas de revisiones...".
7. Taglines reescritos a beneficio ("...que necesitan presencia simple", "...para convertir visitas...").
8. CTA `wa.me` ahora declara `ARS` en el mensaje pre-llenado.
9. Form: `<label sr-only>` + `autocomplete` + `_subject`/`_next=/gracias` (era solo placeholders). CTA cards con `aria-label`.
10. Tab "Empresas" vacío eliminado desde el scaffold (era fuga).
