const checkUser = require("../middleWare/userMiddleware");
const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  postProduct,
  updateProduct,
  getProductsForHome,
  getCategoryProduct,
  getRandomProduct,
  getProductById,
  deleteProduct,
  searchProduct,
} = require("./handler");
const multer = require("../../../multer/multer");
const productImgUpload = require("../middleWare/cloudinary/productImgUpload");

productRouter
  .route("/")
  .get(getProducts)
  .post(
    checkUser,
    multer.fields([
      { name: "img", maxCount: 1 },
      { name: "gallery", maxCount: 3 },
    ]),
    productImgUpload,
    postProduct
  )
  .put(
    checkUser,
    multer.fields([
      { name: "img", maxCount: 1 },
      { name: "gallery", maxCount: 3 },
    ]),
    productImgUpload,
    updateProduct
  );

//products for home page
productRouter.get("/home", getProductsForHome);

//search products
productRouter.get("/searchProduct/:text", searchProduct);

//category product
productRouter.get("/category/:name", getCategoryProduct);

//get rendom product
productRouter.get("/rendom/:num", getRandomProduct);

// get product by id
productRouter.get("/:id", getProductById);

//delete product by id
productRouter.delete("/:id", checkUser, deleteProduct);

module.exports = productRouter;
