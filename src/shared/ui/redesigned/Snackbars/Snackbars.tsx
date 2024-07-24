import './snackbars.css';
import { toast, ToastContainer } from 'react-toastify';
import { Icon } from '../Icon';
import { HStack, VStack } from '../Stack';
import { Text } from '../Text';
import CloseSVG from '@/shared/assets/icons/Info.svg';
// import {
//   IconError,
//   IconSuccess,
//   IconWarning,
// } from '@/shared/assets/svg/Snackbar';

export type SnackbarTypeT = 'success' | 'error' | 'info' | 'warning';

export const showSnackbar = (
  text: string,
  type: SnackbarTypeT,
  lang: string = 'ru',
) => {
  // const snackIcon = () => {
  //   if (type === 'error')
  //     return <Image src={IconError} alt='' width={20} height={20} />;
  //   if (type === 'info' || type === 'warning')
  //     return <Image src={IconWarning} alt='' width={20} height={20} />;
  //   return <Image src={IconSuccess} alt='' width={20} height={20} />;
  // };

  const snackTitle = () => {
    if (lang === 'ru') {
      if (type === 'error') return 'ошибка';
      if (type === 'info') return 'информация';
      if (type === 'warning') return 'внимание';
      return 'успех';
    }
    if (lang === 'en') {
      if (type === 'error') return 'error';
      if (type === 'info') return 'info';
      if (type === 'warning') return 'warning';
      return 'success';
    }
    return '';
  };

  return (
    type &&
    toast[`${type}`](
      <HStack gap='16' className='snackbar' align='start'>
        {/* {snackIcon()} */}
        <VStack gap='16'>
          <Text variant='accent' className='snack-type' text={snackTitle()} />
          <Text variant='accent' className='snack-text' text={text} />
        </VStack>
      </HStack>,
    )
  );
};

export const SnackbarsContainer = () => (
  <ToastContainer
    hideProgressBar
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    position='top-right'
    autoClose={3000}
    newestOnTop={false}
    rtl={false}
    theme='colored'
    icon={false}
    closeButton={<Icon Svg={CloseSVG} />}
  />
);
