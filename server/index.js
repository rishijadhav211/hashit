const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const { Router } = require("express");
require("./db/connetion");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
const port = process.env.PORT;
app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

/**********  REQUIRE STATEMENTS  *********/

const Ambulance = require("./models/ambulance");
const Admin = require("./models/Admin");
const Booking = require("./models/booking");
const Patient = require("./models/patient");
const auth = require("./MiddleWare/adminAuth");
const ambAuth = require("./MiddleWare/ambAuth");

/*********  AWS CONFIGURATION FOR EMAIL  **********/
var AWS = require('aws-sdk');
// const { findOneAndUpdate } = require("../models/userSchema");
AWS.config.update({region: process.env.AWS_REGION});
const ses = new AWS.SES({region: process.env.AWS_REGION});


/*********  REGISTER ROUTES   *********/

app.post("/registerAmb",async(req,res)=>{
  try{
    const {name,email,rate, mobileNo, ambNo, address, city, pinCode, password} = req.body;
    const isValid= false;
    const status=true;
    const userExist = await Ambulance.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User alredy exist" });
    }
    const user = new Ambulance({ name,email,rate, mobileNo, ambNo, address, city, pinCode, status, password , isValid});

    const userRegistered = await user.save();

    if (userRegistered) {
      res.status(201).json({ message: "Wait for confirmation" });
    } else {
      res.status(500).json({ message: "Falied to register" });
    }
  }
  catch(err){
    console.log(err);
  }
});

app.post("/registerAdmin",async(req,res)=>{
  try{
    const {name, email, pinCode, password} = req.body;
    const userExist = await Admin.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User alredy exist" });
    }
    const user = new Admin({ name, email, pinCode, password});

    const userRegistered = await user.save();

    if (userRegistered) {
      res.status(201).json({ message: "Registered Success" });
    } else {
      res.status(500).json({ message: "Falied to register" });
    }
  }
  catch(err){
    console.log(err);
  }
});


/**********  LOGIN ROUTES   **********/

app.post("/ambLogin", async (req, res) => {
  try {
    const {email,password} = req.body;
    
    const userLogin = await Ambulance.findOne({ email: email});
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if(isMatch) {
          const token = await userLogin.generateAuthToken();
          res.cookie("Ambulance", token, {
            expires: new Date(Date.now() + 51840000),
            httpOnly: true,
          });
          res.status(201).json({ message: "Logged in success" });
      }else {
          res.status(400).json({ error: "Invalid Credentials" });
      }
    }else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/adminLogin",async(req,res)=>{
  try {
    const {email,password} = req.body;
    
    const userLogin = await Admin.findOne({ email: email});
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if(isMatch) {
          const token = await userLogin.generateAuthToken();
          res.cookie("AdminCookie", token, {
            expires: new Date(Date.now() + 51840000),
            httpOnly: true,
          });
          res.status(201).json({ message: "Logged in success" });
      }else {
          res.status(400).json({ error: "Invalid Credentials" });
      }
    }else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

/*******  LOGOUT ROUTES  ********/

app.get("/ambulanceLogout",async(req,res)=>{
  try{
    res.cookie("Ambulance", "", { expires: new Date(1)});
    res.clearCookie("Ambulance");
    return res.status(201).json({ message: "Success" });
  }
  catch(err){
    console.log(err);
  }
});

app.get("/adminLogout",async(req,res)=>{
  try{
    res.cookie("AdminCookie", "", { expires: new Date(1)});
    res.clearCookie("AdminCookie");
    return res.status(201).json({ message: "Success" });
  }
  catch(err){
    console.log(err);
  }
});

/***********  CHANGE PASSWORD   ***********/

app.patch("/fPassAdmin", async (req, res) => {
  try {
    const admin = await Admin.findOne({name: req.body.email});
    const adminID= Admin._id;
    const email = req.body.email;
    const user = await Admin.findOne({ email: email, _id: adminID });
    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }

    var OTP = Math.random() * 1000000;
    OTP = Math.floor(OTP) + "WCE";
    var password = OTP;
    password = await bcrypt.hash(password, 12);
    const filter = {
      email: email,
      clgID: clgID,
    };
    const update = {
      password: password,
    };
    const success = await Admin.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(400).json({ message: "Error occured" });
    }

    var message = "Your new Password is :"+password;
    var name= "Placement Assist";
    mail(email,"placementapp1234@gmail.com",message,name);    

  } catch (error) {
    console.log(error);
  }
});

