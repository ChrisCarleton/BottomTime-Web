var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

module.exports = {
	entry: {
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
								"@babel/preset-env",
								{
									"targets": "> 0.25%, not dead"
								}
							],
							"@babel/preset-react"
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
				test: /(\.png$|\.jpg$|\.jpeg$)/,
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
	resolve : {
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
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				},
				default: {
					minChunks: 2,
					priority: 5,
					chunks: 'all'
			  	}
			}
		}
	}
};
