const express = require('express');
const router = express.Router();
const { savePlacesToDatabase, addReview,getPlaceByName } = require('../controller/spot'); // Ensure the path is correct
const Spot = require('../models/spot'); // Ensure the path is correct for your model
const Review = require('../models/review'); // Import your Review model
const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // תיקייה זמנית לשמירת התמונות

// Route to save places to the database
router.post('/save-places', async (req, res) => {
  try {
    const places = req.body.places;

    const savedPlaces = await savePlacesToDatabase(places);
    res.status(200).json(savedPlaces);
  } catch (error) {
    res.status(500).json({ message: "Error saving places", error });
  }
});

// POST route to add a review
router.post('/add-review', upload.single('image'), addReview);


// Route to get all places from the database
router.get('/get-places', async (req, res) => {
  try {
    const places = await Spot.find({});
    res.status(200).json({ data: places });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ message: 'Error fetching places', error });
  }
});

router.get('/places/:placeName', async (req, res) => getPlaceByName(req, res));





module.exports = router;
