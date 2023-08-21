import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

interface ILanguageSwitcherProps {
  className?: string;
  // при true показывать сокращенные значения текста
  short?: boolean;
}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = memo(
  ({ className, short }) => {
    const { i18n, t } = useTranslation();

    const toggle = () => {
      // вызываем функцию перевода и в ней меняем язык на противоположный
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <ButtonDeprecated
            theme='clear'
            className={classNames('', {}, [className])}
            onClick={toggle}
          >
            {t(short ? 'Короткий язык' : 'Язык')}
          </ButtonDeprecated>
        }
        on={
          <Button variant='clear' onClick={toggle}>
            {t(short ? 'Короткий язык' : 'Язык')}
          </Button>
        }
      />
    );
  },
);
