import React, { useState, useEffect } from 'react';
import { addressService } from '../../services/addressService';
import { FaMapMarkerAlt, FaCheck, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddressSelection = ({ onSelect, selectedAddressId }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await addressService.getMyAddresses();
                setAddresses(data);

                // If there's only one address, select it automatically if none selected
                if (data.length > 0 && !selectedAddressId) {
                    const defaultAddr = data.find(a => a.default) || data[0];
                    onSelect(defaultAddr.id);
                }
            } catch (error) {
                console.error("Adresler yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();
    }, []);

    const handleAddNew = () => {
        navigate('/profile?tab=address');
    };

    if (loading) return <div className="text-center py-4 text-slate-500">Adresler yükleniyor...</div>;

    if (addresses.length === 0) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <p className="text-slate-700 mb-4">Henüz kayıtlı bir adresiniz yok.</p>
                <button
                    onClick={handleAddNew}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors"
                >
                    Adres Ekle
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <FaMapMarkerAlt /> Teslimat Adresi
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {addresses.map(addr => (
                    <div
                        key={addr.id}
                        onClick={() => onSelect(addr.id)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressId === addr.id
                            ? 'border-yellow-400 bg-yellow-50/50'
                            : 'border-slate-100 hover:border-slate-200'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-slate-900">{addr.title}</h4>
                                <p className="text-sm text-slate-600 mt-1">
                                    {addr.details}, {addr.district} / {addr.city}
                                </p>
                            </div>
                            {selectedAddressId === addr.id && (
                                <div className="bg-yellow-400 text-slate-900 rounded-full p-1 shadow-sm">
                                    <FaCheck size={12} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddNew}
                className="text-sm text-yellow-600 font-bold hover:underline flex items-center gap-1 mt-2"
            >
                <FaPlus size={10} /> Yeni Adres Ekle
            </button>
        </div>
    );
};

export default AddressSelection;
