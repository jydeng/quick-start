const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");

module.exports = merge(base, {
  // 模式
  mode: "production",
  // devTool配置
  devtool: "source-map",
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
    // 清空目录
    new CleanWebpackPlugin(),
    // 剥离样式文件
    new MiniCssExtractPlugin({
      filename: `[name]_[contenthash:8].css`,
    }),
    // CSS去空格、注释
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
      },
      cssnanoOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
    }),
  ],
});
