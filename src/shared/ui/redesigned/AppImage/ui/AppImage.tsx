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
  // компонент для отрисовки при ошибке загрузки
  errorFallback?: ReactElement;
  // компонент для отрисовки при загрузке
  fallback?: ReactElement;
}

export const AppImage: FC<IAppImageProps> = memo(props => {
  const {
    alt = '',
    className,
    errorFallback,
    fallback,
    src,
    ...otherProps
  } = props;

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

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading='lazy'
      style={{ contentVisibility: 'auto' }}
      decoding='async'
      {...otherProps}
    />
  );
});
