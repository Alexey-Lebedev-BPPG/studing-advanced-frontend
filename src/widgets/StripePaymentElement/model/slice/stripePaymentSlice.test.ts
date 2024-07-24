import {
  stripePaymentActions,
  stripePaymentReducer,
} from './stripePaymentSlice';
import { StripePaymentSchema } from '../types/stripePaymentSchema';

describe('stripePaymentSlice.test', () => {
  test('set clientSecret', () => {
    const state: DeepPartial<StripePaymentSchema> = {
      clientSecret: 'testSecret',
    };
    expect(
      stripePaymentReducer(
        state as StripePaymentSchema,
        stripePaymentActions.setClientSecret('testSecret'),
      ),
    ).toEqual({ clientSecret: 'testSecret' });
  });

  test('set payerName', () => {
    const state: DeepPartial<StripePaymentSchema> = { payerName: 'Username' };
    expect(
      stripePaymentReducer(
        state as StripePaymentSchema,
        stripePaymentActions.setPayerName('Username'),
      ),
    ).toEqual({ payerName: 'Username' });
  });

  test('set status', () => {
    const state: DeepPartial<StripePaymentSchema> = {
      status: 'paymentSucceeded',
    };
    expect(
      stripePaymentReducer(
        state as StripePaymentSchema,
        stripePaymentActions.setPaymentStatus('paymentSucceeded'),
      ),
    ).toEqual({ status: 'paymentSucceeded' });
  });

  test('set paymentType', () => {
    const state: DeepPartial<StripePaymentSchema> = { paymentType: 'Card' };
    expect(
      stripePaymentReducer(
        state as StripePaymentSchema,
        stripePaymentActions.setPaymentType('Card'),
      ),
    ).toEqual({ paymentType: 'Card' });
  });
});
