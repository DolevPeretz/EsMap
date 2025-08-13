import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from '../Context/LocationContext';

const FetchEvents = ({ setEvents }) => {
  const [loading, setLoading] = useState(true); // מציין טעינה
  const [error, setError] = useState(null); // מציין שגיאה
  const { currentLocation, setCurrentLocation } = useLocation();

  // פונקציה לחישוב המרחק בין שתי נקודות
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // רדיוס כדור הארץ בקילומטרים
    const toRad = (value) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // המרחק בקילומטרים
  };

  // פונקציה לסינון אירועים על בסיס מרחק ומיקום נוכחי
  const filterByProximity = (events, radius = 5) => {
    if (!currentLocation || !events) return [];
    return events.filter((event) => {
      const { lat, lng } = event.placeLocation;
      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        lat,
        lng
      );
      return distance <= radius; // מחזיר רק את האירועים בטווח
    });
  };

  // קריאה לאירועים וסינון לפי קרבה
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/user/events");
        const filteredEvents = filterByProximity(response.data);
        setEvents(filteredEvents); // שומר את האירועים המסוננים
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentLocation, setEvents]); // מאזין לשינוי במיקום הנוכחי

  // מציג הודעה בזמן טעינה
  if (loading) {
    return <div>Loading...</div>;
  }

  // מציג הודעה אם יש שגיאה
  if (error) {
    return <div>{error}</div>;
  }

  return null; // אין צורך להציג רכיב, המידע יוזן ל-`setEvents`
};

export default FetchEvents;
