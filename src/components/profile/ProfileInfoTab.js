import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaSave } from 'react-icons/fa';

import * as userService from '../../services/userService'; // Import userService correctly

const ProfileInfoTab = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: 'Loading...',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
    });

    // Fetch user details on mount
    React.useEffect(() => {
        if (user?.userId) {
            userService.getUserById(user.userId)
                .then(response => {
                    const userData = response.data;
                    setFormData(prev => ({
                        ...prev,
                        email: userData.email || '',
                        firstName: userData.firstName || prev.firstName,
                        lastName: userData.lastName || prev.lastName,
                        username: userData.username || prev.username
                    }));
                })
                .catch(error => console.error("Could not fetch user info:", error));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here would be the API call to update user info
        setIsEditing(false);
        alert("Profil bilgileri güncellendi (Demo)");
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <FaUser className="text-yellow-500" /> Profil Bilgileri
                </h2>
                <button
                    onClick={() => {
                        if (isEditing) handleSubmit({ preventDefault: () => { } });
                        else setIsEditing(true);
                    }}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${isEditing
                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                >
                    {isEditing ? <span className="flex items-center gap-2"><FaSave /> Kaydet</span> : 'Düzenle'}
                </button>
            </div>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kullanıcı Adı</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            disabled={true} // Usually username is immutable or hard to change
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                        />
                        <p className="text-xs text-slate-400 mt-1">Kullanıcı adı değiştirilemez.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">E-posta</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border font-medium transition-all ${isEditing
                                    ? 'bg-white border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20'
                                    : 'bg-slate-50 border-slate-200 text-slate-600'
                                    }`}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Ad</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 rounded-xl border font-medium transition-all ${isEditing
                                ? 'bg-white border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                                }`}
                            placeholder="Adınız"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Soyad</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 rounded-xl border font-medium transition-all ${isEditing
                                ? 'bg-white border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                                }`}
                            placeholder="Soyadınız"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfoTab;
