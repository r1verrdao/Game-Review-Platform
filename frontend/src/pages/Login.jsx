import React, { useState, useContext } from 'react';
// import axios from 'axios';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import logoImg from '../assets/images/logo.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await api.post('/login', {
        email,
        password
      });
      
      if (response.status === 200) {
        // Save token to context
        login(response.data.access_token);
        // Let ProtectedRoute handle where they go, but we can default navigate to root
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setErrors({ form: err.response.data.detail });
      } else {
        setErrors({ form: 'AN UNKNOWN SYSTEM ERROR OCCURRED.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* Header Logo */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-3 font-bold text-xl tracking-widest group">
        <div className="w-10 h-10 bg-cr_green flex items-center justify-center rounded-sm">
          <img src={logoImg} alt="Critique.DB Logo" className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="group-hover:text-cr_green transition-colors"><span className="text-cr_gray group-hover:text-cr_green transition-colors">CRITIQUE.</span><span className="text-cr_green">DB</span></div>
      </Link>


      <div className="w-full max-w-md">
        <div className="border border-cr_gray p-8 relative">
          
          <div className="flex justify-between items-center mb-8 border-b border-cr_gray pb-4">
            <h1 className="text-2xl font-serif tracking-widest uppercase">Auth_Sequence</h1>
            <span className="text-xs text-cr_green tracking-wider uppercase">Sys.Status: Awaiting</span>
          </div>

          <p className="mb-8 text-sm text-cr_gray uppercase tracking-widest">
            Authenticate to access network resources.
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email_Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="admin@critique.db"
              required={true}
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••"
              required={true}
            />

            {errors.form && (
              <p className="mb-4 text-xs text-cr_red uppercase tracking-wider">[ERR] {errors.form}</p>
            )}

            <div className="mt-8 border-t border-dashed border-cr_gray pt-6 text-center">
              <button
                type="submit"
                className="w-full bg-[#dbe8d4] text-black font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors mb-6"
              >
                Login_Execute
              </button>
              
              <p className="text-xs uppercase tracking-widest text-cr_gray">
                Do not have an account?{' '}
                <span 
                  onClick={() => navigate('/register')} 
                  className="text-cr_green hover:text-white cursor-pointer transition-colors"
                >
                  Create an account
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
