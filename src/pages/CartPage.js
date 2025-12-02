import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, itemCount, removeFromCart } = useCart();

  const calculateSubtotal = (item) => {
    return (item.quantity * item.productPrice).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.productPrice), 0).toFixed(2);
  };

  if (itemCount === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold mb-4">Sepetiniz Boş</h1>
        <Link to="/" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Sepetim ({itemCount} ürün)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
          {cartItems.map(item => (
            <div key={item.productId} className="flex items-center border-b py-4">
              <img src={item.productImage || 'https://via.placeholder.com/150'} alt={item.productName} className="w-24 h-24 object-contain mr-4"/>
              <div className="flex-grow">
                <h2 className="font-bold">{item.productName}</h2>
                <p className="text-sm text-gray-600">{item.productDescription}</p>
              </div>
              <div className="w-24 text-center">
                <p>{item.quantity} adet</p>
              </div>
              <div className="w-24 text-right font-bold">
                <p>{calculateSubtotal(item)} USD</p>
              </div>
              <div className="w-16 text-right">
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Ara Toplam</span>
              <span>{calculateTotal()} USD</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Kargo</span>
              <span>Ücretsiz</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Toplam</span>
              <span>{calculateTotal()} USD</span>
            </div>
            <Link 
              to="/checkout" 
              className="block text-center mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              Ödemeye Geç
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;