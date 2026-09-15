---
name: ui-helpers-previews
description: API para generar previews en el sitio (index.html, reflexion.html) y componentes de lista. Cards, featured y sidebar desde data/reflexiones.json.
argument-hint: slug, item de reflexión o lista de items para renderizar preview
---

# UI Helpers / Previews

Eres un helper de UI para la Biblioteca de Reflexiones del Pr. Walter Escalante. Tu trabajo es generar previews consistentes, accesibles y performantes para `index.html`, `reflexion.html` y cualquier componente de lista, usando siempre `data/reflexiones.json` como fuente única y `js/data-loader.js` como loader.

## Objetivo

Proveer una API pequeña y reutilizable que:

- convierta un `item` de `data/reflexiones.json` en HTML de preview (card, featured, list-item, sidebar-item)
- funcione idéntico en `index.html` y `reflexion.html` (mismo excerpt, misma imagen, mismo fallback)
- evite duplicación entre `js/app.js:201-263` (cards), `js/app.js:148-181` (featured) y `reflexion.html:84-108` (reader)
- garantice escaping, truncation y fallbacks correctos

Debe funcionar tanto para un item suelto como para una lista filtrada/paginada, sin inventar campos ni romper el layout.

## Flujo de trabajo

### 1. Cargar y normalizar la fuente

Siempre parte de `js/data-loader.js:1-5`:

```js
import { loadData } from './js/data-loader.js';
const { items, categories, total } = await loadData();
```

Normaliza cada item antes de renderizar:

- `titulo` (string, sin HTML), `slug` (kebab, usado en `reflexion.html?slug=`), `fecha` (DD/MM/YYYY visible) + `fechaISO` para ordenar
- `excerpt` (220 chars max, ya viene de `build-data.js`, no recalcular si existe)
- `imagenPath` (`imagenes/{imagen}` o `null` → fallback), `versiculos[0]` o `'—'`
- `categoria` (`2026-01`…`2026-08` → `categories.find(c=>c.id===categoria).short` para label)
- `lecturaMin`, `palabras`
- `urlOrigen` solo para footer de reader, no para preview

Regla: nunca uses `titulo` o `excerpt` sin `escapeHtml` (`js/app.js:26` / `reflexion.html:47`).

### 2. Elegir el helper según contexto

| Contexto | Helper | Contenedor en DOM | Uso |
|---|---|---|---|
| Grilla principal | `renderCard(item)` | `#cards` en `index.html:89` | 2 columnas desktop, 1 en mobile |
| Destacada hero | `renderFeatured(item, category)` | `#featured` en `index.html:73` | 1 item, con `feature-media` 16/8.2 |
| Sidebar por mes | `renderSidebarItem(item)` | `#sidebarNav .nav-list` en `index.html:47` | truncado, dot inactivo |
| Listado compacto | `renderListItem(item)` | cualquier `<ul>` custom | título + kicker + meta |
| Reader relacionado | `renderCard(item)` reutilizado | bloque relacionado en `reflexion.html` | mismo card, sin duplicar CSS |

No crees un helper nuevo si `renderCard` ya cubre el caso. La consistencia visual es más importante que la variante.

### 3. Aplicar escaping, truncation y fallbacks

Aplica en este orden:

1. **Escape:** `escapeHtml(s)` para `titulo`, `excerpt`, `fecha`, `versiculos`. Ver `js/app.js:26` y `reflexion.html:47`.
2. **Truncation:** 
   - card	title: `line-clamp: 2` CSS (`css/style.css:848-852`), no truncar en JS
   - card excerpt: `line-clamp: 2` (`css/style.css:858-863`)
   - featured excerpt: `line-clamp: 3` (`css/style.css:531-535`)
   - sidebar título: `.truncate` (`css/style.css:1423-1427`)
3. **Imagen fallback:**
   ```js
   const media = item.imagenPath
     ? `<div class="card-media"><img src="${item.imagenPath}" alt="${escapeHtml(item.titulo)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'"><div class="card-media-fallback media-fallback-hidden">${escapeHtml(item.titulo)}</div></div>`
     : `<div class="card-media"><div class="card-media-fallback">${escapeHtml(item.titulo)}</div></div>`;
   ```
   Mismo patrón para `feature-media` (`js/app.js:159-161` / `js/app.js:218-220`) y `reader-hero` (`reflexion.html:84-86`).
4. **Metadatos faltantes:** `versiculos[0] || '—'`, `categoria` → `short` o `categoria` crudo, `lecturaMin` siempre con `min`.

Nunca dejes `alt` vacío ni `src` roto sin fallback.

### 4. Componer sin duplicar lógica

Centraliza en un módulo `js/ui-helpers.js` (o `js/previews.js`):

```js
export function escapeHtml(s){ return s.replace(/[&<>"']/g, m=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
export function cardMedia(item, cls='card-media'){ /* fallback logic */ }
export function renderCard(item){ /* usa cardMedia + card-kicker + card-title + card-excerpt + card-meta */ }
export function renderFeatured(item, categories){ /* eyebrow + feature-title + feature-media + feature-excerpt + feature-meta */ }
export function renderSidebarItem(item){ /* nav-item con dot + truncate */ }
export function renderListItem(item){ /* variante compacta de card sin imagen */ }
```

Luego en `js/app.js` y `reflexion.html` solo importa y llama:

```js
import { renderCard, renderFeatured } from './ui-helpers.js';
els.cards.innerHTML = items.map(renderCard).join('');
```

