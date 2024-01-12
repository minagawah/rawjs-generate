const TW_COLORS = require('./tw.colors.js');

module.exports = {
  important: true,
  content: ['./src/styles/*.css'],
  theme: {
    extend: {
      colors: {
        ...TW_COLORS,
      },
    },
  },
  variants: {},
  plugins: [],
};
