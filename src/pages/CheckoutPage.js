import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createPaymentIntent, finalizeOrder } from '../services/paymentService';
import { jwtDecode } from 'jwt-decode';


const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { fetchCart } = useCart(); 

  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

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
        alert('Ödemeniz başarıyla tamamlandı!');
        fetchCart(); 
        navigate('/'); 
      } catch (orderError) {
        setError('Ödeme başarılı ancak sipariş oluşturulamadı. Lütfen bizimle iletişime geçin.');
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Kart Bilgileri</h2>
      <div className="p-2 border rounded">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      
      {error && <div className="text-red-500 mt-4">{error}</div>}

      <button 
        disabled={processing || !stripe || !clientSecret}
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {processing ? 'Ödeme İşleniyor...' : 'Ödemeyi Tamamla'}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Siparişi Tamamla</h1>
      <Elements stripe={stripePromise}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default CheckoutPage;