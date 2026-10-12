---
title: Blink build-in LED ESP01S
description: El programa mas básico para comprobar el funcionamiento en una placa de desarrollo. Hacer parpadear a intervalos regulados el LED integrado.

lastUpdated: true
outline: deep
---

<Badge type="danger" text="incompleto" />

# Blink build-in LED

## Arduino

## Baremetal (Espressif RTOS SDK)

### Crear Proyecto

::: tip
copiar los makefiles, establecer entorno
:::

```c
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_spi_flash.h"
#include "driver/gpio.h"


void app_main()
{
   // Set direction for each pin individually
   gpio_set_direction(0, GPIO_MODE_DEF_OUTPUT); // GPIO0 (LED)
   gpio_set_direction(2, GPIO_MODE_DEF_OUTPUT); // GPIO2

   while (1) {
      // Set both pins LOW
      gpio_set_level(0, 0);
      gpio_set_level(2, 0);
      vTaskDelay(1000 / portTICK_PERIOD_MS);

      // Set both pins HIGH
      gpio_set_level(0, 1);
      gpio_set_level(2, 1);
      vTaskDelay(1000 / portTICK_PERIOD_MS);
   }
}
```