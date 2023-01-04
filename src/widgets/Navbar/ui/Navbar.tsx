import { t } from "i18next";
import { useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/ui/Button";
import { Modal } from "shared/ui/Modal";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}
// все, что в виджете будет экспортиться не по дефолту
// навбар будет принимать доп класс, чтоб извне можно было поправить какие-то стили в нем
export const Navbar = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);

  // все функции, которые будут передаваться пропсами, ОБЯЗАТЕЛЬНО помещаем в useCallback, чтоб сохранять ссылку на эту функцию
  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t("Войти")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus minima iusto commodi quia, id odio dolorem minus quisquam temporibus aliquam pariatur accusantium voluptate repudiandae! Iusto et, ipsum optio nisi veritatis sint aspernatur quo ea possimus autem? Ipsam minus aspernatur quos ab voluptatibus sunt aliquam minima officiis, consectetur vero illo consequatur corporis maxime animi voluptatem quaerat nam qui magnam. Ad, voluptatum harum voluptas eum expedita culpa in. Est architecto alias dolorem nostrum voluptatum numquam exercitationem minus non omnis amet, maiores culpa eveniet voluptates molestias? Ad laudantium beatae voluptates aperiam sunt. Quaerat laborum aspernatur blanditiis natus earum explicabo a perferendis ducimus quibusdam?
      </Modal>
    </div>
  );
};
