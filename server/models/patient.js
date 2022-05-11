const mongoose = require("mongoose");

const patientSchema = new mongooseSchema({
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

const Patient = mongoose.model("Patieny",patientSchema);
module.exports = Patient;