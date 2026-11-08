import {defineRouteMiddleware} from '@astrojs/starlight/route-data';

const NO_SIDEBAR = ['blog/papers', 'blog/pensum', 'blog/about'];

export const onRequest = defineRouteMiddleware(context => {
  const route = context.locals.starlightRoute;
  if (NO_SIDEBAR.includes(route.id)) {
    route.hasSidebar = false;
  }
});
