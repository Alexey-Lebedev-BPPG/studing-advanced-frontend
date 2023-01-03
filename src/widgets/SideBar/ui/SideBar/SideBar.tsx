import { FC, useState } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Button } from "shared/ui/Button";
import { ButtonSize, ButtonTheme } from "shared/ui/Button/ui/Button";
import { LanguageSwitcher } from "widgets/LanguageSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import MainIcon from "shared/assets/icons/main.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import cls from "./SideBar.module.scss";

interface ISideBarProps {
  className?: string;
}

export const SideBar: FC<ISideBarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sideBar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        onClick={onToggle}
        type="button"
        data-testid="sidebar-toggle"
        className={cls.collapsedBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? ">" : "<"}
      </Button>
      <div className={cls.items}>
        <div>
          <AppLink
            to={RoutePath.main}
            theme={AppLinkTheme.SECONDARY}
            className={cls.item}
          >
            <MainIcon className={cls.icon} />
            <span className={cls.link}>Главная страница</span>
          </AppLink>
        </div>
        <div>
          <AppLink
            to={RoutePath.about}
            theme={AppLinkTheme.SECONDARY}
            className={cls.item}
          >
            <AboutIcon className={cls.icon} />
            <span className={cls.link}>О сайте</span>
          </AppLink>
        </div>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
};
