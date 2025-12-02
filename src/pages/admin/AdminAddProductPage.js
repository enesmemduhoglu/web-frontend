import React from 'react';
import AdminProductForm from '../../components/AdminProductForm';
import { createProduct } from '../../services/productService';

const AdminAddProductPage = () => {

  const handleCreateProduct = async (productData, imageFile) => {
    try {
      await createProduct(productData, imageFile);
      alert("Ürün başarıyla eklendi.");
    } catch (error) {
      console.error("Ürün eklenirken hata:", error);
      alert(`Ürün eklenemedi: ${error.message}`);
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Yeni Ürün Ekle</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <AdminProductForm onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
};

export default AdminAddProductPage;