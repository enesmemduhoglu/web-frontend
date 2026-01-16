import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getOrdersByUserId } from '../../services/orderService'; // Adjusted import path
import { jwtDecode } from 'jwt-decode';
import LoadingSpinner from '../common/LoadingSpinner'; // Adjusted import path
import ErrorMessage from '../common/ErrorMessage'; // Adjusted import path
import { FaBoxOpen, FaCalendarAlt, FaClock, FaCheckCircle, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

const OrderHistoryTab = () => {
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
                // Sort orders by date descending (newest first)
                const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
            } catch (err) {
                setError("Siparişler getirilirken bir hata oluştu.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [getUserIdFromToken]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock className="mr-1" />, label: 'İşleniyor' },
            'SHIPPED': { color: 'bg-blue-100 text-blue-800', icon: <FaTruck className="mr-1" />, label: 'Kargolandı' },
            'DELIVERED': { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="mr-1" />, label: 'Teslim Edildi' },
            'CANCELLED': { color: 'bg-red-100 text-red-800', icon: null, label: 'İptal Edildi' }
        };

        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: null, label: status };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${config.color}`}>
                {config.icon} {config.label}
            </span>
        );
    };

    if (loading) return <div className="py-12"><LoadingSpinner /></div>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FaBoxOpen className="text-yellow-500" /> Sipariş Geçmişi
            </h2>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <FaBoxOpen className="mx-auto text-5xl text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold text-slate-700">Henüz siparişiniz bulunmuyor</h3>
                    <p className="text-slate-500 mt-2">Verdiğiniz siparişler burada listelenecektir.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            {/* Card Header */}
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Sipariş No</span>
                                        <span className="text-slate-900 font-bold font-mono">#{String(order.id).slice(0, 8)}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Tarih</span>
                                        <span className="text-slate-700 font-medium flex items-center gap-1">
                                            <FaCalendarAlt className="text-slate-400 text-xs" />
                                            {new Date(order.orderDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Tutar</span>
                                        <span className="text-lg font-bold text-slate-900">
                                            {order.totalAmount.toFixed(2)} USD
                                        </span>
                                    </div>
                                    {getStatusBadge(order.status)}
                                </div>
                            </div>

                            {/* Card Body - Items */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-12 h-12 bg-white rounded-md border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                                {item.productImage ? (
                                                    <img
                                                        src={item.productImage}
                                                        alt={item.productName}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="font-bold text-slate-300 text-lg">{item.productName.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="font-bold text-slate-800 text-sm truncate" title={item.productName}>{item.productName}</p>
                                                <p className="text-xs text-slate-500">Adet: {item.quantity} x ${item.priceAtPurchase}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping Info (Mock) */}
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-sm text-slate-500">
                                    <FaMapMarkerAlt className="mt-0.5 text-slate-400" />
                                    <span>Teslimat Adresi: {order.shippingAddress || "Adres bilgisi bulunamadı"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryTab;
