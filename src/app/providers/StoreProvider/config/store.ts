import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { CounterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { createReducerManager } from "./reducerManager";
import { StateSchema } from "./stateSchema";

// стандартное решение для редакса
// export default configureStore({ reducer: {} });

// однако мы создадим такую функцию для создания стора, чтоб мы могли ее потом переиспользовать в других местах
export const createReduxStore = (
  initialState?: StateSchema,
  // принимаем асинхронные редьюсеры
  asyncReducers?: ReducersMapObject<StateSchema>
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    // разворачиваем асинхронные редьюсеры в главный стор
    ...asyncReducers,
    counter: CounterReducer,
    user: userReducer,
  };

  // Ввиду того, что сам компонент мы сделали асинхронным, но импортируемые редьюсеры и т.п. из него загружаются в главный бандл, сделаем асинхронную подгрузку редьюсеров через редьюсер-менеджера
  const reducerManager = createReducerManager(rootReducers);

  // указываем тип стейта в дженерике
  const store = configureStore<StateSchema>({
    // чтоб для взаимодействия с асинхронными редьюсерами в компонентах, нам нужно передавать редьюсером не rootReducer, а функцию reduce из reduceManager
    // reducer: rootReducers,
    reducer: reducerManager.reduce,
    // отключаем девтулзы для продакшена
    devTools: __IS_DEV__,
    // делаем инитиал стейт по ум.
    preloadedState: initialState,
  });

  // пока помечаем так, позже добавим типизацию
  // добавляем наш менеджер для стейта
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};
