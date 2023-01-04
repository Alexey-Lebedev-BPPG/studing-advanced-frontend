import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "entities/Counter";
import { StateSchema } from "./stateSchema";

// стандартное решение для редакса
// export default configureStore({ reducer: {} });

// однако мы создадим такую функцию для создания стора, чтоб мы могли ее потом переиспользовать в других местах
export const createReduxStore = (initialState?: StateSchema) =>
  // указываем тип стейта в дженерике
  configureStore<StateSchema>({
    reducer: {
      counter: CounterReducer,
    },
    // отключаем девтулзы для продакшена
    devTools: __IS_DEV__,
    // делаем инитиал стейт по ум.
    preloadedState: initialState,
  });
