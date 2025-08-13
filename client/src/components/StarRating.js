import React, { useState } from "react";
import Rating from "react-rating";
import "../style/StarRating.css";

const StarRating = ({ setRating }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (value) => {
    setSelectedRating(value); // שמירת הדירוג הנבחר
    setRating(value); // עדכון הדירוג החיצוני
  };

  return (
    <div className="star-rating">
      <Rating
        stop={5}
        initialRating={selectedRating} // הדירוג הנבחר
        emptySymbol={<span className="star empty">★</span>}
        fullSymbol={<span className="star filled">★</span>}
        onChange={handleRatingChange} // מעדכן את הדירוג
      />
    </div>
  );
};

export default StarRating;
