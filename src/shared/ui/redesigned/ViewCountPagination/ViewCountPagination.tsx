import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './viewCountPagination.module.css';
import { HStack } from '../Stack';
import { Text } from '../Text';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IViewCountPagination {
  className?: string;
  currentPage: number;
  findTotal: number;
  firstIndex: number;
  rowsPerPage: number;
}

export const ViewCountPagination: FC<IViewCountPagination> = memo(props => {
  const { className, currentPage, findTotal, firstIndex, rowsPerPage } = props;

  const { t } = useTranslation();

  const showFirst = firstIndex === 0 ? 1 : firstIndex;
  const showLast =
    currentPage === Math.ceil(findTotal / 20) ? findTotal : rowsPerPage;

  return (
    <HStack
      className={classNames(cls['view-count-pagination'], {}, [className])}
    >
      <Text
        variant='accent'
        text={`${t('Showing')} ${showFirst} - ${showLast} ${t('of')} ${findTotal}`}
      />
    </HStack>
  );
});
