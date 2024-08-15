const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const os = require("os");

const LOG_FILE = path.resolve(__dirname, '.webpack-log');

function shouldLog() {
  if (fs.existsSync(LOG_FILE)) {
    return false;
  } else {
    fs.writeFileSync(LOG_FILE, 'logged');
    return true;
  }
}

function clearLog() {
  if (fs.existsSync(LOG_FILE)) {
    fs.unlinkSync(LOG_FILE);
  }
}

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
      logging: "error",
      overlay: false,
    },
    setupMiddlewares: (middlewares, devServer) => {
      clearLog();
      return middlewares;
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
        if (shouldLog()) {
          console.log('\x1b[33m    Welcome to ArcNodes! \x1b[0m \n');
          console.log('\x1b[32mCompiled successfully!\x1b[0m \n');
          console.log("You can now view your app in the browser.\n");
          console.log(`\x1b[34mLocal:    http://localhost:9000\x1b[0m`);

          const networkInterfaces = os.networkInterfaces();
          const networkAddress = Object.keys(networkInterfaces)
            .map((iface) => {
              return networkInterfaces[iface].find(
                (address) => address.family === "IPv4" && !address.internal
              )?.address;
            })
            .filter(Boolean)[0];
          console.log(`\x1b[34mNetwork:  http://${networkAddress}:9000\x1b[0m`);
          console.log("\nNote that the development build is not optimized yet.");
        }
      });
    },
  ],
  mode: "development",
  stats: "errors-only",
};
