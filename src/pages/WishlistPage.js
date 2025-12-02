import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">İstek Listem ({wishlistItems.length} ürün)</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-lg mb-4">İstek listenizde henüz bir ürün bulunmuyor.</p>
          <Link to="/" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;