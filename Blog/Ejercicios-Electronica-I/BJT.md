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
R_C=2k\\
R_B=R_i=R_{B_1}=330k\\
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

Para frecuencias bajas los capacitores son abiertos (en DC la frecuencia es 0)

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

> [!NOTE]
> $\beta>>1$ por lo que se puede hacer la simplificación $I_E\approx I_C$, lo cual resultaría en $I_{B_1}=41\mu /2.52\approx16.2698\mu A$

Como $I_C=I_B\beta$

$$
I_{C_1}\approx1.9446mA
$$

Analizamos la malla de salida, asumiendo que esta en region activa

$$
\begin{gather}
V_{CC}=R_C\cdot (I_{C_1}+I_{E_2})+ V_{CE_1} + R_E\cdot I_{E_1}\\
V_{CE_1}=V_{CC}-R_C\cdot (I_{C_1}+I_{E_2})-R_E\cdot I_{E_1}\\
\end{gather}
$$

En este caso tenemos que la corriente en $R_C$ es desconocida, por lo que hay buscar una relación respecto al PNP, en este caso es conveniente la malla de entrada (asumiendo activo también).

$$
\begin{gather}
V_{CC}=R_C\cdot (I_{C_1}+I_{E_2})+ V_{BE_2} + R_B\cdot I_{B_2}\\
I_{B_2} = \frac{V_{CC} - V_{BE_2} - R_C\cdot I_{C_1}}{R_B+R_C\cdot(\beta+1)}\\
I_{B_2}\approx12.9557\mu A
\end{gather}
$$

Con estos datos podemos calcular la corriente de saturación de ambos BJT para conocer el estado de los transistores.

$$
\begin{gather}
I_{C1(sat)}=\frac{V_{CC}-R_C\cdot I_{E_2}}{R_C+R_E\left(\frac{\beta+1}{\beta}\right)}\\
I_{C1(sat)}\approx2.9467mA\\
I_{C2(sat)}=\frac{V_{CC}-R_C\cdot I_{C_1}}{R_L+R_C\left(\frac{\beta+1}{\beta}\right)}\\
I_{C2(sat)}\approx1.1559mA\\
\end{gather}
$$

Esto nos delata que el PNP esta en saturación, y el NPN en activo, pero desconocemos realmente la corriente $I_E$ ya que tenemos los datos para relacionar las corrientes en saturación ($\beta(sat)$). Asumimos que $\beta(sat)>>1$ (en un transistor real $I_{B(sat)}>>I_C/\beta$).

Verificamos $I_{C1(sat)}$ para con la corriente $I_{C2(sat)}$

$$
\begin{gather}
I_{C1(sat)}=\frac{V_{CC}-R_C\cdot I_{E_2}}{R_C+R_E\left(\frac{\beta+1}{\beta}\right)}\\
I_{C1(sat)}\approx3.2204mA\\
\end{gather}
$$

Lo que confirma que el NPN sigue en activo para un PNP en saturación, Calculamos $V_{CE_1}$

$$
\begin{gather}
V_{CE_1}=V_{CC}-R_C\cdot (I_{C_1}+I_{C2_{sat}})-R_E\cdot I_{E_1}\\
V_{CE_1}\approx3.8379V
\end{gather}
$$

lo que resulta en lo siguientes puntos Q

| BTJ |   $I_C$  | $V_{CE}$ | Region |
|-----|----------|----------|--------|
| NPN | 1.9446mA | 3.8379V  | Activa |
| PNP | 1.1559mA | 0v       | Saturación |

<!-- ::: -->
