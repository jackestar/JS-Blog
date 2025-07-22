---

title: Jackestar Blog
description: Electronics, Web Design and Technology

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
  text: "Electronics, Web Design and Technology"
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

  image:
    src: ./blogBanner.png
    alt: Jackestar Blog

features:
  - title: Ejercicios Electronica Part. 1
    details: Ejercicios de Electronica con planteamiento de resolución rápida con trucos sencillos ejercicios complejos, sin tener que recurrir a herramientas de calculo complejo o plantear sistemas complejos de resolución
    link: ./Ejercicios-Electronica-I
  - title: Proyectos en Kicad
    details: Diversos proyectos de diseño electrónico implementados en PCB y prototipos en Kicad
    link: ./Kicad
  - title: Exportar esquemático de Kicad a SVG
    details: Exportar esquemático de Kicad a SVG usando Inkscape por linea de comandos de forma rápida
    link: ./Kicad/schematicToSVG.md
  - title: Baremetal Microcontrollers
    details: Programación de microcontroladores baremetal C++ Rust y assembler
    link: ./Baremetal
  - title: Ejercicios Electronica Part. 2
    details: Ejercicios de Electronica con planteamiento de resolución rápida con trucos sencillos ejercicios complejos, sin tener que recurrir a herramientas de calculo complejo o plantear sistemas complejos de resolución
    link: ./Ejercicios-Electronica-II
  - title: Proyectos con suite PAC Projects
    details: Proyectos, Guías y soluciones para la suite de PAC projects
    link: ./PAC22
---

<style>

:root {
  --vp-home-hero-image-background-image:linear-gradient(90deg,#3e63dd 0, #ffc400 7.5em,#bb0000 15em);
}

.VPFeatures .items .item {
  justify-self:center;
}

.main h1.name span {
    font-family: Montserrat Alternates;
    background: linear-gradient(90deg, #b00 0, #ffc400 7.5em, #bb0000 15em) text;
    transition: 0.5s ease-out;
    background-size: 15em;
    background-position: -2em;
    animation: 10s titleGradAnim infinite;
}

.VPFeatures .items {
  justify-content:center;
}
.VPFeatures .items .item p {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

</style>