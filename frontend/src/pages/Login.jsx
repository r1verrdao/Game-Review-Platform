import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      const response = await axios.post('http://localhost:8000/api/login', {
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
      <div className="absolute top-6 left-6 flex items-center gap-3 font-bold text-xl tracking-widest">
        <img src={logoImg} alt="Critique.DB Logo" className="w-10 h-10 object-contain rounded-sm" />
        <div><span className="text-cr_gray">CRITIQUE.</span><span className="text-cr_green">DB</span></div>
      </div>

      <div className="absolute top-6 right-6">
        <button onClick={() => navigate('/register')} className="border border-cr_gray px-6 py-2 text-cr_gray hover:border-cr_green hover:text-cr_green transition-colors uppercase tracking-wider text-sm">
          Register
        </button>
      </div>

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

            <div className="mt-8 border-t border-dashed border-cr_gray pt-6">
              <button
                type="submit"
                className="w-full bg-[#dbe8d4] text-black font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors"
              >
                Login_Execute
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
