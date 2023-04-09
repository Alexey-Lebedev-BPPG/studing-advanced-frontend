import { rtkApi } from "@/shared/api/rtkApi";

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const ratingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // указываем название эндпоинта + указываем в дженерике первым аргументом, что запрос будет возвращать,
    // и во стором, что  за аргументы
    getRating: build.query<any, null>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: (params) => ({
        // здесь есть все поля как в стандартных запросах
        // указываем урл
        url: "/***",
        // указываем параметры
        params: {
          ...params,
        },
      }),
    }),
    // пример запроса на создание (через mutation)
    // createRating: build.mutation({
    //   // колбэк принимает какие-то аргументы для передачи на сервер
    //   query: (params) => ({
    //     // здесь есть все поля как в стандартных запросах
    //     // указываем урл
    //     url: '/***',
    //     // указываем параметры
    //     params: {
    //       ...params,
    //     },
    //     method: 'POST',
    //   }),
    // }),
  }),
});

// создаем хук, в который помещаем данные из запроса
export const useRating = ratingApi.useGetRatingQuery;

// пример запроса на создание (через mutation)
// export const useCreateRating =
//   ratingApi.useCreateRatingMutation;
