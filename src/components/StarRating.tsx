import { useState } from "react";

export default function StarRating({ onRatingChange, rating }) {
  //   const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    // setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? "gold" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer transition-colors duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.348h6.708c.969 0 1.371 1.24.588 1.81l-5.428 3.941 2.062 6.349c.3.921-.755 1.688-1.54 1.118l-5.428-3.942-5.428 3.942c-.784.57-1.838-.197-1.539-1.118l2.062-6.349-5.428-3.94c-.783-.57-.38-1.81.588-1.81h6.708l2.062-6.348z"
          />
        </svg>
      ))}
    </div>
  );
}
