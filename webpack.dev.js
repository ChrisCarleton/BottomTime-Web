/* eslint-disable no-process-env */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist/dev'),
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.BT_API_URL': process.env.BT_API_URL
		}),
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
});
