export const buildTypesciptLoader = () => ({
  // ловим файлы с .ts, .tsx
  test: /\.tsx?$/,
  // для них используем ts-loader
  use: "ts-loader",
  // исключаем node_modules
  exclude: /node_modules/,
});
