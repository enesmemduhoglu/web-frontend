import apiClient from './api';

export const addToCart = (productId, userId, quantity = 1) => {
  const cartRequest = {
    productId,
    userId,
    quantity,
  };
  return apiClient.post('/cart/add', cartRequest);
};

export const getCartByUserId = (userId) => {
  return apiClient.get(`/cart/${userId}`);
};

export const removeFromCart = (userId, productId) => {
  return apiClient.delete('/cart/remove', {
    data: { userId, productId }
  });
};