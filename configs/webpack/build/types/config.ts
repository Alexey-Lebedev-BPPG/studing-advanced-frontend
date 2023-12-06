export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  build: string;
  // путь, куда переводы помещать
  buildLocales: string;
  entry: string;
  html: string;
  icon?: string;
  // путь до файлов с переводами
  locales: string;
  src: string;
  // envPath: string;
}

export interface BuildEnv {
  apiURL: string;
  mode: BuildMode;
  modeDebug: string;
  port: string;
  // SENTRY_AUTH_TOKEN?: string;
  // SENTRY_ORG?: string;
  // SENTRY_RELEASE?: string;
  // SENTRY_PROJECT?: string;
}

export interface BuildOptions {
  apiURL: string;
  isDev: boolean;
  isDevDebug: boolean;
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
  // создаем переменную для разделения сред выполнения
  project: 'storybook' | 'frontend' | 'jest';
  // sentryToken: string;
  // sentryRelease: string;
  // sentryOrg: string;
  // sentryProject: string;
}
