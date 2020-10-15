module.exports = {
  // 移除未使用的CSS
  purge: {
    // 始终启用purge，不启用则tailwindCSS文件过大，编译速度很慢
    enabled: true,
    content: ["./src/**/*.html", "./src/**/*.vue"],
  },
  theme: {},
  variants: {},
  plugins: [],
  // 兼容即将到来的2.0
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    standardFontWeights: true,
  },
};
