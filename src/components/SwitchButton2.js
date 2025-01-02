import React, { useState, useEffect } from 'react';
import Fetch from './Fetch';
import '../style/SwitchButton.css';
import { useLocation } from '../Context/LocationContext';

const SwitchButton2 = ({ nameOfPlaces, onFilteredPlacesChange }) => {
    const { currentLocation, setCurrentLocation } = useLocation();

    const [isCategoryFilterActive, setIsCategoryFilterActive] = useState(false);
    const [places, setPlaces] = useState([]); // שמירת המקומות

    const handleCategoryFilterToggle = () => {
        setIsCategoryFilterActive((prev) => !prev);
    };
    useEffect(() => {
        const filteredPlaces = isCategoryFilterActive
            ? places.filter(place => nameOfPlaces.includes(place.name))
            : places;


        onFilteredPlacesChange(filteredPlaces);
    }, [isCategoryFilterActive, places, nameOfPlaces, onFilteredPlacesChange]);

    return (
        <div className="custom-switch-container">
            <Fetch setPlaces={setPlaces} currentLocation={currentLocation} />

            <label className="custom-switch-label">Filter by Events places</label>
            <div className="custom-switch">
                <input
                    type="checkbox"
                    id="category-switch"
                    checked={isCategoryFilterActive}
                    onChange={handleCategoryFilterToggle}
                />
                <label className="slider" htmlFor="category-switch"></label>
            </div>
        </div>
    );
};

export default SwitchButton2;
