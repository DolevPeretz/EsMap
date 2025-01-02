import React, { useState } from 'react';
import '../style/AddReview.css';
import StarRating from './StarRating';
const AddReview = ({ onReviewSubmit, _id }) => {
    const [review, setReview] = useState({ rating: '', comment: '' });
    const [image, setImage] = useState(null); // משתנה חדש לאחסון התמונה
    const [rating, setrating] = useState(null); // משתנה חדש לאחסון התמונה

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('rating', rating ?  rating : 0);
        formData.append('comment', review.comment);
        formData.append('image', image); // הוספת התמונה ל-FormData
        onReviewSubmit(_id, formData);
        setReview({ rating: '', comment: '' });
        setImage(null);
    };
    return (
        <div className="add-review-container">
            <form onSubmit={handleSubmit} className="review-form">
                <div className="rating-container">
                    <label htmlFor="rating">Rating:</label>
                    <StarRating setRating={setrating} />
                </div>
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    placeholder="Write your comment..."
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    required
                />
                <div className="image-upload-container">
                    <label htmlFor="image-upload" className="custom-image-upload">
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded Preview"
                                className="image-preview"
                            />
                        ) : (
                            <span>Click to Upload Image</span>
                        )}
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="image-input"
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
