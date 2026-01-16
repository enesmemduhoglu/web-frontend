import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaMoneyBillWave, FaSortNumericDown, FaImage, FaSave, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import LoadingSpinner from './common/LoadingSpinner';

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
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* İmage Upload Section */}
      <div className="flex justify-center mb-8">
        <div className="relative group w-48 h-48 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 hover:border-yellow-400 transition-colors bg-slate-50">
          {imagePreview ? (
            <img src={imagePreview} alt="Önizleme" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <FaImage className="text-4xl mb-2" />
              <span className="text-sm">Resim Yükle</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <FaCloudUploadAlt className="text-white text-3xl mb-1" />
            <span className="text-white text-xs font-bold">Değiştir</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="productName" className="block text-sm font-bold text-slate-700 mb-2">Ürün Adı</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBox className="text-slate-400" />
            </div>
            <input
              type="text"
              name="productName"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Örn: Premium Deri Çanta"
            />
          </div>
        </div>

        <div>
          <label htmlFor="productDescription" className="block text-sm font-bold text-slate-700 mb-2">Açıklama</label>
          <textarea
            name="productDescription"
            id="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            rows="4"
            required
            className="block w-full px-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            placeholder="Ürün özelliklerini detaylıca yazınız..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="productPrice" className="block text-sm font-bold text-slate-700 mb-2">Fiyat (USD)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMoneyBillWave className="text-slate-400" />
              </div>
              <input
                type="number"
                name="productPrice"
                id="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                step="0.01"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="productStock" className="block text-sm font-bold text-slate-700 mb-2">Stok Adedi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSortNumericDown className="text-slate-400" />
              </div>
              <input
                type="number"
                name="productStock"
                id="productStock"
                value={formData.productStock}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="maxQuantityPerCart" className="block text-sm font-bold text-slate-700 mb-2">Sepet Limiti</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBox className="text-slate-400" />
              </div>
              <input
                type="number"
                name="maxQuantityPerCart"
                id="maxQuantityPerCart"
                value={formData.maxQuantityPerCart}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <FaTimes /> İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          {loading ? <LoadingSpinner size="small" color="border-slate-900" /> : <><FaSave /> {isEditMode ? 'Değişiklikleri Kaydet' : 'Ürünü Oluştur'}</>}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;