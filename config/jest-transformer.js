const config = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-modules-commonjs', { allowTopLevelThis: true }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-transform-runtime'],
  ],
};
module.exports = require('babel-jest').createTransformer(config);
