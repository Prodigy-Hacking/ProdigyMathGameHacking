const path = require("path");
const glob = require("glob");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
	mode: "production",
	//devtool: "inline-source-map",
	entry: ["./src/index.ts", "./src/initiate.ts", ...glob.sync(path.join(__dirname, "src/@(hacks|utils)/**/*.ts"))],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["babel-loader", "ts-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.(txt|css)$/i,
				use: "raw-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [autoprefixer()],
						},
					},
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|ttf)$/i,
				use: [
					{
						loader: "file-loader",
						options: {},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			//favicon: "favicon.ico",
			template: "src/index.html",
		}),
	]
};
