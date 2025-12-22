import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createPaymentIntent, finalizeOrder } from '../services/paymentService';
import { jwtDecode } from 'jwt-decode';
import { FaLock, FaCreditCard, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';


const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { fetchCart, cartItems } = useCart();

  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

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
      createPaymentIntent(userId)
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          setError('Ödeme başlatılamadı. Lütfen sepetinizi kontrol edin.');
          console.error(err);
        });
    }
  }, [getUserIdFromToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      const userId = getUserIdFromToken();
      try {
        await finalizeOrder(userId, paymentIntent.id);
        // alert('Ödemeniz başarıyla tamamlandı!'); // Removed alert for better UX
        fetchCart();
        navigate('/orders'); // Redirect to order history instead of home
      } catch (orderError) {
        setError('Ödeme başarılı ancak sipariş oluşturulamadı. Lütfen bizimle iletişime geçin.');
        setProcessing(false);
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#1e293b",
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#94a3b8"
        }
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Total Amount Badge */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-center justify-between mb-8">
        <span className="text-yellow-600 font-bold">Ödenecek Tutar</span>
        <span className="text-2xl font-black text-yellow-500">${calculateTotal()}</span>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
          <FaCreditCard className="text-slate-400" /> Kart Bilgileri
        </label>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      )}

      <button
        disabled={processing || !stripe || !clientSecret}
        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <LoadingSpinner size="small" color="border-white" /> İşleniyor...
          </>
        ) : (
          <>
            <FaLock size={14} /> Güvenli Öde
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
        <FaShieldAlt />
        <span>256-bit SSL ile güvenli ödeme altyapısı</span>
      </div>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Left Column: Context/Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
              <h1 className="text-3xl font-black mb-4">Siparişi Tamamla</h1>
              <p className="text-yellow-50 font-medium text-lg leading-relaxed">
                LuxeMarket ayrıcalığıyla alışverişinizi güvenle tamamlayın. Siparişiniz özenle hazırlanıp en kısa sürede kargoya verilecektir.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <FaCheckCircle className="text-white" />
                  <span className="font-bold">Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <FaCheckCircle className="text-white" />
                  <span className="font-bold">Güvenli Ödeme</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50">
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