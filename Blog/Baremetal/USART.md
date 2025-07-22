---
title: USART
description: Proyecto Baremetal para manejar USART AVR
lastUpdated: true
outline: deep
---

## Comunicación Serial (USART)

<Badge type="danger" text="incompleto" />

Se busca mostrar los datos en una consola, para esto se utilizara el USART (Universal Synchronous/Asynchronous Receiver/Transmitter\*) que es un dispositivo de comunicación embebido en el microcontrolador que permite realizar comunicaciones sincrónicas o asincronías. Para comunicarse por protocolo USB (y poder ver los datos en una consola) se requiere un intermediario entre USART y USB (diferentes protocolos), para esto las placas tipo Arduino UNO incluyen un ATmega16U2, ATmega8U2, CH340G o CH341G (según la version o si es un clon) o parecido que hace de intermediario.

> [!NOTE]
> Los puertos RS-232 presentes por defecto en algunos computadores antiguos (o en algunos de uso industrial) pueden comunicarse por USART lo que evita el uso de un intermediario, pero dicho puerto no es tan común hoy en dia.

### Modo UART (Universal Asynchronous Receiver/Transmitter)

En modo Asíncrono para USART (UART), en estado inactivo `TX` permanece en 1 lógico inicia con un cambio de bit seguido de la transmisión de la data, los (el) bit de paridad y un cambio a 1 para finalizar el paquete

## Configuración

Para el ATMega328p los pines `PD0` y `PD1` corresponden a `RX` y `TX` (entrada y salida) para USART, estos a su vez se comunican con un intermediario (USART-USB), que genera un puerto USB COM virtual, comunicación la cual es asíncrona, a su vez la conexión entre el micro y el intermediario solo posee las conexiones `RX` y `TX`, para una comunicación sincrónica se requeriría una tercera conexión para el reloj `XCK` (la cual no esta presente). Para la velocidad en Baudios por segundos (_bauds per second_ = bps) se utilizara por defecto 9800.

Para calcular establecer la velocidad se utiliza el registro `UBRRn` cuyo valor se calcula:

$$

UBRRn = \frac{F_{OSC}}{16\cdot BAUD}-1


$$

Según el datasheet para modo asíncrono normal con un 0.2% de error, por simplicidad no se configurara un bit de paridad

> [!NOTE]
> Cuando los estos puertos son configurados para USART se configuran como entrada y salida independientemente del valor de `DDDn`.

## Registros

### UDRn USART I/O Data

Esta dirección de memoria es compartida, si se lee se obtiene el buffer recibido en `RXB`, si se escribe el buffer se destina a la salida `TXB`

### UCSRnA - USART Control and Status Register A

<table>
    <tr>
        <td><b>Bit</b></td>
        <td>7</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
    </tr>
    <tr>
        <td><b>Flag</b></td>
        <td>RXCn</td>
        <td>TXCn</td>
        <td>UDREn</td>
        <td>FEn</td>
        <td>DORn</td>
        <td>UPEn</td>
        <td>U2Xn</td>
        <td>MPCMn</td>
    </tr>
</table>

-   **Bit 7 – `RXCn`**: Receive Complete
    -   `1` cuando no se ha leído la data en el buffer, `0` de lo contrario
-   **Bit 6 – `TXCn`**:
    -   `1` cuando la data ha sido enviado y no se actualizado el buffer, `0` de lo contrario
-   **Bit 5 – `UDREn`**: Data Register Empty
    -   `1` cuando `UDRn` esta listo para recibir nueva data (no que la transmisión se completo)
-   **Bit 4 – `FEn`**: Frame Error
    -   `1` Cuando el bit de parada es erróneo, `0` de lo contrario
-   **Bit 3 – `DORn`**: Data OverRun
    -   `1` si llega nueva data sin haber sido leída la data anterior, `0` de lo contrario
-   **Bit 2 – `UPEn`**: Parity Error
    -   `1` si hay error de paridad, `0` de lo contrario
-   **Bit 1 – `U2Xn`**: Double Transmission Speed
    -   `1` Duplica la velocidad de transmisión
