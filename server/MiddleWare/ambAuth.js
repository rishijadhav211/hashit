const jwt = require("jsonwebtoken");
const Ambulance = require("../models/ambulance");
require("cookie-parser");

const UserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Ambulance;
    const verify = jwt.verify(token, process.env.TOKEN_CODE);
    const rootUser = Ambulance.findOne({ email: verify.email, token: token });
    if (!rootUser) {
      throw new Error("User not found");
    } else {
      res.status(201);
    }
    req.email = verify.email;
    next();
  } catch (err) {
    res.status(260).send("Unauthorized Access!!!!....");
    console.log(err);
  }
};

module.exports = UserAuth;
