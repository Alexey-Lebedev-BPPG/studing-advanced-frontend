import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { getUserInited, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { SideBar } from '@/widgets/SideBar';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  // при инициализации приложения проверяем авторизованность юзера из локал стораджа
  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);
  return (
    <div className={classNames('app', {}, [theme])}>
      {/* оборачиваем приложение в Suspense, чтоб корректно работали переводы */}
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <SideBar />
          {!!inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
