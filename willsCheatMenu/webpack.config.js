const path = require("path");
const glob = require("glob");
const autoprefixer = require("autoprefixer");
module.exports = {
	mode: "production",
	entry: ["./src/index.ts", ...glob.sync(path.join(__dirname, "src/@(hacks|utils)/**/*.ts"))],
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
					"css-loader",
					"postcss-loader",
					"sass-loader",
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
};
