import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { FaSearch } from 'react-icons/fa';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await searchProducts(query);
        setSearchResults(response.data);
      } catch (err) {
        setError("Arama sonuçları getirilirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-100 pb-6">
        <p className="text-slate-500 font-medium mb-1">Arama Sonuçları</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          "{query}" <span className="text-slate-400 text-2xl font-normal">için {searchResults.length} sonuç bulundu</span>
        </h1>
      </div>

      {searchResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
          <div className="bg-white p-6 rounded-full shadow-sm mb-6">
            <FaSearch className="text-4xl text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Sonuç Bulunamadı</h2>
          <p className="text-slate-500 max-w-md text-center mb-8">
            "{query}" aramasıyla eşleşen ürün bulamadık. Lütfen farklı anahtar kelimelerle tekrar deneyin veya kategorilerimize göz atın.
          </p>
          <Link to="/" className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-slate-900/20">
            Anasayfaya Dön
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {searchResults.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;