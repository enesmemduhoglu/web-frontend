import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
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

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!product) return <div>Ürün bulunamadı.</div>;

  const isFavorite = isInWishlist(product.productId);

  const handleAddToCart = () => {
    addToCart(product.productId);
  };

  const handleWishlistToggle = () => {
    addOrRemoveFromWishlist(product.productId);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md">
        <div className="w-full h-96 overflow-hidden rounded-lg">
          <img 
            src={product.productImage || 'https://via.placeholder.com/400'} 
            alt={product.productName} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-3xl font-bold text-red-700 mb-6">
            {product.productPrice} USD
          </p>
          <p className="text-gray-700 mb-6">
            {product.productDescription}
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-grow bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded text-lg"
            >
              Sepete Ekle
            </button>
            <button 
              onClick={handleWishlistToggle}
              className="p-3 border border-gray-300 rounded-full text-red-500 hover:bg-gray-100"
            >
              {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>Stok Durumu: {product.productStock > 0 ? `${product.productStock} adet` : 'Stokta Yok'}</p>
            <p>Sepete Eklenebilecek Maksimum Adet: {product.maxQuantityPerCart}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;