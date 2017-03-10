// webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {

  entry: {
    'app': [
      './src/bootstrap.ts',
    ],
    'vendor': './src/vendor.ts',
  },

  resolve: {

    extensions: ['.ts', '.js', '.scss'],

    modules: ['node_modules'],

  },

  module: {

    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: ['node_modules'],
        loader: ['babel-loader', 'ts-loader'],
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
      },

      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader?limit=10000',
      },

    ],

  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity,
    }),
  ],

}
