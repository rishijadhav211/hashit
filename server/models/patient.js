const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
    ambID:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
});

const Patient = new mongoose.model("Patient" , patientSchema);
module.exports = Patient;