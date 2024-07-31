// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const imgRule = { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' };

const cssRule = {
  test: /\.css$/i,
  include: path.resolve(__dirname, 'src'),
  use: ['style-loader', 'css-loader', 'postcss-loader']
};

const fontRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource'
};

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  module: {
    rules: [cssRule, imgRule, fontRule]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    client: {
      overlay: true
    },
    watchFiles: ['src/*.html'],
    hot: true,
    open: true,
    port: 8080,
    compress: true,
    historyApiFallback: true
  }
};
