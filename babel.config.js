module.exports = function (api) {
  api.cache(false);

  const presets = [
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': [
            '>0.25%',
            'not ie 11',
            'not op_mini all',
          ],
        },
      },
    ],
    'next/babel',
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    ['styled-components', { 'ssr': true }],
  ];

  return {
    presets,
    plugins,
  };
};
