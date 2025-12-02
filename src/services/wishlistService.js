import apiClient from './api';

export const getWishlist = (userId) => {
  return apiClient.get(`/wishlist/${userId}`);
};

export const addToWishlist = (userId, productId) => {
  return apiClient.post('/wishlist/add', { userId, productId });
};

export const removeFromWishlist = (userId, productId) => {
  return apiClient.delete('/wishlist/remove', { data: { userId, productId } });
};