import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProfileInfoTab from '../components/profile/ProfileInfoTab';
import OrderHistoryTab from '../components/profile/OrderHistoryTab'; // Fixed path
import AddressTab from '../components/profile/AddressTab';
import { FaUser, FaBoxOpen, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UserProfilePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    // Tabs: 'info', 'orders', 'address'
    const [activeTab, setActiveTab] = useState('info');

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && ['info', 'orders', 'address'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        navigate(`/profile?tab=${tabId}`, { replace: true });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 min-h-[80vh] flex flex-col md:flex-row gap-8 animate-fadeIn">

            {/* Sidebar Navigation */}
            <div className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                    {/* User Brief */}
                    <div className="p-6 bg-slate-900 text-white text-center">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl font-black text-slate-900 shadow-lg mb-3">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="font-bold text-lg">{user?.username}</h2>
                        <p className="text-slate-400 text-sm">{user?.email}</p>
                    </div>

                    <nav className="p-2 space-y-1">
                        <button
                            onClick={() => handleTabChange('info')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'info'
                                    ? 'bg-yellow-50 text-yellow-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <FaUser className={activeTab === 'info' ? 'text-yellow-500' : 'text-slate-400'} />
                            Profil Bilgileri
                        </button>
                        <button
                            onClick={() => handleTabChange('orders')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'orders'
                                    ? 'bg-yellow-50 text-yellow-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <FaBoxOpen className={activeTab === 'orders' ? 'text-yellow-500' : 'text-slate-400'} />
                            Siparişlerim
                        </button>
                        <button
                            onClick={() => handleTabChange('address')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'address'
                                    ? 'bg-yellow-50 text-yellow-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <FaMapMarkerAlt className={activeTab === 'address' ? 'text-yellow-500' : 'text-slate-400'} />
                            Adreslerim
                        </button>

                        <div className="pt-2 mt-2 border-t border-slate-100">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all"
                            >
                                <FaSignOutAlt /> Çıkış Yap
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow md:w-3/4 lg:w-4/5">
                {activeTab === 'info' && <ProfileInfoTab />}
                {activeTab === 'orders' && <OrderHistoryTab />}
                {activeTab === 'address' && <AddressTab />}
            </div>

        </div>
    );
};

export default UserProfilePage;
