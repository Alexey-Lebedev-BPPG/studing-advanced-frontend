import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

// добавляем это, чтоб использовать в обычных редьюсерах фанки
// const createSlice = buildCreateSlice({
//   creators: { asyncThunk: asyncThunkCreator },
// });

const initialState: ArticleDetailsSchema = {
  isLoading: false,
};

export const articleDetailsSlice = createSlice({
  // используется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunk-a есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticleById.pending, state => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunk-a при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  initialState,
  name: 'articleDetails',
  reducers: {},
  // альтернативный способ использовать фанки вне экстра редьюсеров (ругается на типизацию)
  // reducers: create => ({
  //   fetchArticleByIdInSlice: create.asyncThunk(
  //     async (articleId, thunkApi) => {
  //       const { extra, rejectWithValue } = thunkApi;

  //       try {
  //         if (!articleId) throw new Error('');

  //         const response = await extra.api.get<Article>(
  //           `/articles/${articleId}`,
  //           {
  //             params: {
  //               _expand: 'user',
  //             },
  //           },
  //         );

  //         if (!response.data) throw new Error();

  //         return response.data;
  //       } catch (error) {
  //         // чтоб не показывался консоль при тестах
  //         __PROJECT__ !== 'jest' && console.log(error);
  //         // для обработки ошибок
  //         return rejectWithValue(i18next.t('ARTICLE_ERROR'));
  //       }
  //     },
  //     {
  //       pending: state => {
  //         // это состояние, когда наш thunk начинается
  //         // обнуляем ошибку, если она была и делаем isLoading true
  //         state.error = undefined;
  //         state.isLoading = true;
  //       },
  //       fulfilled: (state, action: PayloadAction<Article>) => {
  //         // здесь обрабатываем ответ сервера
  //         state.isLoading = false;
  //         state.data = action.payload;
  //       },
  //       rejected: (state, action) => {
  //         // action - поле, которое мы возвращаем из thunk-a при ошибке(3 аргумент в дженерике)
  //         state.isLoading = false;
  //         state.error = action.payload;
  //       },
  //     },
  //   ),
  // }),
  // возможно также создавать селекторы прямо в слайсе
  selectors: { getDataArticleDetails: state => state.data },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
// созданные селекторы можно прям здесь заимпортить
export const { getDataArticleDetails } = articleDetailsSlice.selectors;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
