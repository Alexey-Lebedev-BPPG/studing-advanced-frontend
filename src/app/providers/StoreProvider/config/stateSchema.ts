import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { CounterSchema } from "entities/Counter";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";
import { To, NavigateOptions } from "react-router-dom";

// типизация всего стейта
export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // Асинхронные(подгружаемые) редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

// создаем тип всех ключей стейта
export type StateSchemaKey = keyof StateSchema;

// типизация для редьюсер-менеджера
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

// типизация для стейта, который получен с помощью редьюсер-менеджера (наследуется от стандартного типа, который появляется при создании стора в файле store.ts (21 строка))
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

// создает типизацию для экстра
export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, option?: NavigateOptions) => void;
}

// делаем тип для конфигураций thunk-ов (причем тип ошибочной функции будем определять извне)
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
}
