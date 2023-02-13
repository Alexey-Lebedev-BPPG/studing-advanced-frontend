import { FC, memo, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { Text } from "shared/ui/Text";
import { TextAlign } from "shared/ui/Text/ui/Text";
import { Skeleton } from "shared/ui/Skeleton/ui/Skeleton";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import cls from "./ArticleDetails.module.scss";

interface IArticleDetailsProps {
  className?: string;
  id: string;
}

// чтоб напрямую не передавать в пропсы объект такого типа reducers={{ loginForm: loginReducer }}, т.к. это каждый раз будет создавать новый объект, мы делаем редьюсер по ум.
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<IArticleDetailsProps> = memo(
  ({ className, id }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
      dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
      content = (
        <div>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border="50%"
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width="100%" height={200} />
          <Skeleton className={cls.skeleton} width="100%" height={200} />
        </div>
      );
    } else if (error) {
      content = (
        <Text
          title={t("Произошла ошибка при загрузке статьи.")}
          align={TextAlign.CENTER}
        />
      );
    } else {
      content = <div>ArticleDetails</div>;
    }

    return (
      // обертка для использования асинхронных редьюсеров в асинхронных компонентах
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.articleDetails, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>
    );
  }
);
