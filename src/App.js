import Map from "./components/Map";
import React, { useState, useEffect } from 'react';
import Fetch from "./components/Fetch";
import FetchApi from "./components/FetchApi";
import { useJsApiLoader } from '@react-google-maps/api';
import { libraries } from './components/libraries';
import WelcomeOptionsModal from "./components/WelcomeOptionsModal";
import AdminDashboard from "./components/AdminDashboard";

import EventsCarousel from "./components/EventsCarousel";


function App() {
  const [places, setPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // מצב עבור אדמין

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (isLoaded) {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({

              lat: 31.25181,
              lng: 34.7913,
              // lat: position.coords.latitude,
              // lng: position.coords.longitude,
            });
          },
          (error) => console.error("שגיאה בקבלת מיקום המשתמש:", error)
        );
      }

    }
  }, [isLoaded]);

 
  useEffect(() => {
    // בדיקה אם המשתמש הוא אדמין
    const token = localStorage.getItem('token');
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
      {/* <AdminDashboard /> */}
      <EventsCarousel  currentLocation={currentLocation}/>
      <WelcomeOptionsModal />
      {currentLocation && (<Fetch setPlaces={setPlaces} currentLocation={currentLocation} />)}
      {/* <FetchApi setPlaces={setPlaces} currentLocation ={currentLocation}/> */}
      {places && currentLocation && (
        <Map
          currentLocation={currentLocation}
          places={places}
          setPlaces={setPlaces}
        />
      )}
    </div>
  )
}
export default App;