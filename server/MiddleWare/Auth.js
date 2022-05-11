const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("cookie-parser");

const UserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.ASSETREGISTRY;
    const verify = jwt.verify(token, process.env.TOKEN_CODE);
    const rootUser = User.findOne({ email: verify.email, token: token });
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
