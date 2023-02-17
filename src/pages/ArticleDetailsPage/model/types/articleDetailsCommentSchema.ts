import { Comment } from "entities/Comment";
import { EntityState } from "@reduxjs/toolkit";

// наследуемся от внутреннего типа redux, которое добавлет ids: string[] и entitis с нашими типами комментов
export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}
