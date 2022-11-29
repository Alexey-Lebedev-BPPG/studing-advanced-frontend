import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}
// все, что в виджете будет экспортиться не по дефолту
// навбар будет принимать доп класс, чтоб извне можно было поправить какие-то стили в нем
export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(cls.navbar, {}, [className])}>
    <div className={cls.links}>
      <AppLink to="/" theme={AppLinkTheme.SECONDARY} className={cls.mainLink}>
        Главная страница
      </AppLink>
      <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>
        О сайте
      </AppLink>
    </div>
  </div>
);
