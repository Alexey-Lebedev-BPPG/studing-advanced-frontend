import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import cls from './Table.module.css';
import { Checkbox } from '../../Button/ui/Checkbox/Checkbox';
import { Spinner } from '../../Loaders';
import { Pagination } from '../../Pagination/Pagination';
import { HStack, VStack } from '../../Stack';
import { Text } from '../../Text';
import { ITableBaseOld } from '../model/types/table';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { typedMemo } from '@/shared/lib/typedMemo/typedMemo';

export const Table = typedMemo(
  <T extends ValidRowModel>(props: ITableBaseOld<T>) => {
    const {
      checkedIds,
      checkedItem,
      className,
      columns,
      emptyContent,
      findTotal,
      gap = '0',
      isCheckedAllItems,
      isLoading,
      onChangeCheckAllItem,
      onChangeCheckItem,
      onChangePage,
      page,
      rows,
      rowsPerPage,
      setRowsPerPage,
      viewCheckboxFor,
      viewMobileHeader = true,
      withCheckbox = false,
      withPagination = true,
    } = props;

    const isMobile = useDetectDevice();

    const [isCheckAllRows, setIsCheckAllRows] = useState(false);
    const [checkedRows, setCheckedRows] = useState<string[]>([]);

    const toCheckAll = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.currentTarget;
        setIsCheckAllRows(checked);
        if (isCheckAllRows) setCheckedRows([]);

        const checkedItems =
          checked && viewCheckboxFor
            ? viewCheckboxFor.map(item => item.id)
            : [];
        if (checkedItems.length > 0) {
          setCheckedRows(checkedItems);
          onChangeCheckItem?.(checkedItems);
        }
      },
      [isCheckAllRows, viewCheckboxFor, onChangeCheckItem],
    );

    const toCheck = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { checked, id } = e.currentTarget;

        const filteredChecks = [...checkedRows].filter(item => item !== id);

        const checkedItems = checked ? [...checkedRows, id] : filteredChecks;

        setCheckedRows(checkedItems);
        onChangeCheckItem?.(checkedItems);

        setIsCheckAllRows(
          Boolean(
            viewCheckboxFor && viewCheckboxFor.length === checkedItems.length,
          ),
        );
      },
      [viewCheckboxFor, checkedRows, onChangeCheckItem],
    );

    const headerClass = useMemo(() => {
      if (!viewMobileHeader && isMobile) return cls['th-off-header'];

      return cls.th;
    }, [viewMobileHeader, isMobile]);

    const headerContent = useMemo(
      () => (
        <>
          {!!withCheckbox && (
            <Checkbox
              width='3rem'
              id='selectAll'
              checked={isCheckAllRows}
              onChange={toCheckAll}
            />
          )}
          {columns.map((column, indexColumn) => {
            const {
              field,
              fullWidth,
              headerName,
              justify = 'start',
              style,
              width = 5,
            } = column;

            return (
              <HStack
                key={field + indexColumn}
                max
                style={{ minWidth: width, ...style }}
                justify={justify}
              >
                <Text variant='accent' text={headerName} />
              </HStack>
            );
          })}
        </>
      ),
      [columns, isCheckAllRows, toCheckAll, withCheckbox],
    );

    const currentChildren = useCallback(
      (row: T) =>
        columns.map((column, indexColumn) => {
          const {
            field,
            fullWidth,
            justify = 'start',
            render,
            style,
            width,
          } = column;

          return (
            <HStack
              key={row.id + field + indexColumn}
              max
              justify={justify}
              style={{ minWidth: width, ...style }}
            >
              {render ? (
                render(row)
              ) : (
                <Text variant='accent' text={row[field]} />
              )}
            </HStack>
          );
        }),
      [columns],
    );

    const bodyContent = useMemo(
      () =>
        rows?.map(row => {
          const arrayWithoutCheckbox = viewCheckboxFor?.filter(
            s => s.id === row.id,
          );

          return !viewMobileHeader && isMobile ? (
            <VStack
              key={row.id}
              max
              gap='16'
              className={cls.row}
              justify='center'
            >
              <HStack max justify='between'>
                <Text variant='accent' text={row.productTitle} />
                <Text variant='accent' text={`$${row.price}`} />
              </HStack>
              <HStack max justify='between'>
                <Text
                  variant='accent'
                  text={row.updatedAt.substring(0, 10).replaceAll('-', '.')}
                />
              </HStack>
            </VStack>
          ) : (
            <HStack
              key={row.id}
              max
              className={cls.row}
              style={{ gap: `${gap}rem` }}
            >
              {!!withCheckbox &&
                arrayWithoutCheckbox?.map(item => (
                  <Checkbox
                    key={`checkbox-${item.id}`}
                    width='3rem'
                    id={row.id}
                    checked={checkedRows?.includes(row.id)}
                    onChange={toCheck}
                  />
                ))}
              {!!withCheckbox &&
                !!arrayWithoutCheckbox &&
                arrayWithoutCheckbox.length < 1 && (
                  <div style={{ width: '9.8rem' }} />
                )}
              {currentChildren(row)}
            </HStack>
          );
        }),
      [
        checkedRows,
        currentChildren,
        gap,
        isMobile,
        rows,
        toCheck,
        viewCheckboxFor,
        viewMobileHeader,
        withCheckbox,
      ],
    );

    const emptyTableContent = useMemo(
      () =>
        emptyContent || (
          <HStack
            max
            align='center'
            justify='center'
            className={cls['empty-table']}
          >
            <Text variant='accent' text={'Not found'} />
          </HStack>
        ),
      [emptyContent],
    );

    const selectContent = useMemo(() => {
      if (isLoading)
        return (
          <HStack justify='center' style={{ position: 'relative' }}>
            <Spinner />
          </HStack>
        );
      return rows?.length ? bodyContent : emptyTableContent;
    }, [bodyContent, emptyTableContent, isLoading, rows]);

    return (
      <VStack max className={classNames(cls['list-table'], {}, [className])}>
        <HStack max className={headerClass}>
          {headerContent}
        </HStack>
        <VStack max className={cls.tb} align='center'>
          {selectContent}
        </VStack>
        {!!withPagination && !!rows?.length && !!onChangePage && (
          <HStack max className={cls['pagination-wrapper']} justify='between'>
            <Pagination
              rowsPerPage={rowsPerPage || 20}
              page={page || 1}
              findTotal={findTotal || 0}
              onChangePage={onChangePage}
            />
          </HStack>
        )}
      </VStack>
    );
  },
);
