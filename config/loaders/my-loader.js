// 引用官方loader-utils辅助包
let { getOptions } = require("loader-utils");

/**
 * 主要转换方法，输入source，处理，输出
 */
function loader(source) {
  // 获取options
  const options = getOptions(this);

  console.log(options);

  return source;
}
module.exports = loader;
