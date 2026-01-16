import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AddressSelection from '../components/checkout/AddressSelection';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createPaymentIntent, finalizeOrder } from '../services/paymentService';
import { jwtDecode } from 'jwt-decode';
import {
  FaLock, FaShieldAlt, FaCreditCard,
  FaCheckCircle, FaShoppingBag
} from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, fetchCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.productPrice), 0).toFixed(2);
  };

  const getUserIdFromToken = useCallback(() => {
    if (!token) return null;
    try {
      return jwtDecode(token).user_id;
    } catch (e) {
      return null;
    }
  }, [token]);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      const createIntent = async () => {
        try {
          const response = await createPaymentIntent(userId);
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error("Ödeme niyeti oluşturulamadı:", error);
          setError("Ödeme sistemi şu anda kullanılamıyor.");
        }
      };
      createIntent();
    }
  }, [getUserIdFromToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    if (!selectedAddressId) {
      setError('Lütfen bir teslimat adresi seçin.');
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      const userId = getUserIdFromToken();
      try {
        await finalizeOrder(userId, paymentIntent.id, selectedAddressId);
        fetchCart();
        navigate('/orders');
      } catch (err) {
        setError("Sipariş oluşturulurken bir hata oluştu: " + err.message);
        setProcessing(false);
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#334155',
        fontFamily: 'Inter, sans-serif',
        '::placeholder': { color: '#94a3b8' },
      },
      invalid: { color: '#ef4444' },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Order Summary (Mobile Friendly) */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FaShoppingBag className="text-yellow-500" /> Sepet Özeti
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.map((item, index) => (
            <div key={item.id || item.productId || index} className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0">
              <div>
                <span className="font-bold text-slate-700 text-sm block">{item.productName}</span>
                <span className="text-xs text-slate-500">Adet: {item.quantity}</span>
              </div>
              <span className="font-bold text-slate-900 text-sm">${(item.quantity * item.productPrice).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-slate-600 font-bold">Toplam Tutar</span>
          <span className="text-2xl font-black text-yellow-500">${calculateTotal()}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm ring-1 ring-slate-100">
        <AddressSelection
          onSelect={setSelectedAddressId}
          selectedAddressId={selectedAddressId}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <FaCreditCard className="text-slate-400" /> Kart Bilgileri
          </label>
          <div className="flex gap-1">
            <div className="h-4 w-6 bg-slate-200 rounded"></div>
            <div className="h-4 w-6 bg-slate-200 rounded"></div>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-2">
          <FaShieldAlt className="mt-1 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={processing || !stripe || !clientSecret}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-slate-900 shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${processing || !stripe ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300'
          }`}
      >
        {processing ? (
          <>
            <LoadingSpinner size="small" color="border-slate-800" /> İşleniyor...
          </>
        ) : (
          <>
            <FaLock size={14} /> Güvenli Öde
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <FaShieldAlt />
        <span>256-bit SSL ile şifreli ödeme</span>
      </div>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Branding & Trust */}
          <div className="hidden lg:block space-y-8 sticky top-12">
            <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              {/* Abstract Shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

              <h1 className="text-4xl font-black mb-6 relative z-10">Siparişi Tamamla</h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 relative z-10">
                LuxeMarket'i tercih ettiğiniz için teşekkür ederiz. Siparişiniz özenle hazırlanıp en kısa sürede adresinize teslim edilecektir.
              </p>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="font-bold">Ücretsiz Kargo</h4>
                    <p className="text-xs text-slate-400">Tüm siparişlerde ücretsiz teslimat</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h4 className="font-bold">Güvenli Ödeme</h4>
                    <p className="text-xs text-slate-400">End-to-end şifreleme teknolojisi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-100">
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-black text-slate-900">Ödeme</h1>
              <p className="text-slate-500 text-sm">Güvenli ödeme adımı</p>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;