import webpack, { DefinePlugin, HotModuleReplacementPlugin } from "webpack";
import htmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/config";

export const buildPlugins = ({
  paths,
  isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const plugins = [
    // генерим главный html (index.tsx) из пути src, чтоб в него встраивались скрипты
    new htmlWebpackPlugin({
      template: paths.html,
    }),
    // показывает прогресс сборки
    new webpack.ProgressPlugin(),
    // чтоб файлы css в сборке находились отдельно (не внутри js файла)
    new MiniCssExtractPlugin({
      // название на выходе
      filename: "css/[name].[contenthash:8].css",
      // название для чанков
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    // с ним можно прокидывать глобальные переменные в само приложение
    new DefinePlugin({
      // называем переменные таким образом, чтоб четко понимать где переменные вебпака, а где приложения
      __IS_DEV__: JSON.stringify(isDev), // теперь эта переменная доступна в коде (например, файл i18n.ts)
    }),
  ];

  // данные плагины добавляем, только если не продакш сборка
  if (isDev) {
    // для горячей перезагрузки (чтоб при изменениях в коде не обновлять страницу)
    // впоследствии поменяем на ReactRefreshWebpackPlugin
    plugins.push(new HotModuleReplacementPlugin());
    // включаем плагин анализа размера пакетов
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
