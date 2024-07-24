export const convertDateAndMonthToLocal = (date: string, locale: 'en' | 'ru') =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(new Date(date));
