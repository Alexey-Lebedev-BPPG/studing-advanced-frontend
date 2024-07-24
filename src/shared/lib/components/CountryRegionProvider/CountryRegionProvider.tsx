import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type CountryRegionData = typeof import('country-region-data');
export type CountryData =
  (typeof import('country-region-data').allCountries)['0'];

interface CountryRegionContextPayload {
  CountryRegion?: CountryRegionData;
  isLoaded?: boolean;
}

const CountryRegionContext = createContext<CountryRegionContextPayload>({});

const getAsyncCountryRegionModules = () =>
  Promise.all([import('country-region-data')]);

export const useCountryRegionLibs = () =>
  useContext(CountryRegionContext) as Required<CountryRegionContextPayload>;

export const CountryRegionProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const CountryRegionRef = useRef<CountryRegionData>();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncCountryRegionModules().then(([CountryRegion]) => {
      CountryRegionRef.current = CountryRegion;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      CountryRegion: CountryRegionRef.current,
      isLoaded,
    }),
    [isLoaded],
  );
  return (
    <CountryRegionContext.Provider value={value}>
      {children}
    </CountryRegionContext.Provider>
  );
};
