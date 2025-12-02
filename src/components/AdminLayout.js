import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;