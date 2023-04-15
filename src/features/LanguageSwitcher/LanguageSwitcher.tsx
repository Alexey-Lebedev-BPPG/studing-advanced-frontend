import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';

interface ILanguageSwitcherProps {
  className?: string;
  // при true показывать сокращенные значения текста
  short?: boolean;
}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = memo(
  ({ className, short }) => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
      // вызываем функцию перевода и в ней меняем язык на противоположный
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
      <Button
        theme={ButtonTheme.CLEAR}
        onClick={toggle}
        className={classNames('', {}, [className])}
      >
        {/* i18next-extract-disable-next-line */}
        {t(short ? 'Короткий язык' : 'Язык')}
      </Button>
    );
  },
);
