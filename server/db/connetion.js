const mongoose = require("mongoose");

const db=process.env.DATABASE;

mongoose.connect(db,{
    useNewUrlParser: true
})
.then(()=>{
    console.log("Connected to DB successfully");
})
.catch((err)=>{
    console.log(err);
});