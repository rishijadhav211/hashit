const mongoose = require("mongoose");

const bookingSchema = new mongooseSchema({
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
    status:{
        type: Boolean,
        required: true,
    },
    number:{
        type: String,
        require: true,
    }
});