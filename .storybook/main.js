const { DefinePlugin } = require('webpack');
const {
  graphQL: { getUnionAndInterfaceTypes },
} = require('@magento/pwa-buildpack');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const webjumpOverrideMappingPlugin = require('./override-plugin');
const cmaMapping = require('../fallback-mapping');

process.env.MAGENTO_BACKEND_URL =
  'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/';

const isEE = true;

module.exports = {
  stories: ['./venia-components/**.stories.js', '../lib/**/*.stories.[tj]s'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-docs',
    'storybook-design-token',
  ],
  webpackFinal: async config => {
    config.module.rules[0].exclude = [/node_modules\/(?!(@magento)\/).*/];
    config.resolve.extensions.push(isEE ? '.ee.js' : '.ce.js');
    config.resolve.alias['@magento/venia-drivers'] =
      '@magento/venia-ui/lib/drivers';

    const cssRule = config.module.rules.find(
      ({ test }) => test.toString() === '/\\.css$/',
    );

    if (cssRule) {
      cssRule.use[1].options.modules = {
        localIdentName: '[name]-[local]-[hash:base64:3]',
      };

      cssRule.use.push({
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './',
          },
        },
      });
    }

    config.module.rules.push({
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules\/(?!(@magento)\/).*/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.s[ca]ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    });

    const parsedMapping = Object.entries(cmaMapping)
      .map(map => {
        map[1] = map[1].replace('@webjump/colmeia', '.');
        return map;
      })
      .reduce((result, current) => {
        result[current[0]] = current[1];
        return result;
      }, {});

    const unionAndInterfaceTypes = await getUnionAndInterfaceTypes();
    config.plugins.push(
      new DefinePlugin({
        UNION_AND_INTERFACE_TYPES: JSON.stringify(unionAndInterfaceTypes),
      }),
      new SVGSpritemapPlugin(['lib/assets/**/*.svg'], {
        output: {
          filename: 'sprites.svg',
        },
        sprite: {
          generate: {
            use: true,
          },
        },
      }),
      new webjumpOverrideMappingPlugin(parsedMapping),
    );

    return config;
  },
};
