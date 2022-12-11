const express = require("express");
const {
  isExistUser,
  postUser,
  getUserByEmail,
  sendUser,
  getUser,
  updateUser,
} = require("../../controller/user/userControll");

const userRouter = express.Router();

userRouter.post("/", isExistUser, postUser, sendUser);

userRouter.get("/", getUser);

userRouter.get("/:email", getUserByEmail);

userRouter.put("/:email", updateUser);

module.exports = userRouter;
