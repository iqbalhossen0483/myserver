const checkUser = require("../middleWare/userMiddleware");
const express = require("express");
const {
  makeUserToDb,
  logInUser,
  getUserData,
  updateUserProfile,
  userCartUpdate,
  makeAdmin,
} = require("./handler");
const multer = require("../../../multer/multer");
const uploadProfile = require("../middleWare/cloudinary/uploadProfile");

const usersRouter = express.Router();

//make a user to database
usersRouter.put("/", makeUserToDb);

//log in user and get token for browsing
usersRouter.get("/login/:email", logInUser);

//get user his/her specefic data
usersRouter.get("/:email", checkUser, getUserData);

//user profile update
usersRouter.put(
  "/updateUser",
  multer.single("profile"),
  uploadProfile,
  updateUserProfile
);

//user's product collection update
usersRouter.put("/carts/:email", userCartUpdate);

//make admin
usersRouter.put("/admin", makeAdmin);

module.exports = usersRouter;
