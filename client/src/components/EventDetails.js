import React from "react";
import "../style/EventDetails.css";




const EventDetails = ({ event  }) => {
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
        <div className="event-details-card">
            <div className="event-image-container">
                {event.image && <img
                    src={`data:image/jpeg;base64,${event.image}`}
                    alt={event.eventTitle}
                    className="event-image"
                />}
                <div className="event-title-overlay">
                    <h2>{event.eventType} - {event.eventTitle}</h2>
                </div>
            </div>
            <div className="event-details">
            
                <p className="event-date">
                    <strong>{new Date(event.dateTime).toLocaleDateString()} -  {new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>             

                </p>
               
               <button
                    className="cta-button"
                    onClick={handleShare}
                >
                    Share With Friends
                </button> 
            </div>
        </div>
    );
};

export default EventDetails;

