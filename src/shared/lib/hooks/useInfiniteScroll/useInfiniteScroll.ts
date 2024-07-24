import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollProps {
  // колбэк, который вызывается при достижении элемента при скролле
  callback?: () => void;
  // реф, при достижении которого будем триггерить функцию
  triggerRef: MutableRefObject<Element>;
  // контейнер, в котором появляется скролл
  wrapperRef?: MutableRefObject<Element>;
}

export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    // чтоб не валились ошибки, изолируем рефы с помощью замыкания в данном эффекте
    // также, если нам не поступает wrapperRef, то мы задаем null, что будет значить, что будет отслеживаться скролл от глобального родителя
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        // контейнер, в котором скролл
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      // колбэк будет вызываться в тот момент, когда на экране появится элемент, за которым мы следим. Она принимает 2 параметра - entries (массив элементов, за которыми мы наблюдаем). С помощью деструктуризации сразу можно достать первый элемент(entry).
      observer = new IntersectionObserver(([entry]) => {
        // для того, чтоб колбэк отрабатывал один раз при достижении элемента (а не 2 раза)
        if (entry.isIntersecting) callback();
      }, options);

      // вызываем функцию наблюдения и передаем элемент, за которым будем следить
      triggerElement instanceof Element && observer.observe(triggerElement);
    }

    // не забываем при размонтировании закончить наблюдение
    return () => {
      if (observer && triggerElement) observer.unobserve(triggerElement);
    };
  }, [callback, triggerRef, wrapperRef]);
};

// import { useCallback, useRef } from 'react';

// export interface UseInfiniteScrollOptions {
//   callback: () => void;
// }

// export function useInfiniteScroll({ callback }: UseInfiniteScrollOptions) {
//   const observer = useRef<null | IntersectionObserver>(null);

//   const currentRef = useCallback(
//     (node: HTMLElement | null) => {
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver(
//         entries => {
//           if (entries[0].isIntersecting) callback();
//         },
//         { rootMargin: '0px', threshold: 1 },
//       );
//       if (node) observer.current.observe(node);
//     },
//     [callback],
//   );
//   return { currentRef };
// }
