import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = "" }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className={`border border-cr_red px-4 py-2 text-cr_red hover:bg-cr_red hover:text-black uppercase tracking-wider text-sm transition-colors ${className}`}
    >
      Logout_Sequence
    </button>
  );
};

export default LogoutButton;
