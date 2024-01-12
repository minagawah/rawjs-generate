module.exports = api => {
  const is_test = api.env('test');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          targets: '> 0.25%, not dead',
          corejs: 3,
          targets: is_test
            ? { node: 'current' }
            : {
                esmodules: true,
              },
          debug: false,
        },
      ],
    ],
    plugins: [
      'preval', // Allows 'module.exports'
    ],
  };
};
