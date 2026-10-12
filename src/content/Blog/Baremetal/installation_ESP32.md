---
title: Program ESP in ArchLinux
description: how to compile and upload to a ESP32 board

lastUpdated: true
outline: deep
---

# Programación de ESP32 en ArchLinux

## Instalación

::: tip
Para una guía mas completa actualizada y para otras plataformas consulte

[ESpressif Guide - Toolchain (per board)](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#introduction)

[Espressif Old ReadTheDocs Guide](https://espressif-docs.readthedocs-hosted.com/projects/esp-idf/en/latest/get-started/index.html)
:::

La instalación consiste en la Toolchain (compilador), Build tools (CMake and Ninja) y ESP-IDF (API)

Opcionalmente se puede instalar el IDE para VScode o Eclipse

### Pre-requisitos

<div class='console'>

```bash
sudo pacman -S --needed gcc git make flex bison gperf python cmake ninja ccache dfu-util libusb python-pip
```

</div>

### git clone

::: tip
Selecciona un directorio de trabajo para el repositorio
:::

```bash
git clone --recursive https://github.com/espressif/esp-idf.git --depth 1
```

<div class='console'>

::: tip
Se establece `--depth 1` para solo obtener la ultima version de la API (>1.7GB)
:::

</div>

### Instalación IDF

Se ingresa en la carpeta del repositorio

<div class='console'>

```bash
cd ./esp-idf
```

```

usage: ./install.sh [-h] [targets-to-install] [--enable-*] [--disable-*]

optional arguments:
  targets-to-install  'all', a single target (e.g. 'esp32s2'), or a comma-separated list of targets (e.g. 'esp32,esp32c3,esp32h2')
  --enable-*          a specific feature to enable (e.g. '--enable-ci' will enable feature ci)
  --disable-*         a specific feature to disable (e.g. '--disable-pytest' will disable feature pytest)
                      supported features: core, test-specific, ci, docs
  -h, --help          show this help message and exit

For more information, please see https://docs.espressif.com/projects/esp-idf/en/latest/api-guides/tools/idf-tools.html#install-scripts

```

Para instalar para un esp32 (wroom32, devkitV1, etc) se usa el target `esp32`, se puede también instalar todas se utiliza el target `all`

```bash
./install.sh esp32
```
</div>

## Establecer Entorno

<div class='console'>

```bash
. ./export.sh  
```

</div>