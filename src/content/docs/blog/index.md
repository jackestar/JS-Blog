---
title: Jackestar Blog
description: Electronics, Web Design and Technology

template: splash

head:
  - tag: meta
    attrs:
      property: og:title
      content: 'Jackestar Blog'
  - tag: meta
    attrs:
      property: og:description
      content: 'Electronics, Web Design and Technology'

hero:
  title: 'Jackestar Blog'
  tagline: 'Electronics, Web Design and Technology'
  actions:
    - variant: primary
      text: Portfolio
      link: https://jackestar.netlify.app/
    - variant: secondary
      text: Blog Repo
      link: https://github.com/jackestar/JS-Blog/
    - variant: secondary
      text: Documentos
      link: /blog/papers/

  image:
    file: ./blogBanner.png
    alt: Jackestar Blog
---

<!--
  VitePress home page styling. The equivalent rules live in the Starlight
  custom CSS (src/styles/custom.css) once the theme is ported:

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
-->
