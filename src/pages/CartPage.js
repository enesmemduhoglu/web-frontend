import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaArrowRight } from 'react-icons/fa';

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="bg-slate-50 p-8 rounded-full mb-6">
          <FaShoppingBag className="text-6xl text-slate-300" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Sepetiniz Boş</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
          Henüz sepetinize hiç ürün eklememişsiniz. LuxeMarket'in seçkin koleksiyonunu keşfetmeye başlayın.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-slate-900/20 transform hover:-translate-y-1"
        >
          Alışverişe Başla <FaArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8 flex items-center gap-3">
        Sepetim <span className="text-lg py-1 px-3 bg-yellow-100 text-yellow-800 rounded-full font-bold">{itemCount} ürün</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.productId} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6">

              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-50 rounded-xl p-2">
                <img
                  src={item.productImage || 'https://via.placeholder.com/150'}
                  alt={item.productName}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow text-center sm:text-left">
                <Link to={`/product/${item.productId}`} className="text-xl font-bold text-slate-900 hover:text-yellow-600 transition-colors">
                  {item.productName}
                </Link>
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">{item.productDescription}</p>
                <div className="mt-2 font-bold text-yellow-600 text-lg">
                  ${item.productPrice}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                  <span className="w-8 h-8 flex items-center justify-center font-bold text-slate-900">{item.quantity}</span>
                </div>

                <div className="text-right w-full sm:w-auto">
                  <div className="font-bold text-xl text-slate-900 mb-2">
                    ${calculateSubtotal(item)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-400 hover:text-red-600 p-2 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-medium"
                  >
                    <FaTrash /> Kaldır
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 sticky top-24">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Sipariş Özeti</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Ara Toplam</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Kargo</span>
                <span className="text-green-600 font-bold">Ücretsiz</span>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-slate-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-slate-900 font-bold text-lg">Toplam Tutar</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                  ${calculateTotal()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="group w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-slate-900/20 transform hover:-translate-y-1"
            >
              Ödemeye Geç <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-6 text-center">
              <Link to="/" className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors">
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;