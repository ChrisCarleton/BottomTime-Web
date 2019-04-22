const CleanWebpackPlugin = require('clean-webpack-plugin');
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
			// Force React to compile in production mode.
			'process.env.BT_API_URL': '\'https://api.bottomtime.ca/\''
		}),
		new CleanWebpackPlugin()
	]
});
