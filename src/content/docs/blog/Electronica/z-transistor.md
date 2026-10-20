---
title: Guías Electronica
description: Abstracciones para la rápida resolución de circuitos eléctricos

lastUpdated: true
outline: deep
---

## Impedancia FET ($V_G=V_D$)

![Impedancia](img/impedancia-vg_vs.svg)

> [!NOTE]
> La impedancia es independiente de la polaridad y si es visto desde el *Source* o desde el *Gate-Drain*, pero a propósito de comprobarlo se analizaran ambos casos

> [!NOTE]
> El análisis también se puede llevar realizando una transformación de fuente

> [!NOTE]
> El análisis es independiente del tipo del FET (canal-N o canal-P)

![Impedancia](img/impedancia-vg_vsAC.svg)

Para Zi, se analizan las corrientes y se Encuentra $V_{GS}$:

$$
\begin{gather}
V_{GS}=V_G-V_S\\
V_{GS}=V_p-0
\end{gather}
$$

$$
\begin{gather}
I_p=g_m\cdot V_{GS}+V_p/r_d\\
I_p=g_m\cdot V_p+V_p/r_d\\
I_p=V_p(g_m+1/r_d)\\
\end{gather}
$$

$$
\begin{gather}
Z_o=\frac{V_p}{I_p}\\
Z_o=\frac{V_p}{V_p(g_m+1/r_d)}\\
Z_o=\frac{1}{g_m+1/r_d}\\
Z_o=\frac{r_d}{g_m\cdot r_d+1}\\
Z_o=\frac{r_d}{\mu+1}\\
\end{gather}
$$

Para Zo, se analizan las corrientes y encuentra $V_{GS}$

$$
\begin{gather}
V_{GS}=V_G-V_S\\
V_{GS}=0-V_p
\end{gather}
$$

$$
\begin{gather}
I_p=V_p/r_d-g_m\cdot V_{GS}\\
I_p=V_p/r_d+g_m\cdot V_p\\
I_p=V_p(1/r_d+g_m)\\
\end{gather}
$$

$$
\begin{gather}
Z_o=\frac{V_p}{I_p}\\
Z_o=\frac{V_p}{V_p(1/r_d+g_m)}\\
Z_o=\frac{1}{1/r_d+g_m}\\
Z_o=\frac{r_d}{1+g_m\cdot r_d}\\
Z_o=\frac{r_d}{\mu+1}\\
\end{gather}
$$

## Impedancia BJT ($V_B=V_C$)

> [!CAUTION]
> En construcción