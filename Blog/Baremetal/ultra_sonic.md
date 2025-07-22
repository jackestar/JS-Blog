---
title: HC-SR04
description: Proyecto Baremetal para manejar un modulo HC-SR04
lastUpdated: true
outline: deep
---

# Modulo HC-SR04

<Badge type="danger" text="incompleto" />

Modulo sensor de distancia de ultra-sonido HC-SR04. Este modulo en particular funciona emitiendo 8 pulsos a 40khz, al recibir un pulso de 10us de entrada (trigger), colocando la salida (echo) en nivel alto, cuando los pulsos llegan al modulo la salida (echo) pasa a nivel bajo. el tiempo que dura la salida (echo) en alto determina el tiempo que tarda el sonido en salir del modulo y volver al mismo. Al ser la velocidad del sonido constante (para una temperatura constantes y un medio homogéneo).

Este proyecto consistirá en:

1. Hacer una librería para el modulo (para distancia).

2. Obtener su salida en comunicación serial.

## Pinout

![HC-SR04](img/hc-sr04.svg)

Gráfica en el tiempo

