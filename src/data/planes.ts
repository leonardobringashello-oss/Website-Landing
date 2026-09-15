export interface Plan {
  id: string;
  name: string;
  tagline: string;
  priceShort: string;
  priceFull: string;
  priceNote: string;
  eta: string;
  featured?: boolean;
  cta: string;
  features: string[];
}

const ARS_NOTE = 'ARS · valores base, sin impuestos ni hosting/dominio';

export const plans: Plan[] = [
  {
    id: 'inicial',
    name: 'Inicial',
    tagline: 'Ideal para emprendedores y startups que necesitan presencia simple',
    priceShort: '$150K',
    priceFull: '$150.000 ARS',
    priceNote: ARS_NOTE,
    eta: '5-7 días',
    cta: 'https://wa.me/5491125417299?text=Hola%20Leo%2C%20quiero%20el%20Plan%20Inicial%20(%24150.000%20ARS)',
    features: [
      'Sitio web de 1 página',
      'Diseño 100% adaptable (mobile-first)',
      'Formulario de contacto estándar',
      'SEO básico (títulos, meta y estructura)',
      'Optimización de velocidad de carga',
      'Íconos enlazados a tus redes sociales',
      'Entrega de archivos del sitio',
      'Certificado SSL incluido (instalación según tu hosting)',
      'Hosting, dominio y correo corporativo: no incluidos, se presupuestan por separado',
      '1 ronda de revisiones sobre el diseño inicial',
      'Garantía de 7 días por errores + mantenimiento mensual optativo',
    ],
  },
  {
    id: 'landing',
    name: 'Landing Pages',
    tagline: 'Página optimizada para convertir visitas en consultas y ventas',
    priceShort: '$270K',
    priceFull: '$270.000 ARS',
    priceNote: ARS_NOTE,
    eta: '15-20 días',
    featured: true,
    cta: 'https://wa.me/5491125417299?text=Hola%20Leo%2C%20quiero%20el%20Plan%20Landing%20Pages%20(%24270.000%20ARS)',
    features: [
      'Textos orientados a conversión (copywriting incluido)',
      'Píxel de Facebook y metaetiquetas configurados',
      'Botón flotante de WhatsApp con mensaje predefinido',
      'Integración con Google Maps',
      'Formulario avanzado (múltiples campos + envío a tu email)',
      'SEO avanzado (velocidad, estructura y palabras clave)',
      'Estructura lista para pruebas A/B de titulares y CTAs',
      'Certificado SSL incluido',
      'Hosting y dominio: no incluidos, se cotizan por separado',
      '2 rondas de revisiones y ajustes',
      'Soporte post-lanzamiento: 15 días incluidos',
    ],
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce',
    tagline: 'Tienda online completa para vender por internet',
    priceShort: '$1,7M',
    priceFull: '$1.700.000 ARS',
    priceNote: ARS_NOTE,
    eta: '45-60 días',
    cta: 'https://wa.me/5491125417299?text=Hola%20Leo%2C%20quiero%20el%20Plan%20Ecommerce%20(%241.700.000%20ARS)',
    features: [
      'Tienda online completa, hasta +200 productos',
      'Medios de pago integrados (locales e internacionales)',
      'Carrito y checkout optimizado',
      'Gestión de inventario y stock automática',
      'Cupones de descuento y promociones',
      'SEO para productos y categorías',
      'Google Merchant Center, GA4 y Píxel configurados',
      'Recuperación de carritos abandonados',
      'Páginas legales: Términos, Privacidad y Devoluciones',
      'Capacitación: 1 videollamada + manual de gestión',
      'Carga inicial de productos desde Excel u otra plataforma',
      'Hosting y dominio: no incluidos (se recomienda VPS o dedicado)',
      'Certificado SSL obligatorio incluido',
      'Correo corporativo (ventas@, info@) configurado',
      '3 rondas de revisiones en diseño y funcionalidades',
      'Soporte post-lanzamiento: 15 días incluidos',
    ],
  },
];
