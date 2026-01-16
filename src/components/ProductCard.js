import React from 'react';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addOrRemoveFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.productId) {
      addToCart(product.productId);
    } else {
      console.error("Ürün ID'si bulunamadı!", product);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addOrRemoveFromWishlist(product.productId);
  };

  const isFavorite = isInWishlist(product.productId);

  return (
    <Link to={`/product/${product.productId}`} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col relative">
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full text-red-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
      >
        {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>

      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.productImage || 'https://via.placeholder.com/150'}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 h-12 overflow-hidden">
          {product.productName}
        </h3>
        <p className="text-xl font-bold text-red-700 my-2">
          {formatPrice(product.productPrice)}
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          Sepete Ekle
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;