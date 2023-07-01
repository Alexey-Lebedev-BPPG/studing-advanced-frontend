import { memo, ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ITabItem<T> {
  content: ReactNode;
  value: T;
}

export interface ITabsProps<T> {
  className?: string;
  direction?: FlexDirection;
  onTabClick: (tab: ITabItem<T>) => void;
  selectedValue: T;
  tabs: ITabItem<T>[];
}

// делаем обертку для того, чтоб принимать дженериком тип для пропсов в компоненте, который использует мемо
const typedMemo: <T>(c: T) => T = memo;

export const Tabs = typedMemo(<T extends string>(props: ITabsProps<T>) => {
  const {
    className,
    direction = 'row',
    onTabClick,
    selectedValue,
    tabs,
  } = props;

  // используем замыкание, чтоб в JSX не указывать коллбек
  const clickHandle = useCallback(
    (tab: ITabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap='8'
      align='start'
      className={classNames(cls.tabs, {}, [className])}
    >
      {tabs.map(tab => {
        const isSelected = tab.value === selectedValue;

        return (
          <Card
            key={tab.value}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            variant={isSelected ? 'light' : 'normal'}
            border='round'
            onClick={clickHandle(tab)}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
