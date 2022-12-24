const router = require('express').Router();
const authcontroller = require('./Controller/Auth-controller')
const activateController = require('./Controller/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware')

router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authcontroller.refresh);
router.post('/api/logout', authMiddleware, authcontroller.logout);
router.post('/api/rooms', authMiddleware, roomscontroller.create)

module.exports = router;