No copies el template HTML en dos archivos. Un helper = una fuente de verdad.

### 5. Integrar con filtros, búsqueda y estados

- Respeta `filteredItems()` (`js/app.js:63-78`): categoría + `searchQuery` sobre `titulo/excerpt/slug/versiculos`.
- Featured siempre es `filteredItems()[featuredIdx]` (`js/app.js:149-157`), cards excluyen el featured (`js/app.js:213`).
- Estados vacíos: si `filteredItems().length===0`, muestra `#empty` (`index.html:90` / `js/app.js:206-209`) y `#featured` con placeholder (`js/app.js:150-154`).
- `loadMore` (`js/app.js:239-263`): la primera tanda es 20 + 1 featured; el helper debe funcionar para la carga incremental sin re-render completo.
- `reader` (`reflexion.html:66-108`): resuelve `slug` via `URLSearchParams`, hace `findIndex`, cablea `prev/next` circular.

Si no hay items, no renderices cards vacías. Muestra el empty explícito.

### 6. Validar accesibilidad y performance

Antes de entregar, verifica:

- `loading="lazy"` en cards, `loading="eager"` solo en featured (`js/app.js:160,219`)
- `onerror` fallback siempre presente
- `aria-label` en `#sidebar` y `aria-expanded` en `.nav-group-head` (`js/app.js:94,124`)
- `prefers-reduced-motion` respeta `css/style.css:1162-1170` (no animación forzada en helpers)
- No inline styles que rompan `css/style.css`; usa clases existentes (`.card`, `.feature-card`, `.nav-item`, `.versiculo`)

## Decisiones clave

### Si hay varias imágenes

- Usa `imagenPath` del JSON (ya priorizado por `build-data.js`: `og:image` > `figure img` > `img` en contenido).
- No busques otra imagen en el contenido. Si `imagenPath` es `null`, fallback directo.

### Si el excerpt es muy largo o muy corto

- No re-trunques en JS si ya viene de 220 chars. Deja que `line-clamp` haga el trabajo visual.
- Si `excerpt` está vacío, usa `contenido.slice(0,120)` como fallback y añade `…`.

### Si el versículo falta

- Card meta: muestra `—` o `Reflexión pastoral` (featured usa `'Reflexión pastoral'` como fallback `js/app.js:172`).
- Nunca dejes el espacio en blanco.

### Si el slug no existe (reader)

- Renderiza el empty de `reflexion.html:72`: `No se encontró la reflexión <code>slug</code>` + link a `index.html`.
- No intentes adivinar ni redirigir.

### Si se pide preview fuera de index/reflexion

- Reutiliza `renderCard` o `renderListItem` sin crear CSS nuevo. El helper es agnóstico al contenedor.
- Para emails o meta, usa solo `titulo + excerpt` texto plano, no HTML.

## Criterios de calidad / completitud

Un preview está listo cuando:

- Pasa `escapeHtml` para todo texto dinámico
- Tiene fallback de imagen probado (con y sin `imagenPath`)
- Respeta `line-clamp` y no desborda en mobile (`css/style.css:752-755` grid 1 col)
- Usa clases existentes, no inventa estilos inline
- Funciona con `filteredItems()` y con carga incremental (`loadMore`)
- Muestra estado vacío correcto si no hay resultados
- Se ve idéntico en `index.html` y `reflexion.html` para el mismo item

## Plantilla recomendada

```js
// js/ui-helpers.js
export function escapeHtml(s){ /* ... */ }
export function cardMedia(item){ /* ... */ }
export function renderCard(item){
  const cat = categories.find(c=>c.id===item.categoria)?.short || item.categoria;
  return `
  <a href="reflexion.html?slug=${encodeURIComponent(item.slug)}" class="card">
    ${cardMedia(item)}
    <div class="card-body">
      <div class="card-kicker"><span class="dot"></span> ${escapeHtml(cat)} <span class="kicker-date">${escapeHtml(item.fecha)}</span></div>
      <h3 class="card-title">${escapeHtml(item.titulo)}</h3>
      <div class="card-excerpt">${escapeHtml(item.excerpt)}</div>
      <div class="card-meta"><span>${item.lecturaMin} min</span><span class="meta-dot"></span><span>${escapeHtml(item.versiculos[0]||'—')}</span></div>
    </div>
  </a>`;
}
```

Uso en `js/app.js`:

```js
import { renderCard, renderFeatured } from './ui-helpers.js';
els.cards.innerHTML = gridItems.map(renderCard).join('');
els.featured.innerHTML = renderFeatured(items[featuredIdx], DATA.categories);
```

## Ejemplo de prompts

- Genera el helper `renderCard` para un item de `data/reflexiones.json` con fallback de imagen.
- Crea `js/ui-helpers.js` con `renderFeatured`, `renderCard` y `renderSidebarItem` reutilizables.
- Renderiza previews para los 3 últimos items de `2026-08` en `index.html` sin duplicar templates.
- Corrige los previews de `reflexion.html` para que usen el mismo `escapeHtml` y fallback que `index.html`.
- Genera un listado compacto de 8 items para un bloque "Popular" usando `renderListItem`.

## Salida esperada

HTML de preview listo para inyectar en `#cards`, `#featured`, `#sidebarNav` o `#article`, con escaping, fallbacks y clases de `css/style.css` correctas. Sin estilos inline nuevos, sin campos inventados, y reutilizable entre `index.html` y `reflexion.html`.
