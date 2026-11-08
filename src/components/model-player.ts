/**
 * <model-player>: a click-to-load wrapper around Google's <model-viewer>.
 *
 * The page only ships a poster image and a play button. The <model-viewer>
 * library (three.js included) and the .glb are fetched when the user clicks.
 * The model can be unloaded again, and shown fullscreen.
 *
 *   <model-player
 *     src="/models/TDA75610.glb"
 *     poster="/models/TDA75610.png"
 *     alt="TDA75610 Development Board">
 *   </model-player>
 *
 * Attributes
 *   src       URL of the .glb (required)
 *   poster    URL of the preview image
 *   alt       Description of the model (used for accessibility labels)
 *   prefetch  "visible" (default): prefetch the .glb when the player scrolls
 *             into view and the browser is idle, and warm up on hover/focus.
 *             "hover": only warm up on hover/focus. "none": never prefetch.
 *   lang      Label language ("es" or "en"). Defaults to the closest [lang].
 *
 * Styling (CSS custom properties, all optional)
 *   --model-player-max-width   default 640px
 *   --model-player-aspect      default 4 / 3
 *   --model-player-radius      default 0.5rem
 * It also reads the shared theme tokens (--bg, --bg-sunken, --bg-hover,
 * --border, --border-strong, --text-title, --focus-ring, --img-filter) and
 * falls back to the dark gray palette when they are not defined.
 *
 * Import this file from a client <script> only (never from Astro frontmatter),
 * it needs the DOM.
 */

type State = 'idle' | 'loading' | 'ready' | 'error';
type PrefetchMode = 'none' | 'hover' | 'visible';

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

const STRINGS = {
  en: {
    load: 'Load 3D model',
    unload: 'Unload model',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    loading: 'Loading 3D model',
    ready: '3D model ready',
    error: 'Could not load the model. Click to retry.',
  },
  es: {
    load: 'Cargar modelo 3D',
    unload: 'Quitar modelo',
    fullscreen: 'Pantalla completa',
    exitFullscreen: 'Salir de pantalla completa',
    loading: 'Cargando modelo 3D',
    ready: 'Modelo 3D listo',
    error: 'No se pudo cargar el modelo. Haz clic para reintentar.',
  },
};

const ICON_PLAY = '<path d="M7 4v16l13 -8z" />';
const ICON_ENTER_FS =
  '<path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" />' +
  '<path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" />';
const ICON_EXIT_FS =
  '<path d="M15 19v-2a2 2 0 0 1 2 -2h2" /><path d="M15 5v2a2 2 0 0 0 2 2h2" />' +
  '<path d="M5 15h2a2 2 0 0 1 2 2v2" /><path d="M5 9h2a2 2 0 0 0 2 -2v-2" />';
const ICON_CLOSE = '<path d="M18 6l-12 12" /><path d="M6 6l12 12" />';

