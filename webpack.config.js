const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');



module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /.(png|jpg|svg|ttf|eot|woff|woff2|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'src/icon',
        },
      },
    ],
  },
  entry: './simple-piskel-clone/src/JavaScript/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, './simple-piskel-clone/src/html/index.html'),
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      {
        from: 'simple-piskel-clone/src/icon',
        to: './icon',
      },
    ]),
  ],
};
