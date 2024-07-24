import { createContext } from 'react';

interface CheckWalletProps {
  isLoadingAuth?: boolean;
  isLoadingEntry?: boolean;
  onConnect?: () => Promise<void>;
  setOpenModal?: (openModal: boolean) => void;
}

export const CheckWalletContext = createContext<CheckWalletProps>({});
