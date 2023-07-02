import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
  // добавляем пропс, чтоб мы могли менять тему извне
  initialTheme?: Theme;
}

// не используем memo в компонентах, где у нас есть children
// чтоб иметь глобальный доступ к темам в любых компонентах
const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  // получаем тему из редакса
  const { theme: defaultTheme } = useJsonSettings();
  // для того, чтоб useEffect сработал только один раз, делаем флаг
  const [isThemeInited, setIsThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(
    initialTheme || defaultTheme || Theme.LIGHT,
  );
  // навешиваем стили темы на боди
  document.body.className = theme;

  // чтоб не инициировалась тема только дефолтная, нужно отслеживать ее изменение и поменять
  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  useEffect(() => {
    // навешиваем класс темы на боди, т.к. у нас теперь общий скролл
    document.body.className = theme;
  }, [theme]);

  const defaultProps = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

// не забываем обернуть все приложение провайдером в index.tsx, чтоб доступ был во всем приложении
export default ThemeProvider;
