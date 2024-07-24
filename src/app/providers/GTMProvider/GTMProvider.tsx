import { FC, ReactNode } from 'react';
import TagManager from 'react-gtm-module';

interface IGTMProviderProviderProps {
  children: ReactNode;
}

export const GTMProviderProvider: FC<IGTMProviderProviderProps> = props => {
  const { children } = props;

  const gtmId = process.env.GOOGLE_TAG_MANAGER || '';
  const isProd =
    process.env.APP_ENV === 'prod' || process.env.APP_ENV === 'dev';

  isProd && TagManager.initialize({ gtmId });

  return children;
};
