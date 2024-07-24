import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

// создаем экземпляр аксиоса
export const $api = axios.create({
  // URL, на котором бэк (берем из глобальных переменных)
  baseURL: __API__,
  // указываем заголовок авторизации (из бэка)
  // коментим это, т.к. при размещении на хостинге при первом заходе на сайт падают ошибки из-зп того, что до того, как мы авторизовались на сайте, у нас уже в заголовок записалась пустая строка.поэтому пишем интерцептор, чтоб при каждом запросе он переписывал заголовок
  // headers: {
  //   authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  // },
  // headers: {
  //   Accept: 'application/json, text/plain, text/event-stream, */*',
  //   'Content-Type': 'application/json',
  // },
  // withCredentials: true,
});

$api.interceptors.request.use(
  async config => config,
  error => Promise.reject(error),
);

$api.interceptors.request.use(config => {
  if (config.headers)
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

  return config;
});

// example for refresh tokens
// let count = 0;

// $api.interceptors.response.use(
//   config => config,
//   async error => {
//     if (error.response.status === 401 && count < 2) {
//       count++;
//       // const typeConnect = localStorage.getItem('typeConnect');
//       if (count < 2) showSnackbar('Your session has expired', 'success');
//       await axios
//         .post(`${api}admin/auth/signout2`, { withCredentials: true })
//         .then(res => {
//           localStorage.clear();
//           sessionStorage.clear();
//           sessionStorage.removeItem('persist:root');
//           localStorage.removeItem('persist:root');
//           // localStorage.setItem('typeConnect', typeConnect || '');
//         });
//     }
//     return Promise.reject(error);
//   },
// );
