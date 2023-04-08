import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from "app/providers/StoreProvider/config/stateSchema";
import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

// тип для всех редьюсеров, которые будут поступать в наш компонент (если передадим несколько редьюсеров)
export type ReducersList = {
  // указываем такой тип, чтоб редьюсеры принимали только то название, которое было сделано ранее
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface IDynamicModuleLoaderProps {
  reducers: ReducersList;
  // флаг, чтоб можно было удалять редьюсер после размонтирования
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

// обертка для использования асинхронных редьюсеров в асинхронных компонентах
export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = ({
  children,
  reducers,
  removeAfterUnmount = true,
}) => {
  const dispatch = useDispatch();
  // получаем стор, чтоб посмотреть что там
  const store = useStore() as ReduxStoreWithManager;

  // делаем юзеффект, в котором будем подгружать/удалять используемые редьюсеры в данном компоненте
  useEffect(() => {
    // получаем список редьюсеров
    const mountedReducers = store.reducerManager.getMountedReducers();
    // пробегаем по объекту редьюсеров, создаем на каждой итерации массив из названия редьюсера и самого редьюсера и выполняем необходимые действия
    Object.entries(reducers).forEach(([keyReducer, reducer]) => {
      // по названию ключа достаем нужный редьюсер
      const mounted = mountedReducers[keyReducer as StateSchemaKey];
      // проверяем, если он не вмотрирован, то тогда добавляем его в редьюсер менеджер
      if (!mounted) {
        // это позволяет изолировать редьюсер внути модуля и в паблик апи его можно удалять. Этот редьюсер будет подгружаться только тогда, когда будет загружен данный компонент
        store.reducerManager.add(keyReducer as StateSchemaKey, reducer);
        // чтоб просматривать сработало ли или нет (если убрать, то действие сработает, однако в девтулзах не обновится. Обновление происходит после следущего действия)
        dispatch({ type: `@INIT ${keyReducer} reducer` });
      }
    });

    // при демонтировании компонента, редьюсер также удаляется из стора
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([keyReducer]) => {
          store.reducerManager.remove(keyReducer as StateSchemaKey);
          // чтоб просматривать сработало ли или нет (если убрать, то действие сработает, однако в девтулзах не обновится. Обновление происходит после следущего действия)
          dispatch({ type: `@DESTROY ${keyReducer} reducer` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
