import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/UserSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunk-e
export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) return rejectWithValue('USERIDERROR');

    try {
      // отправляем запрос, минуя хуки и при этом разворачиваем ответ из промиса с помощью
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      return response;
    } catch (error) {
      // чтоб не показывался консоль при тестах
      __PROJECT__ !== 'jest' && console.log(error);
      // для обработки ошибок
      return rejectWithValue(i18next.t('JSONSETTINGS_ERROR'));
    }
  },
);
