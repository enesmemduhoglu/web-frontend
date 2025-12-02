import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import { registerUser } from '../services/authService'; // API fonksiyonumuz

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Yönlendirme fonksiyonunu başlat

  // Formdaki her input değiştiğinde state'i güncelleyen fonksiyon
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    setError(null);
    setLoading(true);

    try {
      const response = await registerUser(formData);
      console.log('Kayıt başarılı:', response.data);
      // Başarılı kayıt sonrası kullanıcıyı login sayfasına yönlendir
      navigate('/login'); 
    } catch (err) {
      console.error('Kayıt hatası:', err.response ? err.response.data : err.message);
      // Backend'den gelen hata mesajını veya genel bir mesajı göster
      setError(err.response?.data || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Hesap Oluştur</h2>

        {/* Hata Mesajı Alanı */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex -mx-3 mb-4">
          <div className="w-1/2 px-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">Ad</label>
            <input onChange={handleChange} value={formData.firstName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" required />
          </div>
          <div className="w-1/2 px-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Soyad</label>
            <input onChange={handleChange} value={formData.lastName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Kullanıcı Adı</label>
          <input onChange={handleChange} value={formData.username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-posta</label>
          <input onChange={handleChange} value={formData.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" required />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Şifre</label>
          <input onChange={handleChange} value={formData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required />
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
          {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;