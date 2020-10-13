const path = require("path");
const project = require("./project");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  // 入口文件
  entry: { app: "./src/main.js" },
  // 输出
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "../dist"),
  },
  // 设置一些常用路径的别名，方便业务开发者导入
  resolve: {
    // 自动补全的扩展名
    extensions: [".js", ".vue", ".json"],
    // 获取别名信息
    alias: require("./alias").getAlias(),
  },
  module: {
    rules: [
      // 使用Babel处理js文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  // 3: 实现对于实例方法的支持
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        exclude: /node_modules/,
        use: [
          // 图片size小于10K自动转成base64
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: `assets/images/[name].[ext]`,
            },
          },
          // 压缩图片
          {
            loader: "img-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: `assets/fonts/[name].[ext]`,
            },
          },
        ],
      },
      // 处理.vue文件
      {
        test: /\.vue$/,
        use: ["vue-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // 生成html文件
    new HtmlWebpackPlugin({
      title: project.name,
      filename: "index.html",
      template: path.resolve(__dirname, "../src/template.html"),
    }),
    // 启动HMR
    new webpack.HotModuleReplacementPlugin(),
    // 处理*.vue文件
    new VueLoaderPlugin(),
    // 美化输出
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    // 开启Scope Hoisting
    concatenateModules: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 使用 cache，加快二次构建速度
        cache: true,
        // 开启多线程压缩，减少构建时间
        parallel: true,
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
        terserOptions: {
          comments: false,
          compress: {
            // 删除无用的代码
            unused: true,
            // 删掉 debugger
            drop_debugger: true,
            // 移除 console
            drop_console: true,
            // 移除无用的代码
            dead_code: true,
          },
        },
      }),
    ],
    splitChunks: {
      // 三选一： "initial" | "all" | "async" (默认)
      chunks: "all",
      // 最小尺寸，30K，development 下是10k，越大那么单个文件越大，
      // chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
      minSize: 30000,
      // 文件的最大尺寸，0为不限制，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
      maxSize: 0,
      // 默认1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
      minChunks: 1,
      // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
      maxAsyncRequests: 5,
      // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了
      maxInitialRequests: 3,
      // 打包文件名分隔符
      automaticNameDelimiter: "~",
      // 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个
      name: true,
      cacheGroups: {
        vendors: {
          name: "vendors",
          // 正则规则，如果符合就提取 chunk
          test: /[\\/]node_modules[\\/]/,
          // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
          priority: -10,
        },
        default: {
          name: "bundle",
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
          reuseExistingChunk: true,
        },
      },
    },
  },
};
