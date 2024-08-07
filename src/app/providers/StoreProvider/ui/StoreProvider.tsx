import { ReducersMapObject } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import { StateSchema } from '../config/stateSchema';
import { createReduxStore } from '../config/store';

interface IStoreProviderProps {
  // добавляем пропс в виде async редьюсеров, чтоб в сторибук не падала ошибка
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

// не используем memo в компонентах, где у нас есть children
export const StoreProvider: FC<IStoreProviderProps> = ({
  asyncReducers,
  children,
  initialState,
}) => {
  // для персиста
  // const { store, persist } = createReduxStore(
  //   initialState as PreloadedState<CombinedState<NoInfer<StateSchema>>>,
  //   asyncReducers as ReducersMapObject<StateSchema>,
  // );

  // в стор можно прокинуть навигейт, однако тогда компоненты будут перерендерится.
  // const navigate = useNavigate();
  const store = createReduxStore(
    initialState as StateSchema,
    // прокидываем его дальше в функцию создания стора
    asyncReducers as ReducersMapObject<StateSchema>,
    // прокидываем функцию из хука, чоб потом можно было ее использовать в thunk-ах
    // navigate
  );

  return (
    <Provider store={store}>
      {/* для персиста */}
      {/* <PersistGate loading={null} persistor={persist}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};
