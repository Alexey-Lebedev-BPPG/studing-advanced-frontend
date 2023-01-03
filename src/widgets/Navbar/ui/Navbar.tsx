import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}
// все, что в виджете будет экспортиться не по дефолту
// навбар будет принимать доп класс, чтоб извне можно было поправить какие-то стили в нем
export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(cls.navbar, {}, [className])}>
    <div className={cls.links}>/</div>
  </div>
);
