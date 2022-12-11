const express = require("express");
const productRoute = require("./routes/productRoute/productRoute");
const userRouter = require("./routes/userRoute/userRouter");
const orderProcessRouter = require("./routes/others/orderProcessRouter");
const orderRoute = require("./routes/oderRoute/orderRoute");
const food = express.Router();

//product route
food.use("/products", productRoute);

//user route
food.use("/users", userRouter);

//order process derection route
food.use("/orderProcess", orderProcessRouter);

//order route
food.use("/orders", orderRoute);

module.exports = food;
