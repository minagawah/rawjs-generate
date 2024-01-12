module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // eslint-plugin-prettier
    'prettier',
  ],
  plugins: ['prettier', '@stylistic'],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      arrowFunctions: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        paths: ['./src'],
      },
    },
  },
  rules: {
    // '@stylistic/max-len': [
    //   'error',
    //   {
    //     code: 60,
    //     ignoreComments: true,
    //     ignoreStrings: true,
    //     ignoreTemplateLiterals: true,
    //   },
    // ],
  },
  globals: {
    PUBLIC_URL: 'readonly',
    NODE_ENV: 'readonly',
  },
};
