import { ElementType, useMemo } from 'react';
import cls from './Text.module.scss';
import {
  ITextProps,
  TTagName,
  TextSize,
  mapSizeToHeaderTag,
} from '../model/types';
import { classNames } from '@/shared/lib/classNames/classNames';

// маппер, который определяет размер
const mapSizeToClass: Record<TextSize, string> = {
  l: cls['size-l'],
  m: cls['size-m'],
  s: cls['size-s'],
};

export const Text = <T extends ElementType = TTagName>(
  props: ITextProps<T>,
) => {
  const {
    align = 'left',
    as = 'p',
    bold,
    className,
    'data-testid': dataTestId = 'Text',
    nowrap = false,
    // ввиду того, что такое свойство не позволительно деструктуризировать, нужно переименовать его
    size = 'm',
    text,
    title,
    variant = 'accent',
    wrap = 'wrap',
    ...otherProps
  } = props;

  const TagName = as;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const currentClass = useMemo(
    () =>
      classNames('', { [cls.bold]: bold, [cls.wrap]: wrap === 'nowrap' }, [
        className,
        cls[variant],
        cls[align],
        sizeClass,
      ]),
    [align, bold, className, sizeClass, variant, wrap],
  );

  return (
    <div className={currentClass}>
      {!!title && (
        <HeaderTag
          className={cls.title}
          data-testid={`${dataTestId}.Header`}
          {...otherProps}
        >
          {title}
        </HeaderTag>
      )}
      {!!text && (
        <TagName className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </TagName>
      )}
    </div>
  );
};
