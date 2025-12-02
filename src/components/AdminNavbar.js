import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaBox, FaUsers, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold">
          <Link to="/admin/dashboard" className="hover:text-yellow-400">Admin Paneli</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaTachometerAlt />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaBox />
            <span className="hidden md:inline">Ürünler</span>
          </Link>
          <Link to="/admin/users" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaUsers />
            <span className="hidden md:inline">Kullanıcılar</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaClipboardList />
            <span className="hidden md:inline">Siparişler</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <span className="hidden lg:inline">Hoş geldin, {user?.username}</span>
        <button onClick={handleLogout} className="flex items-center gap-2 p-2 hover:bg-red-700 rounded-md bg-red-600">
          <FaSignOutAlt />
          <span className="hidden md:inline">Çıkış Yap</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;