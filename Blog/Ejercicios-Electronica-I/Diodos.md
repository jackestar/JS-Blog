---
title: Ejercicios Electronica Part. 1
description: Ejercicios de Electronica con planteamiento de resolución rápida con trucos sencillos ejercicios complejos, sin tener que recurrir a herramientas de calculo complejo o plantear sistemas complejos de resolución

lastUpdated: true
outline: deep
---

# Diodos

El primer contenido es diodo, centrado en diodo *Zener* y *Schottky*, modelos, Análisis de Circuitos con Diodos (características de transferencia): recortadores. Detectores y fijadores de voltaje, rectificadores de media onda y de onda completa. Fuentes de alimentación no reguladas (filtraje). Fuentes de alimentación reguladas con diodo Zener.

<!-- ## Ejercicios

Inserte Ejercicios Durante el Semestre

--- -->

## Parcial

### 1. Determine la Función de transferencia $Vo = f(Vi)$ y grafique $Vo = f(Vi)$ y $Vo(t),{0,T}$

![Pregunta 1](./img/parcial1-1.svg)

Donde $Vi$ se describe como una señal triangular de periodo $T$ de $8ms$ y Tension Pico-Pico $Vpp$ de $20v$.

![Pregunta 1b](./img/Parcial%201-1a.png)

:::details Respuesta

**Simplificación**

El primera paso es simplificar el circuito si es posible. El teorema de Thevenin dice:

> [!NOTE]
> "Cualquier red eléctrica lineal que contenga únicamente fuentes de tensión, fuentes de corriente y resistencias puede sustituirse en los terminales A–B por una combinación equivalente de una fuente de tensión $V_{th}$ en una conexión en serie con una resistencia $R_{th}$".

Lo que significa que si una parte del circuito comprendida por dos terminales es independiente de la otra parte y solo contiene elementos lineales se puede simplificar por un equivalente de Thevenin.

![alt text](./img/parcial1-1b.svg)

En este caso como no hay fuentes dependientes se tomar el lado derecho del circuito de manera sencilla. Determinando la tension entre los terminales del circuito separado, con $Vi$ como constante, se obtiene $V_{th}$. Apagando las fuente del circuito y calculando la resistencia equivalente entre sus terminales se obtiene $R_{th}$.

Para $V_{th}$ se puede hacer un sistema de ecuaciones para conocer el valor de tension en los terminales. Pero el circuito se puede resolver con técnicas mas sencilla. Primero se puede hacer una transformación de fuente donde una fuente de tension en serie con una resistencia tiene un equivalente con una fuente corriente en serie con una resistencia del mismo valor.

![alt text](./img/sourceTransform.svg)

Obedeciendo las siguientes formulas

$$
\begin{gather}
    Vs = R\cdot Is \\
    Is = \frac{Vs}R
\end{gather}
$$

Dichas formulas son fácilmente deducibles con análisis de circuito.

Al tener todas las resistencias el mismo valor se asigna la constante $R$ para simplificar los cálculos. Primero se transforma la fuente $Vi$ que esta en serie con $R1$ a su equivalente con una fuente de corriente $Ia$ de valor $Ia = Vi/R$ en paralelo con la resistencia $R1$. Ahora $R1$ y $R2$ están en paralelo y tienen el mismo valor.

> [!NOTE]
> Para $n$ resistencias en paralelo con valor $R$, su equivalente es una resistencia de valor $R/n$

En base la formula general para resistencias en paralelo se tiene que

$$
\begin{gather}
R_{eq} = \frac{1}{(\frac{1}R + \frac{1}R)}\\


R_{eq} = \frac{R}2
\end{gather}
$$

