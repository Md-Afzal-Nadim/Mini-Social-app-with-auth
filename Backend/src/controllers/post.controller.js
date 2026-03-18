const postModel = require("../model/post.model");
const  ImageKit=require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs');
const likeModel = require("../model/like.model");



const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY  // This is the default and can be omitted
});

async function createPostController(req,res){
 



  const  file = await imagekit.files.upload({

    file:  await toFile(Buffer.from(req.file.buffer),"file"),
    fileName: "Test",
    folder:"insta-clone-posts"
  });




  const post = await postModel.create({
    caption : req.body.caption,
    imgUrl : file.url,
    user : req.user.userId
  })

   res.status(201).json({
    message : "post created successfully",
    post
  })


}


async function getPostController(req,res){


  

  const userid = req.user.userId;
  const posts = await postModel.find({
    user:userid
  });
  res.status(200).json({
    message : "posts fetched successfully",
    posts
  })
}


async function getPostDetails(req,res){
  
  


  const userId = req.user.userId;
  const postId = req.params.postId
  const post = await postModel.findById(postId);
  
    if(!post){
      return res.status(404).json({
        message:"post not found"
      })
    }

    const isValidUser =post.user.toString() ===userId
    if(!isValidUser){
      return res.status(403).json({
        message:"forbidden content"
      })
    }

    return res.status(200).json({
      message:"post fetched successfully",
      post
    })
  }


  async function likePostController(req,res){
    
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);
    if(!post){
      return res.status(404).json({
        message:"post not found"
      })
    }

    const like = await likeModel.create({
      post:postId,
      user:username
    })

    res.status(200).json({
      message:"post liked successfully",
      like
    })
  }

  async function getFeedController(req,res){
    const user=req.user

   /* const posts = await postModel.find().populate("user");//user ke Id ke jagah par user ka data chahiye iskiye .populate use karte hai. // Schema me bhi (ref:"user" )lagana parta hai.*/

   const posts = await Promise.all((await postModel.find().populate("user").lean())
   .map(async(post)=>{
    const isLiked = await likeModel.findOne({
      user:user.username,
      post:post._id
    })

    post.isLiked=Boolean(isLiked);
    return post
    } ))
  

    res.status(200).json({
      message:"posts fetched successfully",
      posts
    })

  }

module.exports = {
  createPostController,
  getPostController,
  getPostDetails,
  likePostController,
  getFeedController
}