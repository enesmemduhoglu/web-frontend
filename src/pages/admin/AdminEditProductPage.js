import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminProductForm from '../../components/AdminProductForm';
import { getProductById, updateProduct } from '../../services/productService';

const AdminEditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError("Ürün bilgileri yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (productData, imageFile) => {
    try {
      await updateProduct(id, productData, imageFile);
      alert("Ürün başarıyla güncellendi.");
    } catch (error) {
      console.error("Ürün güncellenirken hata:", error);
      alert(`Ürün güncellenemedi: ${error.message}`);
      throw error;
    }
  };

  if (loading) return <div>Ürün bilgileri yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!product) return <div>Ürün bulunamadı.</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Ürünü Düzenle</h1>
        <p className="text-slate-500 mt-1"><span className="font-bold text-slate-800">{product.productName}</span> ürününün bilgilerini güncelliyorsunuz.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-400 opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 pointer-events-none"></div>
        <AdminProductForm initialData={product} onSubmit={handleUpdateProduct} isEditMode={true} />
      </div>
    </div>
  );
};

export default AdminEditProductPage;