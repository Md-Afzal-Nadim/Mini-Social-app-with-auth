const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type:String,
    unique:[true, "username already exists"],
    required:[true, "username is required"]
  },
  email:{
    type:String,
    unique:[true, "email already exists"],
    required:[true, "email is required"]
  },
  password:{
    type:String,
    required:[true, "password is required"],
    select:false//to hide password but data base me save rahta hai
  },
  bio:String,

  ProfileImage:{
    type:String,
    default:"https://ik.imagekit.io/r5ak3jukn/551-5510463_default-user-image-png-transparent-png.png"
  }
  
})


const userModel = mongoose.model("user",userSchema);

module.exports = userModel;