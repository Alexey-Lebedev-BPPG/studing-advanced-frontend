import { FC, memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { SortOrder } from "shared/types";
import cls from "./ArticleSortSelector.module.scss";
import { ArticleSortFields } from "../../model/types/article";

export interface IArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortFields;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortFields) => void;
}

export const ArticleSortSelector: FC<IArticleSortSelectorProps> = memo(
  ({ className, onChangeOrder, onChangeSort, order, sort }) => {
    const { t } = useTranslation();

    const orderOption = useMemo<SelectOption<SortOrder>[]>(
      () => [
        { valueOpt: "asc", content: t("возрастанию") },
        { valueOpt: "desc", content: t("убыванию") },
      ],
      [t]
    );

    const sortFieldOption = useMemo<SelectOption<ArticleSortFields>[]>(
      () => [
        { valueOpt: ArticleSortFields.CREATED, content: t("дате создания") },
        { valueOpt: ArticleSortFields.TITLE, content: t("названию") },
        { valueOpt: ArticleSortFields.VIEWS, content: t("просмотрам") },
      ],
      [t]
    );

    return (
      <div className={classNames(cls.articleSortSelector, {}, [className])}>
        <Select
          options={sortFieldOption}
          label={t("Сортировать ПО")}
          value={sort}
          onChange={onChangeSort}
        />
        <Select
          options={orderOption}
          label={t("по")}
          value={order}
          onChange={onChangeOrder}
          className={cls.order}
        />
      </div>
    );
  }
);