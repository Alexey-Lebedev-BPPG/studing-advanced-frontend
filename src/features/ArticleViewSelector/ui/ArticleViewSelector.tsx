import { FC, memo } from 'react';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

export interface IArticleViewSelectorProps {
  className?: string;
  onViewClick?: (view: ArticleView) => void;
  view: ArticleView;
}

const viewTypes = [
  { icon: TiledIcon, view: ArticleView.SMALL },
  { icon: ListIcon, view: ArticleView.BIG },
];

export const ArticleViewSelector: FC<IArticleViewSelectorProps> = memo(
  ({ className, onViewClick, view }) => {
    // делаем замыкание (внешняя функция принимает отображение, а внутренняя уже срабатывает как событие)
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <div className={classNames(cls.articleViewSelector, {}, [className])}>
        {viewTypes.map(viewType => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames(
                '',
                { [cls.notSelected]: viewType.view !== view },
                [],
              )}
            />
          </Button>
        ))}
      </div>
    );
  },
);
