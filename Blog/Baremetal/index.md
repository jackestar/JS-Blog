---
title: Baremetal in microcontrollers
description: Comparacion entre Assambler C++ y rust. En ATmega328P (Arduino Uno/Nano) y ESP32 Devkit 1

lastUpdated: true
outline: deep
sidebar: true
---

# Desarrollo Baremetal en microcontroladores

Un microcontrolador, es un circuito electrónico capaz de realizar una tarea especifica programable. Limitado por capacidades fijas de hardware. Los lenguajes de programación modernos permiten realizar la misma tarea de diferentes formas, con distintos paradigmas de programación. El código compilado resultante por otro lado no es siempre el mismo, el codigo generado bajo una librería no es el mismo con otra. En sistemas con capacidad en hardware tan limitada es fundamental

## Plataforma Arduino

Arduino es una plataforma de software y hardware open-source. Que proporciona una forma simple para el desarrollo en el area de la electronica. Provee un lenguaje de programación basado en **C++** y el framework [**wiring**](https://wiring.org.co/), generando una abstracción facilitando la programación del hardware de la plataforma. Dicha abstracción por otro lado a bajo nivel provee a través de funciones y métodos código complejo para soluciones sencillas.

## Plataforma ESP32

# Ejemplos

## Blink build-in LED

[Codigo Github](https://github.com/jackestar/Baremetal/tree/main/BlinkLED)

[Instalacion Archlinux](./Installation)

El programa mas básico para comprobar el funcionamiento en una placa de desarrollo. Hacer parpadear a intervalos regulados el LED integrado.

### Arduino

todos conocemos el tradicional programa para hacer que el led integrado de un Arduino parpadee.

```C
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```

este se plantea en cinco pasos:
* enceder el led
* esperar 1seg
* apagar el led
* esperar 1seg
* repetir

pero no necesariamente es la forma mas optima de hacerlo (en términos de Arduino), el programa se puede plantear de la siguiente manera:

* cambiar el estado del led respecto su estado anterior
* esperar 1seg
* repetir


```c
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
  delay(1000);
}
```

#### resultado en ASM
```asm

add 1

```
### C++ en baremetal

#### Puertos

El ATmega328P es un microcontrolador de 8 bits, que contiene dos puertos de 8bits y uno de 7bits (PB , PD y PC respectivamente), representados cada uno por tres registros en memoria ( `DDxn`, `PORTxn`, y `PINxn`). estos puertos conforman el I/O (entradas y salidas) del integrado. Al modificar los registros en memoria se modifica el comportamiento del I/O.

![builtin-LED](img/Pinout-Buildin-LED.svg)

Para el Arduino Uno el led integrado corresponde al puerto B y su posición nro 5 o `PB5`.

#### Registros

Cada puerto es manejado por tres registros en memoria

* **DDxn:** Determina la dirección, si `DDxn` es `1` `Pxn` es configurado como salida, si `DDxn` es `0` `Pxn` es configurado como entrada.
* **PORTxn (configurado como salida `DDxn` es `1`):** si `PORTxn` es `1` se configura la resistencia en pull-up, de lo contrario si `PORTxn` es `0` se desactiva la resistencia en pull-up.
* **PORTxn (configurado como entrada `DDxn` es `0`):** si `PORTxn` es `1`, la entrada es configurada con lógica positiva (`1` lógico son `5v`), de lo contrario es configurada con lógica negativa.
* **PINxn:** Independientemente del valor de `DDxn` establecer `PINxn` en `1` alterna el valor de `PORTxn`

#### SREG - Status Register

es un registro que indica el estado del microtrolador

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
        <td>I</td>
        <td>T</td>
        <td>H</td>
        <td>S</td>
        <td>V</td>
        <td>N</td>
        <td>Z</td>
        <td>C</td>
    </tr>
</table>

* **Bit 7 – `I`**: Global Interrupt Enable
  * Habilita las interrupciones
* **Bit 6 – `T`**: Bit Copy Storage
  * Usado en instrucciones `BLD` y `BST`
* **Bit 5 – `H`**: Half Carry Flag
  * Indica medio acarreo
* **Bit 4 – `S`**: Sign Bit
  * Signo resultado de una operación
* **Bit 3 – `V`**: Two’s Complement Overflow Flag
  * Indica el desbordamiento (overflow) de operación des de complemento a dos
* **Bit 2 – `N`**: Negative Flag
  * Indica que el resultado de una operación lógica o aritmética es negativo.
* **Bit 1 – `Z`**: Zero Flag
  * Indica que el resultado de una operación lógica o aritmética es cero.
* **Bit 0 – `C`**: Carry Flag
  * Indica acarreo en una operación lógica o aritmética.

estos flags son usados durante ciertas instrucciones para control de flujo, detección de condiciones etc.

#### Parpadeo (blink)

Para hacer parpadear el led integrado hace falta establecer dicho pin como salida, luego hacer un bucle:
1. si el led esta encendido apagarlo y si esta apagado encenderlo
2. esperar un segundo
3. repetir.

para cambiar el pin de estado según el actual se puede usar la operación bitwise XOR pero solo sobre el bit en especifico. Para trabajar con la posición del bit para el puerto B5 se usa `(1 << PORTB5)` que establece que el bit en la posición del puerto B5 dada por `PORTB5` es 1 y el resto 0. para luego realizar la operación XOR con el valor de PORTB

```
; Inicio
PORTB = 00000000                ; valor inicial
PORTB5 = 5                      ; Constante
(1 << PORTB5) = 00010000        ; Constante

PORTB = PORTB XOR (1 << PORTB5)
      = 00000000 XOR 00010000
      = 00000000 ^ 00010000
PORTB = 00010000

PORTB = PORTB XOR (1 << PORTB5)
      = 00010000 XOR 00010000
      = 00010000 ^ 00010000
PORTB = 00000000

```

```c
DDRB = DDRB | (1 << DDB5);
while (1)
{
    // Operacion XOR
    PORTB = PORTB ^ (1 << PORTB5);
    delay(1000);
}
```

#### Delay

A pesar de poseer una perfecta y funcional librería en `avr-libc` para delay vamos a generar nuestro delay. En el caso del ATmega328P se puede establecer una frecuencia de trabajo con el macro `F_CPU` o incluso también cambiarlo en tiempo de ejecución con el registro `CLKPR`. Pudiendo tomar valores `16Mhz`, `8Mhz`, `4Mhz`, `2Mhz`, `1Mhz`, `500khz`, `250khz`, `125khz` y `62,5khz`.

la frecuencia determina cuantas instrucciones por segundo puede realizar el microcontrolador, por lo que para generar un delay hay que mantener el microcontrolador trabajando una cierta cantidad de tiempo. Para esto se usa un bucle `while` que en base a la frecuencia del procesador (F_CPU) producto al el retraso deseado (`ms`) en mili segundos entre `1000` (ya que la frecuencia esta en segundos), entre la cantidad de instrucciones por bucle.

Primero declaramos una variable temporal de tipo `uint32_t` o `unsigned int` para 32bits, especificamos esto para tener explícitamente claro el tamaño de la variable ya que el microcontrolador es de 8bits y para procesar números grandes debe ejecutar varios ciclos (ejecutar varias instrucciones), y para que no evitar ambigüedades durante la compilación.

> [!note]
> los operadores tienen un orden de prioridad en que son procesados. Para los siguientes operadores en orden de prioridad se tiene
> `()`, `[]`, `*`, `/`, `%`, `+`, `-`, `=`, `,`. evaludos de izquierda a derecha.

naturalmente la operación a realizar seria la siguiente

$$

CiclosDeEspera = \frac{FrecuenciaCPU\cdot ms}{1000\cdot NroInstrucciones}

$$

siguiendo en orden prioridad de operadores la primera operación seria la frecuencia por la cantidad de milisegundos, pero aqui surge un problema, un entero sin signo de 32bits puede ser de un máximo de ${2^{32}}-1$ (4294967295) para una frecuencia de 16Mhz solo podríamos tener un delay no mayor a 268ms sin causar desbordamiento (*overflow*) ya los valores se calculan como enteros sin signo de 32bits `uint32_t`, para arreglar esto se aplican dos acercamientos. El primero es procesar con tipos de mayor tamaño para evitar el desbordamiento durante el procesado y luego asignar el resultado en un `uint32_t`. Lo segundo es cambiar el orden de operación.

para el tipo durante el procesamiento se usaran valores `const unsigned long long`, lo que nos da valores constantes sin signo de 64bits, al ser constantes estos se procesan en tiempo de compilación por lo que el microcontrolador no tiene que procesar dichos números. En caso tal que los `ms` no puedan ser constantes el procesar el numero de ciclo de espera en tiempo de ejecución no altera el delay ni el numero de instrucciones por ciclo de espera.

Para el orden operación es conveniente, que la frecuencia `F_CPU` se divida entre `1000` sea la primera operación, ya que para las frecuencias de trabajo del ATmega328p son divisibles exactas entre 1000, por lo que no se pierde precision. Luego el resultado multiplicado por la cantidad de milisegundo `ms` operación que no pierde precision y por ultimo se divide entre el numero de instrucciones `inst`. Asi se garantiza un orden de operación que pierde la menor cantidad de precision (ya que estamos operando sin decimales).

```c
uint32_t ciclos = ((F_CPU / 1000ULL) * (ms)) / inst;
```

mientras no conozcamos el numero de instrucciones tomamos `inst` como 1

> [!note]
> `ULL` es el sufijo literal para unsigned long long

lo siguiente es hacer un bucle que cuente dicha cantidad de ciclos

```c
uint32_t ciclos = ((F_CPU / 1000ULL) * (ms)) / inst;
while (ciclos) {
  ciclos--;
}
```

Aquí surge otro problema, para el compilador esta operación no hace nada, asignar una variable y hacer un bucle que solo opere sobre esa variable no altera al resto del codigo por lo que al compilar se ignora esta operación. para evadir esto una manera es inyectando una instrucción en assambler con la función `asm()`, dicha instrucción es `nop` cuya función es hacer un ciclo sin ninguna operación, lo que nos deja un codigo asi.

resulta en el siguiente codigo

```c{28}
inline void delay(const unsigned long long ms) {
    // ciclos es calculado en tiempo de compilación
    uint32_t ciclos = ((F_CPU / 1000ULL) * (ms)) / 1ULL; // Overflow
    while (ciclos) {
        ciclos--;
        asm("nop");
    }
}
```

> [!NOTE]
> la función delay se hace `inline` ya que al ser usada una sola vez no hace falta anidarla en una función, ademas genera codigo estático lo que evita (en este caso) que el microcontrolador haga cálculos innecesarios.

el cual genera el siguiente codigo en assambler

```asm{6-13}
  ...
   a:	80 e0       	ldi	r24, 0x00	; 0
   c:	94 e2       	ldi	r25, 0x24	; 36
   e:	a4 ef       	ldi	r26, 0xF4	; 244
  10:	b0 e0       	ldi	r27, 0x00	; 0
  12:	00 00       	nop
  14:	01 97       	sbiw	r24, 0x01	; 1
  16:	a0 40       	sbci	r26, 0x00	; 0
  18:	b0 40       	sbci	r27, 0x00	; 0
  1a:	d9 f7       	brne	.-10     	;  0x12
  ...
```

las lineas resaltadas son la función delay, contiene las siguientes instrucciones.

* **`ldi` 'Load Inmediate':** carga un valor de 8bits en memoria
  * la asignación de la variable `cicle` en los registros `r24` a `r27`
  * 1 ciclo
* **`nop` 'No Operation':** Genera 1 ciclo sin operación
  * 1 ciclo
* **`sbiw` 'Subtract immediate from word ':** resta el valor asignado a la palabra (par de registros)
  * resta 1 al registro `r24` con acarreo al registro `r25`
  * 2 ciclos
* **`sbci` 'Subtract with carry constant from reg':** resta el valor asignado junto al acarreo al registro seleccionado
  * resta 0 + acarreo a los registros `r26` y `r27`
  * 1 ciclo
* **`brne` 'Branch if not equal':** salta a la instrucción si el flag Z es 0.
  * si las instrucciones `sbiw` o `sbci` tienen por resultado 0, el flag Z es 1.
  * 2 ciclos si el flag Z es igual a 1
  * 1 ciclo si el flag Z es igual a 0

eso nos da un total de 7 instrucciones por ciclo por lo que el codigo queda asi

```c{3}
inline void delay(const unsigned long long ms) {
    // temp es calculado en tiempo de compilacion
    uint32_t ciclos = ((F_CPU / 1000ULL) * (ms)) / 7ULL; // Overflow
    while (ciclos)
    {
        ciclos--;
        asm("nop");
    }
}
```

lo ultimo es medir el alcance de la funcion delay (valores maximos). tomando ciclos con su valor maximo ${2^{32}-1}$ y despejando ms obtenemos los siguientes valores
| Frecuen. | ms          | seg      | min   | horas |
|---------:|-------------|----------|-------|-------|
| 16Mhz    | 1879048ms   | 1879s    | 31m   |       |
| 8Mhz     | 3758096ms   | 3758s    | 62m   | 1h    |
| 4Mhz     | 7516192ms   | 7516s    | 120m  | 2h    |
| 2Mhz     | 15032385ms  | 15032s   | 250m  | 4h    |
| 1Mhz     | 30064771ms  | 30064s   | 501m  | 8h    |
| 500khz   | 60129542ms  | 60129s   | 1002m | 16h   |
| 250khz   | 120259084ms | 120259s  | 2000m | 33h   |
| 125khz   | 240518268ms | 240518s  | 4008m | 66h   |
| 62.5khz  | 481036337ms | 481036s  | 8017m | 133h  |

#### Librerías

Haciendo uso de las librería de *avr_libc* importamos `avr/io.h` los identificadores para todos los registros para un procesador particular. A través del macro `__AVR_ATmega328P__` que es definido por el compilador

```c
// Defino el dispositivo
#define __AVR_ATmega328P__

// Importo el IO para el dispositivo en cuestión
#include <avr/io.h>
```

también se puede importar la librería especifica para el microcontrolador

```c
// también se puede importar la libreria
#include <avr/iom328p.h>

```

#### Resultado en C

```c
// Device
#define __AVR_ATmega328P__

// CPU freq (max 16000000UL)
#define F_CPU 16000000ULL // 16Mhz

#include <avr/io.h>

inline void delay(const unsigned long long);

int main(void) {
  	DDRB = DDRB | (1 << DDB5);
    // CLKPR = (uint8_t)0b0000;
    while (1)
    {
        // Operacion XOR
        PORTB = PORTB ^ (1 << PORTB5);
        delay(1000);
    }
    
}

inline void delay(const unsigned long long ms) {
    // temp es calculado en tiempo de compilacion
    uint32_t ciclos = ((F_CPU / 1000ULL) * (ms)) / 7ULL; // Overflow
    while (ciclos)
    {
        ciclos--;
        asm("nop");
    }
}
```

#### Resultado en ASM

```asm
   0:	25 9a       	sbi	0x04, 5	; 4
   2:	20 e2       	ldi	r18, 0x20	; 32
   4:	85 b1       	in	r24, 0x05	; 5
   6:	82 27       	eor	r24, r18
   8:	85 b9       	out	0x05, r24	; 5
   a:	80 e0       	ldi	r24, 0x00	; 0
   c:	94 e2       	ldi	r25, 0x24	; 36
   e:	a4 ef       	ldi	r26, 0xF4	; 244
  10:	b0 e0       	ldi	r27, 0x00	; 0
  12:	00 00       	nop
  14:	01 97       	sbiw	r24, 0x01	; 1
  16:	a0 40       	sbci	r26, 0x00	; 0
  18:	b0 40       	sbci	r27, 0x00	; 0
  1a:	d9 f7       	brne	.-10     	;  0x12
  1c:	f3 cf       	rjmp	.-26     	;  0x4
```