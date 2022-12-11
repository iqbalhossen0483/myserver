const express = require("express");
const uploadImage = require("../../../../../cloudinary/upload/uploadImage");
const multer = require("../../../../../multer/multer");
const {
  postCategory,
  getCategory,
} = require("../../../controller/product/category/category");

const categoryRoute = express.Router();

categoryRoute.post(
  "/",
  multer.single("img"),
  uploadImage("food-delivary/images", 200, 300),
  postCategory
);

categoryRoute.get("/", getCategory);

module.exports = categoryRoute;
