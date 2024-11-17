---
title: Ejercicios Electronica Part. 2
description: Ejercicios de Electronica con planteamiento de resolución rápida con trucos sencillos ejercicios complejos, sin tener que recurrir a herramientas de calculo complejo o plantear sistemas complejos de resolución

lastUpdated: true
outline: deep
---

<!-- Como anécdota la "prueba corta" duro aproximadamente 4h nadie la completo en su totalidad y el docente al terminar la prueba corta la explico y resolvió en aproximadamente 5min-->

# Prueba Corta

## Dada la fuente de corriente determine $I_o$, $R_o$

![Primer Ejercicio](img/PC1.svg)

$V_{DD}=20v$, $\beta =20mA/V^2$, $V_T=2v$, $r_d=100k$

:::details Respuesta

La fuente corriente es una **Fuente de corriente de cascode** con MOSFET idénticos. Hacemos las siguientes aseveraciones solo por la configuración del circuito

* $I_G\approx 0$
* $I_{D_1} = I_{D_2}$
* $I_{D_3} = I_{D_4}$
* $V_{GS_2} = V_{GS_4}$
* $V_{D_1} = V_{G_1}$
* $V_{D_2} = V_{G_2}$

> [!NOTE]
> Asumimos que no hay corriente fluyendo por el *gate*, al estar los transistores $Q_1$ y $Q_2$; $Q_3$ y $Q_4$ en serie comparten la misma corriente, los transistores $Q_2$ y $Q_4$ tienen sus terminales $V_G$ y $V_S$ en paralelo por lo que tienen la misma tension

Primero sabemos que los transistores $Q_1$ y $Q_2$ al tener su *gate* cortocircuitada con su *drain* se cumple que

$$
\begin{gather}
V_{GS} = V_G - V_S\\
V_{DS} = V_D - V_S\\
V_{GS} = V_{DS}
\end{gather}
$$

Por lo que

$$
\begin{gather}
V_{GS_1} = V_{DS_1}\\
V_{GS_2} = V_{DS_2}
\end{gather}
$$

Para los transistores $Q_3$ y $Q_4$ se cumple

$$
I_D=\frac{\beta}{2}\cdot(V_{GS}-V_T)^2
$$

Para que $I_{D_3} = I_{D_4}$ se debe cumplir que $V_{GS_3} = V_{GS_4}$. Esto nos delata que todos los MOSFET tienen el mismo $V_{GS}$ por ende la misma corriente.

Desarrollando las ecuaciones nos queda que

$$
\begin{equation}
\begin{split}   I_{ref} &= I_{D_2}\\
I_{ref} &= \frac{\beta}{2}\cdot(V_{GS_2}-V_T)^2\\
I_o &= I_{D_4}\\
I_o &= \frac{\beta}{2}\cdot(V_{GS_4}-V_T)^2\\
V_{GS_2} &= V_{GS_4}\\
I_{ref}&=I_o
\end{split}
\end{equation}
$$

Para calcular las impedancias nos trasladamos al modelo en AC asumiendo que $Z_o\approx R_o$, utilizando el modelo para pequeña señal tenemos:

![alt text](img/PC1_A.svg)

Para simplificar el análisis hacemos una transformación de fuentes tomando en cuenta que $\mu = g_m\cdot r_d$

![alt text](img/PC1_B.svg)

Para calcular la impedancia de salida (habiendo fuentes dependientes), desconectamos la carga $R_L$ y colocamos una fuente de prueba $V_P$, por la cual para una corriente $I_P$

![alt text](img/PC1_C.svg)

Realizando la malla tenemos que

$$
\begin{gather}
V_P = r_d \cdot I_P + V_{GS_3}\cdot \mu + r_d \cdot I_P + V_{GS_4}\cdot \mu\\
V_P = 2 \cdot r_d \cdot I_P + V_{GS_3}\cdot \mu + r_d \cdot I_P + V_{GS_4}\cdot \mu\tag{1}\\
\end{gather}
$$

