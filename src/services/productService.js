import apiClient from './api';

export const getAllProducts = () => {
  return apiClient.get('/products');
};

export const searchProducts = (query) => {
  return apiClient.get(`/products/search`, { params: { q: query } });
};

export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

export const createProduct = (productData, imageFile) => {
  const formData = new FormData();
  formData.append('product', JSON.stringify(productData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return apiClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = (id, productData, imageFile) => {
  const formData = new FormData();
  formData.append('product', JSON.stringify(productData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return apiClient.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/products/${id}`);
};