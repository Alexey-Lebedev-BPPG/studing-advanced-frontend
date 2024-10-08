import { UserRole } from '../../../consts/consts';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { CarouselNetflixPage } from '@/pages/CarouselNetflixPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
  PDFDocumentInboundShipment,
  PDFDocumentOutboundShipment,
  PDFPrintPage,
} from '@/pages/PDFworker';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
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
  getRouteSettings,
  getRouteCarouselNetflix,
  getRoutePrintDownload,
  getRoutePrintingInboundShipment,
  getRoutePrintingOutboundShipment,
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
  [AppRoutes.SETTINGS]: {
    element: <SettingsPage />,
    path: getRouteSettings(),
  },
  [AppRoutes.PROFILE]: {
    authOnly: true,
    element: <ProfilePage />,
    // добавляем динамически id
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
    // добавляем динамически id
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
  [AppRoutes.CAROUSEL_NETFLIX]: {
    element: <CarouselNetflixPage />,
    path: getRouteCarouselNetflix(),
  },
  [AppRoutes.PRINT_DOWNLOAD]: {
    element: <PDFPrintPage />,
    path: getRoutePrintDownload(),
  },
  [AppRoutes.PRINTING_INBOUND_SHIPMENT]: {
    element: <PDFDocumentInboundShipment />,
    path: getRoutePrintingInboundShipment(),
  },
  [AppRoutes.PRINTING_OUTBOUND_SHIPMENT]: {
    element: <PDFDocumentOutboundShipment />,
    path: getRoutePrintingOutboundShipment(),
  },
};

// функция, которая возвращает роуты, у которых noHeaderFooter равен true
// export const pathNoHeaderFooter = () => {
//   const locals = Object.values(routeConfig)
//     .filter(path => path.noHeaderFooter)
//     .map(p => p.path);
//   return locals;
// };
