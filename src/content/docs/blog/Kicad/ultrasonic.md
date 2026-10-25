---
title: TDA75610 Development Board
description: Placa de desarrollo para Amplificador Integrado TDA75610

lastUpdated: true
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

# Mini Ultrasonico HC-SR04 equivalente

El objetivo es crear una versión mini del módulo HC-SR04. La primera versión es una prueba de concepto, un reemplazo equivalente en forma esquemática, que utiliza transceptores ultrasónicos más pequeños y un microcontrolador ATtiny404 disponible comercialmente en lugar del EM78P153A, además de cuatro LED programables. Las futuras iteraciones se centrarán en simplificar aún más el diseño y desarrollar diferentes modelos.

[Repo](https://github.com/jackestar/mini-ultrasonic)

## Esquemático

[Schematic](https://drive.google.com/file/d/1bva3lENikmoGt62UBOM4qWOGih0VifjZ/view)

## Modelo 3D

<!-- The <model-viewer> web component is loaded globally from astro.config. -->
<model-viewer
  src="/models/UltraSonic.glb"
  poster="/models/UltraSonic.png"
  alt="Mini Ultrasonico HC-SR04"
  camera-controls
  auto-rotate
  shadow-intensity="1"
  loading="lazy">
</model-viewer>