Ahora el paralelo de $R1$ y $R2$ se asigna una resistencia equivalente $Ra$ de valor $R/2$. Queda la fuente $Ia$ en paralelo con resistencia $Ra$ y a su vez el serie con la resistencia $R3$. Se transforma $Ia$ junto a $Ra$ a una fuente de tension $Va$ de valor $Vi/2$ en serie con $Ra$, la cual queda en serie con $R3$, cuyo equivalente ahora es $Rb$ de valor $3R/2$. Finalmente la fuente $Va$ en serie con $Rb$ se transforma a una fuente de corriente $Ith$ de valor $Vi/(3R)$ en paralelo con con $Rb$ y con $R4$. El equivalente de $Rb$ y $R4$ es $R_{th}$ con valor $3R/5$. Lo que resulta en un equivalente de Norton, por comodidad (y para que la fuente equivalente no quede en función del valor de las resistencias) se transforma una vez mas en un equivalente de Thevenin, quedando $V_{th}$ con valor $Vi/5$.

![Thevenin Procedimiento](./img/parcial1-1c.svg)
![Thevenin Procedimiento](./img/parcial1-1d.svg)

> [!TIP]
>El objetivo de este procedimiento es poder realizar simplificaciones rápidas sin tener que plantear sistemas de ecuaciones, de manera que se pueda resolver el ejercicio con un calculadora de sencilla o mentalmente.

Lo que resulta en una $R_{th}$ de valor $600Ω$, y para un valor de tension pico pico $Vpp_th$ de $4v$ lo que se traduce en un voltaje pico $Vp_th$ de $2v$ y $-2v$ en el ciclo positivo y ciclo negativo respectivamente


**Resolución**

Para conocer el comportamiento de $Vo$ y poder graficar se analizan las 3 ramas. considerando lo siguiente.

> [!NOTE]
> Se consider un modelo de diodo simplificado donde el diodo conduce corriente en polarización directa cuando la tension entre sus terminales alcanza una tension $Vk$, equivalente a una fuente de tension polarizada inversamente. Y cuando la tension entre sus terminales no alcanza la corriente de polarización o esta polarizada inversamente se comporta como un circuito abierto.

> [!NOTE]
> Al no estar indicado en el ejercicio se asumen diodos de silicio con valor $Vk = 0.7v$

> [!NOTE]
> Para los diodos Zener se tiene el mismo comportamiento con la adición que al superar el umbral de $Vz$ en polarización inversa el diodo conduce


![Diodo](./img/Diode_symbol.svg)

Se analiza el ciclo positivo y negativo de cada rama

Para la primera rama en el **ciclo positivo** para polarizar el diodo se debe superar la tension de polarización del diodo $Vk$ y ademas la tension de la fuente de $2v$, por lo que a partir de los $2.7v$ el diodo conduce. Para el **ciclo negativo** el diodo no conduce

Para la segunda rama en el **ciclo positivo** el diodo no conduce, y en el **ciclo negativo** a partir de los $-2.7v$ el diodo conduce, después de superar la tension de polarización del diodo y de la fuente de tension.

> [!TIP]
> se denota que la simetría inversa que poseen las primeras dos ramas

Para la tercera rama el diodo Zener en el **ciclo positivo** al superar los $0.7v$ el diodo conduce y para el **ciclo negativo** a partir de los $-5v$ el diodo conduce.

Ya que la fuente de tension $V_{th}$ suministra una tension pico de $±2v$ la primera y segunda rama nunca conducen ya que no exceden la tension de $2.7v$ requerida para polarizar los diodos.

Esto simplifica el análisis a la tercera rama que nunca conduce el en ciclo negativo, pero si en el positivo.

queda la siguiente ecuación

*Cuando D1 y D2 no conducen, D3 si conduce:*

$$
\begin{gather}
\frac{Vi}5 = I\cdot R_{th} + I\cdot R_{D3} + 0.7\\

I = (Vi - 3.5v)/13k
\end{gather}
$$
lo que indica que cuando $Vi > 3.5$ hay corriente a través de $D3$

para $Vo$ cuando $D3$ conduce

$$
\begin{gather}
Vo = I\cdot R_{D3} - Vi\\

