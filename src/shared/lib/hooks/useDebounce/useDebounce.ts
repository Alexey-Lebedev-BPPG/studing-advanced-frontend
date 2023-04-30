import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number = 500,
) => {
  // реф, который хранит таймер
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
    (...args: any[]) => {
      // если в таймер уже сохранен какой-то таймаут, то мы его очищаем
      if (timer.current) clearTimeout(timer.current);

      // иначе мы записываем в таймер таймаут вызова колбека
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

// то есть другими словами, мы вызываем колбек (10) и делаем реф трушным, поэтому все остальные вызовы колбека будут проигнорированы. И только тогда, когда мы выполним таймаут по окончанию, новый колбек выполнится заново
