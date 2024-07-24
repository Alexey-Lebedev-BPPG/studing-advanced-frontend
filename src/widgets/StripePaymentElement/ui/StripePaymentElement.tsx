import { StripeElementLocale } from '@stripe/stripe-js';
import { memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardForm from './CardForm/CardForm';
import { CardFormSkeleton } from './CardFormSkeleton/CardFormSkeleton';
import { LoadErrorBlock } from './LoadErrorBlock/LoadErrorBlock';
import { StripePaymentProvider } from './StripeProvider/StripeProvider';
import cls from './stripePaymentElement.module.css';
import { getClientSecret } from '../model/selectors/getClientSecret/getClientSecret';
import { getPayerData } from '../model/selectors/getPayerData/getPayerData';
import { getPaymentError } from '../model/selectors/getPaymentError/getPaymentError';
import { getPaymentStatus } from '../model/selectors/getPaymentStatus/getPaymentStatus';
import { getClientSecretByCustomer } from '../model/services/getClientSecretByCustomer';
import { getProductById } from '../model/services/getProductById';
import { getUserById } from '../model/services/getUserById';
import { stripePaymentActions } from '../model/slice/stripePaymentSlice';
import { IgetClientSecretByCustumerProps } from '../model/types/stripePaymentSchema';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { VStack } from '@/shared/ui/redesigned/Stack';

export interface CheckoutFormProps {
  className?: string;
  locale: StripeElementLocale;
  selectedProduct?: any;
}

export const StripePaymentElement = memo((props: CheckoutFormProps) => {
  const { className, locale, selectedProduct } = props;

  const searchParams = useSearchParams() as any;

  const dispatch = useAppDispatch();

  const clientSecret = useAppSelector(getClientSecret);
  const paymentStatus = useAppSelector(getPaymentStatus);
  const userData = {} as any;
  const telegramUserData = useAppSelector(getPayerData);
  const promoCode = '';
  const promoNewPrice = '';

  const currentEmail = userData?.email || telegramUserData?.email || '';

  const isElementReady =
    paymentStatus !== undefined || paymentStatus === 'elementIsReady';
  const isAfterPayStatus =
    paymentStatus === 'paymentSucceeded' ||
    paymentStatus === 'packagePurchasedBefore' ||
    paymentStatus === 'paymentError';

  const getClientSecretReq = useCallback(async () => {
    const actualProductId =
      searchParams?.redirectFrom === 'Bot'
        ? searchParams.productId
        : selectedProduct?.id;

    const actualSource = searchParams?.redirectFrom === 'Bot' ? 'bot' : 'web';
    const actualUserId =
      searchParams?.redirectFrom === 'Bot' ? searchParams.userId : userData?.id;

    const customerData: IgetClientSecretByCustumerProps = {
      isConfirmDirectDebit: true,
      productId: Number(actualProductId),
      promoCode,
      source: actualSource,
      userId: Number(actualUserId),
      utmCampaign: searchParams.utm_campaign,
      utmContent: searchParams.utm_content,
      utmMedium: searchParams.utm_medium,
      utmSource: searchParams.utm_source,
      utmTerm: searchParams.utm_term,
    };

    await dispatch(getClientSecretByCustomer(customerData));
  }, [searchParams, selectedProduct?.id, userData?.id, dispatch, promoCode]);

  const getPayerDataReq = useCallback(async () => {
    dispatch(getUserById(searchParams.userId));
  }, [dispatch, searchParams.userId]);

  const getProductData = useCallback(async () => {
    await dispatch(getProductById(searchParams.productId));
  }, [dispatch, searchParams.productId]);

  const clearStripePaymentData = useCallback(async () => {
    dispatch(stripePaymentActions.setClearStripePaymentSlice());
  }, [dispatch]);

  const error = useAppSelector(getPaymentError);

  const handleTryAgain = () => {
    dispatch(stripePaymentActions.setPaymentStatus('elementIsReady'));
    dispatch(stripePaymentActions.setPaymentError());
  };

  useEffect(() => {
    try {
      getClientSecretReq();

      if (searchParams?.redirectFrom === 'Bot') {
        getProductData();
        getPayerDataReq();
      }
    } catch (e) {
      console.log('Get payment intent error', e);
    }

    return () => {
      clearStripePaymentData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    searchParams?.redirectFrom,
    getPayerDataReq,
    getProductData,
    clearStripePaymentData,
  ]);

  if (paymentStatus === 'loadingIsFailed')
    return <LoadErrorBlock getClientSecret={getClientSecretReq} />;

  // if (isAfterPayStatus)
  //   return (
  //     <AfterpayStatus
  //       showTryAgainButton
  //       userEmail={currentEmail}
  //       status={paymentStatus}
  //       handleTryAgain={handleTryAgain}
  //       error={error}
  //     />
  //   );

  return (
    <VStack align='center'>
      {!isElementReady && (
        <CardFormSkeleton
          productPrice={promoCode ? promoNewPrice : selectedProduct?.price}
        />
      )}
      <div
        id='stripe-payment-element-wrapper'
        className={cls['stripe-element-wrapper']}
      >
        <StripePaymentProvider locale={locale} clientSecret={clientSecret}>
          <CardForm
            userCountry={userData?.country}
            paymentStatus={paymentStatus}
            isElementReady={isElementReady}
            productPrice={promoCode ? promoNewPrice : selectedProduct?.price}
          />
        </StripePaymentProvider>
      </div>
    </VStack>
  );
});
