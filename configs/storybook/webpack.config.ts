import path from "path";
import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import { buildCssLoaders } from "../build/loaders/buildCssLoaders";
import { buildSvgLoader } from "../build/loaders/buildSvgLoader";
import { BuildPaths } from "../build/types/config";

// создаем конфиг для сторибука. Это будет функция, которая будет принимать конфиг вебпака и возвращать его видоизмененным
export default ({ config }: { config: webpack.Configuration }) => {
  // создаем объект с характеристиками пути к главному файлу
  const paths: BuildPaths = {
    build: "",
    html: "",
    entry: "",
    // добавляем путь (выходим на 2 уровня вверх и берем src)
    src: path.resolve(__dirname, "..", "..", "src"),
  };
  // добавляем путь в конфиг
  config.resolve!.modules = [paths.src, "node_modules"];
  // добавляем расширения для TS в конфиг
  config.resolve?.extensions?.push(".ts", ".tsx");

  // пройдем по каждому лоадеру и находим правило, которое обрабатывает svg
  // eslint-disable-next-line no-param-reassign
  config.module!.rules = config.module?.rules?.map(
    (rule: RuleSetRule | "...") => {
      if (
        rule !== "..." &&
        rule.test instanceof RegExp &&
        rule.test.toString().includes("svg")
      ) {
        // берем все свойства правила и добавляем правило для исключения обработки свг (по дефолту в сторибучной сборке стоит другой лоадер для SVG, мы используем svgr, поэтому необходимо его подменить)
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    }
  );

  // и добавляем svg лоадер в rules
  config.module?.rules?.push(buildSvgLoader());

  // добавляем css лоадер для сторибука со значением isDev как true, т.к. сторибук будет использоваться только в дев-разработке
  config.module?.rules?.push(buildCssLoaders(true));

  // добавляем глобальную переменную
  config.plugins?.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __IS_DEV_DEBUG__: JSON.stringify(true),
      __API__: JSON.stringify(""),
    })
  );

  return config;
};
