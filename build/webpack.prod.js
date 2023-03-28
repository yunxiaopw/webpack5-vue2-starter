const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const threadLoader = require('thread-loader');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base');
// 并行构建
threadLoader.warmup(
  {
    workers: 2,
    workerParallelJobs: 50,
  },
  [
    // 子进程中需要预加载的 node 模块
    'css-loader',
    'postcss-loader',
    'less-loader',
  ],
);
const prodConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name]-[contenthash:7].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
  },
  devtool: 'source-map',
  optimization: {
    minimize: true, // 代码压缩和混淆
    minimizer: [
      '...',
      new TerserPlugin({
        terserOptions: {
          ecma: 6, // ECMAScript 版本
          compress: {
            drop_console: true, // 删除console
          },
          output: {
            comments: false, // 删除掉代码中所有注释
            beautify: false, // 不必要的空格
          },
        },
      }),
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all'
    },
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: '[name]-[contenthash:7].css' })],
};

module.exports = merge(prodConfig, baseConfig);
