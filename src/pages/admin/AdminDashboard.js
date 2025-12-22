import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaClipboardList, FaArrowRight, FaChartLine, FaDollarSign } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-xs font-medium text-green-500">
        <FaChartLine className="mr-1" />
        <span>{trend}</span>
      </div>
    )}
  </div>
);

const QuickActionCard = ({ title, description, icon, to, color }) => (
  <Link
    to={to}
    className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <div className={`absolute top-0 right-0 p-20 ${color} opacity-5 rounded-bl-full transform group-hover:scale-110 transition-transform`}></div>
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-4 text-xl`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-yellow-600 transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 mb-6">{description}</p>
      <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-yellow-600 transition-colors">
        Yönet <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Genel Bakış</h1>
          <p className="text-slate-500 mt-1">Mağaza performansınızı ve aktivitelerinizi buradan takip edin.</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          <button className="px-4 py-2 text-sm font-bold text-slate-800 bg-slate-100 rounded-md">Bugün</button>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800">Bu Hafta</button>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800">Bu Ay</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Satış"
          value="$12,450"
          icon={<FaDollarSign className="text-green-600" />}
          color="bg-green-500"
          trend="+15% geçen aya göre"
        />
        <StatCard
          title="Aktif Siparişler"
          value="45"
          icon={<FaClipboardList className="text-blue-600" />}
          color="bg-blue-500"
          trend="+5 yeni sipariş"
        />
        <StatCard
          title="Toplam Ürün"
          value="128"
          icon={<FaBox className="text-purple-600" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Müşteriler"
          value="1,240"
          icon={<FaUsers className="text-orange-600" />}
          color="bg-orange-500"
          trend="+12 bu hafta"
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Ürün Yönetimi"
            description="Yeni ürün ekleyin, stoğu güncelleyin veya ürünleri düzenleyin."
            icon={<FaBox className="text-purple-600" />}
            to="/admin/products"
            color="bg-purple-500"
          />
          <QuickActionCard
            title="Müşteri Yönetimi"
            description="Kayıtlı kullanıcıları görüntüleyin ve hesap durumlarını yönetin."
            icon={<FaUsers className="text-orange-600" />}
            to="/admin/users"
            color="bg-orange-500"
          />
          <QuickActionCard
            title="Sipariş Takibi"
            description="Gelen siparişleri onaylayın, kargo durumunu güncelleyin."
            icon={<FaClipboardList className="text-blue-600" />}
            to="/admin/orders"
            color="bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;