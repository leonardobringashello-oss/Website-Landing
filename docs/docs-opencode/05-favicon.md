# Favicon real — 2026-09-15

## Error corregido
`favicon.ico` + `icon-192/512.png` eran copias del screenshot de marketing (`images.png`, 473 KB c/u): ilegibles a 16–48px y concepto erróneo (un favicon es una marca, no una captura).

## Nueva marca (`scripts/generate-favicon.py`, Pillow + Arial Bold)
Monograma **"LB"** blanco sobre negro — estética del sitio (`bg-black`, `theme-color #000`).

| Archivo | Tamaño | Uso |
|---|---|---|
| `favicon.svg` (262 B) | vector | tabs modernas (nítido a cualquier escala) |
| `favicon.ico` (2,3 KB, 16/32/48) | multi-size | fallback clásico |
| `apple-touch-icon.png` (180, fondo pleno) | 2,3 KB | iOS (exige fondo opaco) |
| `icon-192.png` / `icon-512.png` | 2,5 / 4,3 KB | PWA (`any` + `maskable`) |

Total iconos: ~11 KB (antes: ~1,4 MB).

## Referencias
- `Base.astro`: SVG primero + ICO fallback + apple-touch 180.
- `site.webmanifest`: solo PNG (`any` + `maskable`), `background_color` → `#000000`.
- Regenerar: `python scripts/generate-favicon.py`.
