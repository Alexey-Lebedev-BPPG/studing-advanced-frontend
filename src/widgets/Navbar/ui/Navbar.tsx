import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { t } from "i18next";
import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Text, TextTheme } from "shared/ui/Text/Text";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}
// все, что в виджете будет экспортиться не по дефолту
// навбар будет принимать доп класс, чтоб извне можно было поправить какие-то стили в нем
export const Navbar = memo(({ className }: NavbarProps) => {
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const [isAuthModal, setIsAuthModal] = useState(false);

  const isAdminPanelAvaible = isAdmin || isManager;

  // все функции, которые будут передаваться пропсами, ОБЯЗАТЕЛЬНО помещаем в useCallback, чтоб сохранять ссылку на эту функцию
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  // для авторизованного юзера
  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t("Ulbi Example")}
        />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t("Создать статью")}
        </AppLink>
        <Dropdown
          direction="bottom left"
          className={cls.dropdown}
          items={[
            // добавление объектов в массив по условию
            ...(isAdminPanelAvaible
              ? [{ content: t("Админка"), href: RoutePath.admin_panel }]
              : []),
            { content: t("Профиль"), href: RoutePath.profile + authData.id },
            { content: t("Выйти"), onClick: onLogout },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    );
  }
  // для не авторизованного юзера
  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      {/* если у нас модалка открывается, то только тогда мы модалку монтируем.если нет, то убираем ее из DOM-дерева */}
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
