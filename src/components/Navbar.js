import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiSearch, FiHeart, FiLogOut, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center gap-2" title="Ana Sayfa">
              <div className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:to-yellow-400 transition-all duration-500">
                E-Commerce
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-xl mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-yellow-400 transition-colors">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün, marka veya kategori ara..."
              className="w-full bg-slate-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-full border border-slate-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all placeholder-slate-500 text-sm"
            />
          </form>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-4 text-slate-200">

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-slate-800 hover:text-red-500 transition-colors duration-300 relative group" title="İstek Listem">
              <FiHeart size={22} className="group-hover:scale-110 transition-transform" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 rounded-full hover:bg-slate-800 hover:text-yellow-400 transition-colors duration-300 relative group" title="Sepetim">
              <FiShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse-slow border border-slate-900">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Dropdown / Auth Links */}
            <div className="hidden md:flex items-center gap-3 pl-2 border-l border-slate-700 ml-2">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shadow-inner">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">{user.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    title="Çıkış Yap"
                  >
                    <FiLogOut size={20} />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Link to="/login" className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-all">
                    Giriş
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-full shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5">
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn border-t border-slate-800 pt-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiSearch size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ara..."
                className="w-full bg-slate-800 text-slate-100 pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-yellow-500 focus:outline-none text-sm"
              />
            </form>

            <div className="space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2 bg-slate-800 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-200">{user.username}</span>
                  </div>
                  <Link to="/profile?tab=orders" className="block p-2 text-slate-300 hover:bg-slate-800 rounded">Siparişlerim</Link>
                  <button onClick={handleLogout} className="w-full text-left p-2 text-red-400 hover:bg-slate-800 rounded flex items-center gap-2">
                    <FiLogOut size={16} /> Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" className="text-center py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">Giriş Yap</Link>
                  <Link to="/register" className="text-center py-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 font-bold">Kayıt Ol</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;