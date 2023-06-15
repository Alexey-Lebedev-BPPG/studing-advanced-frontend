import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { User, UserSchema } from '../types/UserSchema';
import { JsonSettings } from '../types/jsonSetting';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  // используется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunk-a есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk

      .addCase(
        saveJsonSettings.fulfilled,
        (state, { payload }: PayloadAction<JsonSettings>) => {
          // здесь обрабатываем ответ сервера
          if (state.authData) state.authData.jsonSettings = payload;
        },
      );
  },
  initialState,
  name: 'user',
  reducers: {
    // слайс для проверки авторизации пользователя при закрытии и открытии впоследствии вкладки
    initAuthData: state => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        const jsonUser = JSON.parse(user) as User;
        state.authData = jsonUser;
        // когда инициировали юзера, то меняем фичи-флаг
        setFeatureFlags(jsonUser?.features);
      }
      // делаем true только после добавления данных
      state._inited = true;
    },
    logout: state => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      // когда авторизовались, то меняем фичи-флаг
      setFeatureFlags(payload.features);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
