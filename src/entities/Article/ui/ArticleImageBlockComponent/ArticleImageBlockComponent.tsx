import { FC, memo } from 'react';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/AppImage';
import { Text, TextAlign } from '@/shared/ui/Text';

interface IArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<IArticleImageBlockComponentProps> =
  memo(({ className, block }) => (
    <div
      className={classNames(cls.articleImageBlockComponent, {}, [className])}
    >
      <AppImage src={block.src} className={cls.img} alt={block.title} />
      {block.title && <Text title={block.title} align={TextAlign.CENTER} />}
    </div>
  ));
