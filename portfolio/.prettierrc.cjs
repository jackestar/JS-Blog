module.exports = {
  ...require('gts/.prettierrc.json'),
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {parser: 'astro'},
    },
  ],
};
