export type BuildMode = "production" | "development";

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  // путь до файлов с переводами
  locales: string;
  // путь, куда переводы помещать
  buildLocales: string;
}

export interface BuildEnv {
  mode: BuildMode;
  modeDebug: boolean;
  port: number;
  apiURL: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  isDevDebug: boolean;
  port: number;
  apiURL: string;
  // создаем переменную для разделения сред выполнения
  project: "storybook" | "frontend" | "jest";
}
