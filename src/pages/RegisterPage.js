import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await registerUser(formData);
      console.log('Kayıt başarılı:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Kayıt hatası:', err.response ? err.response.data : err.message);
      setError(err.response?.data || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-10">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-xl mx-4 animate-fadeIn">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">

          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Hesap Oluşturun</h2>
              <p className="text-slate-300 font-medium">LuxeMarket ayrıcalıklarından yararlanın</p>
            </div>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-white mb-2 ml-1">Ad</label>
                  <input
                    onChange={handleChange}
                    value={formData.firstName}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                    id="firstName"
                    type="text"
                    required
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-white mb-2 ml-1">Soyad</label>
                  <input
                    onChange={handleChange}
                    value={formData.lastName}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                    id="lastName"
                    type="text"
                    required
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-bold text-white mb-2 ml-1">Kullanıcı Adı</label>
                <input
                  onChange={handleChange}
                  value={formData.username}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                  id="username"
                  type="text"
                  required
                  placeholder="Kullanıcı adı"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2 ml-1">E-posta</label>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                  id="email"
                  type="email"
                  required
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-white mb-2 ml-1">Şifre</label>
                <input
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-slate-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Kayıt Ol'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-300">
                Zaten hesabınız var mı?{' '}
                <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;