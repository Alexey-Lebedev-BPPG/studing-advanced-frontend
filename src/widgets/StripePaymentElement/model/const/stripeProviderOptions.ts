import { StripeElementLocale, StripeElementsOptions } from '@stripe/stripe-js';

export const stripeProviderOptions = (
  clientSecret: string,
  locale: StripeElementLocale,
) => {
  const options: StripeElementsOptions = {
    appearance: {
      labels: 'above',
      rules: {
        '.Error': {
          color: '#FF5449',
          fontSize: `${0.5}rem`,
          fontWeight: '300',
          lineHeight: '0.875rem',
        },
        '.Input': {
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: '1px solid #808080',
          borderRadius: 'unset',
          boxShadow: 'none',
          color: '#fff',
          fontSize: `${1}rem`,
          lineHeight: '1.188rem',
          outline: 'none',
          padding: `${1}rem ${0}`,
        },
        '.Input:focus': {
          borderBottomColor: '#14E0AE',
          boxShadow: 'none',
        },
        '.Input--invalid': {
          borderColor: '#FF5449',
          boxShadow: 'none',
        },
        '.Label': {
          fontSize: '1.125rem',
          lineHeight: '1.313rem',
          paddingBottom: `${1}rem`,
        },
        '.Tab': {
          backgroundColor: 'rgba(229, 227, 227, 0.03)',
          borderTop: '1px solid #808080',
          color: 'white',
          fontWeight: '400',
          outline: 'none',
          transition: 'none',
        },
        '.Tab:focus': {
          boxShadow: 'none',
          outline: 'none',
        },
        '.Tab--selected': {
          backgroundColor: 'rgba(20, 224, 174, 0.15)',
          border: 'none',
          borderTop: '1px solid #808080',
          boxShadow:
            '0px 2px 4px rgba(0, 0, 0, 0.5), 0px 1px 6px rgba(0, 0, 0, 0.25)',
          color: 'white',
        },
        '.Tab--selected:hover': {
          color: 'white',
        },
      },
      theme: 'night',
      variables: {
        borderRadius: `${1}rem`,
        colorBackground: '#1D1D1D',
        colorDanger: '#FF5449',
        colorText: '#FFFFFF',
        colorTextPlaceholder: '#4C4C4C',
        focusBoxShadow: 'none',
        focusOutline: 'none',
        fontFamily: 'SFMono-Light, sans-serif',
        gridColumnSpacing: `${1}rem`,
        gridRowSpacing: '1.45rem',
        tabIconColor: '#FFF',
        tabIconSelectedColor: '#FFF',
        tabSpacing: `${1}rem`,
      },
    },
    clientSecret,
    loader: 'never',
    locale,
  };

  return options;
};
