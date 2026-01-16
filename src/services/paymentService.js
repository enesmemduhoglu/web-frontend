import apiClient from './api';

export const createPaymentIntent = (userId) => {
  return apiClient.post('/payments/create-payment-intent', { userId });
};

export const finalizeOrder = (userId, paymentIntentId, addressId) => {
  return apiClient.post('/payments/orders/finalize', { userId, paymentIntentId, addressId });
};