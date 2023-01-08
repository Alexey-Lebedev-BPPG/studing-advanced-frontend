import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { StateSchema } from "../config/stateSchema";
import { createReduxStore } from "../config/store";

interface IStoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  // добавляем пропс в виде async редьюсеров, чтоб в сторибук не падала ошибка
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<IStoreProviderProps> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  const store = createReduxStore(
    initialState as StateSchema,
    // прокидываем его дальше в функцию создания стора
    asyncReducers as ReducersMapObject<StateSchema>
  );

  return <Provider store={store}>{children}</Provider>;
};