const TEMPLATE = `
<style>
  :host {
    display: block;
    width: 100%;
    max-width: var(--model-player-max-width, 640px);
    margin: 1em auto;
    --mp-overlay: color-mix(in srgb, var(--bg, #131316) 72%, transparent);
  }
  .frame {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: var(--model-player-aspect, 4 / 3);
    overflow: hidden;
    border: 1px solid var(--border, #2f2f35);
    border-radius: var(--model-player-radius, 0.5rem);
    background: var(--bg-sunken, #0e0e11);
    color: var(--text-title, #ededef);
    font-family: inherit;
  }
  .frame:fullscreen {
    aspect-ratio: auto;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .frame.pseudo-fs {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    aspect-ratio: auto;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
  }

  .poster {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
    background: none;
    object-fit: cover;
    filter: var(--img-filter, none);
    transition: opacity 0.3s ease;
  }
  .poster[hidden] {
    display: none;
  }
  :host([data-state='ready']) .poster {
    opacity: 0;
    pointer-events: none;
  }

  .stage {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  :host([data-state='ready']) .stage {
    opacity: 1;
    pointer-events: auto;
  }
  .stage > * {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    --poster-color: transparent;
  }

  button {
    margin: 0;
    padding: 0;
    border: 1px solid var(--border-strong, #44444b);
    background: var(--mp-overlay);
    color: inherit;
    font: inherit;
    cursor: pointer;
    backdrop-filter: blur(6px);
    transition: transform 0.2s ease, background 0.2s ease;
  }
  button:hover {
    background: var(--bg-hover, #26262c);
  }
  button:focus-visible {
    outline: 2px solid var(--focus-ring, #c2c2c8);
    outline-offset: 2px;
  }
  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    display: grid;
    place-items: center;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
  }
  .play:hover {
    transform: scale(1.06);
  }
  .play svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: currentColor;
    /* optical centering of the triangle */
    translate: 2px 0;
  }
  .percent {
    display: none;
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
  }
  :host([data-state='loading']) .play {
    cursor: progress;
  }
  :host([data-state='loading']) .play:hover {
    transform: none;
  }
  :host([data-state='loading']) .play svg {
    display: none;
  }
  :host([data-state='loading']) .percent {
    display: block;
  }
  :host([data-state='ready']) .play {
    display: none;
  }

  .btn {
    position: absolute;
    top: 0.6rem;
    display: none;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.6rem;
  }
  .fs {
    left: 0.6rem;
  }
  .close {
    right: 0.6rem;
  }
  :host([data-state='ready']) .fs,
  :host([data-state='loading']) .close,
  :host([data-state='ready']) .close {
    display: grid;
  }
  .frame.is-fullscreen .icon-enter,
  .frame:not(.is-fullscreen) .icon-exit {
    display: none;
  }

  /* Status text: always announced, only visible on error. */
  .message {
    position: absolute;
    inset: auto 0 0.8rem;
    margin: 0;
    padding: 0 1rem;
    text-align: center;
    font-size: 0.9rem;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  :host([data-state='error']) .message {
    clip-path: none;
    white-space: normal;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
    }
  }
</style>
<div class="frame">
  <img class="poster" alt="" loading="lazy" decoding="async" hidden />
  <div class="stage"></div>
  <button class="play" type="button">
    <svg viewBox="0 0 24 24" aria-hidden="true">${ICON_PLAY}</svg>
    <span class="percent" aria-hidden="true">0%</span>
  </button>
  <button class="btn fs" type="button">
    <svg class="icon-enter" viewBox="0 0 24 24" aria-hidden="true">${ICON_ENTER_FS}</svg>
    <svg class="icon-exit" viewBox="0 0 24 24" aria-hidden="true">${ICON_EXIT_FS}</svg>
  </button>
  <button class="btn close" type="button">
    <svg viewBox="0 0 24 24" aria-hidden="true">${ICON_CLOSE}</svg>
  </button>
  <p class="message" role="status" aria-live="polite"></p>
</div>
`;

/** Shared across every player on the page. */
let libraryPromise: Promise<unknown> | undefined;
const prefetched = new Set<string>();

function loadLibrary(): Promise<unknown> {
  libraryPromise ??= import('@google/model-viewer').catch(error => {
    // Allow a retry after a network failure.
    libraryPromise = undefined;
    throw error;
  });
  return libraryPromise;
}

function savingData(): boolean {
  const connection = (
    navigator as Navigator & {connection?: NetworkInformation}
  ).connection;
  return Boolean(
    connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? ''),
  );
}

function prefetchFile(url: string): void {
  const href = new URL(url, document.baseURI).href;
  if (prefetched.has(href)) return;
  prefetched.add(href);
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.append(link);
}

function whenIdle(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1500);
  }
}

export class ModelPlayer extends HTMLElement {
  static observedAttributes = ['poster', 'alt'];

  #root: ShadowRoot;
  #frame: HTMLElement;
  #poster: HTMLImageElement;
  #stage: HTMLElement;
  #play: HTMLButtonElement;
  #percent: HTMLElement;
  #fsButton: HTMLButtonElement;
  #closeButton: HTMLButtonElement;
  #message: HTMLElement;

  #state: State = 'idle';
  #strings = STRINGS.en;
  #token = 0;
  #viewer?: HTMLElement;
  #observer?: IntersectionObserver;
  #pseudoFullscreen = false;
  #previousOverflow = '';

