import React from 'react';
import '../style/ReviewsList.css';

const getRatingColor = (rating) => {
    switch (rating) {
        case 5:
            return '#2ecc71'; // ירוק
        case 4:
            return '#27ae60'; // ירוק כהה
        case 3:
            return '#f1c40f'; // צהוב
        case 2:
            return '#e67e22'; // כתום
        case 1:
            return '#e74c3c'; // אדום
        default:
            return '#333333'; // צבע ברירת מחדל
    }
};

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + (Number(review.rating) || 0), 0); // ודא שכל דירוג הוא מספר
    return (total / reviews.length).toFixed(1);
};

const ReviewsList = ({ reviews }) => {
    const averageRating = calculateAverageRating(reviews);

    return (
        <div className="reviews-container">
            <div className="average-rating">
                <h3>Average Rating: {averageRating}</h3>
            </div>
            {reviews && reviews.length > 0 ? (
                [...reviews].reverse().map((review) => (

                    <div key={review._id} className="review-item">
                        <div className="review-timestamp">
                            <h4>{formatTime(review.timestamp)} - {formatDate(review.timestamp)}</h4>
                        </div>
                        <p
                            className="review-rating"
                            style={{ color: getRatingColor(review.rating) }}
                        >
                            דירוג: {review.rating}
                        </p>
                        <p className="review-comment">תגובה: {review.comment}</p>
                        {review.imageData && (
                            <img
                                src={`data:image/jpeg;base64,${review.imageData}`}
                                alt="Review Image"
                                className="review-image"
                                style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                            />
                        )}

                    </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default ReviewsList;
