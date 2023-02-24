import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsCommentReducer } from "./articleDetailsCommentSlice";
import { articleDetailsRecommendationsReducer } from "./articleDetailsRecommendationsSlice";

// обобщающий редьюсер для нескольких редьюсеров. Лучше не использовать. Делается в учебных целях
export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentReducer,
  recommendations: articleDetailsRecommendationsReducer,
});
