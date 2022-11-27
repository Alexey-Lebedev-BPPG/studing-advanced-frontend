import { BuildOptions } from "./types/config";
// переименовываем импорт, чтоб не было конфликта с Configuration вебпака
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => {
  return {
    // порт, на котором открывается приложение
    port: options.port,
    // открываем автоматически страницу в браузере при старте приложения
    open: true,
    // чтоб страницы не валились при перезагрузке
    historyApiFallback: true,
  };
};
