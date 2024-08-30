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
  // `onUploadProgress` позволяет обрабатывать события прогресса загрузки только для браузера
  // onUploadProgress: function (progressEvent) {
  // Делайте все, что хотите, с родным событием прогресса
  // },
  // `onDownloadProgress` позволяет обрабатывать события прогресса скачивания только для браузера
  // onDownloadProgress: function (progressEvent) {
  // Делайте все, что хотите, с родным событием прогресса
  // },
});

$api.interceptors.request.use(
  async config =>
    // чтоб передать на бэк язык приложения в заголовках
    // const getNewAxiosConfigWithLanguageHeader =
    //   addLanguageHeaderExceptWhiteListForAxios(config);

    // return getNewAxiosConfigWithLanguageHeader;
    config,
  error => Promise.reject(error),
);

$api.interceptors.request.use(config => {
  if (config.headers)
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

  // получаем юзерагента, чтоб вычислить юзер агента. если это бот, а не юзер, то делаем повышенный таймаут для запросов. Для лучшего пользовательского опыта TTFB вашей страницы не должен превышать 800 миллисекунд. Поэтому таймауты на ручки составляют 500 миллисекунд. Для ботов таймаут можно сделать 1500 миллисекунд.
  // const userAgent = config.headers['User-Agent'] as string;
  // const isBot = Boolean(userAgent?.match(/googlebot|yandex/i));
  // устанавливает таймаут запросов для того, чтоб все работало быстро для пользователя (в случаях, когда апи долго проходит)
  // config.timeout = isBot ? 1500 : 500;

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
//     здесь же можно обработать те запросы, которые мы отменили по таймауту. Рекомендуется для таких запросов сделать ретрай только один раз
//     return Promise.reject(error);
//   },
// );
