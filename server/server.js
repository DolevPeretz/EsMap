require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const spotRoutes = require("./api/routes/spot");
const userRoutes = require("./api/routes/user");

const app = express();

/** CORS **/
const ALLOWED_ORIGINS = [
  process.env.CORS_ORIGIN || "http://localhost:3000", // כתובת הקליינט
];

const corsOptions = {
  origin: (origin, callback) => {
    // לאפשר גם כלים בלי origin (curl/postman)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

app.use("/api", spotRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5001;
// חשוב להאזין על 0.0.0.0 בתוך דוקר
app.listen(PORT, "0.0.0.0", () => {
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
//   origin: 'http://localhost:5001',  // הכתובת הנכונה של הלקוח שלך
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
