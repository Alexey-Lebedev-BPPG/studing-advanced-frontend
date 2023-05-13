export const buildSvgLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  test: /\.svg$/,
  use: ['@svgr/webpack'],
});
