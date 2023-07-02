import cls from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/consts/consts';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

export const renderArticleBlock = (block: ArticleBlock) => {
  if (block.type === ArticleBlockType.CODE)
    return (
      <ArticleCodeBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    );
  if (block.type === ArticleBlockType.IMAGE)
    return (
      <ArticleImageBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    );
  if (block.type === ArticleBlockType.TEXT)
    return (
      <ArticleTextBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    );
  return null;
};
