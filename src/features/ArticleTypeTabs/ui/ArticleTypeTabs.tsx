import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ITabItem, Tabs } from '@/shared/ui/Tabs';

export interface IArticleTypeTabsProps {
  className?: string;
  onChangeType: (type: ArticleType) => void;
  selectedValue: ArticleType;
}

export const ArticleTypeTabs: FC<IArticleTypeTabsProps> = memo(
  ({ className, onChangeType, selectedValue }) => {
    const { t } = useTranslation();

    const tabs = useMemo<ITabItem<ArticleType>[]>(
      () => [
        { content: t('Все статьи'), value: ArticleType.ALL },
        { content: t('Айти'), value: ArticleType.IT },
        { content: t('Экономика'), value: ArticleType.ECONOMICS },
        { content: t('Наука'), value: ArticleType.SCIENCE },
      ],
      [t],
    );

    const onClickTab = useCallback(
      (newTab: ITabItem<ArticleType>) => {
        onChangeType(newTab.value);
      },
      [onChangeType],
    );

    return (
      <Tabs
        className={classNames('', {}, [className])}
        tabs={tabs}
        selectedValue={selectedValue}
        onTabClick={onClickTab}
      />
    );
  },
);
