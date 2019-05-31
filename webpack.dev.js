/* eslint-disable no-process-env */

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
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.BT_API_URL': JSON.stringify(process.env.BT_API_URL),
			'process.env.BT_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.BT_GOOGLE_MAPS_API_KEY)
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
