var CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');

var common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/dev'),
		publicPath: '/'
	},
	plugins: [
		new CleanWebpackPlugin(['dist/dev'])
	]
});
