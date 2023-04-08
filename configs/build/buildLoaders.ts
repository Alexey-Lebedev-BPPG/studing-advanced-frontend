import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
// import { buildTypesciptLoader } from "./loaders/buildTypesciptLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";
import { buildSvgLoader } from "./loaders/buildSvgLoader";

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  // порядок лоадеров имеет значение, поэтому выносим в отдельные переменные

  // svg loader
  const svgLoader = buildSvgLoader();

  // loader для определенных форматов файлов (в данном случае .png, .jpeg, .gif. Сюда же можно подключать шрифты, просто
  // добавив их в регулярку)
  const fileLoader = buildFileLoader();

  // typescript loader (используем, если не настраиваем babel-loader, который сможет выполнять задачи ts-loadera)
  // const typescriptLoader = buildTypesciptLoader();

  // babelLoader для обычных файлов (.ts, .js)
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  // babelLoader для файлов .tsx, .jsx
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  // scss лоадер
  const scssLoaders = buildCssLoaders(options.isDev);

  return [
    // если писать на нативном js (без typescript), то нужно установить @babel/preset-reactnpm run build вместо typescriptLoader
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    // typescriptLoader,
    scssLoaders,
  ];
};
