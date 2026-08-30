import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';

import logoImg from '../assets/images/logo.jpeg';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    // Basic frontend validation
    let hasError = false;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'EMAIL ADDRESS IS REQUIRED.';
      hasError = true;
    }
    
    if (password.length < 8) {
      newErrors.password = 'PASSWORD MUST BE AT LEAST 8 CHARACTERS.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      // Assuming backend runs on localhost:8000
      const response = await axios.post('http://localhost:8000/api/register', {
        email,
        password
      });
      
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        // Handle specific error from backend (like email already registered)
        setErrors({ email: err.response.data.detail });
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
        <button className="border border-cr_gray px-6 py-2 text-cr_gray hover:border-cr_green hover:text-cr_green transition-colors uppercase tracking-wider text-sm">
          Login
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="border border-cr_gray p-8 relative">
          
          <div className="flex justify-between items-center mb-8 border-b border-cr_gray pb-4">
            <h1 className="text-2xl font-serif tracking-widest uppercase">Create_Account</h1>
            <span className="text-xs text-cr_green tracking-wider uppercase">Sys.Status: Pending</span>
          </div>

          <p className="mb-8 text-sm text-cr_gray uppercase tracking-widest">
            Initialize new user node in the network.
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email_Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="admin@critique.db"
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••"
            />

            {errors.form && (
              <p className="mb-4 text-xs text-cr_red uppercase tracking-wider">[ERR] {errors.form}</p>
            )}

            {success && (
              <p className="mb-4 text-xs text-cr_green uppercase tracking-wider">[SYS] NODE INITIALIZED SUCCESSFULLY.</p>
            )}

            <div className="mt-8 border-t border-dashed border-cr_gray pt-6">
              <button
                type="submit"
                className="w-full bg-[#dbe8d4] text-black font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors"
              >
                Register_Node
              </button>
            </div>

            <div className="mt-6 text-center">
              <a href="/login" className="text-xs text-cr_gray hover:text-cr_green uppercase tracking-widest transition-colors">
                Return to auth_sequence
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
