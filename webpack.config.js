var webpack = require('webpack')
var path = require('path')
 
module.exports = {
  module: {
    loaders: [
 
      // ...
 
      // Css loader.
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      }
 
    ]
  },
  vue: {
    loaders: {
 
      // ...
 
      // Css loader for Webpack 1.x .
      css: 'vue-style-loader!css-loader'
    }
  }
}