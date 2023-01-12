const router = require('express').Router();
const authcontroller = require('./Controller/Auth-controller')
const activateController = require('./Controller/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware')
const roomsController = require('./Controller/rooms-controller')



router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authcontroller.refresh);
router.post('/api/logout', authMiddleware, authcontroller.logout);
router.post('/api/rooms', authMiddleware, roomsController.create)
router.get('/api/rooms', authMiddleware, roomsController.index);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);
module.exports = router;