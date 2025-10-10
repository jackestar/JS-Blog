import { defineConfig } from 'vitepress'

import path from 'path';
import generateImage from './generate-image';
import matter from 'gray-matter';
import fs from 'fs';

const defTitle = 'Jackestar Blog';
const defDescription = 'Electronica, Diseño Web y Tecnología';
const baseDir = '/Blog'

export default defineConfig({
  base: baseDir,
  lang: 'es-ES',
  lastUpdated: true,
  title: defTitle,
  description: defDescription,
  head: [
    ['link', { rel: 'stylesheet', href: `${baseDir}/css/stylesU.css` }],
    ['link', { rel: 'icon', href: `${baseDir}/favicon.png` }],
    ['link', { rel: 'manifest', href: `${baseDir}/blog.json` }]
  ],
  markdown: {
    math: true
  },
  themeConfig: {
    nav: [
      { text: 'Artículos', link: '/' },
      { text: 'Home', link: 'https://jackestar.netlify.app/' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Buscar',
                buttonAriaLabel: 'Buscar'
              },
              modal: {
                displayDetails: 'Detalles',
                resetButtonTitle: 'Reset',
                backButtonTitle: 'Volver',
                noResultsText: 'No Hay Resultados',
                footer: {
                  selectText: 'Seleccionar',
                  selectKeyAriaLabel:'Seleccionar',
                  navigateText: 'Navegar',
                  navigateUpKeyAriaLabel:'Subir',
                  navigateDownKeyAriaLabel:'Bajar',
                  closeText: 'Cerrar',
                  closeKeyAriaLabel:'Cerrar',
                },
              }
            }
          }
        }
      }
    },
    outline: {
      label: 'En esta página'
    },
    lastUpdated: {
      text: 'Ultima Actualización',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente'
    },
    footer: {
      message: 'Jackestar 2025',
    },
    langMenuLabel: 'Cambiar Idioma (Change lang)',
    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menu Lateral',
    darkModeSwitchLabel: 'Tema Oscuro',
    lightModeSwitchTitle: 'Modo claro',
    darkModeSwitchTitle: 'Modo oscuro',
    sidebar: {
      '/Baremetal/': [
        {
          text: 'Desarrollo Baremetal en Microcontroladores',
          items: [
            { text: 'Introducción', link: '/Baremetal/' },
            { text: 'Instalación AVR', link: '/Baremetal/installation_AVR' },
            { text: 'Instalación ESP32', link: '/Baremetal/installation_ESP32' },
            { text: 'Instalación ESP8266', link: '/Baremetal/installation_ESP8266' },
            {text: "Ejemplos",
              items: [
                { text: 'Blink AVR', link: '/Baremetal/blink_AVR' },
                { text: 'Blink ESP01S (ESP8266)', link: '/Baremetal/blink_ESP01S' },
                { text: 'Debouncing', link: '/Baremetal/debouncing' },
              ]
            },
            { text: 'Librerías (AVR)',
              items: [
                { text: 'Encoder Rotatorio (Rotary Encoder)', link: '/Baremetal/incremental_encoder' },
                { text: 'USART', link: '/Baremetal/USART' },
                { text: 'HC-SR04', link: '/Baremetal/ultra_sonic' },
                { text: 'SLX24C', link: '/Baremetal/SLX24C' },
              ]
            },
            { text: 'Librerías (ESP-idf)',
              items: [
                { text: 'Stepper Driver', link: '/Baremetal/stepper-idf' },
              ]
            },
            { text: 'Reverse Engineering',
              items: [
                { text: 'Introducción', link: '/Baremetal/reverse_engineering.md' },
                { text: 'M220 (Display)', link: '/Baremetal/clover220-RI' },
                { text: 'LCD Display (Cámara)', link: '/Baremetal/LCD_camara-RI' },
              ]
            }
          ]
        }
      ],

      '/Ejercicios-Electronica-I/': [
        {
          text: 'Ejercicios Electronica I',
          items: [
            { text: 'Introducción', link: '/Ejercicios-Electronica-I/' },
            { text: 'Diodos', link: '/Ejercicios-Electronica-I/Diodos' },
            { text: 'BJT', link: '/Ejercicios-Electronica-I/BJT' },
            { text: ' Anexos',
              items: [
                { text: 'Carga-Divisor', link: '/Electronica/Thevenin-01' },
              ]
            },
          ]
        }
      ],

      '/Ejercicios-Electronica-II/': [
        {
          text: 'Ejercicios Electronica II',
          items: [
            { text: 'Introducción', link: '/Ejercicios-Electronica-II/' },
            { text: 'FET',
              items: [
                {text: 'Ejercicios', link: '/Ejercicios-Electronica-II/FET/Ejercicios.md'},
                {text: 'Prueba Corta', link: '/Ejercicios-Electronica-II/FET/PruebaCorta.md'}
              ]
            },
            { text: ' Anexos',
              items: [
                { text: 'Guía'},
              ]
            },
          ]
        }
      ],
      '/PAC22/': [
        {
          text: 'Suite PAC 22',
          items: [
            { text: 'Introducción', link: '/PAC22/' },
            { text: 'Instalación ArchLinux', link: '/PAC22/installation.md' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jackestar' }
    ]
  },
  buildEnd: async (siteConfig) => {
    const pages: string[] = siteConfig.pages;

    // Filter out non-markdown files
    const markdownPages = pages.filter(page => page.endsWith('.md'));

    const faviconPath = path.resolve(__dirname, '../', 'favicon.png');

    for (const pagePath of markdownPages) {
      const filePath = path.resolve(__dirname, '../' + pagePath);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      const { title = defTitle, description = defDescription } = data;
      const outputPath = path.resolve(__dirname, './../../dist/Blog/manifest', `${pagePath.replace(/\//g, '_').replace(/\.md$/, '')}.png`);

      await generateImage(title, description, faviconPath, outputPath);
    }
  },
    transformHtml: async (html: string, id, {pageData,siteData}) => {
      const filePath = path.resolve(__dirname, `../${pageData.relativePath}`);
      const lang = siteData.lang || 'es-ES';

      // Check if the file exists before reading it
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return html;
      }
  
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
  
      const title = data.title || defTitle;
      const description = data.description || defDescription;
      const imagePath = `${baseDir}/manifest/${pageData.relativePath.replace(/\//g, '_').replace(/\.md$/, '')}.png`;
  
      const ogTags = `
        <meta property="og:locale" content="${lang}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${imagePath}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="800">
        <meta property="og:image:height" content="400">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${imagePath}">
      `;
  
      return html.replace(/<head>/, `<head>${ogTags}`);
  },
})