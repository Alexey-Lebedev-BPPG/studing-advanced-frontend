export type PaymentStatus =
  | 'paymentSucceeded'
  | 'paymentInProcess'
  | 'paymentError'
  | 'elementIsReady'
  | 'packagePurchasedBefore'
  | 'getClientSecretError'
  | 'loadingIsFailed';

export interface PayerData {
  countryCode: number | null;
  email: string;
  id: number;
  name: string;
  paymentMethod: string | null;
  phoneNumber: string | null;
}

export interface IgetClientSecretByCustumerProps {
  isConfirmDirectDebit: boolean;
  productId: number;
  promoCode?: string;
  source: string;
  userId?: number;
  utmCampaign: {};
  utmContent: {};
  utmMedium: {};
  utmSource: {};
  utmTerm: {};
}

export interface StripePaymentSchema {
  amount: number;
  clientSecret: string;
  country: string;
  error?: string;
  idPayment: string;
  isFormComplete: boolean;
  isLoading: boolean;
  payerData?: PayerData;
  payerName: string;
  paymentType: string;
  productData?: any;
  redirectFrom?: string | null;
  status?: PaymentStatus;
}
