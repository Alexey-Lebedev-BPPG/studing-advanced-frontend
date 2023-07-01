export enum AppRoutes {
  ABOUT = 'about',
  ADMIN_PANEL = 'admin_panel',
  ARTICLES = 'articles',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_EDIT = 'article_edit',
  FORBIDDEN = 'forbidden',
  MAIN = 'main',
  NOT_FOUND = 'not_found',
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
