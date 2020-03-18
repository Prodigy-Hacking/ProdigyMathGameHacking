const path = require("path");
const glob = require("glob");
module.exports = {
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
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|[to]tf)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
			  }
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
