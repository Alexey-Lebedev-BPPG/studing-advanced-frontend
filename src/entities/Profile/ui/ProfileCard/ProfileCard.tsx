import { Country, CountrySelect } from "entities/Country";
import { Currency, CurrencySelect } from "entities/Currency";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Input } from "shared/ui/Input";
import { Loader } from "shared/ui/Loader";
import { Text } from "shared/ui/Text";
import { TextAlign, TextTheme } from "shared/ui/Text/ui/Text";
import { Profile } from "../../model/types/profile";
import cls from "./ProfileCard.module.scss";

interface IProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: FC<IProfileCardProps> = ({
  className,
  data,
  isLoading,
  error,
  readonly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCity,
  onChangeAvatar,
  onChangeUsername,
  onChangeCurrency,
  onChangeCountry,
}) => {
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <div
        className={classNames(cls.profileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.profileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const mods = {
    [cls.editing]: !readonly,
  };
  return (
    <div className={classNames(cls.profileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data?.avatar} />
          </div>
        )}
        <Input
          value={data?.first}
          placeholder={t("Ваше имя")}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t("Ваша фамилия")}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t("Ваш возраст")}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t("Город")}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t("Введите имя пользователя")}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t("Введите ссылку на аватар")}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          value={data?.currency}
          className={cls.input}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          className={cls.input}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
