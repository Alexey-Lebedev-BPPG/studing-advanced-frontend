import { FC, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import cls from './Page.module.scss';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getScrollSavePath, scrollSaveActions } from '@/features/ScrollSave';
import { PAGE_ID } from '@/shared/const/pageId';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

export interface IPageProps extends TestProps {
  children: ReactNode;
  className?: string;
  // функция для отработки при достижении конца страницы
  onScrollEnd?: () => void;
}

// компонент для оборачивания страниц, который применяет некоторые стили для всех страниц
export const Page: FC<IPageProps> = ({
  children,
  className,
  onScrollEnd,
  ...otherProps
}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  // получаем позицию скролла из редакса по нашей странице
  const scrollPosition = useSelector(
    (state: StateSchema) => getScrollSavePath(state, pathname),
    // eslint-disable-next-line function-paren-newline
  );

  useInfiniteScroll({ callback: onScrollEnd, triggerRef, wrapperRef });

  // возвращаем страницу на позицию
  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  // функция сохранения скролла
  const onScrollHandler = useThrottle((event: UIEvent<HTMLDivElement>) => {
    // получаем значение в пикселях от крайней точки сверху и записываем в редакс
    dispatch(
      scrollSaveActions.setScrollPosition({
        path: pathname,
        position: event.currentTarget.scrollTop,
      }),
    );
  });

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      id={PAGE_ID}
      data-testid={otherProps['data-testid'] || 'Page'}
      onScroll={onScrollHandler}
    >
      {children}
      {!!onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
    </main>
  );
};
