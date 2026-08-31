import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 text-cr_gray flex items-center justify-center">
      <div className="border border-cr_gray p-8 relative max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-cr_green mb-4">Target_Acquired</h1>
        <p className="mb-4 text-white">Game ID: {id}</p>
        <p className="mb-8 text-sm uppercase tracking-wider text-cr_gray">
          Detailed data retrieval in progress...<br/>
          (Feature coming in Epic 3)
        </p>
        
        <button 
          onClick={() => navigate('/')}
          className="border border-cr_green px-6 py-2 text-cr_green hover:bg-cr_green hover:text-black uppercase tracking-wider text-sm transition-colors"
        >
          Return_to_Catalog
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
