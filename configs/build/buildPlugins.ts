import webpack, { DefinePlugin, HotModuleReplacementPlugin } from "webpack";
import htmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { BuildOptions } from "./types/config";

export const buildPlugins = ({
  paths,
  isDev,
  isDevDebug,
  apiURL,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const plugins = [
    // генерим главный html (index.tsx) из пути src, чтоб в него встраивались скрипты
    new htmlWebpackPlugin({
      template: paths.html,
    }),
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
      __IS_DEV_DEBUG__: JSON.stringify(isDevDebug), // теперь эта переменная доступна в коде (например, файл i18n.ts)
      __API__: JSON.stringify(apiURL),
      __PROJECT__: JSON.stringify(project),
    }),
    // используем плагин, чтоб переместить файлы переводов в сборке
    new CopyPlugin({
      patterns: [{ from: paths.locales, to: paths.buildLocales }],
    }),
    // проверяет круговые зависимости в проекте
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      // чтоб при нахождении зависимостей вылетала ошибка в консоли
      failOnError: true,
    }),
    // плагин для анализа бейблом ошибок тайпскрипта и вынесение его в отдельный процесс
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ];

  // данные плагины добавляем, только если не продакш сборка
  if (isDev) {
    // добавляем плагин для hot reload
    plugins.push(new ReactRefreshWebpackPlugin());
    // для горячей перезагрузки (чтоб при изменениях в коде не обновлять страницу)
    // впоследствии поменяем на ReactRefreshWebpackPlugin
    plugins.push(new HotModuleReplacementPlugin());
  }

  if (isDevDebug) {
    plugins.push(
      // показывает прогресс сборки
      new webpack.ProgressPlugin(),
      // включаем плагин анализа размера пакетов
      new BundleAnalyzerPlugin()
    );
  }

  return plugins;
};
