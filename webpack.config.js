'use strict';

const webpack = require("webpack");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const DEVMODE = NODE_ENV === 'dev';
const PRODMODE = NODE_ENV === 'production';

module.exports = {
	context: path.resolve(__dirname + '/src'),
	entry:  './scripts/app',
	output: {
		path: path.resolve(__dirname + '/public/js'),
		publicPath: '/js/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.less']
	},
	module:  {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname + '/src/scripts'),
				loader: "babel-loader",
				query: {
					presets: ['es2015', 'react'],
					plugins: ["transform-decorators-legacy"]
				}
			},
			{
        test: /\.less$/,
				include: path.resolve(__dirname + '/src/less'),
        loader: ExtractTextPlugin.extract({
					use: 'css-loader!less-loader'
				})
      }
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
			reload: true,
			notify: true,
			server: ['./public'],
    	files: ['./public']
    }),
		new ExtractTextPlugin({
			filename: '../css/style.css',
			allChunks: true
		})
  ],
	watch: DEVMODE,
	devtool: DEVMODE ? 'cheap-module-inline-source-map' : false
};

//uglify
if (PRODMODE) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: false,
        unsafe: true
      }
    }),
		new webpack.DefinePlugin({
	    "process.env": {
	      "NODE_ENV": JSON.stringify("production")
	    }
	  })
	);
}
