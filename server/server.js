require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const spotRoutes = require('./api/routes/spot'); 
const userRoutes = require('./api/routes/user'); 

const app = express();

// אפשרות ל-CORS עם הגדרה מדויקת
const corsOptions = {
  origin: 'http://localhost:5000',  // הגדרה לכתובת הלקוח
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));  // הגדרת CORS מדויקת

app.use(express.json());  // שימוש ב-json parsing
app.use('/uploads', express.static('uploads')); // אם יש צורך ב-uploads

const mongoURI = process.env.MONGO_URI

// התחברות ל-MongoDB Atlas
mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas', err);
});

// שימוש ב-router
app.use('/api', spotRoutes); 
app.use('/user', userRoutes);

// השרת יתחיל לרוץ בפורט הרצוי
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const spotRoutes = require('./api/routes/spot'); 
// const userRoutes = require('./api/routes/user'); 

// const app = express();

// // הגדרת CORS עם אפשרות לשלוח בקשות מ-Frontend ב-Localhost:8010
// const corsOptions = {
//   origin: 'http://localhost:5000',  // הכתובת הנכונה של הלקוח שלך
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,

// };

// app.use(cors(corsOptions));  // הגדרת CORS מדויקת

// app.use(express.json());  // שימוש ב-json parsing
// app.use('/uploads', express.static('uploads')); // אם יש צורך ב-uploads

// const mongoURI = process.env.MONGO_URI;

// // התחברות ל-MongoDB Atlas
// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB Atlas', err);
//   });

// // שימוש ב-router
// app.use('/api', spotRoutes); 
// app.use('/user', userRoutes);

// // השרת יתחיל לרוץ בפורט הרצוי
// const PORT = process.env.PORT ;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


