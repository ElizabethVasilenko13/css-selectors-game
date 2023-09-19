const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    mode,
    devtool: 'source-map',
    module: {
        rules: [
            {
              test: /\.(c|sa|sc)ss$/i,
              use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [require('postcss-preset-env')],
                    },
                  },
                },
              'sass-loader',
              ],
            },
            {
              test: /\.html$/i,
              loader: "html-loader",
              options: {
                minimize: false
              }
            },
            {
              test: /\.ts$/i,
              use: 'ts-loader'
            },
            {
              test: /\.(png|jpg|jpeg|gif|svg)$/i,
              type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        assetModuleFilename: 'assets/[name][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new EslingPlugin({ extensions: 'ts' }),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
    ],
    devServer: {
      port: 8000,
      open: true,
      // hot: true,
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};

