module.exports = {
  // 移除未使用的CSS
  purge: {
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
