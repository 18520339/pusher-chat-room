/* jshint esversion: 10 */
/* eslint-disable */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
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
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
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
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		})
	]
};

/* eslint-enable */
