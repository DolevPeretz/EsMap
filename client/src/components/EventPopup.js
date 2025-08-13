import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/EventPopup.css";
import sahre from '../assets/images/share.png';
import pin from '../assets/images/pin.png';
import calendar from '../assets/images/calendar.png';

const EventPopup = ({ event, onClose }) => {
  const [placeDetails, setPlaceDetails] = useState(null);

  const fetchPlaceById = async (placeName) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/places/${placeName}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching place details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const data = await fetchPlaceById(event.placeName);
        setPlaceDetails(data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [event.placeName]);

  if (!event) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.eventTitle,
          text: `Check out this event: ${event.eventTitle} at ${event.placeName}`,
          url: window.location.href, // ה-URL הנוכחי של הדף
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close-button" onClick={onClose}>
          X
        </button>
        <div className="popup-image-container" onClick={handleShare}>
          <img
            src={`data:image/jpeg;base64,${event.image}`}
            alt={event.eventTitle}
            className="popup-image"
          />
          <div className="popup-share-overlay">
            Share With Friends
            <img
              src={sahre}
              alt="Share Icon"
              className="popup-share-icon"
            />
          </div>
        </div>
        <div className="popup-content">
          <h2 className="popup-title">{event.eventType} - {event.eventTitle}</h2>


          <p className="popup-description">{event.eventDescription}</p>
          <p className="popup-detail">
            <span className="popup-icon">
              <img src={calendar} alt="Date and Time Icon" />
            </span>
            {new Date(event.dateTime).toLocaleDateString()} at {new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

          <div className="popup-info">
            <p className="popup-detail">
              <span className="popup-icon">
                <img src={pin} alt="Location Icon" />
              </span>
              {event.placeName}  {event.eventAddress}
            </p>
            <a href="tel:+1234567890" className="popup-phone-button">
              Call  📞
            </a>
          </div>
        </div>


        <div className="popup-details">

        </div>
      </div>
    </div>
  );
};

export default EventPopup;
