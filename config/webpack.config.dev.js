const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");
// const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge(base, {
  // 模式
  mode: "development",
  // devTool配置
  devtool: "eval-cheap-module-source-map",
  // devServer配置
  devServer: {
    // 模块热刷新
    hot: true,
    // 静默
    quiet: true,
    // base目录
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "./postcss.config.js"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 启动HMR
    // new webpack.HotModuleReplacementPlugin(),
    // 美化输出
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:8080`],
      },
      clearConsole: true,
    }),
  ],
});
