import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";

// типизация всего стейта
export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // Асинхронные(подгружаемые) редьюсеры
  loginForm?: LoginSchema;
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
