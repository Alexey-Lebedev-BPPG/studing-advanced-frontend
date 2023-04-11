import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { RoutePath } from "@/shared/const/router";
import MainIcon from "@/shared/assets/icons/main-20-20.svg";
import AboutIcon from "@/shared/assets/icons/about-20-20.svg";
import ProfileIcon from "@/shared/assets/icons/profile-20-20.svg";
import ArticleIcon from "@/shared/assets/icons/article-20-20.svg";
import { SidebarItemType } from "../types/sidebar";

// предназначен для того, чтоб получать items для сайдбара во взаимодействии с редаксом
// используем createSelector, чтоб мемоизировать значения, т.к. они изменяться не будут
export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
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
  ];

  if (userData)
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true,
      }
    );

  return sidebarItemsList;
});
