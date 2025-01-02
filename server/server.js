require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const spotRoutes = require('./api/routes/spot'); 
const userRoutes = require('./api/routes/user'); 


const app = express();

// אפשרות ל-CORS
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const mongoURI = process.env.MONGO_URI

// התחברות ל-MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas', err);
});

// שימוש ב-router
app.use('/api', spotRoutes); // זו הדרך להוסיף את ה-router
app.use('/user', userRoutes); // זו הדרך להוסיף את ה-router



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
