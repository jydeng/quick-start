const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge(base, {
  // 模式
  mode: "development",
  // devTool配置
  devtool: "inline-source-map",
  // devServer配置
  devServer: {
    quiet: true,
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
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
    // 美化输出
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:8080`],
      },
      clearConsole: true,
    }),
  ],
});
