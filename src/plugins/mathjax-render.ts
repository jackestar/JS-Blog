/**
 * Build-time MathJax rendering.
 *
 * MathJax is initialised once per build and every formula is converted to
 * inline SVG, so the published site ships no client-side math JavaScript.
 *
 * The SVG output embeds the glyph paths (`fontCache: 'none'`), which means the
 * formulas need no extra font files either.
 */

import MathJax from 'mathjax';

type MathJaxInstance = typeof MathJax;

let mathjaxPromise: Promise<MathJaxInstance> | undefined;

/** Initialise MathJax (once) and return the ready instance. */
export function getMathJax(): Promise<MathJaxInstance> {
  mathjaxPromise ??= MathJax.init({
    loader: {load: ['input/tex', 'output/svg']},
    tex: {
      // `ams` provides the `gather`, `split`, `align`, `equation` and
      // `cases` environments used across the blog, plus `\tag`.
      packages: {'[+]': ['ams']},
    },
    output: {fontCache: 'none'},
  }) as Promise<MathJaxInstance>;
  return mathjaxPromise;
}

/**
 * The CSS required to lay out the generated `<mjx-container>` elements.
 * Returns an empty string until MathJax has been initialised.
 */
export async function getMathJaxStylesheet(): Promise<string> {
  const mathjax = await getMathJax();
  const stylesheet = mathjax.startup.output.styleSheet(
    mathjax.startup.document,
  );
  return mathjax.startup.adaptor.textContent(stylesheet);
}

/**
 * Render a TeX expression to an inline SVG string.
 *
 * @param tex The raw TeX source.
 * @param display Whether the formula is a block (display) formula.
 */
export async function renderMath(
  tex: string,
  display: boolean,
): Promise<string> {
  const mathjax = await getMathJax();
  try {
    // The promise based variant is required: some characters (e.g. accented
    // ones) need an asynchronously loaded font or extension.
    const node = await mathjax.tex2svgPromise(tex, {display});
    return mathjax.startup.adaptor.serializeXML(node);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[mathjax] Could not render formula: ${tex}\n${message}`);
    // Keep the original source visible instead of failing the whole build.
    return `<span class="math-error" title="${escapeAttribute(message)}">${escapeText(tex)}</span>`;
  }
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(value: string): string {
  return escapeText(value).replace(/"/g, '&quot;');
}
