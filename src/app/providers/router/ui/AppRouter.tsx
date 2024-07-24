import { FC, memo, Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/widgets/PageLoader';

const AppRouter: FC = () => {
  // создаем функцию для перебора массива роутов
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    // создаем сам элемент, обернутый в suspense
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        // проверяем, если роут авторизован, то добавляем обертку защитника роута. Иначе просто рендерим элемент
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);

// for sentry
// import {
//   init,
//   Integrations,
//   withSentryReactRouterV6Routing,
// } from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';
// import { memo, Suspense, useCallback } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { RequireAuth } from './RequireAuth';
// import { routeConfigs } from '../model/routeConfig';
// import { AppRoutesProps } from '@/shared/types/router';

// const AppRouters = () => {
//   const renderWithWrapper = useCallback((route: AppRoutesProps) => {
//     const element = (
//       <Suspense fallback={<h1>Loading...</h1>}>{route.element}</Suspense>
//     );
//     return (
//       <Route
//         key={route.path}
//         path={route.path}
//         element={
//           route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
//         }
//       />
//     );
//   }, []);

//   const isIgnoreTypeError = (typeError?: string) =>
//     typeError === 'WalletNotSelectedError' ||
//     typeError === 'WalletConnectionError' ||
//     typeError === 'WalletSignMessageError' ||
//     typeError === 'WalletNotConnectedError' ||
//     typeError === 'WalletNotReadyError' ||
//     typeError === 'WalletWindowClosedError' ||
//     typeError === 'WalletWindowBlockedError';

//   const isIgnoreMessageError = (message: string) =>
//     message.includes('network error') || message.includes('User rejected');

//   environment.APP_ENV !== 'local' &&
//     init({
//       autoSessionTracking: false,
//       beforeSend: (event, hint) => {
//         if (environment.APP_ENV === 'local') return null;
//         if (
//           event.exception?.values &&
//           isIgnoreTypeError(event.exception?.values[0]?.type)
//         )
//           return null;
//         if (
//           event.exception?.values &&
//           event.exception?.values[0]?.value &&
//           isIgnoreMessageError(event.exception?.values[0]?.value)
//         )
//           return null;
//         return event;
//       },
//       dsn: environment.SENTRY_DSN,
//       environment: environment.APP_ENV,
//       ignoreErrors: [
//         'Network request failed',
//         'Failed to fetch',
//         'NetworkError',
//       ],
//       integrations: [
//         new BrowserTracing(),
//         new Integrations.Breadcrumbs({ console: false }),
//       ],
//       tracesSampleRate: 1.0,
//       tunnel: 'https://api.temp.com/sentry',
//     });
//   const SentryRoutes = withSentryReactRouterV6Routing(Routes);

//   return (
//     <SentryRoutes>
//       {Object.values(routeConfigs).map(renderWithWrapper)}
//     </SentryRoutes>
//   );
// };

// export default memo(AppRouters);
