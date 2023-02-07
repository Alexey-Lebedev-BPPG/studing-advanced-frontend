import { FC, memo, useMemo, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button";
import { ButtonSize, ButtonTheme } from "shared/ui/Button/ui/Button";
import { LanguageSwitcher } from "shared/ui/LanguageSwitcher";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { SidebarItemsList } from "../../model/items";
import { SidebarItem } from "../SidebarItem";
import cls from "./SideBar.module.scss";

interface ISideBarProps {
  className?: string;
}

export const SideBar: FC<ISideBarProps> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      SidebarItemsList.map((item) => (
        <SidebarItem
          item={item}
          collapsed={collapsed}
          key={item.path}
        />
      )),
    [collapsed]
  );
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
        {/* рендерим наши ссылки сайтбара */}
        {itemsList}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
});
