const router = require('express').Router();
const authcontroller = require('./Controller/Auth-controller')

router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);


module.exports = router;