import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
// для отлова ошибок
import { ErrorBoundary } from './ErrorBoundary';
// для редакса
import { StoreProvider } from './StoreProvider';
// для темы
import { ThemeProvider } from './ThemeProvider';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

interface IRootProvidersProps {
  children?: JSX.Element;
}

export const RootProviders: FC<IRootProvidersProps> = props => {
  const { children } = props;

  return (
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ForceUpdateProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ForceUpdateProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  );
};
