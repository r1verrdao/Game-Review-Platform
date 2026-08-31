import React from 'react';

const ReviewItem = ({ review }) => {
  return (
    <div className="border border-cr_gray p-4 mb-4">
      <div className="text-xs text-cr_green mb-2 flex justify-between">
        <span>NODE_USER: {review.user_id}</span>
        <span className="border border-cr_green px-1">{review.rating}.0/5</span>
      </div>
      <p className="text-sm whitespace-pre-wrap">{review.content}</p>
      <div className="text-[10px] text-cr_gray mt-2 pt-2 border-t border-cr_gray/30 text-right uppercase">
        LOG_DATE: {new Date(review.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default ReviewItem;
