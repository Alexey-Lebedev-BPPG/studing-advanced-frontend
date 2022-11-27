import webpack from "webpack";
import htmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildPlugins = ({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  return [
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
  ];
};
