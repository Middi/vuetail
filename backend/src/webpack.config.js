/* eslint-env node */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

/* `process.env.NODE_ENV` is required for postcss.config.js to be able to read from its env variable */
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    main: './js/main.js',
  },
  output: {
    filename: 'js/[name]-bundle.js',
    path: path.resolve(__dirname, '../static/build'),
    publicPath: '/static/build',
  },
  devtool: devMode ? 'source-map' : false, // Cheap source maps don't work with UglifyJSPlugin
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { sourceMap: devMode },
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules'],
              sourceMap: devMode,
            },
          },
          // Reads Sass vars from files or inlined in the options property
          {
            loader: '@epegzz/sass-vars-loader',
            options: {
              syntax: 'scss',
              files: [path.resolve(__dirname, 'js/config/config.js')],
            },
          },
        ],
      },
      {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src',
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src',
              name: '[path][name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [{ collapseGroups: false }, { cleanupIDs: false }],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),

    /*
     * Extract styles to CSS file
     */
    new MiniCssExtractPlugin({
      filename: './css/main.css',
      chunkFilename: './css/[id].css',
    }),

    // Vue single file component loading
    new VueLoaderPlugin(),

    /*
     * Linting
     */
    new StyleLintPlugin(),

    /*
     * SVG sprite map
     * Spritemap plugin will only include svg files prefixed with `sprite-` to ensure we are only exposing files we need
     */
    new SVGSpritemapPlugin('./src/img/svg/**/sprite-*.svg', {
      output: {
        filename: './img/svg/svg-symbols.svg',
      },
      sprite: {
        prefix: false,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ],
  resolve: {
    modules: ['node_modules', 'js'],
  },
  devServer: {
    https: true,
    overlay: true,
    port: 9000,
    watchContentBase: true,
  },

  /*
  Important:
  In order to avoid multiple instances of jQuery loading into the page
  we are dictating that the whole site make use of the drupal jQuery.

  Without this certain pages would display inconsistencies, as they are
  unable to access Drupal properties.

  The key example of this is any page using views or other forms of pagination.

  The core jQuery is now included as a library dependency on the bundle js
  on the theme itself (included in numiko.libraries.yml).
  */
  externals: {
    jquery: 'jQuery',
    Stripe: 'Stripe',
  },
};
