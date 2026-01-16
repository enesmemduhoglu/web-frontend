import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PreventAdminAccess = () => {
  const { user } = useAuth();

  if (user && user.roles && user.roles.includes('ADMIN')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default PreventAdminAccess;