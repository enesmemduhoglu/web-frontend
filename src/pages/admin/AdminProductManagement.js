import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productService';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Ürünler yüklenirken bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      try {
        await deleteProduct(id);
        fetchProducts(); 
        alert("Ürün başarıyla silindi.");
      } catch (err) {
        setError("Ürün silinirken bir hata oluştu.");
        console.error(err);
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
        <Link 
          to="/admin/products/new" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Yeni Ürün Ekle
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resim</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.productId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.productImage || 'https://via.placeholder.com/50'} alt={product.productName} className="w-12 h-12 object-cover rounded"/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productPrice} USD</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productStock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link to={`/admin/products/edit/${product.productId}`} className="text-indigo-600 hover:text-indigo-900 p-1">
                    <FaEdit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(product.productId)} className="text-red-600 hover:text-red-900 p-1">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductManagement;