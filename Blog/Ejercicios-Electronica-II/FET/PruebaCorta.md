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

La fuente corriente es una **Fuente de corriente de cascode** con MOSFET idénticos. Se hacen las siguientes aseveraciones solo por la configuración del circuito

* $I_G\approx 0$
* $I_{D_1} = I_{D_2}$
* $I_{D_3} = I_{D_4}$
* $V_{GS_2} = V_{GS_4}$
* $V_{D_1} = V_{G_1}$
* $V_{D_2} = V_{G_2}$

> [!NOTE]
> Se asume que no hay corriente fluyendo por el *gate*, al estar los transistores $Q_1$ y $Q_2$; $Q_3$ y $Q_4$ en serie comparten la misma corriente, los transistores $Q_2$ y $Q_4$ tienen sus terminales $V_G$ y $V_S$ en paralelo por lo que tienen la misma tension

Primero se conoce que los transistores $Q_1$ y $Q_2$ al tener su *gate* cortocircuitada con su *drain* se cumple que

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

Para que $I_{D_3} = I_{D_4}$ se debe cumplir que $V_{GS_3} = V_{GS_4}$. Esto delata que todos los MOSFET tienen el mismo $V_{GS}$ por ende la misma corriente.

Desarrollando las ecuaciones queda que:

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

Para calcular las impedancias se pasa al modelo en AC asumiendo que $Z_o\approx R_o$, utilizando el modelo para pequeña señal tenemos:

![alt text](img/PC1_A.svg)

Para simplificar el análisis se hace una transformación de fuentes tomando en cuenta que $\mu = g_m\cdot r_d$

![alt text](img/PC1_B.svg)

Para calcular la impedancia de salida (habiendo fuentes dependientes),  se desconecta la carga $R_L$ y  se coloca una fuente de prueba $V_P$, por la cual para una corriente $I_P$

![alt text](img/PC1_C.svg)

Realizando la malla:

$$
\begin{gather}
V_P = r_d \cdot I_P + V_{GS_3}\cdot \mu + r_d \cdot I_P + V_{GS_4}\cdot \mu\\
V_P = 2 \cdot r_d \cdot I_P + V_{GS_3}\cdot \mu + r_d \cdot I_P + V_{GS_4}\cdot \mu\tag{1}\\
\end{gather}
$$

Para $V_{GS_3}$ y $V_{GS_4}$:

$$
\begin{gather}
V_{GS_3} = V_{G_3} - V_{S_3}\\
V_{GS_4} = V_{G_4} - V_{S_4}
\end{gather}
$$

Donde $V_{G_3}=0$ y $V_{G_4}=0$ al no pasar ninguna corriente por el circuito de $I_{ref}$ no hay tension. Ademas $V_{S_4}=0$ al estar a tierra, por lo que $V_{GS_4}=0$, para $V_{G_3}$:

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

Para calcular el valor numérico:

$$
\begin{gather}
g_m=\sqrt{2I_D\cdot\beta}\tag{a}
\end{gather}
$$

Se calcula $I_D$ en DC tomando la malla de entrada

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

Con el valor de $I_D$ se determina $g_m$ con la Ec. (a)

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

Se asume que todos los transistores son iguales en sus características por ende los transistores 1, 2 y 3 complementarios del resto. Resultando en:

$$
V_{BE}=V_{EB}
$$

Se Procede con el análisis y deducción de las ecuaciones. Primero se realiza la malla que pasa por $R$:

$$
\begin{gather}
V_{CC}-V_{EB_1} - I_{ref}\cdot R - V_{BE_4} - V_{BE_5} - (-V_{CC}) = 0\\
R = \frac{2V_{CC}-3V_{BE}}{I_{Ref}}\\
R = \frac{17.9}{I_{ref}}\tag{1}
\end{gather}
$$

Luego, las corrientes que pasan por el nodo de las bases de los BJT.

$$
\begin{gather}
I_{B_1} + I_{B_2} + I_{B_3} + I_{C_1} - I_{ref} = 0\\
\end{gather}
$$

Por simetría (al ser los transistores exactamente iguales) se asume que las corrientes se reparten equitativamente, por lo menos en el caso de $Q_2$ y $Q_3$ que están en paralelo. Pero matemáticamente se requiere un criterio para aseverar esto. Aquí surge el modelo de Ebers-Moll

[Abstracción Modelo Ebers Moll](../../Electronica/ebers-moll.md)

En base a este modelo $I_C\approx\alpha_F\cdot I_{ES}\cdot e^\frac{V_{BE}}{V_T}$, Donde hay una relación directa entre $V_{BE}$ y $I_C$ por ende al estar las tensiones $V_{BE}$ de $Q_1$, $Q_2$ y $Q_3$ en paralelo se asume que poseen las mismas corrientes.

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

