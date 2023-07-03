import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export const buildWebpackConfig = (
  options: BuildOptions,
): webpack.Configuration => {
  const { isDev, isDevDebug, mode, paths } = options;

  return {
    // чтоб при старте приложения запускать localhost(используем только в дев сборке)
    devServer: isDev ? buildDevServer(options) : undefined,
    // чтоб видеть в каком именно файле произошла ошибка(используем только в дев сборке)
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    // откуда начать сборку
    entry: paths.entry,
    mode,
    module: {
      // вызываем функцию со списком лоудеров (обработка файлов, выходящих за рамки JS)
      rules: buildLoaders(options),
    },
    // различные оптимизационные моменты
    optimization: {
      mergeDuplicateChunks: true,
      minimize: !isDev,
      minimizer: [
        // для удаления комментов из сборки
        new TerserPlugin({
          extractComments: false,
          terserOptions: { format: { comments: false } },
        }),
        new CssMinimizerPlugin(),
      ],
      removeAvailableModules: true,
      sideEffects: true,
    },
    // куда помещаем сборку и чистим лишнее
    output: {
      assetModuleFilename: 'assets/[name].[hash][ext]',
      clean: true,
      filename: 'js/[name].[contenthash].js',
      path: paths.build,
      // добавляем для получения чанков из билда
      publicPath: '/',
    },
    // вызываем функцию со списком плагинов
    plugins: buildPlugins(options),
    // вызываем функцию со списком resolves
    resolve: buildResolvers(options),
    stats: {
      // показ в консоли загрузку assets
      assets: Boolean(isDevDebug),
      // показ в консоли загрузку модулей
      entrypoints: Boolean(isDevDebug),
      // показ в консоли ентрипоинтов
      modules: Boolean(isDevDebug),
    },
  };
};
