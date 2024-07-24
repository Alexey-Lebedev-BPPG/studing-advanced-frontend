// для обработки ошибок в catch саги
import axios from 'axios';
import { showSnackbar } from '@/shared/ui/redesigned/Snackbars/Snackbars';
import type { SnackbarTypeT } from '@/shared/ui/redesigned/Snackbars/Snackbars';

export const errorHandlerForSaga = (error: unknown, type?: SnackbarTypeT) => {
  if (axios.isAxiosError(error)) {
    const customError = error.response as IResponse<IErrorMessage>;
    if (
      customError?.data?.statusCode !== 401 &&
      customError?.data?.message !== 'User not found'
    )
      showSnackbar(customError?.data?.message, type || 'warning');
  } else console.log('error in saga', error);
};
