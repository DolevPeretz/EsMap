import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchPlaceDetails = ({ placeId ,handleDetails }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!placeId) {
        setError('No Place ID provided');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8010/proxy/maps/api/place/details/json', {
          params: {
            place_id: placeId,
            fields: 'name,formatted_phone_number,opening_hours,website',
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        });
        if (response.data.status !== "OK") {
          throw new Error(response.data);
        }
        handleDetails(response.data.result); // שמירת פרטי המקום
        setError(null);
      } catch (err) {
        console.error('Error fetching place details:', err);
        setError('Failed to fetch place details');
        handleDetails(null);
      }
    };

    fetchDetails();
  }, [placeId]);

  if (!placeId) return null;

  return (
  <div></div>
  );
};

export default FetchPlaceDetails;
