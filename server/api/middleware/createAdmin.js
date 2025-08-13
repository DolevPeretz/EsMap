const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // עדכון נתיב המודל בהתאם למיקום שלך

// התחברות למסד נתונים
mongoose.connect('mongodb://localhost:27017/hotspots', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// יצירת משתמש מנהל
const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('adminpassword', 10);  // הצפנת הסיסמא
    const newAdmin = new User({
      email: 'admin@example.com',
      password: hashedPassword, // שמירה של סיסמא מוצפנת
      placeName: 'Admin Place',
      idNumber: '123456789',
      role: 'admin',  // תפקיד אדמין
      businessCertificate: '',  // לא חובה במקרה של משתמש אדמין
      idDocument: '',  // לא חובה במקרה של משתמש אדמין
      placeLocation: { lat: 31.23, lng: 34.81 }, // מיקום לדוגמה
    });
    
    // שמירה למסד הנתונים
    await newAdmin.save();
    console.log('Admin user created successfully');
    mongoose.connection.close(); // סגירת החיבור אחרי סיום
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close(); // סגירת החיבור גם במקרה של שגיאה
  }
};


