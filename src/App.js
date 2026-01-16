import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PreventAdminAccess from './components/PreventAdminAccess';

import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import SearchResultsPage from './pages/SearchResultsPage';
import WishlistPage from './pages/WishlistPage';
import ProductDetailPage from './pages/ProductDetailPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductManagement from './pages/admin/AdminProductManagement';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminEditUserPage from './pages/admin/AdminEditUserPage';
import AdminOrderManagement from './pages/admin/AdminOrderManagement';
import UserProfilePage from './pages/UserProfilePage';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              <Routes>

                <Route element={<PreventAdminAccess />}>
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/orders" element={<UserProfilePage />} /> {/* Redirecting orders to profile page implicitly via Component reuse or we can use Navigate */}
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                  </Route>
                </Route>

                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProductManagement />} />
                    <Route path="/admin/products/new" element={<AdminAddProductPage />} />
                    <Route path="/admin/products/edit/:id" element={<AdminEditProductPage />} />
                    <Route path="/admin/users" element={<AdminUserManagement />} />
                    <Route path="/admin/users/edit/:id" element={<AdminEditUserPage />} />
                    <Route path="/admin/orders" element={<AdminOrderManagement />} />
                  </Route>
                </Route>

              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;