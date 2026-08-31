import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-cr_green font-mono uppercase tracking-widest bg-cr_bg">Sys.Status: Authenticating...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If logged in but wrong role, route them to their default page
    if (user.role === 'Admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-cr_bg flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
