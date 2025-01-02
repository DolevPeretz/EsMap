import React, { useState } from "react";
import "../style/AddEvent.css";
import axios from 'axios';

const AddEvent = ({ placeName, placeLocation,handleCloseAddEvent }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    title: "",
    description: "",
    link: "",
    image: null,
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctedName = placeName.normalize("NFC");

    const Data = new FormData();
    Data.append("eventType", formData.eventType);
    Data.append("placeName", correctedName);
    Data.append("eventTitle", formData.title);
    Data.append("eventDescription", formData.description);
    Data.append("dateTime", `${formData.date}T${formData.time}`);
    Data.append("image", formData.image ? formData.image : "");
    Data.append("link", formData.link);
    Data.append("placeLocation", JSON.stringify(placeLocation));

    try {
      const response = await axios.post("http://localhost:5001/user/add-event", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        console.log("Event add with error", response.data);
      } else {
        handleCloseAddEvent()
        alert("Event added successfully");
        
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event");
    }
  };

  return (
    <div className="add-event-container">
    <h2 className="add-event-title">Add Event for {placeName}</h2>
    <form className="add-event-form" onSubmit={handleSubmit}>
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="eventType">Event Type</label>
        <select id="eventType" name="eventType" className="add-event-select" onChange={handleInputChange}>
          <option value="">Select</option>
          <option value="popup">Popup</option>
          <option value="happy-hour">Happy Hour</option>
          <option value="sale">Sale</option>
          <option value="show">Show</option>
          <option value="party">Party</option>
        </select>
      </div>
  
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="title">Event Title</label>
        <input id="title" name="title" type="text" className="add-event-input" placeholder="Enter event title" onChange={handleInputChange} />
      </div>
  
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="description">Description</label>
        <textarea id="description" name="description" className="add-event-input" placeholder="Enter event description" onChange={handleInputChange} />
      </div>
  
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="link">Event Link (Optional)</label>
        <input id="link" name="link" type="text" className="add-event-input" placeholder="Enter link" onChange={handleInputChange} />
      </div>
  
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="date">Event Date</label>
        <input id="date" name="date" type="date" className="add-event-input" onChange={handleInputChange} />
      </div>
  
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="time">Event Time</label>
        <select id="time" name="time" className="add-event-select" onChange={handleInputChange}>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
          ))}
        </select>
      </div>
  
      <div className="add-event-form-group">
        <label className="add-event-label" htmlFor="image">Upload Image</label>
        <input id="image" name="image" type="file" className="add-event-input" onChange={handleImageChange} />
      </div>
  
      <button type="submit" className="add-event-submit-btn">Submit Event</button>
    </form>
  </div>
  
  );
};

export default AddEvent;
