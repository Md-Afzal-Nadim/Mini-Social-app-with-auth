const followModel = require("../model/follow.model");
const userModel = require("../model/user.model");



async function followUserController(req, res) {

  const followerUsername =req.user.username;
  const followeeUsername = req.params.username;

 //Follow karne ke liye follow record create karna hai
  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername
  })

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord
  })



 //Khud ko follow nhi kr skte hai isliye ye check laga hai
  if(followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself"
    })
  }

  // Dobara follow nhi kr skte hai isliye ye check lagaye hai
  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })

  if(isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following this user ${followeeUsername}`,
      follow: isAlreadyFollowing
    })
  }

  // jo user exist nahi karta hai wah follow nahi kar sakta hai
   const followeeExists = await userModel.findOne({
    username: followeeUsername
  })

  if(!followeeExists) {
    return res.status(404).json({
      message: "user you are trying to follow does not exist"
    })
  }



 }


 async function unfollowUserController(req, res) { 
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

// ye unfollow karne ke liye follow record delete karna hai
  const isUserfollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })

  if(!isUserfollowing) {
    return res.status(400).json({
      message: `You are not following ${followeeUsername}`
    })
  }


  await followModel.findByIdAndDelete(isUserfollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`
  })
 }


module.exports = {
  followUserController,
  unfollowUserController
}