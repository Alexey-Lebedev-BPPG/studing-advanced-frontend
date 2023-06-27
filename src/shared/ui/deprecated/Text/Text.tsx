import { FC, memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum TextTheme {
  ERROR = 'error',
  INVERTED = 'inverted',
  PRIMARY = 'primary',
}

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextSize {
  L = 'size_l',
  M = 'size_m',
  S = 'size_s',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

// маппер, который определяет тег в зависимости от размера
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

interface ITextProps {
  align?: TextAlign;
  className?: string;
  'data-testid'?: string;
  size?: TextSize;
  text?: string | null;
  theme?: TextTheme;
  title?: string | null;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Text: FC<ITextProps> = memo(
  ({
    align = TextAlign.LEFT,
    className,
    'data-testid': dataTestId = 'Text',
    size = TextSize.M,
    text,
    theme = TextTheme.PRIMARY,
    // ввиду того, что такое свойство не позволительно деструктуризировать, нужно переименовать его
    title,
  }) => {
    const HeaderTag = mapSizeToHeaderTag[size];

    const mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
      [cls[size]]: true,
    };

    return (
      <div className={classNames(cls.textWrapper, mods, [className])}>
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
