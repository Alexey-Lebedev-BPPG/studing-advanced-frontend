import {
  FC,
  ImgHTMLAttributes,
  ReactElement,
  memo,
  useLayoutEffect,
  useState,
} from 'react';

export interface IAppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  // компонент для отрисовки при загрузке
  fallback?: ReactElement;
  // компонент для отрисовки при ошибке загрузки
  errorFallback?: ReactElement;
}

export const AppImage: FC<IAppImageProps> = memo(
  ({ className, src, alt = '', fallback, errorFallback, ...otherProps }) => {
    const [isLoading, setIsLoading] = useState(true);
    // если при загрузке произошла ошибка
    const [hasError, setHasError] = useState(false);

    // используем useLayoutEffect, чтоб действие синхронно происходило перед вмонтированием компонента
    useLayoutEffect(() => {
      // создаем изображение. В этот момент будет происходить фоновая подгрузка изображения
      const img = new Image();
      img.src = src || '';
      // когда изображение подгрузилось, меняем флаг на false
      img.onload = () => setIsLoading(false);
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }, [src]);

    if (isLoading && fallback) return fallback;

    if (hasError && errorFallback) return errorFallback;

    return <img src={src} alt={alt} className={className} {...otherProps} />;
  },
);