Para $V_{GS_3}$ y $V_{GS_4}$ tenemos que

$$
\begin{gather}
V_{GS_3} = V_{G_3} - V_{S_3}\\
V_{GS_4} = V_{G_4} - V_{S_4}
\end{gather}
$$

Donde $V_{G_3}=0$ y $V_{G_4}=0$ al no pasar ninguna corriente por el circuito de $I_{ref}$ no hay tension. Ademas $V_{S_4}=0$ al estar a tierra, por lo que $V_{GS_4}=0$, para $V_{G_3}$ tenemos que

$$
\begin{gather}
V_{G_3} = V_{GS_4}\cdot \mu + r_d\cdot I_P\\
V_{G_3} = r_d\cdot I_P
\end{gather}
$$

lo que la Ec. (1) queda

$$
\begin{gather}
V_P = 2 \cdot r_d \cdot I_P + r_d\cdot I_P\cdot \mu + r_d \cdot I_P\\
Z_o = \frac{V_P}{I_P} = r_d (2 + \mu)\\
Z_o = \frac{V_P}{I_P} = r_d (2 + g_m\cdot r_d)\tag{2}
\end{gather}
$$

para calcular el valor numérico tenemos que

$$
\begin{gather}
g_m=\sqrt{2I_D\cdot\beta}\tag{a}
\end{gather}
$$

calculamos $I_D$ en DC tomando la malla de entrada

$$
\begin{gather}
V_{DD}-I_D\cdot R-V_{GS_1}-V_{GS_2}-(-V_{DD})=0\\
2V_{DD}=I_D\cdot R+2V_{GS_1}\\
40=I_D\cdot 13.4k+2V_{GS_1}\tag{3}\\
\end{gather}
$$

Tomando la ecuación de corriente para un MOSFET en saturación

$$
\begin{gather}
I_D=\frac{\beta}{2}(V_{GS}-V_T)^2\\
I_D=10m(V_{GS}-2)^2\tag{4}\\
\end{gather}
$$

tomando la Ec. (3) y la Ec. (4) obtenemos

$$
\begin{cases}
I_{D_1} \approx 2.6103mA & V_{GS_1} \approx 2.5109v\\
I_{D_2} \approx 2.7651mA & V_{GS_2} \approx 1.4742v
\end{cases}
$$

Ya que para que un MOSFET sature se debe cumplir la condición $V_{GS}>V_T$ los valores $I_{D_1}$ y $V_{GS_1}$ son los verdaderos.

Con el valor de $I_D$ determinamos $g_m$ con la Ec. (a)

$$
g_m\approx 10.2182m S
$$

Ahora para $Z_o$ con la Ec. (2) tenemos

$$
Z_o\approx 102.3824M\Omega
$$

:::

## Dada las fuentes de corriente determine

1. $R$ para que $I_{o_1} = 2mA$
2. Calcular $N$ para que $I_{o_2}=20mA$

![fuente de corriente](img/PC2.svg)

* $V_{CC} = 10V$
* $\beta=150$

:::details Respuesta

El circuito presenta un repetidor de corriente con dos salidas conectadas en la parte superior, y un repetidor de corriente mejorado de $N$ salidas en la parte inferior.

Asumimos que todos los transistores son iguales en sus características por ende los transistores 1, 2 y 3 complementarios del resto. Por lo que tenemos que

$$
V_{BE}=V_{EB}
$$

Procedemos con el análisis y deducción de las ecuaciones. Primero realizamos la malla que pasa por $R$

$$
\begin{gather}
V_{CC}-V_{EB_1} - I_{ref}\cdot R - V_{BE_4} - V_{BE_5} - (-V_{CC}) = 0\\
R = \frac{2V_{CC}-3V_{BE}}{I_{Ref}}\\
R = \frac{17.9}{I_{ref}}\tag{1}
\end{gather}
$$

Luego analizamos las corrientes que pasan por el nodo de las bases de los BJT.

$$
\begin{gather}
I_{B_1} + I_{B_2} + I_{B_3} + I_{C_1} - I_{ref} = 0\\
\end{gather}
$$

