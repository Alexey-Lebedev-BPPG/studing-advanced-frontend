import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type QRCodeStyling = typeof import('qr-code-styling');
export type { Options } from 'qr-code-styling';

interface QRCodeStylingContextPayload {
  QRCodeStyling?: QRCodeStyling;
  isLoaded?: boolean;
}

const QRCodeStylingContext = createContext<QRCodeStylingContextPayload>({});

const getAsyncQRCodeStylingModules = () =>
  Promise.all([import('qr-code-styling')]);

export const useQRCodeStylingLibs = () =>
  useContext(QRCodeStylingContext) as Required<QRCodeStylingContextPayload>;

export const QRCodeStylingProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const QRCodeStylingRef = useRef<QRCodeStyling>();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncQRCodeStylingModules().then(([QRCodeStyling]) => {
      QRCodeStylingRef.current = QRCodeStyling;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      QRCodeStyling: QRCodeStylingRef.current,
      isLoaded,
    }),
    [isLoaded],
  );
  return (
    <QRCodeStylingContext.Provider value={value}>
      {children}
    </QRCodeStylingContext.Provider>
  );
};
