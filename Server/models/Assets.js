const mongoose = require("mongoose");

const Asset = new mongoose.Schema({
  _id: String,
  UID: {
    type: String,
    require: true,
  },
  AssetNumber: {
    type: String,
    require: true,
  },
  EqpType: {
    type: String,
    require: true,
  },
  NameOfEqp: {
    type: String,
    require: true,
  },
  SpecsConfig: {
    type: String,
    require: true,
  },
  Make: {
    type: String,
    require: true,
  },
  AllocationFund: {
    type: String,
    require: true,
  },
  DOP: {
    type: String,
    require: true,
  },
  CostPerUnit: {
    type: Number,
    require: true,
  },
  Quantity: {
    type: String,
    require: true,
  },
  TotalCost: {
    type: Number,
    require: true,
  },
  Warranty: {
    type: String,
    require: true,
  },
  LocEqp: {
    type: String,
    require: true,
  },
  SupplierName: {
    type: String,
    require: true,
  },
  SupplierAddress: {
    type: String,
    require: true,
  },
  SupplierMobNo: {
    type: String,
    require: true,
  },
  Utilization: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },
  Remark: {
    type: String,
    require: true,
  },
  Part: {
    type: String,
    require: true,
  },
  PhotoLink: {
    type: String,
  },
  Department: {
    type: String,
    require: true,
  },
});

const newAsset = new mongoose.model("Asset", Asset);
module.exports = newAsset;
