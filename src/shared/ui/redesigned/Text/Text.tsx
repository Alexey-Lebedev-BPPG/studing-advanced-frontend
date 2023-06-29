import { FC, memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type TextVariant = 'error' | 'accent' | 'primary';

type TextAlign = 'center' | 'left' | 'right';

type TextSize = 'l' | 'm' | 's';

type HeaderTagType = 'h1' | 'h2' | 'h3';

// маппер, который определяет размер
const mapSizeToClass: Record<TextSize, string> = {
  l: 'size_l',
  m: 'size_m',
  s: 'size_s',
};

// маппер, который определяет тег в зависимости от размера
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  l: 'h1',
  m: 'h2',
  s: 'h3',
};

interface ITextProps {
  align?: TextAlign;
  className?: string;
  'data-testid'?: string;
  size?: TextSize;
  text?: string | null;
  title?: string | null;
  variant?: 'primary';
}

export const Text: FC<ITextProps> = memo(
  ({
    align = 'left',
    className,
    // ввиду того, что такое свойство не позволительно деструктуризировать, нужно переименовать его
    'data-testid': dataTestId = 'Text',
    size = 'm',
    text,
    title,
    variant = 'primary',
  }) => {
    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [className, cls[variant], cls[align], sizeClass];

    return (
      <div className={classNames(cls.textWrapper, {}, additionalClasses)}>
        {!!title && (
          <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
            {title}
          </HeaderTag>
        )}
        {!!text && (
          <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
            {text}
          </p>
        )}
      </div>
    );
  },
);
