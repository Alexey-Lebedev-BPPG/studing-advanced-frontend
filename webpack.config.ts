import path from 'path';
import webpack from 'webpack';
// import clear from 'clear';
import { buildWebpackConfig } from './configs/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './configs/build/types/config';

// функция на получение дефолтного апи адреса
const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
  if (apiUrl) return apiUrl;
  if (mode === 'production') return '/api';
  return 'http://localhost:8000';
};

// заводим такую функцию, а не просто возвращаем конфиг, чтоб можно было прокидывать сюда переменные окружения
export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    // откуда стартует приложение
    // если хотим указать динамически name для файлов, то исп. так
    // entry:{
    //   // указываем название файла (RANDOM) и, если у нас стоит filename: "[name].js",
    //   // то будет файл с названием RANDOM
    //   RANDOM: path.resolve(__dirname, "src", "index.tsx")
    // }
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // куда помещаем готовую сборку
    build: path.resolve(__dirname, 'build'),
    // сообщаем где главный файл html лежит и куда будем встраивать скрипты
    html: path.resolve(__dirname, 'public', 'index.html'),
    // указываем путь до папки src, чтоб использовать его в buildResolves
    src: path.resolve(__dirname, 'src'),
    // указываем путь до папки, откуда берем готовые файлы переводов
    locales: path.resolve(__dirname, 'public', 'locales'),
    // указываем путь до папки, куда помещаем готовые файлы переводов
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    // если нужно указать путь к иконкам в паблике
    // icon: path.resolve(__dirname, 'public', 'logo.svg'),
  };

  // берем env из параметра функции
  const mode = env?.mode || 'development';
  const PORT = env?.port || 3000;
  const apiURL = getApiUrl(mode, env?.apiURL);

  const isDev = mode === 'development';
  const isDevDebug = Boolean(JSON.stringify(env?.modeDebug)) || false;

  // генерируем общий конфиг webpack
  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    isDevDebug,
    port: PORT,
    apiURL,
    project: 'frontend',
  });

  // для очистки консоли после изменения файлов
  if (process.env.NODE_ENV !== 'production') {
    // альтернативный вариант без установки библы clear, однако криво очищает консоль
    const clearConsole = () => {
      process.stdout.write(
        process.platform === 'win32'
          ? '\x1B[2J\x1B[0f'
          : '\x1B[2J\x1B[3J\x1B[H',
      );
    };

    webpack(config).watch({}, (err, stats) => {
      if (!err && stats && !stats.hasErrors() && !stats.hasWarnings())
        clearConsole();
      // с помощью библы clear
      // if (!err && stats && !stats.hasErrors() && !stats.hasWarnings()) clear();
    });
  }

  return config;
};
