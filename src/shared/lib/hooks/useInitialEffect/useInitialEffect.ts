import { useEffect } from "react";

// хук предназначен для проверки переменной __PROJECT__ на занчение сторибука.
export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== "storybook") callback();
    // ввиду того, что хук должен отрабатывать только один раз, не передаем в массив зависимостей колбэк
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
