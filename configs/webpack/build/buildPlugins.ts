// для оптимизации загрузки приложения (https://million.dev/)
// import MillionLint from '@million/lint';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
// import Dotenv from 'dotenv-webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import htmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';
// import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

export const buildPlugins = (props: BuildOptions): Configuration['plugins'] => {
  const {
    apiURL,
    isDev,
    isDevDebug,
    paths,
    project,
    // sentryToken,
    // sentryRelease,
    // sentryOrg,
    // sentryProject,
  } = props;

  const isProd = !isDev;

  const plugins = [
    // генерим главный html (index.tsx) из пути src, чтоб в него встраивались скрипты
    // eslint-disable-next-line new-cap
    new htmlWebpackPlugin({
      // путь для фавконки
      favicon: paths.icon,
      inject: true,
      minify: isProd
        ? {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          }
        : undefined,
      template: paths.html,
    }),
    // можно использовать для того, чтоб в html использовать переменные такого типа: . Для этого подключаем такую библу (const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')) и первым аргументом прокидываем HtmlWebpackPlugin, а вторым переменные, которые хотим туда прокидывать.
    // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // с ним можно прокидывать глобальные переменные в само приложение
    new DefinePlugin({
      // называем переменные таким образом, чтоб четко понимать где переменные вебпака, а где приложения
      __API__: JSON.stringify(apiURL), // теперь эта переменная доступна в коде (например, файл i18n.ts)
      __IS_DEV__: JSON.stringify(isDev), // теперь эта переменная доступна в коде (например, файл i18n.ts)
      __IS_DEV_DEBUG__: JSON.stringify(isDevDebug),
      __PROJECT__: JSON.stringify(project),
      'process.env': JSON.stringify(process.env),
    }),
    // проверяет круговые зависимости в проекте
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      // чтоб при нахождении зависимостей вылетала ошибка в консоли
      failOnError: isDevDebug,
    }),
    // для .env
    // new Dotenv({ systemvars: true }),
    // плагин для анализа бейблом ошибок тайпскрипта и вынесение его в отдельный процесс
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: { semantic: true, syntactic: true },
        mode: 'write-references',
      },
    }),
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist', 'build', 'build-esbuild'],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      formatter: 'stylish',
    }),
    // для файлов manifest
    // new WebpackManifestPlugin({
    //   fileName: 'asset-manifest.json',
    //   publicPath: '/',
    //   generate: (seed, files, entrypoints) => {
    //     const manifestFiles = files.reduce((manifest, file) => {
    //       manifest[file.name] = file.path;
    //       return manifest;
    //     }, seed);
    //     const entrypointFiles = entrypoints.main.filter(
    //       fileName => !fileName.endsWith('.map')
    //     );

    //     return {
    //       files: manifestFiles,
    //       entrypoints: entrypointFiles,
    //     };
    //   },
    // }),
  ];

  // данные плагины добавляем, только если не продакш сборка
  if (isDev)
    // добавляем плагин для hot reload
    // plugins.push(new HotModuleReplacementPlugin());
    // для горячей перезагрузки (чтоб при изменениях в коде не обновлять страницу)
    // впоследствии поменяем на ReactRefreshWebpackPlugin
    plugins.push(new ReactRefreshWebpackPlugin());
  // для оптимизации загрузки приложения (https://million.dev/)
  // plugins.push(MillionLint.webpack());

  if (isDevDebug)
    plugins.push(
      // показывает прогресс сборки
      new webpack.ProgressPlugin(),
      // включаем плагин анализа размера пакетов
      new BundleAnalyzerPlugin(),
    );

  if (isProd) {
    //  для сентри
    // plugins.push(
    //   sentryWebpackPlugin({
    //     authToken: sentryToken,
    //     debug: Boolean(isDevDebug),
    //     org: sentryOrg,
    //     project: sentryProject,
    //     release: {
    //       finalize: false,
    //       name: sentryRelease,
    //       setCommits: { auto: true },
    //     },
    //     silent: !isDevDebug,
    //   }),
    // );
    // чтоб файлы css в сборке находились отдельно (не внутри js файла)
    plugins.push(
      new MiniCssExtractPlugin({
        // название для чанков
        chunkFilename: 'css/[name].[contenthash:8].css',
        // название на выходе
        filename: 'css/[name].[contenthash:8].css',
      }),
    );
    // используем плагин, чтоб переместить файлы переводов в сборке
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: paths.locales, to: paths.buildLocales }],
      }),
    );
  }

  return plugins;
};
