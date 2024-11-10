// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import founding from './Layout.vue'
// import '/css/stylesU.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'not-found': () => h(founding)
    })
  },
  enhanceApp({ router }) {
    if (typeof window !== 'undefined') {
      // Ejecutar la función cuando la aplicación se monta y cada vez que se actualiza el contenido
      // onMounted(setupImageZoom);
      // onUpdated(setupImageZoom);
      setupImageZoom()
    }
  }
}
// import { onMounted, onUpdated } from 'vue';
// Zoom
let setupImageZoom = () => {
  const overlay = document.createElement('div');
  overlay.className = 'zoom-overlay';
  document.body.appendChild(overlay);

  const zoomedImage = document.createElement('img');
  zoomedImage.className = 'zoomed-image';
  overlay.appendChild(zoomedImage);

  // Función para añadir el evento de zoom a las imágenes
  const addZoomListeners = () => {
    const images = document.querySelectorAll('.main div img');
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