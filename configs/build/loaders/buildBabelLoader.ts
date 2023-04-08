import { BuildOptions } from "../types/config";
import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";

interface BuildBabelLoaderProps extends BuildOptions {
  isDev: boolean;
  // указывает, чтоб можно было отдельно работать с .ts  и отдельно с .tsx файлами
  isTsx: boolean;
}

export const buildBabelLoader = ({ isDev, isTsx }: BuildBabelLoaderProps) => ({
  // ловим файлы .js, .jsx, .ts, .tsx (при этом, в зависимости от переменной, обрабатываем млм то, или то)
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
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
        // добавляем плагин для парсинга jsx и обработки тайпскрипта
        ["@babel/plugin-transform-typescript", { isTsx }],
        // плагин для ускорения сборки
        "@babel/plugin-transform-runtime",
        // добавляем наш кастомный плагин для tsx файлов, который будет удалять определенные атрибуты в продакшн сборке
        isTsx && [babelRemovePropsPlugin, { props: ["data-testid"] }],
        // добавляем плагин для горячей перезагрузки
        isDev && require.resolve("react-refresh/babel"),
        // если у нас какой-то плагин не добавится из-за условий, то в массив добавляется false.чтоб не подхватить этот false, делаем фильтрацию трушных занчений
      ].filter(Boolean),
    },
  },
});
