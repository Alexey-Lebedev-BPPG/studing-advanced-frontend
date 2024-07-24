import { FC, useCallback, useMemo, useState } from 'react';
import cls from './pagination.module.css';
import { Flex, HStack } from '../Stack';
import { FlexGap } from '../Stack/model/types/typesStacks';
import { Text } from '../Text';
import { ViewCountPagination } from '../ViewCountPagination/ViewCountPagination';
// import { CaretLeft, CaretRight } from '@/shared/assets/svg/Table';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { typedMemo } from '@/shared/lib/typedMemo/typedMemo';

interface IPagination {
  className?: string;
  findTotal: number;
  onChangePage: (val: number) => void;
  page: number;
  rowsPerPage: number;
}

export const Pagination: FC<IPagination> = typedMemo(props => {
  const { className, findTotal, onChangePage, page, rowsPerPage } = props;

  const isMobile = useDetectDevice();

  const [currentPage, setCurrentPage] = useState(page || 1);

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const totalPages = Math.ceil(findTotal / rowsPerPage);
  const numbers = totalPages ? [...Array(totalPages + 1).keys()].slice(1) : [0];

  const direction = useMemo(() => (isMobile ? 'column' : 'row'), [isMobile]);
  const gap: FlexGap = useMemo(() => (isMobile ? '16' : '16'), [isMobile]);
  const firstIndexPlusOne = useMemo(
    () => firstIndex && firstIndex + 1,
    [firstIndex],
  );

  const toDisable = useMemo(
    () => ({
      left: currentPage === 1,
      right: currentPage === totalPages,
    }),
    [currentPage, totalPages],
  );

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      onChangePage(page - 1);
    }
  };
  const toChangeCPage = (num: number) => {
    setCurrentPage(num);
    onChangePage(num);
  };
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
      onChangePage(page + 1);
    }
  };

  const isActive = useCallback(
    (num: number) => {
      if (currentPage === num) return cls.active;
      return '';
    },
    [currentPage],
  );

  const colorLeft = useMemo(() => {
    if (toDisable.left) return '#808080';
    return '#fff';
  }, [toDisable]);
  const colorRight = useMemo(() => {
    if (toDisable.right) return '#808080';
    return '#fff';
  }, [toDisable]);

  return (
    <Flex
      max
      gap={gap}
      direction={direction}
      justify='between'
      className={classNames(cls.pagination, {}, [className])}
    >
      <HStack gap='16'>
        {/* <Icon
          clickable={!toDisable.left}
          className={cls['page-link']}
          width='28'
          height='28'
          color={colorLeft}
          Svg={CaretLeft}
          onClick={prevPage}
        /> */}
        {numbers.map((num: number) => (
          <HStack key={num} className={isActive(num)}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type='button'
              className={cls['page-link']}
              onClick={() => toChangeCPage(num)}
            >
              <Text variant='accent' text={String(num)} />
            </button>
          </HStack>
        ))}
        {/* <Icon
          clickable={!toDisable.right}
          className={cls['page-link']}
          width='28'
          height='28'
          color={colorRight}
          Svg={CaretRight}
          onClick={nextPage}
        /> */}
      </HStack>
      <ViewCountPagination
        rowsPerPage={rowsPerPage}
        firstIndex={firstIndexPlusOne}
        findTotal={findTotal}
        currentPage={currentPage}
      />
    </Flex>
  );
});
