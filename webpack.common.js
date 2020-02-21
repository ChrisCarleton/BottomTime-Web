const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		polyfill: '@babel/polyfill',
		controls: './web/components/controls.js',
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
				test: /\.(eot|ttf|woff2?)$/,
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
		extensions: [ '.js', '.jsx', '.html' ]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'web/index.html',
			favicon: 'web/img/favicon.ico'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new CompressionWebpackPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(jsx?|css|less|png|jpe?g|gif|svg|eot|ttf|woff2?)$/i
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					test: /\/node_modules\//,
					priority: 20
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
