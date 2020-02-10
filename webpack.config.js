/* jshint esversion: 10 */
/* eslint-disable */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		bundle: './src/index.jsx'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.jsx$/,
				exclude: '/node_modules/'
			},
			{
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				}),
				test: /\.css$/
			},
			{
				loader: 'file-loader',
				test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|wav|mp3|ico)$/
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};

/* eslint-enable */
