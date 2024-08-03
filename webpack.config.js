const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const imgRule = { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' };

const cssRule = { test: /\.css$/i, use: ['style-loader', 'css-loader'] };

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

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  module: {
    rules: [cssRule, imgRule, fontRule, babelRule]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
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