Por simetría (al ser los transistores exactamente iguales) podemos asumir que las corrientes se reparten equitativamente, por lo menos en el caso de $Q_2$ y $Q_3$ que están en paralelo. Pero matemáticamente se requiere un criterio para aseverar esto. Aquí surge el modelo de Ebers-Moll

[Abstracción Modelo Ebers Moll](/Electronica/ebers-moll)

En base a este modelo $I_C\approx\alpha_F\cdot I_{ES}\cdot e^\frac{V_{BE}}{V_T}$, Donde hay una relación directa entre $V_{BE}$ y $I_C$ por ende al estar las tensiones $V_{BE}$ de $Q_1$, $Q_2$ y $Q_3$ en paralelo podemos asumir que poseen las mismas corrientes.

Teniendo en cuenta que $I_{C_1} = \beta I_{B_1}$

$$
\begin{gather}
I_{B_1} + I_{B_2} + I_{B_3} + \beta\cdot I_{B_1} - I_{ref} = 0\\
(3+\beta)I_B=I_{ref}\\
\frac{(3+\beta)I_C}{\beta}=I_{ref}\tag{2}
\end{gather}
$$

A la salida

$$
\begin{gather}
I_{O_1} = 2\cdot I_C\\
I_{O_1}/2 = I_C\\
I_C = 1mA
\end{gather}
$$

Con esto para con la Ec. (2) $I_{ref}=1.03mA$, con este resultado en la Ec. (1)

$$
R=\frac{895K}{51}\approx 17.549K\Omega
$$

> [!TIP]
>Mas concretamente al ser un repetidor de corriente se modela en base a la siguiente ecuación
>$$
>I_c = \frac{I_{ref}}{1+\frac{N}{\beta}}
>$$
>Donde $N$ es el numero de transistores conectados por la base


Para el repetidor de corriente mejorado, se cumple la misma condición de las corrientes al estar las tensiones $V_{BE}$ los transistores de $Q_5$ a $Q_n$ en paralelo. Para las corrientes de base tenemos

$$
N\cdot I_{B_n} = I_{E_4} \tag{3}
$$

Donde $N$ son los transistores de $Q_5$ a $Q_n$, al analizar el nodo de base del transistor $Q_4$ tenemos

$$
\begin{gather}
I_{B_4}+I_{C_N}=I_{ref}\\
I_{B_4}=I_{ref}-I_{C_N}\tag{4}
\end{gather}
$$

Sabiendo que $I_B=\frac{I_E}{\beta+1}$ y $I_B=\frac{I_C}{\beta}$ para la Ec. (3)

$$
N\cdot \frac{I_{C_n}}{\beta} = (\beta+1)I_{B_4}\tag{5}
$$

Sustituyendo con la Ec. 4

$$
\begin{gather}
I_{C_N}\cdot \frac{N}{\beta} = (\beta+1)(I_{ref}-I_{C_N})\\
I_{C_N} =\frac{I_{ref}}{1+\frac{N}{\beta(\beta+1)}}\tag{6}\\
\end{gather}
$$

La Ec. (6) es la formula general para el repetidor de corriente mejorado

A la salida $I_{O_2}=(N-1)I_C$ reemplazando con la Ec. (6) tenemos

$$
\begin{gather}
\frac{I_{O_2}}{N-1} =\frac{I_{ref}}{1+\frac{N}{\beta(\beta+1)}}\\
I_{O_2} =\frac{I_{ref}\cdot (N-1)}{1+\frac{N}{\beta(\beta+1)}}\tag{7}\\
N=\frac{\beta(\beta+1)(I_{ref}+I_o)}{\beta(\beta+1)\cdot I_{ref} - I_{O_2}}\tag{8}\\
N\approx20.43
\end{gather}
$$

Redondeando Se requirieren 20 Transistores, lo que volviendo a la Ec. (7)

$$
I_{O_2}\approx 19.5527mA
$$

:::