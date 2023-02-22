import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleView } from "entities/Article/model/types/article";
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { ArticlesPageSchema } from "../types/articlesPageSchema";

// делаем через подход нормализации данных в redux toolkit (https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions)

const articlesAdapter = createEntityAdapter<Article>({
  // функция получения айдишника
  selectId: (article) => article.id,
});

// создаем селектор, чтоб доставать наши комментарии из стейта или возвращает дефолтное состояние
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  // расширем инитиал стейт нашими полями
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, { payload }: PayloadAction<ArticleView>) => {
      state.view = payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView;
    },
  },
  // исgользуется для асинхронного изменения стейта
  extraReducers: (builder) => {
    // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticlesList.pending, (state) => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          // заменяем данные. полученные из запроса, в адаптере
          articlesAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice;
