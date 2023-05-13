import webpack from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { buildDevServer } from './buildDevServer';
import { BuildOptions } from './types/config';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

export const buildWebpackConfig = (
  options: BuildOptions,
): webpack.Configuration => {
  const { paths, mode, isDev, isDevDebug } = options;

  return {
    mode,
    // откуда начать сборку
    entry: paths.entry,
    // куда помещаем сборку и чистим лишнее
    output: {
      filename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[hash][ext]',
      path: paths.build,
      clean: true,
      // добавляем для получения чанков из билда
      publicPath: '/',
    },
    // вызываем функцию со списком плагинов
    plugins: buildPlugins(options),
    module: {
      // вызываем функцию со списком лоудеров (обработка файлов, выходящих за рамки JS)
      rules: buildLoaders(options),
    },
    // вызываем функцию со списком resolves
    resolve: buildResolvers(options),
    // различные оптимизационные моменты
    optimization: {
      mergeDuplicateChunks: true,
      minimize: !isDev,
      minimizer: [
        // для удаления комментов из сборки
        new TerserPlugin({
          terserOptions: { format: { comments: false } },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
      removeAvailableModules: true,
      sideEffects: true,
    },
    // чтоб видеть в каком именно файле произошла ошибка(используем только в дев сборке)
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    // чтоб при старте приложения запускать localhost(используем только в дев сборке)
    devServer: isDev ? buildDevServer(options) : undefined,
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
