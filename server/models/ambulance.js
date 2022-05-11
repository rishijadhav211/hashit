const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true, 
    },
    rate:{
        type: Int16Array,
        required:true,
    },
    mobileNo: {
        type:String,
        required: true,
    },
    ambNo:{
        type:String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    pinCode: {
        type: Int16Array,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    token: {
        type: String,
    },
    isValid:{
      type: String,
      required: true,
    },
});

ambulanceSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
      }
      next();
    } catch (err) {
      console.log(err);
    }
  });
  
  //                             *****generating token*****
  
ambulanceSchema.methods.generateAuthToken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, process.env.TOKEN_CODE);
      this.token = token;
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

const Ambulance = mongoose.model("Ambulance",ambulanceSchema);
module.exports = Ambulance;