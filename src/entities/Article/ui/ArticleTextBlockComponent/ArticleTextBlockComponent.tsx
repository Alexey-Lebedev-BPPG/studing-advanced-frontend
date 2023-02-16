import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import cls from "./ArticleTextBlockComponent.module.scss";
import { ArticleTextBlock } from "../../model/types/article";

interface IArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<IArticleTextBlockComponentProps> =
  memo(({ className, block }) => (
    <div className={classNames(cls.articleTextBlockComponent, {}, [className])}>
      {block.title && <Text title={block.title} className={cls.title} />}
      {block.paragraphs.map((paragraph, index) => (
        <Text
          key={index + paragraph.slice(0, 5)}
          text={paragraph}
          className={cls.paragraph}
        />
      ))}
    </div>
  ));
