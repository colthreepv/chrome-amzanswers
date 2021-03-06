const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackCommon = require('./common.config')

const env = require('../env')
const proxyRules = require('../proxy/rules')

// webpack plugins
const ReloadChrome = require('./browser.plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = webpackMerge(webpackCommon, {

  devtool: 'inline-source-map',

  output: {

    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/',

  },

  module: {

    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
            },
          },
        ],
      },
    ],

  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'",
      },
    }),
    new ReloadChrome(),
  ],

  devServer: {
    host: env.devServer.host || 'localhost',
    port: env.devServer.port || 3000,
    open: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    proxy: proxyRules,
  },

})
