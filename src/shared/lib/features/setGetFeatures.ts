import { FeatureFlags } from '@/shared/types/featureFlags';

// пока делаем фичи-флаги в константах, потому что в рамках одной сессии они навряд ли поменяются. Однако потом нужно будет переделать на сохранение в редакс
let featureFlags: FeatureFlags = {};

// создаем геттер и сеттер, чтоб случайно не перезатереть константу. именно поэтому мы ее не импортим

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
};

export const getFeatureFlags = (flag: keyof FeatureFlags) =>
  featureFlags?.[flag];
