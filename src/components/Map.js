import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import axios from 'axios';
import PlaceInfo from './PlaceInfo';
import TopRatedPlaces from './TopRatedPlaces';
import MapControls from './MapControls';
import FetchEvents from './FetchEvents';
import '../style/Map.css'

import Restaurant from '../assets/images/Restaurant.png';
import Spa from '../assets/images/Spa.png';
import Bar from '../assets/images/Bar.png';
import Coffee from '../assets/images/Coffee.png';
import Party from '../assets/images/Party.png';
import event from '../assets/images/event.png';


import restaurant_green from '../assets/images/restaurant_green.png';
import restaurant_red from '../assets/images/restaurant_red.png';
import restaurant_yellow from '../assets/images/restaurant_yellow.png';

import spa_green from '../assets/images/spa_green.png';
import spa_red from '../assets/images/spa_red.png';
import spa_yellow from '../assets/images/spa_yellow.png';

import bar_green from '../assets/images/bar_green.png';
import bar_red from '../assets/images/bar_red.png';
import bar_yellow from '../assets/images/bar_yellow.png';

import coffee_green from '../assets/images/coffee_green.png';
import coffee_red from '../assets/images/coffee_red.png';
import coffee_yellow from '../assets/images/coffee_yellow.png';

import party_green from '../assets/images/party_green.png';
import party_red from '../assets/images/party_red.png';
import party_yellow from '../assets/images/party_yellow.png';

import { useLocation } from '../Context/LocationContext';


const Map = ({ places, setPlaces }) => {



  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedType, setSelectedType] = useState('all'); // State to hold the selected type
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [events, setEvents] = useState([]);
  const [nameOfPlaces, setNameOfPlaces] = useState([]);

  // const [IDSevents, setIDSevents] = useState([]); 
  const { currentLocation, setCurrentLocation } = useLocation();


  const containerStyle = {
    width: '90vw',
    height: '90vh',
  };

  const onCloseFunc = () => {
    setSelectedPlace("")
    const unwantedArrow = document.querySelectorAll('.gm-style-iw-t');
    unwantedArrow.forEach(arrow => arrow.parentNode.removeChild(arrow));

  }



  const getIconUrl = (placeType, rating, isHovered, placeName) => {
    if ( nameOfPlaces.includes(placeName)) {
      return event
    }
    const hoverIcons = {
      restaurant: Restaurant,
      bar: Bar,
      spa: Spa,
      cafe: Coffee,
      night_club: Party,
    };

    const greenIcons = {
      restaurant: restaurant_green,
      bar: bar_green,
      spa: spa_green,
      cafe: coffee_green,
      night_club: party_green,
    };

    const redIcons = {
      restaurant: restaurant_red,
      bar: bar_red,
      spa: spa_red,
      cafe: coffee_red,
      night_club: party_red,
    };

    const yellowIcons = {
      restaurant: restaurant_yellow,
      bar: bar_yellow,
      spa: spa_yellow,
      cafe: coffee_yellow,
      night_club: party_yellow,
    };

    if (isHovered || rating === 0) {
      // החזרת אייקון הריחוף כאשר העכבר נמצא מעל המרקר
      return hoverIcons[placeType] || hoverIcons['restaurant'];
    }

    // בחירת אייקון לפי הדירוג כאשר העכבר לא נמצא מעל המרקר
    if (rating >= 4)
      return greenIcons[placeType] || restaurant_green;
    if (rating < 4 && rating >= 2.8)
      return yellowIcons[placeType] || restaurant_yellow;
    return redIcons[placeType] || restaurant_red;
  };

  const handleReviewSubmit = async (id, formData) => {
    formData.append('id', id);

    try {
      const response = await axios.post(`http://localhost:5001/api/add-review`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Review submitted successfully:', response.data);

      // עדכן את הביקורות כפי שעשינו קודם
      if (selectedPlace) {
        const newReview = {
          ...response.data,
          timestamp: Date.now()
        };
        const updatedReviews = [...(selectedPlace.reviews || []), newReview];
        setSelectedPlace(prev => ({ ...prev, reviews: updatedReviews }));
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  };


  // Filter the places based on the selected type
  const filteredPlaces = places.filter((place) => {
    return (
      selectedType === 'all' ||
      (place.allTypes && place.allTypes.includes(selectedType))
    );
  });

  const handleSearch = () => {
    const place = places.find((place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (place) {
      setSelectedPlace(place);
    } else {
      alert('Place not found');
    }
  };

  // שמות כל המקומות שיש להם אירוע
  useEffect(() => {
    const names = events.map(event => event.placeName); // יוצרים מערך של תעודות זהות
    setNameOfPlaces(names); //
    console.log(nameOfPlaces)

  }, [events]);

  return (
    <div className="map-page" >

      <FetchEvents setEvents={setEvents} />

      <div className="MapControls">
        <MapControls selectedType={selectedType} setSelectedType={setSelectedType}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          onFilteredPlacesChange={setPlaces}
          nameOfPlaces={nameOfPlaces}
        />
      </div>

      <div className="top-rated-wrapper">
        <TopRatedPlaces places={places} setSelectedPlace={setSelectedPlace}  />
      </div>

      <div className="map-wrapper">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
          options={{ styles: mapOptions.mapTheme }}
        >
          {filteredPlaces.map((place) => {
            const placeId = place.place_id || place._id;
            const isHovered = hoveredMarkerId === placeId;
            const position = {
              lat: place.geometry?.location?.lat || place.location?.lat,
              lng: place.geometry?.location?.lng || place.location?.lng,
            };

            return (place.geometry?.location || place.location) ? (
              <div key={placeId}>
                <Marker
                  position={position}
                  options={{
                    icon: {
                      url: getIconUrl(place.type, calculateAverageRating(place.reviews), isHovered, place.name),
                      scaledSize: new window.google.maps.Size(isHovered ? 40 : 35, isHovered ? 40 : 35),
                    },
                  }}
                  onMouseOver={() => setHoveredMarkerId(placeId)}
                  onMouseOut={() => setHoveredMarkerId(null)}
                  onClick={() => setSelectedPlace(place)}
                />
              </div>
            ) : null;
          })}

          {/* סימון המיקום הנוכחי */}
          {currentLocation && (
            <Marker
              position={currentLocation}
              options={{
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "red",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "white",
                },
              }}
            />
          )}
          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry?.location?.lat || selectedPlace.location?.lat,
                lng: selectedPlace.geometry?.location?.lng || selectedPlace.location?.lng,
              }}
              onCloseClick={onCloseFunc}
              options={{ zIndex: 999 }}
            >
                <div className="custom-info-window">

              <PlaceInfo selectedPlace={selectedPlace} onReviewSubmit={handleReviewSubmit} currentLocation={currentLocation} nameOfPlaces={nameOfPlaces} />
              </div>

            </InfoWindow>
          )}
        </GoogleMap>
      </div>

    </div>
  );
};


export default Map;
