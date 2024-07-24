import { CSSProperties, ReactElement } from 'react';
import { FlexJustify } from '../../../Stack/model/types/typesStacks';
import { Margins } from '@/shared/types/ui';

export interface IColumnTable<T> {
  field: string;
  fullWidth?: boolean;
  headerName: string;
  justify?: FlexJustify;
  render?: (row: T) => ReactElement;
  style?: CSSProperties;
  width?: string;
}

interface ITableBase<T> {
  className?: string;
  columns: IColumnTable<T>[];
  emptyContent?: ReactElement;
  gap?: Margins;
  isLoading?: boolean;
  rows: T[];
}

interface IPagination<T> extends ITableBase<T> {
  withPagination?: false;
}

interface ITableWithPage<T> extends ITableBase<T> {
  findTotal: number;
  onChangePage: (value: number) => void;
  page: number;
  rowsPerPage: number;
  setRowsPerPage: (amount: string) => void;
  withPagination: true;
}

type TPage<T> = IPagination<T> | ITableWithPage<T>;

interface ICheckbox<T> extends ITableBase<T> {
  withCheckbox?: false;
}

interface ITableWithCheck<T> extends ITableBase<T> {
  checkedIds: string[];
  checkedItem: boolean;
  isCheckedAllItems: boolean;
  onChangeCheckAllItem: () => void;
  onChangeCheckItem: (arr: string[]) => void;
  viewCheckboxFor: T[];
  withCheckbox: true;
}

type TCheck<T> = ICheckbox<T> | ITableWithCheck<T>;

export type TTable<T> = TPage<T> & TCheck<T>;

export interface ITableBaseOld<T> {
  checkedIds?: string[];
  checkedItem?: boolean;
  className?: string;
  columns: IColumnTable<T>[];
  emptyContent?: ReactElement;
  findTotal?: number;
  gap?: Margins;
  isCheckedAllItems?: boolean;
  isLoading?: boolean;
  onChangeCheckAllItem?: () => void;
  onChangeCheckItem?: (arr: string[]) => void;
  onChangePage?: (value: number) => void;
  page?: number;
  rows?: T[];
  rowsPerPage?: number;
  setRowsPerPage?: (amount: string) => void;
  viewCheckboxFor?: T[];
  viewMobileHeader?: boolean;
  withCheckbox?: boolean;
  withPagination?: boolean;
}
