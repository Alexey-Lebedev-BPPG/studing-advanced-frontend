import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (options: BuildOptions): ResolveOptions => ({
  // если оставляем пустым, то ничего добавляться к путям не будет.если указать например "@",
  // то к путям она будет добавляться (например, если указать "@": paths.src, то вместо src/test будет указываться
  // @/src/test). Лучше использовать, чтоб не было возможных конфликтов с библиотеками. Если здесь указываем, что также добавляем в tsconfig.json в поле paths
  alias: { '@': options.paths.src },
  // для кого не указываем расширения файлов в конце названия
  extensions: ['.tsx', '.ts', '.js'],

  // убираем сурс мапы для определенных библиотек (связано с криптой)
  // fallback: {
  //   assert: require.resolve('assert'),
  //   crypto: require.resolve('crypto-browserify'),
  //   'crypto-browserify': require.resolve('crypto-browserify'),
  //   fs: false,
  //   http: require.resolve('stream-http'),
  //   https: require.resolve('https-browserify'),
  //   net: false,
  //   os: require.resolve('os-browserify'),
  //   path: false,
  //   stream: require.resolve('stream-browserify'),
  //   tls: false,
  //   url: require.resolve('url'),
  //   zlib: false,
  // },

  // для каждого модуля файл index.ts(index.tsx) будет главным
  mainFiles: ['index'],
  // указываем путь для папки src и node_modules
  modules: [options.paths.src, 'node_modules'],
  // делает абсолютные пути приоритетными
  preferAbsolute: true,
});
