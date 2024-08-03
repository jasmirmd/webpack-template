const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const imgRule = { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' };

const cssRule = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader']
};

const fontRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource'
};

const babelRule = {
  test: /\.(?:js|mjs|cjs)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { targets: 'defaults' }]]
    }
  }
};

const miniCssRule = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader']
};

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  module: {
    rules: [cssRule, imgRule, fontRule, babelRule, miniCssRule]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],

  devServer: {
    client: {
      overlay: true
    },
    watchFiles: ['src/*.html'],
    hot: true,
    open: true,
    port: 8080
  }
};
