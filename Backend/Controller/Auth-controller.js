const otpService = require("../Services/otp-service");
const hashservice = require("../Services/hash-service");
const { sendBySms } = require("../Services/otp-service");
const userService = require("../services/user-service");
const tokenService = require("../Services/token-service");
const UserDto = require('../dtos/user-dto')

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

   await  tokenService.storeRefreshToken(refreshToken, user._id );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

  const userDto = new UserDto(user);

  res.json({ user: userDto, auth: true });
  }

  async refresh( req, res){
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // check if token is valid
    let userData;
    try{
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    }catch(err) {
      return res.status(401).json({message: 'Invalid Token'})
    }
    // check if token is valid
    try{
    const token = await tokenService.findRefreshToken(
      userData._id,
      refreshTokenFromCookie
    );
    
    if(!token){
      return res.status(401).json({message: 'Invalid Token'});
 
    }
     
    } catch (err){
     return res.status(500).json({message: 'Internal error'});
    }

    // check if valid user
    const user = await userService.findUser({_id: userData._id});
    if(!user){
      return res.status(404).json({message: 'No user'});

    }
    // generate new tokens
      const { refreshToken, accessToken } = tokenService.generateTokens({
        _id: userData._id,
      });

      // update refresh token
       try{
         await tokenService.updateRefreshToken(userData._id, refreshToken);
       } catch (err){
         return res.status(500).json({message: 'Internal error'});

       }
    // put in cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
// responce
  const userDto = new UserDto(user);

  res.json({ user: userDto, auth: true });
  }

    async logout(req, res){
      
      const {refreshToken} = req.cookies;
      // delete refresh token from cookie
         await  tokenService.removeToken(refreshToken);
      // delete cookies
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      res.json({ user: null, auth: false})
    }


  }


module.exports = new Authcontroller();
