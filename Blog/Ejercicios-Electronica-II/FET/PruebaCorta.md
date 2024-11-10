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
Z_o = \frac{V_P}{I_P} = r_d (2 + g_m\cdot r_d)\tag{1}
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
40=I_D\cdot 13.4k+2V_{GS_1}\tag{2}\\
\end{gather}
$$

Tomando la ecuación de corriente para un MOSFET en saturación

$$
\begin{gather}
I_D=\frac{\beta}{2}(V_{GS}-V_T)^2\\
I_D=10m(V_{GS}-2)^2\tag{3}\\
\end{gather}
$$

tomando la Ec. (2) y la Ec. (3) obtenemos

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

Ahora para $Z_o$ con la Ec. (1) tenemos

$$
Z_o\approx 102.3824M\Omega
$$

:::