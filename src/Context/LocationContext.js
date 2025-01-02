import { createContext, useContext, useState,useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const LocationContext = createContext();
const libraries = ['places'];

export const LocationProvider = ({ children }) => {

    const [currentLocation, setCurrentLocation] = useState(null);
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
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              (error) => console.error("שגיאה בקבלת מיקום המשתמש:", error)
            );
          }
    
        }
      }, [isLoaded]);
    




  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
