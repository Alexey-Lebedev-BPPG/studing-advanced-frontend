import { Dispatch, SetStateAction } from 'react';
import { IBox } from '../types';

export const requaredValuesArray: Array<keyof IBox> = [
  'name',
  'year',
  'qty',
  'category',
  'vault',
  'vaultId',
];

export const isBoxValid = (
  box: IBox,
  setIsButtonActive: Dispatch<SetStateAction<boolean>>,
  files: string[],
  ownerEmail: string,
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const value of requaredValuesArray)
    if (box[value] === '') {
      setIsButtonActive(false);
      return false;
    }

  if (ownerEmail === '') {
    setIsButtonActive(false);
    return false;
  }
  if (files[0] === '') {
    setIsButtonActive(false);
    return false;
  }
  setIsButtonActive(true);
  return true;
};
