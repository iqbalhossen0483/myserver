const express = require("express");
const {
  getOrderProcess,
} = require("../../controller/orderProcess/orderProcess");

const orderProcessRouter = express.Router();

orderProcessRouter.get("/", getOrderProcess);

module.exports = orderProcessRouter;
