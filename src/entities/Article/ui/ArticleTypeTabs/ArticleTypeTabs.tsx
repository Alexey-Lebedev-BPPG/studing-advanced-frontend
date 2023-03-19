import { FC, memo, useCallback, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { ITabItem, Tabs } from "shared/ui/Tabs/Tabs";
import { ArticleType } from "../../model/types/article";

export interface IArticleTypeTabsProps {
  className?: string;
  selectedValue: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<IArticleTypeTabsProps> = memo(
  ({ className, selectedValue, onChangeType }) => {
    const { t } = useTranslation();

    const tabs = useMemo<ITabItem<ArticleType>[]>(
      () => [
        { value: ArticleType.ALL, content: t("Все статьи") },
        { value: ArticleType.IT, content: t("Айти") },
        { value: ArticleType.ECONOMICS, content: t("Экономика") },
        { value: ArticleType.SCIENCE, content: t("Наука") },
      ],
      [t]
    );

    const onClickTab = useCallback(
      (newTab: ITabItem<ArticleType>) => {
        onChangeType(newTab.value);
      },
      [onChangeType]
    );

    return (
      <Tabs
        className={classNames("", {}, [className])}
        tabs={tabs}
        selectedValue={selectedValue}
        onTabClick={onClickTab}
      />
    );
  }
);