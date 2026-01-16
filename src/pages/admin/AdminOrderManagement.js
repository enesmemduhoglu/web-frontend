import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/orderService';
import { FaCalendarAlt, FaClipboardList, FaCheckCircle, FaTruck, FaClock, FaTimesCircle } from 'react-icons/fa';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getAllOrders();
        // Siparişleri tarihe göre (en yeni en üstte) sıralayalım
        const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (err) {
        setError("Siparişler yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800"><FaCheckCircle /> Teslim Edildi</span>;
      case 'SHIPPED':
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-bold rounded-full bg-blue-100 text-blue-800"><FaTruck /> Kargoda</span>;
      case 'CANCELLED':
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-bold rounded-full bg-red-100 text-red-800"><FaTimesCircle /> İptal</span>;
      default:
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800"><FaClock /> Beklemede</span>;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8"><ErrorMessage message={error} /></div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Sipariş Yönetimi</h1>
          <p className="text-slate-500 mt-1">Gelen siparişleri takip edin ve durumlarını güncelleyin.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Sipariş No</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tutar</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">İçerik</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-bold text-slate-900">#{String(order.id).slice(0, 8)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-slate-400" />
                        {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 ml-5">
                        {new Date(order.orderDate).toLocaleTimeString('tr-TR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                      ${order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <ul className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            <span>{item.productName} <span className="text-slate-400 text-xs">(x{item.quantity})</span></span>
                          </li>
                        ))}
                        {order.items.length > 2 && (
                          <li className="text-xs text-slate-400 pl-3">
                            + {order.items.length - 2} ürün daha
                          </li>
                        )}
                      </ul>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <FaClipboardList className="text-4xl text-slate-300" />
                      <p>Henüz sipariş bulunmuyor.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;