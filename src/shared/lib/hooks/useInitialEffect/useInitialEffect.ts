import { useEffect } from 'react';

// хук предназначен для проверки переменной __PROJECT__ на значение сторибука или jest.
export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') callback();
    // ввиду того, что хук должен отрабатывать только один раз, не передаем в массив зависимостей колбэк
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// import { useEffect, useRef, useState } from 'react';

// // this will be called once when component renders
// // this hook will not work with React.StrictMode
// export const useInitialEffect = (effect: () => void | (() => void)) => {
//   const effectFn = useRef<() => void | (() => void)>(effect);
//   const destroyFn = useRef<void | (() => void)>();
//   const effectCalled = useRef(false);
//   const rendered = useRef(false);
//   const [, setVal] = useState<number>(0);
//   if (effectCalled.current) rendered.current = true;

//   useEffect(() => {
//     if (!effectCalled.current) {
//       destroyFn.current = effectFn.current();
//       effectCalled.current = true;
//     }
//     setVal(val => val + 1);
//     return () => {
//       if (!rendered.current) return;

//       if (destroyFn.current) destroyFn.current();
//     };
//   }, []);
// };