## Determine $V_o$ y las zonas de trabajo de los transistores asi como su punto de operación

<Badge type="danger" text="no verificado" />

![Problema 2](img/PC3.svg)

Donde $V_{CC}=24v$

:::details Respuesta

Se analiza el lado derecho, con tres resistencias en paralelo, se aproxima la corriente $I_{G}\approx0$, se podría utilizar un equivalente de Thevenin para la *base* del BJT. Pero no hace falta, la resistencia $R_3$ esta en paralelo con $V_{BE}$ el cual es $0.7v$ (asumiendo que esta polarizado), se conoce la tension y la resistencia, se obtiene la corriente:

$$
I_{R_3}=\frac{7}{1.2M}\approx5.833\Omega
$$

Se realiza la malla desde $V_{CC}$ por $R_1$ y $R_2$ hasta $V_B$ (o por $V_BE$ a tierra)

$$
\begin{gather}
I_{R_{1-2}}=\frac{V_CC-V_B}{R_1+R_2}
I_{R_{1-2}}=\frac{233}{2.4M}\approx97.0833\mu A
\end{gather}
$$

![Corrientes](img/PC3-A.svg)

Se Despeja $I_B$ de las corrientes en el nodo y resulta:

$$
I_B=91.25\mu A
$$

Se Calcula $I_C$:

$$
\begin{gather}
I_C=I_B\cdot \beta
I_C=9.125mA
\end{gather}
$$

Para la tension $V_G$ se tiene un divisor de tension con $R_1$y $R_2$ entre $V_{CC}$ y $V_B$, al ser $R_1$y $R_2$ simétricos $V_G$ resulta

$$
\begin{gather}
V_G=\frac{V_{CC}-V_B}{2}=11.65v
\end{gather}
$$

Se tiene que:

**$V_{GS}$**
$$
\begin{gather}
V_{GS}=V_G-V_S\tag{1}
\end{gather}
$$

**$V_{S}$**
$$
\begin{gather}
V_{S}=I_L\cdot R_L\tag{2}
\end{gather}
$$

**Corrientes del nodo $V_S$**
$$
\begin{gather}
I_D-I_C-I_L=0\tag{3}
\end{gather}
$$

**$I_D$** *Corriente del MOSFET en saturación*
$$
\begin{gather}
I_D=\frac{\beta}{2}(V_{GS}-V_T)^2\tag{4}
\end{gather}
$$

Despejando queda

$$
\begin{gather}
I_D=\frac{\beta}{2}(V_G-(I_D-I_C)\cdot R_L-V_T)^2\\
I_{D_1}=17.4538mA; V_{GS_2}=3.323115v\\
I_{D_2}=20.1961mA; V_{GS_2}=578.863mv
\end{gather}
$$

para que un MOSFET este en saturación se debe cumplir $V_{GS}>V_T$ por lo que los valores $I_{D_2}$ y $V_{GS_2}$ no son validos.

Para comprobar estos resultados se toma la malla de salida:

$$
24=V_{R_D}+V_{GS}+V_{CE}
$$

ya que la alimentación es de $24v$ se cumple $V_{R_D}\le24$, $V_{GS}\le24$ y $V_{CE}\le24$. para $V_{R_D}$

$$
\begin{gather}
V_{R_D}=I_D\cdot R_D\le24\\
V_{R_D}=34.9076\nleq24
\end{gather}
$$

esto comprueba que el MOSFET no puede estar en saturación por lo que se prueba con la region lineal se utilizan las Ec. (1), Ec. (2) y Ec. (3) y en adición:

**$I_D$** *Corriente del MOSFET en saturación*
$$
\begin{gather}
I_D=\beta((V_{GS}-V_T)\cdot V_{DS}-\frac{V_{DS}^2}{2})\tag{5}
\end{gather}
$$

**$V_{DS}$**
$$
\begin{gather}
V_{CC}-V_{DS}-VS=0\tag{6}
\end{gather}
$$

Despejando deja

$$
\begin{gather}
I_{D_1}\approx-4.4345mA; V_{DS_1}\approx46.4287V; V_{GS_1}\approx25.2096V\\
I_{D_2}\approx11.07179mA; V_{DS_2}\approx71.346mV; V_{GS_2}\approx9.75712V
\end{gather}
$$

Ninguno de los valores 1 tiene sentido ya que las corrientes no pueden ser negativas y las tensiones no pueden ser mayores a la alimentación. 

$$
\begin{gather}
I_{D}\approx11.07179mA\\
V_{DS}\approx71.346mV\\
V_{GS}\approx9.75712V\\
V_o=V_S=V_{CE}\approx1.89288v
\end{gather}
$$

