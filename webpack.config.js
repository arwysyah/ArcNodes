const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
    compress: true,
    port: 9000,
    open: true,
    watchFiles: ["index.html", "src/**/*.js"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  mode: "development",
  watch: true,
};
