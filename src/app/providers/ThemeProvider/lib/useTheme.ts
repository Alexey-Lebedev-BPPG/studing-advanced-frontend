import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  // достаем переменную темы и функцию ее изменения
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme = Theme.LIGHT;

    if (theme === Theme.DARK) newTheme = Theme.LIGHT;
    if (theme === Theme.LIGHT) newTheme = Theme.ORANGE;
    if (theme === Theme.ORANGE) newTheme = Theme.DARK;

    // делаем такой вызов, что указать, что функция существует
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || Theme.LIGHT, toggleTheme };
};
