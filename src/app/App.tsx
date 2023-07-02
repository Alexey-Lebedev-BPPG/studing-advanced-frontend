import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoadLayout } from '@/shared/layouts/AppLoadLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { SideBar } from '@/widgets/SideBar';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

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
          </div>
        }
        on={
          <div id='app' className={classNames('app-redesigned', {}, [theme])}>
            <AppLoadLayout />
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
            />
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
