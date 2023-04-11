import { memo, ReactNode, useCallback } from "react";
import { Card, CardTheme } from "../Card/Card";
import cls from "./Tabs.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

export interface ITabItem<T> {
  value: T;
  content: ReactNode;
}

export interface ITabsProps<T> {
  className?: string;
  tabs: ITabItem<T>[];
  selectedValue: T;
  onTabClick: (tab: ITabItem<T>) => void;
}

// делаем обертку для того, чтоб принимать дженериком тип для пропсов в компоненте, который использует мемо
const typedMemo: <T>(c: T) => T = memo;

export const Tabs = typedMemo(
  <T extends string>({
    className,
    tabs,
    selectedValue,
    onTabClick,
  }: ITabsProps<T>) => {
    // используем замыкание, чтоб в JSX не указывать колбек
    const clickHandle = useCallback(
      (tab: ITabItem<T>) => () => {
        onTabClick(tab);
      },
      [onTabClick]
    );

    return (
      <div className={classNames(cls.tabs, {}, [className])}>
        {tabs.map((tab) => (
          <Card
            theme={
              tab.value === selectedValue ? CardTheme.NORMAL : CardTheme.OUTLINE
            }
            className={cls.tab}
            key={tab.value}
            onClick={clickHandle(tab)}
          >
            {tab.content}
          </Card>
        ))}
      </div>
    );
  }
);
