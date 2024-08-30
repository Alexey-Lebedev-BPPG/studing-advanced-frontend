// example copy button
import { FC } from 'react';
import { ICopyButtonProps } from './types';
import { showSnackbar } from '../../../Snackbars/Snackbars';
import CopySVG from '@/shared/assets/icons/Info.svg';

export const CopyButton: FC<ICopyButtonProps> = ({ value }) => {
  const handleCopy = (currentValue: string) => {
    navigator.clipboard.writeText(currentValue);
    showSnackbar('Copied', 'success');
  };

  return (
    <button
      type='button'
      aria-label='toggle password visibility'
      style={{ fill: 'black' }}
      onClick={() => handleCopy(value)}
    >
      <CopySVG />
      {!!value && value}
    </button>
  );
};
