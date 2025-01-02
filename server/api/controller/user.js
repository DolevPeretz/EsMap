const User = require('../models/user');
const Event = require('../models/events'); 
const Spot  = require('../models/spot'); 

const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const fs = require('fs'); //

const path = require('path');

const verifyBusiness = async (req, res) => {
    try {
        const { email, password, idNumber, placeId ,placeName ,placeLocation} = req.body;

        // בדיקה אם כל הקבצים הדרושים נשלחו
        if (!req.files || !req.files.businessDoc || !req.files.idDoc) {
            return res.status(400).json({ message: "Missing required documents" });
        }
        parsedPlaceLocation = JSON.parse(placeLocation);
        const businessDoc = req.files.businessDoc[0];
        const idDoc = req.files.idDoc[0];

        // שמירת נתיבי הקבצים בשרת
        const businessDocPath = path.join(__dirname, '../uploads', businessDoc.filename);
        const idDocPath = path.join(__dirname, '../uploads', idDoc.filename);

        // הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10); // 10 הוא ה-saltRounds (דרגת הקושי של ההצפנה)

        // יצירת משתמש חדש עם המידע שנשלח
        const newUser = new User({
            email,
            placeName,
            password: hashedPassword, // שמירת הסיסמה המוצפנת
            idNumber,
            businessCertificate: businessDocPath,
            idDocument: idDocPath, // הוספת הנתיב לתעודת הזהות
            businessId: placeId,
            placeLocation :  {
              lat: parsedPlaceLocation.lat,
              lng: parsedPlaceLocation.lng,
            },
        });
        await newUser.save();

      
        // שמירת המשתמש במסד הנתונים

        res.status(201).json({ message: "Business verification submitted successfully" });
    } catch (error) {
        console.error("Error verifying business:", error);
        res.status(500).json({ message: "Error verifying business", error });
    }
};
// פונקציית התחברות
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // בדיקת קיום משתמש
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // בדיקת סיסמה
        const isPasswordValid = await bcrypt.compare(password, user.password); // הפונקציית הצפנה יודעת להשוות בין הסיסמא המוצפנת לסיסמא שהתקבלה 
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
            placeName: encodeURIComponent(user.placeName),
            placeLocation: user.placeLocation,
            status: user.status,
          },
          'your_jwt_secret_key',
          { expiresIn: '1h' }
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};


const updateUserStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      await User.findByIdAndUpdate(id, { status });
  
      // אחרי שהאדמין מאשר את המשתמש , הנקודה הופתכ להיות מאושרת 
      const spot = await Spot.findOneAndUpdate(
        { placeId: placeId }, // קריטריון לחיפוש
        { $set: { verify: true } }, // עדכון השדה
        { new: true } // מחזיר את המסמך המעודכן
    );

      res.status(200).json({ message: `User status updated to ${status}` });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Error updating user status", error });
    }
  };
  
  const getPendingUsers = async (req, res) => {
    try {
      const users = await User.find({ status: 'Pending' }, 'email idNumber businessCertificate idDocument');
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      res.status(500).json({ message: "Error fetching pending users" });
    }
  };
  
  const addEvent = async (req, res) => {
    
    try {
      const {
        placeName,
        placeLocation,
        eventType,
        eventTitle,
        eventDescription,
        dateTime,
        link,
      } = req.body;
      parsedPlaceLocation = JSON.parse(placeLocation);

      console.log(req.file)
      let imageData = null;
      if (req.file) {
        const imageBuffer = fs.readFileSync(req.file.path);
        imageData = imageBuffer.toString('base64');
        fs.unlinkSync(req.file.path);
      }
      else {
        const defaultImagePath = path.join(__dirname, '../../../src/assets/images/default-image.jpg');
        const imageBuffer = fs.readFileSync(defaultImagePath);
        imageData = imageBuffer.toString('base64');
    }

      // יצירת אובייקט חדש של אירוע
      const newEvent = new Event({
        placeName,
        eventType,
        eventTitle,
        eventDescription,
        dateTime,
        image : imageData ,
        link,
        placeLocation :  {
          lat: parsedPlaceLocation.lat,
          lng: parsedPlaceLocation.lng,
        },
      });
  
      // שמירת האירוע במסד הנתונים
      await newEvent.save();
  
      res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add event', error });
    }
  };
 

  const getEvents = async (req, res) => {
    try {
      // מחיקת כל האירועים שעבר זמנם
      const now = new Date();
      await Event.deleteMany({ dateTime: { $lt: now } });  

      const events = await Event.find();
      res.status(200).json(events); // החזרת האירועים בתור JSON
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  };



  const getEventByPlaceName = async (req, res) => {
    try {
        const { placeName } = req.params; // קבלת השם מהנתיב

        // חיפוש במסד הנתונים לפי שם המקום
        const event = await Event.findOne({ placeName: placeName }).lean(); // lean כדי להחזיר אובייקט פשוט
        if (!event) {
            return res.status(404).json({ message: "Event not found" }); // אם לא נמצא
        }

        res.status(200).json(event); // החזרת האירוע
    } catch (err) {
        console.error("Error fetching event by place name:", err);
        res.status(500).json({ message: "Server error" });
    }
};


  
module.exports = {
    verifyBusiness,
    login,
    updateUserStatus,
    getPendingUsers ,
    addEvent,
    getEvents ,
    getEventByPlaceName
};
