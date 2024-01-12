module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc'], // closure
  },
  plugins: [
    // 'plugins/markdown',
    'jsdoc-plugin-intersection',
    'node_modules/jsdoc-tsimport-plugin/index.js',
  ],
  templates: {
    default: {
      outputSourceFiles: false,
      staticFiles: {
        include: ['./jsdoc.assets/static'],
      },
      layoutFile: './jsdoc.assets/tmpl/layout.tmpl',
    },
  },
  source: {
    include: ['src'],
    includePattern: '.+\\.jsx?$',
    // What is '\\\\'? Consider file
    // names begin with a special
    // character which requires escape
    // characters. Say, the file begin
    // with '$'. It has to be escaped
    // with '\', and becomes '\$'.
    // To represent '\$' as a string
    // literal in a programming code,
    // it will become '\\$'. Now, we
    // need to further make it into
    // a regular expression here,
    // and will become '\\\\$'.
    excludePattern: '(^|\\/|\\\\)(_|.+(test|spec)\\.js)',
  },
  opts: {
    recurse: true,
  },
};
