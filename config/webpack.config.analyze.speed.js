const prod = require("./webpack.config.prod");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();
const webpackConfig = smp.wrap(prod);

module.exports = webpackConfig;
