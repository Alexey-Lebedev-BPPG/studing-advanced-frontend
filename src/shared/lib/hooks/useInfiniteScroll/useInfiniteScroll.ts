import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollProps {
  // колбек, который вызывается при достижении элемента при скролле
  callback?: () => void;
  // реф, при достижении которого будем тригерить функцию
  triggerRef: MutableRefObject<HTMLElement>;
  // контейнер, в котором появляется скролл
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    // чтоб не валились ошибки, изолируем рефы с помощью замыкания в данном эффекте
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        // контейнер, в котором скролл
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      // коллбек будет вызываться в тот момен, когда на экране появится элемент, за которым мы следим. Она принимает 2 параментра - entries (массив элементов, за которыми мы наблюдаем). С помощью деструктуризации сразу можно достать первый элемент(entry).
      observer = new IntersectionObserver(([entry]) => {
        // для того, чтоб колбэк отрабатывал один раз при достижении элемента (а не 2 раза)
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      // вызываем функцию наблюдения и передаем элемент, за которым будем следить
      observer.observe(triggerElement);
    }

    // не забываем при размонтировании закончить наблюдение
    return () => {
      if (observer && triggerElement) observer.unobserve(triggerElement);
    };
  }, [callback, triggerRef, wrapperRef]);
};
