// 统一引入所有svg图标，如果觉得太多的话，可以单独引入
// require.context 获取所有 *.svg 结尾的文件
let contexts = require.context(".", false, /\.svg$/);
let requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(contexts);
