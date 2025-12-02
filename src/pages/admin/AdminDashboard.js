import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Yönetim Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/products" className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Ürün Yönetimi</h2>
          <p className="text-gray-600">Yeni ürün ekleyin, mevcut ürünleri düzenleyin veya silin.</p>
        </Link>
        <Link to="/admin/users" className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Kullanıcı Yönetimi</h2>
          <p className="text-gray-600">Kullanıcıları görüntüleyin veya yönetin.</p>
        </Link>
        <Link to="/admin/orders" className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Sipariş Yönetimi</h2>
          <p className="text-gray-600">Müşteri siparişlerini görüntüleyin ve yönetin.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;