export enum AppRoutes {
  ABOUT = 'about',
  ADMIN_PANEL = 'admin_panel',
  ARTICLES = 'articles',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_EDIT = 'article_edit',
  CAROUSEL_NETFLIX = 'carousel_netflix',
  FORBIDDEN = 'forbidden',
  MAIN = 'main',
  NOT_FOUND = 'not_found',
  PRINTING_INBOUND_SHIPMENT = 'printing_inbound_shipment',
  PRINTING_OUTBOUND_SHIPMENT = 'printing_outbound_shipment',
  PRINT_DOWNLOAD = 'print_download',
  PROFILE = 'profile',
  SETTINGS = 'settings',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettings = () => '/settings';
export const getRouteCarouselNetflix = () => '/carousel_netflix';
export const getRoutePrintDownload = () => '/print_download';
export const getRoutePrintingInboundShipment = () =>
  'printing_inbound_shipment';
export const getRoutePrintingOutboundShipment = () =>
  'printing_outbound_shipment';

// создаем объект, который поможет мапить текущий урл в вышеуказанные названия
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  [getRouteAdminPanel()]: AppRoutes.ADMIN_PANEL,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteCarouselNetflix()]: AppRoutes.CAROUSEL_NETFLIX,
  [getRoutePrintDownload()]: AppRoutes.PRINT_DOWNLOAD,
  [getRoutePrintingInboundShipment()]: AppRoutes.PRINTING_INBOUND_SHIPMENT,
  [getRoutePrintingOutboundShipment()]: AppRoutes.PRINTING_OUTBOUND_SHIPMENT,
};
