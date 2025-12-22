import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FaHeart, FaArrowRight } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
          <FaHeart className="text-red-500" /> İstek Listem
        </h1>
        <span className="text-slate-500 font-medium">{wishlistItems.length} ürün</span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
          <div className="bg-white p-6 rounded-full shadow-sm mb-6">
            <FaHeart className="text-4xl text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Listeniz henüz boş</h2>
          <p className="text-slate-500 max-w-md text-center mb-8">
            Beğendiğiniz ürünleri kalp ikonuna tıklayarak buraya ekleyebilir ve daha sonra kolayca satın alabilirsiniz.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-slate-900/20 transform hover:-translate-y-1">
            Alışverişe Başla <FaArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {wishlistItems.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;