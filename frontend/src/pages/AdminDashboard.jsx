import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';
import GameForm from '../components/GameForm';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen p-8 text-cr_gray border-4 border-cr_red m-4">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-cr_red mb-2">Admin_Terminal</h1>
          <p className="text-white text-sm">Warning: High privilege zone.</p>
          <p className="text-sm">Admin: <span className="text-white">{user?.email}</span></p>
        </div>
        <LogoutButton />
      </div>

      <div className="max-w-2xl">
        <GameForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
