import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  newFeatureFlag: Partial<FeatureFlags>;
  userId: string;
}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thun-ke
export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
>(
  'feature/updateFeatureFlags',
  async ({ newFeatureFlag, userId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    const allFeatures = { ...getAllFeatureFlags(), ...newFeatureFlag };

    try {
      // отправляем запрос, минуя хуки
      await dispatch(
        updateFeatureFlagsMutation({
          features: allFeatures,
          userId,
        }),
      );
      // ввиду того, что фичи у нас не реактивные (не хранятся в стейте), при их изменении страница не перерисуется. поэтому принудительно обновляем страницу. Если мы используем forceUpdate, то эту строку можно убрать
      // window.location.reload();
      // тогда нужно будет вручную изменить тогл-фичи
      // setFeatureFlags(allFeatures);

      // на данный момент сделаем перезагрузку страницы, чтоб избежать побочных эффектов
      window.location.reload();
      return undefined;
    } catch (error) {
      // чтоб не показывался консоль при тестах
      __PROJECT__ !== 'jest' && console.log(error);
      // для обработки ошибок
      return rejectWithValue(i18next.t('updateFeatureFlags_ERROR'));
    }
  },
);
