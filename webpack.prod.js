/* eslint-disable no-process-env */

const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	devtool: '',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist/prod'),
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.BT_ADMIN_EMAIL': JSON.stringify(process.env.BT_ADMIN_EMAIL),
			// Force React to compile in production mode.
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.BT_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.BT_GOOGLE_MAPS_API_KEY)
		})
	]
});
