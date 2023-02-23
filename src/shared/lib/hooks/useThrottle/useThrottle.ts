import { useCallback, useRef } from "react";

export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number = 500
) => {
  // реф, который хранит все булевые значения, которые показывают можно сейчас вызывать колбек или нет
  const throttleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      // делаем условие, при котром когда реф будет равен false
      if (!throttleRef.current) {
        callback(...args);
        // передаем тру, чтобы считать, что этот колбек выполнился
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
};

// то есть другими словами, мы вызываем колбек (10) и делаем реф трушным, поэтому все остальные вызовы колбека будут проигнорированы. И только тогда, когда мы выполним таймаут по окончанию, новый колбек выполнится заново
