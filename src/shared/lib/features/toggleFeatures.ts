import { getFeatureFlags } from './setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  off: () => T;
  on: () => T;
}

// функция, которая будет использоваться для добавления/удаления фичи флагов
export const toggleFeatures = <T>({
  name,
  off,
  on,
}: ToggleFeaturesOptions<T>): T => (getFeatureFlags(name) ? on() : off());
