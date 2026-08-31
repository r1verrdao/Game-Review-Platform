import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.jpeg';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full border-b border-cr_gray bg-cr_bg text-cr_gray font-mono h-16 flex items-center px-6 justify-between sticky top-0 z-50">
      
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0 group">
        <div className="w-8 h-8 bg-cr_green flex items-center justify-center">
          <img src={logoImg} alt="CRITIQUE.DB Logo" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="font-serif font-bold text-xl tracking-widest text-white group-hover:text-cr_green transition-colors">
          CRITIQUE.DB
        </div>
      </Link>

      {/* Middle: Search */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-cr_gray">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="SEARCH_DATABASE..." 
            className="w-full bg-transparent border border-cr_gray py-1.5 pl-10 pr-4 text-xs tracking-widest text-white outline-none focus:border-cr_green transition-colors"
          />
        </div>
      </div>

      {/* Right: Links & Auth */}
      <div className="flex items-center gap-8 shrink-0 text-xs tracking-widest uppercase">
        <Link to="/" className="hover:text-cr_green transition-colors text-cr_green">Games</Link>
        <Link to="/" className="hover:text-cr_green transition-colors">Reviews</Link>
        <Link to="/" className="hover:text-cr_green transition-colors">Hardware</Link>
        
        <div className="flex items-center gap-4 ml-4">
          {!user ? (
            <button onClick={() => navigate('/login')} className="border border-cr_gray px-6 py-1.5 hover:border-cr_green hover:text-cr_green transition-colors bg-white text-black font-bold">
              Login
            </button>
          ) : (
            <>
              {user.role === 'Admin' && (
                <Link to="/admin" className="text-cr_red hover:text-white transition-colors">Admin_Terminal</Link>
              )}
              <button onClick={handleLogout} className="hover:text-cr_red transition-colors mr-2">Logout</button>
              <div className="w-8 h-8 rounded-full bg-cr_green flex items-center justify-center text-black font-bold cursor-pointer hover:bg-white transition-colors" title={user.email || 'User'}>
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
