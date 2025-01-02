const express = require('express');
const router = express.Router();
const { verifyBusiness, login, getPendingUsers, updateUserStatus , addEvent ,getEvents,getEventByPlaceName} = require('../controller/user');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth'); // ייבוא ה-Middleware

const upload = multer({ dest: 'uploads/' });

router.post(
    '/verify-business',
    upload.fields([
      { name: 'businessDoc', maxCount: 1 },
      { name: 'idDoc', maxCount: 1 },
    ]),
    verifyBusiness
  );
router.post('/login', login);

router.get('/admin/pending-users', adminAuth, getPendingUsers);

router.post('/admin/update-status/:id',adminAuth, updateUserStatus);

router.post('/add-event',upload.single('image'), addEvent);

router.get("/events", getEvents);

router.get('/getEventByPlaceName/:placeName',getEventByPlaceName);



module.exports = router;


