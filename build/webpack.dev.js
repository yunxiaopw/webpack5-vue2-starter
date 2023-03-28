const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const WebpackBar = require('webpackbar');

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    hot: true,
    open: true,
    port: '9527',
  },
  devtool: 'eval-source-map',
  experiments: {
    lazyCompilation: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar()
  ],
};

module.exports = merge(devConfig, baseConfig);
