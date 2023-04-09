import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Code } from "@/shared/ui/Code/Code";
import cls from "./ArticleCodeBlockComponent.module.scss";
import { ArticleCodeBlock } from "../../model/types/article";

interface IArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent: FC<IArticleCodeBlockComponentProps> =
  memo(({ className, block }) => (
    <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  ));
