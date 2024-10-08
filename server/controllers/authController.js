const User = require('../models/user');
const passport = require("passport");

const registerUser = async (req, res) => {
  const newUser = req.body;

  if (!isValidUser(newUser)) {
    return res.status(400).json({ success: false, message: "Invalid user data" });
}

  try {

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ success: false, message: "User already exists" });
    }

    const newUser = new User(req.body);
    newUser.setPassword(req.body.password);
    const savedUser = await newUser.save();
    console.log("a")

    return res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.isValidPassword(req.body.password)) {
      return res.status(401).json({ success: false, message: "Password incorrect" });
    }

    passport.authenticate("local", (err, user, info) => {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        return res.status(200).json({
          success: true,
          user,
        });
      });
    })(req, res, next);
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    req.logout();
    console.log("A")
    return res.status(200).json({ success: true, message: "User logged out" });
  } catch (err) {
    // return next(err);
    return res.status(500).json({ success: false });
  }
};

const isValidUser = (user) => {
  return user && user.email && isValidEmail(user.email);
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
