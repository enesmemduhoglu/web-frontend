import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { addToCart as addToCartApi, getCartByUserId, removeFromCart as removeFromCartApi } from '../services/cartService';
import { jwtDecode } from 'jwt-decode';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const { token } = useAuth();

  const getUserIdFromToken = useCallback(() => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }, [token]);

  const fetchCart = useCallback(async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setCartItems([]);
      return;
    }
    try {
      const response = await getCartByUserId(userId);
      setCartItems(response.data);
    } catch (error) {
      console.error("Sepet alınırken hata:", error);
      setCartItems([]);
    }
  }, [getUserIdFromToken]);

  const addToCart = async (productId, quantity = 1) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Lütfen önce giriş yapın.");
      return;
    }

    try {
      await addToCartApi(productId, userId, quantity);

      const response = await getCartByUserId(userId);
      const newCartItems = response.data;

      // Check if quantity increased
      const oldItem = cartItems.find(i => i.productId === productId);
      const oldQty = oldItem ? oldItem.quantity : 0;

      const newItem = newCartItems.find(i => i.productId === productId);
      const newQty = newItem ? newItem.quantity : 0;

      setCartItems(newCartItems); // Update state directly

      if (newQty > oldQty) {
        const addedAmount = newQty - oldQty;
        if (addedAmount < quantity) {
          // console.log(`Sepet limiti nedeniyle sadece ${addedAmount} adet ürün eklendi.`);
        } else {
          // console.log("Ürün sepete eklendi!");
        }
      } else {
        console.error("Ürün sepete eklenemedi. Sepetinizdeki maksimum ürün adedine ulaşmış olabilirsiniz.");
      }
    } catch (error) {
      console.error("Sepete eklenirken hata oluştu:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      await removeFromCartApi(userId, productId);
      fetchCart();
    } catch (error) {
      console.error("Sepetten silinirken hata:", error);
      alert("Ürün sepetten silinemedi.");
    }
  };

  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(totalItems);
  }, [cartItems]);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [token, fetchCart]);

  const value = { cartItems, itemCount, addToCart, fetchCart, removeFromCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};