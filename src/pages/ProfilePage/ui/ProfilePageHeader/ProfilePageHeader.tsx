import { getProfileIsReadonly, profileActions, updateProfileData } from "entities/Profile";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { Text } from "shared/ui/Text";
import cls from "./ProfilePageHeader.module.scss";

interface IProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<IProfilePageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const readonly = useSelector(getProfileIsReadonly);

  return (
    <div className={classNames(cls.profilePageHeader, {}, [className])}>
      <Text title={t("Профиль")} />
      {readonly ? (
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.editBtn}
          onClick={onEdit}
        >
          {t("Редактировать")}
        </Button>
      ) : (
        <>
          <Button
            theme={ButtonTheme.OUTLINE_RED}
            className={cls.editBtn}
            onClick={onCancelEdit}
          >
            {t("Отменить")}
          </Button>
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.saveBtn}
            onClick={onSave}
          >
            {t("Сохранить")}
          </Button>
        </>
      )}
    </div>
  );
};