const {
  postProduct,
  getProduct,
  getProductById,
  getCartProduct,
} = require("../../controller/product/product");
const categoryRoute = require("./categoryRoute/categoryRoute");
const express = require("express");
const uploadImage = require("../../../../cloudinary/upload/uploadImage");
const multer = require("../../../../multer/multer");

const productRoute = express.Router();

//category route
productRoute.use("/category", categoryRoute);

productRoute.post(
  "/",
  multer.single("img"),
  uploadImage("food-delivary/product", 200, 300),
  postProduct
);

productRoute.get("/", getProduct);

//get cart product
productRoute.get("/cart", getCartProduct);

//product by id
productRoute.get("/:id", getProductById);

module.exports = productRoute;
