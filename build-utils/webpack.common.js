const path = require("path");
const Dotenv = require("dotenv-webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "..", "./dist"),
    publicPath: "/",
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Title from webpack config file",
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env"),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "..", "./dist"),
    historyApiFallback: true,
  },
};
