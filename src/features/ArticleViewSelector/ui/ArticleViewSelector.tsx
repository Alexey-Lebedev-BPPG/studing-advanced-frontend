import { FC, memo } from 'react';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';

export interface IArticleViewSelectorProps {
  className?: string;
  onViewClick?: (view: ArticleView) => void;
  view: ArticleView;
}

const viewTypes = [
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => TiledIconDeprecated,
      on: () => TiledIcon,
    }),
    view: ArticleView.SMALL,
  },
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => ListIconDeprecated,
      on: () => ListIcon,
    }),
    view: ArticleView.BIG,
  },
];

export const ArticleViewSelector: FC<IArticleViewSelectorProps> = memo(
  ({ className, onViewClick, view }) => {
    // делаем замыкание (внешняя функция принимает отображение, а внутренняя уже срабатывает как событие)
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <div className={classNames(cls.articleViewSelector, {}, [className])}>
            {viewTypes.map(viewType => (
              <ButtonDeprecated
                key={viewType.view}
                theme={ButtonTheme.CLEAR}
                onClick={onClick(viewType.view)}
              >
                <IconDeprecated
                  Svg={viewType.icon}
                  width={24}
                  height={24}
                  className={classNames(
                    '',
                    { [cls.notSelected]: viewType.view !== view },
                    [],
                  )}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
        on={
          <Card
            border='round'
            className={classNames(cls.articleViewSelectorRedesigned, {}, [
              className,
              cls.getHStach,
            ])}
          >
            {viewTypes.map(viewType => (
              <Icon
                key={viewType.view}
                clickable
                Svg={viewType.icon}
                width={24}
                height={24}
                className={classNames(
                  '',
                  { [cls.notSelected]: viewType.view !== view },
                  [],
                )}
                onClick={onClick(viewType.view)}
              />
            ))}
          </Card>
        }
      />
    );
  },
);
