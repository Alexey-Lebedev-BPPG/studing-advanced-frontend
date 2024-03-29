import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
  // если колбек ничего не принимает, то прокидываем первым аргументом _
  // >("profile/fetchProfileData", async (_, thunkApi) => {
>('profile/fetchProfileData', async (profileId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Profile>(`/profile/${profileId}`);

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    __PROJECT__ !== 'jest' && console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t('LOGIN_ERROR'));
  }
});