-   **Bit 0 – `MPCMn`**: Multi-processor Communication Mode
    -   Activa el modo de `Multi-processor Communication` el cual ignora todo paquete si no esta precedido por un paquete indicando una dirección particular (util cuando hay varios MCU bajo le mismo BUS)

### UCSRnB - USART Control and Status Register B

<table>
    <tr>
        <td><b>Bit</b></td>
        <td>7</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
    </tr>
    <tr>
        <td><b>Flag</b></td>
        <td>RXCIEn</td>
        <td>TXCIEn</td>
        <td>UDRIEn</td>
        <td>RXENn</td>
        <td>TXENn</td>
        <td>UCSZn2</td>
        <td>RXB8n</td>
        <td>TXB8n</td>
    </tr>
</table>

-   **Bit 7 – `RXCIEn`**: RX Complete Interrupt Enable
    -   Establecer en `1` activa la interrupción para `RXCn`
-   **Bit 6 – `TXCIEn`**: TX Complete Interrupt Enable
    -   Establecer en `1` activa la interrupción para `TXCn`
-   **Bit 5 – `UDRIEn`**: USART Data Empty Interrupt Enable
    -   Establecer en `1` activa la interrupción para `UDREn`
-   **Bit 4 – `RXENn`**: Receiver Enable
    -   Establecer en `1` activa el `RX` en USART (activa el receptor)
-   **Bit 3 – `TXENn`**: Transmitter Enable
    -   Establecer en `1` activa el `TX` en USART (activa el transmisor)
-   **Bit 2 – `UCSZn2`**: Charter Size
    -   Junto a `UCSZn1:0` en el registro UCSRnC establece el tamaño de la data (character)
-   **Bit 1 – `RXB8n`**: Receive Data Bit 8
    -   Noveno character en modo 9-bits de data (Leer antes de UDR0)
-   **Bit 0 – `TXB8n`**: Transmit Data Bit 8
    -   Noveno character en modo 9-bits de data (Escribir antes de UDR0)

### UCSRnC - USART Control and Status Register C

<table>
  <tr>
    <td><b>Bit</b></td>
    <td>7</td>
    <td>6</td>
    <td>5</td>
    <td>4</td>
    <td>3</td>
    <td>2</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <td><b>Flag</b></td>
    <td>UMSELn1</td>
    <td>UMSELn0</td>
    <td>UPMn1</td>
    <td>UPMn0</td>
    <td>USBSn</td>
    <td>UCSZn1</td>
    <td>UCSZn0</td>
    <td>UCPOLn</td>
  </tr>
</table>

**Descripción de los Flags:**

-   **Bit 7:6 - `UMSELn1:0`**: USART Mode Select

Modo USART

<table>
<tr>
<td>UMSELn1</td>
<td>UMSELn0</td>
<td>Modo</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>UART</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>USRT</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>(reservado)</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>Mater SPI</td>
</tr>
</table>

-   **Bit 5:4 - `UPMn1:0`**: Parity Mode

Modo de Paridad

<table>
<tr>
<td>UPMn1</td>
<td>UPMn0</td>
<td>Paridad</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>Desactivado</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>(reservado)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>Par</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>Impar</td>
</tr>
</table>

-   **Bit 3 - `USBSn`**: Stop Bit Select

    - `0` para 1-bit de parado, `1` para 2-bits

-   **Bit 2:1 - `UCSZn1:0`**: Character Size
Tamaño de Carácter (junto con UCSZn2 en UCSRnB)

<table>
<tr>
<td>UCSZn2</td>
<td>UCSZn1</td>
<td>UCSZn2</td>
<td>Tamaño</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>0</td>
<td>5-bits</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>1</td>
<td>6-bits</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>0</td>
<td>7-bits</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>1</td>
<td>8-bits</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>(reservado)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>(reservado)</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>(reservado)</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>9-bits</td>
</tr>
</table>

-   **Bit 0 - `UCPOLn`**: Clock Polarity
    -   Usado solo en modo síncrono. Debe ser `0` en modo asíncrono. Para `0` la data de `TX` cambia para el flanco de subida de `XCK` y `RX` en el flanco de bajado, `1` es el caso contrario

### UBRRn Baud Rate

Registro de 12-bits (0-4096) que se utiliza para calcular el Baud Rate