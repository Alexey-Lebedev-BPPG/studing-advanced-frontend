import { useEffect } from "react";

// хук предназначен для проверки переменной __PROJECT__ на значение сторибука или jest.
export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== "storybook" && __PROJECT__ !== "jest") callback();
    // ввиду того, что хук должен отрабатывать только один раз, не передаем в массив зависимостей колбэк
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