Vo = \frac{2Vi}{13} + 21/130
\end{gather}
$$

*Cuando D1, D2 y D3 no conducen*

Al no haber corriente no hay caída te tension en $R_{th}$ por lo que

$$
Vo = \frac{Vi}5
$$

*Vo*

$$
V_o = \begin{cases} 
    \frac{V_i}{5}, & \text{si } -10 \le V_i \le 3.5 \\
    \frac{2V_i}{13} + \frac{21}{130}, & \text{si } 3.5 < V_i \le 10 
\end{cases}
$$

![Gráfica Vo(Vi)](img/vivo.svg)

:::

### 2. Determine que compuerta lógica digital forman estos circuitos, considere A y B entradas lógicas.
$1 = 5v (H)$ ; $0 = 0v (L)$

> a. Analice tomando diodos ideales

*a*

![Pregunta 2](./img/parcial1-2a.svg)

*b*

![Pregunta 2](./img/parcial1-2b.svg)

> b. Si los diodos fueran de silicio siguen funcionando ambas compuertas?

:::details Respuesta

Análisis Para determinar el tipo de compuerta simplemente se realiza la tabla de la verdad para cada caso tomando $A$ y $B$ como entrada y $V_o$ como salida.

*a*

![alt text](./img/parcial1-2as.svg)

<table>
    <tr>
        <td>A</td>
        <td>B</td>
        <td>Vod</td>
        <td>Vo</td>
    </tr>
    <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>5v</td>
    </tr>
    <tr>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>5v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>5v</td>
    </tr>
</table>

Cuando $A$ **o** $B$ es $1$ $V_o$ es $1$ ($5v$ analógico) por lo que la primera compuerta es una compuerta **OR**

*b*

![alt text](./img/parcial1-2bs.svg)

<table>
    <tr>
        <td>A</td>
        <td>B</td>
        <td>Vod</td>
        <td>Vo</td>
    </tr>
    <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0v</td>
    </tr>
    <tr>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>5v</td>
    </tr>
</table>

Cuando $A$ **y** $B$ es $1$ $V_o$ es $1$ ($5v$ analógico) por lo que la segunda compuerta es una compuerta **AND**

Si los diodos fueran de silicio tomando el modelo simplificado del diodo, en el caso `a` si alguna de las entradas fuese asertiva ($1$ o $5v$) habría una caída de tension en el diodo de $0.7v$ por lo que la tabla de la verdad quedaría

<table>
    <tr>
        <td>A</td>
        <td>B</td>
        <td>Vo</td>
    </tr>
    <tr>
        <td>0</td>
        <td>0</td>
        <td>0v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>0</td>
        <td>4.3v</td>
    </tr>
    <tr>
        <td>0</td>
        <td>1</td>
        <td>4.3v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>4.3v</td>
    </tr>
</table>

En el caso de la compuerta `b` si alguna entrada es $0v$ la corriente va desde la alimentación, a través de la resistencia y cae a través de uno de los diodos, por lo que respecto a tierra habría una diferencia de potencial de $0.7v$. si ambas entradas son asertivas la tension seria de $5v$.

<table>
    <tr>
        <td>A</td>
        <td>B</td>
        <td>Vo</td>
    </tr>
    <tr>
        <td>0</td>
        <td>0</td>
        <td>0.7v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>0</td>
        <td>0.7v</td>
    </tr>
    <tr>
        <td>0</td>
        <td>1</td>
        <td>0.7v</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>5v</td>
    </tr>
</table>

El umbral entre un $1$ y $0$ lógico viene definido por la tecnología de dicha compuerta, tanto para la tecnología TTL y CMOS, cumplen para los valores de entrada (es decir para la tension aplicada a la entrada de otra compuerta), pero no cumple con las especificaciones de margenes de ruido para la tension de salida, de la misma.

> [!NOTE]
> [1] J. F. Wakerly, Diseño Digital. Pearson Educación, 2001.

