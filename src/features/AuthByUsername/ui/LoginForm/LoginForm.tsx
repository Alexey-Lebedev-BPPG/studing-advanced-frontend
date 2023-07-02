import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './LoginForm.module.scss';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface ILoginFormProps {
  className?: string;
  onSuccess: () => void;
}

// чтоб напрямую не передавать в пропсы объект такого типа reducers={{ loginForm: loginReducer }}, т.к. это каждый раз будет создавать новый объект, мы делаем редьюсер по ум.
const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: FC<ILoginFormProps> = memo(({ className, onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const forceUpdate = useForceUpdate();

  // ввиду того, что мы достаем данные до того, как у нас сработает useEffect, нам необходимо либо сделать инишиал стейт для getLoginState или сделать для каждого поля getLoginState свой селектор (сейчас сделаем для каждого свой)
  // вместо:
  // const { username, password, isLoading, error } = useSelector(getLoginState);
  // вот это:
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    // вызываем наш thunk для передачи данных на бэк
    const result = await dispatch(loginByUsername({ password, username }));
    // вызываем функцию, которая сработает (здесь закрытие модалки), если запрос прошел успешно
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      // + перерисовываем все приложение для изменения фичи-флагов
      forceUpdate();
    }
  }, [dispatch, forceUpdate, onSuccess, password, username]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <div className={classNames(cls.loginForm, {}, [className])}>
            <TextDeprecated title={`${t('Форма авторизации')}`} />
            {!!error && <TextDeprecated text={error} theme={TextTheme.ERROR} />}
            <InputDeprecated
              autofocus
              type='text'
              className={cls.input}
              placeholder={`${t('Введите username')}`}
              value={username}
              onChange={onChangeUsername}
            />
            <InputDeprecated
              type='text'
              className={cls.input}
              placeholder={`${t('Введите пароль')}`}
              value={password}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              className={cls.loginBtn}
              disabled={isLoading}
              onClick={onLoginClick}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
        on={
          <VStack gap='16'>
            <Text title={`${t('Форма авторизации')}`} />
            {!!error && <Text text={error} variant='error' />}
            <Input
              autofocus
              type='text'
              className={cls.input}
              placeholder={`${t('Введите username')}`}
              value={username}
              onChange={onChangeUsername}
            />
            <Input
              type='text'
              className={cls.input}
              placeholder={`${t('Введите пароль')}`}
              value={password}
              onChange={onChangePassword}
            />
            <Button
              variant='outline'
              className={cls.loginBtn}
              disabled={isLoading}
              onClick={onLoginClick}
            >
              {t('Войти')}
            </Button>
          </VStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
