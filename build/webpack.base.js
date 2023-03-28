const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { compilerOptions } = require('vue-template-compiler')
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  target: 'web',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve('../src'),
        options: {
          compilerOptions: {
            ...compilerOptions,
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        include: path.resolve('../src'),
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        type: "asset",
        generator: {
          filename: "images/[name]-[contenthash:7][ext]", // 局部指定输出位置， 防止缓存问题
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  大于 8kb，asset 选择用 asset/resource 处理它； 小于 8kb，asset 选择用 asset/inline 处理它。
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
        generator: {
          filename: "fonts/[name]-[contenthash:7][ext]", // 局部指定输出位置， 防止缓存问题
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  大于 8kb，asset 选择用 asset/resource 处理它； 小于 8kb，asset 选择用 asset/inline 处理它。
          },
        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: "webpack5-vue2-stater"
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    new ESLintPlugin(),
  ],
  devServer: {
    hot: true,
    open: true,
    port: "9527",
  },
}
