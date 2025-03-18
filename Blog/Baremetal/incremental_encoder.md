---
title: Incremental Encoder
description: Proyecto Baremetal para manejar un Encoder Rotatorio Relativo
lastUpdated: true
outline: deep
---

# Encoder Rotatorio Relativo (Incremental Encoder)

[Código Github](https://github.com/jackestar/Baremetal/tree/main/RotaryEncoder)

Un encoder rotatorio relativo o encoder incremental es dispositivo electromecánico que mediante dos salidas indica la dirección de rotación, estos no indican la posición absoluta.

Este proyecto consistirá en:

1. Indicar la dirección de rotación proveída por el encoder
2. Controlar el brillo de un LED mediante el encoder
3. Detectar una vuelta completa del encoder (estableciendo la posición con un botón)
4. Crear una librería general para el encoder.

Para este proyecto se utilizara un encoder genérico con botón. Leds Rojos 3mm y resistencias de 220 Ohm.

## Pinout encoder

![rotary encoder](img/Rotary_Encoder.svg)

| Pin | Función |
| --- | :-----: |
| SW  | Switch  |
| SW  | Switch  |
|  1  | Señal A |
|  2  | Señal B |
|  3  | Vcc     |

> [!NOTE]
> Este pinout es arbitrario y puede variar según el datasheet del encoder

![rotary encoder](img/Quadrature_Diagram.svg)

Al rotar el encoder genera un código gray, según la dirección de rotación.

* **Sentido horario**

    (AB) 00 01 11 10

* **Sentido antihorario**

    (AB) 00 10 11 01

## Dirección

El primer acercamiento se busca detectar la dirección de giro y leer el botón con debouncing.

### Puertos

Se establece la dirección de los puertos con el registro `DDRx`. 3 puertos como entrada (para el switch y señales A y B del encoder) y tres como salida (para los LEDs indicadores de dirección, botón presionado y error)

```c
DDRD &= ~(1 << DDD5); // A (Pin 5)
DDRD &= ~(1 << DDD6); // B (Pin 6)
DDRD &= ~(1 << DDD7); // Swh (Pin 7)
DDRB = DDRB | (1 << DDB5); // Dir (Pin 13)
DDRB = DDRB | (1 << DDB4); // Tgl (Pin 12)
DDRB = DDRB | (1 << DDB3); // Err (Pin 11)
```

Para leer el valor de los puertos de entrada se utiliza el registro `PINx` y para establecer el valor en los pines de salida se utiliza el registro `PORTx`

La señales A y B forman un código gray de 2 bits.

**sentido horario**
| base | 1 | 2 | 3 | 4 |
| ---: | ---: | ---: | ---: | ---: |
| binario | 00 | 01 | 11 | 10 |
| decimal |  0 |  1 |  3 |  2 |

**sentido antihorario**
| base | 1 | 2 | 3 | 4 |
| ---: | ---: | ---: | ---: | ---: |
| binario | 00 | 10 | 11 | 01 |
| decimal |  0 |  2 |  3 |  1 |

Para detectar el cambio se crea una variable global `step` para la posición anterior y `step_new` para la actual. Ej. si la posición `step` anterior es `11` y la nueva `step_new` `10` el encoder va en sentido horario, si `step_new` es `01` va en sentido antihorario y si `step_new` es `00` se produjo un error de lectura.

```c
...
uint8_t step = 0;
while (1) {
    uint8_t step_new = ((PIND & (1 << PIND5)) ? 2 : 0) |
                       ((PIND & (1 << PIND6)) ? 1 : 0);
...
```

En este sentido para indicar la dirección si va en sentido horario se establece al pin `B5` (13 Arduino UNO) un `1` asertivo y de lo contrario `0` asertivo. De darse un error se alterna el pin `B3` (11 Arduino UNO).

```c
switch (step) {
    case 0:
        if (step_new == 1)
            PORTB = PORTB | (1 << PORTB5);
        else if (step_new == 2)
            PORTB = PORTB & ~(1 << PORTB5);
        else
            PORTB = PORTB ^ (1 << PORTB3);
        break;
    case 1:
        if (step_new == 3)
            PORTB = PORTB | (1 << PORTB5);
        else if (step_new == 0)
            PORTB = PORTB & ~(1 << PORTB5);
        else
            PORTB = PORTB ^ (1 << PORTB3);
        break;
    case 2:
        if (step_new == 0)
            PORTB = PORTB | (1 << PORTB5);
        else if (step_new == 3)
            PORTB = PORTB & ~(1 << PORTB5);
        else
            PORTB = PORTB ^ (1 << PORTB3);
        break;
    case 3:
        if (step_new == 2)
            PORTB = PORTB | (1 << PORTB5);
        else if (step_new == 1)
            PORTB = PORTB & ~(1 << PORTB5);
        else
            PORTB = PORTB ^ (1 << PORTB3);
        break;
    default:
        break;
}
step = step_new;
```

>[!NOTE]
> Para propósitos prácticos el estado de error se puede omitir


>[!NOTE]
> `x` se refiere al puerto (A, B o C) y `n` a la posición en especifico

>[!NOTE]
> Al referirse a una dirección especifica se utiliza por ejemplo `PINxn` para `PINx`, `DDxn` para `DDRx`, `PORTxn` para `PORTx`. Estos se refieren a la misma dirección (es decir pueden ser usados para cualquier registro sin problemas), se usan de esta manera para facilitar la lectura del código. Ej. la librería io para Atmega328p `iom328p.h`
> ```c
>#define PINB0 0
>#define DDB0 0
>#define PORTB0 0
>```

## Pasos para 1 revolución (vuelta)

Para el encoder de muestra se tienen 30 pasos para una revolución (se puede contar manualmente). En la posición inicial esta en un estado inicial (0) al pasar en el intermedio de la siguiente posición pasa por un segundo estado (1) y al llegar a la siguiente posición toma un tercer estado (2). Por lo que para detectar 1 vuelta se deben contar 2 veces el numero pasos, en otras palabras 60 cambios de estado.

## Librería C++

> [!NOTE]
> Se eligió C++ sobre C (a pesar que las librerías de avr-lib están en C) ya que este puede manejar las librerías de C, ademas C++ tiene mejor manejo para objetos facilitando la escritura del código y evitando choque entre declaraciones de funciones (y nombres mas sencillos al usar métodos en vez de funciones)

### Estado

Para el estado del encoder se define un tipo `enum`

```cpp
typedef enum {
    ENCODER_STOPPED,
    ENCODER_CLOCKWISE,
    ENCODER_COUNTERCLOCKWISE
} encoderDirection;
```

### Atributos/Métodos

Se definen las propiedades del encoder, que pin en que puerto corresponde a las señales A y B, asi como cuantos cambios de estado por revolución, si los cambios de estado no son iguales al numero de posiciones del encoder se hace lo siguiente

$$
stepPerRevolution = NroEstadoPorCambioDePosición\cdot PosicionesDelEncoder
$$

la clase debe tener los atributos de en que posición esta, en que dirección va `encoderDirection` y el estado anterior del encoder para determinar el anterior. Al usuario final no tiene por que saber ni manipular esta ultima por lo que sera un atributo privado.

```cpp
public:
    encoderDirection direction;
    volatile uint8_t *pinAPort;
    uint8_t pinABit;
    volatile uint8_t *pinBPort;
    uint8_t pinBBit;
    uint8_t stepPerRevolution;
    uint8_t position; // 8bit resolution
...
private:
    uint8_t step;
```

> [!NOTE]
> la resolución (numero pasos por vuelta) esta limitado a 8bits -> 255 pasos. de necesitar una resolución mayor se puede usar `uint16_t` o mayor

la clase debe contar con un constructor, un método para leer el estado del encoder, opcionalmente manejar si la dirección genera incremento o decremento, y un método para reiniciar la posición y dirección si hace falta

```cpp
public:
    ...
    RotaryEncoder(volatile uint8_t *pinAPort, uint8_t pinABit, volatile uint8_t *pinBPort, uint8_t pinBBit, uint8_t stepPerRevolution);
    void read();
    int8_t incrementalRead();
    void reset();

```

Para la lectura del estado se compara el estado anterior con el actual y se determina la dirección, la posición va de 0 a stepPerRevolution, por lo que se debe manejar ese caso. Para no repetir código se implementa una función en linea para el incremento o decremento de la posición.

```cpp
private:
    ...
    inline void positionInc();
    inline void positionDec();
```

## Indicador de vuelta

Para reiniciar la posición simplemente se usa el método `reset()`, y para detectar la vuelta cuando el encoder pase por el tope `stepPerRevolution` se alterna el estado de un pin, solo si la posición anterior cambio.

## PWM para el controlar el brillo de un LED

Las salidas del ATmega328p son digitales, para controlar el brillo de un led se puede usar un PWM. Se Utilizara el `OC2A` correspondiente al puerto `B` bit `3` (`PB3`) el cual corresponde al `Timer/Counter2`. Para la configuración se utiliza el registro.

**TCCR2A - Timer/Counter Control Register A**

| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---:|---:|---:|---:|---:|---:|---:|---:|
| COM2A1 | COM2A0 | COM2B1 | COM2B0 | - | - | WGM21 | WGM20 |

Para los distintos modos de PWM se configuro no inversor de frecuencia fija, esto significa que un contador `TCNT2` aumenta a frecuencia de $reloj\cdot prescaler$ ($prescaler=1$ en este caso) y va incrementando su valor, al coincidir con el valor de `OCR2A` el pin `OC2A` (`PB3`) pasa a ser `0`, al llegar al tope (`TOP = 0xFF`) del contador se desborda (overflow) a `0` (`BOTTOM = 0x00`), reiniciando el contador y `OCRA` pasa a ser `1`.

```c
    // no inversor
    TCCR2A |= (1 << COM2A1);
    // "Fast PWM" frecuencia fija
    TCCRA2 |= (1 << WGM21);
    TCCRA2 |= (1 << WGM20);
```

Para iniciar el Timer/Counter se establece el prescaler en 1

```c
TCCR2B = 0 | (1 << CS20);
```

Para ajustar el brillo a la posición del encoder se toma la siguiente ecuación para escalar la resolución del encoder a la resolución del PWM

$$
\frac{PosiciónEncoder}{stepPerRevolution}\cdot255
$$

Por ejemplo:

```cpp
OCR2A = encoder.position * 255 / encoder.stepPerRevolution;
```

## Resultado (C++)

[Código Github](https://github.com/jackestar/Baremetal/tree/main/RotaryEncoder/C)

### Librería

rotaryEncoder.hpp
```cpp
// Rotary Relative Encoder

#ifndef _ROTARY_ENCODER_

    #define _ROTARY_ENCODER_

    #ifndef _AVR_IO_H_

        #include <avr/io.h>

    #endif

typedef enum {
    ENCODER_STOPPED,
    ENCODER_CLOCKWISE,
    ENCODER_COUNTERCLOCKWISE
} encoderDirection;

class RotaryEncoder
{
    public:
        encoderDirection direction;
        volatile uint8_t *pinAPort;
        uint8_t pinABit;
        volatile uint8_t *pinBPort;
        uint8_t pinBBit;
        uint8_t stepPerRevolution;
        uint8_t position; // 8bit resolution
    
        RotaryEncoder(volatile uint8_t *pinAPort, uint8_t pinABit, volatile uint8_t *pinBPort, uint8_t pinBBit, uint8_t stepPerRevolution);
        void read();
        int8_t incrementalRead();
        void reset();
    private:
        uint8_t step;
        
        inline void positionInc();
        inline void positionDec();
};

#endif
```

rotaryEncoder.cpp
```cpp
#include "rotaryEncoder.hpp"

RotaryEncoder::RotaryEncoder(volatile uint8_t *pinAPort, uint8_t pinABit, volatile uint8_t *pinBPort, uint8_t pinBBit, uint8_t stepPerRevolution)
    : pinAPort(pinAPort), pinABit(pinABit), pinBPort(pinBPort), pinBBit(pinBBit), stepPerRevolution(stepPerRevolution), step(0), position(0), direction(ENCODER_STOPPED) {
    // if (pinAPort == pinBPort && pinABit == pinBBit)
    //     static_assert(true, "A signal and B signal cannot be the same");
}

inline void RotaryEncoder::positionInc() {
    if (position < stepPerRevolution) {
        position++;
    } else {
        position = 0;
    }
}
inline void RotaryEncoder::positionDec() {
    if (position > 0) {
        position--;
    } else {
        position = stepPerRevolution;
    }

}

void RotaryEncoder::read() {
    uint8_t new_step = ((*pinAPort & (1 << pinABit)) ? 2 : 0) | ((*pinBPort & (1 << pinBBit)) ? 1 : 0);

    switch (step)
    {
        case 0:
            if (new_step == 1) {
                direction = ENCODER_CLOCKWISE;
                positionInc();
            }
            else if (new_step == 2) {
                direction = ENCODER_COUNTERCLOCKWISE;
                positionDec();
            }
            else
                direction = ENCODER_STOPPED;
            break;
        case 1:
            if (new_step == 3) {
                direction = ENCODER_CLOCKWISE;
                positionInc();
            }
            else if (new_step == 0) {
                direction = ENCODER_COUNTERCLOCKWISE;
                positionDec();
            }
            else
                direction = ENCODER_STOPPED;
            break;
        case 2:
            if (new_step == 0) {
                direction = ENCODER_CLOCKWISE;
                positionInc();
            }
            else if (new_step == 3) {
                direction = ENCODER_COUNTERCLOCKWISE;
                positionDec();
            }
            else
                direction = ENCODER_STOPPED;
            break;
        case 3:
            if (new_step == 2) {
                direction = ENCODER_CLOCKWISE;
                positionInc();
            }
            else if (new_step == 1) {
                direction = ENCODER_COUNTERCLOCKWISE;
                positionDec();
            }
            else
                direction = ENCODER_STOPPED;
            break;
        default:
            direction = ENCODER_STOPPED;
            break;
    }

    step = new_step;
}

int8_t RotaryEncoder::incrementalRead() {
    if (direction == ENCODER_CLOCKWISE) {
        return 1;
    } else if (direction == ENCODER_COUNTERCLOCKWISE) {
        return -1;
    }
    return 0;
}

void RotaryEncoder::reset() {
    position = 0;
    direction = ENCODER_STOPPED;
}
```

### Test

```cpp
#ifndef __AVR_ATmega328P__
    #define __AVR_ATmega328P__
#endif

#ifndef F_CPU
    #define F_CPU 16000000ULL // 16Mhz
#endif

#include <avr/io.h>
#include <avr/interrupt.h>

#include "rotaryEncoder.cpp"

int main(void)
{
    DDRD &= ~(1 << DDD5); // A (Pin 5)
    DDRD &= ~(1 << DDD6); // B (Pin 6)
    DDRD &= ~(1 << DDD7); // Swh (Pin 7)

    // 13 as output to show direction
    // 12 as output toggle button
    // 11 as output to show errors
    DDRB |= (1 << DDB5); // Dir (Pin 13)
    DDRB |= (1 << DDB4); // Tgl (Pin 12)
    DDRB |= (1 << DDB3); // DIM (Pin 11)

    // no-inverter mode
    // Fix frequency PWM
    TCCR2A = 0 | (1 << COM2A1) | (1 << WGM21) | (1 << WGM20);

    // No prescaler
    TCCR2B = 0 | (1 << CS20);

    uint8_t prev_position = 0;

    RotaryEncoder encoder(&PIND, PIND5, &PIND, PIND6, 60);

    while (1)
    {
        encoder.read();
        if (encoder.direction == ENCODER_CLOCKWISE) {
            PORTB |= (1 << PORTB5);
        } else if (encoder.direction == ENCODER_COUNTERCLOCKWISE) {
            PORTB &= ~(1 << PORTB5);
        }

        if (PIND & (1 << PIND7))
            encoder.reset();

        if (encoder.position == encoder.stepPerRevolution && prev_position != encoder.position)
            PORTB ^= (1 << PORTB4);

        prev_position = encoder.position;

        OCR2A = encoder.position * 255 / encoder.stepPerRevolution;

    }

    return 0;
}

```

YouTube Demo: [Rotary Encoder Library - example_rotary_encoder.cc [Test]](https://youtu.be/ZgM7oFhrcaU)