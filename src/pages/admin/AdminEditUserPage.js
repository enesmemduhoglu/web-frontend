import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsers, updateUser } from '../../services/userService';

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

  if (loading) return <div>Kullanıcı bilgileri yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Kullanıcıyı Düzenle: {formData.username}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Ad</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Soyad</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
          <select name="role" id="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/admin/users')} className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            İptal
          </button>
          <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditUserPage;