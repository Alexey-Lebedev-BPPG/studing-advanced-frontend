import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export const buildResolvers = (options: BuildOptions): ResolveOptions => {
  return {
    // для кого не указываем расширения файлов в конце названия
    extensions: [".tsx", ".ts", ".js"],
    // делает абсолютные пути приоритетными
    preferAbsolute: true,
    // указываем путь для папки src и node_modules
    modules: [options.paths.src, "node_modules"],
    // если оставляем пустым, то ничего добавляться к путям не будет.если указать например "@",
    // то к путям она будет добаляться (например, если указать "@": paths.src, то вместо src/test будет указываться
    // @/src/test)
    alias: {},
    // для каждого модуля файл index.ts(index.tsx) будет главным
    mainFiles: ["index"],
  };
};
