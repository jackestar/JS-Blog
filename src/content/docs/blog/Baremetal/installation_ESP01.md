---
title: Program ESP in ArchLinux
description: how to compile and upload to a ESP8266 board

lastUpdated: true
outline: deep
---

<Badge type="danger" text="incompleto" />

# Programación de ESP01 Utilizando ESP32 (DevkitV1 30 pins) como puente

Las placas ESP01 y ESP01S (también las ESP02 y ESP05) poseen un microcontrolador ESP8266 y su programación se realiza por sus puertos USART, para esto se puede usar programadores (que hacen de puentes entre USART y USB) o se puede utilizar el programador ya disponible en placas como el ESP32 DevKitV1

## Esquemático

|PIN|  ESP01  |  ESP32  |
|---|---------|---------|
|ENB (EN)| VCC    | GND |

|  ESP01  |  ESP32  |
|---------|---------|
| RX      | RX0     |
| TX      | TX0     |
| RST     | NC(VCC) |
| GPIO0 (IO0) | GND |


## Por que no usar placas Arduino

Los Arduino Uno y Nano utilizan lógica 5v la cual inutilizaría el ESP01 si se utiliza directamente, la opción recomendada seria utilizar un convertidor integrado de lógica 5v a 3.3v.

::: warning
Muchos esquemáticos mal utilizan divisores de tension (alguno no en todos los puertos), esto debe considerar que la corriente que consumen los puertos altera el divisor de tension
:::

::: warning
Algunos clones de Arduino **NO TIENEN ALIMENTACIÓN 3.3V REAL**, si no que esta al aire o cableada a VCC (5V)
:::

##