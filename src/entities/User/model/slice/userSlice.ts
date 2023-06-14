import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/UserSchema';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
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
