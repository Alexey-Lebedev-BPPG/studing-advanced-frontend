import { FC, ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation, useSearchParams } from 'react-router-dom';

interface IGoogleAnalyticsProviderProps {
  children: ReactNode;
}

export const GoogleAnalyticsProvider: FC<
  IGoogleAnalyticsProviderProps
> = props => {
  const { children } = props;
  const { pathname } = useLocation();
  const search = useSearchParams();

  const isProd =
    process.env.APP_ENV === 'prod' || process.env.APP_ENV === 'dev';
  const gaId = process.env.GOOGLE_ANALYTICS;

  isProd && ReactGA.initialize(gaId || '');

  useEffect(() => {
    isProd && ReactGA.send({ hitType: 'pageview', page: pathname + search });
  }, [isProd, pathname, search]);

  return children;
};
