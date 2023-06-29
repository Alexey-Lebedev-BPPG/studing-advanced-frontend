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
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

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

    const items = [
      // добавление объектов в массив по условию
      ...(isAdminPanelAvailable
        ? [{ content: t('Админка'), href: getRouteAdminPanel() }]
        : []),
      { content: t('Профиль'), href: getRouteProfile(authData.id) },
      { content: t('Выйти'), onClick: onLogout },
    ];

    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <DropdownDeprecated
            direction='bottom left'
            className={classNames('', {}, [className])}
            items={items}
            trigger={
              <AvatarDeprecated
                fallbackInverted
                size={30}
                src={authData.avatar}
              />
            }
          />
        }
        on={
          <Dropdown
            direction='bottom left'
            className={classNames('', {}, [className])}
            items={items}
            trigger={<Avatar size={40} src={authData.avatar} />}
          />
        }
      />
    );
  },
);
