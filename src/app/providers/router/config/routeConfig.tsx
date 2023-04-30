import { UserRole } from '../../../consts/consts';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
  AppRoutes,
  getRouteAbout,
  getRouteAdminPanel,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    element: <MainPage />,
    path: getRouteMain(),
  },
  [AppRoutes.ABOUT]: {
    element: <AboutPage />,
    path: getRouteAbout(),
  },
  [AppRoutes.PROFILE]: {
    authOnly: true,

    element: <ProfilePage />,
    // добаляем динамически id
    path: getRouteProfile(':id'),
  },
  [AppRoutes.ARTICLES]: {
    authOnly: true,
    element: <ArticlesPage />,
    path: getRouteArticles(),
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    authOnly: true,

    element: <ArticleDetailsPage />,
    // добаляем динамически id
    path: getRouteArticleDetails(':id'),
  },
  [AppRoutes.ARTICLE_CREATE]: {
    authOnly: true,
    element: <ArticleEditPage />,
    path: getRouteArticleCreate(),
  },
  [AppRoutes.ARTICLE_EDIT]: {
    authOnly: true,
    element: <ArticleEditPage />,
    path: getRouteArticleEdit(':id'),
  },
  [AppRoutes.ADMIN_PANEL]: {
    authOnly: true,
    element: <AdminPanelPage />,
    path: getRouteAdminPanel(),
    // добавляем массив ролей, чтоб потом сделать проверку на них
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },
  [AppRoutes.FORBIDDEN]: {
    element: <ForbiddenPage />,
    path: getRouteForbidden(),
  },
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPage />,
    path: '*',
  },
};
