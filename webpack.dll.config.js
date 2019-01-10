const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
  mode: 'production',

  entry: {
    vendor: ['react', 'react-dom', 'classnames',
      'mobx', 'mobx-react', 'axios', 'rc-animate', 'rc-dialog', 
       'lodash'
    ]
  },

  output: {
    filename: '[name].dll.js',
    library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist/[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    })
  ],
}