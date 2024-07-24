import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

interface IObserver {
  handler?: any;
  id?: string;
  ref: MutableRefObject<HTMLElement | null>;
  rootMargin?: string;
  setState?: Dispatch<SetStateAction<boolean>>;
  threshold?: number;
}

export const useObserver = (props: IObserver) => {
  const { handler, id, ref, rootMargin, setState, threshold } = props;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        handler(id, entry.isIntersecting, setState);
      },
      { rootMargin, threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, id, handler, setState, threshold, rootMargin]);
};

export const useSimpleObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: any,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      handler(entry.isIntersecting);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, handler]);
};
