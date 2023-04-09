import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { SidebarItemType } from "../../../model/types/sidebar";
import cls from "./SidebarItem.module.scss";

interface ISidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: FC<ISidebarItemProps> = memo(
  ({ item, collapsed }) => {
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) return null;

    return (
      <AppLink
        to={item.path}
        theme={AppLinkTheme.SECONDARY}
        className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      >
        <item.Icon className={cls.icon} />
        <span className={cls.link}>{item.text}</span>
      </AppLink>
    );
  }
);
