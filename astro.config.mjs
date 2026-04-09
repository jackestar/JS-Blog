// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';
import starlightGitHubAlerts from 'starlight-github-alerts';
import starlightSidebarTopics from 'starlight-sidebar-topics';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import AutoImport from 'astro-auto-import';
import mdx from '@astrojs/mdx';

import { visit } from 'unist-util-visit';

function lowercaseLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      // Only transform internal links (those not starting with http/https)
      if (node.url && !node.url.startsWith('http') && !node.url.startsWith('//')) {
        node.url = node.url.toLowerCase();
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      emptyOutDir: false
    }
  },

  integrations: [
    starlight({
      title: 'JS-Blog',
      lastUpdated: true,
      customCss: [
        './src/content/docs/globalstyle.css',
        'katex/dist/katex.min.css',
      ],
      plugins: [
        starlightGitHubAlerts(),

        starlightSidebarTopics([
          {
            label: 'Baremetal',
            link: '/blog/baremetal/',
            icon: 'rocket',
            items: [
              { label: 'Introducción', link: '/blog/baremetal/' },
              { label: 'Instalación AVR', link: '/blog/baremetal/installation_avr' },
              { label: 'Instalación ESP32', link: '/blog/baremetal/installation_esp32' },
              { label: 'Instalación ESP8266', link: '/blog/baremetal/installation_esp8266' },
              { label: 'Instalación ESP8266', link: '/blog/baremetal/installation_esp01' },
              {
                label: 'Ejemplos',
                items: [
                  { label: 'Blink AVR', link: '/blog/baremetal/blink_avr/' },
                  { label: 'Blink ESP01S (ESP8266)', link: '/blog/baremetal/blink_esp01s/' },
                  { label: 'Debouncing', link: '/blog/baremetal/debouncing/' },
                ]
              },
              {
                label: 'Librerías (AVR)',
                items: [
                  { label: 'Encoder Rotatorio', link: '/blog/baremetal/incremental_encoder/' },
                  { label: 'USART', link: '/blog/baremetal/usart/' },
                  { label: 'HC-SR04', link: '/blog/baremetal/ultra_sonic/' },
                  { label: 'SLX24C', link: '/blog/baremetal/slx24c/' },
                ]
              },
              {
                label: 'Librerías (ESP-idf)',
                items: [
                  { label: 'Stepper Driver', link: '/blog/baremetal/stepper-idf/' },
                ]
              },
              {
                label: 'Reverse Engineering',
                items: [
                  { label: 'Introducción', link: '/blog/baremetal/reverse_engineering/' },
                  { label: 'M220 (Display)', link: '/blog/baremetal/clover220-ri/' },
                  { label: 'LCD Display (Cámara)', link: '/blog/baremetal/lcd_camara-ri/' },
                ]
              }
            ]
          }, {
            label: 'Electrónica',
            link: '/blog/ejercicios-electronica-i/',
            icon: 'open-book',
            items: [
              {
                label: 'Electrónica I',
                // link and icon removed from this nested group
                items: [
                  { label: 'Introducción', link: '/blog/ejercicios-electronica-i/' },
                  { label: 'Diodos', link: '/blog/ejercicios-electronica-i/diodos/' },
                  { label: 'BJT', link: '/blog/ejercicios-electronica-i/bjt/' },
                  {
                    label: 'Anexos',
                    items: [
                      { label: 'Carga-Divisor', link: '/blog/electronica/thevenin-01/' },
                    ]
                  }
                ]
              },
              {
                label: 'Electrónica II',
                // link and icon removed from this nested group
                items: [
                  { label: 'Introducción', link: '/blog/ejercicios-electronica-ii/' },
                  {
                    label: 'FET',
                    items: [
                      { label: 'Introducción', link: '/blog/ejercicios-electronica-ii/fet' },
                      { label: 'Ejercicios', link: '/blog/ejercicios-electronica-ii/fet/ejercicios/' },
                      { label: 'Prueba Corta', link: '/blog/ejercicios-electronica-ii/fet/pruebacorta/' }
                    ]
                  },
                  {
                    label: 'Anexos',
                    items: [
                      { label: 'Ebers Moll', link: '/blog/electronica/ebers-moll/' },
                      { label: 'Equivalente Z FET', link: '/blog/electronica/z-transistor' },
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: 'Suite PAC 22',
            link: '/blog/pac22/',
            icon: 'laptop',
            items: [
              { label: 'Introducción', link: '/blog/pac22/' },
              { label: 'Instalación ArchLinux', link: '/blog/pac22/installation/' },
            ]
          },
          {
            label: 'PLD',
            link: '/blog/pld/',
            icon: 'puzzle',
            items: [
              { label: 'Introducción', link: '/blog/pld/' },
              { label: 'EB-136', link: '/blog/pld/eb-136/' },
            ]
          }
        ],
          {
            exclude: [
              '/blog',
              '/blog/about*',
              '/blog/papers*',

              '/blog/kicad',
              '/blog/kicad/**',

              '/blog/pensum',
              '/blog/pensum/**',
            ]
          }
        ),
      ],
    }),
    AutoImport({
      imports: [
        {
          '@astrojs/starlight/components': [
            'Badge',
            'Steps',
            'Tabs',
            'TabItem',
          ],
        },
      ],
    }),
    mdx(), // Add this after auto-import
  ],
  markdown: {
    remarkPlugins: [remarkMath, lowercaseLinks],
    rehypePlugins: [rehypeKatex],
  },
});