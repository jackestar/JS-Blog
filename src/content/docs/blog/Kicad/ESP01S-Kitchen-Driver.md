---
title: ESP01S Kitchen Driver
description: Optoaislador para driver de cocina con ESP01S

lastUpdated: true
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Objetivo inicial

Diseñar un driver para un relé de estado sólido (SSR) destinado a una cocina doméstica, junto con una interfaz web completamente local, utilizando un módulo ESP01S y el SDK oficial de Espressif.

[Repo](https://github.com/jackestar/ESP01S-Kitchen/)

## Primer prototipo

Con los objetivos definidos y parte de los materiales preseleccionados, se realizó el esquemático en KiCad. El módulo se monta a través de un pin header `2x04_P2.54`, donde los pines 1 y 8 son VCC y GND respectivamente; los pines Reset y Enable no se conectan (el módulo no requiere circuitería externa para estos pines). Aquí es donde la documentación se vuelve difusa.

El módulo cuenta con los pines GPIO0 al GPIO3. Dependiendo de la configuración del SDK (y del SDK utilizado), estos pueden diferir en comportamiento durante el arranque (boot); principalmente importa saber si una resistencia pull-up/pull-down puede afectar el arranque del microcontrolador y si estos pines tienen algún estado por defecto.

| GPIO   | Estado inicial | Estado para arranque |
| ---    | ---            | ---                  |
| 0      | High (Blink)   | Pull-Up              |
| 1 (TX) | High           | TX                   |
| 2      | N/A            | Pull-Up              |
| 3 (RX) | High           | RX                   |

Estos valores se basan en el comportamiento del RTOS SDK de Espressif. Durante el arranque, RX/TX transmiten y, a pesar de estar especificado en el datasheet, el SDK no puede desactivar de forma estable la UART durante el boot ([Issue 1082](https://github.com/espressif/ESP8266_RTOS_SDK/issues/1082), uno de varios junto con el [PR 1070](https://github.com/espressif/ESP8266_RTOS_SDK/pull/1070), que falla igualmente en algunos casos), y el GPIO0 parpadea durante el arranque ([Issue 493 - gh](https://github.com/espressif/ESP8266_RTOS_SDK/issues/494)) que es una caracteristica del hardware.

Al no poder utilizar de manera confiable GPIO1 y GPIO3 (TX/RX), solo quedan disponibles GPIO0 y GPIO2, lo que limita el diseño a un pulsador y el driver. Se utiliza un LED únicamente para indicar cuándo la salida está encendida (lo cual con PWM puede generar confusión).

Para el esquemático, la alimentación (3 a 3.6 V) se realiza a través de pin headers con un diodo de protección a la entrada, así como el indicador y la salida para el driver del relé de estado sólido. Aunque el SSR tiene una entrada digital optoaislada integrada, se mantiene una en el esquematico para garantizar compatibilidad con otros SSR y ademas garantizar la proteccion de los dispositivos. Para este primer prototipo se utiliza una PCB de una sola cara, ya que su fabricación es casera (cloruro férrico e impresora láser de tóner).

## Software

Por el lado del software, se utilizó el SDK y el toolchain especificados por Espressif. El módulo se conecta a una red Wi-Fi (las credenciales pueden especificarse limpiamente en un archivo `credentials.h` opcional), permite encender y apagar el driver ya sea mediante el pulsador físico o desde la interfaz, añadir un temporizador y regular la potencia con un slider circular. La potencia se regula mediante PWM con un periodo predeterminado de 1 minuto (ajustable) y con un tiempo inicial (2 min, ajustable) para que el elemento alcance la temperatura inicial más rápido; al ser un elemento calefactor, el periodo puede ser alto, lo que además evita la degradación y el ruido causados por conmutaciones más rápidas.

### Esquemático

[Esquemático](https://drive.google.com/file/d/1OSxR-wDeujzJ0baBaZBTNdl3Us98kBmS/view)

### Modelo 3D

<model-player
  src="/models/ESP01-Driver.glb"
  poster="/models/ESP01-Driver.jpg"
  alt="ESP01S Kitchen Driver">
</model-player>

### Repo

[Github](https://github.com/jackestar/ESP01S-Kitchen/tree/Archive-ESP8266-RTOS-SDK)

## Segundo prototipo

Durante el desarrollo del primer prototipo quedó en evidencia el primer error: la selección de tecnología. Se eligió el ESP01S por ser un módulo extremadamente barato y, al ser una plataforma que lleva años en el mercado, se esperaría que estuviera madura. En la realidad, el soporte del ESP8266EX fue abandonado por el fabricante tanto en el SDK como en el toolchain (GCC 8.4 distribuido en binario sin mantenimiento ni soporte de compilación actualizado). A esto se suma la limitada cantidad de GPIO utilizables del módulo.

Durante el desarrollo y la búsqueda de alternativas se encontró un toolchain open source, [esp-quick-toolchain](https://github.com/earlephilhower/esp-quick-toolchain), y se comprobó que el único SDK relativamente completo y con soporte activo es [Arduino core for ESP8266](https://github.com/esp8266/arduino). Una de las características de este entorno es que permite desactivar la UART y hacer uso de dichos GPIO; además, el soporte de OTA es mucho más estable y está mejor documentado (en la versión anterior se intentó implementar OTA sin éxito).

La única desventaja es la plataforma Arduino en sí. Aunque esta abstrae cierto nivel de complejidad y da soporte a una cantidad enorme de módulos y librerías, a nivel de rendimiento no siempre es óptima. Usualmente esto también implica limitaciones en el soporte de características del microcontrolador, pero dado que el SDK oficial fue completamente abandonado, en este caso ocurre lo contrario.

Por ello, se comenzó la migración a Arduino. Contar con más librerías y documentación me permitió refactorizar por completo el proyecto; en primer lugar, mediante el uso de LittleFS para almacenar distintos archivos en el servidor web. Para ello se tiene una página de OTA (`update.html`) separada de la principal (`index.html`), además de un favicon y un manifiesto (aunque no pueda funcionar como PWA por no tener HTTPS, es buena práctica incluirlo). Ahora, a diferencia de la versión original que era un solo archivo HTML, se estructuró la página inicial de forma más tradicional para facilitar el desarrollo, aunque no hace falta servirla directamente sin empaquetar desde el microcontrolador.

Para esto, se separaron los assets del índice en una carpeta independiente y, usando [Terser](https://terser.org/) y [esbuild](https://esbuild.github.io/), se generó un `index.html.gz`. Esto deja aparte `update.html` y `manifest.json`, que se sirven tal cual al no ser archivos pesados. El tamaño es una consideración importante no solo por el espacio de la memoria flash (~1 MB), sino por la velocidad: es más fácil y estable realizar 3 requests que 5 y, cuanto menos pesen, menor será el tiempo que el microcontrolador consume sirviendo archivos.

El particionado debe considerar el espacio para OTA y, a su vez, OTA debe ajustarse al particionado. Para simplificar el proceso, las actualizaciones se realizan con dos archivos: el binario del *sketch* y el binario del servidor web (LittleFS, que contiene la interfaz web). Se reserva el espacio necesario para poder realizar dichas actualizaciones y se solicita una contraseña definida en `credentials.h`.

En la PCB, al poder hacer uso de los GPIO asignados a la UART, ahora se cuenta con un indicador dedicado que muestra si el driver está activo (esté ejecutando PWM o no), y se reduce el periodo predeterminado a 30 segundos para que la temperatura se mantenga más uniforme.

<model-player
  src="/models/ESP01-Driver-v2.glb"
  poster="/models/ESP01-Driver-v2.png"
  alt="ESP01S Kitchen Driver v2">
</model-player>

### Esquemático

[Esquemático](https://drive.google.com/file/d/1Yn6qj2adrK7T1prhVlPeuc-Q2AzgM7RE/view)

