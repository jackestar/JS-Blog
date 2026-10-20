---
title: Guías Electronica
description: Abstracciones para la rápida resolución de circuitos eléctricos

lastUpdated: true
outline: deep
---

# Método de Simplificación Efecto de Carga - Divisor de tension (Método Galíndez)

Hay dos formas comunes de hallar $V_{th}$ en un circuito, la primera es con métodos de análisis como **método de nodos** o **método de mallas** (o Kirchhoff directamente), la otra es con métodos de transformación de fuentes y asociación de resistencias/impedancias para simplificar el circuito a su minima expresión.

Dichos métodos aun asi pueden volverse engorrosos, con un circuito de *n* mallas, *n* nodos, o que requieren la transformación de fuentes sucesivamente. El poder analizar correctamente el circuito para elegir el método mas rápido es fundamental. Ciertas configuraciones de circuito presentan demasiados pasos para su resolución con los métodos convencionales, por lo que surgen otros métodos para resolver los mismos.

![Caso Carga-Divisor](img/carga-divisor.svg)

De tener una fuente de $V_s$ en serie con una resistencia $R_s$ (En forma de Thevenin) en paralelo a un divisor de tension cuyos dos nodos cualesquiera son los terminales del equivalente de Thevenin a buscar, sin importar cuantos paralelos adicionales halla en el circuito, se puede solucionar con una ecuación de efecto de carga y un divisor de tension.

El método consiste en hallar el efecto de carga, tomando como fuente $V_s$ con $R_s$ y como $R_L$ la carga o la resistencia equivalente paralela a la fuente (sin considera la fuente).

$$
V_L=\frac{V_s\cdot R_L}{R_L+R_s}
$$

Donde $V_L$ es la tension entre los puntos $a$ y $b$

![VL](img/carga-divisor-Vl.svg)

En este ejemplo los nodos de la resistencia $R_1$ son los terminales del equivalente de Thevenin, al estar la misma en una rama con resistencias (obviamente en serie) y al conocer la tension entre los nodo de la rama, se puede realizar divisor de tension.

$$
V_{th} = \frac{R_{1}\cdot V_L}{\sum R_n}
$$