const path = require("path");

module.exports = {
  /**
   * 获取别名
   */
  getAlias() {
    let alias = {
      "@app": path.join(process.cwd(), "src"),
      "@styles": path.join(process.cwd(), "src/styles"),
      "@assets": path.join(process.cwd(), "src/assets"),
      "@utils": path.join(process.cwd(), "src/utils"),
    };

    // 缓存别名信息, postcss 接下来会用到
    process.env.ALIAS = JSON.stringify(alias);
    return alias;
  },
};
