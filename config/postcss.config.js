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
  // precss: CSS变量
  // tailwindcss: CSS解决方案
  // postcss-import: CSS 中可用@import导入文件
  // postcss-cssnext: 使用下一个版本的CSS语法
  plugins: {
    "postcss-cssnext": {
      browsers: [
        // 兼容,不指定默认则是该插件默认范围,最近两个版本
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9",
      ],
      flexbox: "no-2009",
    },
    "postcss-import": {
      resolve: function(id) {
        return convertAlias(id);
      },
    },
    tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
    "postcss-url": true,
    precss: true,
  },
};
