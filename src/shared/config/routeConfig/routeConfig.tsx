import { UserRole } from "entities/User";
import { AboutPage } from "pages/AboutPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticleEditPage } from "pages/ArticleEditPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

// расширяем типизацию стандартных роутов, чтоб сделать роуты только для авторизованных пользователей
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile/", // плюс сюда должен добавляться айдишник
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLE_DETAILS]: "/articles/", // плюс сюда должен добавляться айдишник
  [AppRoutes.ARTICLE_CREATE]: "/articles/new",
  [AppRoutes.ARTICLE_EDIT]: "/articles/:id/edit", // сюда должен добавляться айдишник статьи
  [AppRoutes.ADMIN_PANEL]: "/admin",
  [AppRoutes.FORBIDDEN]: "/forbidden",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    // добаляем динамически id
    path: `${RoutePath[AppRoutes.PROFILE]}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath[AppRoutes.ARTICLES],
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    // добаляем динамически id
    path: `${RoutePath[AppRoutes.ARTICLE_DETAILS]}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: `${RoutePath[AppRoutes.ARTICLE_CREATE]}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: `${RoutePath[AppRoutes.ARTICLE_EDIT]}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: `${RoutePath[AppRoutes.ADMIN_PANEL]}`,
    element: <AdminPanelPage />,
    authOnly: true,
    // добавляем массив ролей, чтоб потом сделать проверку на них
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },
  [AppRoutes.FORBIDDEN]: {
    path: `${RoutePath[AppRoutes.FORBIDDEN]}`,
    element: <ForbiddenPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
