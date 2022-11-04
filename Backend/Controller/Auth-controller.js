const otpService = require("../Services/otp-service");
const hashservice = require("../Services/hash-service");
const { sendBySms } = require("../Services/otp-service");
const userService = require("../services/user-service");
const tokenService = require("../Services/token-service");

class Authcontroller {
  async sendOtp(req, res) {
    //logic
      
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    const otp = await otpService.generateOtp();

    //hash

    const ttl = 1000 * 60 * 2; //2min
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;

    const hash = hashservice.hashOtp(data);

    // send otp

    try {
      // await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,  //kaam hone ke baaad change karna...ye otp hatana and sendbysms ko uncomment karna
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "message sending failed" });
    }
    // res.json({hash : hash});
  }

    async verifyOtp(req, res) {
    //logic
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are required! " });
    }

    const [hashedOtp, expires] = hash.split('.');
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isvalid = otpService.verifyOtp(hashedOtp, data);

    if (!isvalid) {
      res.status(400).json({ messages: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });

      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Db error' });
    }

    //token

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

 res.json({ accessToken});
  }
}

module.exports = new Authcontroller();
