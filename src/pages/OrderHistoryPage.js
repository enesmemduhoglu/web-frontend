import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../services/orderService';
import { jwtDecode } from 'jwt-decode';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const getUserIdFromToken = useCallback(() => {
    if (!token) return null;
    try {
      return jwtDecode(token).user_id;
    } catch (e) {
      return null;
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("Siparişlerinizi görmek için lütfen giriş yapın.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getOrdersByUserId(userId);
        setOrders(response.data);
      } catch (err) {
        setError("Siparişler getirilirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getUserIdFromToken]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Sipariş Geçmişim</h1>
      {orders.length === 0 ? (
        <p>Henüz bir siparişiniz bulunmuyor.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <p className="font-bold">Sipariş No: #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Tarih: {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{order.totalAmount.toFixed(2)} USD</p>
                  <span className="text-sm font-semibold text-green-600">{order.status}</span>
                </div>
              </div>
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span>{item.productName} (x{item.quantity})</span>
                    <span>{(item.priceAtPurchase * item.quantity).toFixed(2)} USD</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;