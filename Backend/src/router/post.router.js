const exprees = require("express");
const postRouter = exprees.Router();
const  postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const {identifyUser} = require("../middlewares/auth.middlewares");
const { post } = require("./user.router");


/**
 * @Route POST /api/posts
 * @description create a post with image and caption
 */
postRouter.post("/",upload.single("image"), identifyUser ,postController.createPostController);


/** 
 * @Route GET /api/posts
 * @description get all posts
 */
postRouter.get("/", identifyUser ,postController.getPostController);


/**
 * @Route GET /api/posts/details/:postId
 * @description jisne post create kiya hai usi ko details le sakta hai jisne nahi kiya hai wah nahi le sakta hai
 */
postRouter.get("/details/:postId", identifyUser ,postController.getPostDetails)


/**
 * @Route POST /api/posts/like/:postId
 * @description like a post id provided
 */
postRouter.post("/like/:postId", identifyUser ,postController.likePostController) 


/**
 * @Route GET /api/posts/feed
 * @description get all post create in the DB 
 * @access private
 */
postRouter.get("/feed", identifyUser ,postController.getFeedController)


module.exports = postRouter