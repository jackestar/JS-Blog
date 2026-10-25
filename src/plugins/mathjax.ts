/**
 * Sätteri plugin that turns the math nodes produced by Sätteri's
 * `features.math` option into inline SVG using MathJax.
 *
 * Sätteri renders inline math as `<code class="language-math math-inline">`
 * and display math as `<pre><code class="language-math math-display">`, which
 * is the same markup `remark-math` produces, so the same detection logic
 * applies.
 */

import type {HastNode, HastPluginDefinition} from 'satteri';
import {renderMath} from './mathjax-render';

/** Returns the class list of an element as a plain array of strings. */
function getClassNames(node: HastNode): string[] {
  if (node.type !== 'element') return [];
  const className = node.properties?.className;
  if (!Array.isArray(className)) return [];
  return className
    .map(entry => (typeof entry === 'string' ? entry : String(entry)))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** The Sätteri math plugin. */
export function mathjaxPlugin(): HastPluginDefinition {
  return {
    name: 'mathjax',
    element: [
      {
        // Inline math: `<code class="language-math math-inline">…</code>`
        filter: ['code'],
        async visit(node, ctx) {
          if (!getClassNames(node).includes('math-inline')) return;
          const tex = ctx.textContent(node);
          return {type: 'raw', value: await renderMath(tex, false)};
        },
      },
      {
        // Display math: `<pre><code class="language-math math-display">…</code></pre>`
        filter: ['pre'],
        async visit(node, ctx) {
          if (node.type !== 'element') return;
          const code = node.children.find(
            (child): child is Extract<HastNode, {type: 'element'}> =>
              child.type === 'element' && child.tagName === 'code',
          );
          if (!code) return;
          if (!getClassNames(code).includes('math-display')) return;
          const tex = ctx.textContent(code);
          return {type: 'raw', value: await renderMath(tex, true)};
        },
      },
    ],
  };
}
