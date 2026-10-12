---
title: USART
description: Proyecto Baremetal para manejar USART AVR
lastUpdated: true
outline: deep
---

# Comunicación Serial (USART)

<!-- <Badge type="danger" text="incompleto" /> -->

[Código Github](https://github.com/jackestar/Baremetal/tree/main/AVR/USART)

Se busca mostrar los datos en una consola, para esto se utilizara el USART (Universal Synchronous/Asynchronous Receiver/Transmitter) que es un dispositivo de comunicación embebido en el microcontrolador que permite realizar comunicaciones sincrónicas o asincronías. Para comunicarse por protocolo USB (y poder ver los datos en una consola) se requiere un intermediario entre USART y USB (diferentes protocolos), para esto las placas tipo Arduino UNO incluyen un ATmega16U2, ATmega8U2, CH340G o CH341G (según la version o si es un clon) o parecido que hace de intermediario.

> [!NOTE]
> Los puertos RS-232 presentes por defecto en algunos computadores antiguos (o en algunos de uso industrial) pueden comunicarse por USART lo que evita el uso de un intermediario, pero dicho puerto no es tan común hoy en dia.

### Modo UART (Universal Asynchronous Receiver/Transmitter)

En modo Asíncrono para USART (UART), en estado inactivo `TX` permanece en 1 lógico inicia con un cambio de bit seguido de la transmisión de la data, los (el) bit de paridad y un cambio a 1 para finalizar el paquete

## Configuración

Para el ATMega328p los pines `PD0` y `PD1` corresponden a `RX` y `TX` (entrada y salida) para USART, estos a su vez se comunican con un intermediario (USART-USB), que genera un puerto USB COM virtual, comunicación la cual es asíncrona, a su vez la conexión entre el micro y el intermediario solo posee las conexiones `RX` y `TX`, para una comunicación sincrónica se requeriría una tercera conexión para el reloj `XCK` (la cual no esta presente). Para la velocidad en Baudios por segundos (_bauds per second_ = bps) se utilizara por defecto 9600.

Para calcular establecer la velocidad se utiliza el registro `UBRRn` cuyo valor se calcula:

$$

UBRRn=\frac{F_{OSC}}{16\cdot BAUD}-1

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
-   **Bit 6 – `TXCn`**: Transmit Complete
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
<td>UCSZn0</td>
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

Registro de 12-bits (0-4096) que se utiliza para calcular el Baud Rate `UBRRnL 7:0` y `UBRRnH 11:8`

### Programa C

Se crean las funciones para imprimir caracteres, cadenas de texto, números enteros (int) y flotantes.

Para los flotantes tener diferentes rangos de precision resulta en diferente código, si se require rendimiento y se tiene espacio en la memoria flash (~40 bytes en el peor caso) se puede utilizar LUT (tablas en con potencias base 10), si se quiere ahorrar espacio a coste de rendimiento se puede realizar los cálculos en tiempo de ejecución

```cpp
#define BAUD_RATE 9600ULL
#define UBRR0_VALUE (F_CPU / ((16 * BAUD_RATE)) - 1)

void send_chr(char c) {
  while (!(UCSR0A & (1 << UDRE0)))
    ; // Data Register Empty

  UDR0 = c;
}

void send_str(char* str) {
  uint8_t pos = 0;
  while (str[pos] != '\0') {
    send_chr(str[pos++]);
    }
}

void send_int(int num) {
  if (num < 0) {
    send_chr('-');
    num = -num;
    }
  int count = 10;
  char str[11] = "0000000000";

  while (num > 0) {
    str[count--] = '0' + num % 10;
    // send_chr(str[count]);
    num /= 10;
    }

  // Print left
  for (count++; count < 11; count++)
    send_chr(str[count]);
}

// Up to 4 decimal points
void send_flt_LUT16(float num, uint8_t mant) {
  const int ent = int(num);
  send_int(ent);
  if (mant > 0) {
    send_chr('.');

    // if constrant time is needed Lookup Table (LUT) Method is the way
    // to save space Iterative Loop is the way

    // ~10 bytes in flash memory
    static const uint16_t powers[] = {
        1,      // 10^0
        10,     // 10^1
        100,    // 10^2
        1000,   // 10^3
        10000,  // 10^4
      };

    send_int(int((num - ent) * powers[mant]));
    }
}

void setupUSART() {
      UCSR0B |= (1 << TXEN0);

  // 8N1

  // Modo UART (Default)
  UCSR0C &= ~(1 << UMSEL00) & ~(1 << UMSEL01);
  // Without parity
  UCSR0C &= ~(1 << UPM00) & ~(1 << UPM01);
  // 1 Stop bit
  UCSR0C &= ~(1 << USBS0);

  // 8 bit character
  UCSR0C |= (1 << UCSZ00) | (1 << UCSZ01);
  UCSR0B &= ~(1 << UCSZ02);

  UBRR0 = UBRR0_VALUE;
}
```
## Librería

Para las conversiones de tipo a char se genero una librería general

::: code-group

```c [USART.cc]
#include "USART.h"

USART::USART(uint32_t baud) {
  setup(baud);
}

void USART::sendStr(const char* str) {
  while (*str) sendChar(*str++);
}

void USART::sendInt(int num) {
  if (num < 0) {
    sendChar('-');
    num = -num;
  }
  int count = 10;
  char str[11] = "0000000000";
  while (num > 0) {
    str[count--] = '0' + num % 10;
    num /= 10;
  }
  for (count++; count < 11; count++)
    sendChar(str[count]);
}

void USART::sendFloat(float num, uint8_t mant) {
  int ent = (int)num;
  sendInt(ent);
  if (mant > 0) {
    sendChar('.');
    static const uint16_t powers[] = { 1, 10, 100, 1000, 10000 };
    sendInt((int)((num - ent) * powers[mant]));
  }
}

```

```c [USART.h]
#ifndef USART_H
#define USART_H

#ifndef _AVR_IO_H_
#include <avr/io.h>
#endif

class USART {
 public:
  /**
   * @brief Constructor. Initializes USART with the given baud rate and F_CPU.
   * @param baud Baud rate (default 9600)
   */
  USART(uint32_t baud = 9600);

  /**
   * @brief Send a single character.
   * @param c Character to send
   */
  void sendChar(char c);

  /**
   * @brief Send a null-terminated string.
   * @param str Pointer to string
   */
  void sendStr(const char* str);

  /**
   * @brief Send an integer as ASCII.
   * @param num Integer to send
   */
  void sendInt(int num);

  /**
   * @brief Send a float with up to 4 decimal places.
   * @param num Float to send
   * @param mant Number of decimal places (0-4)
   */
  void sendFloat(float num, uint8_t mant = 4);

 private:
  void setup(uint32_t baud);
};

#endif // USART_H
```

:::

## Librería (328p)

para configurar la librería (setup y send char) para el atmega328p se agrega

::: code-group

```c [USART_328p.cc]
void USART::setup(uint32_t baud) {
  uint16_t ubrr = (F_CPU / (16UL * baud)) - 1;
  UBRR0 = ubrr;
  UCSR0B |= (1 << TXEN0);
  UCSR0C &= ~(1 << UMSEL00) & ~(1 << UMSEL01); // Async UART
  UCSR0C &= ~(1 << UPM00) & ~(1 << UPM01);    // No parity
  UCSR0C &= ~(1 << USBS0);                    // 1 stop bit
  UCSR0C |= (1 << UCSZ00) | (1 << UCSZ01);    // 8 data bits
  UCSR0B &= ~(1 << UCSZ02);
}

void USART::sendChar(char c) {
  while (!(UCSR0A & (1 << UDRE0)));
  UDR0 = c;
}
```

:::