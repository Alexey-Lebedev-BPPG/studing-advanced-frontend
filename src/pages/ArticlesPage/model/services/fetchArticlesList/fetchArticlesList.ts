import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  // поле для удаления значений из массива
  replace?: boolean;
}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const limit = getArticlesPageLimit(getState());
  const page = getArticlesPageNum(getState());
  const order = getArticlesPageOrder(getState());
  const sort = getArticlesPageSort(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  try {
    // добавляем параметры в строку урл
    addQueryParams({ sort, order, search, type });
    const response = await extra.api.get<Article[]>('/articles', {
      // передаем параметры согласно документации jsonplaceholder
      params: {
        // чтоб получить полную сущность пользователя
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    // для обработки ошибок
    return rejectWithValue(i18next.t('ARTICLE_ERROR'));
  }
});
