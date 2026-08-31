import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import StarRating from '../components/StarRating';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get(`/games/${id}`);
        setGame(response.data);
      } catch (err) {
        setError('Failed to fetch game details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cr_bg text-cr_green flex items-center justify-center font-mono">
        LOADING DATA...
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-cr_bg text-cr_red flex flex-col items-center justify-center font-mono p-8">
        <p className="mb-4">{error || 'GAME NOT FOUND.'}</p>
        <button onClick={() => navigate('/')} className="border border-cr_red px-4 py-2 hover:bg-cr_red hover:text-black">
          RETURN
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cr_bg text-cr_gray font-mono relative overflow-hidden flex flex-col">
      {/* Background Image with Overlay */}
      {game.cover_asset && (
        <div 
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{ 
            backgroundImage: `url(${game.cover_asset})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'right top',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black)'
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-12 flex-grow">
        {/* Top Section: Game Details */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif text-cr_green mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              {game.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-10 text-xs tracking-widest font-bold">
              {game.genre.split(' ').map((g, idx) => (
                <span key={idx} className="bg-cr_green text-black px-2 py-1">{g}</span>
              ))}
            </div>

            <div className="border-t border-cr_green pt-4">
              <div className="text-xs text-cr_green mb-4 tracking-widest">
                SYS.DATA // SYNOPSIS <br/>
                DEV: {game.developer || 'UNKNOWN'} | REL_DATE: {game.release_date || 'UNKNOWN'}
              </div>
              <p className="text-sm leading-relaxed border-l-2 border-cr_green pl-4">
                {game.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto border-t border-cr_green pt-8">
          
          {/* User Reviews Panel */}
          <div className="border border-cr_gray p-6 relative bg-cr_bg/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-cr_gray pb-2 flex justify-between">
              <span>USER_REVIEWS.LOG</span>
              <span className="text-xs font-normal text-cr_gray mt-2">ENTRIES: 02</span>
            </h2>

            <div className="space-y-4 mb-8">
              <div className="border border-cr_gray p-4">
                <div className="text-xs text-cr_green mb-2 flex justify-between">
                  <span>NODE_USER: TARNISHED_99</span>
                  <span className="border border-cr_green px-1">4.5/5</span>
                </div>
                <p className="text-sm">"Masterpiece of world design."</p>
              </div>
              <div className="border border-cr_gray p-4">
                <div className="text-xs text-cr_green mb-2 flex justify-between">
                  <span>NODE_USER: MAIDENLESS_1</span>
                  <span className="border border-cr_green px-1">5.0/5</span>
                </div>
                <p className="text-sm">"Strictly required for fans of the genre."</p>
              </div>
            </div>

            <button 
              onClick={() => setShowReviewModal(true)}
              className="w-full border border-cr_green text-cr_green py-3 uppercase tracking-widest hover:bg-cr_green hover:text-black transition-colors font-bold"
            >
              [ INITIATE_REVIEW_SEQUENCE ] →
            </button>
          </div>

          {/* Hardware Notes Panel */}
          <div className="border border-cr_gray p-6 relative bg-cr_bg/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-cr_gray pb-2">
              HARDWARE_NOTES.LOG
            </h2>
            <div className="border border-cr_gray p-4 text-sm whitespace-pre-wrap leading-relaxed min-h-[180px]">
              {game.hardware_notes || '> NO HARDWARE DATA FOUND.'}
            </div>
            
            <button className="w-full bg-cr_green text-black py-3 mt-6 uppercase tracking-widest hover:bg-white transition-colors font-bold flex justify-center items-center gap-2">
              APPLY_PROFILE ⚙
            </button>
          </div>

        </div>
      </div>

      {/* Review Modal Placeholder */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="border border-cr_green bg-cr_bg p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-cr_gray hover:text-cr_red"
            >
              [X]
            </button>
            <h3 className="text-xl font-bold text-cr_green mb-6 border-b border-cr_green pb-2">SUBMIT_RATING</h3>
            
            <div className="mb-8">
              <p className="text-sm text-cr_gray mb-4">Select your overall impression:</p>
              <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
              {selectedRating > 0 && (
                <p className="text-cr_green mt-2 text-xs">RATING_SELECTED: {selectedRating}/5</p>
              )}
            </div>

            <button 
              className={`w-full py-2 uppercase tracking-widest font-bold border transition-colors ${
                selectedRating > 0 
                  ? 'border-cr_green text-cr_green hover:bg-cr_green hover:text-black' 
                  : 'border-cr_gray/30 text-cr_gray/30 cursor-not-allowed'
              }`}
              disabled={selectedRating === 0}
              onClick={() => {
                if (selectedRating > 0) {
                  alert(`Rating ${selectedRating} logged. (API submission in Story 10)`);
                  setShowReviewModal(false);
                  setSelectedRating(0);
                }
              }}
            >
              [ CONFIRM_RATING ]
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default GameDetails;
