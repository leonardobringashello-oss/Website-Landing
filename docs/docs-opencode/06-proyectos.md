# Sección Proyectos — 2026-09-15 (actualizado)

## Decisión
Debajo de "Leonardo Bringas", antes de `#contacto`. Título honesto: **"Proyectos"**
(todo en desarrollo, nada entregado, hechos para practicar).

## Reglas (del dueño)
- Sin links externos (sin permiso de terceros).
- Títulos descriptivos genéricos, sin marcas (AleaHome, Daily Grace, etc.).
- Tienda de Libros: excluida. Abogado y futbol-10: descartados (débil/vacía).

## Lineup (6, 2 filas)
| Card | Fuente analizada | Tags |
|---|---|---|
| Catálogo ecommerce — fragancias | `001_proyectos_clientes/catalogo-aleahome` (React 19 + Firebase + Gemini) | Ecommerce, React, Firebase |
| Biblioteca de reflexiones — concepto | `007_new_scraper/reflexiones_escalante_2026` (mostrar solo con crédito "concepto no oficial") | Astro, Búsqueda, Concepto no oficial |
| Landing negocio local — pastelería | `001_proyectos_clientes/emprendimiento-budines` | Landing, SEO local, WhatsApp |
| Lector bíblico estático | `003_biblia_completa/web` (solo RVR1960 publicable) | Astro, Búsqueda, Offline |
| Sitio de miniserie — episodios | `001_proyectos_clientes/VengaTuReino-MiniSerie` | Vanilla JS, YouTube, Markdown |
| Portfolio periodístico — concepto | `001_proyectos_clientes/proyecto-agustin-martinez` | Concepto, Tailwind, Contenidos |

## Archivos
- `src/data/proyectos.ts` — 6 items, `estado: 'En desarrollo'`, sin `url`.
- `src/components/Proyectos.astro` — grid 3→1, badge, JSON-LD `ItemList`.
- `public/proyectos/*.webp` — placeholders temáticos 1200×750 (~7-9 KB, script temporal eliminado).

## 2026-09-15 (tarde) — Teaser temporal para producción
Se reemplazó el grid de 6 cards con placeholders por un bloque "Próximamente"
(título + copete honesto + CTA a `#contacto`). Motivo: subir a producción sin
mostrar placeholders. Se borró `public/proyectos/`. `src/data/proyectos.ts`
queda como base para cuando lleguen las capturas reales. `id="proyectos"` y
links de nav intactos.
