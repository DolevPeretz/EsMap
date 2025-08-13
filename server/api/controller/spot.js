// controller/spot.js

const Spot = require("../models/spot"); // Ensure this path is correct
const Review = require("../models/review"); // Ensure this path is correct
const fs = require("fs");
const { verify } = require("crypto");
const axios = require("axios"); // הוספת המודול axios

const fetchAndSavePlaces = async (location) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=3000&type=restaurant|bar|cafe|night_club|spa|park&key=${apiKey}`;

    const response = await axios.get(url);

    const places = response.data.results;

    if (!places.length) {
      console.log("No places found.");
      return;
    }

    // שמירת המקומות במסד הנתונים (MongoDB)
    const savedPlaces = await savePlacesToDatabase(places);

    return savedPlaces;
  } catch (error) {
    console.error("Error fetching places from Google API:", error);
    throw new Error("Failed to fetch places");
  }
};

// Function to save places to the database
const savePlacesToDatabase = async (places) => {
  try {
    const savedPlaces = [];
    for (const place of places) {
      const existingPlace = await Spot.findOne({ placeId: place.place_id });

      if (existingPlace) {
        console.log("Place already exists:", place.placeId);

        let photoUrl = existingPlace.photo;
        if (place.photos && place.photos.length > 0) {
          photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

          existingPlace.photo = photoUrl;
          await existingPlace.save();
          console.log("Updated photo for place:", place.placeId);
        }
        continue;
      }

      let photoUrl = "";
      if (place.photos && place.photos.length > 0) {
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      }

      const newSpot = new Spot({
        name: place.name,
        adress: place.vicinity,
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        type: place.types[0], // נניח שהסוג הראשון הוא העיקרי
        rating: place.rating || 0,
        photo: photoUrl, // שמירה של ה-URL של התמונה
        allTypes: place.types, // שימוש במערך לכל סוגי המקומות
        reviews: place.reviews || [], // אם יש חוות דעת
        verify: false,
      });

      const savedSpot = await newSpot.save();
      savedPlaces.push(savedSpot);
    }
    return savedPlaces;
  } catch (error) {
    console.error("Error saving places:", error);
    throw new Error("Failed to save places to database");
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Spot.find({}).lean(); // lean = סדרה מהירה נקיה
    return res.json({ success: true, count: places.length, data: places });
  } catch (error) {
    console.error("Error fetching places:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch places from database",
      detail: error.message,
    });
  }
};

module.exports = { getAllPlaces /* ...שאר הפונקציות... */ };

// Function to add a review
const addReview = async (req, res) => {
  try {
    const { rating, comment, id } = req.body; // ה-id מועבר כחלק מהגוף של הבקשה
    let imageData = null;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageData = imageBuffer.toString("base64");
      fs.unlinkSync(req.file.path);
    }

    const newReview = new Review({
      rating,
      comment,
      timestamp: Date.now(),
      imageData,
    });

    const savedReview = await newReview.save();

    if (id) {
      await Spot.findByIdAndUpdate(id, { $push: { reviews: savedReview } });
    }

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review" });
  }
};

const getPlaceByName = async (req, res) => {
  try {
    const { placeName } = req.params; // שליפת מזהה ה-_id מהפרמטרים ב-URL

    console.log(placeName);

    const place = await Spot.findOne({ name: placeName }); // חיפוש מקום במסד הנתונים לפי _id
    console.log(place);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place); // החזרת פרטי המקום
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ message: "Error retrieving place details" });
  }
};

module.exports = {
  savePlacesToDatabase,
  getAllPlaces,
  addReview,
  getPlaceByName,
  fetchAndSavePlaces,
};
