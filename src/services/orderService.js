import apiClient from './api';

export const getOrdersByUserId = (userId) => {
  return apiClient.get(`/orders/${userId}`);
};

export const getAllOrders = () => {
  return apiClient.get('/orders');
};