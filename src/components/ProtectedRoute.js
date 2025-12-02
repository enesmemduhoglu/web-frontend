import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <div>Kullanıcı bilgileri yükleniyor...</div>; 
  }

  const hasRequiredRole = user.roles && user.roles.some(role => allowedRoles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />; 
};

export default ProtectedRoute;