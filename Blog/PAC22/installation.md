---
title: Instalación PAC22 en ArchLinux
description: Instalación basada en wine para PAC Project y PAC SIM

lastUpdated: true
outline: deep
---

# Instalación en ArchLinux

Esta guía busca cubrir la instalación para PAC Project 9.4 y 9.3 para sistemas operativos con kernel Linux (ArchLinux), al ser usado en sistemas legacy sigue siendo usado en sistemas antiguos.

## Requisitos

la suite de PAC 22 solo esta disponible en sistemas MS Windows, por lo que para ejecutar software windows en SO Linux es necesario el uso de una **Capa de Compatibilidad** para ejecutar estos programas. En este caso usaremos *wine*

> [!NOTE]
> WINE "Wine Is Not an Emulator"

Dependiendo de la distribución de Linux sera necesario instalar los siguientes paquetes: *wine* *wine gecko*, *wine mono* y *winetricks*.

### Instalación ArchLinux

para instalar wine es necesario habilitar los repositorios *multilib*, esto se hace descomentando del archivo `/etc/pacman.conf` las siguientes lineas

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

y actualizando los repositorios y el sistema
<div class='console'>

```
pacman -Syu
```

</div>
<div class='console'>

para mas información consulte [Official repositories](https://wiki.archlinux.org/title/Official_repositories#multilib)

```bash
pacman -S wine wine-gecko wine-mono winetricks lib32-gnutls
```

</div>

`wine` es el núcleo del programa, gecko/mono proveen compatibilidad con Internet Explorer y .NET, `winetricks` permite instalar fácilmente librerías y programas, `lib32-gnutls` es una implementación para SSL y TLS, la cual se requiera la version de 32bits.

para poder ejecutar correctamente la suite de PAC 22 se instalaran las siguientes librerías con winetricks, Visual C++ 6

<div class='console'>

```bash
winetricks mfc42 comctl32 dxvk msvcrt40
```

Para el usar cualquier tipo de impresión "print..." asegúrate de tener `cups` para imprimir a PDF tener instalado `cups-pdf`, asi como tener configurada la impresora (o impresión en PDF), de tener algun problema reinicia el wine con el comando `wineboot`

```bash
wineboot
```

</div>

## PAC SIM

### 9.3

para ejecutar PAC SIM, de recomienda hacerlo desde consola, con el comando `wine` y la ruta al ejecutable. Ej.

<div class='console'>

```bash
wine "$HOME/.wine/drive_c/Program Files (x86)/Opto22/PAC Project 9.3/PAC Sim/SNAPPACSim.exe"
```

</div>

dependiendo de la configuración por defecto del sistema *wine* se ejecuta mostrando información de depuración, para ocultar estos mensajes su puede establecer la variable de entorno `WINEDEBUG=-all`. Ej.

<div class='console'>

```bash
WINEDEBUG=-all wine "$HOME/.wine/drive_c/Program Files (x86)/Opto22/PAC Project 9.3/PAC Sim/SNAPPACSim.exe"
```

</div>

## PAC Control

### 9.4
<!-- > [!NOTE]
> Se ejecuta sin problemas, solo con algunos errores gráficos en el *toolbar* y el *listview* -->

## PAC Display

### 9.4
> [!CAUTION]
> No funciona del todo

### R10.5a
> [!WARNING]
> Parece funcionar con algunos bugs gráficos

# Referencia

[Guia en Github](https://github.com/enokson/opto22)