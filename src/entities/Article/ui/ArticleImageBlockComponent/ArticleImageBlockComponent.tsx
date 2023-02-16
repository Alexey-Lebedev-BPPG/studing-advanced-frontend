import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextAlign } from "shared/ui/Text/Text";
import cls from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";

interface IArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<IArticleImageBlockComponentProps> =
  memo(({ className, block }) => (
    <div
      className={classNames(cls.articleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && <Text title={block.title} align={TextAlign.CENTER} />}
    </div>
  ));
