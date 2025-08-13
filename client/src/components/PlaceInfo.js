import React, { useState, useEffect } from 'react';
import '../style/PlaceInfo.css';
import AddReview from './AddReview';
import ReviewsList from './ReviewsList';
import VerifyBusinessForm from './VerifyBusinessForm';
import FetchPlaceDetails from './FetchPlaceDetails';
import FetchEvent from './FetchEvent';
import EventDetails from './EventDetails';
import { useLocation } from '../Context/LocationContext';

const PlaceInfo = ({ selectedPlace, onReviewSubmit, nameOfPlaces }) => {
    const { name, type, rating, photo, reviews, _id, location, placeId, verify } = selectedPlace;
    const [placeDetails, setPlaceDetails] = useState(null); // שמירת נתוני המקום
    const [showOpeningHours, setShowOpeningHours] = useState(false); // ניהול תצוגת שעות הפעילות
    const [showVerifyModal, setShowVerifyModal] = useState(false); // ניהול תצוגת טופס אימות
    const { currentLocation, setCurrentLocation } = useLocation();



    const [event, setEvent] = useState(null);

  useEffect(() => {
    if(!nameOfPlaces.includes(name)){
        setEvent(null)
    }

  }, [name]);


    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // רדיוס כדור הארץ בקילומטרים
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const calculateWalkingTime = (distanceKm) => {
        const walkingSpeedKmPerMin = 5 / 60; // מהירות הליכה ממוצעת בקמ"ש מחולקת ל-60 כדי לקבל ק"מ לדקה
        const walkingTimeInMinutes = distanceKm / walkingSpeedKmPerMin;
        return Math.round(walkingTimeInMinutes);
    };

    const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        location.lat,
        location.lng
    );

    const handleWalkingClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${location.lat},${location.lng}&travelmode=walking`;
        window.open(googleMapsUrl, '_blank');
    };

    const toggleOpeningHours = () => {
        setShowOpeningHours(!showOpeningHours); // לשנות את המצב של שעות הפעילות
    };

    return (

        <div>

            {nameOfPlaces.includes(name) && <FetchEvent placeName={name} setEvent={setEvent} />}

            <div className="place-info-container">

                {/*משיכה של אירוע רק אם קיים במערך של הרשימת אירועים*/}
                <h2 className="place-info-title">{name}</h2>

                {placeDetails &&
                    <div className="right-buttons-container">
                        {placeDetails.formatted_phone_number && (
                            <a
                                href={`tel:${placeDetails.formatted_phone_number}`}
                                className="phone-button"
                            >
                                {placeDetails.formatted_phone_number}
                            </a>
                        )}
                        {placeDetails.website && (
                            <a
                                href={placeDetails.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="website-button"
                            >
                                Website
                            </a>
                        )}
                    </div>
                }

                <div className="lef-details">
                    <p><strong>Primary Type:</strong> {type}</p>
                    <p><strong>Rating:</strong> {rating}</p>
                    <p><strong>Distance from current location:</strong> {distance.toFixed(2)} km</p>

                    {placeDetails && (
                        <div className="additional-details">
                            {placeDetails.opening_hours ? (
                                <>
                                    <button onClick={toggleOpeningHours} className="custom-button">
                                        {showOpeningHours ? 'Hide Opening Hours' : 'Show Opening Hours'}
                                    </button>
                                    {showOpeningHours && (
                                        <ul>
                                            {placeDetails.opening_hours.weekday_text.map((day, index) => (
                                                <li key={index}>{day}</li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <p>Not Available</p>
                            )}
                        </div>
                    )}
                    <div className="custom-button" onClick={handleWalkingClick}>
                        <img src="https://img.icons8.com/ios-filled/50/000000/walking.png" alt="walking icon" className="walking-icon" />
                        <span>Estimated walking time: {calculateWalkingTime(distance)} minutes</span>
                    </div>
                </div>
                {photo && <img src={photo} alt={name} className="place-info-photo" />}

                {!verify && <button className="verify-button" onClick={() => setShowVerifyModal(true)}>
                    Verify This Business
                </button>}

                {event && <EventDetails event={event} />}

                {showVerifyModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <VerifyBusinessForm
                                placeName={name}
                                placeId={placeId}
                                onClose={() => setShowVerifyModal(false)}
                                placeLocation={location}
                            />
                        </div>
                    </div>
                )}

                <div className="review-section">
                    <AddReview onReviewSubmit={onReviewSubmit} _id={_id} />
                    <ReviewsList reviews={reviews} />
                </div>
                <FetchPlaceDetails placeId={placeId} handleDetails={(details) => setPlaceDetails(details)} />
            </div>
        </div>

    );
};

export default PlaceInfo;
