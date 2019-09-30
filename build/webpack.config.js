var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const entry = {
    index: !isProduction ? './index.tsx' : './entry.ts'
  };
  const output = !isProduction ? {
    filename: '[name].js'
  } : {
    filename: '[name].js',
    library: 'design-editor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  };
  const plugins = [new BundleAnalyzerPlugin()];
  if (isProduction) {
    plugins.push(new PeerDepsExternalsPlugin());
  } else {
    plugins.push(new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      chunks: ['index'],
      template: 'index.html',
      filename: 'index.html'
    }));
  }
  return {
    mode: options.mode,

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
    plugins,
    externals: [{
      "tinymce": "tinymce"
    }]
  };
};