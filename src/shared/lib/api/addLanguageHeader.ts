// для добавления языка в заголовки, чтоб передать язык на бэк
import { BaseQueryApi } from '@reduxjs/toolkit/query';
import { InternalAxiosRequestConfig } from 'axios';
import urls from '@/shared/const/urls';

type TApi = Pick<
  BaseQueryApi,
  'type' | 'getState' | 'extra' | 'endpoint' | 'forced'
>;

export const addLanguageHeaderExceptWhiteListForAxios = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const languageFromLocalStorage =
    typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng') || 'ru'
      : 'ru';

  const locationToken = process.env.LOCATION_TOKEN;

  const whiteListURLs = [urls.location(locationToken)];

  const endpointIsWhiteList = whiteListURLs.some(end => config.url === end);

  return {
    ...config,
    headers: {
      ...config.headers,
      ...(endpointIsWhiteList ? {} : { Language: languageFromLocalStorage }),
    },
    withCredentials: !endpointIsWhiteList,
  } as InternalAxiosRequestConfig;
};

export const addLanguageHeaderExceptWhiteListForRTK = (
  headers: Headers,
  api: TApi,
) => {
  const languageFromLocalStorage =
    typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng') || 'ru'
      : 'ru';
  const whiteListURLs = ['getUserLocation'];

  const endpointIsWhiteList = whiteListURLs.some(end => api.endpoint === end);

  if (endpointIsWhiteList) headers.set('Language', languageFromLocalStorage);
};
