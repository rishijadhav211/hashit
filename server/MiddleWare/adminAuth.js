const jwt = require("jsonwebtoken");
const admin =require("../models/adminSchema");
require('cookie-parser');

const adminAuth =async (req,res,next) => {
    try{
        const token= req.cookies.adminLogin;
        const verify= jwt.verify(token,process.env.TOKEN_CODE);
        
        const rootUser = admin.findOne({_id: verify._id,"tokens.token":token});
        if(!rootUser){
            throw new Error("User not found");
        }
        else
            res.status(201);
        req.userID= verify._id;
        next();
    }
    catch(err){
        res.status(401).send("Unauthorized token not provided ....");
        console.log(err);
    }
};

module.exports = adminAuth;