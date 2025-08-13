import React, { useState } from "react";
import axios from "axios";
import "../style/VerifyBusinessForm.css";

const VerifyBusinessForm = ({ placeId, onClose,placeName,placeLocation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [businessDoc, setBusinessDoc] = useState(null);
    const [idDoc, setIdDoc] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleFileChange = (e, setter) => {
      setter(e.target.files[0]);
    };
  
    console.log(placeName)
    const validateIdNumber = (id) => {
      const idRegex = /^[0-9]{9}$/; // בדיוק 9 ספרות
      return idRegex.test(id);
    };
    const handleSubmit = async () => {
      if (!email || !password || !idNumber ) {
        // if (!email || !password || !idNumber || !businessDoc || !idDoc) {

        alert("Please fill in all required fields.");
        return;
      }
  
      if (!validateIdNumber(idNumber)) {
        alert("ID number must be exactly 9 digits.");
        return;
      }
      const formData = new FormData();
      formData.append("placeId", placeId);
      formData.append("placeName", placeName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("idNumber", idNumber);
      formData.append("businessDoc", businessDoc);
      formData.append("idDoc", idDoc);
      formData.append("placeLocation",  JSON.stringify(placeLocation));

      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5001/user/verify-business", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        alert("Request submitted successfully!");
        onClose();
      } catch (error) {
        console.error("Error submitting request:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <div className="verify-business-form">
      <h3>Verify Your Business</h3>
      <p className="form-description">
        To verify that this is your business, please complete the form below. Our site administrators will review your request and grant the relevant permissions.
      </p>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="idNumber">ID Number:</label>
        <input
          id="idNumber"
          type="text"
          placeholder="Enter your 9-digit ID number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          maxLength={9}
        />
      </div>
      <div className="form-field">
        <label htmlFor="businessDoc">Business Certificate (PDF or Image):</label>
        <input
          id="businessDoc"
          type="file"
          accept=".pdf, .png, .jpg, .jpeg"
          onChange={(e) => handleFileChange(e, setBusinessDoc)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="idDoc">Government ID (Image):</label>
        <input
          id="idDoc"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => handleFileChange(e, setIdDoc)}
        />
      </div>
      <div className="form-actions">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VerifyBusinessForm;
