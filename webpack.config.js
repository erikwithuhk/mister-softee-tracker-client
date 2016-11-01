const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'index.jsx'),
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 8080,
  },
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
