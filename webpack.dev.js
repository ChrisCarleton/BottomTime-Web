var CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');

var common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist/dev'),
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.BT_API_URL': process.env.BT_API_URL
		}),
		new CleanWebpackPlugin(['dist/dev'])
	]
});
