import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/SwitchButton.css';
import Fetch from './Fetch';
import { useLocation } from '../Context/LocationContext';



const SwitchButton = ({ onFilteredPlacesChange }) => {
    const [isOpenFilterActive, setIsOpenFilterActive] = useState(false);
    const [updatedPlaces, setUpdatedPlaces] = useState([]);
    const { currentLocation, setCurrentLocation } = useLocation();

    const [places, setPlaces] = useState([]); // save the updets place from db
    useEffect(() => {
        const fetchOpeningHours = async () => {

            const updatedPlacesWithHours = await Promise.all(
                places.map(async (place) => {
                    try {
                        const response = await axios.get('http://localhost:8010/proxy/maps/api/place/details/json', {
                            params: {
                                place_id: place.placeId, // ה-Place ID של המקום
                                fields: 'opening_hours',
                                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                            },
                        });

                        return {
                            ...place,
                            opening_hours: response.data.result.opening_hours || null, // עדכון שעות הפתיחה אם קיימות
                        };
                    } catch (error) {
                        console.error(`Error fetching details for place_id ${place.name}:`, error);
                        return { ...place, opening_hours: null }; // אם יש שגיאה, נעדכן כ-null
                    }
                })
            );

            setUpdatedPlaces(updatedPlacesWithHours);
        };

        fetchOpeningHours();
    }, [places]);
    useEffect(() => {
        // Apply the filter when the switch changes
        const filteredPlaces = isOpenFilterActive
            ? updatedPlaces.filter(place => place.opening_hours?.open_now)
            : updatedPlaces;

        // Pass the filtered places back to the parent component
        onFilteredPlacesChange(filteredPlaces);
    }, [isOpenFilterActive, updatedPlaces, onFilteredPlacesChange]);

    const handleSwitchToggle = () => {
        setIsOpenFilterActive(prev => !prev);
    };

    return (

        <div >
            <Fetch setPlaces={setPlaces} currentLocation={currentLocation} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "white", marginBottom: "10px" }}>
            <label className="custom-switch-label">Show Open Places</label>
            <div className="custom-switch">
                    <input
                        type="checkbox"
                        id="switch"
                        checked={isOpenFilterActive}
                        onChange={handleSwitchToggle} 
                    />
                    <label className="slider" htmlFor="switch"></label>
                </div>

            </div>
        </div>
    );
};

export default SwitchButton;
