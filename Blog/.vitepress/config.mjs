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
      '/Ejercicios/': [
        {
          text: 'Ejercicions Electronica',
          items: [
            { text: 'Introducción', link: '/Ejercicios/' },
            { text: 'Diodos', link: '/Ejercicios/Diodos' },
            { text: ' Anexos',
              items: [
                { text: 'Carga-Divisor', link: '/Ejercicios/Thevenin-01' },
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
