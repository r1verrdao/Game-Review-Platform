import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen p-8 text-cr_gray">
      <div className="border border-cr_gray p-6 relative max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-cr_green mb-4">Gamer_Dashboard</h1>
        <p className="mb-4">Welcome, <span className="text-white">{user?.email}</span></p>
        <p className="mb-8">Role: <span className="text-white uppercase">{user?.role}</span></p>
        
        <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
