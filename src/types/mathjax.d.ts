/**
 * Minimal type declarations for the MathJax v4 Node.js API.
 *
 * The `mathjax` package does not ship its own type definitions, only the
 * parts of the API used by this project are declared here.
 */
declare module 'mathjax' {
  interface MathJaxInitOptions {
    loader?: {load?: string[]};
    tex?: {packages?: string[] | Record<string, string[]>};
    output?: {fontCache?: 'global' | 'local' | 'none'};
    [key: string]: unknown;
  }

  interface MathJaxConvertOptions {
    display?: boolean;
  }

  interface MathJaxAdaptor {
    serializeXML(node: unknown): string;
    textContent(node: unknown): string;
  }

  interface MathJaxStartup {
    adaptor: MathJaxAdaptor;
    document: unknown;
    output: {styleSheet(document: unknown): unknown};
  }

  interface MathJaxInstance {
    startup: MathJaxStartup;
    init(options?: MathJaxInitOptions): Promise<MathJaxInstance>;
    tex2svg(tex: string, options?: MathJaxConvertOptions): unknown;
    tex2svgPromise(
      tex: string,
      options?: MathJaxConvertOptions,
    ): Promise<unknown>;
  }

  const MathJax: MathJaxInstance;
  export default MathJax;
}
