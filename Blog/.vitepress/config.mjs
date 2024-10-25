import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Blog/',
  lang: 'es-ES',
  lastUpdated: true,
  title: "Jackestar Blog",
  description: "Electronics, Web Desing and Techology",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Artículos', link: '/' },
      { text: 'Home', link: 'https://jackestar.netlify.app/' }
    ],
    search: {
      provider: 'local'
    },

    aside: {},
    sidebar: {
      // This sidebar gets displayed when a user
      // is on `guide` directory.
      '/Baremetal/': [
        {
          text: 'Desarrollo Baremetal en Microcontroladores',
          items: [
            { text: 'Introducción', link: '/Baremetal/' },
            { text: 'Instalación', link: '/Baremetal/Installation' },
            { text: 'Ejemplos',
              items: [
                { text: 'Blink', link: '/Baremetal/blink' },
                { text: 'Encoder Rotatorio (Rotary Encoder)', link: '/Baremetal/incremental_encoder' },
              ]
            },
          ]
        }
      ],

      // This sidebar gets displayed when a user
      // is on `config` directory.
      '/Ejercicios-Electronica-I/': [
        {
          text: 'Ejercicios Electronica I',
          items: [
            { text: 'Introducción', link: '/Ejercicios-Electronica-I/' },
            { text: 'Diodos', link: '/Ejercicios-Electronica-I/Diodos' },
            { text: ' Anexos',
              items: [
                { text: 'Carga-Divisor', link: '/Ejercicios-Electronica-I/Thevenin-01' },
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
            { text: 'FET', link: '/Ejercicios-Electronica-II/FET' },
            { text: ' Anexos',
              items: [
                { text: 'Guía'},
              ]
            },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jackestar' }
    ]
  }
})
