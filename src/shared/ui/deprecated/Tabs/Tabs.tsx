import { memo, ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ITabItem<T> {
  content: ReactNode;
  value: T;
}

export interface ITabsProps<T> {
  className?: string;
  onTabClick: (tab: ITabItem<T>) => void;
  selectedValue: T;
  tabs: ITabItem<T>[];
}

// делаем обертку для того, чтоб принимать дженериком тип для пропсов в компоненте, который использует мемо
const typedMemo: <T>(c: T) => T = memo;

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Tabs = typedMemo(
  <T extends string>({
    className,
    onTabClick,
    selectedValue,
    tabs,
  }: ITabsProps<T>) => {
    // используем замыкание, чтоб в JSX не указывать колбек
    const clickHandle = useCallback(
      (tab: ITabItem<T>) => () => {
        onTabClick(tab);
      },
      [onTabClick],
    );

    return (
      <div className={classNames(cls.tabs, {}, [className])}>
        {tabs.map(tab => (
          <Card
            key={tab.value}
            className={cls.tab}
            theme={tab.value === selectedValue ? 'normal' : 'outline'}
            onClick={clickHandle(tab)}
          >
            {tab.content}
          </Card>
        ))}
      </div>
    );
  },
);
