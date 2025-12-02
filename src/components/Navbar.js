import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiSearch, FiHeart, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

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
    <nav className="bg-gray-800 text-white p-4 shadow-md flex items-center gap-4">
      <div className="text-xl font-bold flex-shrink-0">
        <Link to="/" className="hover:text-yellow-400">E-Ticaret</Link>
      </div>

      <form onSubmit={handleSearch} className="flex-grow min-w-0">
        <div className="flex w-full">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ürün, marka veya kategori ara..."
            className="w-full p-2 rounded-l-md text-black focus:outline-none"
          />
          <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-r-md flex items-center">
            <FiSearch size={20} />
          </button>
        </div>
      </form>

      <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
        {user ? (
          <>
            <Link to="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
              <FiUser size={20} />
              <span className="hidden md:inline">{user.username}</span>
            </Link>
            <button onClick={handleLogout} className="hover:text-yellow-400 hidden md:inline">
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
              <FiLogIn size={20} />
              <span className="hidden md:inline">Giriş Yap</span>
            </Link>
            <Link to="/register" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
              <FiUserPlus size={20} />
              <span className="hidden md:inline">Kayıt Ol</span>
            </Link>
          </>
        )}
        
        <Link to="/wishlist" className="p-2 hover:bg-gray-700 rounded-md" title="İstek Listem">
          <FiHeart size={24} />
        </Link>
        
        <Link to="/cart" className="relative p-2 hover:bg-gray-700 rounded-md" title="Sepetim">
          <FiShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount} 
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;