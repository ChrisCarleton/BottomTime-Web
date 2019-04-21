var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		polyfill: '@babel/polyfill',
		main: './web/app.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									'targets': '> 0.25%, not dead'
								}
							],
							'@babel/preset-react'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img/'
					}
				}
			},
			{
				test: /\.(eot|svg|ttf|woff2?)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}
			}
		]
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'web')
		],
		extensions: ['.js', '.jsx', '.html']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'web/index.html',
			favicon: 'web/img/favicon.ico'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.HashedModuleIdsPlugin()
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					test: /\/node_modules\//
					// name(currentModule) {
					// 	var packageName = currentModule.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
					// 	return `npm.${ packageName.replace('@', '') }`;
					// }
				},

				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	}
};
