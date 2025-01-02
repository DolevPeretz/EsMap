import React, { useState, useEffect, useRef } from "react";
import AddEvent from "./AddEvents";
import FetchEvents from "./FetchEvents";
import EventPopup from "./EventPopup";
import "../style/EventsCarousel.css";
import { useLocation } from '../Context/LocationContext';

const EventsCarousel = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [placeName, setPlaceName] = useState(false);
  const [placeLocation, setPlaceLocation] = useState(false);
  const [eventss, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // שמירת האירוע שנבחר
  const { currentLocation, setCurrentLocation } = useLocation();


  // for the scrolling
  const carouselRef = useRef(null);
  const [direction, setDirection] = useState(1);

  const handleAddEventClick = () => {
    setShowAddEvent(true); // מציג את רכיב AddEvent
  };

  const handleCloseAddEvent = () => {
    setShowAddEvent(false); // מסתיר את רכיב AddEvent
  };

  //function that charge on the scroling
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          setDirection(-1);
        } else if (scrollLeft <= 0) {
          setDirection(1);
        }
        carouselRef.current.scrollBy({ left: 50 * direction, behavior: "smooth" });
      }
    }, 10);
    return () => clearInterval(interval); // ניקוי ה-interval
  }, [direction]);
  // בדיקה אם התחבר בתור בעל עסק ורק אם כן יש לו את האפשרות להוסיף אירוע חדש 
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // פענוח ה-Token
        setPlaceName(decodeURIComponent(decodedToken.placeName));
        setPlaceLocation(decodedToken.placeLocation)
        setIsUser(true)
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);


  const handleButtonClick = (event) => {
    setSelectedEvent(event); // הגדרת האירוע שנבחר
  };

  const closePopup = () => {
    setSelectedEvent(null); // סגירת החלון
  };

  return (
    <div className="events-carousel-container">
      <FetchEvents setEvents={setEvents} />
      <div className="events-carousel" ref={carouselRef}>


        {isUser && <div className="event-card add-event-card" onClick={handleAddEventClick}>
          <div className="add-event-content">
            <span className="add-event-icon">+</span>
            <p className="add-event-text">Add Event</p>
          </div>
        </div>}

        {eventss.map((event, index) => (
          <div
            className="event-card"
            key={index}
            onClick={() => handleButtonClick(event)} // הפיכת כל התמונה ללחיצה
          >
            <img
              src={`data:image/jpeg;base64,${event.image}`}
              alt={event.eventTitle}
              className="event-card-image"
            />
            <div className="event-card-overlay">
              <p>{event.eventType} - {event.eventTitle}</p>
              <p>{event.placeName} - {new Date(event.dateTime).toLocaleDateString()}</p>
            </div>
          </div>
        ))}


      </div>


      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={closePopup} /> // הצגת הפופ-אפ אם יש אירוע נבחר
      )}
      {/* מציג את רכיב AddEvent אם המשתמש לחץ על כפתור ההוספה */}
      {showAddEvent && (
        <div className="add-event-modal">
          <AddEvent placeName={placeName} placeLocation={placeLocation} handleCloseAddEvent={handleCloseAddEvent} />
          <button className="close-add-event" onClick={handleCloseAddEvent}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsCarousel;
