import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import i18next from "i18next";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { Profile } from "../../types/profile";

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/updateProfileData", async (_, thunkApi) => {
  // получаем стейт, что потом вызывать селекторы, в которые прокидываются стейт
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getProfileForm(getState());

  try {
    const response = await extra.api.put<Profile>("/profile", formData);

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t("LOGIN_ERROR"));
  }
});
