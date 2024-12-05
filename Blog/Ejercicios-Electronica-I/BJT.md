---
title: Ejercicios Electronica Part. 1
description: Ejercicios de Electronica con planteamiento de resolución rápida con trucos sencillos ejercicios complejos, sin tener que recurrir a herramientas de calculo complejo o plantear sistemas complejos de resolución

lastUpdated: true
outline: deep
---

# Transistores BJT

El segundo contenido es sobre las ecuaciones básicas del BJT, características tensión-corriente y dependencia con la temperatura, polarización del BJT, rectas de carga DC – AC (punto de operación) y máxima excursión simétrica.
<!-- ## Ejercicios

Inserte Ejercicios Durante el Semestre

--- -->

## Parcial

> [!NOTE]
> La primera pregunta del parcial original es un cuestionario.

### 1. Dado el amplificador determine

<Badge type="danger" text="incompleto" />

<Badge type="danger" text="no verificado" />

> a. Zona de trabajo
> b. Punto Q de operación
> c. Dibujar recta de carga y punto Q
> d. Calcular $V_o$

![Diagrama 1](img/parcial2-1.svg)

$$
\begin{align}
V_{cc}=12v\\
R_E=1k\\
R_i=330k\\
R_C=330k\\
R_C=2k\\
R_{B_1}=330k\\
R_{B_2}=220k\\
R_L=5k\\
\beta_1=\beta_2=120
\end{align}
$$

<!-- :::details Respuesta -->

Primero, analizamos las características en DC del circuito, y simplificamos el circuito. En este caso todos los capacitores en DC se comportan como circuitos abiertos.

$$
\begin{gather}
Z_c = \frac{-j}{\omega C}\\
Z_c = \frac{-j}{2\pi f\cdot C}\\
Z_c=\lim\limits_{f\to 0}\frac{-j}{2\pi f\cdot C} = \infty\\
\end{gather}
$$

Para frecuencias alta los capacitores son abiertos

![Simplificación DC impedancias](img/parcial2-1a.svg)

Ademas la malla de entrada ($R_{B_1}$ y $R_{B_2}$) se puede simplificar con un equivalente de Thevenin.

![Simplificación DC Thevenin](img/parcial2-1b.svg)

donde en $V_{th}$ es la tension en la base del transistor npn entre $R_{B_1}$ y $R_{B_2}$ en ese punto forman un divisor de tension por lo que:

$$
\begin{gather}
V_{th}=\frac{R_{B_2}\cdot V_{cc}}{R_{B_1} + R_{B_2}}\\
V_{th}=4.8v
\end{gather}
$$

Para determinar $R_{th}$, se apaga la fuentes de tension y se calcula la resistencia desde el punto entre $R_{B_1}$ y $R_{B_2}$ y tierra, quedan ambas resistencias están en paralelo por lo que:

$$
\begin{gather}
R_{th}=\frac{R_{B_1}\cdot R_{B_2}}{R_{B_1}+R_{B_2}}\\
R_{th}=132k\Omega
\end{gather}
$$

El primer transistor es npn y esta en configuración emisor común, es decir la **señal** entra por la base y sale por el colector. Se Analiza la malla de entrada

![Transistor NPN](img/Diagrama_de_Transistor_NPN.svg)

$$
\begin{gather}
0+V_{th}-R_{th}\cdot I_{B_1}-V_{BE}-R_E\cdot I_{E_1}=0\\
V_{th}-R_{th}\cdot I_{B_1}-V_{BE}-R_E\cdot I_{B_1}(\beta+1)=0\\
I_{B_1}=\frac{V_{th}-V_{BE}}{R_E\cdot(\beta+1)+R_{th}}\\
I_{B_1}=41\mu /2.53\approx16.2055\mu A
\end{gather}
$$

Como $I_C=I_B\beta$

$$
I_{C_1}\approx1.944mA
$$

<!-- ::: -->