Con estos valores se cumplen las condiciones para la region lineal del MOSFET y las condiciones para region lineal en el BJT

**Punto de Trabajo BJT (Region Lineal)**
$$
V_{CE}\approx1.89288v; I_C=9.125mA
$$

**Punto de Trabajo MOSFET (Region Lineal)**
$$
I_{D}\approx11.07179mA; V_{DS}\approx71.346mV
$$

:::

## Determine $A_v$, $Z_i$, $Z_o$ del amplificador multi-etapa:

<Badge type="danger" text="incompleto" />

<Badge type="danger" text="no verificado" />

![multi-etapa](img/PC4.svg)

**Para M1 a M4**
* $V_T=2v$
* $\beta = 20mA/v^2$
* $r_d=200k\Omega$

**Para M5**
* $g_{ms}=2\cdot 10^{-3} S$
* $r_d=200k\Omega$

<!-- :::details Respuesta -->

Se realiza el análisis en DC

![multi-etapa DC](img/PC4-A.svg)

M2 y M4 forman un espejo de corriente mientras M1 y M2 actúan como resistencias, preliminarmente:

* $I_G\approx0$
* $I_{D_1}=I_{D_2}$
* $I_{D_3}=I_{D_4}$
* $I_{G_1}=I_{D_1}$ **M1**
* $I_{G_2}=I_{D_2}$ **M2**
* $I_{G_3}=I_{D_3}$ **M3**
* $V_{GS_2}=V_{GS_4}$

Se tiene que para el MOSFET en estado de saturación la corriente $I_D$ esta en función de $V_GS$ por lo que al ser iguales se puede decir que

$$
I_{D_2}=I_{D_4}
$$

por lo que todas las corrientes $I_D$ y tensiones $V_{GS}$ de M1 a M4 son iguales. Para las tensiones $V_{GS}$:

$$
\begin{gather}
10v=V_{GS_1}+V_{GS_2}\\
V_{GS}=5v
\end{gather}
$$

Para el análisis AC se obtiene $g_m$ y $\mu$

$$
\begin{gather}
g_m=\beta(V_{GS}-V_T)\\
g_m=60mS
\end{gather}
$$

$$
\begin{gather}
\mu=g_m\cdot r_d\\
\mu=12k
\end{gather}
$$

![Análisis AC](img/PC4-B.svg)

Para la impedancia de entrada $Z_i$ se ve la impedancia hacia los gates de M1 y M4. Para un MOSFET cortocircuitado *gate-drain* la impedancia es:

$$
Zm=\frac{rd}{\mu+1}
$$

véase [Demostración Impedancias Transistores](../../Electronica/z-transistor)

tanto M1 como M2 cumplen con la formula por lo que quedan en paralelo, al tener el mismo $\mu$, $Z_i$ queda

$$
\begin{gather}
Zi=\frac{rd}{2(\mu+1)}\\
Zi=8.3326\Omega
\end{gather}
$$

Para la impedancia de salida se tiene $R_6$ en paralelo con $R_7$ reflejado al *source* junto a $r_d$, quedando

$$
Z_o=R_6||(R_7\cdot(\mu+1)+rd)
$$

<!-- véase [Demostración Reflection FET](../../Electronica/lost) -->

**Demostración exhaustiva**

Nodo D:

$$
I_p=I_{R_6}+I_{R_7}
$$

Cambio de fuente de tension a corriente

Para $I_{R_6}$
$$
I_{R_6}=\frac{V_p}{R_6}
$$

$V_{GS}$:

$$
V_{GS}=0-I_{R_7}\cdot R_7\
$$

$I_{R_7}$:

$$
\begin{gather}
V_p=V_{GS}\cdot\mu+I_{R_7}\cdot(r_d+R_7)\\
V_p=-I_{R_7}\cdot R_7\cdot\mu+I_{R_7}\cdot(r_d+R_7)\\
I_{R_7}=\frac{V_p}{r_d+R_7+R_7\cdot\mu}
\end{gather}
$$

Nodo D (Otra vez):

$$
\begin{gather}
I_p=\frac{V_p}{R_6}+\frac{V_p}{r_d+R_7+R_7\cdot\mu}\\
\frac{I_p}{V_p}=\frac{1}{R_6}+\frac{1}{r_d+R_7+R_7\cdot\mu}\\
\frac{1}{Z_o}=\frac{1}{R_6}+\frac{1}{r_d+R_7\cdot(\mu+1)}\\
Z_o= R_6||(r_d+R_7\cdot(\mu+1))
\end{gather}
$$

$$
Z_o=80.2M\Omega
$$

Para la ganancia

<!-- ::: -->