import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8 text-cr_gray border-4 border-cr_red m-4">
      <div className="border border-cr_gray p-6 relative max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-cr_red mb-4">Admin_Terminal</h1>
        <p className="mb-4 text-white">Warning: High privilege zone.</p>
        <p className="mb-4">Admin: <span className="text-white">{user?.email}</span></p>
        
        <button 
          onClick={handleLogout}
          className="border border-cr_red px-4 py-2 text-cr_red hover:bg-cr_red hover:text-black uppercase tracking-wider text-sm transition-colors mt-8"
        >
          Logout_Sequence
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
