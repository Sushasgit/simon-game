const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const APP_DIR = path.resolve(__dirname, 'app');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV || 'development';
console.log(env)
console.log(APP_DIR)
module.exports = {
  entry: [`${APP_DIR}/index.jsx`],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  mode: env,
  devtool: env === 'development' ? 'source-map' : null,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'public', to: './public' }]),
    new HtmlWebPackPlugin({
      template: `${APP_DIR}/index.html`,
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    
  ],
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            dead_code: true,
            conditionals: true,
            booleans: true
          },
          module: false,
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
    ]
  }
};
