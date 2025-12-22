import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      await login(formData);
      navigate('/');
    } catch (err) {
      console.error('Giriş hatası:', err.response ? err.response.data : err.message);
      setError(err.response?.data || 'Giriş yapılamadı. Kullanıcı adı veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 w-full max-w-md mx-4 animate-fadeIn">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">

          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Hoş Geldiniz</h2>
              <p className="text-slate-300 font-medium">LuxeMarket hesabınıza giriş yapın</p>
            </div>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-bold text-white mb-2 ml-1">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    onChange={handleChange}
                    value={formData.username}
                    required
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Kullanıcı adı"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-white mb-2 ml-1">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-slate-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Giriş Yap'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-300">
                Hesabınız yok mu?{' '}
                <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors">
                  Kayıt Olun
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;