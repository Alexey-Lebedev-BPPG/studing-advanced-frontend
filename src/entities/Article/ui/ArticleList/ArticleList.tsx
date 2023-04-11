import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";
// import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { ArticleView } from "../../model/consts/consts";
import cls from "./ArticleList.module.scss";
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

export interface IArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  // отображение (плитка или список)
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

// здесь внедряли виртуализацию списков, однако с ней проблема, т.к. не использовали react-virtuoso. В последствии нужно исправить
export const ArticleList: FC<IArticleListProps> = memo(
  ({
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target,
    virtualized = true,
  }) => {
    const { t } = useTranslation();

    // const isBig = view === ArticleView.BIG;
    // // количество элементов в одной строке
    // const itemPerRow = isBig ? 1 : 3;
    // // количество строк
    // const rowCount = isBig
    //   ? articles.length
    //   : Math.ceil(articles.length / itemPerRow);

    // const rowRender = ({ index, key, style }: ListRowProps) => {
    //   // массив для отображения карточек
    //   const items = [];
    //   // считаем от какого индекса будем рендерить элементы
    //   const fromIndex = index * itemPerRow;
    //   // считаем до какого индекса будем рендерить элементы
    //   const toIndex = Math.min(fromIndex + itemPerRow, articles.length);

    //   for (let i = fromIndex; i < toIndex; i++) {
    //     items.push(
    //       <ArticleListItem
    //         target={target}
    //         article={articles[i]}
    //         view={view}
    //         className={cls.card}
    //         key={articles[i].id}
    //       />
    //     );
    //   }

    //   return (
    //     <div key={key} style={style} className={cls.row}>
    //       {items}
    //     </div>
    //   );
    // };

    if (!isLoading && !articles.length)
      return (
        <div className={classNames("", {}, [className, cls[view]])}>
          <Text size={TextSize.L} title={t("Статьи не найдены")} />
        </div>
      );

    return (
      // для примера используем react-virtualized, но она устарела. ПОэтому предподчтительнее использовать react-virtuoso
      // <div className={classNames(cls.articleList, {}, [className])}>
      //   <VirtuosoGrid
      //     data={articles}
      //     itemContent={(index, article) => renderArticle(article)}
      //   />
      //   {isLoading && getSkeletons(view)}
      // </div>
      // @ts-ignore
      // <WindowScroller
      //   scrollElement={document.getElementById(PAGE_ID) as Element}
      // >
      //   {({
      //     width,
      //     height,
      //     registerChild,
      //     onChildScroll,
      //     isScrolling,
      //     scrollTop,
      //   }) => (
      <div
        // ref={registerChild}
        className={classNames("", {}, [className, cls[view]])}
      >
        {/* {virtualized ? (
          // @ts-ignore
          <List
            height={height || 700}
            rowCount={rowCount}
            rowHeight={isBig ? 700 : 330}
            rowRenderer={rowRender}
            width={width || 700}
            autoHeight
            onScroll={onChildScroll}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
          />
        ) : (
          articles.map((item) => (
            <ArticleListItem
              target={target}
              article={item}
              view={view}
              className={cls.card}
              key={item.id}
            />
          ))
        )} */}
        {articles.map((item) => (
          <ArticleListItem
            target={target}
            article={item}
            view={view}
            className={cls.card}
            key={item.id}
          />
        ))}
        {isLoading && getSkeletons(view)}
      </div>
      //   )}
      // </WindowScroller>
    );
  }
);
