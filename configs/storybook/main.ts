import { Configuration, DefinePlugin, RuleSetRule } from "webpack";
import path from "path";
import { buildCssLoaders } from "../build/loaders/buildCssLoaders";
import { BuildPaths } from "../build/types/config";
import { buildSvgLoader } from "../build/loaders/buildSvgLoader";

export default {
  stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    // этот аддон добавляет сразу несколько аддонов, можно какие-то внутренние отключать
    {
      name: "@storybook/addon-essentials",
      options: {
        // отключаем дефолтный бэкграунд для тем
        backgrounds: false,
      },
    },
    "@storybook/addon-interactions",
    // аддон, чтоб мокать запросы в сторибуке
    "storybook-addon-mock",
    // чтоб не заморачиваться с созданием разных кнопок для разных тем, можно поставить аддон: https://storybook.js.org/addons/@dhruvkb/storybook-addon-themes
    "storybook-addon-themes",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  // чтоб переводы работали корректно
  staticDirs: ["../../public"],
  // создаем конфиг для сторибука. Это будет функция, которая будет принимать конфиг вебпака и возвращать его видоизмененным
  webpackFinal: async (config: Configuration) => {
    // создаем объект с характеристиками пути к главному файлу
    const paths: BuildPaths = {
      build: "",
      html: "",
      entry: "",
      // добавляем путь (выходим на 2 уровня вверх и берем src)
      src: path.resolve(__dirname, "..", "..", "src"),
      locales: "",
      buildLocales: "",
    };
    // добавляем путь в конфиг
    config!.resolve!.modules!.push(paths.src);
    // добавляем расширения для TS в конфиг
    config!.resolve!.extensions!.push(".ts", ".tsx");
    // добавляем алиасы, для поддержки абсолютных путей
    config!.resolve!.alias = {
      ...config!.resolve!.alias,
      "@": paths.src,
    };

    // пройдем по каждому лоадеру и находим правило, которое обрабатывает svg
    config!.module!.rules = config!.module!.rules!.map(
      (rule: RuleSetRule | "...") => {
        if (
          rule !== "..." &&
          rule.test instanceof RegExp &&
          rule.test.toString().includes("svg")
          //   &&
          //   /svg/.test(rule.test as unknown as string)
        ) {
          // берем все свойства правила и добавляем правило для исключения обработки свг (по дефолту в сторибуковской сборке стоит другой лоадер для SVG, мы используем svgr, поэтому необходимо его подменить)
          return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
      }
    );

    // и добавляем svg лоадер в rules
    config.module?.rules?.push(buildSvgLoader());

    // добавляем css лоадер для сторибука со значением isDev как true, т.к. сторибук будет использоваться только в дев-разработке
    config!.module!.rules.push(buildCssLoaders(true));

    // добавляем глобальную переменную
    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify("https://testapi.ru"),
        __PROJECT__: JSON.stringify("storybook"),
      })
    );

    return config;
  },
};
