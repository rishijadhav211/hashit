const mongoose = require("mongoose");

const adminSchema = new mongooseSchema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    pinCode:{
        type:String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    token:{
        type: String,
    }
});

adminSchema.pre("save", async function (next) {
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
  
adminSchema.methods.generateAuthToken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, process.env.TOKEN_CODE);
      this.token = token;
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;