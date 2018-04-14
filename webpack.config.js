const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
     'babel-polyfill',
     'react-hot-loader/patch',
    './src/index.jsx'
  ],
  module: {
     rules: [
       {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']
       }
     ]
   },
    resolve: {
     extensions: ['*', '.js', '.jsx']
   },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
