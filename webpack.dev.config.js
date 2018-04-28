const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer){});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ],
  devServer: {
    proxy: {// 连接到后台服务的代理
      '/api_push': {
        // target: 'https://rest-hangzhou.goeasy.io',
        target: 'ws://192.168.3.28:8080',
        // target: 'http://love-jocks.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api_push': ''
        }
      },
      '/api_mock': {
        target: 'http://127.0.0.1:8033/f5316eca2fff7e000fd9',
        // target: 'http://localhost:3000', // 连接到测试服务的代理
        changeOrigin: true,
        pathRewrite: {
          '^/api_mock': ''
        }
      },
      '/api': {
        target: 'http://127.0.0.1:9902',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});