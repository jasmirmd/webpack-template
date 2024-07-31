const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssRule = { test: /\.css$/i, use: ['style-loader', 'css-loader'] };
const imgRule = { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' };
const fontRule = { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' };

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  module: {
    rules: [ cssRule, imgRule, fontRule ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    })
  ],

  devServer: {
    hot: true,
    open: true,
    port: 8080,
    watchFiles: ['public/*.html'],
    client: {
      overlay: true
    }
  }
};