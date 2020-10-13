const { merge } = require("webpack-merge");
const prod = require("./webpack.config.prod");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(prod, {
  plugins: [
    // 代码体积分析
    new BundleAnalyzerPlugin(),
  ],
});
