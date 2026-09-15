// Proyectos propios y de práctica — títulos descriptivos, sin marcas de
// terceros (sin permiso para links). Ver docs/docs-opencode/06-proyectos.md.
export interface Proyecto {
  titulo: string;
  descripcion: string;
  tags: string[];
  estado: 'Terminado' | 'En desarrollo';
  url?: string;
  imagen: string;
}

export const proyectos: Proyecto[] = [
  {
    titulo: 'Catálogo ecommerce — fragancias',
    descripcion: 'Tienda con catálogo interactivo, carrito, checkout rápido y quiz para encontrar tu fragancia.',
    tags: ['Ecommerce', 'React', 'Firebase'],
    estado: 'En desarrollo',
    imagen: '/proyectos/ecommerce-fragancias.webp',
  },
  {
    titulo: 'Biblioteca de reflexiones — concepto',
    descripcion: 'Sitio estático de 240 páginas con búsqueda instantánea, filtro por mes y lector con audio.',
    tags: ['Astro', 'Búsqueda', 'Concepto no oficial'],
    estado: 'En desarrollo',
    imagen: '/proyectos/biblioteca-reflexiones.webp',
  },
  {
    titulo: 'Landing negocio local — pastelería',
    descripcion: 'Página para emprendimiento de budines artesanales con SEO local y pedidos por WhatsApp.',
    tags: ['Landing', 'SEO local', 'WhatsApp'],
    estado: 'En desarrollo',
    imagen: '/proyectos/landing-pasteleria.webp',
  },
  {
    titulo: 'Lector bíblico estático',
    descripcion: 'Lector offline-first con 3 versiones, índice de búsqueda instantánea y navegación por capítulos.',
    tags: ['Astro', 'Búsqueda', 'Offline'],
    estado: 'En desarrollo',
    imagen: '/proyectos/lector-biblico.webp',
  },
  {
    titulo: 'Sitio de miniserie — episodios',
    descripcion: 'Listado de episodios con video, transcripciones en Markdown y navegación anterior/siguiente.',
    tags: ['Vanilla JS', 'YouTube', 'Markdown'],
    estado: 'En desarrollo',
    imagen: '/proyectos/sitio-miniserie.webp',
  },
  {
    titulo: 'Portfolio periodístico — concepto',
    descripcion: 'Portfolio para periodista deportivo: hero, estadísticas, destacados y centro de contenido.',
    tags: ['Concepto', 'Tailwind', 'Contenidos'],
    estado: 'En desarrollo',
    imagen: '/proyectos/portfolio-periodistico.webp',
  },
];
