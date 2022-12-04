const express = require("express");
const productRouter = require("./productRouter/productRouter");
const reviewsRouter = require("./reviewRouter/reviewsRouter");
const sliderRouter = require("./sliderRouder/sliderRouter");
const ordersRouter = require("./orderRoute/ordersRouter");
const usersRouter = require("./usersRouter/usersRouter");
const offerRouter = require("./offerRouter/offerRouter");
const menuRouter = require("./menuRouter/MenusRouter");
const newsRouter = require("./newsRouter/newsRouter");

const cycleMart = express.Router();

//products part
cycleMart.use("/products", productRouter);

//reviews part
cycleMart.use("/reviews", reviewsRouter);

//news part
cycleMart.use("/news", newsRouter);

//orders part
cycleMart.use("/orders", ordersRouter);

//users part
cycleMart.use("/users", usersRouter);

//menus
cycleMart.use("/menus", menuRouter);

//slider
cycleMart.use("/sliders", sliderRouter);

//offer
cycleMart.use("/offers", offerRouter);

module.exports = cycleMart;
