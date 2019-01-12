module.exports = api => {
  const babelEnv = api.env();

  return {
    presets: getPresets(babelEnv),
    plugins: getPlugins(babelEnv),
    exclude: 'node_modules/**',
  };
};

function getPresets(babelEnv) {
  const basePresets = [
    [
      '@babel/preset-env',
      {
        modules: babelEnv === 'test' ? 'commonjs' : false,
        debug: !!process.env.DEBUG,
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: babelEnv === 'development',
      },
    ],
    '@babel/preset-typescript',
  ];

  return basePresets;
}

function getPlugins(babelEnv) {
  const basePlugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'babel-plugin-styled-components',
      { displayName: babelEnv === 'development' },
    ],
  ];

  if (babelEnv === 'test') {
    return [...basePlugins, 'dynamic-import-node'];
  }

  return basePlugins;
}
