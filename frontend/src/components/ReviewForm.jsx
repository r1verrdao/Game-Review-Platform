import React, { useState } from 'react';
import StarRating from './StarRating';
import api from '../api';

const ReviewForm = ({ gameId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!content.trim()) {
      setError('Please write a review.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await api.post('/reviews/', {
        game_id: gameId,
        rating: rating,
        content: content.trim()
      });
      onSuccess(); // Triggers the toast/refresh and closes modal
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to submit review. Ensure you are logged in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="border border-cr_green bg-cr_bg p-8 max-w-lg w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-cr_gray hover:text-cr_red"
        >
          [X]
        </button>
        <h3 className="text-xl font-bold text-cr_green mb-6 border-b border-cr_green pb-2">SUBMIT_RATING_&_REVIEW</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-sm text-cr_gray mb-2">1. Select your overall impression:</p>
            <StarRating rating={rating} onRatingChange={setRating} />
            {rating > 0 && (
              <p className="text-cr_green mt-2 text-xs">RATING_SELECTED: {rating}/5</p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-cr_gray mb-2">2. Write your review:</p>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-cr_bg border border-cr_gray text-cr_gray p-3 h-32 focus:outline-none focus:border-cr_green font-mono text-sm"
              placeholder="Enter your detailed gameplay experience..."
            />
          </div>

          {error && <p className="text-cr_red mb-4 text-sm">{error}</p>}

          <button 
            type="submit"
            className={`w-full py-3 uppercase tracking-widest font-bold border transition-colors ${
              (rating > 0 && content.trim())
                ? 'border-cr_green text-cr_green hover:bg-cr_green hover:text-black' 
                : 'border-cr_gray/30 text-cr_gray/30 cursor-not-allowed'
            }`}
            disabled={rating === 0 || !content.trim() || isSubmitting}
          >
            {isSubmitting ? 'SUBMITTING...' : '[ CONFIRM_REVIEW ]'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
