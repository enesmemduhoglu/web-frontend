import apiClient from './api';

export const registerUser = (userData) => {
  const dataToSend = {
    ...userData,
    role: 'USER'
  };
  return apiClient.post('/register', dataToSend);
};

export const loginUser = (credentials, isAdmin = false) => {
  const url = isAdmin ? '/admin' : '/login';
  return apiClient.post(url, credentials);
};