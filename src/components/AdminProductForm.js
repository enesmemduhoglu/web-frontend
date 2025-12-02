import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProductForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    productName: initialData.productName || '',
    productDescription: initialData.productDescription || '',
    productPrice: initialData.productPrice || '',
    productStock: initialData.productStock || '',
    maxQuantityPerCart: initialData.maxQuantityPerCart || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.productImage || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const productData = {
        ...formData,
        productId: initialData.productId 
    };

    try {
      await onSubmit(productData, imageFile);
      navigate('/admin/products');
    } catch (err) {
      setError(`İşlem sırasında bir hata oluştu: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Ürün Adı</label>
        <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>

      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Açıklama</label>
        <textarea name="productDescription" id="productDescription" value={formData.productDescription} onChange={handleChange} rows="3" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Fiyat (USD)</label>
          <input type="number" name="productPrice" id="productPrice" value={formData.productPrice} onChange={handleChange} step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">Stok Adedi</label>
          <input type="number" name="productStock" id="productStock" value={formData.productStock} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="maxQuantityPerCart" className="block text-sm font-medium text-gray-700">Sepet Limiti</label>
          <input type="number" name="maxQuantityPerCart" id="maxQuantityPerCart" value={formData.maxQuantityPerCart} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ürün Resmi</label>
        <div className="mt-1 flex items-center space-x-4">
          {imagePreview && <img src={imagePreview} alt="Önizleme" className="h-20 w-20 object-cover rounded"/>}
          <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
          İptal
        </button>
        <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
          {loading ? 'Kaydediliyor...' : (isEditMode ? 'Güncelle' : 'Ekle')}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;