const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/page/app.js',
	output: {
		path: path.join(__dirname, "./public/javascripts"),
		filename: "bundle.js",
	},
	mode: 'development',
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(jpg|png|otf)$/,
			loader: 'url?limit=8192'
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
		}]
	}
};