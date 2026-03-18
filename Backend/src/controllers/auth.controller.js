const userModel =require("../model/user.model");
//const crytpo = require('crypto') ye basic password hash karta hai
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');// ye age chal kar advance password hash karta hai



/* register controller */
async function registerController(req,res) {
  const {username, email, password, bio, ProfileImage} =req.body

  const isUserAlreadyExists =await userModel.findOne({
    $or: [
      {username},
      {email}
    ]
  })


   if(isUserAlreadyExists){
    return res.status(409).json({
      message:"user already exists" + (isUserAlreadyExists.email == email?
        "Email already exists" : " user name already exist")
    })
   }


   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await userModel.create({
     username,
     email,
     password:hashedPassword,
     bio,
     ProfileImage
     
   })


   const token =jwt.sign(
    {
      userId:user._id,
      username:user.username
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1d"}
   )

   res.cookie("token",token)

   res.status(201).json({
     message:"user registered successfully",
     user:{
       username:user.username,
       email:user.email,
       bio:user.bio,
       profileImage:user.ProfileImage
     }
   })
   
}



/* login controller */
async function loginController(req, res) {

  const {username, email, password} =req.body

  const user = await userModel.findOne({
    $or: [
      {
        username:username
      },
      {
        email:email
      }
    ]
  }).select("+password")//isse login me koi problem nahi hoga

   if(!user){
    return res.status(404).json({
      message:"user not found"
    })
   }


   const isPasswordCorrect = await bcrypt.compare(password, user.password);

   if(!isPasswordCorrect){
    return res.status(401).json({
      message:"password is incorrect"
    })
   }


   const token =jwt.sign(
    {
      userId:user._id,
      username:user.username
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1d"}
   )

   res.cookie("token",token)

   res.status(200).json({
     message:"user logged in successfully",
     user:{
       username:user.username,
       email:user.email,
       bio:user.bio,
       ProfileImage:user.ProfileImage
     }
   })

  }

  /**
   * GET /api/auth/get-me
   */

  async function getMeController(req, res) {
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    res.status(200).json({
      user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        ProfileImage:user.ProfileImage
      }
    })
  }

  module.exports ={
    registerController,
    loginController,
    getMeController
  }


