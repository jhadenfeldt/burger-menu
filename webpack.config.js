const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


let config = {
	entry: [
		"font-awesome/scss/font-awesome.scss",
		'./src/resources/main.js'
	],
	output: {
		filename: './resources/[name].bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: "url-loader"
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader'
			},
		]
	}
};

if (process.env.NODE_ENV === 'development') {
	config = {
		...config,
		devServer: {
			contentBase: './dist'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html'
			})
		]
	};

	config.module.rules.push(
		{
			test: /\.scss$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "sass-loader", options: {
					sourceMap: true
				}
			}]
		}
	);
} else if (process.env.NODE_ENV === 'production') {
	config = {
		...config,
		plugins: [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				template: './src/index.html'
			}),
			new ExtractTextPlugin("resources/[name].bundle.css"),
		]
	};
	config.module.rules.push(
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}
	);

}

module.exports = config;
