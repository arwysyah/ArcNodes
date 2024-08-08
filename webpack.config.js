const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
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
      directory: path.resolve(__dirname), // Serve files from the examples directory
    },
    compress: true,
    port: 9000,
    open: true,
    watchFiles: ["src/**/*", "examples/**/*"], // Watch files in both src and examples folders
    // client: {
    //   logging: "info",
    //   overlay: true,
    // },
  },
  resolve: {
    extensions: [".js"], // Automatically resolve these extensions
  },
  plugins: [
    ,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"), // Use index.html as a template
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: "development",
};
