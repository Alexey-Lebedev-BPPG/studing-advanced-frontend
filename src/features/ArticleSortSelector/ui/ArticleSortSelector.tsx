import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortFields } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface IArticleSortSelectorProps {
  className?: string;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortFields) => void;
  order: SortOrder;
  sort: ArticleSortFields;
}

export const ArticleSortSelector: FC<IArticleSortSelectorProps> = memo(
  ({ className, onChangeOrder, onChangeSort, order, sort }) => {
    const { t } = useTranslation();

    const orderOption = useMemo<SelectOption<SortOrder>[]>(
      () => [
        { content: t('возрастанию'), valueOpt: 'asc' },
        { content: t('убыванию'), valueOpt: 'desc' },
      ],
      [t],
    );

    const sortFieldOption = useMemo<SelectOption<ArticleSortFields>[]>(
      () => [
        { content: t('дате создания'), valueOpt: ArticleSortFields.CREATED },
        { content: t('названию'), valueOpt: ArticleSortFields.TITLE },
        { content: t('просмотрам'), valueOpt: ArticleSortFields.VIEWS },
      ],
      [t],
    );

    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <div className={classNames(cls.articleSortSelector, {}, [className])}>
            <Select
              options={sortFieldOption}
              label={`${t('Сортировать ПО')}`}
              value={sort}
              onChange={onChangeSort}
            />
            <Select
              options={orderOption}
              label={`${t('по')}`}
              value={order}
              className={cls.order}
              onChange={onChangeOrder}
            />
          </div>
        }
        on={
          <div
            className={classNames(cls.articleSortSelectorRedesigned, {}, [
              className,
            ])}
          >
            <VStack gap='8'>
              <Text text={t('Сортировать по:')} />
              <ListBox
                items={sortFieldOption}
                value={sort}
                onChange={onChangeSort}
              />
              <ListBox
                items={orderOption}
                value={order}
                onChange={onChangeOrder}
              />
            </VStack>
          </div>
        }
      />
    );
  },
);
