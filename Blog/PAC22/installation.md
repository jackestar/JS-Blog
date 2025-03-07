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
pacman -S wine wine-gecko wine-mono winetricks lib32-gnutls cups lib32-libcups cups-pdf
```

</div>

`wine` es el núcleo del programa, gecko/mono proveen compatibilidad con Internet Explorer y .NET, `winetricks` permite instalar fácilmente librerías y programas, `lib32-gnutls` es una implementación para SSL y TLS, la cual se requiera la version de 32bits.

Para poder exportar gráficos asi como el correcto funcionamiento en PAC display se recomienda la instalación y configuración del servicio de impresión CUPS, con `cups lib32-libcups`, asi como `cups-pdf` para exportar a pdf (este paquete es necesario para algunas impresoras)

::: details Configuración de CUPS

una vez instalado se debe arrancar el servicio

<div class='console'>

```bash
systemctl start cups
```
</div>

y para que arranque automáticamente al inicio habilitarlo (Recomendado/Opcional)
<div class='console'>

```bash
systemctl enable cups
```

</div>
una vez iniciado se configura una impresora virtual desde la pagina del servicio (Login con usuario root por defecto).

http://localhost:631/admin

```
[Añadir Impresora] >
Impresoras locales: (✓) CUPS-PDF (Virtual PDF Printer) [Siguiente] >
Nombre/Descripción/Ubicación Opcional [Siguiente] >
Marca: (Generic) [Siguiente] >
Modelo (Generic CUPS-PDF Printer (w/ options)) [Añadir Impresora]
```

y reiniciamos wine

<div class='console'>

```bash
wineboot
```

</div>

para mas información consulte [CUPS - ArchWiki](https://wiki.archlinux.org/title/CUPS)

:::

para poder ejecutar correctamente la suite de PAC 22 se instalaran las siguientes librerías con winetricks, Visual C++ 6

<div class='console'>

```bash
winetricks mfc42 comctl32 dxvk msvcrt40
```

De tener algun problema reinicia el wine con el comando `wineboot`

```bash
wineboot
```

</div>

## Ejecución/Compatibilidad <Badge type="info" text="Wine 10.2" /><Badge type="info" text="Wayland" />

### PAC SIM

#### 9.3

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

### PAC Control

#### 9.4
> [!WARNING]
> Parece funcionar con algunos bugs gráficos

#### R10.5003
> [!WARNING]
> Parece funcionar con algunos bugs gráficos

### PAC Display Configurator

#### 9.4
> [!WARNING]
> Parece funcionar con algunos bugs gráficos

#### R10.5003
> [!WARNING]
> Parece funcionar con algunos bugs gráficos

### PAC Display Runtime

#### 9.4
> [!CAUTION]
> No funciona del todo

#### R10.5003
> [!WARNING]
> Parece funcionar con algunos bugs gráficos

# Referencia

[Guia en Github](https://github.com/enokson/opto22)