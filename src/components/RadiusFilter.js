import React, { useState } from 'react';
import Fetch from './Fetch';
import { useLocation } from '../Context/LocationContext';


const RadiusFilter = ({onFilteredPlacesChange }) => {
  const [selectedRadius, setSelectedRadius] = useState('all');
  const { currentLocation, setCurrentLocation } = useLocation();

  const [places, setPlaces] = useState([]);


  // חישוב מרחק בין שני מיקומים
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // רדיוס כדור הארץ בק"מ
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // מרחק בק"מ
  };

  const handleFilterChange = (e) => {
    const radius = e.target.value;
    setSelectedRadius(radius);

    if (radius === 'all') {
      onFilteredPlacesChange(places); // הצגת כל המקומות
    } else {
      const radiusKm = parseFloat(radius);
      const filtered = places.filter((place) => {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          place.location.lat,
          place.location.lng
        );
        return distance <= radiusKm;
      });
      console.log(filtered)
      onFilteredPlacesChange(filtered); // עדכון המקומות המסוננים
    }
  };
  return (
    <div style={{ marginBottom: '10px' }}>

      <Fetch setPlaces={setPlaces} currentLocation={currentLocation} />

      <label style={{ color: 'white' }} htmlFor="radius">Filter by Radius:</label>
      <select
        id="radius"
        value={selectedRadius}
        onChange={handleFilterChange}
        style={{ marginLeft: '10px', padding: '5px' }}
      >
        <option value="all">All Distances</option>
        <option value="1">Up to 1 km</option>
        <option value="2">Up to 2 km</option>
        <option value="3">Up to 3 km</option>
      </select>
    </div>
  );
};

export default RadiusFilter;
