const jwt = require('jsonwebtoken');
const User = require('../models/user'); // או נתיב לקובץ המודל שלך

// יצירת טוקן של אדמין
const generateAdminToken = async (req, res) => {
  const { userId } = req.body;

  try {
    // חיפוש המשתמש לפי ה-ID שנשלח
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // בדיקת תפקיד המשתמש
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "User is not an admin" });
    }

    // יצירת טוקן חדש עם נתוני המשתמש
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        placeName: user.placeName,
      },
      'your_jwt_secret_key', // המפתח הסודי שלך
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating admin token:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { generateAdminToken };
