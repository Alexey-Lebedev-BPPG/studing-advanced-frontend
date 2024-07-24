/* eslint-disable camelcase */
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  StripeError,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { memo, useCallback, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useTranslation } from 'react-i18next';
import cls from './cardForm.module.css';
import { paymentElementOptions } from '../../model/const/paymentElementOptions';
import { selectPaymentCountry } from '../../model/lib/helpers/selectPaymentCountry';
import { getIsFormComplete } from '../../model/selectors/getIsFormComplete/getIsFormComplete';
import { getPayerName } from '../../model/selectors/getPayerName/getPaymentName';
import { getPaymentType } from '../../model/selectors/getPaymentType/getPaymentType';
import { stripePaymentActions } from '../../model/slice/stripePaymentSlice';
import { PaymentStatus } from '../../model/types/stripePaymentSchema';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Flex } from '@/shared/ui/redesigned/Stack';

export interface CheckoutFormProps {
  className?: string;
  isElementReady: boolean;
  paymentStatus?: PaymentStatus;
  productPrice?: string;
  userCountry?: string;
}

const CardForm = memo((props: CheckoutFormProps) => {
  const {
    className,
    isElementReady,
    paymentStatus,
    productPrice,
    userCountry,
  } = props;
  const { t } = useTranslation();
  const lang = 'ru';

  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useAppDispatch();
  let timeout: NodeJS.Timeout;

  const selectedProduct = {};
  const paymentType = useAppSelector(getPaymentType);
  const payerName = useAppSelector(getPayerName);
  const isFormComplete = useAppSelector(getIsFormComplete);
  const price = 11;
  const oldPrice = 20;

  const isDirectDebit = paymentType === 'acss_debit';

  const handleSubmitConfirmPayment = async () => {
    dispatch(stripePaymentActions.setPaymentStatus('paymentInProcess'));

    if (!stripe || !elements) {
      console.log('Stripe initialization error');
      return;
    }

    const result = await stripe.confirmPayment({
      confirmParams: {
        payment_method_data: {
          billing_details: {
            address: { country: selectPaymentCountry(userCountry) },
            name: payerName,
          },
        },
      },
      elements,
      redirect: 'if_required',
    });

    if (result?.error) {
      dispatch(stripePaymentActions.setPaymentStatus('paymentError'));
      dispatch(
        stripePaymentActions.setPaymentError(result?.error?.decline_code),
      );
    }

    if (result?.paymentIntent?.status === 'succeeded') {
      ReactGA.event('purchase', {
        ecommerce: {
          affiliation: 'test',
          currency: 'USD',
          items: [
            {
              item_id: 1,
              item_name: 'title',
              price,
              quantity: 1,
            },
          ],
          transaction_id: result.paymentIntent.id,
          value: oldPrice,
        },
      });
      timeout = setTimeout(() => {
        dispatch(stripePaymentActions.setPaymentStatus('paymentSucceeded'));
      }, 3000);
    }
  };

  const onChangePayerName = useCallback(
    (value: string) => {
      dispatch(stripePaymentActions.setPayerName(value));
    },
    [dispatch],
  );

  const onReadyElement = useCallback(
    (element: StripePaymentElement) => {
      if (element)
        dispatch(stripePaymentActions.setPaymentStatus('elementIsReady'));
    },
    [dispatch],
  );

  const onLoadingElementFail = useCallback(
    (error: StripeError) => {
      console.error('Stripe loading error:', error);

      if (error)
        dispatch(stripePaymentActions.setPaymentStatus('loadingIsFailed'));
    },
    [dispatch],
  );

  const onChangePaymentElement = useCallback(
    (event: StripePaymentElementChangeEvent) => {
      const { complete, value } = event;

      dispatch(stripePaymentActions.setPaymentType(value.type));

      if (complete)
        dispatch(stripePaymentActions.setPaymentFormIsComplete(complete));
      else dispatch(stripePaymentActions.setPaymentFormIsComplete(false));
    },
    [dispatch],
  );

  const preparePrice = useCallback(
    (priceProd: string) => (lang === 'ru' ? `${1}$` : `$${1}`),
    [lang],
  );

  useEffect(
    () => () => {
      timeout && clearTimeout(timeout);
    },
    // @ts-ignore
    [timeout],
  );

  return (
    <Flex
      direction='column'
      align='center'
      className={classNames(cls.wrapper, {
        [cls['element-is-showing']]: isElementReady,
      })}
    >
      <div
        className={classNames(cls.form, {
          [cls['name-not-showed']]: isDirectDebit,
          [cls['skeleton-is-showing']]: !isElementReady,
        })}
      >
        <div className={cls['payment-element']}>
          <PaymentElement
            id='payment-subscription-element'
            options={paymentElementOptions}
            onReady={onReadyElement}
            onLoadError={event => onLoadingElementFail(event.error)}
            onChange={onChangePaymentElement}
          />
          {!isDirectDebit && !!isElementReady && (
            <Input
              label={t('Name')}
              placeholder={t('Enter name')}
              value={payerName}
              // isError={false}
              onChange={onChangePayerName}
            />
          )}
        </div>
      </div>
      <div className={cls.btn}>
        <Button
          fullWidth
          // isLoading={paymentStatus === 'paymentInProcess'}
          type='submit'
          // text={`${t('Pay')} ${productPrice && preparePrice(productPrice)}`}
          // imgLocation='left'
          disabled={
            !isFormComplete ||
            !stripe ||
            !elements ||
            paymentStatus === 'paymentInProcess' ||
            (!!isDirectDebit && !payerName)
          }
          onClick={handleSubmitConfirmPayment}
        />
      </div>
    </Flex>
  );
});

export default CardForm;
