import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, error, placeholder }) => {
  return (
    <div className="flex flex-col mb-6">
      {label && <label className="mb-2 text-sm uppercase tracking-wider text-cr_gray">{label}</label>}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-cr_bg border p-3 text-cr_gray outline-none focus:border-cr_green transition-colors font-mono
            ${error ? 'border-cr_red text-cr_red' : 'border-gray-700'}
          `}
        />
        {error && (
          <div className="absolute right-3 top-3 text-cr_red">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-cr_red uppercase tracking-wider">[ERR] {error}</p>}
    </div>
  );
};

export default InputField;
