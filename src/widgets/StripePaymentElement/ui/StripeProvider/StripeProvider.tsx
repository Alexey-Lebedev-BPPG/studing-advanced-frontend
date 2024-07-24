import { Elements } from '@stripe/react-stripe-js';
import { StripeElementLocale, loadStripe } from '@stripe/stripe-js';
import { FC, ReactNode, memo } from 'react';
import { stripeProviderOptions } from '../../model/const/stripeProviderOptions';

interface StripeProviderProps {
  children: ReactNode;
  clientSecret: string;
  locale: StripeElementLocale;
}

export interface IClientSecret {
  clientSecret: string;
}

const stripeAPIKey = process.env.STRIPE_API_KEY || '';
const stripePromise = loadStripe(stripeAPIKey);

export const StripePaymentProvider: FC<StripeProviderProps> = memo(
  ({ children, clientSecret, locale }) => {
    const optionsWithSecret = stripeProviderOptions(
      clientSecret,
      locale as StripeElementLocale,
    );

    return (
      <div id='stripe-provider'>
        {!!clientSecret && (
          <Elements stripe={stripePromise} options={optionsWithSecret}>
            {children}
          </Elements>
        )}
      </div>
    );
  },
);
