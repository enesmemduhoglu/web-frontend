import apiClient from './api';

export const getAllUsers = () => {
  return apiClient.get('/users');
};

export const updateUser = (id, userData) => {
  return apiClient.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};