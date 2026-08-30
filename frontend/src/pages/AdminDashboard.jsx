import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen p-8 text-cr_gray border-4 border-cr_red m-4">
      <div className="border border-cr_gray p-6 relative max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-cr_red mb-4">Admin_Terminal</h1>
        <p className="mb-4 text-white">Warning: High privilege zone.</p>
        <p className="mb-4">Admin: <span className="text-white">{user?.email}</span></p>
        
        <LogoutButton className="mt-8" />
      </div>
    </div>
  );
};

export default AdminDashboard;