A términos de un circuito digital se puede decir que sigue funcionando como compuerta, mas no cumple con las especificaciones TTL y CMOS.

:::

### 3. Una fuente DC esta formada por un transformador de relación $10:1$, un puente rectificador de diodos soportan un max $2A$, un condensador de $47\mu F$ y una carga de $10K\Omega$.
> a. Dibuje el circuito para que la salida sea positiva. Determine el valor de Vo y el voltaje de rizo, sabiendo que $Vr=\frac{4V_o}{fcr}$

> b. Que cambio realizaría al circuito para que la tension a la salida sea un voltaje negativo de -5v

> c. Que ocurre si el capacitor a la salida tiene un valor muy pequeño

:::details Respuesta

> [!NOTE]
> La fuente recibe a la entrada $120v_{rms}\space⏦$ AC a $60hz$

> [!NOTE]
> Se toman todos los diodos bajo el modelo simplificado, con diodos de silicio

![Pregunta 3](./img/parcial1-3a.svg)

Para calcular $Vo$ se parte desde la entrada la fuente de tension $120v_{rms}\space⏦$, se evalúa el transformador de manera ideal cumpliendo la siguiente relación.

$$

\frac{V_p}{V_s}=\frac{n_p}{n_s}\tag{a}

$$

Formula que relaciona la tension con el numero de espiras entre el primario y secundario del transformador. deducible a través de la ley de Faraday.

lo que despejado deja que
$$

V_s=\frac{n_s\cdot V_p}{n_p}\\
V_s=12v_{rms}

$$

En base a la tension RMS ($V_{rms}$) o eficaz ($V_{efz}$) se obtiene la tension pico ${V_p}$ del transformador.

$$

 V_{efz}=\sqrt{\frac{1}{T}\cdot \int_{t_0}^{T}{v{^2}(t)dt}}

$$

lo que para una señal de función senoidal es

$$
\begin{gather}
V_{efz} = \frac{v_p}{\sqrt2}\\
V_{efz}\cdot \sqrt2 = v_p\\
v_p=12\sqrt2
\end{gather}

$$

en el **ciclo positivo** a la salida del transformador la corriente fluye a través $D_1$ hasta el paralelo del capacitor y la carga (resistiva) y devuelta por el diodo $D_3$ hasta el secundario. En el **ciclo negativo** a la salida del transformador la corriente fluye a través $D_4$ hasta el paralelo del capacitor y la carga (resistiva) y devuelta por el diodo $D_2$ hasta el secundario.
En ambos ciclos, la tension del secundario del transformador debe superar la tension de polarización de dos diodos, por lo que cuando la tension (del secundario) es mayor $±1.4v$ ambos diodos conducen, sabiendo la caída de tension de los diodos se resulta:

$$
\begin{gather}
V_{o_p} = v_p - 2\cdot V_d\\
V_{o_p} = 12\sqrt2 -1.4v\\
V_{o_p} \approx 15.5705v
\end{gather}
$$

Tomando $V_o$ como el voltaje pico a la salida, se obtiene la ecuación de voltaje de rizo

$$
V_r=\frac{4V_{o_p}}{f\cdot c\cdot r}\tag{b}
$$

La frecuencia de la fuente de tension es $60hz$ el transformador bajo el modelo ideal no se ve afectado por la frecuencia y no cambia la misma a su salida. Al pasar por el puente rectificador para el ciclo positivo y el ciclo negativo del transformador, a la salida del puente rectificador se da la misma onda en la misma dirección, por lo que la frecuencia se duplica.

$$
f_{V_o}=120hz
$$

![Pregunta 3](./img/Parcial%201-3b.png)

Con estos valores se obtiene como resultado:

$$
V_r=\frac{2\cdot(60\sqrt2-7)}{141}\approx 1.1042v
$$

Para obtener el voltaje de salida se toma el valor pico menos la mitad del voltaje de rizo, con la notación de ± la mitad del voltaje rizo

