const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src/');
const port = 12333

module.exports = {
    context: SRC_PATH,
    mode: "development",
    entry: {
        main: './main.ts',
        // html: './index.html',
    },
    output: {
    publicPath: `http://localhost:${port}/`,
      filename: 'packed.js'
    },
    module: {
      rules: [
        {
          test: /\.ts/,
          use: 'ts-loader',
          exclude: /(?:node_modules)/
        }, {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader' //将JS字符串生成style节点
              }, {
                loader: 'css-loader' //将Css转换为CommonJs模块
              }, {
                loader: 'sass-loader' //将Sass编译成Css
              }
            ]
          }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.css', '.scss', '.ts']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: port,
        proxy: {
          '/api': {
             target: 'ws://[address]:[port]',
             ws: true
          },
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(SRC_PATH, 'index.html')
        })
    ],
  }