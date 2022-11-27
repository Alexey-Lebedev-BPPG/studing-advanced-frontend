import path from "path";
import webpack from "webpack";
import { buildWebpackConfig } from "./configs/build/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./configs/build/types/config";

// заводим такую функцию, а не просто возращаем конфиг, чтоб можно было прокидывать сюда переменные окружения
export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    // откуда стартует приложение
    // если хотим указать динамички name для файлов, то исп. так
    // entry:{
    //   // указываем название файла (RANDOM) и, если у нас стоит filename: "[name].js",
    //   // то будет файл с названием RANDOM
    //   RANDOM: path.resolve(__dirname, "src", "index.tsx")
    // }
    entry: path.resolve(__dirname, "src", "index.tsx"),
    // куда помещаем готовую сборку
    build: path.resolve(__dirname, "build"),
    // сообщаем где главный файл html лежит и куда будем встраивать скрипты
    html: path.resolve(__dirname, "public", "index.html"),
    // указываем путь до папки srcб чтоб использовать его в buildResolves
    src: path.resolve(__dirname, "src"),
  };

  // берем env из параметра функции
  const mode = env.mode || "development";
  const PORT = env.port || 3000;

  const isDev = mode === "development";

  // генерируем общий конфиг webpack
  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });

  return config;
};
