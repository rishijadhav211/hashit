const mongoose = require("mongoose");

const AllDept = new mongoose.Schema({
  deptName: {
    type: String,
    require: true,
  },
  No: {
    type: Number,
    require: true,
    default: Number(0),
  },
});

const newAsset = new mongoose.model("AllDept", AllDept);
module.exports = newAsset;
