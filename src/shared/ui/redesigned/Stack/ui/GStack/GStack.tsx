import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from 'react';
import cls from './gStack.module.css';
import {
  GridItems,
  GridContent,
  GridDirection,
} from '../../model/types/typesStacks';
import { classNames } from '@/shared/lib/classNames/classNames';
import { mapMarginsSize } from '@/shared/styles/const';
import { Margins } from '@/shared/types/ui';

const justifyItemsClass: Record<GridItems, string> = {
  center: cls['justify-items-center'],
  end: cls['justify-items-end'],
  start: cls['justify-items-start'],
  stretch: cls['justify-items-stretch'],
};
const justifyContentClass: Record<GridContent, string> = {
  around: cls['justify-content-around'],
  between: cls['justify-content-between'],
  center: cls['justify-content-center'],
  end: cls['justify-content-end'],
  evenly: cls['justify-content-evenly'],
  start: cls['justify-content-start'],
  stretch: cls['justify-content-stretch'],
};

const alignItemsClass: Record<GridItems, string> = {
  center: cls['align-items-center'],
  end: cls['align-items-end'],
  start: cls['align-items-start'],
  stretch: cls['align-items-stretch'],
};

const alignContentClass: Record<GridContent, string> = {
  around: cls['align-content-around'],
  between: cls['align-content-between'],
  center: cls['align-content-center'],
  end: cls['align-content-end'],
  evenly: cls['align-content-evenly'],
  start: cls['align-content-start'],
  stretch: cls['align-content-stretch'],
};

const directionClass: Record<GridDirection, string> = {
  column: cls['direction-column'],
  dense: cls['direction-dense'],
  row: cls['direction-row'],
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * align-content
   */
  alignContent?: GridContent;
  /**
   * align-item
   */
  alignItem?: GridItems;
  children: ReactNode;
  className?: string;
  /**
   * grid-auto-flow
   */
  direction?: GridDirection;
  /**
   * column-gap
   */
  gapC?: Margins;
  /**
   * row-gap
   */
  gapR?: Margins;
  /**
   * grid-template-areas
   */
  gta?: string;
  /**
   * grid-template-columns
   */
  gtc?: string;
  /**
   * grid-template-rows
   */
  gtr?: string;
  /**
   * justify-content
   */
  justifyContent?: GridContent;
  /**
   * justify-item
   */
  justifyItem?: GridItems;
  /**
   * width: 100%
   */
  max?: boolean;
  style?: CSSProperties;
}

const GStackUi = forwardRef<RefDiv, GridProps>((props, ref) => {
  const {
    alignContent = 'start',
    alignItem = 'start',
    children,
    className,
    direction = 'row',
    gapC,
    gapR,
    gta,
    gtc,
    gtr,
    justifyContent = 'start',
    justifyItem = 'start',
    max,
    style,
    ...otherProps
  } = props;

  const classes = [
    alignContentClass[alignContent],
    alignItemsClass[alignItem],
    directionClass[direction],
    justifyContentClass[justifyContent],
    justifyItemsClass[justifyItem],
    className,
  ];

  const mods = {
    [cls.max]: Boolean(max),
  };

  const styles: CSSProperties = {
    columnGap: gapC ? `${mapMarginsSize[gapC]}rem` : undefined,
    gridTemplateAreas: gta,
    gridTemplateColumns: gtc,
    gridTemplateRows: gtr,
    rowGap: gapR ? `${mapMarginsSize[gapR]}rem` : undefined,
    ...style,
  };

  return (
    <div
      ref={ref}
      style={styles}
      className={classNames(cls.grid, mods, classes)}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export const GStack = memo(GStackUi);
