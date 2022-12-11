const express = require("express");
const propertyRouter = require("./router/propertyRouter/propertyRouter");
const userRouter = require("./router/userRouter/userRouter");
const orderRute = require("./router/order route/orderRoute");

const appartment = express.Router();

appartment.use("/property", propertyRouter);

appartment.use("/users", userRouter);

appartment.use("/orders", orderRute);

module.exports = appartment;
