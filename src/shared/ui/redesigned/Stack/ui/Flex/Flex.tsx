import { HTMLAttributes, ReactNode, forwardRef, memo } from 'react';
import cls from './Flex.module.scss';
import {
  FlexAlign,
  FlexDirection,
  FlexGap,
  FlexJustify,
  FlexWrap,
  ISeoTagName,
} from '../../model/types/typesStacks';
import { classNames } from '@/shared/lib/classNames/classNames';

// делаем сопоставлении пропса с классом, который хотим потом повесить
const justifyClass: Record<FlexJustify, string> = {
  around: cls['justify-around'],
  between: cls['justify-between'],
  center: cls['justify-center'],
  end: cls['justify-end'],
  start: cls['justify-start'],
  unset: cls['justify-unset'],
};

const alignClass: Record<FlexAlign, string> = {
  baseline: cls['align-baseline'],
  center: cls['align-center'],
  end: cls['align-end'],
  start: cls['align-start'],
  stretch: cls['align-stretch'],
};

const directionClass: Record<FlexDirection, string> = {
  column: cls['direction-column'],
  'column-reverse': cls['direction-column-reverse'],
  row: cls['direction-row'],
};

const wrapClass: Record<FlexWrap, string> = {
  nowrap: cls.nowrap,
  wrap: cls.wrap,
  'wrap-reverse': cls['wrap-reverse'],
};

const mapGap: Record<FlexGap, string> = {
  4: '4',
  8: '8',
  16: '16',
  24: '24',
  32: '32',
};

// добавляем тип, чтоб расширить пропсы всеми свойствами дивов
type DivProps = HTMLAttributes<HTMLDivElement>;

export interface IFlexProps extends DivProps {
  align?: FlexAlign;
  as?: ISeoTagName;
  children: ReactNode;
  className?: string;
  direction: FlexDirection;
  gap?: FlexGap;
  justify?: FlexJustify;
  max?: boolean;
  wrap?: FlexWrap;
}

const FlexUi = forwardRef<RefDiv, IFlexProps>((props, ref) => {
  const {
    align = 'center',
    as = 'div',
    children,
    className,
    direction = 'row',
    gap,
    justify = 'start',
    max,
    style,
    wrap = 'nowrap',
    ...otherProps
  } = props;

  const TagName = as;

  const classes = [
    className,
    justifyClass[justify],
    alignClass[align],
    directionClass[direction],
    wrapClass[wrap],
  ];

  const mods = {
    [cls.max]: max,
  };

  return (
    <TagName
      ref={ref}
      // style={{ gap: gap ? `${mapMarginsSize[gap]}rem` : undefined, ...style }}
      style={{ gap: gap ? `${mapGap[gap]}px` : undefined, ...style }}
      className={classNames(cls.flex, mods, classes)}
      {...otherProps}
    >
      {children}
    </TagName>
  );
});

export const Flex = memo(FlexUi);
