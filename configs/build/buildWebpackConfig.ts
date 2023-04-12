import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { BuildOptions } from "./types/config";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export const buildWebpackConfig = (
  options: BuildOptions
): webpack.Configuration => {
  const { paths, mode, isDev, isDevDebug } = options;

  return {
    mode,
    // откуда начать сборку
    entry: paths.entry,
    // куда помещаем сборку и чистим лишнее
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      // добавляем для получения чанков из билда
      publicPath: "/",
    },
    // вызываем функцию со списком плагинов
    plugins: buildPlugins(options),
    module: {
      // вызываем функцию со списком лоудеров (обработка файлов, выходящих за рамки JS)
      rules: buildLoaders(options),
    },
    // вызываем функцию со списком resolves
    resolve: buildResolvers(options),
    // чтоб видеть в каком именно файле произошла ошибка(используем только в дев сборке)
    devtool: isDev ? "eval-cheap-module-source-map" : undefined,
    // чтоб при старте приложения запускать localhost(используем только в дев сборке)
    devServer: isDev ? buildDevServer(options) : undefined,
    stats: {
      // показ в консоли загрузку assets
      assets: isDevDebug,
      // показ в консоли загрузку модулей
      modules: isDevDebug,
      // показ в консоли ентрипоинтов
      entrypoints: isDevDebug,
    },
  };
};
