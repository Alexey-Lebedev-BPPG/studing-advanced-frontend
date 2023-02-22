import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";

// наследуемся от внутреннего типа redux, которое добавлет ids: string[] и entitis с нашими типами комментов
export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;
}
