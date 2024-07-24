import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import urls from '@/shared/const/urls';

export const getProductById = createAsyncThunk<
  any,
  number,
  ThunkConfig<string>
>('getProductById', async (productId, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<any>(urls.location());

    if (!response.data) throw new Error();

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
