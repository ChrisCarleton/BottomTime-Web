var CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');

var common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'cheap-module-eval-source-map',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist/prod'),
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			// Force React to compile in production mode.
			'process.env.NODE_ENV': 'production',
			'process.env.BT_API_URL': 'https://api.bottomtime.ca/'
		}),
		new CleanWebpackPlugin(['dist/prod'])
	]
});
