const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    overrides: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'sourcemap',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      exclude: /node_modules/,
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    alias: {
      "src": path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new HandlebarsPlugin({
      entry: path.resolve(__dirname, 'src/manifest.tpl.hbs'),
      output: path.resolve(__dirname, 'dist/manifest.json'),
      data: {
        debug: process.env.NODE_ENV === 'development'
      }
    }),
    new CopyPlugin({
      patterns: [{
        from: 'public/reload.js', to: "reload.js",
      }, {
        from: "public/images", to: "images"
      }]
    })
  ],
  devServer: {
    port: 3001
  }
}
