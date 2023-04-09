// переименовываем импорт, чтоб не было конфликта с Configuration вебпака
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => ({
  // порт, на котором открывается приложение
  port: options.port,
  // открываем автоматически страницу в браузере при старте приложения
  open: true,
  // чтоб страницы не валились при перезагрузке
  historyApiFallback: true,
  // для горячей перезагрузки (чтоб при изменениях в коде не обновлять страницу)
  hot: true,
});
