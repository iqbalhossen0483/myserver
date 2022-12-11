const express = require("express");
const uploadImage = require("../../../../cloudinary/upload/uploadImage");
const multer = require("../../../../multer/multer");
const {
  addProperty,
  getForHome,
  getProperty,
  getPropertyById,
  deleteProperty,
  searchProperty,
  updateProperty,
} = require("../../controller/property/propertyControll");

const propertyRouter = express.Router();

propertyRouter.post(
  "/",
  multer.single("img"),
  uploadImage("ecostay/property", 550, 350),
  addProperty
);

propertyRouter.get("/home", getForHome);

propertyRouter.get("/", getProperty);

propertyRouter.get("/:id", getPropertyById);

propertyRouter.get("/search/:text", searchProperty);

propertyRouter.put(
  "/:id",
  multer.single("img"),
  uploadImage("ecostay/property", 550, 350),
  updateProperty
);

propertyRouter.delete("/:id", deleteProperty);

module.exports = propertyRouter;
