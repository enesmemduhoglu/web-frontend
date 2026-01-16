import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import { addressService } from '../../services/addressService';

const AddressTab = () => {
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        city: '',
        district: '',
        zip: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const data = await addressService.getMyAddresses();
            setAddresses(data);
        } catch (error) {
            console.error("Adresler yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addressService.addAddress(formData);
            setShowModal(false);
            setFormData({ title: '', details: '', city: '', district: '', zip: '' });
            fetchAddresses();
        } catch (error) {
            console.error("Adres eklenirken hata:", error);
            alert("Adres eklenirken bir hata oluştu.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bu adresi silmek istediğinize emin misiniz?")) {
            try {
                await addressService.deleteAddress(id);
                fetchAddresses();
            } catch (error) {
                console.error("Adres silinirken hata:", error);
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 animate-fadeIn relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-yellow-500" /> Kayıtlı Adreslerim
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                >
                    <FaPlus /> Yeni Adres Ekle
                </button>
            </div>

            {loading ? (
                <div className="text-center text-slate-500 py-8">Yükleniyor...</div>
            ) : addresses.length === 0 ? (
                <div className="text-center text-slate-500 py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    Henüz kayıtlı adresiniz yok.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(addr => (
                        <div key={addr.id} className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${addr.default ? 'border-yellow-400 bg-yellow-50/20' : 'border-slate-100 hover:border-slate-200'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-full ${addr.default ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{addr.title}</h3>
                                        {addr.default && <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">Varsayılan</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(addr.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                        title="Sil"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                {addr.details} <br />
                                {addr.district} / {addr.city} <br />
                                {addr.zip}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-fadeIn">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-slate-900 mb-6">Yeni Adres Ekle</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Adres Başlığı</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Örn: Evim, İşyeri"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Şehir</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">İlçe</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Posta Kodu</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Adres Detayı</label>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 rounded-lg shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-1"
                            >
                                Adresi Kaydet
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressTab;
