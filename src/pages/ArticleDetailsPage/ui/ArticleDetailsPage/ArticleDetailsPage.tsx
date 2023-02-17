import { ArticleDetails } from "entities/Article";
import { CommentList } from "entities/Comment";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text } from "shared/ui/Text/Text";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import {
  articleDetailsCommentReducer,
  getArticleComments,
} from "../../model/slice/articleDetailsCommentSlice";
import cls from "./ArticleDetailsPage.module.scss";

interface IArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentReducer,
};

const ArticleDetailsPage: FC<IArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article-details");
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id)
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t("Комментарии")} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
