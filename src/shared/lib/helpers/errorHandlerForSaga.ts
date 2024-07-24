import axios from 'axios';
// import { showSnackbar } from '@/shared/ui/Snackbars/Snackbars';

export const errorHandlerForSaga = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const customError = error?.response as IResponse<IErrorMessage>;
    // if (customError?.data?.statusCode !== 401)
    //   showSnackbar(customError?.data?.message, 'error');
    console.log('customError', customError);
  } else console.log('error in saga', error);
};
