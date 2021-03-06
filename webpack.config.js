/* jshint esversion: 10 */
/* eslint-disable */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
	const isDevMode = options.mode === 'development';
	const dist = __dirname + '/dist';
	return {
		entry: './src/index.jsx',
		node: {
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			dns: 'empty'
		},
		resolve: {
			extensions: ['*', '.js', '.jsx', '.mjs']
		},
		output: {
			path: dist,
			publicPath: '/',
			filename: '[name].[chunkhash].js',
			chunkFilename: '[name].[chunkhash].js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react'
							],
							plugins: ['@babel/plugin-proposal-class-properties']
						}
					}
				},
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader']
				},
				{
					test: /\.s[ac]ss$/i,
					use: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'images'
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|ttf|otf|eot)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'fonts'
							}
						}
					]
				},
				{
					test: /\.(wav|mp3)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'media'
							}
						}
					]
				}
			]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/,
						name: 'vendor',
						chunks: 'all'
					}
				}
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'public/index.html'
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				ignoreOrder: false
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				'window.$': 'jquery'
			})
		],
		devtool: isDevMode && 'source-map',
		devServer: {
			https: true,
			port: 6969,
			open: true,
			disableHostCheck: true,
			historyApiFallback: true,
			overlay: true,
			stats: 'minimal',
			inline: true,
			compress: true
		}
	};
};

/* eslint-enable */
