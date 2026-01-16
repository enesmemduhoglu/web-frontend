import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaRegHeart, FaTruck, FaShieldAlt, FaUndo, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addOrRemoveFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError("Ürün yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container mx-auto p-8"><ErrorMessage message={error} /></div>;
  if (!product) return <div className="container mx-auto p-8 text-center text-slate-500">Ürün bulunamadı.</div>;

  const isFavorite = isInWishlist(product.productId);

  const handleAddToCart = () => {
    addToCart(product.productId, quantity);
  };

  const handleWishlistToggle = () => {
    addOrRemoveFromWishlist(product.productId);
  };

  const incrementQty = () => {
    if (quantity < (product.maxQuantityPerCart)) setQuantity(q => q + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-yellow-600 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{product.productName}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image Section */}
            <div className="bg-white p-8 flex items-center justify-center border-r border-slate-100">
              <div className="relative group w-full max-w-md aspect-square rounded-xl overflow-hidden bg-slate-50">
                <img
                  src={product.productImage || 'https://via.placeholder.com/600'}
                  alt={product.productName}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  YENİ
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">



              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                {product.productName}
              </h1>

              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  {formatPrice(product.productPrice)}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8">
                {product.productDescription}
              </p>

              {/* Quantity & Actions */}
              <div className="space-y-6 border-t border-slate-100 pt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-slate-200 rounded-full h-12 w-fit">
                    <button onClick={decrementQty} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
                    <button onClick={incrementQty} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-full shadow-lg shadow-slate-900/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> Sepete Ekle
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 transition-all ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white text-slate-400 hover:border-red-300 hover:text-red-400'}`}
                  >
                    {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                  </button>
                </div>

                <div className="text-xs text-slate-500 flex gap-4 mt-4">
                  <span>
                    <span className="font-bold text-slate-900">Stok:</span> {product.productStock > 0 ? 'Stokta Var' : 'Tükendi'}
                  </span>
                  <span>
                    <span className="font-bold text-slate-900">Maksimum:</span> {product.maxQuantityPerCart} adet
                  </span>
                </div>
              </div>

              {/* Features (Inline) */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="bg-blue-50 p-2 rounded-full text-blue-500"><FaTruck /></div>
                  <span>Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="bg-green-50 p-2 rounded-full text-green-500"><FaShieldAlt /></div>
                  <span>Orijinal Ürün</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="bg-purple-50 p-2 rounded-full text-purple-500"><FaUndo /></div>
                  <span>14 Gün İade</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabs / Additional Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
          <div className="flex gap-8 border-b border-slate-100 mb-6">
            <button className="text-slate-900 font-bold border-b-2 border-yellow-400 pb-4">Ürün Açıklaması</button>
            <button className="text-slate-400 font-medium hover:text-slate-900 transition-colors pb-4">Özellikler</button>
            <button className="text-slate-400 font-medium hover:text-slate-900 transition-colors pb-4">Yorumlar (12)</button>
          </div>
          <div className="text-slate-600 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Detaylı Bilgi</h3>
            <p className="mb-4">
              {product.productDescription}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;