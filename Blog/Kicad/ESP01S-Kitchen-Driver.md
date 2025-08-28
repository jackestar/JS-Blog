---
title: ESP01S Kitchen Driver
description: Opto Aislador para driver de Cocina, con ESP01S

lastUpdated: true
outline: deep
---

# ESP01S Kitchen Driver - Opto Aislador

Placa para Opto, aislar un ESP01S de un Relé de Estado Solido y conectar la alimentación y I/O,

[Repo](https://github.com/jackestar/ESP01S-Kitchen/)

## Requisitos

* PCB de 1 cara
* Alimentación externa (Vcc-GND)
* Montaje THT
* Puerto para Periféricos (Pulsador/SSR)
* Led indicador

## Alimentación

la alimentación entra en el rango de 3 a 3.6V, se utiliza un zener para proteger de sobre tensiones y voltajes inversos.

## Esquemático

[Esquemático](https://drive.google.com/file/d/1OSxR-wDeujzJ0baBaZBTNdl3Us98kBmS/view)

## Modelo 3D

<script setup>
import previewImg from './img/ESP01-Driver.jpg'
</script>

<ClientOnly>
  <Viewer3D modelUrl="models/ESP01-Driver.glb" :previewImg="previewImg" />
</ClientOnly>
