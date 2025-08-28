---
title: Baremetal en microcontrollers
description: Comparación entre Assambler C++ y rust. En ATmega328P (Arduino Uno/Nano) y ESP32 Devkit 1

lastUpdated: true
outline: deep
sidebar: true
---

# Desarrollo Baremetal en microcontroladores

Un microcontrolador, es un circuito electrónico capaz de realizar una tarea especifica programable. Limitado por capacidades fijas de hardware. Los lenguajes de programación modernos permiten realizar la misma tarea de diferentes formas, con distintos paradigmas de programación. El código compilado resultante por otro lado no es siempre el mismo, el codigo generado bajo una librería no es el mismo con otra. En sistemas con capacidad en hardware tan limitada es fundamental

## Plataforma Arduino

Arduino es una plataforma de software y hardware open-source. Que proporciona una forma simple para el desarrollo en el area de la electronica. Provee un lenguaje de programación basado en **C++** y el framework [**wiring**](https://wiring.org.co/), generando una abstracción facilitando la programación del hardware de la plataforma. Dicha abstracción por otro lado a bajo nivel provee a través de funciones y métodos código complejo para soluciones sencillas.

[Instalación AVR ArchLinux](./installation_AVR)

## Plataforma Espressif

<Badge type="danger" text="incompleto" />

[Instalación ESP32 ArchLinux](./installation_ESP32)

[Instalación ESP8266 ArchLinux](./installation_ESP8266)