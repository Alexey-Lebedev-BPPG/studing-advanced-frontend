import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { Icon } from "shared/ui/Icon/Icon";
import Card from "shared/ui/Card/Card";
// import { useHover } from "shared/lib/hooks/useHover/useHover";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button } from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import cls from "./ArticleListItem.module.scss";
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

export interface IArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem: FC<IArticleListItemProps> = memo(
  ({ className, article, view }) => {
    const navigate = useNavigate();
    // const [isHover, bindHover] = useHover();

    const onOpenArticle = useCallback(() => {
      navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    const types = <Text text={article.type.join(", ")} className={cls.type} />;
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    );

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT
      ) as ArticleTextBlock;

      return (
        <div className={classNames("", {}, [className, cls[view]])}>
          <Card>
            <div className={cls.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text text={article.title} className={cls.title} />
            {types}
            <img src={article.img} className={cls.img} alt={article.title} />
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <div className={cls.footer}>
              <Button onClick={onOpenArticle}>Читать далее...</Button>
              {views}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames("", {}, [className, cls[view]])}
        // {...bindHover}
      >
        <Card onClick={onOpenArticle}>
          <div className={cls.imageWrapper}>
            <img src={article.img} className={cls.img} alt={article.title} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text text={article.title} className={cls.title} />
        </Card>
      </div>
    );
  }
);
