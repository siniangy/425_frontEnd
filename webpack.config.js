const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		app: './src/page/app.js',
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.join(__dirname, "./public/javascripts"),
		filename: "[name].js",
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
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},
	devServer: {
		contentBase: './',
		port: 3000
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};