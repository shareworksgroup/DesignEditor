var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
  const entry = {
    index: options.mode === 'development' ? './index.tsx' : './entry.ts'
  };
  const output = options.mode === 'development' ? {
    filename: '[name].js'
  } : {
    filename: '[name].js',
    library: 'design-editor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  };
  return {
    mode: 'production',

    devServer: {
      contentBase: path.join(__dirname, "../dist"),
      host: 'localhost',
      compress: true,
      port: 8095
    },
    context: path.join(__dirname, '../src'),
    resolve: {
      modules: [
        path.join(__dirname, '../src'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
    },
    entry,
    output,
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
          use: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
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
      new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        hash: true,
        inject: true,
        chunks: ['index'],
        template: 'index.html',
        filename: 'index.html'
      })
    ],
    externals: [{
      "tinymce": "tinymce"
    }]
  };
};