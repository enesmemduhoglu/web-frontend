import React, { useState, useEffect } from 'react';

import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiTruck, FiShield, FiClock, FiCreditCard, FiArrowRight } from 'react-icons/fi';

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

  const categories = [
    { name: 'Elektronik', icon: '💻', color: 'bg-blue-100 text-blue-600' },
    { name: 'Moda', icon: '👗', color: 'bg-pink-100 text-pink-600' },
    { name: 'Ev & Yaşam', icon: '🏠', color: 'bg-green-100 text-green-600' },
    { name: 'Spor', icon: '⚽', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl animate-fadeIn">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-400 font-bold tracking-wide text-xs mb-4 border border-yellow-500/30">
              YENİ SEZON
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
              Tarzını <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Keşfet.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              En yeni trendler, en popüler ürünler ve kaçırılmayacak fırsatlar şimdi tek bir yerde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-full shadow-lg shadow-yellow-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Alışverişe Başla <FiArrowRight />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm transition-all border border-white/10">
                Koleksiyonları İncele
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FiTruck size={24} />, title: "Hızlı Kargo", desc: "Aynı gün kargo imkanı" },
              { icon: <FiShield size={24} />, title: "Güvenli Ödeme", desc: "256-bit SSL koruması" },
              { icon: <FiClock size={24} />, title: "7/24 Destek", desc: "Her zaman yanınızdayız" },
              { icon: <FiCreditCard size={24} />, title: "Kolay İade", desc: "14 gün içinde iade" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-800 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Review Section (Mock) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Popüler Kategoriler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className={`${cat.color} p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 text-center`}>
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Öne Çıkan Ürünler</h2>
          <button className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center gap-1">
            Tümünü Gör <FiArrowRight />
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
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

    </div>
  );
};

export default HomePage;