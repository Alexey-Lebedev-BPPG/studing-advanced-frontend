import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export const buildLoaders = ({
  isDev,
}: BuildOptions): webpack.RuleSetRule[] => {
  // порядок лоадеров имеет значение, поэтому выносим в отдельные переменные

  // typescript loader
  const typescriptLoader = {
    // ловим файлы с .ts, .tsx
    test: /\.tsx?$/,
    // для них используем ts-loader
    use: "ts-loader",
    // исключаем node_modules
    exclude: /node_modules/,
  };

  // scss лоадер
  const scssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings (создает стили из строк JS)
      // "style-loader",
      // вместо style-loader добавляем лоадер для модулей
      // в режиме разработки style-loader, иначе MiniCssExtractPlugin (чтоб не генерировать css файлы для прода)
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS (траслирует CSS в CommonJS)
      {
        loader: "css-loader",
        // добавляем options чтоб включить модули
        options: {
          modules: {
            // если в расширении файла есть .module., то применяем к нему изменение классов на хеши
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            // генерируем название классов для дев сбоки(путь до компонента, название класса и в конце хеш)
            // и продукт сборки
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      // Compiles Sass to CSS (преобразовывает Sass в CSS)
      "sass-loader",
    ],
  };

  return [
    // если писать на нативном js (без typescript), то нужно установить babel-loader вместо typescriptLoader
    typescriptLoader,
    scssLoaders,
  ];
};
