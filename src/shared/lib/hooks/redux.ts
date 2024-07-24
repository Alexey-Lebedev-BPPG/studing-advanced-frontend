// import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import {
  StateSchema,
  // ThunkExtraArg,
  AppDispatch,
} from '@/app/providers/StoreProvider';

// export type AppDispatch = ThunkDispatch<
//   StateSchema,
//   ThunkExtraArg,
//   UnknownAction
// >;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
