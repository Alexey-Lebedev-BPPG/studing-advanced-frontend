import { EntityState } from '@reduxjs/toolkit';
import {
  Article,
  ArticleView,
  ArticleSortFields,
  ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

// наследуемся от внутреннего типа redux, которое добавлет ids: string[] и entitis с нашими типами комментов
export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
  // данные пагинации
  page: number;
  limit: number;
  // показывает, загрузили мы все статьи или есть еще
  hasMore: boolean;
  // фильтры
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortFields;
  search: string;
  type: ArticleType;
  // указывает, инициализировался у нас стейт или нет (чтоб заново его не инициализировать, когда стейт не удаляем из редакса)
  _inited: boolean;
}
