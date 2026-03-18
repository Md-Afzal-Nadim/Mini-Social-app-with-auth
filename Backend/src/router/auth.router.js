const express = require("express");
const authController = require("../controllers/auth.controller");
const { identifyUser } = require("../middlewares/auth.middlewares");

const authRouter = express.Router()



authRouter.post('/register', authController.registerController)


/*get /api/posts */
authRouter.post("/login", authController.loginController)

/**
 * @route GET /api/auth/get-me
 * @description get logged in user
 * @access private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)



module.exports = authRouter

