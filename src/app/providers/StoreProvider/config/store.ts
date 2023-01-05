import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { CounterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { StateSchema } from "./stateSchema";

// стандартное решение для редакса
// export default configureStore({ reducer: {} });

// однако мы создадим такую функцию для создания стора, чтоб мы могли ее потом переиспользовать в других местах
export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: CounterReducer,
    user: userReducer,
  };
  // указываем тип стейта в дженерике
  return configureStore<StateSchema>({
    reducer: rootReducers,
    // отключаем девтулзы для продакшена
    devTools: __IS_DEV__,
    // делаем инитиал стейт по ум.
    preloadedState: initialState,
  });
};
