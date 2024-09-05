---
# https://vitepress.dev/reference/default-theme-home-page

title: Jackestar Blog

layout: home

head:
  - - meta
    - property: 'og:title'
      content: 'Jackestar Blog'
  - - meta
    - property: 'og:description'
      content: 'Electronics, Web Design and Technology'

hero:
  name: "Jackestar Blog"
  text: "Electronics, Web Desing and Techology"
  tagline: Blog de ingeniería
  actions:
    - theme: brand
      text: Portfolio
      link: https://jackestar.netlify.app/
    - theme: alt
      text: Blog Repo
      link: https://github.com/jackestar/JS-Blog/
    - theme: alt
      text: Documentos
      link: ./papers.md

features:
  - title: Ejercicios Electronica Part. 1
    details: Ejercicios de Electronica con planteamiento de resolución rápida con trucos sencillos ejercicios complejos, sin tener que recurrir a herramientas de calculo complejo o plantear sistemas complejos de resolución
    link: ./Ejercicios
  - title: Baremetal Microcontrollers
    details: Programacion de microcontroladores baremetal C++ Rust y assambler
    link: ./Baremetal
---