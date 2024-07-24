// пример экземпляров для аксиоса
/* eslint-disable default-param-last */
import { AxiosPromise } from 'axios';
import { $api } from './api';

const baseURL = process.env.API_URL;

export const get = <T>(
  url: string,
  params = {},
  token?: string,
): AxiosPromise<T> =>
  $api({
    baseURL,
    method: 'get',
    params,
    url,
    // headers: {Authorization: `Bearer ${token}`},
  });

export const post = <T>(
  url: string,
  data = {},
  headers?: any,
): AxiosPromise<T> => {
  const headerForFormData =
    data instanceof FormData
      ? {
          baseURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers,
          },
          url,
        }
      : {
          baseURL,
          url,
          ...headers,
        };
  return $api.post(url, data, headerForFormData);
};

export const remove = (
  url: string,
  params = {},
  token?: string,
): AxiosPromise =>
  $api({
    baseURL,
    method: 'delete',
    params,
    url,
    // headers: {Authorization: `Bearer ${token}`},
  });

export const put = (url: string, data = {}, token?: string) =>
  $api({
    baseURL,
    data,
    headers: { Authorization: `Bearer ${token}` },
    method: 'put',
    url,
  });

export const patch = <T>(
  url: string,
  data = {},
  headers?: any,
): AxiosPromise<T> => {
  const headerForFormData =
    data instanceof FormData
      ? {
          baseURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers,
          },
          method: 'patch',
          url,
        }
      : {
          baseURL,
          method: 'patch',
          url,
          ...headers,
        };
  return $api.patch(url, data, headerForFormData);
};

export const postRPC = <T>(
  params: { method: string; params?: any },
  headers?: any,
): AxiosPromise<T> =>
  $api({
    baseURL,
    ...headers,
    data: params,
    method: 'post',
  });
