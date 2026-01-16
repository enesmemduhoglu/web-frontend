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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Yeni Ürün Ekle</h1>
        <p className="text-slate-500 mt-1">Mağazanıza yeni bir ürün eklemek için aşağıdaki formu doldurun.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-yellow-400 opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 pointer-events-none"></div>
        <AdminProductForm onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
};

export default AdminAddProductPage;