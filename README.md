# Colmeia

- [Colmeia](#Colmeia)
- [Access](#Access)
- [Usage](#Usage)
- [Css](#Css)
- [FallbackMapping](#FallbackMapping)
- [Add new svg icons to sprite](#add-new-svg-icons-to-sprite)
- [Configuring SASS](#configuring-sass)
- [Dependencies with PWA Studio](#dependencies-with-pwa-studio)
- [peer-dependency](#peer-dependency)
- [Autoprefix](#autoprefix)
- [Contributing](#contributing)

# Access

**[https://colmeia.now.sh/](https://colmeia.now.sh/)**

# Usage

```shell
yarn add @cristianodmtsb/colmeia
```

Then open the `webpack.config.js` file, find the usage of `configureWebpack` method and add the following block inside the `special` node:

```javascript
'@cristianodmtsb/colmeia': {
    cssModules: true,
    esModules: true,
    graphqlQueries: true,
    rootComponents: false,
    upward: false
}
```

It will be like this:

```javascript
special: {
    'react-feather': {
        esModules: true
    },
    '@magento/peregrine': {
        esModules: true,
        cssModules: true
    },
    '@magento/venia-ui': {
        cssModules: true,
        esModules: true,
        graphqlQueries: true,
        rootComponents: true,
        upward: true
    },
    '@cristianodmtsb/colmeia': {
        cssModules: true,
        esModules: true,
        graphqlQueries: true,
        rootComponents: false,
        upward: false
    }
},
```


## Css 

Add the css from colmeia in `src/index.js`

```javascript
import '@cristianodmtsb/colmeia/lib/index.css';
```

## FallbackMapping

Add the plugin to map the Venia fallback files that Colmeia is using.

Open your `webpack.config.js`, import the Colmeia's fallback file.

```javascript
const cmaMapping = require('@cristianodmtsb/colmeia/fallback-mapping');
```

In `clientConfig.plugins` add `cristianodmtsbOverrideMappingPlugin`. The **overrideMapping** is the other pluging to fallback, is 
recommended to use this way. 

```javascript
...
new cristianodmtsbOverrideMappingPlugin(
  Object.assign(cmaMapping, overrideMapping);
),
...
```

## Add new svg icons to sprite

To work with SVG icons in your project all you have to do is run the following command to install [svg-spritemap-webpack-plugin](https://github.com/cascornelissen/svg-spritemap-webpack-plugin) and configure it in your project.

```shell
yarn add -D svg-spritemap-webpack-plugin

npm install svg-spritemap-webpack-plugin --save-dev
```

In the webpack configuration file of your project add **SVGSpritemapPlugin**.

```javascript
clientConfig.plugins = [
        ...clientConfig.plugins,

        new DefinePlugin({
            /**
             * Make sure to add the same constants to
             * the globals object in jest.config.js.
             */
            UNION_AND_INTERFACE_TYPES: JSON.stringify(
                unionAndInterfaceTypes
            ),
            STORE_NAME: JSON.stringify('Venia')
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new cristianodmtsbOverrideMappingPlugin(
            Object.assign(cmaMapping, overrideMapping)
        ),

        //Add SVGSpritemapPlugin   
        new SVGSpritemapPlugin([
         'src/assets/icons/**/*.svg',
         './node_modules/@cristianodmtsb/colmeia/lib/assets/**/*.svg',
        ], {
           output: {
               filename: 'sprites.svg',
           },
           sprite: {
               generate: {
                   use: true
               }
           }
        })
    ];
```

Finally, remove the previous svg loader package that is no longer needed by running. 
**if you were not using the previous loader, ignore this step.**

```shell
yarn remove svg-sprite-loader

npm uninstall svg-sprite-loader
```

Then remove the following lines from `src/index.js`.

```javascript
- const files = require.context(
-  '!svg-sprite-loader!./assets/icons',
-   false,
-   /.*\.svg$/,
- );
- files.keys().forEach(files);
```

## Configuring SASS

To configure SASS, you need to install these dev dependencies:

```shell 
yarn add --dev sass-loader node-sass
```

Then edit the `webpack.config.js` and add a new rule to clientConfig

```javascript
clientConfig.module.rules.push({
  rules: [
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
```

# Dependencies with PWA Studio

This library uses a peer dependency on two PWA Studio libraries:

- venia-ui
- peregrine

The idea of this library is to have custom components based on `venia-ui` and custom logic (hooks) based on `peregrine`.

## peer-dependency

We use peer-dependency to keep the project version of `venia-ui` and `peregrine`.

When this library is imported in a project as a library it will consider the project version instead of the version set in this library.

# Autoprefix

Follow these steps to configure the autoprefix in your project:

1. Install the dependencies with `yarn add --dev postcss-preset-env`

2. Edit the webpack.config.js with this code after the plugins:

```javascript
clientConfig.module.rules.push({
    test: /\.css$/,
    use: [{
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            config: {
                path: './node_modules/@cristianodmtsb/colmeia'
            }
        }
    }],
});
```

# Contributing

Make sure to read the [contribution guidelines](CONTRIBUTION.md)
