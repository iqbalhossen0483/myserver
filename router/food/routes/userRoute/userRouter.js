const express = require("express");
const { postUser, getUser, updateCart } = require("../../controller/user/user");

const userRouter = express.Router();

userRouter.post("/:email", postUser);

userRouter.get("/:email", getUser);

userRouter.put("/:email", updateCart);

module.exports = userRouter;
