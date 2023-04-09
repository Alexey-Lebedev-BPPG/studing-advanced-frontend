import { getUserAuthData } from "entities/User";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { HStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { getProfileIsReadonly } from "../../model/selectors/getProfileIsReadonly/getProfileIsReadonly";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";

interface IEditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<IEditableProfileCardHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const readonly = useSelector(getProfileIsReadonly);

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(
    () => dispatch(profileActions.setReadonly(false)),
    [dispatch]
  );

  const onCancelEdit = useCallback(
    () => dispatch(profileActions.cancelEdit()),
    [dispatch]
  );

  const onSave = useCallback(() => dispatch(updateProfileData()), [dispatch]);

  return (
    <HStack max justify="between" className={classNames("", {}, [className])}>
      <Text title={t("Профиль")} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t("Редактировать")}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t("Отменить")}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t("Сохранить")}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
};