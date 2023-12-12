/* eslint-disable @typescript-eslint/no-restricted-imports */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateSchema } from '@/app/providers/StoreProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
