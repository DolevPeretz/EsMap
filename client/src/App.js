import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Fetch from "./components/Fetch";
import FetchApi from "./components/FetchApi";
import EventsCarousel from "./components/EventsCarousel";
import WelcomeOptionsModal from "./components/WelcomeOptionsModal";
import { useLocation } from "./Context/LocationContext";
import AdminDashboard from "./components/AdminDashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const [places, setPlaces] = useState([]);
  const { currentLocation, setCurrentLocation, token } = useLocation();
  const [isAdmin, setIsAdmin] = useState(false); // מצב עבור אדמין

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  if (!currentLocation) {
    return <div>מחכים למיקום...</div>;
  }

  return (
    <div className="App">
      {/* {isAdmin && <AdminDashboard />}
      <WelcomeOptionsModal />

      {!isAdmin && ( */}
      <>
        <FetchApi setPlaces={setPlaces} currentLocation={currentLocation} />
        {/* 
        <EventsCarousel />
        {currentLocation && <Fetch setPlaces={setPlaces} />} */}

        {/* {places && currentLocation && (
          <Map places={places} setPlaces={setPlaces} />
        )} */}
      </>
      {/* )} */}
      {/* 
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      /> */}
    </div>
  );
}

export default App;
