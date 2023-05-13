import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';

interface IProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  readonly?: boolean;
}

export const ProfileCard: FC<IProfileCardProps> = ({
  className,
  data,
  error,
  isLoading,
  onChangeAge,
  onChangeAvatar,
  onChangeCity,
  onChangeCountry,
  onChangeCurrency,
  onChangeFirstname,
  onChangeLastname,
  onChangeUsername,
  readonly,
}) => {
  const { t } = useTranslation('profile');

  if (isLoading)
    return (
      <HStack
        max
        justify='center'
        className={classNames(cls.profileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </HStack>
    );

  if (error)
    return (
      <HStack
        max
        justify='center'
        className={classNames(cls.profileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={`${t('Произошла ошибка при загрузке профиля')}`}
          text={`${t('Попробуйте обновить страницу')}`}
          align={TextAlign.CENTER}
        />
      </HStack>
    );

  const mods = {
    [cls.editing]: !readonly,
  };
  return (
    <VStack
      max
      gap='16'
      data-testid='ProfileCard'
      className={classNames(cls.profileCard, mods, [className])}
    >
      {!!data?.avatar && (
        <HStack max justify='center'>
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={`${t('Ваше имя')}`}
        className={cls.input}
        readonly={readonly}
        data-testid='ProfileCard.firstname'
        onChange={onChangeFirstname}
      />
      <Input
        value={data?.lastname}
        placeholder={`${t('Ваша фамилия')}`}
        className={cls.input}
        readonly={readonly}
        data-testid='ProfileCard.lastname'
        onChange={onChangeLastname}
      />
      <Input
        value={data?.age}
        placeholder={`${t('Ваш возраст')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeAge}
      />
      <Input
        value={data?.city}
        placeholder={`${t('Город')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeCity}
      />
      <Input
        value={data?.username}
        placeholder={`${t('Введите имя пользователя')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeUsername}
      />
      <Input
        value={data?.avatar}
        placeholder={`${t('Введите ссылку на аватар')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeAvatar}
      />
      <CurrencySelect
        value={data?.currency}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeCurrency}
      />
      <CountrySelect
        value={data?.country}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeCountry}
      />
    </VStack>
  );
};