app.patch("/changePAdmin", auth, async (req, res) => {
  try {
    const user = await Admin.findOne({ _id: req.userID });
    const email = user.email;
    var password = req.body.password;

    password = await bcrypt.hash(password, 12);

    const filter = {
      _id: req.userID,
    };
    const update = {
      password: password,
    };

    const success = await Admin.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(400).json({ message: "Error occured" });
    } else {
      return res.status(201).json({ message: "Password Changed Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.patch("/fPassAmbulance", async (req, res) => {
  try {
    const amb = await Ambulance.findOne({name: req.body.email});
    const ambID= amb._id;
    const email = req.body.email;
    const user = await Ambulance.findOne({ email: email, _id: ambID });
    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }

    var OTP = Math.random() * 1000000;
    OTP = Math.floor(OTP) + "WCE";
    var password = OTP;
    password = await bcrypt.hash(password, 12);
    const filter = {
      email: email,
      clgID: clgID,
    };
    const update = {
      password: password,
    };
    const success = await Ambulance.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(400).json({ message: "Error occured" });
    }

    var message = "Your new Password is :"+password;
    var name= "Placement Assist";
    mail(email,"placementapp1234@gmail.com",message,name);    

  } catch (error) {
    console.log(error);
  }
});

app.patch("/changePAmbulnace", auth, async (req, res) => {
  try {
    const user = await Ambulance.findOne({ _id: req.userID });
    const email = user.email;
    var password = req.body.password;

    password = await bcrypt.hash(password, 12);

    const filter = {
      _id: req.userID,
    };
    const update = {
      password: password,
    };

    const success = await Ambulance.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(400).json({ message: "Error occured" });
    } else {
      return res.status(201).json({ message: "Password Changed Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**********  ADMIN FUNCTIONALITY  *********/

app.get("/adminAmb",async(req,res)=>{
  const adminID = req.userID;
  try{
    const admin = Admin.findOne({_id: adminID});
    const pinCode = admin.pinCode;
    const ambulance = Ambulance.find({isValid: false, pinCode: pinCode});
    res.send(ambulance);
  }
  catch(err){
    console.log(err);
  }
});

app.patch("/verifyAmb",async(req,res)=>{
  const ambID = req.body.ambID;
  try{
    const filter ={
      _id: ambID,
    };
    const update={
      isValid: true,
    };

    const success = Ambulance.findOneAndUpdate(filter,update);
    if (success) {
      res.status(201).json({ message: "Verified Success" });
    } else {
      return res.status(400).json({ message: "Data not fo   und" });
    }
  }
  catch(err){
    console.log(err);
  }
});

app.delete("/rejectAmb",async(req,res)=>{
  const ambID = req.body.ambID;
  try{
    const del = await Ambulance.findOneAndDelete({_id: ambID});
    
    //email to ambulance wala
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if(del){
      res.status(201).json({ message: "Deleted success" });
    }
    else{
      res.status(400).json({ error: "Error occured" });
    }
  }
  catch(err){
    console.log(err);
  }
});

app.get("/adminProfile",async(req,res)=>{
  const adminID = req.userID;
  try{
    const profile = await Admin.findOne({_id: adminID});
    if(profile)
      res.send(profile);
    else{
      res.status(404).json({ error: "Admin not found" });
    }
  }
  catch(err){
    console.log(err);
  }
});

app.patch("/updateAdmin",async(req,res)=>{
  const id= req.userID;
  const {name,email,pinCode} = req.body;
  try{
     const filter ={
      _id: id,
     };
     const update ={
        name: name,
        email: email,
        pinCode: pinCode,
     };

     const success = await Admin.findOneAndUpdate(filter,update);
    if (success) {
      res.status(201).json({ message: "Update success" });
    }else {
      return res.status(400).json({ message: "Data not found" });
    }
  }
  catch(err){
    console.log(err);
  }
});

/********  AMBULANCE FUNCTIONALITY  *********/
app.get("/ambulanceProfile" ,ambAuth,async(req,res)=>{
  const ambID = req.userID;
  try{
    const profile = await Ambulance.findOne({_id: ambID});
    if(profile)
      res.send(profile);
    else{
      res.status(404).json({ error: "Ambulance data not found" });
    }
  }
  catch(err){
    console.log(err);
  }
});

app.patch("/updateAmbulance",ambAuth,async(req,res)=>{
  const id= req.userID;
  const {name,email,pinCode,rate,mobileNo,ambNo,address,city} = req.body;
  try{
     const filter ={
      _id: id,
     };
     const update ={
        name: name,
        email: email,
        pinCode: pinCode,
        rate:rate,
        mobileNo: mobileNo,
        ambNo: ambNo,
        address: address,
        city: city,
     };

     const success = await Ambulance.findOneAndUpdate(filter,update);
    if (success) {
      res.status(201).json({ message: "Update success" });
    }else {
      return res.status(400).json({ message: "Data not found" });
    }
  }
  catch(err){
    console.log(err);
  }
});

/******* PATIENT FUNCTIONAILTY *******/

app.get("/getAmbulance",async(req,res)=>{
  const pinCode = req.body.pinCode;
  try{
    const ambulance = await Ambulance.find({pinCode: pinCode});
    if(ambulance){
      res.send(ambulance);
    }
  }
  catch(err){
    console.log(err);
  }
});

app.post("/request",async(req,res)=>{
  const {name, location,number }=req.body;
  const ambID = req.ambID;
  const status = true;
  try{ 
    const book = new Booking({name, location, ambID,status,number});
    const success = await book.save();

    const ambulance = Ambulance.findOne({_id: ambID});
    var ambName = ambulance.name;
    var mobileNo= ambulance.mobileNo;
    var ambNo = ambulance.ambNo;

    var message ={
      ambName: ambName,
      mobileNo: mobileNo,
      ambNo : ambNo,
    };
    //      AMAZON SNS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (success) {
      res.status(201).json({ message: "Booked successfully" });
    } 
  }
  catch(err){
    console.log(err);
  }
});


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}!`);
});