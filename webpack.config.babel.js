import path from 'path';

export default {
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: __dirname,
    filename: 'dist/collections.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
