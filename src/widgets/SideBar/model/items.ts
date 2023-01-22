import { VFC, SVGProps } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/main.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";

export interface SidebarItemType {
  path: string;
  text: string;
  // ввиду того, что компоненты пишутся с большой буквы, поле icon пишем также с большой буквы
  Icon: VFC<SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: "Главная страница",
    Icon: MainIcon,
  },
  {
    path: RoutePath.about,
    text: "О сайте",
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: "Профиль",
    Icon: ProfileIcon,
  },
];
