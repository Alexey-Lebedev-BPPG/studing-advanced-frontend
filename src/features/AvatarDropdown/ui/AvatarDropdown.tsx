import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

export interface IAvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<IAvatarDropdownProps> = memo(
  ({ className }) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = useCallback(() => {
      dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) return null;

    return (
      <Dropdown
        direction='bottom left'
        className={classNames('', {}, [className])}
        items={[
          // добавление объектов в массив по условию
          ...(isAdminPanelAvailable
            ? [{ content: t('Админка'), href: getRouteAdminPanel() }]
            : []),
          { content: t('Профиль'), href: getRouteProfile(authData.id) },
          { content: t('Выйти'), onClick: onLogout },
        ]}
        trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
      />
    );
  },
);
