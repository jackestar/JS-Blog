import {createRequire} from 'node:module';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

const require = createRequire(import.meta.url);
const gts = require('gts');
const ignores = require('./eslint.ignores.cjs');

export default [
  {ignores},
  ...gts,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        // `gts` enables `project`, which conflicts with `projectService`.
        project: false,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    ...tseslint.configs.disableTypeChecked,
  },
];
