import React, { useState, useEffect } from "react";
import '../style/TopRatedPlaces.css';
import { useLocation } from '../Context/LocationContext';

// add window of the top rated location near by 5 km to the current location
const TopRatedPlaces = ({ places,setSelectedPlace  }) => {

  const { currentLocation, setCurrentLocation } = useLocation();

  const handleSelectedPlace = (Place) => {
    setSelectedPlace(Place)
  }
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // פונקציה לחישוב מרחק בין שני מיקומים
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // רדיוס כדור הארץ בקילומטרים
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // מחזיר את המרחק בקילומטרים
  };

  useEffect(() => {
    // סינון מקומות ברדיוס של 5 ק"מ ודירוג 4 ומעלה
    const filtered = places.filter((place) => {
      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        place.location.lat,
        place.location.lng
      );
      return distance <= 5 && place.rating >= 4; // רק מקומות עד 5 ק"מ ודירוג 4+
    });

    setFilteredPlaces(filtered);
  }, [places, currentLocation]);

  return (
    <div className="top-rated-container">
      <h2 className="top-rated-title">Top Rated Places</h2>
      <div className="places-list">
        {filteredPlaces.map((place) => (
          <div key={place._id} 
          className="place-card"
          onClick={() => handleSelectedPlace(place)} // קריאה לפונקציה שמעדכנת את המקום הנבחר
          >
            <img src={place.photo || 'https://via.placeholder.com/150'} alt={place.name} className="place-image" />
            <div className="place-details">
              <h3 className="place-name">{place.name}</h3>
              <p className="place-type">{place.type}</p>
              <p className="place-rating">Rating: {place.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedPlaces;