$$
\begin{gather}
V_o = \left(V_{o_p}-\frac{V_r}2\right)±\frac{V_r}2\tag{c}\\
V_o \approx 15.0184 ± 0.5521
\end{gather}
$$

Para obtener un voltaje de $-5v$ (se tomara como voltaje pico) se pueden hacer utilizar varios métodos (sin alterar los elementos ya existente). Se demuestra por dos métodos.

*Primer método*

el primer método consiste en utilizar un divisor de tension capacitivo a la entrada, para asi no tener perdidas de potencia.

>[!NOTE]
> Se toman los capacitores como reactancias

![Pregunta 3b Método 1](./img/parcial1-3b.svg)

Tomando la referencia (tierra) como el cátodo de los diodos $D_1$ y $D_4$ se obtiene voltaje negativo respecto a la tierra. Como aclaratoria invertir el puente rectificador generaría el mismo circuito.

La tension $V_{o_p}$ es 5v, la tension que cae en el puente rectificador es de $1.4v$ por lo que la en los terminales del secundario el valor es $6.4v$, ya que la relación del transformador es $10:1$ (a través de la formula de relación de transformación) el voltaje pico a en el primario del transformador ($V_p$) es $64v$ con un voltaje eficaz de $64/\sqrt2$.

Un divisor de tension viene dado por la siguiente expresión:

$$
\begin{gather}
V_{C_1}=\frac{Z_1\cdot V_i}{Z_1+Z_2} \tag{1.1}\\
V_{C_2}=\frac{Z_2\cdot V_i}{Z_1+Z_2} \tag{1.2}
\end{gather}
$$

>[!NOTE]
> Esta formula se obtiene con LVK y Ohm.

Donde $V_{C_1}$ es la tension al primario del transformador, al analizar la malla la fuente de tension y los dos capacitores por LVK (Kirchhoff)

$$
\begin{gather}
V_i-V_{C_1}-V_{C_2}=0\\
120 - 64/\sqrt2 = V_{C_1}\\
V_{C_1}\approx 74.7451
\end{gather}
$$

Para calcular el valor de los capacitores se parte de la formula de la impedancia para un capacitor.

$$
\begin{gather}
Z_C=\frac{-j}{\omega\cdot c}\\
\omega=2\pi f\\
Z_C=\frac{-j}{2\pi\cdot f\cdot c} \tag{2}\\
\end{gather}
$$

En base a las Eq. $(1.1)$ y $(2)$

$$
\begin{gather}
V_{C_2}=\frac{\frac{-j}{2\pi\cdot f\cdot C_2}\cdot V_i}{\frac{-j}{2\pi\cdot f\cdot C_1}+\frac{-j}{2\pi\cdot f\cdot C_2}}\\
V_{C_2}=\frac{\frac{1}{C_2}\cdot V_i}{\frac{1}{C_1}\cdot \frac{1}{C_2}}\\
V_{C_2}=\frac{C_1\cdot V_i}{C_1+C_2} \tag{3.1}\\
V_{C_1}=\frac{C_2\cdot V_i}{C_1+C_2} \tag{3.2}
\end{gather}
$$

>[!NOTE]
> la Eq $(3.2)$ se obtiene de la misma manera con las ecuaciones Eq. $(1.2)$ y $(2)$

Con los valores de $V_{C_2}$ y $V_{C_2}$ obtenemos

$$
\begin{gather}
\frac{8}{15\sqrt2-8}=\frac{C_1}{C_2}\\
\frac{C_1}{C_2}\approx 0.6054\\
0.6054\cdot C_2\approx C_1
\end{gather}
$$

Se obtiene una proporción entre $C_1$ y $C_2$ y no un valor concreto. Se escoge el valor comercial de $33\mu F$ para $C_3$ lo que resulta para $C_1\approx19.98\mu F$ que se aproxima al valor comercial $20\mu F$.

Ya con estos valores comprobamos. Dado $(3.1)$

