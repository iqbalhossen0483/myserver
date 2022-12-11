const express = require("express");
const {
  postOrder,
  getOrder,
  getOrderByEmail,
  updateOrder,
  getFilteredOrder,
} = require("../../controller/order/orderControll");

const orderRute = express.Router();

orderRute.post("/", postOrder);

orderRute.get("/", getOrder);

orderRute.get("/:email", getOrderByEmail);

orderRute.get("/filter/:text", getFilteredOrder);

orderRute.put("/:id", updateOrder);

module.exports = orderRute;
