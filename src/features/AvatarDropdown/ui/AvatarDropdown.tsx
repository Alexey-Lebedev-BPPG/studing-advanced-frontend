import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

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
        direction="bottom left"
        className={classNames("", {}, [className])}
        items={[
          // добавление объектов в массив по условию
          ...(isAdminPanelAvailable
            ? [{ content: t("Админка"), href: RoutePath.admin_panel }]
            : []),
          { content: t("Профиль"), href: RoutePath.profile + authData.id },
          { content: t("Выйти"), onClick: onLogout },
        ]}
        trigger={<Avatar size={30} src={authData.avatar} />}
      />
    );
  }
);
