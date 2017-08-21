module.exports = {
  entry: './handler.js',
  target: 'node',
	rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
};
