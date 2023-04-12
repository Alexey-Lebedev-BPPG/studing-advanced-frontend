import { createSelector } from "@reduxjs/toolkit";
import { SidebarItemType } from "../types/sidebar";
import { getUserAuthData } from "@/entities/User";
import AboutIcon from "@/shared/assets/icons/about-20-20.svg";
import ArticleIcon from "@/shared/assets/icons/article-20-20.svg";
import MainIcon from "@/shared/assets/icons/main-20-20.svg";
import ProfileIcon from "@/shared/assets/icons/profile-20-20.svg";
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";

// предназначен для того, чтоб получать items для сайдбара во взаимодействии с редаксом
// используем createSelector, чтоб мемоизировать значения, т.к. они изменяться не будут
export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: "Главная страница",
      Icon: MainIcon,
    },
    {
      path: getRouteAbout(),
      text: "О сайте",
      Icon: AboutIcon,
    },
  ];

  if (userData)
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true,
      }
    );

  return sidebarItemsList;
});
