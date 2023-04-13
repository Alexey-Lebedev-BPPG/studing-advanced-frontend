import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { ArticlesPageSchema } from "../types/articlesPageSchema";
import { StateSchema } from "@/app/providers/StoreProvider";
import {
  Article,
  ArticleSortFields,
  ArticleType,
  ArticleView,
} from "@/entities/Article";
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";
import { SortOrder } from "@/shared/types/sort";

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
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 9,
    sort: ArticleSortFields.CREATED,
    order: "asc",
    search: "",
    type: ArticleType.ALL,
  }),
  reducers: {
    setView: (state, { payload }: PayloadAction<ArticleView>) => {
      state.view = payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, payload);
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setOrder: (state, { payload }: PayloadAction<SortOrder>) => {
      state.order = payload;
    },
    setSort: (state, { payload }: PayloadAction<ArticleSortFields>) => {
      state.sort = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setType: (state, { payload }: PayloadAction<ArticleType>) => {
      state.type = payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.BIG ? 4 : 9;
      state._inited = true;
    },
  },
  // исgользуется для асинхронного изменения стейта
  extraReducers: (builder) => {
    // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticlesList.pending, (state, action) => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
        // если у нас есть флаг реплейс, то зачищаем массив данных
        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        // здесь обрабатываем ответ сервера
        state.isLoading = false;
        // если у нас есть флаг реплейса, то заменяем все новыми данными
        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          // если у нас нет флага реплейса, то будем использовать addMany, чтоб добавлять данные в конец
          articlesAdapter.addMany(state, action.payload);
        }
        // если нам с бека придет массив длина которого больше лимита, то мы знаем, что данные еще прилетят
        state.hasMore = action.payload.length >= state.limit;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice;
