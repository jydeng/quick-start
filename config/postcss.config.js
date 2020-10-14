const path = require("path");

/**
 * 替换@import中的别名信息
 * @param {*} id
 * @returns
 */
function convertAlias(id) {
  let aliasName;
  const ALIAS_CONFIG = JSON.parse(process.env.ALIAS);
  const ALIAS_NAME = Object.keys(ALIAS_CONFIG);
  for (let i = 0, size = ALIAS_NAME.length; i < size; i++) {
    if (id.indexOf(ALIAS_NAME[i]) !== -1) {
      aliasName = ALIAS_NAME[i];
      break;
    }
  }
  return aliasName ? id.replace(aliasName, ALIAS_CONFIG[aliasName]) : id;
}

module.exports = {
  // precss: 类似sass语法，并支持未来语法
  // tailwindcss: CSS解决方案
  // postcss-import: CSS 中可用@import导入文件
  plugins: {
    "postcss-import": {
      resolve: function(id) {
        return convertAlias(id);
      },
    },
    "postcss-url": true,
    tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
    precss: true,
  },
};
