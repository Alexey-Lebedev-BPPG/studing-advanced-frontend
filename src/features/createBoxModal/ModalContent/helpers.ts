import { IBox } from './types';

export const getInitialBox = (): IBox => ({
  address: 'address',
  category: 'category',
  createdAt: 'createdAt',
  description: 'description',
  frontImage: 'frontImageCreate',
  frontImageM: 'frontImageMCreate',
  frontImageS: 'frontImageSCreate',
  id: 'idCreate',
  insuredValue: 'insuredValueCreate',
  location: [
    'PWCC Vault: Collector Crypt #732795',
    '7560 SW Durham Rd',
    'Tigard, OR 97224',
  ],
  name: 'nameCreate',
  qty: 0,
  status: 'Ready',
  type: 'typeCreate',
  updatedAt: 'updatedAtCreate',
  vault: 'vaultCreate',
  vaultId: 'vaultIdCreate',
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
