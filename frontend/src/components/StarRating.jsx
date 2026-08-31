import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className={`text-2xl focus:outline-none transition-colors ${
            star <= (hoverRating || rating)
              ? 'text-cr_green'
              : 'text-cr_gray/30'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
