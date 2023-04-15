import { createContext } from 'react';
import { Theme } from '../../const/theme';

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

// делаем доступность темы по всему приложению
export const ThemeContext = createContext<ThemeContextProps>({});
