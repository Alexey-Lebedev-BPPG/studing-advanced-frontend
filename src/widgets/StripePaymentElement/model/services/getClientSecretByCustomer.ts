import { createAsyncThunk } from '@reduxjs/toolkit';
import { IgetClientSecretByCustumerProps } from '../types/stripePaymentSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import urls from '@/shared/const/urls';
import { showSnackbar } from '@/shared/ui/redesigned/Snackbars/Snackbars';

interface IgetClientSecretByCustumerResponse {
  amount: number;
  clientSecret: string;
  id: string;
}

export const getClientSecretByCustomer = createAsyncThunk<
  IgetClientSecretByCustumerResponse,
  IgetClientSecretByCustumerProps,
  ThunkConfig<string>
>('getClientSecret', async (paymentData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const { utmCampaign, utmContent, utmMedium, utmSource, utmTerm } =
    paymentData;

  try {
    const response = await extra.api.post<IgetClientSecretByCustumerResponse>(
      urls.stripe.getClientSecretByCustomer({
        utmCampaign,
        utmContent,
        utmMedium,
        utmSource,
        utmTerm,
      }),
      paymentData,
    );

    if (!response.data) throw new Error(response.data);

    return response.data;
  } catch (e: any) {
    if (!e?.response?.data?.errorCode?.includes('notAllowed'))
      showSnackbar(e?.response?.data?.message, 'error');

    return rejectWithValue(e?.response?.data?.errorCode);
  }
});
