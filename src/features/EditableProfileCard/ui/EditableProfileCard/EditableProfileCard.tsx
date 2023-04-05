import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { useDispatch, useSelector } from "react-redux";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ProfileCard } from "entities/Profile";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { VStack } from "shared/ui/Stack";
import cls from "./EditableProfileCard.module.scss";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileIsReadonly } from "../../model/selectors/getProfileIsReadonly/getProfileIsReadonly";
import { getProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { ValidateProfileError } from "../../model/types/editableProfileCard";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";

export interface IEditableProfileCardProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard: FC<IEditableProfileCardProps> = memo(
  ({ className, id }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("profile");

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileIsReadonly);
    const errors = useSelector(getProfileValidateErrors);

    const validateErrorTranslate = {
      [ValidateProfileError.SERVER_ERROR]: t("Серверная ошибка при сохранении"),
      [ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректный регион"),
      [ValidateProfileError.NO_DATA]: t("Данные не указаны"),
      [ValidateProfileError.INCORRECT_USER_DATA]: t("Имя и фамилия не указаны"),
      [ValidateProfileError.INCORRECT_AGE]: t("Некрректный возраст"),
    };

    const onChangeFirstname = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || "" }));
      },
      [dispatch]
    );

    const onChangeLastname = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || "" }));
      },
      [dispatch]
    );
    const onChangeAge = useCallback(
      (value?: string) => {
        dispatch(
          profileActions.updateProfile({
            age: Number(value?.replace(/\D/gi, "") || 0),
          })
        );
      },
      [dispatch]
    );
    const onChangeCity = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || "" }));
      },
      [dispatch]
    );

    const onChangeUsername = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || "" }));
      },
      [dispatch]
    );

    const onChangeAvatar = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || "" }));
      },
      [dispatch]
    );

    const onChangeCurrency = useCallback(
      (currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
      },
      [dispatch]
    );

    const onChangeCountry = useCallback(
      (country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
      },
      [dispatch]
    );

    useInitialEffect(() => {
      if (id) dispatch(fetchProfileData(id));
    });

    return (
      <DynamicModuleLoader reducers={reducers}>
        <VStack
          gap="8"
          max
          className={classNames(cls.editableProfileCard, {}, [className])}
        >
          <EditableProfileCardHeader />
          {errors &&
            errors.length &&
            errors.map((err) => (
              <Text
                key={err}
                theme={TextTheme.ERROR}
                text={validateErrorTranslate[err]}
              />
            ))}
          <ProfileCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
          />
        </VStack>
      </DynamicModuleLoader>
    );
  }
);
