---
title: Program AVR in ArchLinux
description: how to compile and upload to a Arduino UNO board

lastUpdated: true
outline: deep
---

# Programación de AVR en ArchLinux

> [!NOTE]
> las herramientas señaladas en *cursiva* son paquetes disponibles en ArchLinux

## Instalación

Para programar una placa de desarrollo Arduino con procesador AVR (UNO R3, Nano) se deben realizar los siguientes pasos

- Instalar el Toolchan *avr-gcc*, el cual contiene el compilador para la familia de microcontroladores AVR.

- Instalar un programador, en este caso [*avrdude*](https://avrdudes.github.io/avrdude/) el cual permitirá cargar y comprobar el firmware en el microcontrolador. 

- Disponer de un editor de código (opcional), proporciona una interfaz gráfica cómoda para editar el código

<div class='console'>

```bash
pacman -S avr-gcc avrdude
```

</div>

## Permisos UDEV

para permitir al usuario manejar interfaces seriales a través de USB es necesario establecer reglas para udev (gestor de dispositivos del kernel Linux). Para permitir a usuario acceder globalmente a USB seriales se crea o modifica el archivo

`/etc/udev/rules.d/01-ttyusb.rules`
```
SUBSYSTEMS=="usb-serial", TAG+="uaccess"
```

también se puede especificar el acceso solo a dispositivos especifico [udev - ArchWiki](https://wiki.archlinux.org/title/Udev#About_udev_rules)

## Para programar con C/C++

- Instalar las librerías [*avr-libc*](https://avrdudes.github.io/avr-libc/), contiene los headers necesarios para compilar en C

<div class='console'>

```bash
pacman -S avr-libc
```

</div>

### Compilación

El compilador avr-gcc permite compilar en C, C++ y Ada. Por defecto compila, ensambla y vincula

<div class='console'>

```bash
avr-gcc ./main.c -o ./main.elf
```

</div>

al compilador es necesario pasar ciertos macro, el mas importante es el de arquitectura de conjunto de instrucciones (ISA) o dispositivo, este puede ser pasado a través del argumento `-mmcu` Ej. (`-mmcu=atmega328p` o `-mmcu=avr5`), o declarando el macro correspondiente en el archivo con el codigo del programa.

```c
// Tipo de dispositivo
#define __AVR_ATmega328P__

// CPU Freq
#define F_CPU 1000000UL // 1Mhz

```

También se le puede pasar la frecuencia a la que trabajara el dispositivo al arrancar (ciertos dispositivos permiten cambiar dicha frecuencia durante la ejecución) con el argumento `-DF_CPU` Ej. (`-DF_CPU=16000000UL` 16Mhz) o con el macro `F_CPU`

### Convertir en iHEX (Opcional)

Para programar el microcontrolador es necesario transformarlo en formato `intel HEX`, con el comando.

<div class='console'>

```bash
avr-objcopy -j .text -j .data -O ihex ./main.elf ./main.hex
```

</div>

Donde el argumento `-j .text -j .data` especifica que la sección `.text` (contenedora del codigo ejecutable) y `.data` (que contiene las variables globales y datos que deben ser cargados al inicializar) y `-O ihex` especifica el formato de salida intel HEX.

### Resultado en ASM

Para obtener el resultado del codigo compilado en assembler se usa el comando `avr-objdump`, donde `-m` establece la arquitectura del codigo compilado y `-D` muestra las nemotecnias del codigo assembler en base a la arquitectura

<div class='console'>

```bash
avr-objdump -D -mavr5 ./main.hex
```
```bash
avr-objdump -D -mavr5 ./main.elf
```
</div>

### Programar

para programar un microcontrolador AVR se usa la herramienta `avrdude`. Donde se debe especificar que microcontrolador esta conectado al programador con el argumento `-p` (Ej. ATmega328P `-p m328p`). El programador que se esta usando con el argumento `-c` (Ej. para un Arduino UNO R3 `-c arduino`), el puerto al que esta conectado con el argumento `-P`. Y especificar que se va hacer una operación en memoria con el argumento `-U` señalando que memoria se va a programar (`flash`), el tipo de operación (escritura `w`), el nombre del archivo a programar (`main.hex`) y opcionalmente su formato (Ej `i` para intel HEX, `e` para ELF)

<div class='console'>

<small><i>ejemplo para un Arduino UNO</i></small>
```bash
avrdude -p m328p -c arduino -P /dev/ttyUSB0 -U flash:w:main.hex
```

</div>

avrdude permite recibir archivos ELF como entrada, pudiendo distinguir entre iHEX y ELF sin especificar el formato, lo que permite omitir el paso de convertir en iHEX

<div class='console'>

<small><i>ejemplo para un Arduino UNO</i></small>
```bash
avrdude -p m328p -c arduino -P /dev/ttyUSB0 -U flash:w:main.elf:e
```

</div>

Para los argumentos de cada microcontrolador, programador y demás configuraciones consulte la documentación de [avrdude](https://github.com/avrdudes/avrdude/)

> [!note]
> También se suele especificar el baudrate, esta suele ser provista por el programador, de ser necesario se puede especificar con el argumento `-b`

> [!warning]
> Habitualmente se encuentra el uso de el argumento `-F` el cual ignora la firma del microcontrolador, lo cual puede ser util bajo ciertos casos (errores de dispositivo, memoria corrupta o sin formato etc.). Y también es habitual la opción `-V` que no comprueba si los datos fueron escritos correctamente. **No se recomienda su uso si no es necesario.**

## Para programar con RUST

Para compilar en avr con rust en necesario usar la version `nightly` del compilador de rust asi como su componente `rust-src`. Haciendo uso de la herramienta `rustup`

<div class='console'>

```bash
rustup toolchain install nightly
```

```bash
rustup component add rust-src --toolchain nightly
```

- Instalar las librerías [*avr-libc*](https://avrdudes.github.io/avr-libc/)

```bash
pacman -S avr-libc
```

</div>

### con Hardware Abstraction Layer (HAL)

La manera mas sencilla de programar un embebido en Rust es con algún **HAL** (con el objetivo de no trabajar con memoria directamente con rust). Una de las mas usadas es `avr-hal`

<div class='console'>

#### Uso de Plantilla (Opcional)

`cargo-generate` permite utilizar plantillas para proyectos en rust

```bash
cargo install cargo-generate
```

Para crear nuevo proyecto con la plantilla `avr-hal-template`

```bash
cargo generate --git https://github.com/Rahix/avr-hal-template.git
```
> [!NOTE]
> Esta plantilla por defecto proporciona dos perfiles de compilación `dev` (predeterminado) y `release`, ambos con información de depuración. Para obtener una compilación optimizada y sin información para depuración puede crear o modificar el `profile`
> ```toml
>[profile.release]
>panic = "abort"
>codegen-units = 1
>debug = false
>lto = true
>opt-level = "s"
>```

##### Solo compilar

```bash
cargo build --profile=release
```

##### Compilar y cargar
```bash
cargo run --profile=release
```

#### Programación

```bash
cargo install ravedude
```

</div>


## Para Programar sketch Arduino con Arduino CLI

<div class='console'>

se instala el paquete *arduino-cli*

```bash
pacman -S arduino-cli
```

Se inicializa la configuración para `arduino-cli`

```bash
arduino-cli config init
```

Crea un Sketch, reemplazando `NombreDelSketch` con el nombre del proyecto

```bash
arduino-cli sketch new NombreDelSketch
```
### Configurar Placa de desarrollo

Actualiza la lista plataforma y librerías disponibles

```bash
arduino-cli core update-index
```

Conecta el equipo arduino al PC y usa el siguiente comando para reconocer el FQBN (Fully Qualified Board Name) y el ID de la plataforma.

```bash
arduino-cli board list
```

De obtener un resultado como el siguiente, o de no tener el dispositivo se puede buscar manualmente

```console
arduino-cli board list
Port         Protocol Type              Board Name FQBN Core
/dev/ttyUSB0 serial   Serial Port (USB) Unknown
```

```bash
arduino-cli board search nombreABuscar
```

> [!NOTE]
> dicho comando busca entre los `Board Name`, `Platform ID` y `FQBN Core` de buscar mas de una palabra debe estar entre comillas
> ```bash arduino-cli board search "UNO R4" ``` 
> no se suele identificar la plataforma por el microcontrolador ni arquitectura. Se recomienda solo usar palabras claves en la búsqueda.

Ejemplo de resultado

```console
arduino-cli board search uno
Board Name            FQBN                        Platform ID
Arduino UNO R4 Minima                             arduino:renesas_uno
Arduino UNO R4 WiFi                               arduino:renesas_uno
Arduino UNO WiFi Rev2                             arduino:megaavr
Arduino Uno           arduino:avr:uno             arduino:avr
Arduino Uno Mini      arduino:avr:unomini         arduino:avr
Arduino Uno WiFi      arduino:avr:unowifi         arduino:avr
ESP32vn IoT Uno       esp32:esp32:esp32vn-iot-uno esp32:esp32
WEMOS D1 R32          esp32:esp32:d1_uno32        esp32:esp32
```

En base al ID de la plataforma se instala con el siguiente comando, reemplazando `IDPlataforma`

```bash
arduino-cli core install IDPlataforma
```
en el caso del Arduino UNO como ejemplo

```bash
arduino-cli core install arduino:avr
```

### Compilación

Para compilar un sketch se usa la siguiente nomenclatura, reemplazando `FQBN` y `NombreDelSketch`

```bash
arduino-cli compile --fqbn FQBN NombreDelSketch
```
> [!NOTE]
> Adicionalmente su puede agregar el argumento `--build-path ./build` para definir el directorio de trabajo del compilador. **para la version 1.0.3 de Arduino CLI no es posible programar desde un `--build-path` definido por el usuario**

> [!NOTE]
> De necesitar solo el resultado de la compilación se puede usar el argumento `-e`, o el argumento `--output-dir ./build` para exportar los resultados de la compilación en un directorio especifico

para el Arduino UNO como ejemplo

```bash
arduino-cli compile --build-path ./build --fqbn arduino:avr:uno Blink
```

### Programar

Siguiendo la siguiente nomenclatura reemplazando `Puerto`, `FQBN` y `NombreDelSketch`

```bash
arduino-cli upload -p Puerto --fqbn FQBN NombreDelSketch
```


Ejemplo

```bash
arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:uno Blink
```


</div>

# Referencias

[Arduino WikiArch](https://wiki.archlinux.org/title/Arduino)

[AVR - WikiArch](https://wiki.archlinux.org/title/AVR)

[avrdude - Github](https://github.com/avrdudes/avrdude/)

[avr-libc - Github](https://github.com/avrdudes/avr-libc)

[Arduino CLI](https://arduino.github.io/arduino-cli/1.0/)

[avr-hal](https://github.com/Rahix/avr-hal/)

[avr-hal-template](https://github.com/Rahix/avr-hal-template)