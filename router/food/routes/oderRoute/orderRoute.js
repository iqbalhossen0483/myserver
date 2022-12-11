const express = require("express");
const {
  postOrder,
  getOrder,
  getOrderByEmail,
} = require("../../controller/order.js/order");

const orderRoute = express.Router();

orderRoute.post("/", postOrder);

orderRoute.get("/", getOrder);

orderRoute.get("/:email", getOrderByEmail);

module.exports = orderRoute;
