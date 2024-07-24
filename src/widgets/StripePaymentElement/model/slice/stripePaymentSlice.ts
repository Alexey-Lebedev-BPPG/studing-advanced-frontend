import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getClientSecretByCustomer } from '../services/getClientSecretByCustomer';
import { getProductById } from '../services/getProductById';
import { getUserById } from '../services/getUserById';
import {
  PaymentStatus,
  StripePaymentSchema,
} from '../types/stripePaymentSchema';

const initialState: StripePaymentSchema = {
  amount: 0,
  clientSecret: '',
  country: '',
  error: '',
  idPayment: '',
  isFormComplete: false,
  isLoading: false,
  payerName: '',
  paymentType: '',
};

export const stripePaymentSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(getClientSecretByCustomer.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getClientSecretByCustomer.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
        state.idPayment = action.payload.id;
        state.amount = action.payload.amount;
        state.isLoading = false;
      })
      .addCase(getClientSecretByCustomer.rejected, (state, action) => {
        state.error = action.payload;
        if (
          action.payload === 'errors.user.product.notAllowed' ||
          action.payload === 'errors.user.trial.product.notAllowed'
        )
          state.status = 'packagePurchasedBefore';
        else state.status = 'getClientSecretError';
        state.isLoading = false;
      })
      .addCase(getUserById.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.payerData = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
  initialState,
  name: 'stripePayment',
  reducers: {
    setClearStripePaymentSlice: () => initialState,
    setClientSecret: (state, action: PayloadAction<string>) => {
      state.clientSecret = action.payload;
    },
    setPayerName: (state, action: PayloadAction<string>) => {
      state.payerName = action.payload;
    },
    setPaymentError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setPaymentFormIsComplete: (state, action: PayloadAction<boolean>) => {
      state.isFormComplete = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<PaymentStatus>) => {
      state.status = action.payload;
    },
    setPaymentType: (state, action: PayloadAction<string>) => {
      state.paymentType = action.payload;
    },
    setRedirectFrom: (state, action: PayloadAction<string | null>) => {
      state.redirectFrom = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: stripePaymentActions } = stripePaymentSlice;
export const { reducer: stripePaymentReducer } = stripePaymentSlice;
