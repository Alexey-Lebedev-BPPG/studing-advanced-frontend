export const buildBabelLoader = (isDev: boolean) => ({
  // ловим файлы .js, .jsx, .tsx
  test: /\.(js|jsx|tsx)$/,
  // исключаем node_modules
  exclude: /node_modules/,
  // для них исп. лоадер
  use: {
    loader: "babel-loader",
    options: {
      // при этом использовать preset-env, чтоб преобразовывать новые форматы в старые
      presets: ["@babel/preset-env"],
      // подключаем плагин для переводов
      plugins: [
        [
          "i18next-extract",
          {
            locales: ["ru", "en"],
            // будет доставать ключи из кода и автоматически подставлять их
            keyAsDefaultValue: true,
          },
        ],
        // добавляем плагин для горячей перезагрузки
        isDev && require.resolve("react-refresh/babel"),
        // если у нас какой-то плагин не добавится из-за условий, то в массив добавляется false.чтоб не подхватить этот false, делаем фильтрацию трушных занчений
      ].filter(Boolean),
    },
  },
});
