export const buildSvgLoader = () => ({
  test: /\.svg$/,
  // исключаем node_modules
  exclude: /node_modules/,
  use: ["@svgr/webpack"],
});
