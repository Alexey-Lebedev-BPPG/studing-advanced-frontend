import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
import { buildTypesciptLoader } from "./loaders/buildTypesciptLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";
import { buildSvgLoader } from "./loaders/buildSvgLoader";

export const buildLoaders = ({
  isDev,
}: BuildOptions): webpack.RuleSetRule[] => {
  // порядок лоадеров имеет значение, поэтому выносим в отдельные переменные

  // svg loader
  const svgLoader = buildSvgLoader();

  // loader для определенных форматов файлов (в данном случае .png, .jpeg, .gif. Сюда же можно подключать шрифты, просто
  // добавив их в регулярку)
  const fileLoader = buildFileLoader();

  // typescript loader
  const typescriptLoader = buildTypesciptLoader();

  // babelLoader
  const babelLoader = buildBabelLoader(isDev);

  // scss лоадер
  const scssLoaders = buildCssLoaders(isDev);

  return [
    // если писать на нативном js (без typescript), то нужно установить @babel/preset-reactnpm run build вместо typescriptLoader
    fileLoader,
    svgLoader,
    babelLoader,
    typescriptLoader,
    scssLoaders,
  ];
};
