import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import { ReduxStoreWithManager, StateSchema } from './stateSchema';
import { CounterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { scrollSaveReducer } from '@/features/ScrollSave';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
// import createSagaMiddleware from 'redux-saga';
// import { persistStore, persistReducer } from 'redux-persist';

// стандартное решение для редакса
// export default configureStore({ reducer: {} });

// однако мы создадим такую функцию для создания стора, чтоб мы могли ее потом переиспользовать в других местах
export const createReduxStore = (
  initialState?: StateSchema,
  // принимаем асинхронные редьюсеры
  asyncReducers?: ReducersMapObject<StateSchema>,
  // принимаем функцию из StoreProvider
  // navigate?: (to: To, option?: NavigateOptions) => void
) => {
  // for saga
  // const sagaMiddleware = createSagaMiddleware();

  const rootReducers: ReducersMapObject<StateSchema> = {
    // разворачиваем асинхронные редьюсеры в главный стор
    ...asyncReducers,
    counter: CounterReducer,
    scrollSave: scrollSaveReducer,
    user: userReducer,
    // пример объединения редьюсеров
    // shipment: combineReducers({
    //   inboundShipment: shipmentInboundReducer,
    //   outboundShipment: shipmentOutboundReducer,
    // }),
    // указываем редьюсер для rtk запросов
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  // для персиста
  // export interface ThunkExtraArg {
  //   api: AxiosInstance;
  // }
  // const persistConfig = { key: 'root', storage: localStorage };
  // const reducerManager = createReducerManager(rootReducer);
  // const persistedReducer = persistReducer(
  //   persistConfig,
  //   reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  // );
  // const extraArg: ThunkExtraArg = { api: app };

  // Ввиду того, что сам компонент мы сделали асинхронным, но импортируемые редьюсеры и т.п. из него загружаются в главный бандл, сделаем асинхронную подгрузку редьюсеров через редьюсер-менеджера
  const reducerManager = createReducerManager(rootReducers);

  // указываем тип стейта в дженерике (убираем при указании мидлваера)
  const store = configureStore({
    // отключаем девтулзы для продакшена
    devTools: __IS_DEV__,

    // создаем мидлваер, что передать туда наш инстанс аксиоса
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          // сюда можно передать все что угодно
          // extraArgument: { api: $api, navigate },
          extraArgument: {
            api:
              // для персиста
              // extraArg
              $api,
          },
        },
      })
        // для саги
        // .concat(sagaMiddleware)
        // добавляем мидлваер для rtk запросов
        .concat(rtkApi.middleware),

    // делаем инишиал стейт по ум.
    preloadedState: initialState,

    // для персиста
    // reducer: persistedReducer,

    // чтоб для взаимодействия с асинхронными редьюсерами в компонентах, нам нужно передавать редьюсером не rootReducer, а функцию reduce из reduceManager
    // reducer: rootReducers, + !!! нужно править типизацию
    reducer: reducerManager.reduce as Reducer<StateSchema>,
  }) as ReduxStoreWithManager;

  // добавляем наш менеджер для стейта
  store.reducerManager = reducerManager;

  // для саги
  // sagaMiddleware.run(saga);
  // для персиста
  // const persist = persistStore(store);
  // return { persist, store };

  return store;
};

// создаем тип для диспатча, чтоб подхватывались используемые типы
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
