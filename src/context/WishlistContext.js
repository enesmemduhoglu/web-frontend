import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/wishlistService';
import { jwtDecode } from 'jwt-decode';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token } = useAuth();

  const getUserIdFromToken = useCallback(() => {
    if (!token) return null;
    try {
      return jwtDecode(token).user_id;
    } catch (e) {
      return null;
    }
  }, [token]);

  const fetchWishlist = useCallback(async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setWishlistItems([]);
      return;
    }
    try {
      const response = await getWishlist(userId);
      setWishlistItems(response.data);
    } catch (error) {
      console.error("İstek listesi alınırken hata:", error);
      setWishlistItems([]);
    }
  }, [getUserIdFromToken]);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [token, fetchWishlist]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const addOrRemoveFromWishlist = async (productId) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Lütfen önce giriş yapın.");
      return;
    }

    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(userId, productId);
      } else {
        await addToWishlist(userId, productId);
      }
      fetchWishlist();
    } catch (error) {
      console.error("İstek listesi güncellenirken hata:", error);
      alert("İşlem sırasında bir hata oluştu.");
    }
  };

  const value = { wishlistItems, addOrRemoveFromWishlist, isInWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};