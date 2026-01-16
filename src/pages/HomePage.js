import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-fadeIn">
      {/* Simple Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            En Kaliteli Ürünler, <span className="text-yellow-400">En Uygun Fiyatlarla</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            İhtiyacınız olan her şey tek bir adreste. Güvenli alışveriş ve hızlı teslimatın keyfini çıkarın.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <span className="text-yellow-600 font-bold tracking-wider uppercase text-xs bg-yellow-100 px-3 py-1 rounded-full">Keşfet</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">Tüm Ürünlerimiz</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;