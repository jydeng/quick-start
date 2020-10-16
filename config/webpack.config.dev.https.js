const fs = require("fs");
const path = require("path");
const { merge } = require("webpack-merge");
const dev = require("./webpack.config.dev");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge(dev, {
  devServer: {
    host: "jydeng.dev",
    port: 80,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./https/jydeng.dev-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./https/jydeng.dev.pem")),
    },
  },
  plugins: [
    // 美化输出
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: https://jydeng.dev`],
      },
      clearConsole: true,
    }),
  ],
});
