import { IBox } from './types';

export const getInitialBox = (): IBox => ({
  address: '',
  category: '',
  createdAt: '',
  description: '',
  frontImage: '',
  frontImageM: '',
  frontImageS: '',
  id: '',
  insuredValue: '',
  location: [
    'PWCC Vault: Collector Crypt #732795',
    '7560 SW Durham Rd',
    'Tigard, OR 97224',
  ],
  name: '',
  qty: 0,
  status: 'Ready',
  type: '',
  updatedAt: '',
  vault: '',
  vaultId: '',
  year: 0,
});

export const newBoxInFormData = (box: any, ownerId: string) => ({
  category: box.category,
  description: box.description,
  insuredValue: box.insuredValue,
  name: box.name,
  qty: box.qty || null,
  status: box.status,
  vault: box.vault,
  vaultId: box.vaultId,
  wallet: ownerId,
  year: box.year,
});
