// @ts-check
import {defineConfig} from 'astro/config';

import icon from 'astro-icon';

import starlight from '@astrojs/starlight';
import {satteri} from '@astrojs/markdown-satteri';
import starlightImageZoom from 'starlight-image-zoom';
import starlightSidebarTopics from 'starlight-sidebar-topics';

import {mathjaxPlugin} from './src/plugins/mathjax';
import {getMathJaxStylesheet} from './src/plugins/mathjax-render';

/**
 * The blog lives in the `/blog` subfolder, the portfolio is served from the
 * root of the deployment.
 */
const site = 'https://jackestar.netlify.app';

// The CSS needed to lay out the MathJax SVG output.
const mathjaxStylesheet = await getMathJaxStylesheet();

/**
 * Sidebar ported from the VitePress configuration.
 *
 * @type {import('@astrojs/starlight').StarlightUserConfig['sidebar']}
 */
const sidebar = [
  {
    label: 'Desarrollo Baremetal en Microcontroladores',
    link: '/blog/baremetal/',
    items: [
      {label: 'Introducción', link: '/blog/baremetal/'},
      {label: 'Instalación AVR', link: '/blog/baremetal/installation_avr/'},
      {label: 'Instalación ESP32', link: '/blog/baremetal/installation_esp32/'},
      {
        label: 'Instalación ESP8266',
        link: '/blog/baremetal/installation_esp8266/',
      },
      {label: 'Instalación ESP01', link: '/blog/baremetal/installation_esp01/'},
      {
        label: 'Ejemplos',
        items: [
          {label: 'Blink AVR', link: '/blog/baremetal/blink_avr/'},
          {
            label: 'Blink ESP01S (ESP8266)',
            link: '/blog/baremetal/blink_esp01s/',
          },
          {label: 'Debouncing', link: '/blog/baremetal/debouncing/'},
        ],
      },
      {
        label: 'Librerías (AVR)',
        items: [
          {
            label: 'Encoder Rotatorio (Rotary Encoder)',
            link: '/blog/baremetal/incremental_encoder/',
          },
          {label: 'USART', link: '/blog/baremetal/usart/'},
          {label: 'HC-SR04', link: '/blog/baremetal/ultra_sonic/'},
          {label: 'SLX24C', link: '/blog/baremetal/slx24c/'},
        ],
      },
      {
        label: 'Librerías (ESP-idf)',
        items: [
          {label: 'Stepper Driver', link: '/blog/baremetal/stepper-idf/'},
        ],
      },
      {
        label: 'Reverse Engineering',
        items: [
          {label: 'Introducción', link: '/blog/baremetal/reverse_engineering/'},
          {label: 'M220 (Display)', link: '/blog/baremetal/clover220-ri/'},
          {
            label: 'LCD Display (Cámara)',
            link: '/blog/baremetal/lcd_camara-ri/',
          },
        ],
      },
    ],
  },
  {
    label: 'Ejercicios Electronica I',
    link: '/blog/ejercicios-electronica-i/',
    items: [
      {label: 'Introducción', link: '/blog/ejercicios-electronica-i/'},
      {label: 'Diodos', link: '/blog/ejercicios-electronica-i/diodos/'},
      {label: 'BJT', link: '/blog/ejercicios-electronica-i/bjt/'},
      {
        label: 'Anexos',
        items: [
          {label: 'Thevenin', link: '/blog/electronica/thevenin-01/'},
          {label: 'Ebers-Moll', link: '/blog/electronica/ebers-moll/'},
          {label: 'Z-Transistor', link: '/blog/electronica/z-transistor/'},
        ],
      },
    ],
  },
  {
    label: 'Ejercicios Electronica II',
    link: '/blog/ejercicios-electronica-ii/',
    items: [
      {label: 'Introducción', link: '/blog/ejercicios-electronica-ii/'},
      {
        label: 'FET',
        items: [
          {
            label: 'Ejercicios',
            link: '/blog/ejercicios-electronica-ii/fet/ejercicios/',
          },
          {
            label: 'Prueba Corta',
            link: '/blog/ejercicios-electronica-ii/fet/pruebacorta/',
          },
        ],
      },
    ],
  },
  {
    label: 'Proyectos Kicad',
    link: '/blog/kicad/',
    items: [
      {label: 'Introducción', link: '/blog/kicad/'},
      {
        label: 'Esquemático a SVG',
        link: '/blog/kicad/schematictosvg/',
      },
      {label: 'TDA75610', link: '/blog/kicad/tda75610/'},
      {
        label: 'ESP01S Kitchen Driver',
        link: '/blog/kicad/esp01s-kitchen-driver/',
      },
      {label: 'Mini Ultrasonico', link: '/blog/kicad/ultrasonic/'},
    ],
  },
  {
    label: 'Suite PAC 22',
    link: '/blog/pac22/',
    items: [
      {label: 'Introducción', link: '/blog/pac22/'},
      {label: 'Instalación ArchLinux', link: '/blog/pac22/installation/'},
    ],
  },
  {
    label: 'PLD',
    link: '/blog/pld/',
    items: [
      {label: 'Introducción', link: '/blog/pld/'},
      {label: 'EB-136', link: '/blog/pld/eb-136/'},
    ],
  },
  {
    label: 'Otros',
    link: '/blog/papers/',
    items: [
      {label: 'Documentos - Papers', link: '/blog/papers/'},
      {label: 'PensumJS', link: '/blog/pensum/'},
      {label: 'Acerca de', link: '/blog/about/'},
    ],
  },
];

// https://astro.build/config
export default defineConfig({
  site,
  markdown: {
    // Sätteri is Astro's native Markdown pipeline. Math support is enabled so
    // that `$…$` and `$$…$$` are parsed as formulas instead of plain text.
    processor: satteri({
      features: {math: true},
      hastPlugins: [mathjaxPlugin()],
    }),
  },
  integrations: [
    icon(),
    starlight({
      title: 'Jackestar Blog',
      description: 'Electronics, Web Design and Technology',
      defaultLocale: 'root',
      locales: {
        root: {label: 'Español', lang: 'es'},
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/jackestar',
        },
      ],
      // sidebar,
      head: [
        {
          tag: 'script',
          content: `
        window.addEventListener('load', () => {
          const siteTitle = document.querySelector('.site-title');
          if (siteTitle) {
            siteTitle.href += 'blog/';
          }
        });
      `,
        },
        ...(mathjaxStylesheet
          ? [{tag: 'style', content: mathjaxStylesheet}]
          : []),
      ],
      customCss: [
        './src/styles/custom.css',
        './src/styles/theme.css',
        './src/styles/starlight-bridge.css',
      ],
      components: {
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
      plugins: [starlightImageZoom(), starlightSidebarTopics(sidebar)],
    }),
  ],
  vite: {
    server: {
      watch: {
        // Explicitly ignore node_modules and heavy icon packages
        ignored: [
          '**/node_modules/**',
          '**/node_modules/@iconify-json/**',
          '**/.git/**',
        ],
      },
    },
  },
});
