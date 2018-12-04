var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包


module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    compress: true,
    port: 8095
  },
  context: path.join(__dirname, 'src'),
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      '@store': path.join(__dirname, 'src/store'),
      'components': path.join(__dirname, 'src/components'),
      'containers': path.join(__dirname, 'src/containers'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.mess']
  },
  entry: {
    index: './index.jsx',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /(\.js)|(\.jsx)|(\.ts)|(\.tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0', "mobx"],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.mess$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[local]__[hash:base64:5]', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '/sources/images/[name].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      chunks: ['index'],
      template: 'index.html',
      filename: 'index.html'
    })
  ]
}  