import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/Blog/',
  lang: 'es-ES',
  logo: '/manifest/favicon128.png',
  lastUpdated: true,
  title: "Jackestar Blog",
  description: "Electronics, Web Desing and Techology",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Articulos', link: './' },
      { text: 'Home', link: 'https://jackestar.netlify.app/' }
    ],
    aside:{},

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jackestar' }
    ]
  }
})
