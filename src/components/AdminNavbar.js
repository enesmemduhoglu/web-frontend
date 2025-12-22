import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBox, FaUsers, FaSignOutAlt, FaClipboardList, FaChartPie, FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const navItems = [
    { path: '/admin/dashboard', icon: <FaChartPie />, label: 'Panel' },
    { path: '/admin/products', icon: <FaBox />, label: 'Ürünler' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Kullanıcılar' },
    { path: '/admin/orders', icon: <FaClipboardList />, label: 'Siparişler' },
  ];

  return (
    <nav className="bg-slate-900 border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-slate-900 shadow-lg group-hover:shadow-yellow-400/20 transition-all">
                LM
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Admin Portal
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                    ? 'bg-white/10 text-yellow-400 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <FaUserCircle className="text-yellow-400" />
              <span className="text-sm font-medium">{user?.username || 'Admin'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 transition-all duration-300 text-sm font-bold"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;