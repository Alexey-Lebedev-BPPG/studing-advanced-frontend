import { ComponentProps, ElementType, ReactNode } from 'react';

export type TextVariant = 'error' | 'accent';

export type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify';

export type TextSize = 'l' | 'm' | 's';

export type HeaderTagType = 'h1' | 'h2' | 'h3';

// маппер, который определяет тег в зависимости от размера
export const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  l: 'h1',
  m: 'h2',
  s: 'h3',
};

export type TTagName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'em'
  | 'label'
  | 'sub';

type TextOwnProps<T extends ElementType = ElementType> = {
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
  as?: T;
  bold?: boolean;
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
  size?: TextSize;
  text?: string | null;
  title?: string | null;
  variant: TextVariant;
  wrap?: 'wrap' | 'nowrap';
};

export type ITextProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentProps<T>, keyof TextOwnProps | 'children'>;
