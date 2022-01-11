const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./**/*.html'],
      safelist: {
        greedy: [/[data-theme="dark"]/, /[@]/],
      },
    }),
  ],
};
