import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileIsReadonly,
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer,
  ValidateProfileError,
} from "entities/Profile";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useParams } from "react-router-dom";
import Page from "shared/ui/Page/Page";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import cls from "./ProfilePage.module.scss";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface IProfilePageProps {
  className?: string;
}

const ProfilePage: FC<IProfilePageProps> = ({ className }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("profile");
  const { id } = useParams<{ id: string }>();

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
      <Page className={classNames(cls.profilePage, {}, [className])}>
        <ProfilePageHeader />
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
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
