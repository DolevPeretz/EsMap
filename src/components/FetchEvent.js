import axios from "axios";
import React, { useEffect } from "react";
import { use } from "react";

const FetchEvent = ({ placeName, setEvent }) => {
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/user/getEventByPlaceName/${placeName}`);
                setEvent(response.data); // שמירת הנתונים מהשרת
            } catch (err) {
                console.error("Error fetching event:", err);
            }
        };

        fetchEvent();
    }, [placeName]);

    return <div></div>;
};

export default FetchEvent;
