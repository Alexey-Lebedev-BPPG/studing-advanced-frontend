import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import { ArticleDetailsRecommendationsSchema } from "../types/articleDetailsRecommendationsSchema";

// делаем через подход нормализации данных в redux toolkit (https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions)

const recommendationsAdapter = createEntityAdapter<Article>({
  // функция получения айдишника
  selectId: (article) => article.id,
});

// создаем селектор, чтоб доставать наши комментарии из стейта или возвращает дефолтное состояние
export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState()
  );

const articleDetailsRecommendationsSlice = createSlice({
  name: "articleDetailsRecommendationsSlice",
  // расширем инитиал стейт нашими полями
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      }
    ),
  reducers: {},
  // используется для асинхронного изменения стейта
  extraReducers: (builder) => {
    // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticleRecommendations.pending, (state) => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        // здесь обрабатываем ответ сервера
        state.isLoading = false;
        // заменяем данные. полученные из запроса, в адаптере
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsRecommendationsActions } =
  articleDetailsRecommendationsSlice;
export const { reducer: articleDetailsRecommendationsReducer } =
  articleDetailsRecommendationsSlice;