$$
\begin{gather}
V_{C_2}=\frac{20\mu F\cdot120}{33\mu F+20\mu F}\\
V_{C_2}=2400/53\\
V_{C_2}\approx45.2830v_{rms}
\end{gather}
$$

Se obtiene la tension en el capacitor $C_2$ y por ende en el primario del transformador, dado su relación de transformación Eq. $(a)$ a su salida tenemos

$$
\begin{gather}
V_s=240/53\\
V_s\approx4.5283v_{rms}\\
V_{s_{pp}}\approx V_p\cdot\sqrt2\cdot\\
V_{s_{pp}}\approx 6.4039
\end{gather}
$$

al pasar por el puente rectificador cae en $1.4v$ al pasar por dos diodos en cada ciclo, por lo que el voltaje pico de salida es

$$
\begin{gather}
V_o\approx V_{s_{pp}} -1.4\\
V_o\approx 5.0039v\\
\end{gather}
$$

Para el voltaje rizo la Eq $(b)$ lo que da

$$
V_r\approx0.3548v
$$

Tomando la referencia (tierra) como el cátodo de los diodos $D_1$ y $D_4$ y redondeando el resultado se comprueba que a la salida hay $V_o\approx -5v\\$

lo que según la Eq $(c)$

$$
V_o=-5.0039±0.1774V
$$



*Segundo Método*

![Método 2](img/parcial1-3c.svg)

Otro método valido es poner un diodo zener a la salida de puente rectificador

> [!NOTE]
> Este acercamiento tiene algunas desventajas, requiere encontrar un diodo zener o una configuración cuya caída de tension sea la que se busca, ademas que los diodos zener no suelen soportar altas corrientes

Se conoce que valor pico a la salida del puente rectificador es $V_{O_{p}}=120\sqrt2 - 1.4$ de la primera parte del problema, por lo que se tiene que:

$$
\begin{gather}
V_{O_{p}}-Vz = V_o\\
V_{O_{p}}-V_o = V_z\\
V_z = 12\sqrt{2}-6.4\\
V_z \approx 10.6
\end{gather}
$$

Por lo que el nuevo voltage de salida para $V_z$ normalizado sera

$$
V_o=V_{O_{p}}-Vz\\
V_o=12\sqrt{2}-12\\
V_o\approx 4.9705V
$$

Para el voltage rizo tomando la Eq. $(b)$

$$
\begin{gather}
V_r = \frac{4\cdot 4.9705}{120\cdot 47\mu \cdot 10k}\\
V_r \approx 0.3525
\end{gather}
$$

lo que según la Eq $(c)$

$$
Vo \approx 4.97056 ± 0.1763 V
$$

Si el capacitor de salida es de valor muy pequeño el rizo se hace muy grande y el voltage de salida pasa a tener una variación notable.

:::

### 4. Dado el regulador zener

<!-- <Badge type="danger" text="incompleto" /> -->

![Diagrama Ejercicio 4](img/parcial1-4a.svg)

$$
\begin{gather}
V_Z=5v\\
V_i=[10,15]v\\
P_Z=1W

\end{gather}
$$
> $R_p$

> Valor mínimo y máximo de $R_l$ para que el circuito trabaje como regulador

> Que ocurre si $R_l=5\Omega$

> Que ocurre si $R_l=5k\Omega$

> Que ocurre si $V_i$ aumenta al doble de su valor máximo

:::details Respuesta

El limitante para el valor de $R_P$ es la potencia maxima que soporta el zener

$$
\begin{gather}
P_Z=V_Z\cdot I_{ZM}\\
I_{ZM}=200mA
\end{gather}
$$
> [!NOTE]
> El circuito esta compuestos por dos nodos por donde pasan las mismas corrientes, por lo que se referirá al "nodo" como cualquiera de estos

por el nodo pasa las siguientes corrientes

$$
I_P=I_{ZM}+I_L
$$

Para que $I_{ZM}$ tenga su valor máximo, $I_L\to 0$, por ley de ohm se tiene que

