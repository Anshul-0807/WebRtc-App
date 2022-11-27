const router = require('express').Router();
const authcontroller = require('./Controller/Auth-controller')
const activateController = require('./Controller/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware')

router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authcontroller.refresh);

module.exports = router;