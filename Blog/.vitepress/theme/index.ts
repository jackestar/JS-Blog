// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import NotFound from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      setupImageZoom()
    }
  }
} satisfies Theme

// Zoom
let setupImageZoom = () => {
  const overlay = document.createElement('div');
  overlay.className = 'zoom-overlay';
  document.body.appendChild(overlay);

  const zoomedImage :HTMLImageElement = document.createElement('img');
  zoomedImage.className = 'zoomed-image';
  overlay.appendChild(zoomedImage);

  // Función para añadir el evento de zoom a las imágenes
  const addZoomListeners = () => {
    const images:NodeListOf<HTMLImageElement> = document.querySelectorAll('.main div img');
    images.forEach(img => {
      img.addEventListener('click', () => {
        zoomedImage.src = img.src;
        overlay.classList.add('show');
      });
    });
  };

  overlay.addEventListener('click', () => {
    overlay.classList.remove('show');
  });

  // Usar un `MutationObserver` para detectar cambios en el contenido del DOM
  const observer = new MutationObserver(() => {
    addZoomListeners();
  });

  // Observar cambios en todo el documento
  observer.observe(document.body, { childList: true, subtree: true });

  // Llamar inicialmente para cargar las imágenes en la página actual
  addZoomListeners();
}