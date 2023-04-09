import { Rating } from "@/entities/Rating";
import { rtkApi } from "@/shared/api/rtkApi";

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}

interface CreateArticleRatingArg extends GetArticleRatingArg {
  rate: number;
  feedback?: string;
}

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // указываем название эндпоинта + указываем в дженерике первым аргументом, что запрос будет возвращать,
    // и во стором, что  за аргументы
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: (params) => ({
        // здесь есть все поля как в стандартных запросах
        // указываем урл
        url: "/article-ratings",
        // указываем параметры
        params: { ...params },
      }),
    }),
    createArticleRating: build.mutation<void, CreateArticleRatingArg>({
      query: (params) => ({
        url: "/article-ratings",
        body: params,
        method: "POST",
      }),
    }),
  }),
});

// создаем хук, в который помещаем данные из запроса
export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;

// пример запроса на создание (через mutation)
export const useCreateArticleRating =
  articleRatingApi.useCreateArticleRatingMutation;
