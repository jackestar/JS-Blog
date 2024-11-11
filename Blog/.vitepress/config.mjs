import { defineConfig } from 'vitepress'

let baseDir = '/Blog/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: baseDir,
  lang: 'es-ES',
  lastUpdated: true,
  title: "Jackestar Blog",
  description: "Electronics, Web Design and Technology",
  head: [
    ['link', { rel: 'stylesheet', href: `${baseDir}css/stylesU.css` }],
    ['link', { rel: 'icon', href: '/Blog/favicon.ico' }]
  ],
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
    outline: {
      label: 'En esta página'
    },
    lastUpdated: {
      text: 'Ultima Actualizacion',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    aside: {},
    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente'
    },
    footer: {
      message: 'Jackestar 2024',
    },
    langMenuLabel: 'Cambiar Idioma (Change lang)',
    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menu Lateral',
    darkModeSwitchLabel: 'Tema Oscuro',
    lightModeSwitchTitle: 'Modo claro',
    darkModeSwitchTitle: 'Modo oscuro',
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
            { text: 'BJT', link: '/Ejercicios-Electronica-I/BJT' },
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
  }
})

// export const search = {
//   es: {
//     placeholder: 'Buscar Articulo/Documento',
//     translations: {
//       button: {
//         buttonText: 'Buscar 🔍',
//         buttonAriaLabel: 'Buscar 🔍'
//       },
//       modal: {
//         searchBox: {
//           resetButtonTitle: 'Limpiar búsqueda',
//           resetButtonAriaLabel: 'Limpiar búsqueda',
//           cancelButtonText: 'Cancelar',
//           cancelButtonAriaLabel: 'Cancelar'
//         },
//         startScreen: {
//           recentSearchesTitle: 'Historial',
//           noRecentSearchesText: 'Ninguna búsqueda reciente',
//           saveRecentSearchButtonTitle: 'Guardar en el historial de búsqueda',
//           removeRecentSearchButtonTitle: 'Borrar del historial',
//           favoriteSearchesTitle: 'Favoritos',
//           removeFavoriteSearchButtonTitle: 'Borrar de favoritos'
//         },
//         errorScreen: {
//           titleText: 'No fue posible obtener resultados',
//           helpText: 'Verifique su conexión de red'
//         },
//         footer: {
//           selectText: 'Seleccionar',
//           navigateText: 'Navegar',
//           closeText: 'Cerrar',
//           searchByText: 'Búsqueda por'
//         },
//         noResultsScreen: {
//           noResultsText: 'No fue posible encontrar resultados',
//           suggestedQueryText: 'Puede intentar una nueva búsqueda',
//           reportMissingResultsText:
//             'Deberían haber resultados para esa consulta?',
//           reportMissingResultsLinkText: 'Click para enviar feedback'
//         }
//       }
//     }
//   }
// }