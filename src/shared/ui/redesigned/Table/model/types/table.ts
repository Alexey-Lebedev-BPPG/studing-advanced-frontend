import { CSSProperties, ReactElement } from 'react';
import { FlexGap, FlexJustify } from '../../../Stack/Flex/Flex';

export type ValidRowModel = {
  [key: string]: any;
};

export interface IColumnTable<T extends ValidRowModel> {
  field: string;
  fullWidth?: boolean;
  headerName: string;
  justify?: FlexJustify;
  render?: (row: T) => ReactElement;
  style?: CSSProperties;
  width?: string;
}

export interface ITableProps<T extends ValidRowModel> {
  className?: string;
  columns: IColumnTable<T>[];
  emptyContent?: ReactElement;
  findTotal?: number;
  gap?: FlexGap;
  isLoading?: boolean;
  refLoader?: (node: HTMLElement | null) => void;
  rowLink?: (row: T) => string;
  rows: T[];
  withCheckbox?: boolean;
  withoutLastBorder?: boolean;
}
