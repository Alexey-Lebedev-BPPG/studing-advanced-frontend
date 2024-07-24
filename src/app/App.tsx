import { Suspense, memo, useEffect } from 'react';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoadLayout } from '@/shared/layouts/AppLoadLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { SnackbarsContainer } from '@/shared/ui/redesigned/Snackbars/Snackbars';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { SideBar } from '@/widgets/SideBar';

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getUserInited);
  // получаем компонент, который необходимо показывать на текущей странице
  const toolbar = useAppToolbar();

  // при инициализации приложения проверяем авторизованность юзера из локал стораджа
  useEffect(() => {
    // делаем обязательную проверку на то, проинициализированы ли были данные или нет, т.к. при принудительном перерендере всего приложения (когда меняем фичи-флаги) запрос пройдет заново
    if (!inited) dispatch(initAuthData());
  }, [dispatch, inited]);

  if (!inited)
    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <div id='app' className={classNames('app', {}, [theme])}>
            <PageLoader />
            <SnackbarsContainer />
          </div>
        }
        on={
          <div id='app' className={classNames('app-redesigned', {}, [theme])}>
            <AppLoadLayout />
            <SnackbarsContainer />
          </div>
        }
      />
    );

  // меняем отображение в зависимости от включенного флага редизайна
  return (
    <ToggleFeatures
      nameFeatures='isAppRedesigned'
      off={
        <div id='app' className={classNames('app', {}, [theme])}>
          {/* оборачиваем приложение в Suspense, чтоб корректно работали переводы */}
          <Suspense fallback=''>
            <Navbar />
            <div className='content-page'>
              <SideBar />
              <AppRouter />
            </div>
          </Suspense>
          <SnackbarsContainer />
        </div>
      }
      on={
        <div id='app' className={classNames('app-redesigned', {}, [theme])}>
          {/* оборачиваем приложение в Suspense, чтоб корректно работали переводы */}
          <Suspense fallback=''>
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<SideBar />}
              toolbar={toolbar}
            />
          </Suspense>
          <SnackbarsContainer />
        </div>
      }
    />
  );
});

export default withTheme(App);
