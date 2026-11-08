/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    sessionData: import('@session').SessionData;
    starlightRoute: import('@astrojs/starlight/route-data').StarlightRouteData;
  }
}
