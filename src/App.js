import Map from "./components/Map";
import React, { useState, useEffect } from 'react';
import Fetch from "./components/Fetch";
import FetchApi from "./components/FetchApi";

import WelcomeOptionsModal from "./components/WelcomeOptionsModal";
import AdminDashboard from "./components/AdminDashboard";
import EventsCarousel from "./components/EventsCarousel";
import { useLocation } from './Context/LocationContext';



import { AddEvent2 } from "./components/AddEvent2";
import { VerifyBusinessForm2 } from "./components/VerifyBusinessForm2";
function App() {
  const [places, setPlaces] = useState([]);
  const { currentLocation, setCurrentLocation } = useLocation();
  const [isAdmin, setIsAdmin] = useState(false); // מצב עבור אדמין





  useEffect(() => {
    // בדיקה אם המשתמש הוא אדמין
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // פענוח ה-Token
        if (decodedToken.role === 'admin') {
          setIsAdmin(true); // המשתמש הוא אדמין

        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);



  return (
    <div className="App">
      <VerifyBusinessForm2 />
    </div>
  )
}
export default App;

