---
title: Program ESP in ArchLinux
description: how to compile and upload to a ESP8266 board

lastUpdated: true
outline: deep
---

<Badge type="danger" text="incompleto" />

# Programación de ESP8266 en ArchLinux

La forma rápida es utilizar el paquete AUR `esp8266-rtos-sdk` la unica desventaja es que utiliza la version estable (2021), la version git actual corrige las vulnerabilidades [CVE-2023-52160](https://github.com/advisories/GHSA-hj6q-jrf5-2pm3) [CVE-2020-26142](https://github.com/advisories/GHSA-f2g3-x645-4qw2) entre otros errores

## Instalación (Manual git)

::: tip

[ESpressif Guide - RTOS SDK)](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/get-started/index.html)

[Espressif ("May be Deprecated") NonOS SDK](https://github.com/espressif/ESP8266_NONOS_SDK/tree/master)
:::

La instalación consiste en la Toolchain (compilador), Build tools (CMake and Ninja) y SDK (RTOS SKD)


### Pre-requisitos

<div class='console'>

```bash
sudo pacman -S --needed gcc git make ncurses flex bison gperf python2-pyserial python python-click python-cryptography python-future python-pyelftools python-pyparsing python-pyserial python-virtualenv
```

</div>

### Variables de entorno

Para usar como variable de entorno consulte [Environment variables Variables - ArchLinux](https://wiki.archlinux.org/title/Environment_variables) y [ESP8266 RTOS SDK - Toolchain](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/get-started/linux-setup.html#toolchain-setup), según sea su caso.

### Permisos /dev/ttyUSB*

Dependiendo de la configuración UDEV el usuario debe pertenecer al grupo `dialout`

<div class='console'>

```bash
sudo usermod -a -G dialout $USER
```

O también cambiar directamente los permisos del tty

```bash
sudo chmod -R 777 /dev/ttyUSB0
```

</div>

O en su defecto cambiar los permisos UDEV

[Permisos UDEV](./installation_AVR#permisos-udev)

## API/Librerías (utilizando python3)

::: tip
Selecciona un directorio de trabajo para el repositorio
:::

::: tip
Si no se usa el argumento `--depth 1` puede saltarse el paso [Version FIX](#version_fix). Se establece `--depth 1` para solo obtener la ultima version de la API (~190MB).
:::

<div class='console'>

```bash
git clone --recursive https://github.com/espressif/ESP8266_RTOS_SDK.git --depth 1
```

</div>

Se ingresa en la carpeta del repositorio `cd ESP8266_RTOS_SDK`

### ncurses patch

Para corregir el siguiente error, descrito en [menuconfig script fails for ncurses in Arch-Linux (GIT8266O-855) #1278](https://github.com/espressif/ESP8266_RTOS_SDK/issues/1278)

```
 *** Unable to find the ncurses libraries or the
 *** required header files.
 *** 'make menuconfig' requires the ncurses libraries.
 *** 
 *** Install ncurses (ncurses-devel) and try again.
 *** 
```

Se aplica el parche para el paquete AUR `esp8266-rtos-sdk`

::: code-group

```bash [wget]
wget https://aur.archlinux.org/cgit/aur.git/plain/esp8266-rtos-sdk-aur-ncurses-fix.patch?h=esp8266-rtos-sdk -O esp8266-rtos-sdk-aur-ncurses-fix.patch
```

:::

``` bash
patch --forward --strip=1 --input=./esp8266-rtos-sdk-aur-ncurses-fix.patch
```

### Version FIX

Ciertos procesos en la instalación y configuración requieren el `tag` de la version la forma mas simple de evadir este problema.

```
fatal: No names found, cannot describe anything.
Traceback (most recent call last):
  File "~/esp/ESP8266_RTOS_SDK/tools/idf_tools.py", line 1250, in <module>
    main(sys.argv[1:])
    ~~~~^^^^^^^^^^^^^^
  File "~/esp/ESP8266_RTOS_SDK/tools/idf_tools.py", line 1246, in main
    action_func(args)
    ~~~~~~~~~~~^^^^^^
  File "~/esp/ESP8266_RTOS_SDK/tools/idf_tools.py", line 1053, in action_install_python_env
    idf_python_env_path, _, virtualenv_python = get_python_env_path()
                                                ~~~~~~~~~~~~~~~~~~~^^
  File "~/esp/ESP8266_RTOS_SDK/tools/idf_tools.py", line 798, in get_python_env_path
    idf_version_str = subprocess.check_output(['git', '-C', global_idf_path, 'describe', '--tags'], cwd=global_idf_path, env=os.environ).decode()
                      ~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.13/subprocess.py", line 472, in check_output
    return run(*popenargs, stdout=PIPE, timeout=timeout, check=True,
           ~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
               **kwargs).stdout
               ^^^^^^^^^
  File "/usr/lib/python3.13/subprocess.py", line 577, in run
    raise CalledProcessError(retcode, process.args,
                             output=stdout, stderr=stderr)
subprocess.CalledProcessError: Command '['git', '-C', '~/esp/ESP8266_RTOS_SDK', 'describe', '--tags']' returned non-zero exit status 128.
```

Esto ocurre al por que se busca los `tags` del repositorio los cuales no están contenidos en el ultimo commit (--depth 1)

Se puede crear `version.txt` con el ultimo tag con

<div class='console'>

```bash
echo v3.5 > version.txt
```

</div>

::: tip

También se pueden extraer los tags (nótese que se descargaran los tags de todos los repositorios ~+47MB)

<div class='console'>

```bash
git fetch --tags 
```

</div>


:::

### Requisitos

Se crea un entorno virtual para poder trabajar con pip y se instalan los requisitos.

<div class='console'>

```bash
py -m venv .  
```

</div>

## Instalación Automática

<div class='console'>

```bash
./install.sh 
```

</div>

De fallar se puede realizar manualmente, instalando el toolchain, estableciendo un entorno para python, instalando `requirements.txt` (siguiendo la guía official).

### Toolchain (Manual)

Se descarga el toolchain 

[Linux 64bits (gcc8_4_0-esp-2020r3)](https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-amd64.tar.gz)

<div class='console'>

::: code-group

```bash [wget]
wget -P ~/.espressif/dist https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-amd64.tar.gz
```

```bash [curl]
curl -o ~/.espressif/dist https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-amd64.tar.gz
```

:::

Se descomprime

```bash
tar -xvf ~/.espressif/dist/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-amd64.tar.gz -C ~/.espressif/tools
```
</div>

Por compatibilidad se puede trabajar en el directorio `~/esp`, se elije trabajar en el directorio `~/.espressif` (para tener todas las toolchain bajo un mismo directorio)


### Errores en Submódulos

Algunos submódulos pertenecen a repositorios que están migrados entre otros errores, la recomendación es revisar [issues](https://github.com/espressif/ESP8266_RTOS_SDK/issues) y [pull request](https://github.com/espressif/ESP8266_RTOS_SDK/pulls)

::: info
A términos del commit [d412ac6](https://github.com/espressif/ESP8266_RTOS_SDK/commit/d412ac601befc4dd024d2d2adcfaa319c7463e36) aplicar el pull request [#1306](https://github.com/espressif/ESP8266_RTOS_SDK/pull/1306) y actualizar los submódulos corrige los errores de compilación relacionado a módulos faltantes

```bash
git fetch origin pull/1306/head:fix  
git checkout fix
git submodule update --init --recursive --depth 1 
```
:::

## Plantilla

<!-- Se utiliza `.ESP8266_RTOS_SDK/examples/get-started/hello_world` como plantilla -->

### Inicializar entorno

se requiere inicializar el entorno de trabajo con

<div class='console'>

```bash
[directorio del proyecto] [directorio de ESP8266_RTOS_SD]/export.sh
```

Ejemplo

```bash
. $IDF_PATH/export.sh
```

</div>

## Github Action

[ESP8266 RTOS SDK Build - GitHub Action](https://github.com/marketplace/actions/esp8266-rtos-sdk-build)
