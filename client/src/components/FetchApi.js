// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function FetchApi({ setPlaces, currentLocation }) {

//   const fetchNearbyPlaces = async (pageToken = null) => {
//     console.log('Fetching places...'); // הדפסה לפני קריאת ה-API

//     try {
//       const params = {
//         location: `${currentLocation.lat},${currentLocation.lng}`,
//         radius: 3000,
//         type: 'restaurant|bar|cafe|night_club|spa|park',
//         key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//       };
//       console.log(params.key);

//       if (pageToken) {
//         params.pagetoken = pageToken; // משתמשים ב-next_page_token אם קיים
//       }

//       const response = await axios.get(
//         'http://localhost:8010/proxy/maps/api/place/nearbysearch/json',
//         { params }
//       );

//       // הדפסת התגובה מה-API
//       console.log('Google API Response:', response);

//       // בדיקה אם יש תוצאות והדפסת המקומות המתקבלים
//       if (response.data && response.data.results) {
//         const fetchedPlaces = response.data.results.map((place) => ({
//           ...place,
//           types: place.types
//             ? place.types.filter(
//                 (type) => type !== 'establishment' && type !== 'point_of_interest'
//               )
//             : [],
//           photoUrl:
//             place.photos && place.photos[0]
//               ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
//               : null,
//         }));

//         // הדפסת המקומות המתקבלים
//         console.log('Fetched Places:', fetchedPlaces);

//         setPlaces((prevPlaces) => [...prevPlaces, ...fetchedPlaces]);

//         // אם יש דף נוסף של תוצאות, נשמור גם אותם
//         if (response.data.next_page_token) {
//           setTimeout(() => {
//             fetchNearbyPlaces(response.data.next_page_token); // קריאה נוספת עם ה-token החדש
//           }, 2000); // מחכים 2 שניות לפי דרישת גוגל
//         }
//       } else {
//         console.log('No places found.');
//       }
//     } catch (error) {
//       console.error('Error fetching places from Google API:', error);
//     }
//   };

//   useEffect(() => {
//     fetchNearbyPlaces();
//   }, [currentLocation.lat, currentLocation.lng]); // משתמשים בערכים פנימיים של currentLocation

//   return <div></div>;
// }

// export default FetchApi;

// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function FetchPlaces() {
// //   const [places, setPlaces] = useState([]);

// //   const fetchPlaces = async () => {
// //     const location = { lat: 31.23, lng: 34.81 }; // מיקום לדוגמה, יכול להיות מיקום משתמש

// //     try {
// //       // שלח את המיקום ל-Backend
// //       const response = await axios.post('http://localhost:5001/api/fetch-places', location);
// //       setPlaces(response.data); // עדכן את המצב עם המקומות שהתקבלו
// //       console.log('Places fetched and saved:', response.data);
// //     } catch (error) {
// //       console.error('Error fetching places:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <button onClick={fetchPlaces}>Fetch Places</button>
// //       <ul>
// //         {places.map(place => (
// //           <li key={place._id}>{place.name} - {place.address}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default FetchPlaces;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function FetchPlaces({ setPlaces, currentLocation }) {
//   const [placesData, setPlacesData] = useState([]); // שינה את שם ה-state המקומי
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null); // הוספת סטייט לשגיאות

//   const fetchPlaces = async () => {
//     setLoading(true);  // הפעלת טעינה
//     const location = { lat: currentLocation.lat, lng: currentLocation.lng}; // מיקום לדוגמה, יכול להיות מיקום משתמש

//     try {
//       const response = await axios.post('http://localhost:5001/api/fetch-places', location);
//       setPlacesData(response.data); // עדכון את המצב עם המקומות שהתקבלו
//       setPlaces(response.data); // עדכון את הסטייט של הקומפוננטה האב
//       console.log('Places fetched and saved:', response.data);
//     } catch (error) {
//       console.error('Error fetching places:', error);
//       setError(error);  // שמירת השגיאה בסטייט
//     } finally {
//       setLoading(false);  // הפסקת טעינה
//     }
//   };

//   useEffect(() => {
//     fetchPlaces();  // קריאה אוטומטית לפונקציה עם טעינת הדף
//   }, [currentLocation.lat, currentLocation.lng]);

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>} {/* הצגת שגיאה אם קיימת */}
//       <ul>
//         {Array.isArray(placesData) && placesData.length > 0 ? (
//           placesData.map(place => (
//             <li key={place._id}>{place.name} - {place.address}</li>
//           ))
//         ) : (
//           <p>No places found.</p>  // הצגת הודעה אם לא נמצאו מקומות
//         )}
//       </ul>
//     </div>
//   );
// }

// export default FetchPlaces;

import React, { useState, useEffect } from "react";
import axios from "axios"; // יבוא axios

function FetchApi({ setPlaces, currentLocation }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (currentLocation) {
        setLoading(true);
        try {
          // שליחת בקשה לשרת ל-fetch את המקומות עם lat, lng
          const response = await axios.post(
            "http://localhost:5001/api/fetch-places",
            {
              lat: currentLocation.lat,
              lng: currentLocation.lng,
            }
          );

          // עדכון המקומות במצב ה-React
          setPlaces(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching places:", error);
          setLoading(false);
        }
      }
    };

    fetchPlaces();
  }, [currentLocation, setPlaces]);

  if (loading) {
    return <div>מחכים למידע...</div>;
  }

  return null;
}

export default FetchApi;
