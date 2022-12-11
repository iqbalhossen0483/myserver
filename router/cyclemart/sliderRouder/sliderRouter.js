const { postSlider, getSlider, deleteSlider } = require("./handler");
const uploadeImage = require("../../../cloudinary/upload/uploadImage");
const checkUser = require("../middleWare/userMiddleware");
const express = require("express");
const multer = require("../../../multer/multer");

const sliderRouter = express.Router();

//post slider
sliderRouter.post(
  "/",
  checkUser,
  multer.single("image"),
  uploadeImage("cycle-mart/images", 640, 1436),
  postSlider
);

//get slider
sliderRouter.get("/", getSlider);

//delete slider
sliderRouter.delete("/:id", checkUser, deleteSlider);

module.exports = sliderRouter;
