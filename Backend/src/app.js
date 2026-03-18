const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


const app =express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

/* require router */
const authRouter = require("./router/auth.router");
const postRouter = require("./router/post.router");
const userRouter = require("./router/user.router");



/* user router */
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);


//ye line hamare api par call karega jisse hamne creat hi nahi kiya hai to user ko responece me html file milega
app.use(express.static("./public"))

app.use("*name", (req,res)=>{ 
  res.sendFile(path.join(__dirname, "..","./public/index.html"))
  })


module.exports = app;