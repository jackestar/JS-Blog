// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import NotFound from './404.vue'
import HeroImage from './image-hero.vue'
import './custom.css'
import Viewer3D from './Viewer3D.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound),
      'home-hero-image': () => h(HeroImage),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Viewer3D', Viewer3D);
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

  // Event
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

  // Changes in the document with observer
  const observer = new MutationObserver(() => {
    addZoomListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // First Check
  addZoomListeners();
}