  constructor() {
    super();
    this.#root = this.attachShadow({mode: 'open'});
    this.#root.innerHTML = TEMPLATE;

    const $ = <T extends HTMLElement>(selector: string) =>
      this.#root.querySelector(selector) as T;
    this.#frame = $('.frame');
    this.#poster = $('.poster');
    this.#stage = $('.stage');
    this.#play = $('.play');
    this.#percent = $('.percent');
    this.#fsButton = $('.fs');
    this.#closeButton = $('.close');
    this.#message = $('.message');

    this.#play.addEventListener('click', () => void this.#load());
    this.#play.addEventListener('pointerenter', () => this.#warmUp());
    this.#play.addEventListener('focus', () => this.#warmUp());
    this.#fsButton.addEventListener('click', () => void this.#toggleFullscreen());
    this.#closeButton.addEventListener('click', () => this.#unload());
  }

  connectedCallback(): void {
    const lang = this.closest('[lang]')?.getAttribute('lang')?.slice(0, 2);
    this.#strings = lang === 'es' ? STRINGS.es : STRINGS.en;
    this.#syncAttributes();
    this.#applyLabels();
    this.#setState(this.#state);

    document.addEventListener('fullscreenchange', this.#onFullscreenChange);
    this.#watchVisibility();
  }

  disconnectedCallback(): void {
    this.#unload();
    this.#observer?.disconnect();
    this.#observer = undefined;
    document.removeEventListener('fullscreenchange', this.#onFullscreenChange);
  }

  attributeChangedCallback(name: string): void {
    if (name === 'poster') this.#syncAttributes();
    if (name === 'alt') {
      this.#applyLabels();
      this.#viewer?.setAttribute('alt', this.getAttribute('alt') ?? '');
    }
  }

  // --- Setup ---------------------------------------------------------------

  #syncAttributes(): void {
    const poster = this.getAttribute('poster');
    if (poster) {
      this.#poster.src = poster;
      this.#poster.hidden = false;
    } else {
      this.#poster.removeAttribute('src');
      this.#poster.hidden = true;
    }
  }

  #applyLabels(): void {
    const alt = this.getAttribute('alt');
    const suffix = alt ? `: ${alt}` : '';
    const fullscreen = this.#isFullscreen()
      ? this.#strings.exitFullscreen
      : this.#strings.fullscreen;
    this.#play.setAttribute('aria-label', this.#strings.load + suffix);
    this.#fsButton.setAttribute('aria-label', fullscreen);
    this.#fsButton.title = fullscreen;
    this.#closeButton.setAttribute('aria-label', this.#strings.unload);
    this.#closeButton.title = this.#strings.unload;
  }