$$
\begin{gather}
R_L=\lim\limits_{I_L\to 0}V_R/I_L\\
R_L=\infty
\end{gather}
$$

Una resistencia infinita es equivalente a un circuito abierto, o al circuito sin carga $R_L$. al ser $I_L=0$ también $I_P=I_{ZM}$, por lo que queda la siguiente malla

$$
\begin{gather}
Vi - I_{ZM}\cdot R_p - V_Z = 0\\
R_p = \frac{V_i-V_Z}{I_{ZM}}\\
R_p = 50\Omega
\end{gather}
$$

> [!Warning]
> Al no tener carga el diodo Zener estará disipando 1W lo cual no es un buen diseño la $R_p$ calculada representa el valor mínimo que puede tomar esta resistencia para un diseño real se debe tomar en cuenta un $R_p$ adecuada considerando la carga minima que va a tomar el circuito

> [!Warning]
> También se debe tener en cuenta la potencia disipada por la resistencia $R_p$ la cual es $(V_{i_{max}}-V_Z)\cdot I_{ZM}=2W$ lo cual es una potencia considerables. Al no tener carga todo el circuito disipa 3W de potencia

En base a estos valores de puede determinar los valores mínimos y máximos que puede tomar la carga, para el modelo anterior se considera el circuito sin carga es decir con una carga de resistencia infinita, por lo que no tiene limite superior, por otro lado el diodo zener requiere una corriente minima $I_{ZK}$ (Corriente de Codo (*knee current*)) para operar, la cual suele ser entre el 5% y 10% de la corriente maxima $I_{ZM}$. Para este caso se toma como criterio un 10%

$$
\begin{gather}
I_{ZK} = 10\%\cdot I_{ZM}\\
I_{ZK} = 0.1\cdot I_{ZM}\\
I_{ZK} = 20mA
\end{gather}
$$

Para que el circuito funcione la diferencia de potencia tanto en el diodo y como la resistencia de carga deben ser iguales $V_Z=V_L=5V$, por la rama del diodo zener debe haber al menos $I_{ZK}$.

$$
\begin{gather}
V_i-R_P\cdot (I_{ZK}+I_{I_L}) - 5=0\\
I_L=\frac{V_L}{R_L}\\
R_L=\frac{V_Z\cdot R_P}{V_i-V_Z-I_Z\cdot R_P}\\
R_L=250/9\\
R_L\approx27.8\Omega
\end{gather}
$$

Con estos valores se tiene que $R_L=[\frac{250}{9},\infty]$ por lo que

**Si $R_L=5\Omega$** el circuito no regula

**Si $R_L=5k\Omega$** el circuito regula

> [!NOTE]
> al estar las resistencias dentro del rango no hace falta verificar $P_Z$, $V_L$ o $I_{ZK}$

**Si $V_i$=30v**

Para el circuito original el zener debe tener una carga maxima.

$$
\begin{gather}
I_P=\frac{Vi-Vz}{R_p}\\
I_P=500mA\\
I_L=I_P-I_{ZM}\\
I_L=300mA\\
R_{L_{min}}=\frac{V_z}{I_L}\\
R_{L_{min}}=\frac{50}{3}\approx16.7\Omega
\end{gather}
$$

para este caso la potencia disipada por $R_p$ pasa a ser:

$$
\begin{gather}
P_{R_p}=(V_{i_{max}}-V_Z)\cdot I_P\\
P_{R_p}=12.5W
\end{gather}
$$

Esto sumado a $1W$ de potencia disipada por el zener.

para la carga minima tenemos

$$
\begin{gather}
I_P=\frac{Vi-Vz}{R_p}\\
I_P=500mA\\
I_L=I_P-I_{ZK}\\
I_L=480mA\\
R_{L_{min}}=\frac{V_z}{I_L}\\
R_{L_{min}}=\frac{125}{1}\approx10.417\Omega
\end{gather}
$$

:::

---
