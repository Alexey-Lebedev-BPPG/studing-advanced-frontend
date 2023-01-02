import { FC, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { LanguageSwitcher } from "widgets/LanguageSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
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
      <button onClick={onToggle} type="button" data-testid="sidebar-toggle">
        toggle
      </button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher className={cls.lang} />
      </div>
    </div>
  );
};
