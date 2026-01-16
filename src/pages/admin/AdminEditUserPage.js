import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsers, updateUser } from '../../services/userService';
import { FaUser, FaIdCard, FaSave, FaTimes, FaUserShield } from 'react-icons/fa';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminEditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    role: 'USER'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        // ID'yi string karşılaştırması yaparak bulalım
        const userToEdit = response.data.find(user => user.id.toString() === id);
        if (userToEdit) {
          setFormData(userToEdit);
        } else {
          setError("Kullanıcı bulunamadı.");
        }
      } catch (err) {
        setError("Kullanıcı bilgileri yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateUser(id, formData);
      alert("Kullanıcı başarıyla güncellendi.");
      navigate('/admin/users');
    } catch (err) {
      setError(`Kullanıcı güncellenemedi: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.username) return <LoadingSpinner />;
  if (error) return (
    <div className="container mx-auto p-4 text-center">
      <div className="bg-red-50 text-red-500 p-4 rounded-lg inline-block">
        {error}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Kullanıcıyı Düzenle</h1>
        <p className="text-slate-500 mt-1"><span className="font-bold text-slate-800">{formData.username}</span> adlı kullanıcının bilgilerini güncelliyorsunuz.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 bg-purple-400 opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-2">Ad</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-2">Soyad</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-2">Kullanıcı Adı</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="text-slate-400" />
              </div>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-bold text-slate-700 mb-2">Kullanıcı Rolü</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserShield className="text-slate-400" />
              </div>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all appearance-none"
              >
                <option value="USER">Standart Kullanıcı (USER)</option>
                <option value="ADMIN">Yönetici (ADMIN)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <FaTimes /> İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              {loading ? 'Güncelleniyor...' : <><FaSave /> Güncelle</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUserPage;