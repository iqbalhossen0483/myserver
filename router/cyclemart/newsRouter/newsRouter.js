const uploadeImage = require("../../../cloudinary/upload/uploadImage");
const checkUser = require("../middleWare/userMiddleware");
const { postNews, getNews } = require("./handler");
const express = require("express");
const multer = require("../../../multer/multer");

const newsRouter = express.Router();

newsRouter.post(
  "/",
  checkUser,
  multer.single("img"),
  uploadeImage("cycle-mart/news", 436, 640),
  postNews
);

newsRouter.get("/", getNews);

module.exports = newsRouter;