  #prefetchMode(): PrefetchMode {
    const value = this.getAttribute('prefetch');
    return value === 'none' || value === 'hover' ? value : 'visible';
  }

  #watchVisibility(): void {
    if (this.#prefetchMode() !== 'visible' || !this.getAttribute('src')) return;
    if (this.#observer || !('IntersectionObserver' in window)) return;
    this.#observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      this.#observer?.disconnect();
      this.#observer = undefined;
      whenIdle(() => {
        const src = this.getAttribute('src');
        if (src && !savingData()) prefetchFile(src);
      });
    });
    this.#observer.observe(this);
  }

  /** Hover/focus on the play button: get a head start on the downloads. */
  #warmUp(): void {
    const src = this.getAttribute('src');
    if (!src || this.#prefetchMode() === 'none' || savingData()) return;
    prefetchFile(src);
    loadLibrary().catch(() => {});
  }

  // --- State ---------------------------------------------------------------

  #setState(state: State): void {
    this.#state = state;
    this.dataset.state = state;
    const busy = state === 'loading';
    this.#play.setAttribute('aria-busy', String(busy));
    this.#play.setAttribute('aria-disabled', String(busy));
    this.#message.textContent =
      state === 'loading'
        ? this.#strings.loading
        : state === 'ready'
          ? this.#strings.ready
          : state === 'error'
            ? this.#strings.error
            : '';
  }

  #setPercent(progress: number): void {
    this.#percent.textContent = `${Math.round(progress * 100)}%`;
  }

  async #load(): Promise<void> {
    const src = this.getAttribute('src');
    if (!src || (this.#state !== 'idle' && this.#state !== 'error')) return;

    const token = ++this.#token;
    this.#setPercent(0);
    this.#setState('loading');

    try {
      await loadLibrary();
    } catch {
      if (token === this.#token) this.#fail();
      return;
    }
    // Unloaded (or disconnected) while the library was downloading.
    if (token !== this.#token) return;

    const viewer = document.createElement('model-viewer');
    viewer.setAttribute('src', src);
    viewer.setAttribute('alt', this.getAttribute('alt') ?? '');
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('shadow-intensity', '1');
    viewer.setAttribute('loading', 'eager');
    // Let the page scroll vertically when the finger starts on the model.
    viewer.setAttribute('touch-action', 'pan-y');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      viewer.setAttribute('auto-rotate', '');
    }

    viewer.addEventListener('progress', event => {
      if (token !== this.#token) return;
      const {totalProgress} = (event as CustomEvent<{totalProgress: number}>)
        .detail;
      this.#setPercent(totalProgress);
    });
    viewer.addEventListener(
      'load',
      () => {
        if (token === this.#token) this.#setState('ready');
      },
      {once: true},
    );
    viewer.addEventListener(
      'error',
      () => {
        if (token === this.#token) this.#fail();
      },
      {once: true},
    );

    this.#viewer = viewer;
    this.#stage.append(viewer);
  }

  #fail(): void {
    this.#disposeViewer();
    this.#setState('error');
  }

  #unload(): void {
    this.#token++; // Cancels any load in flight.
    this.#leaveFullscreen();
    this.#disposeViewer();
    this.#setState('idle');
  }

  #disposeViewer(): void {
    if (!this.#viewer) return;
    // Dropping `src` first lets model-viewer free the model and GPU buffers.
    this.#viewer.removeAttribute('src');
    this.#viewer.remove();
    this.#viewer = undefined;
  }

  // --- Fullscreen ----------------------------------------------------------

  #isFullscreen(): boolean {
    return this.#pseudoFullscreen || this.#root.fullscreenElement === this.#frame;
  }

  async #toggleFullscreen(): Promise<void> {
    if (this.#isFullscreen()) {
      this.#leaveFullscreen();
      return;
    }
    if (typeof this.#frame.requestFullscreen === 'function') {
      try {
        await this.#frame.requestFullscreen();
        return;
      } catch {
        // Denied or unsupported: use the CSS fallback below.
      }
    }
    this.#setPseudoFullscreen(true);
  }

  #leaveFullscreen(): void {
    if (this.#pseudoFullscreen) this.#setPseudoFullscreen(false);
    if (this.#root.fullscreenElement === this.#frame) {
      document.exitFullscreen().catch(() => {});
    }
  }

  /** CSS-only fullscreen, for browsers without the Fullscreen API (iOS). */
  #setPseudoFullscreen(enabled: boolean): void {
    this.#pseudoFullscreen = enabled;
    this.#frame.classList.toggle('pseudo-fs', enabled);
    if (enabled) {
      this.#previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('keydown', this.#onKeyDown);
    } else {
      document.documentElement.style.overflow = this.#previousOverflow;
      document.removeEventListener('keydown', this.#onKeyDown);
    }
    this.#onFullscreenChange();
  }

  #onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.#setPseudoFullscreen(false);
  };

  #onFullscreenChange = (): void => {
    const fullscreen = this.#isFullscreen();
    this.#frame.classList.toggle('is-fullscreen', fullscreen);
    this.#viewer?.setAttribute('touch-action', fullscreen ? 'none' : 'pan-y');
    this.#applyLabels();
  };
}

if (!customElements.get('model-player')) {
  customElements.define('model-player', ModelPlayer);
}

declare global {
  interface HTMLElementTagNameMap {
    'model-player': ModelPlayer;
  }
}
