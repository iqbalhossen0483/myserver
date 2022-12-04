const express = require("express");
const serviceRouter = require("./services");
const gallaryRouter = require("./gallery");
const orderRouter = require("./order");
const blogRouter = require("./blog");

const tourism = express.Router();

//services
tourism.use("/services", serviceRouter);

//gallery
tourism.use("/gallery", gallaryRouter);

//order
tourism.use("/orders", orderRouter);

//blog
tourism.use("/blogs", blogRouter);

module.exports = tourism;
