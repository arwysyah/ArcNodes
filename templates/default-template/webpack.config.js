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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], 
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
    devMiddleware: {
      stats: "errors-only",
    },
    client: {
      logging: "none",
    },
  },
  infrastructureLogging: {
    level: 'error',
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    function () {
      this.hooks.done.tap("DonePlugin", (stats) => {
        console.log('\x1b[33m    Welcome to ArcNodes! \x1b[0m \n');
        console.log('\x1b[32mCompiled successfully!\x1b[0m \n');

        console.log("You can now view your app in the browser.\n");
        console.log(`\x1b[34mLocal:    http://localhost:9000\x1b[0m`);

        const os = require("os");
        const networkInterfaces = os.networkInterfaces();
        const networkAddress = Object.keys(networkInterfaces)
          .map((iface) => {
            return networkInterfaces[iface].find(
              (address) => address.family === "IPv4" && !address.internal
            )?.address;
          })
          .filter(Boolean)[0];
        console.log(`\x1b[34mNetwork:  http://${networkAddress}:9000\x1b[0m`);

        console.log(
          "\nNote that the development build is not optimized."
        );
      });
    },
  ],
  mode: "development",
  stats: "errors-only", // Only show errors
};
