import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { HStack } from "shared/ui/Stack";
import cls from "./AddCommentForm.module.scss";
import { getAddCommentFormText } from "../model/selectors/getAddCommentForm/getAddCommentForm";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../model/slice/addCommentForm";

export interface IAddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<IAddCommentFormProps> = memo(
  ({ className, onSendComment }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value));
      },
      [dispatch]
    );

    const onSendHandler = useCallback(() => {
      onSendComment(text || "");
      onCommentTextChange("");
    }, [onCommentTextChange, onSendComment, text]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          justify="between"
          max
          className={classNames(cls.addCommentForm, {}, [className])}
        >
          <Input
            placeholder={t("Введите текст комментария")}
            value={text}
            onChange={onCommentTextChange}
            className={cls.input}
          />
          <Button onClick={onSendHandler}>{t("Отправить")}</Button>
        </HStack>
      </DynamicModuleLoader>
    );
  }
);

export default AddCommentForm;
