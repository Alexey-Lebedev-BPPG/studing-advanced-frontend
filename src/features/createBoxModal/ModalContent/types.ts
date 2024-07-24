import { Dispatch, SetStateAction } from 'react';

interface IChunk {
  createdAt: string;
  id: string;
  owner: any;
  qty: number;
  status: string;
}

export interface IBox {
  address: string;
  backImage?: string;
  backImageM?: string;
  backImageS?: string;
  category: string;
  chunks?: IChunk[];
  createdAt: string;
  description: string;
  frontImage: string;
  frontImageM: string;
  frontImageS: string;
  id: string;
  insuredValue: string;
  location?: string[];
  name: string;
  orientation?: 'horizontal' | 'vertical';
  qty: number;
  status: 'Ready' | 'Burn' | 'Mint';
  type: string;
  updatedAt: string;
  vault: string;
  vaultId: string;
  year: number;
}

export interface ICreateBoxProps {
  files: string[];
  isButtonActive: boolean;
  orientation: 'horizontal' | 'vertical';
  previewUrl: string[];
  removeForm?: () => void;
  setFile: Dispatch<SetStateAction<string[]>>;
  setIsButtonActive: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOrientation: Dispatch<SetStateAction<'horizontal' | 'vertical'>>;
  setPreviewUrl: Dispatch<SetStateAction<string[]>>;
}

export interface IFormDataCreateBox
  extends Pick<
    IBox,
    | 'category'
    | 'description'
    | 'insuredValue'
    | 'name'
    | 'status'
    | 'vault'
    | 'vaultId'
    | 'year'
  > {
  ownerEmail?: string;
  qty: number | null;
  wallet: string;
}
