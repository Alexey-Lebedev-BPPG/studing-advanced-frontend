import { StripePaymentElementOptions } from '@stripe/stripe-js';

export const paymentElementOptions: StripePaymentElementOptions = {
  fields: { billingDetails: { address: { country: 'never' }, name: 'auto' } },
  layout: { type: 'tabs' },
  terms: {
    applePay: 'never',
    auBecsDebit: 'never',
    bancontact: 'never',
    card: 'never',
    cashapp: 'never',
    googlePay: 'never',
    ideal: 'never',
    paypal: 'never',
    sepaDebit: 'never',
    sofort: 'never',
    usBankAccount: 'never',
  },
};
