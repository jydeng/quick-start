function MyWebpackPlugin(options) {
  console.log(options);
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyWebpackPlugin.prototype.apply = function(compiler) {
  // 绑定各种webpack hooks
  // https://webpack.docschina.org/api/compiler-hooks
  compiler.hooks.done.tap("my-plugin-processing", function(stats) {
    console.log("Hello World");
  });
};

module.exports = MyWebpackPlugin;
