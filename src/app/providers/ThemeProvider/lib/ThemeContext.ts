import { createContext } from "react";

export enum Theme {
  // eslint-disable-next-line no-unused-vars
  LIGHT = "light",
  // eslint-disable-next-line no-unused-vars
  DARK = "dark",
}

export interface ThemeContextProps {
  theme?: Theme;
  // eslint-disable-next-line no-unused-vars
  setTheme?: (theme: Theme) => void;
}

// делаем доступность темы по всему приложению
export const ThemeContext = createContext<ThemeContextProps>({});
// делаем значение темы доступным при закрытии и открыти браузера
export const LOCAL_STORAGE_THEME_KEY = "theme";
